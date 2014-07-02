YUI.add('hornet-hijaxdatasource', function(Y) {

/*
 * HijaxDataSource permet de charger la premiere page d'un datatable a partir d'un tableau HTML 
 * et les pages suivantes via des requetes ajax.
 * 
 * HijaxDataSource est implementee en combinant une DataSource HTMLTABLE et une DataSource XHR.
 * Les donnees de la premiere page peuvent etre chargees a partir du tableau html ET d'un objet javascript (ex. pour des identifiants caches).
 * Il est possible d'ajouter automatiquement un parametre a chaque requete ajax.
 */
//Adding Aliasing Y.YUI2 to YAHOO
var YAHOO = Y.YUI2;

(function () {

    /* Any frequently used shortcuts, strings and constants */
    var lang = YAHOO.lang;
    var util = YAHOO.util;
    var Ev = util.Event;

    var DS2 =util.XHRDataSource;
    var DS = util.DataSourceBase;
    
    /* Namespace */
    YAHOO.namespace("hornet");

/**
 * Surcharge pour configurer les sources de donnees pour la premiere page.
 * La config a3 possible est :
 * <ul>
 * <li>
 *     - domNode (obligatoire) Noeud Dom contenant les donnees sous forme de tableau HTML,
 * </li>
 * <li>
 *     - columnToFieldName (obligatoire) mapping entre les noms de colonne et celui du champ dans le datasource, 
 * correspond a l'attribut responseSchema du DataSource HTML_TABLE
 * ex. [ 
                            {key:"Col1" },
                            {key:"Col2" }
                        ]
 * </li>
 * <li>
 * - jsFields (falcultatif) contient les "colonnes cachees" a ajouter au datasource.
 * ex. jsFields : {"COL_CACHE1": [valeurligne1,valeurligne2], 
 *                 "COL_CACHE2": [valeurligne1,valeurligne2]}
                        });
            
 * </li>
 *<li>
 * - xhrparam (falcultatif) : donnees ajoutees a la requete HTTP.
 *ex.     xhrparam : "hijax=ok" 
                    
 *</li>  
 * @param oFields  {object} Mapping des colonnes du tableau HTML po localDatasource"
 * @param ojsArrayFields {object} Champs caches
 * @namespace YAHOO.hornet
 * @class YAHOO.hornet.HijaxDataSource
 * @extends YAHOO.util.XHRDataSource  
 * @constructor
 * @param oLiveData {HTMLElement}  Pointer to live data.
 * @param oConfigs {object} Object literal of configuration values.
 * @param oA3Config {object} Noeud Dom contenant les donnees sous forme de tableau HTML
 * @param oFields  {object} Mapping des colonnes du tableau HTML po localDatasource"
 * @param ojsArrayFields {object} Champs caches 
 */
YAHOO.hornet.HijaxDataSource = function(oLiveData, oConfigs, oA3Config) {
    
    var oDomNode, oFields, ojsArrayFields;
    if (oA3Config) {
        oDomNode = oA3Config["domNode"]; 
        oFields = oA3Config["columnToFieldName"];
        ojsArrayFields = oA3Config["jsFields"];
        this.xhrparam = oA3Config["xhrparam"];
    };
    var jsData = [],
    firstrequest = false;
    oDomNode = YAHOO.util.Dom.get(oDomNode);
    if(oDomNode){
        firstrequest = true;
        var myDataSource = new YAHOO.util.DataSource(oDomNode);
        myDataSource.responseType = YAHOO.util.DataSource.TYPE_HTMLTABLE;
        myDataSource.responseSchema = {
            fields: oFields
        };
        myDataSource.sendRequest(null,{
                success : function (req,res) {
                            jsData = res.results;
                            if (ojsArrayFields) {
                                for(var i=jsData.length-1; i>=0; i--) {
                                    var row = jsData[i];
                                    for (key in ojsArrayFields){
                                        row[key]= ojsArrayFields[key][i];    
                                    }
                                }
                            }
                        }
        });
    }
    
    // chain the constructors
    YAHOO.hornet.HijaxDataSource.superclass.constructor.call(this, oLiveData, oConfigs); 
    this.domData = jsData;
    this.firstrequest = firstrequest;
   // requestEvent
};

// HijaxDataSource extends XHRDataSource
// (Mechanism for setting up the prototype, constructor, and superclass properties for objects that are extending other objects.)
// (It prevents the constructor of the extended object (ie, the superclass) from being executed twice.)
lang.extend(YAHOO.hornet.HijaxDataSource, DS2, {
    
    domData : null,
    firstrequest : true,
    firstresponse : true,

    makeConnection : function(oRequest, oCallback, oCaller) {
        if (this.firstrequest ) {
            this.firstrequest = false;
            this.firstresponse = true;
            var tId = null;
            this.fireEvent("requestEvent", {tId:tId,request:oRequest,callback:oCallback,caller:oCaller});
            var responseTypeDefault = this.responseType;
            this.responseType = DS.TYPE_JSARRAY;
            this.handleResponse(oRequest, this.domData, oCallback, oCaller, tId);
            this.responseType = responseTypeDefault;
        } else {
            this.firstresponse = false;
            YAHOO.hornet.HijaxDataSource.superclass.makeConnection.call(this,oRequest, oCallback, oCaller);
        }
    },
    
    
    /**
     * Surcharge pour ajouter xhrparam a chaque requete HTTP.
     */
    sendRequest : function(oRequest, oCallback, oCaller) {
        if (this.xhrparam) {
            if (!this.connMethodPost) {
                // If the data already contains a querystring, append an ampersand
                // and then concatenate xhrparam to the data.
                oRequest = (oRequest?(oRequest + (oRequest.indexOf('?') == -1)?'?':'&'):'?') + this.xhrparam;
            } else {
                // If POST data exist in addition to the xhrparam,
                // it will be concatenated to the xhrparam.
                oRequest = oRequest?(this.xhrparam + "&" + oRequest):this.xhrparam;
            }
        }
            
        YAHOO.hornet.HijaxDataSource.superclass.sendRequest.call(this,oRequest, oCallback, oCaller);
    }

});

// Copy static members to HijaxDataSource class
// (apply the prototype properties in XHRDataSource to HijaxDataSource)
lang.augmentObject(YAHOO.hornet.HijaxDataSource, DS2);

})();
YAHOO.register("hornet-hijaxdatasource", YAHOO.hornet.HijaxDataSource, {version: "3.3.0", build: "1389976324000"});

}, '3.3.0' ,{requires:['yui2-dom', 'yui2-datasource', 'yui2-connection'], skinnable:false});
