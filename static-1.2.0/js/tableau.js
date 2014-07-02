
/**
 * Initialise un composant yui2 tableau à partir d'un tableau html existant 
 * 
 * @param Y
 * @param tableId {String} Id du tableau html
 * @param containerId {String} Id de l'element conteneur parent
 * @param columnDefs {Object} Definition des colonnes du tableau
 * @param config {Object} Configuration optionnelle
 * @return {Object}
 * 		- ds {YAHOO.widget.Datasource} la datasource creee
 * 		- dt {YAHOO.widget.DataTable} la datatable creee
 */
function initDatatable(Y, tableId, containerId, columnDefs, config) {
	var YAHOO = Y.YUI2, 
	oDs = null, 
	oDt = null;
	//tableau html initial present seulement si le tableau yui n'est pas dejà cree
	var tableNode = Y.one("table#"+tableId);
	if (tableNode){
		oDs = new YAHOO.util.DataSource(YAHOO.util.Dom.get(tableId));
		oDs.responseType = YAHOO.util.DataSource.TYPE_HTMLTABLE; 
		oDs.responseSchema = { 
			fields: columnDefs
		}; 
		oDt = Y.hornet.PaginTable.createTable(containerId, columnDefs, oDs, config);
	}
	return {
		ds : oDs,
		dt : oDt
	};
}

/**
 * Remplace les liens d'action de chaque ligne d'un tableau
 * 
 * @param Y
	 * @param args {Object} : contexte utilise par les actions
	 * @param config {Object} 
	 * 		- actions {Array} 
	 * 			- links {String}: selector css des liens d'actions
	 * 			- fn {function} : fonction à appeler lors des clicks sur les liens d'actions
 */
function activateAjaxLinks (Y, args, config) {
	config = config || {};
	var actions = config.actions || [],
	i, action, links;
	for (i = 0; i < actions.length; i++ ){
		action = actions[i] || {};
		if (action.links && action.fn) {
			links = Y.all (action.links); 
			links.each (function (node) {
				node.detach(action.links + '|*');
				node.on(action.links + "|click", action.fn, null, Y, links.indexOf(node), args);
			});
		}
	}
}


