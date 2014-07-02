YUI.add('hornet-ajax', function(Y) {


 /**********************************************************************
  * <p>HornetAjax.</p>
  * 
  * Initialisation d'un composant pour la gestion des requêtes Ajax.
  * 
  * @module hornet-ajax
  */
     
    /* Shortcuts, strings and constants */
    var hornet = Y.hornet,
        Notification = hornet.Notification,
        Lang = Y.Lang,
        Array = Y.Array,
        Intl = Y.Intl;

/**
 * @class hornetAjax
 * @constructor
 * 
 * @see Y.IO
 * @param config {Object} Configuration utilisee pour configurer les requetes AJAX.
 * 
 * @param [config.url] {String} Uri pour la requete AJAX.
 * @param [config.method="POST"] {String} Methode d'envoi pour la requete AJAX.
 * @param [config.form] {Object} [optionnal] Configuration dans le cas d'un envoi de formulaire.
 * @param [config.form.id] {Node|String} Objet associe au formulaire ou id HTML du formulaire.
 * @param [config.form.useDisabled=false] {Boolean} Si les champs desactives doivent etre inclus.
 * 
 * @param [config.on.success] {Function} [optionnal] Fonction a appeler en cas de succes.
 * @param [config.on.failure] {Function} [optionnal] Fonction a appeler en cas d'erreur.
 * @param [config.on.start] {Function} [optionnal] Fonction a appeler au debut du traitement.
 * @param [config.on.end] {Function} [optionnal] Fonction a appeler a la fin du traitement.
 * 
 * @param [config.notification] [optionnal] {Object} Configuration pour les notifications.
 * @param [config.notification.focusNotifications=true] {Boolean} Focus dans la zone d'erreur ou la zone d'information si notification.
 * @param [config.notification.resetNotifications=true] {Boolean} Reinitialisation des zones de notification.
 * @param [config.notification.zoneInfo=".infoBox"] {Node|String} Zone de notification pour les messages d'information.
 * @param [config.notification.zoneError=".errorBox"] {Node|String} Zone de notification pour les messages d'erreurs.
 * @param [config.notification.titleInfo] {String} [optionnal] Titre pour la zone d'information.
 * @param [config.notification.titleError] {String} [optionnal] Titre pour la zone d'erreur.
 * @param [config.notification.msgOnSuccess] {String} [optionnal] Message a afficher dans la zone d'information si succes.
 * @param [config.notification.msgOnError] {String} [optionnal] Message a afficher dans la zone d'erreur si erreurs.
 * @param [config.notification.alertOnSuccess] {String} [optionnal] Message d'alerte a afficher si succes.
 * @param [config.notification.alertOnError] {String} [optionnal] Message d'alerte a afficher si erreurs.
 */
var HornetAjax = function (config) {
    HornetAjax.superclass.constructor.call(this, config);
};


Y.extend(HornetAjax, Y.Base, {
    /////////////////////////////////////////////////////////////////////////////
    //
    // Ajax prototype methods and properties.
    //
    /////////////////////////////////////////////////////////////////////////////
    
    // -- Lifecycle Methods ------------------------------------------
    
    initializer: function (config) {
        this._setAjaxConfig(config);
    },
    
    destructor: function () {
        delete this._ajaxConfig;
    },
    
    // -- Public Methods ------------------------------------------
    
    /**
    * IO start callback.
    *
    * @method startHandler
    * @param id {String} Transaction ID.
    * @param e {Event.Facade} Event facade.
    * @private
    */
    startHandler: function (id, e) {
        var ajaxConfig = this._ajaxConfig,
            notification = new Notification(e.notification);
        
        if (e.notification && e.notification.resetNotifications) {
            notification.reset();
        }
        
        try {
            if (ajaxConfig && ajaxConfig.on && ajaxConfig.on.start) {
                ajaxConfig.on.start.apply(ajaxConfig.context || Y, arguments);
            }
        }
        catch(ex) {
            Y.log("Error while calling onStart : " + ex.message, "error", HornetAjax.NAME);
            notification.writeErrors([this._getMessage("errorOnStart")]);
        }
    },
    
    /**
    * IO success callback.
    *
    * @method successHandler
    * @param id {String} Transaction ID.
    * @param response {Object} Response.
    * @param e {Event.Facade} Event facade.
    * @private
    */
    successHandler: function (id, response, e) {
        var ajaxConfig = this._ajaxConfig,
            notification = new Notification(e.notification),
            notifyError = false, 
            notifySuccess = false,
            errors = [],
            messages = [],
            data_msg_out = null;
        
        // recuperation des messages d'information et d'erreur
        data_msg_out = this._parseAjaxResponse(response);
        
        if(!data_msg_out || data_msg_out.error) {
            notifyError = true;
            errors.push(this._getMessage("errorParsingData"));
        } else {
            
            // gestion des messages
            messages = data_msg_out.messages;
            notification.writeInfos(messages);
            
            errors = data_msg_out.errors || [];
            if (errors.length > 0) {
                notifyError = true;
            } else {
                notifySuccess = true;
                
                try {
                    if (ajaxConfig && ajaxConfig.on && ajaxConfig.on.success) {
                        notifySuccess = !!(ajaxConfig.on.success.apply(ajaxConfig.context || Y, arguments));
                    }
                }
                catch(ex) {
                    Y.log("Error while calling onSuccess : " + ex.message, "error", HornetAjax.NAME);
                    notifyError = true;
                    notifySuccess = false;
                    errors.push(this._getMessage("errorOnSucces"));
                }
                
                if(notifySuccess) {
                    if (e.notification.alertOnSuccess) {
                        alert(e.notification.alertOnSuccess); 
                    }
                    if (e.notification.msgOnSuccess) {
                        notification.writeInfos([e.notification.msgOnSuccess]);
                    }
                }
            }
        }
        
        // gestion des erreurs
        if(notifyError) {
            
            if (e.notification.alertOnError) {
                alert(e.notification.alertOnError); 
            }
            if (e.notification.msgOnError) {
                notification.writeErrors([e.notification.msgOnError]);
            }
            
            try {
                if (ajaxConfig && ajaxConfig.on && ajaxConfig.on.failure) {
                    ajaxConfig.on.failure.apply(ajaxConfig.context || Y, arguments);
                }
            }
            catch(ex) {
                Y.log("Error while calling onFailure : " + ex.message, "error", HornetAjax.NAME);
                errors.push(this._getMessage("errorOnFailure"));
            }
            
            notification.writeErrors(errors);
        }
    },

    /**
    * IO failure callback.
    *
    * @method failureHandler
    * @param id {String} Transaction ID.
    * @param response {Object} Response.
    * @param e {Event.Facade} Event facade.
    * @private
    */
    failureHandler: function (id, response, e) {
        var ajaxConfig = this._ajaxConfig,
            notification = new Notification(e.notification);
        
        if (e.notification.alertOnError) {
            alert(e.notification.alertOnError); 
        }
        if (e.notification.msgOnError) {
            notification.writeErrors([e.notification.msgOnError]);
        }
        
        try {
            if (ajaxConfig && ajaxConfig.on && ajaxConfig.on.failure) {
                ajaxConfig.on.failure.apply(ajaxConfig.context || Y, arguments);
            }
        }
        catch(ex) {
            Y.log("Error while calling onFailure : " + ex.message, "error", HornetAjax.NAME);
            notification.writeErrors([this._getMessage("errorOnFailure")]);
        }
    },
    
    /**
    * IO end callback.
    *
    * @method endHandler
    * @param id {String} Transaction ID.
    * @param e {Event.Facade} Event facade.
    * @private
    */
    endHandler: function (id, e) {
        var ajaxConfig = this._ajaxConfig,
            notification = new Notification(e.notification);
        
        try {
            if (ajaxConfig && ajaxConfig.on && ajaxConfig.on.end) {
                ajaxConfig.on.end.apply(ajaxConfig.context || Y, arguments);
            }
        }
        catch(ex) {
            Y.log("Error while calling onEnd : " + ex.message, "error", HornetAjax.NAME);
            notification.writeErrors([this._getMessage("errorOnEnd")]);
        }
    },
    
    /**
    * Envoi de la requete.
    *
    * @method sendRequest
    * @param data {String} {Object|String} Donnees.
    */
    sendRequest: function(data) {
        var io = this.get("io"),
            ajaxConfig = this._ajaxConfig,
            uri = ajaxConfig.url,
            callbacks = (ajaxConfig.on || {}),
            cfg = Y.merge(ajaxConfig, {
                on: Y.merge(callbacks, {
                    success: Y.bind(this.successHandler, this),
                    failure: Y.bind(this.failureHandler, this),
                    start: Y.bind(this.startHandler, this),
                    end: Y.bind(this.endHandler, this)
                }),
                "arguments": Y.merge(ajaxConfig["arguments"], {
                    notification : ajaxConfig.notification
                })
            });
        
        cfg.data = data;
        
        // Debut transaction
        Y.log("start transaction with data: " + Y.dump(data), "info", HornetAjax.NAME);
        return io(uri, cfg);
    },
    
    /**
     * Ajax parser a utiliser pour analyser la reponse.
     * 
     * @method _parseAjaxResponse
     * @param response {Object} objet response.
     * @return {Object} 
     *         - error {Boolean}: true si erreur de parsing, false sinon.
     *         - result {String}: 'OK' ou 'KO'.
     *         - errors {Array} : messages d'erreurs.
     *         - messages {Array} : messages d'information.
    **/
    parseAjaxResponse: function (response) {
        var oParsedResponse = {error: false, result:null, errors: [], messages: []};
        // Problematic response
        if (Lang.isUndefined(response)) {
            oParsedResponse.error = true;
        }
        return oParsedResponse;
    },
    
    /**
     * Récupération d'un message.
     * 
     * @method _getMessage
     * @attribute key {String} clef associee au message
     * @return {String} libelle correspondant
     * @protected
     */
    _getMessage: function (key) {
        var strings = this.get('strings'), 
            msg;
        if (strings) {
            msg = strings[key];
        }
        return msg;
    },
    
    /**
     * Initialise la configuration Ajax.
     * 
     * @method _setAjaxConfig
     * @attribute config {Object} configuration
     * @protected
     */
    _setAjaxConfig :  function (config) {
        this._ajaxConfig = HornetAjax.InitAJAXConfig(config);
    } 
}, {
    /////////////////////////////////////////////////////////////////////////////
    //
    // Ajax static properties.
    //
    /////////////////////////////////////////////////////////////////////////////
    
    /**
     * Nom de classe.
     *
     * @property NAME
     * @type String
     * @static
     * @final
     * @value "hornetAjax"
     */
    NAME: "hornetAjax",
    
    ATTRS: {
    
        /**
         * @attribute ajaxConfig
         * @description Objet de configuration des requetes Ajax
         * @type Object
         */
        ajaxConfig : {
            value : {},
            setter: '_setAjaxConfig'
        },
        
        /**
         * Pointer vers IO Utility.
         *
         * @attribute io
         * @type Y.io
         * @default Y.hornet.HornetAjax.IO
         */
        io: {
            valueFn: function() {
                return HornetAjax.IO;
            },
            cloneDefaultValue: false
        },
        
        /**
        * @attribute strings
        * @description Objet contenant des libelles de messages.
        * @type Object
        */
        strings: {
            valueFn: function() {
                return Y.Intl.get("hornet-ajax");
            }
        }
    }
});

/////////////////////////////////////////////////////////////////////////////
//
//Ajax static methods.
//
/////////////////////////////////////////////////////////////////////////////
Y.mix(HornetAjax, {

    /**
     * Initialise une configuration Ajax a partir des parametres par defaut et la configuration donnee.
     * 
     * @method InitAJAXConfig
     * @param config {Object} Configuration.
     * @return {Object}
     * @static
     */
    InitAJAXConfig: function (config) {
        config = config || {};
        
        var notificationProperties,
            //parametres de configuration par defaut
            defIOConfig = {
                method: 'POST',
                on:{}
            },
            defNotificationConfig = {
                resetNotifications : true,
                focusNotifications : true,
                zoneInfo : ".infoBox",
                zoneError : ".errorBox"
            },
            
            cfg = Y.merge(defIOConfig, config, {
                notification: Y.merge(defNotificationConfig, config.notification)
            });
        
        //reformattage de la configuration d'un formulaire
        if (config.form && !(config.form.id)) {
            cfg.form = {
                id: config.form
            };
        }

        //reformattage de la configuration des notifications
        notificationProperties = ['focusNotifications', 'resetNotifications', 'zoneInfo', 'zoneError', 'titleInfo', 'titleError', 'msgOnSuccess', 'msgOnError', 'alertOnSuccess', 'alertOnError'];
        Y.mix(cfg.notification, config, true, notificationProperties);
        Array.each(notificationProperties, function (prop) {
            delete cfg[prop];
        });

        //reformattage de la configuration des fonctions de callback
        Y.mix(cfg.on, {
            success: config.onSuccess,
            failure: config.onFailure
        });
        delete cfg.onSuccess;
        delete cfg.onFailure;
        
        return cfg;
    },
    
    /**
     * Appel de la fonction utilitaire IO.
     * Dans le cas d'un envoi de formulaire, les boutons "submit" sont desactives pendant la requete pour ne pas les transmettre.
     * 
     * @method IO
     * @type Y.io
     * @static
     */
    IO: function (uri, ioConfig) {
        var callbacks = (ioConfig.on || {}), 
            callbackOnStart, callbackOnEnd,
            enabledSubmitButtons;
        
        //recuperation des boutons submit actives
        if (ioConfig.form && ioConfig.form.id) {
            enabledSubmitButtons = HornetAjax.GetSubmitButtons(ioConfig.form.id);
        }
        
        //gestion de plusieurs boutons Submit dans un formulaire HTML
        if (enabledSubmitButtons) {
            callbackOnStart = callbacks.start;
            callbackOnEnd = callbacks.end;
            
            ioConfig = Y.merge(ioConfig, {
                on: Y.merge(callbacks, {
                    start: function(id, args) {
                        //desactivation des boutons submit actives
                        enabledSubmitButtons.set('disabled', true);
                        if (callbackOnStart) {
                            callbackOnStart.apply(ioConfig.context || Y, arguments);
                        }
                    },
                    end: function(id, args) {
                        //reactivation des boutons submit actives
                        enabledSubmitButtons.set('disabled', false);
                        if (callbackOnEnd) {
                            callbackOnEnd.apply(ioConfig.context || Y, arguments);
                        }
                    }
                })
            });
        }
        return Y.io(uri, ioConfig); 
    },
    
    /**
     * Récupération des boutons submit associes a un formulaire.
     * 
     * @method GetSubmitButtons
     * @param form {Node|String} Objet associe au formulaire ou id HTML du formulaire.
     * @return {NodeList}
     * @static
     */
    GetSubmitButtons: function (form) {
        var enabledSubmitButtons = null, 
            formId, formNode;
        
        if (form) {
            formId = (typeof form === 'string') ? form : form.getAttribute('id');
            formNode = Y.one('form[id="' + formId + '"]');
        }
        
        if (formNode) {
            enabledSubmitButtons = formNode.all('[type="submit"],[type="image"]').filter(':not([disabled])');
        }
        
        return enabledSubmitButtons;
    }
});

Y.namespace('hornet').Ajax = HornetAjax;

 /**********************************************************************
  * <p>Ajax.</p>
  * 
  * Support du XML pour la gestion des requêtes Ajax.
  * 
  * @module hornet-ajax
  * @submodule hornet-ajax-xml
  */
     
    /* Shortcuts, strings and constants */
    var Ajax = Y.namespace('hornet').Ajax,
        Array = Y.Array,
        DataSchema = Y.DataSchema,

AjaxXml = {
        
    NAME: "hornet-ajax-xml",
        
    /**
     * Récupération des messages et erreurs après utilisation d'une requete AJAX.
     * 
     * @method parseResponseData
     * @static
     * 
     * @param oResponseText {String} Donnees JSON a parser
     * @return {Object} 
     *         - error {Boolean}: false si erreur de parsing, true sinon 
     *         - result {String}: 'OK' ou 'KO'
     *         - errors {Array} : messages d'erreurs
     *         - messages {Array} : messages d'information
     */
    /**
     * Récupération des messages et erreurs après utilisation d'une requete AJAX.
     * 
     * @method parseResponseXML
     * @static
     * 
     * @param oResponseXML {Object} XML document
     * @return {Object} 
     *         - error {Boolean}: true si erreur de parsing, false sinon.
     *         - result {String}: 'OK' ou 'KO'.
     *         - errors {Array} : messages d'erreurs.
     *         - messages {Array} : messages d'information.
     */
    parseResponseXML : function(oResponseXML) {
        var bError = false, 
        oParsedResponse = {error: false, result:null, errors: [], messages: []},
        data_in = null,
        data_error_out = null,
        data_message_out = null,
        schema_error = {
            metaFields: {resultat:"//RESULTAT"},
            resultListLocator: "error",
            resultFields: [{key:"key"}, {key:"value"}]
        },
        schema_message = {
            resultListLocator: "message",
            resultFields: [{key:"key"}, {key:"value"}]
        };
        try {
            data_in = oResponseXML;
            data_error_out = DataSchema.XML.apply(schema_error, data_in);
            data_message_out = DataSchema.XML.apply(schema_message, data_in);
        }
        catch(errorParsing) {
            Y.log("Error while parsing XML data: " + errorParsing.message, "error");
        }
        if(!data_error_out || !data_message_out) {
            bError = true;
        }
        else {
            oParsedResponse.result = data_error_out.meta.resultat;
            oParsedResponse.errors = [];
            var e, msg, i;
            for (i=0; i<data_error_out.results.length; i++)
            {
                e = data_error_out.results[i];
                msg = (e.key) ? '<a href="#'+e.key+'" >'+e.value+'</a>' :  e.value;
                oParsedResponse.errors[i] = msg;
            }
            oParsedResponse.messages = [];
            for (i=0; i<data_message_out.results.length; i++)
            {
                e = data_message_out.results[i];
                msg = (e.key) ? '<a href="#'+e.key+'" >'+e.value+'</a>' : e.value;
                oParsedResponse.messages[i] = msg;
            }
        }
        if(bError) {
            Y.log("XML data could not be parsed: " + Y.dump(oResponseXML), "error");
            oParsedResponse.error = true;
        }
        else {
            Y.log("Parsed XML data is " + Y.dump(oParsedResponse), "info");
        }
        return oParsedResponse;
    },
    
    /**
     * Requete AJAX et parsing des erreurs. 
     * Dans le cas d'un envoi de formulaire, les boutons "submit" sont desactives pendant la requete pour ne pas les transmettre.
     * 
     * @see Y.hornet.Ajax
     * @method submitAJAXRequest
     * @static
     * 
     * @param data {Object|String} Donnees supplementaires a inclure (Chaine de requete ou objet sous forme de clefs/valeurs).
     * @param config {Object} Configuration pour la requete AJAX.
     * @return {Object}
     */
    submitAJAXRequest: function(data, config) {
        
        var ajaxRequest = new Ajax(config);
        ajaxRequest._parseAjaxResponse= function (response) {
            var xml = response && response.responseXML,
                oParsedResponse = AjaxXml.parseResponseXML(xml);
            return oParsedResponse;
        };
        
        return ajaxRequest.sendRequest.apply(ajaxRequest, [data]);
    }
};

Y.namespace('hornet').AjaxXml = AjaxXml;

//Add prototype properties and methods to Ajax.
Y.mix(Ajax, AjaxXml);

 /**********************************************************************
  * <p>Ajax.</p>
  * 
  * Methodes utilitaires pour la gestion des requetes Ajax.
  * 
  * @module hornet-ajax
  * @submodule hornet-ajax-util
  */
     
    /* Shortcuts, strings and constants */
    var Ajax = Y.namespace('hornet').Ajax,
        YAHOO = Y.YUI2,
        YUC = YAHOO.util.Connect,

AjaxUtil = {
    NAME: "hornet-ajax-util",

    /**
     * Récupération des messages et erreurs du cache d'une datasource yui2
     * 
     * @method parsedResponseCache
     * @static
     * 
     * @param oParsedResponse {Object} Objet
     * @return {Object} 
     *         - result {String}: 'OK' ou 'KO'
     *         - errors {Array} : messages d'erreurs
     *         - messages {Array} : messages d'information
     */
    parsedResponseCache : function(oParsedResponse) {
        var oResponse = {error: false, result: null, errors: [], messages: []};
        try {
            if (oParsedResponse.error) {
                oResponse.error = true;
            } 
            else {
                oResponse.result = oParsedResponse.meta.resultat;
                oResponse.errors = oParsedResponse.meta.errors || [];
                oResponse.messages = oParsedResponse.meta.messages || [];
            }
        }
        catch(e) {
            Y.log("Error while parsing response data: " + e.message, "error");
            oResponse.error = true;
        }
        return oResponse;
    },
    
    /**
     * Controle apres chaque requete AJAX pour verifier que l'authentification n'est pas necessaire.
     * Si c'est le cas, redirige vers une nouvelle page apres confirmation de l'utilisateur ou stop la requete sinon.
     * 
     * @param confirmRedirect {String} message de confirmation pour autoriser la redirection
     * @param urlRedirect {String} (Optionnal) : url pour la redirection, page courante rechargee sinon 
     */
    checkAuthAJAXRequest : function(confirmRedirect, urlRedirect) {
        urlRedirect = urlRedirect || window.location.href;
    
        function checkStatus(status, responseText) {
            var ok = true;
            if (status==200) {
                if(responseText !== undefined && (responseText.search('action="j_security_check"')>0)){
                    if(window.confirm(confirmRedirect)) {
                        window.location.href=urlRedirect;
                    }else{
                        ok = false;
                    }
                }
            } else if (status == 401 || status == 0) {
                if(window.confirm(confirmRedirect)) {
                    // Suppression du ticket pour cas
                    var idxTicket = urlRedirect.search('/\?ticket=|&ticket=/i');
                    if (idxTicket > 0) {
                        urlRedirect=urlRedirect.substr(0,idxTicket-1);
                    }
                    window.location.href=urlRedirect;
                }
            }
            return ok;
        }
        
        Y.on('io:complete', function(a,req){
            if( !checkStatus(req.status, req.responseText)) {
                req.abort();
            }
        });
    
        YUC.successEvent.subscribe(function(type, args){
              /*
               * args[0] is the response object, which has the
               * following properties:
               *
               * args[0].tId
               * args[0].status
               * args[0].statusText
               * args[0].getResponseHeader[ ]
               * args[0].getAllResponseHeaders
               * args[0].responseText
               * args[0].responseXML
               * args[0].argument
               */
            if( !checkStatus(args[0].status, args[0].responseText)) {
                YUC.abort(args[0]);
            }
        });
        YUC.failureEvent.subscribe(function(type, args){
            // args[0] is the response object
            if( !checkStatus(args[0].status, args[0].responseText)) {
                YUC.abort(args[0]);
            }
        });
    }
};

Y.namespace('hornet').AjaxUtil = AjaxUtil;

//Add prototype properties and methods to Ajax.
Y.mix(Ajax, AjaxUtil);


}, '3.3.0' ,{requires:['base-base', 'node-base', 'selector-css3', 'io-base', 'io-form', 'yui2-connection', 'dataschema-xml', 'hornet-notification'], lang:['fr']});
