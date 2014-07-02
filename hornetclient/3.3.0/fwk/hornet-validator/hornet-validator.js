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
