YUI.add('hornet-compositevalidator', function(Y) {

/**
 * @fileoverview
 * 
 * <pre>
 * Composant composite de validation.
 * Cette classe permet de rassembler deux composants Validator 
  
 * </pre>
 * 
 */


//    Frequently used strings
var L = Y.Lang,
isBoolean = L.isBoolean,
isString = L.isString,
isFunction = L.isFunction,

FIRST_VALIDATOR = 'firstValidator',
SECOND_VALIDATOR = 'secondValidator',
CONTINUE_IF_FAILURE = 'continueIfFailure';

/**
 * @class CompositeValidator
 * @constructor
 * @param firstValidator {String} Le premier validateur à appeler
 * @param secondValidator {String} Le deuxième validateur à appeler
 * @param config {Object} Configuration.
 *        <code>continueIfFailure</code> est un booléen optionnel indiquant si le deuxième validateur est appelé même si le premier échoue.
 */
function CompositeValidator(firstValidator, secondValidator, config) {
    
    config = config || {};
    config.firstValidator = firstValidator;
    config.secondValidator = secondValidator;
	this.firstIsValid = false;
	this.secondIsValid = false;
    CompositeValidator.superclass.constructor.call(this, config);
}

CompositeValidator.NAME = 'hornetCompositeValidator';

CompositeValidator.ATTRS = {


        /**
         * Le premier validator utilisé pour la validation.
         * 
         * @config firstValidator
         * @type {Y.hornet.Validator}
         */
    firstValidator : {
        value: null,
        setter: function(validator){
            if (!!validator && validator instanceof Y.hornet.Validator) {
                return validator;
            }
            return Y.Attribute.INVALID_VALUE;
        }
    },


    /**
     * Le deuxième validator utilisé pour la validation.
     * 
     * @config secondValidator
     * @type {Y.hornet.Validator}
     */
    secondValidator : {
        value: null,
        setter: function(validator){
            if (!!validator && validator instanceof Y.hornet.Validator) {
                return validator;
            }
            return Y.Attribute.INVALID_VALUE;
        }
    },

    /**
     * L'indication si le deuxième validateur est appelé même quand la 
     * première validation retourne <code>false</code>.
     * La valeur par défaut est <code>false</code>
     * 
     * @config continueIfFailure
     * @type {Boolean}
     */
    continueIfFailure : {
        value: false,
        validator: isBoolean
    }
};

Y.extend(CompositeValidator, Y.namespace('hornet').Validator, {

    /**
     * @see {Validator.validate}
     */
    validate : function (f, elt) {
        var testval1 = true,
        testval2 = true,
        
        firstValidator = this.get(FIRST_VALIDATOR),
        secondValidator = this.get(SECOND_VALIDATOR),
        continueIfFailure = this.get(CONTINUE_IF_FAILURE);

        this.firstIsValid = true;
        this.secondIsValid = true;

        if (!!firstValidator) {
            testval1 = firstValidator.validate.apply(firstValidator, [f, elt]);
            this.firstIsValid = testval1;
            Y.log('(first) validate: ' + testval1, 'info', CompositeValidator.NAME);
        }
        
        if ((!!secondValidator) && (continueIfFailure || testval1)) {
            testval2 = secondValidator.validate.apply(secondValidator, [f, elt]);
            this.secondIsValid = testval2;
            Y.log('(second) validate: ' + testval2, 'info', CompositeValidator.NAME);
        }

        return (testval1 && testval2);
    },


    /**
     * <p>Initialise les messages d'erreurs pour les validateurs composés dans le validateur composite.</p>
     * 
     * @param msg {String} Le message d'erreur.
     */
    setErrorMessage: function(
        /* string */    msg)
    {
        var firstValidator = this.get(FIRST_VALIDATOR),
        secondValidator = this.get(SECOND_VALIDATOR);
        Y.log('setErrorMessage(\"' + msg + '\")', 'info', CompositeValidator.NAME);

        if (!!firstValidator) {
            firstValidator.setErrorMessage(msg);
        }
        if (!!secondValidator) {
          secondValidator.setErrorMessage(msg);
        }
    },
    
    
    getErrorMessage: function()
    {
       var retErrMsg;
       if (!this.firstIsValid) {
         retErrMsg = this.get(FIRST_VALIDATOR).getErrorMessage();
       } else {
         if (!this.secondIsValid) {
           retErrMsg = this.get(SECOND_VALIDATOR).getErrorMessage();
         } 
       }
       return retErrMsg;
    }

});

Y.namespace('hornet').CompositeValidator = CompositeValidator;


}, '3.3.0' ,{requires:['base-base', 'hornet-validator']});
