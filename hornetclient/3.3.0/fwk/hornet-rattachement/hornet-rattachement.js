YUI.add('hornet-rattachement', function(Y) {

function compile(ptn) {
    if (ptn != undefined) {
        if (ptn == '' || !window.RegExp) {
            return function(val) { return val == ptn; }
        } else {
            var reg = new RegExp(ptn);
            return function (val) { 
                if (val == '') { // ignore empty option added by template 
                    return true;
                }
                return reg.test(val); }
        }
    }
    return function(val) { return false; }
}

function sortByText(a, b) {
    if (a.text < b.text) {return -1}
    if (a.text > b.text) {return 1}
    return 0;
}

function moveSelectedOptions(objSourceElement, objTargetElement, toSort, notMove1, notMove2) {
    var test1 = compile(notMove1);
    var test2 = compile(notMove2);
    moveOptions(objSourceElement, objTargetElement, toSort, 
        function(opt) {
            return (opt.selected && !test1(opt.value) && !test2(opt.value));
        }
    );
}

function moveAllOptions(objSourceElement, objTargetElement, toSort, notMove1, notMove2) {
    var test1 = compile(notMove1);
    var test2 = compile(notMove2);
    moveOptions(objSourceElement, objTargetElement, toSort, 
        function(opt) {
            return (!test1(opt.value) && !test2(opt.value));
        }
    );
}

function moveOptions(objSourceElement, objTargetElement, toSort, chooseFunc) {
    var aryTempSourceOptions = new Array();
    var aryTempTargetOptions = new Array();
    var x = 0;

    //looping through source element to find selected options
    for (var i = 0; i < objSourceElement.length; i++) {
        if (chooseFunc(objSourceElement.options[i])) {
            //need to move this option to target element
            var intTargetLen = objTargetElement.length++;
            objTargetElement.options[intTargetLen].text =   objSourceElement.options[i].text;
            objTargetElement.options[intTargetLen].value =  objSourceElement.options[i].value;
        }
        else {
            //storing options that stay to recreate select element
            var objTempValues = new Object();
            objTempValues.text = objSourceElement.options[i].text;
            objTempValues.value = objSourceElement.options[i].value;
            aryTempSourceOptions[x] = objTempValues;
            x++;
        }
    }

    //sorting and refilling target list
    for (var i = 0; i < objTargetElement.length; i++) {
        var objTempValues = new Object();
        objTempValues.text = objTargetElement.options[i].text;
        objTempValues.value = objTargetElement.options[i].value;
        aryTempTargetOptions[i] = objTempValues;
    }
    
    if (toSort) {
        aryTempTargetOptions.sort(sortByText);
    }    
    
    for (var i = 0; i < objTargetElement.length; i++) {
        objTargetElement.options[i].text = aryTempTargetOptions[i].text;
        objTargetElement.options[i].value = aryTempTargetOptions[i].value;
        objTargetElement.options[i].selected = false;
    }   
    
    //resetting length of source
    objSourceElement.length = aryTempSourceOptions.length;
    //looping through temp array to recreate source select element
    for (var i = 0; i < aryTempSourceOptions.length; i++) {
        objSourceElement.options[i].text = aryTempSourceOptions[i].text;
        objSourceElement.options[i].value = aryTempSourceOptions[i].value;
        objSourceElement.options[i].selected = false;
    }
}

function selectAllOptionsExceptSome(objTargetElement, type, ptn) {
    var test = compile(ptn);
    for (var i = 0; i < objTargetElement.length; i++) {
        var opt = objTargetElement.options[i];
        if ((type == 'key' && !test(opt.value)) ||
              (type == 'text' && !test(opt.text))) {
            opt.selected = true;
        } else {
            opt.selected = false;
        }    
    }
    return false;
}

function selectAllOptions(objTargetElement) {
    for (var i = 0; i < objTargetElement.length; i++) {
        if (objTargetElement.options[i].value != '') {
            objTargetElement.options[i].selected = true;    
        }    
    }
    return false;
}

function swapOptions(objTargetElement, first, second) {
    var opt = objTargetElement.options;
    var temp = new Option(opt[first].text, opt[first].value, opt[first].defaultSelected, opt[first].selected);
    var temp2= new Option(opt[second].text, opt[second].value, opt[second].defaultSelected, opt[second].selected);
    opt[first] = temp2;
    opt[second] = temp;
}

function moveOptionUp(objTargetElement, type, ptn) {
    var test = compile(ptn);
    for (i=0; i<objTargetElement.length; i++) {
        if (objTargetElement[i].selected) {
            var v;
            if (i != 0 && !objTargetElement[i-1].selected) {
                if (type == 'key') {
                    v = objTargetElement[i-1].value
                }
                else {
                    v = objTargetElement[i-1].text;
                }
                if (!test(v)) {
                    swapOptions(objTargetElement,i,i-1);
                }
            }
        }
    }
}

function moveOptionDown(objTargetElement, type, ptn) {
    var test = compile(ptn);
    for (i=(objTargetElement.length-1); i>= 0; i--) {
        if (objTargetElement[i].selected) {
            var v;
            if ((i != (objTargetElement.length-1)) && !objTargetElement[i+1].selected) {
                if (type == 'key') {
                    v = objTargetElement[i].value
                }
                else {
                    v = objTargetElement[i].text;
                }
                if (!test(v)) {
                    swapOptions(objTargetElement,i,i+1);
                }
            }
        }
    }
}

/**
 * A mechanism to replace a list of checkboxes with two multiselect boxes
 * 
 * @module hornet-rattachement
 */

    // Util shortcuts
    
var getClassName = Y.ClassNameManager.getClassName,
    ISSTRING = Y.Lang.isString,
    ISBOOLEAN = Y.Lang.isBoolean,
    ISNUMBER = Y.Lang.isNumber,
    ISARRAY = Y.Lang.isArray,
    ISVALUE = Y.Lang.isValue,
    CREATE = Y.Node.create,
    SUB = Y.Lang.sub,

    // Frequently used strings
    
    NAME = "Rattachement",
    NAME_LC = "rattachement",
    FORM = "form",
    
    // CSS class names
    
    CLASSNAMES = {
        panelContent: getClassName(NAME_LC, "panel"),
        selectedContent: getClassName(NAME_LC, "selected"),
        availableContent: getClassName(NAME_LC, "available"),
        actionsContent: getClassName(NAME_LC, "actions"),
        
        label: getClassName(NAME_LC, "label"),
        list: getClassName(NAME_LC, "data"),
        option: getClassName(NAME_LC, "entry"),
        
        actionButton: getClassName(NAME_LC, "action", "button"),
        selectButton: getClassName(NAME_LC, "action", "select"),
        deselectButton: getClassName(NAME_LC, "action", "deselect"),
        selectAllButton: getClassName(NAME_LC, "action", "select", "all"),
        deselectAllButton: getClassName(NAME_LC, "action", "deselect", "all")
    },
    
    // CSS selectors
    
    FORM_SELECTOR = FORM;
    
// Utility functions

var getParentForm = function (node) {

    return node.ancestor(FORM_SELECTOR);
    
};

/**
 * A Widget which replaces a list of checkboxes with two select box This version
 * works exclusively in a Progressive Enhancement situation in which it replaces
 * existing markup, and provides no helper methods to add or remove elements. It
 * also does not yet provide usability improvements like ARIA and keyboard
 * support.
 * 
 * @namespace hornet
 * @class Rattachement
 * @constructor
 * @extends Widget
 */
var Rattachement = function () {
    this._data = {};
    Rattachement.superclass.constructor.apply(this, arguments);
};

/**
 * Class Name
 * 
 * @property NAME
 * @type String
 * @static
 * @final
 * @value "Rattachement"
 */

Rattachement.NAME = NAME;

Rattachement.HTML_PARSER = {
    selectedListName: function (contentBox) {
        var select = contentBox.one('input[type="checkbox"]');
        if (select) {
            return select.get('name');
        }
        return "";
    },
    data: function (contentBox) {
        var checkboxList = contentBox.one('ul'), elements, data = [];
        if(checkboxList) {
            elements = checkboxList.all('input[type="checkbox"]');
    
            elements.each(function (el) {
                var value = el.get('value'), id = el.get('id'), 
                selected = el.get('checked'), 
                labelElement = id ? contentBox.one('label[for="'+id+'"]') : null,
                text = labelElement ? labelElement.get('innerHTML') : "";
                
                data.push({ value: value, text: text, selected: selected });
            });
    
            // suppression des elements html
            checkboxList.remove();
        }
        
        return data;
    }
};

Rattachement.ATTRS = {
        
    /**
     * Collection of strings used to label elements in the component. Default
     * collection contains the following name:value pairs:
     * 
     * <ul>
     * <li>selectedLabel          : &quot;Liste selectionnee&quot;</li>
     * <li>availableLabel         : &quot;Liste disponible&quot;</li>
     * <li>selectActionLabel      : &quot;Selectionner&quot;</li>
     * <li>deselectActionLabel    : &quot;Deselectionner&quot;</li>
     * <li>selectAllActionLabel   : &quot;Selectionner tout&quot;</li>
     * <li>deselectAllActionLabel : &quot;Deselectionner tout&quot;</li>
     * </ul>
     * 
     * @attribute strings
     * @type {Object}
     */
    strings: {
        valueFn: function() {
            return Y.Intl.get('hornet-rattachement');
        }
    },
    /**
     * @attribute data
     * @description An array of key-value pairs of the values and text
     *              associated with each entry in the select list.
     * @type {Array}
     */
    data: {
        value: {},
        validator: ISARRAY
    },
    /**
     * @attribute size
     * @description The size of the select box. Defaults to 15.
     * @type {Integer}
     */
    size: {
        value: 15,
        setter: function(val, name) {
            return parseInt(val, 10);
        },
        validator: function(val, name) {
            return (ISNUMBER(parseInt(val, 10)));
        }
    },

    selectedContainer: {
        writeOnce: true
    },
    selectedListNode: {
        writeOnce: true
    },
    /**
     * @attribute selectedListName
     * @description The HTML Name of the select box for the selected list.
     * @type {String}
     */
    selectedListName: {
        validator: ISSTRING
    },
    /**
     * @attribute selectedLabel
     * @description This attribute is the text of the label element associated
     *              with the selected list.
     * @type {String}
     */
    selectedLabel: {
        valueFn: "_defaultSelectedLabel",
        validator: ISSTRING
    },
    selectedHeaderNode: {
        writeOnce: true
    },

    availableContainer: {
        writeOnce: true
    },
    availableListNode: {
        writeOnce: true
    },
    /**
     * @attribute availableListName
     * @description The HTML Name of the select box for the available list. Default to empty string.
     * @type {String}
     */
    availableListName: {
        value: "",
        validator: ISSTRING
    },
    /**
     * @attribute availableLabel
     * @description This attribute is the text of the label element associated
     *              with the available list.
	 * @type {String}
     */
    availableLabel: {
        valueFn: "_defaultAvailableLabel",
        validator: ISSTRING
    },
    availableHeaderNode: {
        writeOnce: true
    },

    actionsContainer: {
        writeOnce: true
    },
	/** 
	 * @attribute allowSelectAction
	 * @type {Boolean}
	 */
    allowSelectAction: {
        value: true,
        validator: ISBOOLEAN
    },
	/** 
	 * @attribute selectActionLabel
	 * @type {String}
	 */
    selectActionLabel: {
        valueFn: "_defaultSelectActionLabel",
        validator: ISSTRING
    },
    selectActionButton: {
        writeOnce: true
    },
	/** 
	 * @attribute allowDeselectAction
	 * @type {Boolean}
	 */
    allowDeselectAction: {
        value: true,
        validator: ISBOOLEAN
    },
	/** 
	 * @attribute deselectActionLabel
	 * @type {String}
	 */
    deselectActionLabel: {
        valueFn: "_defaultDeselectActionLabel",
        validator: ISSTRING
    },
    deselectActionButton: {
        writeOnce: true
    },
	/** 
	 * @attribute allowSelectAllAction
	 * @type {Boolean}
	 */
    allowSelectAllAction: {
        value: true,
        validator: ISBOOLEAN
    },
	/** 
	 * @attribute selectAllActionLabel
	 * @type {String}
	 */
    selectAllActionLabel: {
        valueFn: "_defaultSelectAllActionLabel",
        validator: ISSTRING
    },
    selectAllActionButton: {
        writeOnce: true
    },
	/** 
	 * @attribute allowDeselectAllAction
	 * @type {Boolean}
	 */
    allowDeselectAllAction: {
        value: true,
        validator: ISBOOLEAN
    },
	/** 
	 * @attribute selectAllActionLabel
	 * @type {String}
	 */
    deselectAllActionLabel: {
        valueFn: "_defaultDeselectAllActionLabel",
        validator: ISSTRING
    },
    deselectAllActionButton: {
        writeOnce: true
    }
};

Y.extend(Rattachement, Y.Widget, {

    // ///////////////////////////////////////////////////////////////////////////
    //
    // ATTRIBUTE HELPERS
    //
    // ///////////////////////////////////////////////////////////////////////////
    /**
     * @method _defaultSelectedLabel
     * @description Return the text of the label element associated with the
     *              selected list. Return the default value if one was not
     *              provided.
     * @returns String
     * @private
     */
    _defaultSelectedLabel: function() {
        return this.get("strings").selectedLabel;
    },
    /**
     * @method _defaultAvailableLabel
     * @description Return the text of the label element associated with the
     *              available list. Return the default value if one was not
     *              provided.
     * @returns String
     * @private
     */
     _defaultAvailableLabel: function() {
        return this.get("strings").availableLabel;
    },
    /**
     * @method _defaultSelectActionLabel
     * @description Return the text of the selectAction button. Return the
     *              default value if one was not provided.
     * @returns String
     * @private
     */
    _defaultSelectActionLabel: function() {
        return this.get("strings").selectActionLabel;
    },
    /**
     * @method _defaultDeselectActionLabel
     * @description Return the text of the deselectAction button. Return the
     *              default value if one was not provided.
     * @returns String
     * @private
     */
    _defaultDeselectActionLabel: function() {
         return this.get("strings").deselectActionLabel;
     },
     /**
     * @method _defaultSelectAllActionLabel
     * @description Return the text of the selectAllAction button. Return the
     *              default value if one was not provided.
     * @returns String
     * @private
     */
     _defaultSelectAllActionLabel: function() {
          return this.get("strings").selectAllActionLabel;
      },
      /**
     * @method _defaultDeselectAllActionLabel
     * @description Return the text of the deselectAllAction button. Return the
     *              default value if one was not provided.
     * @returns String
     * @private
     */
      _defaultDeselectAllActionLabel: function() {
           return this.get("strings").deselectAllActionLabel;
       },
      
    
    // ///////////////////////////////////////////////////////////////////////////
    //
    // PROPERTIES
    //
    // ///////////////////////////////////////////////////////////////////////////
        
    /**
     * @property TEMPLATES
     * @description The Substitute Templates for creating the header, body, and
     *              entries
     * @type Object
     * 
     */
    TEMPLATES: {
        selectedContent: "<div class='" + CLASSNAMES.panelContent + " " + CLASSNAMES.selectedContent + "'></div>",
        availableContent: "<div class='" + CLASSNAMES.panelContent + " " + CLASSNAMES.availableContent + "'></div>",
        actionsContent: "<div class='" + CLASSNAMES.panelContent + " " + CLASSNAMES.actionsContent + "'></div>",
        
        label: "<label class='" + CLASSNAMES.label + "' for='{forInputId}'></label>",
        list: "<select class='" + CLASSNAMES.list + "' name='{inputName}' id='{inputId}' size='{size}' multiple='multiple'></select>",
        option: "<option class='" + CLASSNAMES.option + "' value='{value}'>{text}</option>",
        
        action: "<span class='" + CLASSNAMES.actionButton + "'></span>",
        actionButton: "<span class='{actionClassName}'><span class='yui-button'><span class='first-child'><button type='button'>{value}</button></span></span>"
    },
    
    // ///////////////////////////////////////////////////////////////////////////
    //
    // METHODS
    //
    // ///////////////////////////////////////////////////////////////////////////
    
    /**
     * Renders UI
     * 
     * @method renderUI
     * @private
     */
    renderUI: function () {
        var contentBox = this.get('contentBox'), selectedContent = this.get('selectedContent'), availableContent = this.get('availableContent'), actionsContent = this.get('actionsContent'),     
            data = this.get('data'), size = this.get('size'), option;
            
        if (!ISVALUE(availableContent)) {
            availableContent = CREATE( this.TEMPLATES.availableContent );
            contentBox.append(availableContent);
            this.set('availableContent', availableContent);
        } else {
            availableContent.addClass(CLASSNAMES.availableContent);
        }
        if (!ISVALUE(actionsContent)) {
            actionsContent = CREATE( this.TEMPLATES.actionsContent );
            contentBox.append(actionsContent);
            this.set('actionsContent', actionsContent);
        } else {
            actionsContent.addClass(CLASSNAMES.actionsContent);
        }
        if (!ISVALUE(selectedContent)) {
            selectedContent = CREATE( this.TEMPLATES.selectedContent );
            contentBox.append(selectedContent);
            this.set('selectedContent', selectedContent);
        } else {
            selectedContent.addClass(CLASSNAMES.selectedContent);
        }
        
        var availableListNode = this.get('availableListNode'), 
        availableHeaderNode = this.get('availableHeaderNode'), 
        availableLabel = this.get('availableLabel'), 
        availableListName = this.get('availableListName'), 
        availableListId = Y.guid(availableListName);
        if (!ISVALUE(availableHeaderNode)) {
            availableHeaderNode = CREATE( SUB(this.TEMPLATES.label, {forInputId: availableListId}) );
            availableContent.append(availableHeaderNode);
            this.set('availableHeaderNode', availableHeaderNode);
        } else {
            availableHeaderNode.addClass(CLASSNAMES.label);
        }
        availableHeaderNode.setContent(availableLabel);
        
        if (!ISVALUE(availableListNode)) {
            availableListNode = CREATE( SUB(this.TEMPLATES.list, {inputName: availableListName, inputId: availableListId, size: size}) );
            availableContent.append(availableListNode);
            this.set('availableListNode', availableListNode);
        } else {
            availableListNode.addClass(CLASSNAMES.list);
        }
        availableListNode.setContent("");
        Y.Array.each(data, function (value) {
            if (!value.selected) {
                option = CREATE( SUB(this.TEMPLATES.option, value) );
                availableListNode.appendChild(option);
            }
        }, this);
        
        var selectedHeaderNode = this.get('selectedHeaderNode'), 
        selectedListNode = this.get('selectedListNode'), 
        selectedLabel = this.get('selectedLabel'),
        selectedListName = this.get('selectedListName'), 
        selectedInputId = Y.guid(selectedListName);
        if (!ISVALUE(selectedHeaderNode)) {
            selectedHeaderNode = CREATE( SUB(this.TEMPLATES.label, {forInputId: selectedInputId}) );
            selectedContent.append(selectedHeaderNode);
            this.set('selectedHeaderNode', selectedHeaderNode);
        } else {
            selectedHeaderNode.addClass(CLASSNAMES.label);
        }
        selectedHeaderNode.setContent(selectedLabel);
        if (!ISVALUE(selectedListNode)) {
            selectedListNode = CREATE( SUB(this.TEMPLATES.list, {inputName: selectedListName, inputId: selectedInputId, size: size}) );
            selectedContent.append(selectedListNode);
            this.set('selectedListNode', selectedListNode);
        } else {
            selectedListNode.addClass(CLASSNAMES.list);
        }
        selectedListNode.setContent("");
        Y.Array.each(data, function (value) {
            if (!!value.selected) {
                option = CREATE( SUB(this.TEMPLATES.option, value) );
                selectedListNode.appendChild(option);
            }
        }, this);

        var selectActionButton = this.get('selectActionButton'),
        selectActionLabel = this.get('selectActionLabel'),
        allowSelectAction = this.get('allowSelectAction'),
        selectActionContent;
        if (!ISVALUE(selectActionButton)) {
            if (allowSelectAction) {
                selectActionContent = CREATE( this.TEMPLATES.action );
                selectActionButton = CREATE( SUB(this.TEMPLATES.actionButton, {actionClassName: CLASSNAMES.selectButton, value: selectActionLabel}) );
                selectActionContent.append(selectActionButton);
                actionsContent.append(selectActionContent);
                this.set('selectActionButton', selectActionButton);
            }
        } else {
            if (allowSelectAction) {
                selectActionButton.addClass(CLASSNAMES.selectButton);
            } else {
                selectActionButton.remove();
            }
        }

        var deselectActionButton = this.get('deselectActionButton'),
        deselectActionLabel = this.get('deselectActionLabel'),
        allowDeselectAction = this.get('allowDeselectAction'),
        deselectActionContent;
        if (!ISVALUE(deselectActionButton)) {
            if (allowDeselectAction) {
                deselectActionContent = CREATE( this.TEMPLATES.action );
                deselectActionButton = CREATE( SUB(this.TEMPLATES.actionButton, {actionClassName: CLASSNAMES.deselectButton, value: deselectActionLabel}) );
                deselectActionContent.append(deselectActionButton);
                actionsContent.append(deselectActionContent);
                this.set('deselectActionButton', deselectActionButton);
            }
        } else {
            if (allowDeselectAction) {
                deselectActionButton.addClass(CLASSNAMES.deselectButton);
            } else {
                deselectActionButton.remove();
            }
        }
        
        var selectAllActionButton = this.get('selectAllActionButton'),
        selectAllActionLabel = this.get('selectAllActionLabel'),
        allowSelectAllAction = this.get('allowSelectAllAction'),
        selectAllActionContent;
        if (!ISVALUE(selectAllActionButton)) {
            if (allowSelectAllAction) {
                selectAllActionContent = CREATE( this.TEMPLATES.action );
                selectAllActionButton = CREATE( SUB(this.TEMPLATES.actionButton, {actionClassName: CLASSNAMES.selectAllButton, value: selectAllActionLabel}) );
                selectAllActionContent.append(selectAllActionButton);
                actionsContent.append(selectAllActionContent);
                this.set('selectAllActionButton', selectAllActionButton);
            }
        } else {
            if (allowSelectAllAction) {
                selectAllActionButton.addClass(CLASSNAMES.selectAllButton);
            } else {
                selectAllActionButton.remove();
            }
        }
        
        var deselectAllActionButton = this.get('deselectAllActionButton'),
        deselectAllActionLabel = this.get('deselectAllActionLabel'),
        allowDeselectAllAction = this.get('allowDeselectAllAction'),
        deselectAllActionContent;
        if (!ISVALUE(deselectAllActionButton)) {
            if (allowDeselectAllAction) {
                deselectAllActionContent = CREATE( this.TEMPLATES.action );
                deselectAllActionButton = CREATE( SUB(this.TEMPLATES.actionButton, {actionClassName: CLASSNAMES.deselectAllButton, value: deselectAllActionLabel}) );
                deselectAllActionContent.append(deselectAllActionButton);
                actionsContent.append(deselectAllActionContent);
                this.set('deselectAllActionButton', deselectAllActionButton);
            }
        } else {
            if (allowDeselectAllAction) {
                deselectAllActionButton.addClass(CLASSNAMES.deselectAllButton);
            } else {
                deselectAllActionButton.remove();
            }
        }
    },
    /**
     * Default Handler for submit events on the parent form
     * 
     * @method _submitHandler
     * @param event
     *            The EventFacade for the submit event
     * @private
     */
    _submitHandler: function (event) {
        var selectedListNode = this.get('selectedListNode');
        selectAllOptions(selectedListNode.getDOMNode());

        return true;
    },
    /**
     * Default Handler for click events on the selectAction button
     * 
     * @method _clickSelectHandler
     * @param event
     *            The EventFacade for the click event
     * @private
     */
    _clickSelectHandler: function (event) {
        var selectedListNode = this.get('selectedListNode'),
        availableListNode = this.get('availableListNode');
        moveSelectedOptions(availableListNode.getDOMNode(), selectedListNode.getDOMNode(), true);
    },
    /**
     * Default Handler for click events on the deselectAction button
     * 
     * @method _clickDeselectHandler
     * @param event
     *            The EventFacade for the click event
     * @private
     */
    _clickDeselectHandler: function (event) {
        var selectedListNode = this.get('selectedListNode'),
        availableListNode = this.get('availableListNode');
        moveSelectedOptions(selectedListNode.getDOMNode(), availableListNode.getDOMNode(), true);
    },
    /**
     * Default Handler for click events on the selectAllAction button
     * 
     * @method _clickSelectAllHandler
     * @param event
     *            The EventFacade for the click event
     * @private
     */
    _clickSelectAllHandler: function (event) {
        var selectedListNode = this.get('selectedListNode'),
        availableListNode = this.get('availableListNode');
        moveAllOptions(availableListNode.getDOMNode(), selectedListNode.getDOMNode(), true);
    },
    /**
     * Default Handler for click events on the deselectAllAction button
     * 
     * @method _clickDeselectAllHandler
     * @param event
     *            The EventFacade for the click event
     * @private
     */
    _clickDeselectAllHandler: function (event) {
        var selectedListNode = this.get('selectedListNode'),
        availableListNode = this.get('availableListNode');
        moveAllOptions(selectedListNode.getDOMNode(), availableListNode.getDOMNode(), true);
    },
    /**
     * Binds UI
     * 
     * @method bindUI
     * @private
     */
    bindUI: function () {
        var selectedListNode = this.get('selectedListNode'),
        selectActionButton = this.get('selectActionButton'), 
        deselectActionButton = this.get('deselectActionButton'), 
        selectAllActionButton = this.get('selectAllActionButton'), 
        deselectAllActionButton = this.get('deselectAllActionButton'),    
        
        containingForm = getParentForm(selectedListNode);
        if (containingForm) {
        containingForm.on('submit', this._submitHandler, this);
        }
        if (selectActionButton) {
        selectActionButton.on('click', this._clickSelectHandler, this);
        }
        if (deselectActionButton) {
        deselectActionButton.on('click', this._clickDeselectHandler, this);
        }
        if (selectAllActionButton) {
        selectAllActionButton.on('click', this._clickSelectAllHandler, this);
        }
        if (deselectAllActionButton) {
        deselectAllActionButton.on('click', this._clickDeselectAllHandler, this);
        }
    }
});

Y.namespace('hornet').rattachement = Rattachement;


}, '3.3.0' ,{requires:['widget-base', 'widget-htmlparser'], lang:['fr'], skinnable:true});
