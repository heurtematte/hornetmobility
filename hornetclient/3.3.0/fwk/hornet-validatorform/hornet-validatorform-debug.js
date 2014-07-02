YUI.add('hornet-validatorform', function(Y) {

/**
 * @fileoverview
 * 
 * <pre>
 * Surcharge du form manager pour adapter l'affichage des messages d'erreur, 
 * et intégrer un callback après la validation.
 * </pre>
 * 
 */
/**
 * @constructor 
 */
function FormMgrA11Y(form_name, config) {
	FormMgrA11Y.superclass.constructor.call(this, form_name, config);
	this._inlineErrorMessage = ("inlineErrorMessage" in config )&& config.inlineErrorMessage;
	this.callbackDisplayMessage = null;
	this.callbackPostValidateForm = null;
	if ( ("callbackDisplayMessage" in config ) && Y.Lang.isFunction (config.callbackDisplayMessage)) {
		this.callbackDisplayMessage = config.callbackDisplayMessage;
		this.callbackDisplayMessageScope = config.callbackDisplayMessageScope;
	}
	
	if ( ("callbackPostValidateForm" in config ) && Y.Lang.isFunction (config.callbackPostValidateForm)) {
		this.callbackPostValidateForm = config.callbackPostValidateForm;
		this.callbackPostValidateFormScope = config.callbackPostValidateFormScope;		
	}

	// TODO log des cas d'erreurs
}

FormMgrA11Y.NAME = "hornetFormMgrA11Y";

FormMgrA11Y.ATTRS = {
		
};


Y.extend(FormMgrA11Y, Y.FormManager, {
	
	displayMessage : function ( e , msg , type , scroll ) {
		if (this.callbackDisplayMessage!==null) {
			this.callbackDisplayMessage.call(this.callbackDisplayMessageScope, e, msg, type, scroll);
		}
		if (this._inlineErrorMessage) {
			FormMgrA11Y.superclass.displayMessage.call(this, e, msg, type, scroll);
		}
	},
	
	postValidateForm : function () {
		var retVal;
		retVal = true;
		if (this.callbackPostValidateForm !==null ) {
			retVal = this.callbackPostValidateForm.call(this.callbackPostValidateFormScope, this.callbackPostValidateForm);
		}; 
		return retVal;
	}
	
});

/**
 * @fileoverview
 * 
 * <pre>
 * Formulaire avec pattern validator.
 * Cette classe utilise un composant Form Manager pour :
 *   - affichage des messages d'erreur en haut du formulaire,
 *   - validation avec la bibliothèque de validator
 * </pre>
 * 
 */


//	Frequently used strings
var L = Y.Lang,
isString = L.isString;

/**
 * @constructor 
 */
// TODO ajouter des commentaires
function ValidatorForm(form_name, config) {
	this._errorBox=null;
	this._validation_error=null;
	this._anchorFields={};
	this._validators = {};
	this._formValidators = [];
	this._anchorByFormValidators = {};
	ValidatorForm.superclass.constructor.call(this, config);
	this.formManager = new FormMgrA11Y(form_name, 
			Y.merge(config, {
				callbackDisplayMessage: this._callbackDisplayMessage,
				callbackDisplayMessageScope : this,
				callbackPostValidateForm: this._callbackPostValidateForm,
				callbackPostValidateFormScope: this
			}));
}

ValidatorForm.NAME = "hornetValidatorForm";

ValidatorForm.ATTRS = {
	errorBox : {
		value : ".errorBox",
		setter : function (val) {
			this._errorBox = Y.one(val); 
		}
	},
	validation_error : {
		value : "",
		setter : function (value) {
			this._validation_error=value;
		},
		validator: isString
	}
};

function getId(fieldname) {
	var id;
	if (Y.Lang.isString(fieldname))
	{
		id = fieldname.replace(/^#/, '');
	}
	else if (fieldname instanceof Y.Node)
	{
		id = fieldname.get('id');
	}
	else
	{
		id = fieldname.id;
	}
	return id;
}


Y.extend(ValidatorForm, Y.Base, {

	clearForm: function() {
		if (!!this._errorBox) {
			this._errorBox.setContent("");
		}
		this.formManager.clearMessages();
	},
	
	validateForm : function () {
		this.clearForm();
		var retValue = this.formManager.validateForm.apply(this.formManager, arguments);
		return retValue;
	},
	prepareForm : function () {
		this.formManager.getForm();
	},
	
	setErrorMessages : function (
			/* string */	id,
			/* object */	map,
			/* string */	anchorname) {
		this.formManager.setErrorMessages.apply(this.formManager,arguments);
		if (!!anchorname) {
			this._anchorFields[id] = anchorname;
		}
	},
	
	addErrorMessage : function (
			/* string */	id,
			/* string */	error_type,
			/* string */	msg,
			/* string */	anchorname) {
		this.formManager.addErrorMessage.apply(this.formManager,arguments);
		if (!!anchorname) {
			this._anchorFields[id] = anchorname;
		}
	},
	
	setDefaultValue : function () {
		this.formManager.setDefaultValue.apply(this.formManager,arguments);
	},
	
	/**
	 * Ajoute un validateur pour le champ indiqué.
	 */
	addValidator : function (fieldname, validator, anchorname) {
		if (!!anchorname) {
			this._anchorFields[fieldname] = anchorname;
		}
		// récupération de l'id associé au fieldname
		var id = getId(fieldname);
		// si il y avait déjà un validator, alors il faut encapsuler avec un composite.
		var oldValidator = this._validators[id];
		var newValidator = null;
		
		if (oldValidator === undefined ) {
			newValidator = validator;
		} else {
			newValidator = new Y.hornet.CompositeValidator(oldValidator, validator);
		}
		this._validators[id] = newValidator;
		this.formManager.setFunction (fieldname, 
			{fn:function (f, elt) {
				var testval = newValidator.validate(f, elt);
				Y.log('validator.validate: '+testval, 'info', ValidatorForm.NAME);
				if (!testval) {
					this.formManager.displayMessage(elt, newValidator.getErrorMessage(),'error', true);
				}
				return testval;
			}, scope: this});

		
	},

	addFormValidator : function ( validator, anchorname) {
		this._formValidators.push(validator);
		this._anchorByFormValidators[validator]= anchorname;
	},

	_callbackPostValidateForm : function () {
		var retValue = true;
		// appel des forms validators
		var ifv;
		for (ifv = 0; ifv < this._formValidators.length  && retValue; ifv++ ){
			retValue = this._formValidators[ifv].validate( );
		}
		if (!retValue) {
			this.formManager.displayMessage(this._formValidators[ifv-1], this._formValidators[ifv-1].getErrorMessage(),'error', true);
		} else {
			// evenement post validation uniquement si il y a eu validation 
			retValue = retValue && (Y.fire('validate', {}));
		}
		
		return retValue; 
	},
		
	_callbackDisplayMessage : function (e, msg, type, scroll){
		if (!!this._errorBox) {
			if (e) {
				var anchorName = null;
				if (e instanceof Y.hornet.Validator) {
					// il s'agit d'un form validator
					anchorName = this._anchorByFormValidators[e];
				} else {
					var fieldname = Y.one(e).get('id');
					if (fieldname && this._anchorFields[fieldname]) {
						anchorName = this._anchorFields[fieldname];
					}
				}
			
				if (anchorName) {
					msg = '<a href="#'+anchorName+'" >'+msg+'</a>';
				}
			}
			var containerBox = this._errorBox.one("> div");
			if(!containerBox) {
				containerBox = Y.Node.create('<div/>');
				this._errorBox.append(containerBox);
			}
			var contentBox = containerBox.one("ul");
			if(!contentBox) {
				// Create a new UL Node
				contentBox = Y.Node.create('<ul></ul>');
				containerBox.append(contentBox);
			}
			contentBox.append("<li>"+msg+"</li>");
		}
		if (!this.formManager.has_messages) {
			try
			{
				e.focus();
			}
			catch (ex)
			{
				// no way to determine in IE if this will fail
			}
		}
		this.formManager.has_messages = true;
	},

	notifyErrors: function(scroll){
		if (Y.Lang.isUndefined(scroll)) {
			scroll = true;
		}
		if (!!this._errorBox) {
			
			var containerBox = this._errorBox.one("> div");
			if(containerBox && !!this._validation_error) {
				// Ajout du titre s'il est defini
				containerBox.prepend(Y.Node.create(this._validation_error));
			}
			
			if (scroll) {
				//this._errorBox.scrollIntoView();
				var anchorId = Y.guid(),
				anchorErrorBox = Y.Node.create('<a id="' + anchorId + '" href="#' + anchorId + '" tabindex="-1"></a>');
				this._errorBox.prepend(anchorErrorBox);
				
				var firstLink = this._errorBox.one("a");
				if (firstLink) {
					firstLink.focus();
				}
			}
		}
	}
});


Y.namespace("hornet").ValidatorForm = ValidatorForm;


}, '3.3.0' ,{skinnable:false, requires:['gallery-formmgr', 'base-base', 'hornet-validator-all']});
