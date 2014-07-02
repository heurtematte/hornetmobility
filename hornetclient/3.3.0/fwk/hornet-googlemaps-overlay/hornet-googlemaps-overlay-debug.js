YUI.add('hornet-googlemaps-overlay', function(Y) {

/**********************************************************************
 * <p>GoogleMapsOverlay.</p>
 * 
 * Ce composant permet d'intégrer facilement une carte google maps dans une fenêtre modale :
 * le conteneur est créé à la volée, la carte s'affiche en sur impression de la page HTML sans perturber le rendu.
 *  
 * L'assemblage fait par ce composant a pour but de :
 * - initialiser la configuration pour utiliser l'api Google Maps,
 * - créer le composant à l'intérieur d'une fenêtre modale,
 * - définir des boutons d'actions avec les libellés en français par défaut,
 * - gérer la position courante à l'aide de marqueur.
 *  
 * @module hornet-googlemapsoverlay
 */

//    Frequently used strings

var Lang = Y.Lang,
    sub = Lang.sub,
    isNumber = Lang.isNumber,
    CONTAINER = "container",
    STRINGS = "strings",
    
    YAHOO = Y.YUI2;


/**
 * @class GoogleMapsOverlay
 * @constructor
 * @param config {Object} Configuration.
 *        <code>skin</code> is an optional string for adding classes to the parent container.
 */
function GoogleMapsOverlay(
        /* object */    config)
{
    this.adresse   = ''; 
    this.latitude  = 0; 
    this.longitude = 0;
    
    this._map = null;
    
    GoogleMapsOverlay.superclass.constructor.apply(this, arguments);
}

GoogleMapsOverlay.NAME = "hornetGooglemapsOverlay";

GoogleMapsOverlay.ATTRS = {
    
    gmapsUri: {
        value: "http://maps.google.com/maps/api/js?callback={callback}&language=fr&libraries=adsense,geometry&sensor=false&v=3.4"
    },
    timeout: {
        value: 30000
    },
    
    width: {
        value: '800px'
    },
    height: {
        value: '500px'
    },
    
    latitudeRef: {
        value: '46.2276380'
    },
    longitudeRef: {
        value: '2.2137490'
    },
    
    /**
     * Collection de strings utilisés comme libellés des éléments du Widget.
     * Elle contient les paires nom:valeur suivantes par défaut:
     *
     * <ul>
     *   <li>title : &quot;Assistant de saisie de coordonn\u00E9es GPS&quot;</li>
     *   <li>select : &quot;S\u00E9lectionner&quot;</li>
     *   <li>cancel : &quot;Annuler&quot;</li>
     *   <li>infoAdresseSearched : &quot;Vous n'avez pas saisi d'adresse. Veuillez positionner sur la carte votre lieu de destination.&quot;</li>
     *   <li>infoPositionSearched : &quot;Vous n'avez pas saisi de position gps. Veuillez positionner sur la carte votre lieu de destination.&quot;</li>
     *   <li>infoLocationNotFound : &quot;L'adresse que vous avez saisie n'a pas \u00E9t\u00E9 trouv\u00E9e. Veuillez positionner sur la carte votre lieu de destination.&quot;</
     *   <li>errorLoading : &quot;Erreur lors du chargement de l'api Google Maps&quot;</li>
     *   <li>errorNotLoaded : &quot;L'api Google Maps n'est pas accessible.&quot;</li>
     * </ul>
     *
     * @attribute strings
     * @type {Object}
     */
    strings: {
        valueFn: function() {
            return Y.Intl.get('hornet-googlemaps-overlay');
        },
        setter: function(value) {
            return Y.merge(this.get('strings'), value);
        }
    }
};


Y.extend(GoogleMapsOverlay, Y.Widget,
{
    CONTENT_BODY_TEMPLATE: "<div class='yui3-widget-bd'></div>",
    
    CONTENT_POPUP_TEMPLATE: "<div>{adresse}" +
        "<div>" +
            "<b>Latitude : </b>{latitude}<br/>" + 
            "<b>Longitude : </b>{longitude}" +
        "</div></div>",
    
    initializer: function () {
        this._infowindow = null;
        this._marker = null;
        this._gmapsLoaded = false;

        this.publish('info');
        this.publish('failure');
        this.publish('select');
        
        Y.publish('googlemaps:load', {
            broadcast: 2,
            fireOnce: true,
            async   : true
        });
    },
    
    renderUI: function () {
        var _instance = this,
            strings = _instance.get('strings'),
            boundingBox = _instance.get('boundingBox'),
            contentBox = _instance.get('contentBox');
        
        var container = new YAHOO.widget.Dialog(contentBox.getDOMNode(), {
            fixedcenter:true,
            visible:false,
            modal:true, 
            buttons:[
             {
                 text: strings.select, 
                 handler: Y.bind(function () { 
                     _instance._onSelect(); 
                     _instance.hide();
                 },_instance), 
                 isDefault:true
             },{
                 text: strings.cancel, 
                 handler: Y.bind(function () {
                     _instance.hide();
                 },_instance)
             }],
            draggable:false,
            close:true
        });
        container.hideEvent.subscribe ( function() {
            if (_instance.get("visible") == true) {
                _instance.hide();
            }
        });
        container.setHeader(strings.title);
        container.setBody(_instance.CONTENT_BODY_TEMPLATE);
        
        container.render(boundingBox.getDOMNode());
        _instance._overlay = container;
        _instance._containerBody = Y.one(container.body).one('*');
        _instance.renderGMapsUI();
    },
    
    renderGMapsUI: function () {
        if(typeof(google) !== "undefined") {
            
            this._gmapsOnLoad();
        } else {
            Y.on('googlemaps:load', Y.bind(this._gmapsOnLoad, this));
            
            if (! GoogleMapsOverlay._loading) {
                GoogleMapsOverlay._loading=true;
                
                this._loadGMaps(function () {
                    Y.fire("googlemaps:load");
                });
            }
        }
    },
    
    bindGMapsUI: function () {
        var _instance = this;
        
        //Rattachement de la fonction a l'evenement de selection
        google.maps.event.addListener(this._map, 'click', function(event) {
           var ll = event.latLng;
           _instance._setPositionGps.apply(_instance, [ ll.lat(), ll.lng() ]);
        });

        google.maps.event.addListener(this._marker, 'click', function() {
            // Met a jour les informations suivant le zoom utilisé
            _instance._setPositionGps.apply(_instance, [ _instance.latitude, _instance.longitude ]);
        });
        
        google.maps.event.addListener(this._marker, 'dragend', function(event) {
            var ll = event.latLng;
            _instance._setPositionGps.apply(_instance, [ ll.lat(), ll.lng() ]);
        });
    },
    
    show: function () {
        Y.log("Show", "info", GoogleMapsOverlay.NAME);
        if (this._overlay) {
            this._overlay.show();
        }
    },
    
    hide: function () {
        Y.log("Hide", "info", GoogleMapsOverlay.NAME);
        if (this._overlay) {
            this._overlay.hide();
        }
    },

    /**
     * Surcharge de la methode pour mettre a jour les dimensions de la carte.
     * @method _uiSetDim
     * @private
     * @param {String} dim The dimension - "width" or "height"
     * @param {Number | String} val The value to set
     */
    _uiSetDim: function(dimension, val) {
        var body = (this._containerBody || this.get('boundingBox'));
        body.setStyle(dimension, isNumber(val) ? val + this.DEF_UNIT : val);
    },
    
    _gmapsOnLoad: function () {
        var _instance = this,
            body = _instance._containerBody,
            // position de reference
            latitude  = _instance.get('latitudeRef')  || 0,
            longitude = _instance.get('longitudeRef') || 0,
            positionReference = new google.maps.LatLng(latitude, longitude);

        if (body) {
            _instance._map = new google.maps.Map(body.getDOMNode(), {
                zoom: 2,
                center: positionReference,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            });
            
            _instance._geocoder = new google.maps.Geocoder();
            _instance._infowindow = this._getInfosLocalisation();
            _instance._marker = new google.maps.Marker({ clickable: true, draggable: true, visible: true, map: _instance._map });
    
            _instance.bindGMapsUI();
            _instance._gmapsLoaded = true;
        }
    },
    
    _loadGMaps: function (callback) {
        var _instance = this,
            strings = _instance.get('strings'),
            timeout = _instance.get('timeout'),
            url = _instance.get('gmapsUri');
        
        Y.jsonp(url, {
            context: _instance,
            on: {
                failure: function () {
                    _instance._onError(strings.errorLoading);
                },
                success: callback,
                timeout: function () {
                    _instance._onError(strings.errorLoading);
                }
            },
            timeout: timeout
        });
    },

    _onSelect: function () {
        Y.log("Select", "info", GoogleMapsOverlay.NAME);
        this.fire("select", {
            latitude: this.latitude,
            longitude: this.longitude,
            adresse: this.adresse
        });
    },

    _onError: function (msg) {
        Y.log("Error: "+msg, "warn", GoogleMapsOverlay.NAME);
        this.fire("failure", {
            msg: msg
        });
    },

    _onInfo: function (msg) {
        Y.log("Info: "+msg, "info", GoogleMapsOverlay.NAME);
        this.fire("info", {
            msg: msg
        });
    },
    
    _setLocationOnMap: function (position) {
        
        // mise a jour de la position du marker
        if(this._marker) {
            this._marker.setPosition(position);
        }
        
        // repositionnement de la carte
        if (!this._map.getCenter()) {
            this._map.setCenter(position);
        } else {
            this._map.panTo(position);
        }

        // mise a jour du contenu de la popup contextuelle d'information
        this._infowindow.setContent(sub(this.CONTENT_POPUP_TEMPLATE, { 
            adresse: this.adresse, 
            latitude: this.latitude, 
            longitude: this.longitude 
       }));
        
        // ouvre la popup contextuelle d'information sur le marker
        this._infowindow.open(this._map, this._marker);
    },
    
    _getInfosLocalisation: function() {
        return new google.maps.InfoWindow({ 
            content: sub(this.CONTENT_POPUP_TEMPLATE, { 
                adresse: this.adresse, 
                latitude: this.latitude, 
                longitude: this.longitude 
           }) 
       });
    },

    /** 
     * Calcule le champ adresse par rapport au zoom de la carte
     * 
     * @method calculeAdresse
     * static
     */
    _calculeAdresse : function(data, niveauZoom) {
        // Declarations variables
        var finalAdress = "";
        
        // Si 0 < Zoom <= 5 -> Pays
        if ((0 < niveauZoom) && (niveauZoom <= 5)) {
            // On prend le niveau "country"
            finalAdress = finalAdress + this._extractAdressByType(data.address_components, "country");
        // Si 6 = Zoom -> Region
        } else if (6 == niveauZoom) { 
            // On prend le niveaux "administrative_area_level_1"
            finalAdress = finalAdress + this._extractAdressByType(data.address_components, "administrative_area_level_1");
            // On complete par une ", "
            if (finalAdress != "") { finalAdress = finalAdress + ", "; }
            // On prend le niveau "country"
            finalAdress = finalAdress + this._extractAdressByType(data.address_components, "country");
        // Si 7 = Zoom -> Departement
        } else if (7 == niveauZoom) { 
            // On prend le niveaux "administrative_area_level_2"
            finalAdress = finalAdress + this._extractAdressByType(data.address_components, "administrative_area_level_2");
            // On complete par une ", "
            if (finalAdress != "") { finalAdress = finalAdress + ", "; }
            // On prend le niveaux "administrative_area_level_1"
            finalAdress = finalAdress + this._extractAdressByType(data.address_components, "administrative_area_level_1");
            // On complete par une ", "
            if (finalAdress != "") { finalAdress = finalAdress + ", "; }
            // On prend le niveau "country"
            finalAdress = finalAdress + this._extractAdressByType(data.address_components, "country");
        // Si 8 <= Zoom <= 11 -> Ville
        } else if ((8 <= niveauZoom) && (niveauZoom <= 11)) {
            // On prend le niveau "locality"
            finalAdress = finalAdress + this._extractAdressByType(data.address_components, "locality");
            // On complete par une ", "
            if (finalAdress != "") { finalAdress = finalAdress + ", "; }
            // On prend le niveau "country"
            finalAdress = finalAdress + this._extractAdressByType(data.address_components, "country");
        // Sinon si Zoom >= 12
        } else {
            // On prend l'adresse complete
            finalAdress = data.formatted_address;
        }
        
        return finalAdress;
    },
    
    /**
     * Extrait de l'adresse le bon type
     * 
     * @method extractAdressByType
     * static
     */
    _extractAdressByType : function(tabAdressComponent, typeAdresse) {
        // Declaration variables
        var finalAdress = "";
        var index = (tabAdressComponent.length)-1;
        var boolTrouve = false;
        // On parcours l'adresse
        while (index >= 0 && !boolTrouve) {
            if(tabAdressComponent[index].types[0] == typeAdresse) {
                finalAdress = tabAdressComponent[index].long_name;
                boolTrouve = true;
            }
            index = (index-1);
        }
        return finalAdress;
    },

    /**
     * Actualisation des informations et de la carte
     */
    _updatePositionGps: function(data, position) {
        // Actualisation informations
        this.latitude = position.lat().toFixed(7);
        this.longitude = position.lng().toFixed(7);
        this.adresse = this._calculeAdresse(data, this._map.getZoom());

        // Actualisation carte
        this._setLocationOnMap(position);
    },
    
    /**
     * Recherche de la position
     */
    _setPositionGps: function (lat, lng) {
        var _instance = this,
        strings = this.get('strings'),
        ll = new google.maps.LatLng(lat, lng);

        // recherche de la position
        this._geocoder.geocode({'latLng':ll}, function(results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                if (results[0]) {
                    _instance._updatePositionGps.apply(_instance, [results[0], ll]);
                }
            } else {
                _instance._onInfo(strings.infoLocationNotFound);
            }
        });
    },

    /**
     * Affichage de la carte et mise à jour si la position donnée est correcte.
     *
     * @method openPosition
     */
    openPositionGps: function (lat, lng) {
        var strings = this.get('strings');
        
        this.show();
        if (this._gmapsLoaded) {
            if (lat != "" && lng != "") {
                this._setPositionGps(lat, lng);
            } else {
                this._onInfo(strings.infoPositionSearched);
            }
        } else {
            this._onError(strings.errorNotLoaded);
        }
    },

    /**
     * Actualisation des informations et de la carte
     */
    _updateAdresse : function(data) {
        var position = data.geometry.location;
        
        // Actualisation informations
        this.latitude = position.lat().toFixed(7);
        this.longitude = position.lng().toFixed(7);
        this.adresse = data.formatted_address;
        
        // Affinage du zoom en fonction du type
        if (data.types[0] == "street_address" || data.types[0] == "route") {
            this._map.setZoom(16);
        } else if (data.types[0] == "locality") {
            this._map.setZoom(10);
        } else if (data.types[0] == "administrative_area_level_1" ||
                data.types[0] == "administrative_area_level_2") {
            this._map.setZoom(7);
        } else if (data.types[0] == "country") {
            this._map.setZoom(5);
        }

        // Actualisation carte
        this._setLocationOnMap(position);
    },
    
    /**
     * Recherche de l'adresse
     */
    _setAdresse: function (adresse) {
        var _instance = this,
            strings = this.get('strings');

        // recherche de l'adresse
        this._geocoder.geocode({'address': adresse}, function(results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                if (results[0]) {
                    _instance._updateAdresse.apply(_instance, [results[0]]);
                }
            } else {
                _instance._onInfo(strings.infoLocationNotFound);
            }
        });
    },

    /**
     * Affichage de la carte et mise à jour si l'adresse donnée est correcte.
     *
     * @method openAdresse
     */
    openAdresse: function (adresse) {
        var strings = this.get('strings');
        
        this.show();
        if (this._gmapsLoaded) {
            if (adresse != "") {
                this._setAdresse(adresse);
            } else {
                this._onInfo(strings.infoAdresseSearched);
            }
        } else {
            this._onError(strings.errorNotLoaded);
        }
    }

});

Y.namespace('hornet').googlemapsOverlay = GoogleMapsOverlay;


}, '3.3.0' ,{skinnable:false, requires:['yui2-container', 'yui2-button', 'widget-base', 'event-custom', 'jsonp'], lang:['fr']});
