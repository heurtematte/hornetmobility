YUI.add('hornet-factoryvalidator', function(Y) {

/**
 * @fileoverview
 * 
 * <pre>
 * Bibliothèque de validations.
 * Cette classe fournie des fonctions utilisées pour effectuer des validations.
 * </pre>
 * 
 * @class FactoryValidator
 * @static
 */
var L = Y.Lang,
    O = Y.Object,
    isDate = L.isDate,

    DASH = '-',
    DOT = '.',
    EMPTY_STRING = '',
    INVALID_DATE = 'Invalid Date',
    
FactoryValidator = { 
		
		/**
		 * Création d'un nombre à partir de la valeur donnée.
		 * 
		 * Si la conversion échoue, la méthode retourne <code>0</code>. 
		 */
        toNumber: function(val) {
            return parseFloat(val) || 0;
        },

		/**
		 * Création d'une date à partir de la valeur donnée, et du format si spécifié.
		 * 
		 * Retourne directement la valeur si celle-ci est une date, sinon 
		 * la valeur est convertie suivant le format défini.
		 * 
		 * Le format par défaut est <code>d/m/Y</code> :  il doit être constitué 
		 * des caractères <code>d</code>, <code>m</code> et <code>y</code> 
		 * séparés par des séparateurs (anti-slash, tiret ou point).
		 * 
		 * Si la conversion échoue, la méthode retourne <code>null</code>. 
		 */
        toDate: function(val, format) {
            var j,m,a,formatSimple,separatorExpr,finalExpr,
            t = [3],
            date = null;
            format="^"+((format)?format.toUpperCase():"d/m/y")+"$";
            
            if(isDate(val) && (val != INVALID_DATE) && !isNaN(val)) {
                date = val;
            } else {
                //Conversion en date

                // uniformisation du séparateur
                separatorExpr=new RegExp("[./-]","g");
                
                format=format.replace(new RegExp("d+", "i"),"d");
                format=format.replace(new RegExp("m+", "i"),"m");
                format=format.replace(new RegExp("y+", "i"),"y");

                // simplification du format
                formatSimple=format.replace(separatorExpr,"");
                j=formatSimple.indexOf("d");
                m=formatSimple.indexOf("m");
                a=formatSimple.indexOf("y");
                
                // vérification du format simplifié
                if(j<1||j>3||m<1||m>3||a<1||a>3) {
                    return null;
                }
                format=format.replace("d","([0-9]{1,2})");
                format=format.replace("m","([0-9]{1,2})");
                format=format.replace("y","([0-9]{2,4})");

                // vérification si la date respecte le format donné
                finalExpr=new RegExp(format,"g");
                if(!finalExpr.test(val)) {
                    return null;
                }
                
                // construction de la date
                t[0] = (val.replace(finalExpr,"$"+j));
                t[1] = (val.replace(finalExpr,"$"+m));
                t[2] = (val.replace(finalExpr,"$"+a));
                if(t[2]<1000) {
                    t[2]+=2000;
                }
                date = new Date(t[2],t[1]-1,t[0]);

                // validation de la date
                if(!isDate(date) || (date == INVALID_DATE) || isNaN(date) ||
                        (date.getDate()!=t[0]) || (date.getMonth()+1)!=t[1]) {
                    return null;
                }
            }
            return date;
        }
};

FactoryValidator.defaults = {

    REGEX: {
        alpha: /^[a-z_]+$/i,

        alphanum: /^\w+$/,

        digits: /^\d+$/,

        number: /^[+\-]?(\d+([.,]\d+)?)+$/,

        		// Regex fournie par Struts adaptée pour accepter les nouvelles
        		// extensions de noms de domaines
        email: /^['_a-z0-9-\+]+(\.['_a-z0-9-\+]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*\.([a-z]{2,63})$/i, 
        // Regex from Scott Gonzalez Email Address Validation: http://projects.scottsplayground.com/email_address_validation/
        //^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i,

        // Regex from Scott Gonzalez IRI: http://projects.scottsplayground.com/iri/
        url: /^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i
    },

    VALIDATORS: {
        
         /**
         * Détermine si la valeur fournie est une date.
         * @method date
         * @static
         * @param val la valeur à tester.
         * @param format le format à utiliser. 
         *         <code>%d/%m/%Y</code> par défaut
         * @return {boolean} vrai si val est une date.
         */
        date: function(val, format) {
            var date = FactoryValidator.toDate(val, format);

            return (isDate(date));
        },

        minDate: function(val, min, format) {
            var date = FactoryValidator.toDate(val, format),
            minDate = FactoryValidator.toDate(min, format);

            return (isDate(date) && 
                    isDate(minDate) && 
                    (date >= minDate));
        },

        maxDate: function(val, max, format) {
            var date = FactoryValidator.toDate(val, format),
            maxDate = FactoryValidator.toDate(max, format);

            return (isDate(date) && 
                    isDate(maxDate) && 
                    (date <= maxDate));
        },

        rangeDate: function(val, min, max, format) {
            var date = FactoryValidator.toDate(val, format),
            minDate = FactoryValidator.toDate(min, format),
            maxDate = FactoryValidator.toDate(max, format);

            return (isDate(date) && 
                    isDate(minDate) && 
                    (date >= minDate) &&
                    isDate(maxDate) && 
                    (date <= maxDate));
        },

        equalTo: function(val, valueEqualTo) {
            return (val == valueEqualTo);
        },

        max: function(val, max) {
            return (FactoryValidator.toNumber(val) <= max);
        },

        maxLength: function(val, maxLength) {
            return (val.length <= maxLength);
        },

        min: function(val, min) {
            return (FactoryValidator.toNumber(val) >= min);
        },

        minLength: function(val, minLength) {
            return (val.length >= minLength);
        },

        range: function(val, min, max) {
            var num = FactoryValidator.toNumber(val);

            return (num >= min) && (num <= max);
        },

        rangeLength: function(val, minLength, maxLength) {
            var length = val.length;

            return (length >= minLength) && (length <= maxLength);
        },

        regex: function(val, format, op) {
            var expREG=new RegExp(format,op?op:"");
            return (expREG.test(val));
        },

        required: function(val) {
            return !!val;
        }
    }
};

/**
 * Création automatique de méthode testant une regex.
 * Ajout de l'ensemble des expressions régulières aux méthodes de validation.
 */ 
Y.each(
    FactoryValidator.defaults.REGEX,
    function(regex, key) {
        FactoryValidator.defaults.VALIDATORS[key] = function(val) {
            return FactoryValidator.defaults.REGEX[key].test(val);
        };
    }
);

Y.namespace("hornet").FactoryValidator = FactoryValidator;


}, '3.3.0' ,{requires:['oop']});
YUI.add('hornet-validator', function(Y) {

/**
 * @fileoverview
 * 
 * <pre>
 * Composant générique de validation.
 * Cette classe abstraite défini les méthodes à surcharger par les composants Validator :
 *         - fonction de validation
 *         - fonction d'affichage des messages
  
 * </pre>
 * 
 */


//    Frequently used strings
var L = Y.Lang,
isBoolean = L.isBoolean,
isString = L.isString,
isFunction = L.isFunction,
isObject = L.isObject,

STRINGS = "strings",
ERROR_MESSAGE = 'errorMessage';

/**
 * @class Validator
 * @constructor
 * @param config {Object} Configuration.
 *        <code>errorMessage</code> est un string optionnel pour remplacer le message d'erreur par défaut.
 */
function Validator(config) {
    Validator.superclass.constructor.apply(this, arguments);
}

Validator.NAME = 'hornetValidator';

Validator.ATTRS = {

    /**
     * Le message d'erreur initialisé avec une valeur par défaut :
     * <p>&quot;Entrer une valeur respectant le format attendu.&quot;</p>
     * 
     * @config errorMessage
     * @type {String}
     */
    errorMessage : {
        valueFn: function() {
            //return Y.Intl.get('hornet-validator').errorMessage;
            return "Entrer une valeur respectant le format attendu.";
        },
        validator: isString
    }
};

Y.extend(Validator, Y.Base, {
    
    initializer: function(config)
    {
    },
    
    destructor: function()
    {
    },

    /**
     * <p>Fonction de validation à surcharger par les sous-classes</p>
     * 
     * @param f {Object} Le formulaire contenant l'élément
     * @param elt {Y.Node} L'élément à valider
     * @return {boolean} Le résultat de la validation.
     */
    validate : function (f, elt) {
        return false;
    },

    /**
     * <p>Initialise le message d'erreur pour l'élément concerné. Permet de 
     * remplacer le message par défaut</p>
     * 
     * @param msg {String} Le message d'erreur.
     */
    setErrorMessage: function(
        /* string */    msg)
    {
        this.set(ERROR_MESSAGE, msg);
    },

    /**
     * <p>Retourne le message d'erreur pour l'élément concerné.</p>
     * 
     * @return {String} Le message d'erreur.
     */
    getErrorMessage: function()
    {
        return this.get(ERROR_MESSAGE);
    }

});

Y.namespace('hornet').Validator = Validator;


}, '3.3.0' ,{requires:['base-base']});
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
        }
        
        if ((!!secondValidator) && (continueIfFailure || testval1)) {
            testval2 = secondValidator.validate.apply(secondValidator, [f, elt]);
            this.secondIsValid = testval2;
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

        return testval;
    }
});

