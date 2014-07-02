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

        Y.log('validate: ' + testval, 'info', RequiredValidator.NAME);
        return testval;
    }
});

Y.namespace('hornet').RequiredValidator = RequiredValidator;


}, '3.3.0' ,{requires:['hornet-factoryvalidator', 'hornet-validator', 'base-base', 'node-base']});
