<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@taglib uri="/struts-tags" prefix="s"%>
<%@taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles"%>

<fmt:bundle
	basename="fr.gouv.diplomatie.applitutoriel.web.action.administration.secteur.package"
	prefix="ADMINISTRATION.GESTION_SECTEUR.table.">
	<fmt:message key="caption.label" var="captionLabel"><fmt:param value="" /></fmt:message>
	<fmt:message key="summary.label" var="summaryLabel"><fmt:param value="" /></fmt:message>
</fmt:bundle>

<s:url id="icoAjouterUrl" value="%{#application.themeDefautPath}/assets/ico_ajouter.png"/>
<s:url id="icoEditerUrl" value="%{#application.themeDefautPath}/assets/ico_editer.png"/>
<s:url id="icoSupprimerUrl" value="%{#application.themeDefautPath}/assets/ico_supprimer.png"/>

<s:url id="ajoutUrl" value="/dyn/protected/administration/secteur/initAjout.html"/>

<%-- 
	Zone d'affichage des notifications
--%>
<div class="messageBox errorBox errorBox_tableEdit">
	<s:fielderror title="<h2 class='titleError'>%{getText('commun.input.msg')}</h2>"/>
	<s:actionerror title="<h2 class='titleError'>%{getText('commun.error.msg')}</h2>"/>
</div>
<div class="messageBox infoBox infoBox_tableEdit">
	<s:actionmessage title="<h2 class='titleInfo'>%{getText('commun.info.msg')}</h2>"/>
</div>

<%-- 
	Formulaire d'edition
--%>
<div id="panelForm" class="hornet-hidden">
	<div class="hd">
		<h2><tiles:getAsString ignore="true" name="form_title" /></h2>
	</div>
	<div class="bd">
		<tiles:insertAttribute name="form"/>
	</div>
</div>

