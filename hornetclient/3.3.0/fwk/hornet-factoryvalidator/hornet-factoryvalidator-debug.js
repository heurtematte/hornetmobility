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
            Y.log('date format: ' + format, 'info', 'FactoryValidator');
            
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
                Y.log('date simplified format: ' + formatSimple, 'info', 'FactoryValidator');
                Y.log('indexes in simplified format: j('+ j +'), m('+ m +'), a('+ a +')', 'info', 'FactoryValidator');
                
                // vérification du format simplifié
                if(j<1||j>3||m<1||m>3||a<1||a>3) {
                    return null;
                }
                format=format.replace("d","([0-9]{1,2})");
                format=format.replace("m","([0-9]{1,2})");
                format=format.replace("y","([0-9]{2,4})");
                Y.log('date expression: ' + format, 'info', 'FactoryValidator');

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