Y.namespace('hornet').DateValidator = DateValidator;


}, '3.3.0' ,{requires:['base-base', 'hornet-factoryvalidator', 'hornet-validator']});
YUI.add('hornet-requiredvalidator', function(Y) {

/**
 * @fileoverview
 * 
 * <pre>
 * Composant de validation vérifiant le caractère obligatoire d'élements requis.
 * Il permet de valider que les valeurs sont bien définies.
 * </pre>
 */

/**
 * @class RequiredValidator
 * @constructor
 * @param config {Object} Configuration.
 *        <code>errorMessage</code> est un string optionnel pour remplacer le message d'erreur par défaut.
 */
function RequiredValidator(config) {
    RequiredValidator.superclass.constructor.apply(this, arguments);
}

RequiredValidator.NAME = 'hornetRequiredValidator';

Y.extend(RequiredValidator, Y.namespace('hornet').Validator, {

    /**
     * @see {Validator.validate}
     * 
     */
    validate : function (form, eltNode) {
        var testval = false,
        e = Y.Node.getDOMNode(eltNode);
        
        var name = (e.tagName ? e.tagName.toLowerCase() : null),
        type = (e.type ? e.type.toLowerCase() : null);
        if (!!name)
        {
            if (name == 'input' &&
                (type == 'password' || type == 'text'))
            {
                testval = Y.hornet.FactoryValidator.defaults.VALIDATORS.required.apply(this, [e.value]);
            }
            else if (name == 'input' && type == 'checkbox')
            {
                testval = !!(e.checked);
            }
            else if (name == 'input' && type == 'radio')
            {
                var rb = form[ e.name ];    // null if dynamically generated in IE
                if (rb && !!rb.length)
                {
                    var count = 0;
                    for (var j=0; j<rb.length; j++)
                    {
                        if (rb[j].checked)
                        {
                            count++;
                            break;
                        }
                    }
                    testval = (count > 0);
                }
            }
            else if (name == 'select' && type == 'select-one')
            {
                testval = Y.hornet.FactoryValidator.defaults.VALIDATORS.required.apply(this, [(e.selectedIndex >= 0)]);
            }
            else if (name == 'textarea')
            {
                testval = Y.hornet.FactoryValidator.defaults.VALIDATORS.required.apply(this, [e.value]);
            }
        }

        return testval;
    }
});

Y.namespace('hornet').RequiredValidator = RequiredValidator;


}, '3.3.0' ,{requires:['hornet-factoryvalidator', 'hornet-validator', 'base-base', 'node-base']});


YUI.add('hornet-validator-all', function(Y){}, '3.3.0' ,{use:['hornet-factoryvalidator', 'hornet-validator', 'hornet-compositevalidator', 'hornet-datevalidator', 'hornet-requiredvalidator']});

