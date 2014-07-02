YUI.add('hornet-notification', function(Y) {


 /**********************************************************************
  * <p>Notification.</p>
  * 
  * Initialisation d'un composant pour gerer les messages dans une zone de notification.
  * 
  * @module hornet-notification
  */
     
    /* Any frequently used shortcuts, strings and constants */
    var Lang = Y.Lang,
    isString = Lang.isString,
    isBoolean = Lang.isBoolean;

    /* Notification class constructor */
    function Notification(config) {
        Notification.superclass.constructor.apply(this, arguments);
    }

    /**
     * Suppression des messages dans la zone de notification
     * 
     * @method resetNotifications
     * @static
     * @param zonesNotification {String} la description des elements.
     */
    Notification.resetNotifications = function(
            /* string/object */    zonesNotification)
    {
        Y.all(zonesNotification || ".messageBox").each( function(notificationBox){
            // Suppression du contenu existant
            notificationBox.setContent("");
        });
    };

    /**
     * Affichage des messages sous forme de liste UL > LI dans la zone de notification
     * 
     * @method writeNotifications
     * @static
     * @param zoneNotification {String|Object} Zone de notification
     * @param messages {Array} : Liste des messages a afficher
     * @param config {Object} 
     *         - reset {Boolean=true} (Optionnal) : si la zone de notification doit etre videe avant
     *         - focus {Boolean=false} (Optionnal) : si le focus doit etre place sur la zone de notification
     *         - title {String} (Optionnal) : titre a ajouter avant les messages 
     *             si la zone de notification est vide
     */
    Notification.writeNotifications = function(
            zoneNotification, messages, config) {
        config = Y.mix(config || {}, {
            reset: true
        });
        
        var focus = config.focus, 
        title = config.title,
        reset = config.reset;
        
        if (Y.Lang.isArray(messages) && messages.length > 0) {
            var boundingBox = Y.one(zoneNotification);
            if(!!boundingBox) {
                var containerBox = boundingBox.one("> div");
                if(!containerBox) {
                    // Création d'un élément div
                    containerBox = Y.Node.create('<div/>');
                    boundingBox.append(containerBox);
                } else if(!!reset) {
                    // Suppression du contenu existant
                    containerBox.setContent("");
                } else {
                    // Pas de titre a ajouter si contenu existant
                    title = null;
                }
                
                // Affichage des messages sous forme de liste UL > LI précédé d'un titre
                if(!!title) {
                    // Ajout du titre s'il est défini
                    var titleNode = Y.Node.create(title);
                    containerBox.prepend(titleNode);
                }
                var contentBox = containerBox.one("ul");
                if(!contentBox) {
                    // Création d'un élément UL
                    contentBox = Y.Node.create('<ul/>');
                    containerBox.append(contentBox);
                } else if(!!reset) {
                    // Suppression du contenu existant
                    contentBox.setContent("");
                }
                var imessage;
                for (imessage = 0; imessage < messages.length; imessage++ ){
                    var msg = messages[imessage] || '';
                    contentBox.append("<li>"+msg+"</li>");
                }
                //boundingBox.focus();
                if(!!focus) {
                    var idMessageBox = boundingBox.get('id');
                    if (!!idMessageBox) {
                        idMessageBox = Y.guid();
                        boundingBox.set('id', idMessageBox);
                    }
                    document.location.href = '#'+idMessageBox;
                }
            }
        }
    };
    
    /**
     * Gestion du focus sur les elements en erreur associes aux messages presents dans les zones d'erreur.
     * Identifie l'element de formulaire associe a une ancre ciblee et effectue le focus.
     * 
     * @method addFocusForAnchorLinks
     * @static
     * @param container {Node} Conteneur englobant sur lequel les evenements seront surveilles.
     * @param links {NodeList|String=".messageBox a"} Ensemble des messages-liens presents dans des zones d'erreur.
     * @param prefix {String="#"} Chaine a supprimer en debut d'url pour obtenir l'id de l'element a partir de l'ancre.
     * @param suffix {String} Chaine a supprimer en fin d'url pour obtenir l'id de l'element a partir de l'ancre.
     */
    Notification.addFocusForAnchorLinks = function(container, links, prefix, suffix) {
        links = links || ".messageBox a";
        prefix = prefix || "#";
        
        Y.detach(container, 'focusForAnchorLinks|click');
        Y.delegate('focusForAnchorLinks|click', function(event){
            event.halt();
            
            var url = event.target.getAttribute('href'),
            index, targetElement, anchorId;
            if (!!url) {
                anchorId = url;
                if (!!prefix) {
                    index = anchorId.indexOf(prefix, 0);
                    if (index != -1) {
                        anchorId = anchorId.substring(index + prefix.length);
                    }
                }
                if (!!suffix) {
                    index = anchorId.indexOf(suffix, 0);
                    if (index != -1) {
                        anchorId = anchorId.substring(0, index);
                    }
                }
                if (!!anchorId) {
                    targetElement = Y.one('[id="' + anchorId + '"],[name="' + anchorId + '"]');
                }
            }
            if (!!targetElement) {
                targetElement.scrollIntoView();
                try {
                    targetElement.focus();
                }
                catch (ex) {
                    // no way to determine in IE if this will fail
                }
                try {
                    targetElement.select();
                }
                catch (ex) {
                    // no way to determine in IE if this will fail
                }
            }
        }, container, links);
    };
    
    Notification.NAME = "notification";

    Notification.ATTRS = {

        /**
         * @attribute zoneInfo
         * @type Y.Node
         */
        zoneInfo : {
            value: ".infoBox",
            setter: function(value) {
                if (value) {
                    var el = Y.one( value );
                    if(el) {
                        return el;
                    } 
                }
                return Y.Attribute.INVALID_VALUE;
            }
        },
        
        /**
         * @attribute zoneError
         * @type Y.Node
         */
        zoneError : {
            value: ".errorBox",
            setter: function(value) {
                if (value) {
                    var el = Y.one( value );
                    if(el) {
                        return el;
                    } 
                }
                return Y.Attribute.INVALID_VALUE;
            }
        },
        
        /**
         * @attribute titleInfo
         * @type String
         */
        titleInfo : {
            validator: isString
        },
        
        /**
         * @attribute titleError
         * @type String
         */
        titleError : {
            validator: isString
        },
        
        /**
         * @attribute focusNotifications
         * @type Boolean
         */
        focusNotifications : {
            value: true,
            validator: isBoolean
        },
        
        /**
         * @deprecated
         * @see focusNotifications
         * @attribute focus
         * @type Boolean
         */
        focus : {
            getter: function() {
                return this.get('focusNotifications');
            },
            setter: function(value) {
                return this.set('focusNotifications', value);
            }
        },
        
        /**
         * @attribute resetNotifications
         * @type Boolean
         */
        resetNotifications : {
            value: true,
            validator: isBoolean
        }

    };

    /* Notification extends the Base class */
    Y.extend(Notification, Y.Base, {

        initializer: function() {
        },

        destructor : function() {
        },

        /* Notification specific methods */

        /**
         * Fonction pour reinitialiser les messages dans les zones de notification.
         *
         * @method reset
         * @protected
         */
        reset : function () {
            Notification.resetNotifications(this.get('zoneInfo'));
            Notification.resetNotifications(this.get('zoneError'));
        },

        /**
         * Fonction pour afficher les messages dans la zone d'information.
         *
         * @method writeInfos
         * @param messages {Array} : Liste des messages a afficher
         * @protected
         */
        writeInfos : function (messages) {
            if (messages) {
                messages = Y.Lang.isArray(messages) ? messages : [messages];
                if (messages.length > 0) {
                    Notification.writeNotifications(
                        this.get('zoneInfo'), 
                        messages, {
                            reset: this.get('resetNotifications'), 
                            focus: this.get('focusNotifications'), 
                            title: this.get('titleInfo')
                        });
                }
            }
        },

        /**
         * Fonction pour afficher les messages dans la zone d'erreur.
         *
         * @method writeErrors
         * @param messages {Array} : Liste des messages a afficher.
         * @protected
         */
        writeErrors : function (messages) {
            if (messages) {
                messages = Y.Lang.isArray(messages) ? messages : [messages];
                if (messages.length > 0) {
                    Notification.writeNotifications(
                        this.get('zoneError'), 
                        messages, {
                            reset: this.get('resetNotifications'), 
                            focus: this.get('focusNotifications'), 
                            title: this.get('titleError')
                        });
                }
            }
        }
    });

    Y.namespace("hornet").Notification = Notification;


}, '3.3.0' ,{skinnable:false, requires:['base-base', 'node-base', 'event-delegate']});
