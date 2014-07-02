YUI.add('hornet-filtre', function(Y) {

/**
 * <p>Filtre.</p>
 * 
 * Ce composant Widget permet d'associer des elements de formulaire a des boutons d'actions. 
 * Il utilise le principe d'amélioration progressive : 
 *  - tous les boutons et champs sont présents dans la page, ils sont identifiés par les classes correspondantes,
 *  - les boutons pour gerer l'affichage sont crees a la volee, les autres boutons et champs peuvent etre precises dans la configuration.
 * 
 * Il met a jour son affichage suivant ses etats : actif/inactif et visible/cache.
 * Il gere aussi la reinitialisation des champs de formulaire associes :
 *  - vide pour les champs texte,
 *  - decochee pour les checkbox.  
 * 
 * @module hornet-filtre
 */

    // Util shortcuts

var Node          = Y.Node,
    Widget        = Y.Widget,
    getClassName  = Y.ClassNameManager.getClassName,
    CREATE        = Y.Node.create,
    SUB           = Y.substitute,
    ISSTRING      = Y.Lang.isString,
    ISBOOLEAN     = Y.Lang.isBoolean,
    ISNUMBER      = Y.Lang.isNumber,
    ISARRAY       = Y.Lang.isArray,
    ISVALUE       = Y.Lang.isValue,

    // Frequently used strings

    BOUNDING_BOX  = "boundingBox",
    CONTENT_BOX   = "contentBox",
    STRINGS       = "strings",
    ACTIVE        = "active",
    VISIBLE       = "visible",
    HIDDEN        = "hidden",
    CLICK         = "click",
    BUTTON        = "button",
    
    NAME          = "Filtre",
    NAME_LC       = "filtre";

/**
 * 
 * @namespace hornet
 * @class Filtre
 * @constructor
 * @extends Widget
 */
var Filtre = function () {
    Filtre.superclass.constructor.apply(this, arguments);
};

/**
 * Static hash of default class names.
 *
 * @property CLASS_NAMES
 * @static
 * @type object
 */
Filtre.CLASS_NAMES = {
    inputFields      : getClassName(NAME_LC, 'field'),
    buttonsHeader    : getClassName(NAME_LC, 'buttons', 'hd'),
    buttonsFooter    : getClassName(NAME_LC, 'buttons', 'ft'),
    cancelButton     : getClassName(NAME_LC, BUTTON, 'cancel'),
    submitButton     : getClassName(NAME_LC, BUTTON, 'submit'),
    closeButton      : getClassName(NAME_LC, BUTTON, 'close'),
    showButton       : getClassName(NAME_LC, BUTTON, 'show'),
    showButtonHidden : getClassName(NAME_LC, BUTTON, 'show', HIDDEN),
    showButtonVisible: getClassName(NAME_LC, BUTTON, 'show', VISIBLE),
    showButtonActive : getClassName(NAME_LC, BUTTON, 'show', ACTIVE)
};


/**
 * Class Name
 * 
 * @property NAME
 * @type String
 * @static
 * @final
 * @value "Filtre"
 */

Filtre.NAME = NAME;

/**
 * The HTML_PARSER static constant is used by the Widget base class to populate 
 * the configuration for the instance from markup already on the page.
 * 
 * @property HTML_PARSER
 * @type Object
 * @static
 * @final
 */
Filtre.HTML_PARSER = {
    buttonsHeader: "." + Filtre.CLASS_NAMES.buttonsHeader,
    buttonsFooter: "." + Filtre.CLASS_NAMES.buttonsFooter,
    cancelButton : "." + Filtre.CLASS_NAMES.cancelButton,
    submitButton : "." + Filtre.CLASS_NAMES.submitButton,
    closeButton  : "." + Filtre.CLASS_NAMES.closeButton,
    showButton   : "." + Filtre.CLASS_NAMES.showButton,
    inputFields  : ["input." + Filtre.CLASS_NAMES.inputFields + ",." + Filtre.CLASS_NAMES.inputFields + " input"],
    
    icon         : function (srcNode) {
        var node = srcNode.one("." + Filtre.CLASS_NAMES.showButton + " img");
        return (node) ? node.get("src") : null;
    },
    iconActive   : function (srcNode) {
        var node = srcNode.one("." + Filtre.CLASS_NAMES.showButton + " img");
        return (node) ? node.get("src") : null;
    }
};

/*
 * The attribute configuration for the widget. Attributes can be
 * defined with default values, get/set functions and validator functions
 * as with any other class extending Base.
 */
Filtre.ATTRS = {
    /**
     * Collection of strings used to label elements in the component. Default
     * collection contains the following name:value pairs:
     * 
     * <ul>
     * <li>hide       : &quot;Cacher le filtrage&quot;</li>
     * <li>hideActive : &quot;Cacher le filtre en cours&quot;</li>
     * <li>show       : &quot;Afficher le filtrage&quot;</li>
     * <li>showActive : &quot;Afficher le filtre en cours&quot;</li>
     * </ul>
     * 
     * @attribute strings
     * @type Object
     */
    strings: {
        valueFn: function() {
            return Y.Intl.get('hornet-filtre');
        }
    },

    /**
     * @attribute buttonsHeader
     * @type Y.Node
     */
    buttonsHeader: {
        writeOnce: true,
        setter: function(value) {
            var el = Y.one( value );
            if(el) {
                return el;
            } else {
                return Y.Attribute.INVALID_VALUE;
            }
        }
    },

    /**
     * @attribute buttonsFooter
     * @type Y.Node
     */
    buttonsFooter: {
        writeOnce: true,
        setter: function(value) {
            var el = Y.one( value );
            if(el) {
                return el;
            } else {
                return Y.Attribute.INVALID_VALUE;
            }
        }
    },

    /**
     * @attribute cancelButton
     * @type Y.Node
     */
    cancelButton: {
        writeOnce: true,
        setter: function(value) {
            var el = Y.one( value );
            if(el) {
                return el;
            } else {
                return Y.Attribute.INVALID_VALUE;
            }
        }
    },

    /**
     * @attribute submitButton
     * @type Y.Node
     */
    submitButton: {
        writeOnce: true
    },

    /**
     * @attribute closeButton
     * @type Y.Node
     */
    closeButton: {
        writeOnce: true
    },

    /**
     * @attribute showButton
     * @type Y.Node
     */
    showButton: {
        writeOnce: true,
        setter: function(value) {
            var el = Y.one( value );
            if(el) {
                return el;
            } else {
                return Y.Attribute.INVALID_VALUE;
            }
        }
    },

    /**
     * @attribute inputFields
     * @type Y.NodeList
     */
    inputFields: {
        writeOnce: true
    },
    
    /** 
     * @attribute active
     * @type Boolean
     */
    active: {
        value: false,
        validator: ISBOOLEAN
    },
    
    /** 
     * @attribute icon
     * @type String
     */
    icon: {
        validator: ISSTRING
    },
    
    /** 
     * @attribute iconActive
     * @type String
     */
    iconActive: {
        validator: ISSTRING
    }
};

/* Filtre extends the base Widget class */
Y.extend(Filtre, Y.Widget, {

    // ///////////////////////////////////////////////////////////////////////////
    //
    // ATTRIBUTE HELPERS
    //
    // ///////////////////////////////////////////////////////////////////////////


    // ///////////////////////////////////////////////////////////////////////////
    //
    // PROPERTIES
    //
    // ///////////////////////////////////////////////////////////////////////////

    /**
     * @property TEMPLATES
     * @description The Substitute Templates for creating the content
     * @type Object
     * 
     */
    TEMPLATES: {
        icon: "<a title='{text}' class='icone' href='{href}'>{value}</a>",
        img: "<img src='{src}' alt='{text}'/>",
        button: "<span class='yui-button'><span class='first-child'><button type='button'>{text}</button></span>"
    },
    
    // ///////////////////////////////////////////////////////////////////////////
    //
    // METHODS
    //
    // ///////////////////////////////////////////////////////////////////////////
    
    /**
     * initializer is part of the lifecycle introduced by 
     * the Widget class. It is invoked during construction,
     * and can be used to set up instance specific state.
     *  
     * @method initializer
     * @private
     */
    initializer: function(config) {
        this.publish("update", {
            defaultFn: this._defUpdateFn,
            bubbles:false
         });

        this.fire('update');
    },

    /**
     * destructor is part of the lifecycle introduced by 
     * the Widget class. It is invoked during destruction,
     * and can be used to clean up instance specific state.
     * 
     * @method destructor
     * @private
     */
    destructor : function() {
        
    },
    
    /**
     * Renders UI
     * 
     * renderUI is part of the lifecycle introduced by the
     * Widget class. Widget's renderer method invokes:
     *     renderUI()
     *     bindUI()
     *     syncUI()
     * renderUI is intended to be used by the Widget subclass
     * to create or insert new elements into the DOM. 
     * 
     * The method adds the hide button (if it's not already 
     * present in the markup)
     * 
     * @method renderUI
     * @private
     */
    renderUI : function() {
        this._renderCloseButton();
        this._renderShowButton();
    },
    
    /**
     * Binds UI
     * 
     * bindUI is intended to be used by the Widget subclass 
     * to bind any event listeners which will drive the Widget UI.
     * 
     * It will generally bind event listeners for attribute change
     * events, to update the state of the rendered UI in response 
     * to attribute value changes, and also attach any DOM events,
     * to activate the UI.
     * 
     * @method bindUI
     * @private
     */
    bindUI: function () {
        var closeButton  = this.get('closeButton'),
            showButton  = this.get('showButton'),
            cancelButton = this.get('cancelButton'),
            submitButton  = this.get('submitButton');
        
        if (closeButton) {
            Y.on(CLICK, Y.bind(this._onCloseButtonClick,  this), closeButton);
        }
        if (showButton) {
            Y.on(CLICK, Y.bind(this._onShowButtonClick,   this), showButton);
        }
        if (cancelButton) {
            Y.on(CLICK, Y.bind(this._onCancelButtonClick, this), cancelButton);
        }
        if (submitButton) {
            Y.on(CLICK, Y.bind(this._onSubmitButtonClick, this), submitButton);
        }
        
        this.after("activeChange", Y.bind(this._afterActiveChange, this));
        this.after("visibleChange", Y.bind(this._afterVisibleChange, this));
        
        // Using AOP to inject logic after main widget methods.
        //Y.after(this.syncUI, this, 'hide');
        //Y.after(this.syncUI, this, 'show');
    },

    /**
     * Syncs UI
     * 
     * syncUI is intended to be used by the Widget subclass to
     * update the UI to reflect the current state of the widget.
     * 
     * @method syncUI
     * @private
     */
    syncUI : function() {
        this._uiFiltreSetActive(this.get(ACTIVE));
        this._uiFiltreSetVisible(this.get(VISIBLE));
    },

    /**
     * Reset all input fields values used for filtering to empty or unselected
     * 
     * @method reset
     * @public
     */
    reset: function () {      
        var inputFields = this.get('inputFields');
        
        if(inputFields) {    
            inputFields.each(function (input) {
                
                if (input.get('type') == "checkbox") {
                    input.set('checked', false);
                } else if (input.get('type') == "text") {
                    input.set('value', '');
                }
            });
        }

        this.fire('update');
        this.syncUI();
    },

    /**
     * Creates the show button for the filter and adds it to
     * the widget's actions box, if not already in the markup.
     * 
     * @method _renderCloseButton
     * @private
     */
    _renderShowButton : function() { 
        var buttonsHeader = this.get('buttonsHeader'),
            showButton    = this.get('showButton'),
            icon          = this.get('icon'),
            strings       = this.get(STRINGS),
            value;
   
        if (!showButton && !!buttonsHeader) {

            // Create image if icon is defined.
            if (!!icon) {
                value = SUB(this.TEMPLATES.img, {
                    src: icon, 
                    text: strings.show
                });
            } else {
                value = strings.show;
            }

            // Create Y.Node instance of button.
            showButton = this._createIcon(strings.show, value, '', ['icone', 'filtrer', Filtre.CLASS_NAMES.showButton]);
            
            // Append button to a parent Node.
            buttonsHeader.appendChild(showButton);
            
            this.set('showButton', showButton);
        }
    },

    /**
     * Creates the close button for the filter and adds it to
     * the widget's content box, if not already in the markup.
     * 
     * @method _renderCloseButton
     * @private
     */
    _renderCloseButton : function() {
        var contentBox    = this.get(CONTENT_BOX),
            buttonsFooter = this.get('buttonsFooter'),
            closeButton   = this.get('closeButton'),
            strings       = this.get(STRINGS);

        if (!closeButton) {
            // Create Y.Node instance of button.
            closeButton = this._createButton(strings.hide, Filtre.CLASS_NAMES.closeButton);

            // Append button to a parent Node.
            if (!!buttonsFooter) {
                buttonsFooter.appendChild(closeButton);
            } else {
                contentBox.appendChild(closeButton);
            }
            
            this.set('closeButton', closeButton);
        }
    },

    /**
     * Utility method, to create an icon button
     * 
     * @method _createIcon
     * @param text
     *            The value for the title link
     * @param value
     *            The value for the link
     * @param href
     *            The link to redirect to if the button is clicked
     * @param classNames
     *            The classNames for the link
     * @private
     */
    _createIcon : function(text, value, href, classNames) {
        var template, node, classNamesList;
        
        template = SUB(this.TEMPLATES.icon, {
            href : href || '#', 
            text: text, 
            value: value
        });

        // Create Y.Node instance of button.
        node = CREATE(template);
        
        // Add any classes to the Node.
        classNamesList = Y.Array(classNames);
        Y.Array.each(classNamesList, node.addClass, node);

        return node;
    },

    /**
     * Utility method, to create a button
     * 
     * @method _createButton
     * @param text
     *            The value for the button
     * @param className
     *            The className for the button
     * @private
     */
    _createButton : function(text, className) {
        var template = SUB(this.TEMPLATES.button, {
            className: className, 
            text: text
        });

        // Create Y.Node instance of button.
        return CREATE(template);
    },
    
    /**
     * Check if all input fields values used for filtering are empty or unselected and update the 
     * active attribute
     * 
     * @method _updateActivityState
     * @public
     */
    _updateActivityState: function () {      
        var inputFields = this.get("inputFields"),
        count = 0;
        
        if(inputFields) {    
            inputFields.each(function (input) {
                if (input.get('type') === "checkbox" && input.get('checked') === true) {
                    count++;
                } else if (input.get('type') === "text" && !!(input.get('value'))) {
                    count++;
                }
            });
        }
        
        this.set(ACTIVE, (count > 0));
    },
    
    /**
     * Function to update the classes depending on the 
     * activity state
     * 
     * @method _updateButtonActivityClasses
     * @private
     */
    _updateButtonActivityClasses: function () {
        var active     = this.get(ACTIVE),
            showButton = this.get('showButton');

        if (showButton) {
            
            if (!!active) {
                showButton.addClass(Filtre.CLASS_NAMES.showButtonActive);
            } else {
                showButton.removeClass(Filtre.CLASS_NAMES.showButtonActive);
            }
        }
    },
    
    /**
     * Function to update the text of the showButton depending on the 
     * visibility and activity states
     * 
     * @method _updateShowButtonText
     * @private
     */
    _updateShowButtonText: function () {
        var active     = this.get(ACTIVE),
            visible    = this.get(VISIBLE),
            showButton = this.get('showButton'),
            strings    = this.get(STRINGS),
            img, value;

        if (!!visible) {
            if (!!active) {
                value = strings.hideActive;
            } else {
                value = strings.hide;
            }
        } else {
            if (!!active) {
                value = strings.showActive;
            } else {
                value = strings.show;
            }
        }
        
        if (!!showButton) {
            showButton.set('title', value);
            
            img = showButton.one("img");
            if (!!img) {
                img.set('alt', value);
            } else {
                showButton.set('innerHTML', value);
            }
        }
    },
    
    /**
     * Function to update the classes on the ShowButton depending on the 
     * visibility state
     * 
     * @method _updateShowButtonVisibilityClasses
     * @private
     */
    _updateShowButtonVisibilityClasses: function () {
        var visible    = this.get(VISIBLE),
            showButton = this.get('showButton');

        if (showButton) {

            if (!!visible) {
                showButton.removeClass(Filtre.CLASS_NAMES.showButtonHidden);
                showButton.addClass(Filtre.CLASS_NAMES.showButtonVisible);
            } else {
                showButton.addClass(Filtre.CLASS_NAMES.showButtonHidden);
                showButton.removeClass(Filtre.CLASS_NAMES.showButtonVisible);
            }
        }
    },
    
    /**
     * Function to update the image source of the showButton depending on the 
     * activity state
     * 
     * @method _updateShowButtonActivityImage
     * @private
     */
    _updateShowButtonActivityImage: function () {
        var active     = this.get(ACTIVE),
            showButton = this.get('showButton'),
            icon       = this.get('icon'),
            iconActive = this.get('iconActive'),
            img;

        if (!!showButton) {
            img = showButton.one("img");
            if (!!img && !!iconActive && !!icon) {
                if (!!active) {
                    img.set('src', iconActive);
                } else {
                    img.set('src', icon);
                }
            }
        }
    },
    
    /**
     * Function to update the text of the closeButton depending on the 
     * activity state
     * 
     * @method _updateCloseButtonActivityText
     * @private
     */
    _updateCloseButtonActivityText: function () {
        var active      = this.get(ACTIVE),
            closeButton = this.get('closeButton'),
            strings     = this.get(STRINGS),
            button, value;

        if (!!active) {
            value = strings.hideActive;
        } else {
            value = strings.hide;
        }
        
        if (!!closeButton) {
            
            button = closeButton.one("button");
            if (!!button) {
                button.set('innerHTML', value);
            } else {
                closeButton.set('innerHTML', value);
            }
        }
    },

    // ///////////////////////////////////////////////////////////////////////////
    //
    // LISTENERS, UI UPDATE METHODS
    //
    // ///////////////////////////////////////////////////////////////////////////

    /**
     * Listens for changes in state, and asks for a UI update (controller)
     * 
     * @method _afterVisibleChange
     * @param event
     *            The EventFacade for the event
     * @private
     */
    _afterVisibleChange : function(event) {
        this._uiFiltreSetVisible(event.newVal);
    },

    /**
     * Update the state of the visible attribute in the UI (view)
     * 
     * @method _uiFiltreSetVisible
     * @param val
     *            The new value for the attribute
     * @private
     */
    _uiFiltreSetVisible : function(val) {
        this._updateShowButtonVisibilityClasses();
        this._updateShowButtonText();
    },

    /**
     * Listens for changes in state, and asks for a UI update (controller)
     * 
     * @method _afterActiveChange
     * @param event
     *            The EventFacade for the event
     * @private
     */
    _afterActiveChange : function(event) {
        this._uiFiltreSetActive(event.newVal);
    },

    /**
     * Update the state of the active attribute in the UI (view)
     * 
     * @method _uiFiltreSetActive
     * @param val
     *            The new value for the attribute
     * @private
     */
    _uiFiltreSetActive : function(val) {
        this._updateButtonActivityClasses();
        this._updateShowButtonText();
        this._updateShowButtonActivityImage();
        this._updateCloseButtonActivityText();
    },

    /**
     * Default Handler for "update" events
     * 
     * @method _defUpdateFn
     * @param event
     *            The EventFacade for the event
     * @private
     */
    _defUpdateFn : function(event) {
        this._updateActivityState();
    },

    /**
     * ShowButton Click handler. 
     * 
     * @method _onShowButtonClick
     * @param event
     *            The EventFacade for the event
     * @private
     */
    _onShowButtonClick : function(event) {
        event.halt(true);
        if (this.get(VISIBLE)) {
            this.hide();
        } else {
            this.show();
        }
    },

    /**
     * CloseButton Click handler. 
     * 
     * @method _onCloseButtonClick
     * @param event
     *            The EventFacade for the event
     * @private
     */
    _onCloseButtonClick : function(event) {
        this.hide();
    },

    /**
     * SubmitButton Click handler. 
     * 
     * @method _onSubmitButtonClick
     * @param event
     *            The EventFacade for the event
     * @private
     */
    _onSubmitButtonClick : function(event) {
        this.fire('update');
    },

    /**
     * CancelButton Click handler. 
     * 
     * @method _onCancelButtonClick
     * @param event
     *            The EventFacade for the event
     * @private
     */
    _onCancelButtonClick : function(event) {
        this.reset();
        this.hide();
    }
});

Y.namespace('hornet').filtre = Filtre;


}, '3.3.0' ,{requires:['widget-base', 'widget-htmlparser', 'substitute'], lang:['fr'], skinnable:true});
