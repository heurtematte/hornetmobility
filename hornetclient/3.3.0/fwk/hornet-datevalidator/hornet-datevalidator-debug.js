YUI.add('hornet-datevalidator', function(Y) {

/**
 * @fileoverview
 * 
 * <pre>
 * Composant de validation pour les dates.
  
 * </pre>
 * 
 */


//    Frequently used strings
var L = Y.Lang,
isString = L.isString,
isBoolean = L.isBoolean,

FORMAT = 'format',
REQUIRED = 'required',
MIN = 'min',
MAX = 'max';

/**
 * @class DateValidator
 * @constructor
 * @param config {Object} Configuration.
 *        <code>format</code> est un string optionnel pour définir le format de date à utiliser.
 *        <code>min</code> est un string optionnel pour définir une date minimale.
 *        <code>max</code> est un string optionnel pour définir une date maximale.
 *        <code>required</code> est un boolean optionnel pour définir si la valeur est obligatoire.
 *        <code>errorMessage</code> est un string optionnel pour remplacer le message d'erreur par défaut.
 */
function DateValidator(config) {
    DateValidator.superclass.constructor.apply(this, arguments);
}

DateValidator.NAME = 'hornetDateValidator';

DateValidator.ATTRS = {

    /**
     * Le format de date initialisé avec une valeur par défaut :
     * <p>&quot;d/m/y&quot;</p>
     * 
     * @config format
     * @type {String}
     */
    format : {
        value: "d/m/y",
        setter: function (value) {
            if (! isString(value)) {
                return Y.Attribute.INVALID_VALUE;
            }
            
            value=value.replace(new RegExp("d+", "i"),"d");
            value=value.replace(new RegExp("m+", "i"),"m");
            value=value.replace(new RegExp("y+", "i"),"y");
            
            // simplification du format
            var sepExpr = new RegExp("[./-]","g"),
            formatSimple = value.replace(sepExpr,""),
            j=formatSimple.indexOf("d"),
            m=formatSimple.indexOf("m"),
            a=formatSimple.indexOf("y");
            
            // vérification du format simplifié
            if(j<1||j>3||m<1||m>3||a<1||a>3) {
                return Y.Attribute.INVALID_VALUE;
            }
            return value;
        }
    },

    /**
     * L'indication si la valeur est obligatoire ou non.
     * La valeur par défaut est <code>false</code>
     * 
     * @config required
     * @type {Boolean}
     */
    required : {
        value: false,
        validator: isBoolean
    },

    /**
     * La chaine correspondant à une date minimale autorisée pour la valeur à valider
     * 
     * @config min
     * @type {String}
     */
    min : {
        value: null,
        validator: isString
    }, 

    /**
     * La chaine correspondant à une date maximale autorisée pour la valeur à valider
     * 
     * @config max
     * @type {String}
     */
    max : {
        value: null,
        validator: isString
    }
};

Y.extend(DateValidator, Y.namespace('hornet').Validator, {

    /**
     * @see {Validator.validate}
     */
    validate : function (f, elt) {
        var testval = true,
        value = elt.get('value'),
        
        format = this.get(FORMAT),
        required = this.get(REQUIRED),
        min = this.get(MIN),
        max = this.get(MAX);
        
        // la validation n'est pas effectuée si la valeur n'est pas définie et n'est pas obligatoire
        if (!!value || required) {
            if (min === null) {
                if (max === null) {
                    testval = Y.hornet.FactoryValidator.defaults.VALIDATORS.date.apply(this, [value, format]);
                } else {
                    testval = Y.hornet.FactoryValidator.defaults.VALIDATORS.maxDate.apply(this, [value, max, format]);
                }
            } else if (max === null) {
                testval = Y.hornet.FactoryValidator.defaults.VALIDATORS.minDate.apply(this, [value, min, format]);
            } else {
                testval = Y.hornet.FactoryValidator.defaults.VALIDATORS.rangeDate.apply(this, [value, min, max, format]);
            }
        }

        Y.log('validate: ' + testval, 'info', DateValidator.NAME);
        return testval;
    }
});

Y.namespace('hornet').DateValidator = DateValidator;


}, '3.3.0' ,{requires:['base-base', 'hornet-factoryvalidator', 'hornet-validator']});
