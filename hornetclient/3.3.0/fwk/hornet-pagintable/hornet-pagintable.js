YUI.add('hornet-pagintable', function(Y) {

/**
 * @fileoverview
 * 
 * <pre>
 * Bibliotheque pour initialiser des tableaux yui.
 * Cette classe fournie des fonctions utilisees pour creer des composants de 
 * pagination et tableaux yui avec des libelles pre-definis.
 * </pre>
 * 
 * @class PaginTable
 * @static
 */
var EMPTY_STRING = '',
    
PaginTable = { 

    /**
     * Creation d'un composant pagination de tableau yui2
     * 
     * @method createPagination
     * @static
     * @param lignesParPage {Integer} :
     *            nombre de lignes par page
     * @param config {Object} :
     *            configuration optionnelle
     * @return YAHOO.widget.Paginator
     */
    createPagination: function(lignesParPage, config) {
        config = config || {};
        var YAHOO = Y.YUI2,
        i18n = Y.Intl.get('hornet-pagintable'),
        
        configPagination = Y.merge({
            firstPageLinkLabel         : i18n.firstPageLinkLabel,
            firstPageLinkTitle         : i18n.firstPageLinkTitle,
            lastPageLinkLabel         : i18n.lastPageLinkLabel,
            lastPageLinkTitle         : i18n.lastPageLinkTitle,
            previousPageLinkLabel     : i18n.previousPageLinkLabel,
            previousPageLinkTitle     : i18n.previousPageLinkTitle,
            nextPageLinkLabel         : i18n.nextPageLinkLabel,
            nextPageLinkTitle         : i18n.nextPageLinkTitle,
            pageTitleBuilder: function (page, paginator) { 
                return i18n.pageTitle + page; 
            }, 
            rowsPerPage: lignesParPage
        }, config);
        
        return new YAHOO.widget.Paginator(configPagination);
    },
    
    /**
     * Creation d'un composant tableau yui2
     * 
     * @method createTable
     * @static
     * @param containerId {String} : 
     *             id de l'element conteneur parent
     * @param columnDefs {Object} :
     *             definition des colonnes du tableau
     * @param dataSource {YAHOO.widget.Datasource} : 
     *             objet Datasource
     * @param config {Object} : 
     *             configuration optionnelle
     * @return YAHOO.widget.DataTable
     */
    createTable: function(containerId, columnDefs, dataSource, config) {
        config = config || {};
        var YAHOO = Y.YUI2,
        i18n = Y.Intl.get('hornet-pagintable'),
        
        configDataTable =  Y.merge({
                MSG_EMPTY      : i18n.MSG_EMPTY,
                MSG_ERROR      : i18n.MSG_ERROR,
                MSG_LOADING      : i18n.MSG_LOADING,
                MSG_SORTASC      : i18n.MSG_SORTASC,
                MSG_SORTDESC  : i18n.MSG_SORTDESC,
                caption          : EMPTY_STRING
        }, config);
        
        return new YAHOO.widget.DataTable(containerId, columnDefs, dataSource, configDataTable);
    },
    
    /**
     * Creation d'une datasource avec parsing des erreurs apres requete AJAX et 
     * initialisation des donnees si tableau existant
     * 
     * @method createDatasource
     * @static
     * @param url {String} : 
     *             uri pour la requete AJAX
     * @param columnDefs {Object} : 
     *             definition des colonnes du tableau
     * @param itemList {String} : 
     *             element liste dans le flux de reponse de la requete
     * @param config {Object}
     *      - table {String} (Optionnal) :
     *          id du tableau a parser pour initialiser les donnees
     *      - initialPage {Integer} (Optionnal) : 
     *          page a activer a l'initialisation du tableau
     *      - totalRecords {Integer} (Optionnal) : 
     *          nombre de pages a definir a l'initialisation du tableau
     * @param configNotification {Object}
     *      - zoneInfo {Y.Node} (Optionnal) : 
     *          zone de notification pour les messages d'information
     *      - zoneError {Y.Node} (Optionnal) : 
     *          zone de notification pour les messages d'erreurs
     *      - titleInfo {String} (Optionnal) : 
     *          titre pour la zone d'information
     *      - titleError {String} (Optionnal) :
     *           titre pour la zone d'erreur
     *      - alertOnError {String} (Optionnal) : 
     *          message d'alerte a afficher si erreurs
     * @return {YAHOO.widget.Datasource} la datasource creee
     */
    createDatasource : function(url, columnDefs, itemList, config, configNotification) {
        config = config || {};
        var YAHOO = Y.YUI2;
                
        // Definition de la datasource pour le flux xml
        var hijaxDataSource = new YAHOO.hornet.HijaxDataSource(url, null,
        {
           domNode :  config.table,
           columnToFieldName : columnDefs,
           xhrparam : "mode=XML"
        });
        hijaxDataSource.responseType = YAHOO.util.XHRDataSource.TYPE_XML;
        hijaxDataSource.connMethodPost = true;
        hijaxDataSource.useXPath = true;
        hijaxDataSource.responseSchema = {
            resultNode: itemList, 
            fields  : columnDefs,
            metaFields: {
                resultat: "//RESULTAT",
                totalRecords: "//totalItems", 
                initialPage: "//indexPage"
            }
        };
        hijaxDataSource.doBeforeCallback = function( oRequest , oFullResponse , oParsedResponse , oCallback ) {
            var oResponse = oParsedResponse || {};
            if(!!this.firstresponse) {
                oResponse.meta.resultat = 'OK';
                oResponse.meta.totalRecords = config.totalRecords;
                oResponse.meta.initialPage = config.initialPage;
            } else if(!!oFullResponse) {
                oResponse = PaginTable.checkMessagesBeforeCallback(oFullResponse, oResponse, configNotification);
            }
            return oResponse;
        };
        return hijaxDataSource;
    },

    /**
     * Analyse la reponse et verifie la presence de messages a notifier.
     * 
     * @method checkMessagesBeforeCallback
     * @static
     * @param oFullResponse {Object} reponse complete avant analyse.
     * @param oParsedResponse {Object} reponse a retourner.
     * @param config {Object}
     *      - zoneInfo {Y.Node} (Optionnal) : 
     *          zone de notification pour les messages d'information
     *      - zoneError {Y.Node} (Optionnal) : 
     *          zone de notification pour les messages d'erreurs
     *      - titleInfo {String} (Optionnal) : 
     *          titre pour la zone d'information
     *      - titleError {String} (Optionnal) :
     *           titre pour la zone d'erreur
     *      - alertOnError {String} (Optionnal) : 
     *          message d'alerte a afficher si erreurs
     * @return {Object} reponse analysee.
     */
    checkMessagesBeforeCallback: function( oFullResponse, oParsedResponse, config ) {
        config = config || {};
        
        var oResponse = oParsedResponse || {},
        notifications = new Y.hornet.Notification(config),
        
        notifyError = false, 
        errors = [],
        messages = [],
        data_msg_out = null;
        if(!!oFullResponse) {
            try {
                // recuperation des messages d'information et d'erreur
                data_msg_out = Y.hornet.Ajax.parseResponseXML(oFullResponse);
            }
            catch(e) {
            }
            if(!data_msg_out || data_msg_out.error) {
                notifyError = true;
            } else {                
                if (data_msg_out.result != 'OK') {
                    notifyError = true;
                }
                errors = data_msg_out.errors;
                messages = data_msg_out.messages;                
                notifications.writeInfos(messages);
            }
            // Erreurs
            if(notifyError) {
                oResponse.error = true;
                if (config.alertOnError) {
                    alert(config.alertOnError); 
                }
                notifications.writeErrors(errors);
            }
        }
        return oResponse;
    },

    /**
     * Creation d'une datatable avec gestion du tri et de la pagination serveur
     * 
     * @method createServerTable
     * @static
     * @param containerId {String} : 
     *             id de l'element conteneur parent
     * @param columnDefs {Object} :
     *             definition des colonnes du tableau
     * @param dataSource {YAHOO.widget.Datasource} : 
     *             objet Datasource
     * @param config {Object} : 
     *             configuration du tableau
     * @return {YAHOO.widget.DataTable} la datatable creee
     */
    createServerTable : function(containerId, columnDefs, dataSource, config) {
        config = config || {};
        var YAHOO = Y.YUI2;
        
        // Customize request sent to server to be able to set the current page and column order
        var generateRequest = function(oState, oSelf) {
            
            // Get states or use defaults
            oState = oState || {pagination:null, sortedBy:null};
            var sort = encodeURIComponent((oState.sortedBy) ? oState.sortedBy.key : ""),
            dir = (oState.sortedBy && oState.sortedBy.dir === YAHOO.widget.DataTable.CLASS_DESC) ? "DESC" : "ASC",
            recordOffset = (oState.pagination) ? oState.pagination.recordOffset : 0,
            results = (oState.pagination) ? oState.pagination.rowsPerPage : 10,
            page = 1;
            
            // Build custom request
            tableName = config.tableName || tableName;
            var requestParams = [];
            if (oState.sortedBy) {
                requestParams.push("tablesStates['" + tableName + "'].sort.key=" + sort);
                requestParams.push("tablesStates['" + tableName + "'].sort.dir=" + dir);
            }
            if (oState.pagination) {
                // Record offset reset with Server-side sort
                page = Math.ceil(recordOffset / results) + 1;
                requestParams.push("tablesStates['" + tableName + "'].pagination.pageIndex=" + page);
            }
            return requestParams.join('&');
        };

        if(config.dynamicData) {
            config.generateRequest = config.generateRequest || generateRequest;
            config.initialRequest = config.initialRequest || config.generateRequest(); // Initial request for first page of data
        }
        
        var datatable = PaginTable.createTable(containerId, 
                columnDefs, dataSource, config);

        /** 
         * Update records and pagination state with values from server.
         * 
         * Records (for dynamic data) :
         * - oPayload.pagination.recordOffset
         * 
         * Pagination :
         * - oPayload.pagination.rowsPerPage
         * - oPayload.pagination.recordOffset
         * - oPayload.totalRecords
         * - oPayload.sortedBy
         */
         datatable.doBeforeLoadData = function(oRequest, oResponse, oPayload){
             oPayload = oPayload || {};
             var meta = oResponse.meta || {};

             var recordOffset = (parseInt(meta.recordOffset, 10) || (oPayload.pagination) ? oPayload.pagination.recordOffset : 0),
             rowsPerPage = (parseInt(meta.rowsPerPage, 10) || (oPayload.pagination) ? oPayload.pagination.rowsPerPage : 10);        
             if (meta.initialPage) {
                 recordOffset = (parseInt(meta.initialPage, 10) - 1) * rowsPerPage;
             }

            oPayload.totalRecords = parseInt(meta.totalRecords, 10) || oPayload.totalRecords;
            oPayload.pagination = {
                rowsPerPage: (rowsPerPage || 10),
                recordOffset: (recordOffset || 0)
            };

            return true;
        };

        /** 
         * Update pagination state with values from server :
         * - oPayload.pagination.rowsPerPage
         * - oPayload.pagination.recordOffset
         * - oPayload.totalRecords
         * - oPayload.sortedBy
         */
         datatable.handleDataReturnPayload  = function(oRequest, oResponse, oPayload) {
             oPayload = oPayload || {};
             return oPayload;
         };
         
         return datatable;
    }
};

Y.namespace("hornet").PaginTable = PaginTable;


}, '3.3.0' ,{requires:['intl', 'yui2-paginator', 'yui2-datatable', 'hornet-hijaxdatasource', 'hornet-ajax', 'hornet-notification'], skinnable:false, lang:['fr']});