<div class="table hornet-table-loading" id="tableauSecteurs">
	<h2 class="titreTableau">${captionLabel}</h2>
	<div class="outils haut">
		<div class="actions">
			<s:a cssClass="hijaxAjoutAction icone ajouter" id="ajouterSecteur" href="%{ajoutUrl}" 
				title="%{getText('ADMINISTRATION.GESTION_SECTEUR.ajoutSecteur.label')}">
				<img alt="<s:text name="ADMINISTRATION.GESTION_SECTEUR.ajoutSecteur.label"/>" src="${icoAjouterUrl}"/>
			</s:a>
		</div>
	</div>
	<div id="secteurs">
		<table id="listeSecteurs" summary="${summaryLabel}">
			<caption>${captionLabel}</caption>
			<thead>
				<tr>
					<th scope="col" id="col_id" class="hidden"></th>
					<th scope="col" id="col_nomSecteur"><s:text name="ADMINISTRATION.GESTION_SECTEUR.table.header.nomSecteur.label"/></th>
					<th scope="col" id="col_description"><s:text name="ADMINISTRATION.GESTION_SECTEUR.table.header.description.label"/></th>
					<th scope="col" id="col_dateCreation"><s:text name="ADMINISTRATION.GESTION_SECTEUR.table.header.dateCreation.label"/></th>
					<th scope="col" id="col_dateMajEnreg"><s:text name="ADMINISTRATION.GESTION_SECTEUR.table.header.dateMajEnreg.label"/></th>
					<th scope="col" id="col_auteurCreation"><s:text name="ADMINISTRATION.GESTION_SECTEUR.table.header.auteurCreation.label"/></th>
					<th scope="col" id="col_edition">&nbsp;</th>
					<th scope="col" id="col_suppression">&nbsp;</th>
				</tr>
			</thead>
			<tbody>
				<s:iterator value="secteurs" status="rowstatus">
					<s:url id="editUrl" value="/dyn/protected/administration/secteur/initEdition.html">
						<s:param name="id" value="id"/>
					</s:url>
					<s:url id="supUrl" value="/dyn/protected/administration/secteur/suppression.html">
						<s:param name="id" value="id"/>
					</s:url>
					<tr>
						<s:set name="titleEdition" value="%{getText('ADMINISTRATION.GESTION_SECTEUR.table.row.edit.label', {nom})}" />
						<s:set name="titleSuppression" value="%{getText('ADMINISTRATION.GESTION_SECTEUR.table.row.sup.label', {nom})}" />
						
						<td headers="col_id" class="hidden"><s:property value="id" /></td>
						<td headers="col_nomSecteur"><s:property value="nom" escapeHtml="true" /></td>
						<td headers="col_description"><s:property value="desc" escapeHtml="true" /></td>
						<td headers="col_dateCreation"><s:property value="dateCreat" /></td>
						<td headers="col_dateMajEnreg"><s:property value="dateMajEnreg" /></td>
						<td headers="col_auteurCreation"><s:property value="auteurCreat" /></td>
						<td headers="col_edition"><s:a id="ls_e_%{#rowstatus.index}" cssClass="hijaxEditAction icone editer" href="%{editUrl}" title="%{getText('ADMINISTRATION.GESTION_SECTEUR.table.row.edit.label', {nom})}"><img alt="<s:property value="%{#titleEdition}" escapeXml="true" escapeHtml="true" />" src="${icoEditerUrl}"/></s:a></td>
						<td headers="col_suppression"><s:a id="ls_s_%{#rowstatus.index}" cssClass="hijaxSupAction icone supprimer" href="%{supUrl}" title="%{getText('ADMINISTRATION.GESTION_SECTEUR.table.row.sup.label', {nom})}"><img alt="<s:property value="%{#titleSuppression}" escapeXml="true" escapeHtml="true" />" src="${icoSupprimerUrl}"/></s:a></td>
					</tr>
				</s:iterator>
			</tbody>
		</table>
		<s:if test="secteurs.isEmpty">
			<p>
				<s:text name="commun.tableau.vide"></s:text>
			</p>
		</s:if>
	</div>
	<div id="pag-below"><!-- pagination controls will go here --></div>
</div>

<script type="text/javascript">
	//<![CDATA[ 
	
	
	/**
	 * Fonction permettant de décoder les entités HTML
	 * @param str Chaîne HTML
	 * @return Chaîne décodée
	 */
	function decodeEntities(str){
		var temp=document.createElement("pre");
		temp.innerHTML=str;
		return temp.firstChild.nodeValue;
	}
		
	
	hornet().use("hornet_tableau", "hornet_form",
			function (Y) {
		var YAHOO = Y.YUI2,
		
		tableau = initDatatable(Y, "listeSecteurs", "secteurs", [
			 {key:"id",				label:"", hidden: true},
			 {key:"nomSecteur",		label:"<s:text name='ADMINISTRATION.GESTION_SECTEUR.table.header.nomSecteur.label'/>",	   sortable:true, resizeable:true},
			 {key:"description",	label:"<s:text name='ADMINISTRATION.GESTION_SECTEUR.table.header.description.label'/>",	  sortable:true, resizeable:true},
			 {key:"dateCreation",	label:"<s:text name='ADMINISTRATION.GESTION_SECTEUR.table.header.dateCreation.label'/>",	 sortable:true, resizeable:true},
			 {key:"dateMajEnreg",	label:"<s:text name='ADMINISTRATION.GESTION_SECTEUR.table.header.dateMajEnreg.label'/>",	 sortable:true, resizeable:true},
			 {key:"auteurCreation",	label:"<s:text name='ADMINISTRATION.GESTION_SECTEUR.table.header.auteurCreation.label'/>",   sortable:true, resizeable:true},
			 {key:"edition",		label:""},
			 {key:"suppression",	label:""}
		], {
			caption		: "${captionLabel}",
			summary		: "${summaryLabel}",
			paginator	: Y.hornet.PaginTable.createPagination(25, {
				containers:[ "pag-below" ],
				alwaysVisible: false
			})
		}).dt;
		// Chargement du composant tableau termine
		Y.all('#tableauSecteurs').removeClass("hornet-table-loading");
		
		var tableEditObject = createTableEdit(Y, tableau);

		tableau.subscribe('postRenderEvent', function(oArgs) {
			config = {
				actions: [{
						links: "a.hijaxSupAction",
						fn: function(e, Y, line, tableEditObject){
							e.halt();
							Y.hornet.Notification.resetNotifications();

							var node = e.currentTarget,
							url = node.get('href');
							index = url.indexOf("?", 0),
							params = "mode=XML";
							if (index != -1 ) {
								params += "&" + url.substring(index + 1);
								url = url.substring(0, index);
							}
							
							if(confirm("<s:text name='ADMINISTRATION.GESTION_SECTEUR.table.row.sup.confirm'/>")){

								var oState = tableEditObject.dataTable.getState();
								if (oState.pagination) {
									line += (oState.pagination.recordOffset);
								}
								var row = tableEditObject.dataTable.getRecord(line),
								currentRowId = row.getId(),
								cfgdelete = {
									url: url,
									onSuccess: function () {
										tableEditObject.dataTable.deleteRow(currentRowId);
										return true;
									},
									zoneError : ".errorBox_tableEdit",
									titleError: "<h2 class='titleError'><s:text name='commun.error.msg'/></h2>",
									alertOnError : "<s:text name='ADMINISTRATION.GESTION_SECTEUR.msg.suppression.err' />",
									alertOnSuccess : "<s:text name='ADMINISTRATION.GESTION_SECTEUR.msg.suppression.ok' />"
								};
								Y.hornet.Ajax.submitAJAXRequest(params, cfgdelete);
							}
						}
					}, {
						links: "a.hijaxEditAction",
						fn: function(e, Y, line, tableEditObject){
							e.halt();
							Y.hornet.Notification.resetNotifications();

							var oState = tableEditObject.dataTable.getState();
							if (oState.pagination) {
								line += (oState.pagination.recordOffset);
							}
							var row = tableEditObject.dataTable.getRecord(line);
							tableEditObject.currentEditRowId = row.getId();

							tableEditObject.formObject.reset();
							tableEditObject.formObject.setFieldValue("id", row.getData("id"), true);
							tableEditObject.formObject.setFieldValue("nom", decodeEntities(row.getData("nomSecteur")), true);
							tableEditObject.formObject.setFieldValue("description", decodeEntities(row.getData("description")), true);
							tableEditObject.formObject.enableForm();
							
							tableEditObject.formObject.action = "<s:property value='%{formEditActionUrl}'/>";
							tableEditObject.formObject.notification.alertOnSuccess = "<s:text name='ADMINISTRATION.GESTION_SECTEUR.msg.edition.ok' />";

							tableEditObject.dialogEditForm.setHeader("<H2><s:text name='ADMINISTRATION.GESTION_SECTEUR.formSecteur.edition.titre.label' /></H2>");
							tableEditObject.dialogEditForm.show();
						}
					}, {
						links: "a.hijaxAjoutAction",
						fn: function(e, Y, line, tableEditObject){
							e.halt();
							Y.hornet.Notification.resetNotifications();

							tableEditObject.formObject.reset();
							tableEditObject.formObject.enableForm();
							
							tableEditObject.formObject.action = "<s:property value='%{formAjoutActionUrl}'/>";
							tableEditObject.formObject.notification.alertOnSuccess = "<s:text name='ADMINISTRATION.GESTION_SECTEUR.msg.ajout.ok' />";

							tableEditObject.dialogEditForm.setHeader("<H2><s:text name='ADMINISTRATION.GESTION_SECTEUR.formSecteur.ajout.titre.label' /></H2>");
							tableEditObject.dialogEditForm.show();
						}
					}
				]};
			activateAjaxLinks(Y, tableEditObject, config);
		});
	});

	function createTableEdit(Y, gDataTable) {
	
		var tableEditClass = Y.Base.create ('tableEditClass', Y.Base,[],
		{
			dataTable : gDataTable,
			currentEditRowId : null,
			dialogEditForm : null,
			dialogEditFormEscHandler : null,
			dialogEditFormCancelHandler : null,
			formObject : null,
			zoneError : null,
			initializer : initTab,
			destructor : function() {}
		}, {});

		function initTab() {
			var tableEditObject = this;
			tableEditObject.on('destroy',  function destroyit ()  {
				tableEditObject.dialogEditForm.hide();
				tableEditObject.dialogEditForm.destroy();
				tableEditObject.formObject.destroy();
			});
			tableEditObject.zoneError = '.errorBox_tableEdit';
				
			Y.on("available", hijaxDatatableEdit,"#panelForm", this, Y, tableEditObject);
		};
	
		function hijaxDatatableEdit(Y, tableEditObject) {
			var YAHOO = Y.YUI2;
			
			var panelFormNode = Y.one("#panelForm");
			//  Show the form now that it is ready
			panelFormNode.removeClass("hornet-hidden");
			
			//Declaration du formulaire en modal
			tableEditObject.dialogEditForm = new YAHOO.widget.Dialog(panelFormNode.get('id'), {
				modal: true,
				close: true,
				visible: false,
				fixedcenter: true,
				constraintoviewport: true,
				width: "600px",
				postmethod: "none",
				hideaftersubmit : false
			}); 
			var onSuccess = function(id, response, args) {
				var data_out = null,
				schema_update = {
					resultListLocator: "SECTEUR",
					resultFields:  [{key:"id"}, 
									{key:"nomSecteur"}, 
									{key:"description"}, 
									{key:"dateCreation"},
									{key:"dateMajEnreg"}, 
									{key:"auteurCreation"}, 
									{key:"edition"}, 
									{key:"suppression"}]
				};
				try {
					data_out = Y.DataSchema.XML.apply(schema_update, response.responseXML);
				}
				catch(e) {
					Y.log("Error while parsing XML data: " + e.message, "error");
				}

				if(!data_out) {
					if (tableEditObject.formObject.notification.alertOnError) {
						alert(tableEditObject.formObject.notification.alertOnError); 
					}
				}
				else {
						var item;
						if (data_out.results && data_out.results.length > 0) {
							item = data_out.results[0];
							
							if(tableEditObject.currentEditRowId) {
								gDataTable.updateRow(tableEditObject.currentEditRowId, item);
							} else {
								var index = 0;
								var oState = gDataTable.getState();
								if (oState.pagination) {
									index += (oState.pagination.recordOffset);
								}
								gDataTable.addRow(item, index);
							}
								
						}
						tableEditObject.dialogEditForm.hide();
						return true;
				}
				return false;
			};
			var onFailure = function(id, o, args) {
			};
			
			tableEditObject.formObject =  createForm(Y, 'formAjoutSecteur', {
				onSuccess : onSuccess,
				onFailure : onFailure,
				notification : {
					zoneError : ".errorBox_formAjoutSecteur",
					zoneInfo  : ".infoBox_tableEdit",
					titleError: "<h2 class='titleError'><s:text name='commun.error.msg'/></h2>",
					titleInfo: "<h2 class='titleInfo'><s:text name='commun.info.msg'/></h2"
				}
			});
		
			// ESC ou bouton annuler pour cacher la boite de dialogue
			tableEditObject.dialogEditFormEscHandler = Y.on('key', function(e) {
				e.halt();
				tableEditObject.dialogEditForm.cancel();
			}, panelFormNode, 'down:27', Y);
			tableEditObject.dialogEditFormCancelHandler = Y.delegate('click', function(e) {
				e.halt();
				tableEditObject.dialogEditForm.cancel();
			}, panelFormNode, '.cancelButton', Y);
			
			tableEditObject.dialogEditForm.render(YAHOO.util.Dom.get("main") || document.body);

			tableEditObject.dialogEditForm.hideEvent.subscribe ( function() {
				Y.hornet.Notification.resetNotifications();
				tableEditObject.formObject.disableForm(); 
				delete tableEditObject.formObject.action;
				delete tableEditObject.currentEditRowId;
				gDataTable.focusTbodyEl(); <%-- remet le focus sur la datatable, sinon le panel a tjrs les events keyboards --%>
			});
		}

		return new tableEditClass();
	}
//]]>
</script>
