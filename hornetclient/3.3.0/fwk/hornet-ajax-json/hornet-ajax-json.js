YUI.add('hornet-ajax-json', function(Y) {


 /**********************************************************************
  * <p>Ajax.</p>
  * 
  * Support du JSON pour la gestion des requêtes Ajax.
  * 
  * @module hornet-ajax
  * @submodule hornet-ajax-json
  */
     
    /* Shortcuts, strings and constants */
    var Ajax = Y.namespace('hornet').Ajax,
        Array = Y.Array,
        JSON = Y.JSON,

AjaxJson = {
        
    NAME: "hornet-ajax-json",
        
    /**
     * Récupération des messages et erreurs après utilisation d'une requete AJAX.
     * 
     * @method parseResponseData
     * @static
     * 
     * @param oResponseText {String} Donnees JSON a parser
     * @return {Object} 
     *         - error {Boolean}: false si erreur de parsing, true sinon 
     *         - result {String}: 'OK' ou 'KO'
     *         - errors {Array} : messages d'erreurs
     *         - messages {Array} : messages d'information
     */
    parseResponseData: function(oResponseText) {
        var bError = false, 
            oParsedResponse = {error: false, result:null, errors: [], messages: []},
            data_in = null,
            data_out = null,
            data_error_out, data_message_out, msg;
        try {
            data_in = oResponseText;
            data_out = JSON.parse(data_in);
        }
        catch(errorParsing) {
            bError = true;
        }
        if(!data_out) {
            bError = true;
        }
        else {
            oParsedResponse.result = data_out["RESULTAT"];
            
            oParsedResponse.errors = [];
            data_error_out = data_out["errors"];
            if(data_error_out) {
                oParsedResponse.errors = Array(data_error_out);
            }
            Y.each(data_out["fielderrors"], function (errors, field) {
                Array.each(Array(errors), function (error) {
                    msg = (field) ? '<a href="#'+field+'" >'+error+'</a>' : error;
                    oParsedResponse.errors.push(msg);
                }, this);
            });
            
            oParsedResponse.messages = [];
            data_message_out = data_out["messages"];
            if(data_message_out) {
                oParsedResponse.messages = Array(data_message_out);
            }
        }
        if(bError) {
            oParsedResponse.error = true;
        }
        else {
        }
        return oParsedResponse;
    },
    
    /**
     * Requete AJAX et parsing des erreurs. 
     * Dans le cas d'un envoi de formulaire, les boutons "submit" sont desactives pendant la requete pour ne pas les transmettre.
     * 
     * @see Y.hornet.Ajax
     * @method submitAJAXJsonRequest
     * @static
     * 
     * @param data {Object|String} Donnees supplementaires a inclure (Chaine de requete ou objet sous forme de clefs/valeurs).
     * @param config {Object} Configuration pour la requete AJAX.
     * @return {Object}
     */
    submitAJAXJsonRequest: function(data, config) {
        
        var ajaxRequest = new Ajax(config);
        ajaxRequest._parseAjaxResponse= function (response) {
            var data = response && response.responseText,
                oParsedResponse = AjaxJson.parseResponseData(data);
            return oParsedResponse;
        };
        
        return ajaxRequest.sendRequest.apply(ajaxRequest, [data]);
    }
};

Y.namespace('hornet').AjaxJson = AjaxJson;

//Add prototype properties and methods to Ajax.
Y.mix(Ajax, AjaxJson);


}, '3.3.0' ,{requires:['node-base', 'json', 'hornet-ajax']});
