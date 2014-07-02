<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="/struts-tags" prefix="s"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles" %>
<%@ taglib uri="/hornet-tags" prefix="hornet"%>
<%@taglib uri="http://www.springframework.org/security/tags" prefix="security" %>

<s:url id="icoDeselectionnerTousUrl" value="%{#application.themeDefautPath}/assets/ico_deselectionner_tous.png"/>
<s:url id="icoSelectionnerTousUrl" value="%{#application.themeDefautPath}/assets/ico_selectionner_tous.png"/>
<s:url id="icoConsulterUrl" value="%{#application.themeDefautPath}/assets/ico_consulter.png"/>
<s:url id="icoAjouterUrl" value="%{#application.themeDefautPath}/assets/ico_ajouter.png"/>
<s:url id="icoExporterExcelUrl" value="%{#application.themeDefautPath}/assets/ico_export_excel.png"/>
<s:url id="icoExporterCsvUrl" value="%{#application.themeDefautPath}/assets/ico_export_csv.png"/>
<s:url id="icoEditerUrl" value="%{#application.themeDefautPath}/assets/ico_editer.png"/>
<s:url id="icoSupprimerUrl" value="%{#application.themeDefautPath}/assets/ico_supprimer.png"/>
<s:url id="icoSupprimerEnMasseUrl" value="%{#application.themeDefautPath}/assets/ico_supprimer.png"/>
<s:url id="icoAgendaUrl" value="%{#application.themeDefautPath}/assets/ico_agenda.png"/>
<s:url id="icoTooltipUrl" value="%{#application.themeDefautPath}/assets/ico_tooltip.png"/>
<s:url id="icoFiltrerUrl" value="%{#application.themeDefautPath}/assets/ico_filtrer.png"/>

<script type="text/javascript">
//<![CDATA[
    //Fonctions pour afficher/masquer des élements.
    function hide(nodeList) {
        hornet().use("node", function(Y) {
            // masquage des elements
            Y.all(nodeList).addClass('hornet-hidden');
        });
    }
    function show(nodeList) {
        hornet().use("node", function(Y) {
            // affichage des elements
            Y.all(nodeList).removeClass('hornet-hidden');
        });
    }
    //Fonction pour reinitialiser les messages de notification
    function resetNotifications(){ 
        hornet().use("hornet-notification", function(Y) {
            Y.hornet.Notification.resetNotifications(); 
        });
    }

   function addValidationRules(Y, f) {
       var vPostDateFin = new Y.hornet.Validator({ errorMessage: "<s:text name='GESTION_PARTENAIRE.recherche.endDate.postStartDate'/>" });
       vPostDateFin.validate =  function (form, elt) {
           var testval = true,
           value = elt.get('value'),
           valueDepart = form.elements['criteres.startDate'].value;

           // la validation n'est pas effectuee si les valeurs ne sont pas definies
           if (!!value && !!valueDepart) {
               testval = Y.hornet.FactoryValidator.defaults.VALIDATORS.minDate.apply(this, [value, valueDepart, "dd/MM/yyyy"]);
           }
           return testval;
       };
       f.addValidator("criteres.endDate", vPostDateFin, "criteres.endDate_anchor");
   }
 //]]>
 </script>

<h2><s:text name="GESTION_PARTENAIRE.recherche.titrepage" /></h2>

<%-- 
    Zone d'affichage des notifications
--%>
<s:set var="titleError" scope="request"><h3 class="titleError"><s:text name="commun.error.msg" /></h3></s:set>
<s:set var="titleInputError" scope="request"><h3 class="titleError"><s:text name="commun.input.msg" /></h3></s:set>
<s:set var="titleInfo" scope="request"><h3 class="titleInfo"><s:text name="commun.info.msg" /></h3></s:set>

<div class="messageBox errorBox errorBox_formRecherche">
    <s:fielderror title="%{#attr.titleInputError}"/>
    <s:actionerror title="%{#attr.titleError}"/>
</div>
<div class="messageBox infoBox infoBox_formRecherche">
    <s:actionmessage title="%{#attr.titleInfo}"/>
</div>

<%--
    Recherche
--%>

<p class="discret"><s:text name="info.general.obligatoire"/></p>
<s:form id="formRecherche" action="recherche" validate="true" onsubmit="hide('.table'); resetNotifications()" cssClass="formRecherche">
    <s:param name="titleError"><s:property value="#attr.titleInputError" escapeHtml="false" escapeJavaScript="true" /></s:param>
    <s:param name="inlineErrorMessage" value="true" />
    <s:param name="validators">addValidationRules</s:param>

    <s:hidden name="resetTableau" value="true"/>
    
    <h3 class="recherche"><s:text name="GESTION_PARTENAIRE.recherche.titre" /></h3>
    <p class="texte">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam.</p>
    
    <div class="yui3-g-r">
        <div class="yui3-u-1-2">
            <fieldset class="inline yui3-g-r formmgr-row">
                <s:component template="legend" cssClass="yui3-u-1-2" cssStyle="label" value="%{getText('GESTION_PARTENAIRE.recherche.type.lbl')}" 
                    tooltip="%{getText('GESTION_PARTENAIRE.typepartenaire')}" tooltipConfig="#{'tooltipIcon':'%{icoTooltipUrl}', 'jsTooltipEnabled':'true'}" />
                <div class="yui3-u-1-2">
                    <div class="formmgr-message-text"></div>
                    <s:radio cssClass="formmgr-field" id="isClient" list="#{'true':getText('GESTION_PARTENAIRE.recherche.type.client.lbl'),'false':getText('GESTION_PARTENAIRE.recherche.type.fournisseur.lbl')}" name="criteres.partenaire.isClient"/>
                </div>
            </fieldset>
        </div>
        
        <div class="yui3-u-1-2">
            <div class="yui3-g-r formmgr-row">
                <div class="yui3-u-1-2">
                    <s:label for="isVip" value="%{getText('GESTION_PARTENAIRE.recherche.vip.lbl')}"
                        tooltip="%{getText('GESTION_PARTENAIRE.recherche.vip.tooltip')}" tooltipConfig="#{'tooltipIcon':'%{icoTooltipUrl}', 'jsTooltipEnabled':'true'}">
                    <s:param name="escape" value="false" /></s:label>
                </div>
                <div class="yui3-u-1-2">
                    <div class="formmgr-message-text"></div>
                    <s:checkbox cssClass="formmgr-field" id="isVip" name="criteres.partenaire.isVIP" />
                </div>
            </div>
        </div>
    </div>
    
    <div class="yui3-g-r formmgr-row">
        <div class="yui3-u-1-4">
            <s:label for="secteurId" id="secteurIdLabel" value="%{getText('GESTION_PARTENAIRE.recherche.secteur.lbl')}"/>
        </div>
        <div class="yui3-u-1-4">
            <div class="formmgr-message-text"></div>
            <s:select cssClass="formmgr-field" id="secteurId" list="secteurs" listKey="id" listValue="nom" name="criteres.idSecteur"/>
        </div>
    </div>

    <fieldset class="groupeChamps">
        <legend><s:text name="GESTION_PARTENAIRE.recherche.derniereModif.lbl"/></legend>
        <div class="yui3-g-r">
            <div class="yui3-u-1-2">
                <div class="yui3-g-r formmgr-row">
                    <div class="yui3-u-1-2">
                        <s:label requiredLabel="true" for="criteres.startDate" id="startDateLabel" value="%{getText('GESTION_PARTENAIRE.recherche.startDate.lbl')}" />
                    </div>
                    <div class="yui3-u-1-2">
                        <div class="formmgr-message-text"></div>
                        <hornet:calendar cssClass="formmgr-field"  id="criteres.startDate" name="criteres.startDate" displayFormat="dd/MM/yyyy" iconPath="%{icoAgendaUrl}" />
                    </div>
                </div>
            </div>
            
            <div class="yui3-u-1-2">
                <div class="yui3-g-r formmgr-row">
                    <div class="yui3-u-1-2">
                        <s:label for="criteres.endDate" id="endDateLabel" value="%{getText('GESTION_PARTENAIRE.recherche.endDate.lbl')}" />
                    </div>
                    <div class="yui3-u-1-2">
                        <div class="formmgr-message-text"></div>
                        <hornet:calendar cssClass="formmgr-field" id="criteres.endDate" name="criteres.endDate" displayFormat="dd/MM/yyyy" iconPath="%{icoAgendaUrl}" />
                    </div>
                </div>
            </div>
        </div>
    </fieldset>

    <div class="button-group">
        <s:submit cssStyle="button" type="button" value="%{getText('commun.btn.rechercher')}" name="btnRechercher" />
        <s:reset cssStyle="button" type="button"><s:param name="value" ><s:text name="commun.btn.reset" /></s:param></s:reset>
    </div>
</s:form>


<s:url id="exportExcelUrl" value="exportExcelPartenaires.xls"/>
<s:url id="exportCsvUrl" value="exportCsvPartenaires.csv"/>
<s:url id="ajoutUrl" action="initAjoutPartenaire"/>
  
  
<%--
    Tableau recherche partenaire
--%>
<div class="table hornet-table-loading" id="resultTableau" >
    <s:form id="formTableau" action="recherche" validate="true">
    
    <c:set var="sortParam" value="tablesStates['partenaires'].sort" /><%-- Nom du paramètre à passer dans la requête --%>
    <s:set var="sort" value="tablesStates['partenaires'].sort" /><%-- Raccourci pour la proriété sort du tableau ci-dessous --%>
    <s:set var="pagination" value="tablesStates['partenaires'].pagination" /><%-- Raccourci pour la proriété pagination du tableau ci-dessous --%>
    
    <div <s:if test="(partenaires == null)">class="js-disabled-hidden"</s:if>>
        <h3 class="titreTableau">
            <s:text name="GESTION_PARTENAIRE.recherche.tableau.caption"/>
        </h3>
        <s:submit id="filterButton" cssClass="none" type="button" value="%{getText('commun.btn.filtrer')}" action="recherche" />
        <div class="outils haut">
            <security:authorize access="hasRole('ROLE_AppliTuto_ADMIN')">
            <div class="selection"></div>
            <div class="actions actionsMasse">
                <span class="icone supprimer"><s:submit cssClass="hijaxSupAllAction"
                    id="supprEnMassePartenaireHaut" type="image" src="%{icoSupprimerEnMasseUrl}" 
                    label="%{getText('GESTION_PARTENAIRE.recherche.tableau.title.supprEnMasse')}" 
                    title="%{getText('GESTION_PARTENAIRE.recherche.tableau.title.supprEnMasse')}" 
                    action="supprEnMassePartenaire"/></span>
            </div>
            </security:authorize>
            <div class="actions yui3-filtre-buttons-hd">
                <security:authorize access="hasRole('ROLE_AppliTuto_ADMIN')">
                <s:a cssClass="hijaxAjoutAction icone ajouter" id="ajouterPartenaire" href="%{ajoutUrl}" 
                   title="%{getText('GESTION_PARTENAIRE.recherche.tableau.title.ajouter')}">
                    <img alt="<s:text name="GESTION_PARTENAIRE.recherche.tableau.title.ajouter" />" src="${icoAjouterUrl}"/>
                </s:a>
                </security:authorize>
                <s:a cssClass="hijaxExportAction icone exporterExcel" id="exporterPartenaireExcel" href="%{exportExcelUrl}" 
                   title="%{getText('GESTION_PARTENAIRE.recherche.tableau.title.exporterExcel')}">
                    <img alt="<s:text name="GESTION_PARTENAIRE.recherche.tableau.title.exporterExcel"></s:text>" src="${icoExporterExcelUrl}"/>
                </s:a>
                <s:a cssClass="hijaxExportAction icone exporterCsv" id="exporterPartenaireCsv" href="%{exportCsvUrl}" 
                   title="%{getText('GESTION_PARTENAIRE.recherche.tableau.title.exporterCsv')}">
                    <img alt="<s:text name="GESTION_PARTENAIRE.recherche.tableau.title.exporterCsv"></s:text>" src="${icoExporterCsvUrl}"/>
                </s:a>
            </div>
        </div>
    </div>
    <div id="filtres" class="filtre <s:if test="(partenaires == null)">js-disabled-hidden</s:if>">
    <fieldset id="formFiltre">
        <legend class="hidden"><s:text name="GESTION_PARTENAIRE.recherche.tableau.title.filtrer"/></legend>
        <div class="yui3-g-r">
            <div class="yui3-u-1-4">
                <s:label for="filtreNom" value="%{getText('GESTION_PARTENAIRE.recherche.tableau.nom')}" />
            </div>
            <div class="yui3-u-1-4">
                <s:textfield cssClass="yui3-filtre-field" name="criteres.partenaire.nom" id="filtreNom"/>
            </div>
            <div class="yui3-u-1-4">
                <s:label for="filtrePrenom" value="%{getText('GESTION_PARTENAIRE.recherche.tableau.prenom')}" />
            </div>
            <div class="yui3-u-1-4">
                <s:textfield cssClass="yui3-filtre-field" name="criteres.partenaire.prenom" id="filtrePrenom"/>
            </div>
        </div>
        <div class="yui3-g-r">
            <div class="yui3-u-1-4">
                <s:label for="filtreCourriel" value="%{getText('GESTION_PARTENAIRE.recherche.tableau.courriel')}" />
            </div>
            <div class="yui3-u-1-4"> 
                <s:textfield cssClass="yui3-filtre-field" name="criteres.partenaire.proCourriel" id="filtreCourriel"/>
            </div>
            <div class="yui3-u-1-4">
                <s:label for="filtreOrga" value="%{getText('GESTION_PARTENAIRE.recherche.tableau.organisme')}" />
            </div>
            <div class="yui3-u-1-4">
                <s:textfield cssClass="yui3-filtre-field" name="criteres.partenaire.organisme" id="filtreOrga"/>
            </div>
        </div>
        <div class="yui3-g-r">
            <div class="yui3-u-1-4">
                <s:label for="isVipFiltre" value="%{getText('GESTION_PARTENAIRE.recherche.tableau.vip')}" />
            </div>
            <div class="yui3-u-1-4">
                <s:checkbox cssClass="yui3-filtre-field" id="isVipFiltre" name="criteres.partenaire.isVIPFiltre" />
            </div>
            <div class="yui3-u-1-4">
                <s:label for="filtreDateModif" value="%{getText('GESTION_PARTENAIRE.recherche.tableau.dateModif')}" />
            </div>
            <div class="yui3-u-1-4">
                <hornet:calendar cssClass="yui3-filtre-field" id="filtreDateModif" name="criteres.partenaire.dateModif" displayFormat="dd/MM/yyyy" iconPath="%{icoAgendaUrl}" />
            </div>
        </div>
        </fieldset>
        <div class="yui3-u-1 button-group yui3-filtre-buttons-ft">
            <s:submit id="filterButton2" cssStyle="button" type="button" value="%{getText('commun.btn.filtrer')}" action="recherche"/>
            <s:submit id="cancelFilterButton" cssStyle="button" type="button" value="%{getText('commun.btn.annuler')}" action="initFiltrage"/>
        </div>
    </div>
    <div id="listePartenairesContainer">
    <s:if test="(partenaires != null)">
        <table id="listePartenaires" summary="<s:text name="GESTION_PARTENAIRE.recherche.tableau.summary"/>">
            <caption><s:text name="GESTION_PARTENAIRE.recherche.tableau.caption"/></caption>
            <thead>
                <tr class="tableau_entete">
                    <security:authorize access="hasRole('ROLE_AppliTuto_ADMIN')">
                    <th scope="col" id="selection">&nbsp;</th>
                    </security:authorize>
                    <th scope="col" id="nom">
                        <c:set var="nomOrder"><c:choose><c:when test="${sort.key == 'nom' and sort.dir == 'ASC'}">DESC</c:when><c:otherwise>ASC</c:otherwise></c:choose></c:set>
                        <a href="?${sortParam}.key=nom&amp;${sortParam}.dir=${nomOrder}#listePartenairesContainer"><s:text name="GESTION_PARTENAIRE.recherche.tableau.nom"/></a>
                    </th>
                    <th scope="col" id="prenom">
                        <c:set var="prenomOrder"><c:choose><c:when test="${sort.key == 'prenom' and sort.dir == 'ASC'}">DESC</c:when><c:otherwise>ASC</c:otherwise></c:choose></c:set>
                        <a href="?${sortParam}.key=prenom&amp;${sortParam}.dir=${prenomOrder}#listePartenairesContainer"><s:text name="GESTION_PARTENAIRE.recherche.tableau.prenom"/></a></th>
                    <th scope="col" id="courriel">
                        <c:set var="courrielOrder"><c:choose><c:when test="${sort.key == 'courriel' and sort.dir == 'ASC'}">DESC</c:when><c:otherwise>ASC</c:otherwise></c:choose></c:set>
                        <a href="?${sortParam}.key=courriel&amp;${sortParam}.dir=${courrielOrder}#listePartenairesContainer"><s:text name="GESTION_PARTENAIRE.recherche.tableau.courriel"/></a></th>
                    <th scope="col" id="organisme">
                        <s:text name="GESTION_PARTENAIRE.recherche.tableau.organisme"/></th>
                    <th scope="col" id="vip">
                        <c:set var="vipOrder"><c:choose><c:when test="${sort.key == 'vip' and sort.dir == 'ASC'}">DESC</c:when><c:otherwise>ASC</c:otherwise></c:choose></c:set>
                        <a href="?${sortParam}.key=vip&amp;${sortParam}.dir=${vipOrder}#listePartenairesContainer"><s:text name="GESTION_PARTENAIRE.recherche.tableau.vip"/></a></th>
                    <th scope="col" id="dateModif">
                        <c:set var="dateModifOrder"><c:choose><c:when test="${sort.key == 'dateModif' and sort.dir == 'ASC'}">DESC</c:when><c:otherwise>ASC</c:otherwise></c:choose></c:set>
                        <a href="?${sortParam}.key=dateModif&amp;${sortParam}.dir=${dateModifOrder}#listePartenairesContainer"><s:text name="GESTION_PARTENAIRE.recherche.tableau.dateModif"/></a></th>
                    <th scope="col" id="consultation">&nbsp;</th>
                    <security:authorize access="hasRole('ROLE_AppliTuto_ADMIN')">
                    <th scope="col" id="edition">&nbsp;</th>
                    <th scope="col" id="suppression">&nbsp;</th>
                    </security:authorize>
                </tr>
            </thead>
            <tbody>
            <s:iterator value="partenaires" status="rowstatus">
                <s:url id="urlConsulterPartenaire" action="initFichePartenaire">
                    <s:param name="idPartenaire" value="id" />
                </s:url>
                <s:url id="urlEditerPartenaire" action="initEditionPartenaire">
                     <s:param name="idPartenaire" value="id" />
                </s:url>
                <s:url id="urlSupprimerPartenaire" action="supprimerPartenaire">
                    <s:param name="listeSelection" value="id" />
                </s:url>
                <s:if test="#rowstatus.first == true">
                    <c:set var="rowStyle" scope="page" value="tableau_ligne_premier tableau_corps"/>
                </s:if><s:elseif test="#rowstatus.odd == false">
                    <c:set var="rowStyle" scope="page" value="tableau_ligne_pair tableau_corps"/>
                </s:elseif>
                <s:else>
                    <c:set var="rowStyle" scope="page" value="tableau_ligne_impair tableau_corps"/>
                </s:else>
                <tr class="${rowStyle}">
                    <s:text var="titleSelection" name="GESTION_PARTENAIRE.recherche.tableau.title.selectionner" >
                        <s:param><s:property value="nom" escapeHtml="false"/></s:param>
                        <s:param><s:property value="prenom" escapeHtml="false"/></s:param>
                    </s:text>
                    <s:text var="titleConsultation" name="GESTION_PARTENAIRE.recherche.tableau.title.consulter" >
                        <s:param><s:property value="nom" escapeHtml="false" /></s:param>
                        <s:param><s:property value="prenom" escapeHtml="false" /></s:param>
                    </s:text>
                    <s:text var="titleEdition" name="GESTION_PARTENAIRE.recherche.tableau.title.editer" >
                        <s:param><s:property value="nom" escapeHtml="false" /></s:param>
                        <s:param><s:property value="prenom" escapeHtml="false" /></s:param>
                    </s:text>
                    <s:text var="titleSuppression" name="GESTION_PARTENAIRE.recherche.tableau.title.supprimer" >
                        <s:param><s:property value="nom" escapeHtml="false" /></s:param>
                        <s:param><s:property value="prenom" escapeHtml="false" /></s:param>
                    </s:text>
                    <security:authorize access="hasRole('ROLE_AppliTuto_ADMIN')">
                    <td headers="selection"><s:checkbox id="lp_sel_%{#rowstatus.index}" name="listeSelection" fieldValue="%{id}" cssClass="hijackCheckbox" title="%{#titleSelection}"><s:param name="anchor" value="false" /></s:checkbox></td>
                    </security:authorize>
                    <td headers="nom"><s:property value="nom" escapeHtml="true"/></td>
                    <td headers="prenom"><s:property value="prenom" escapeHtml="true"/></td>
                    <td headers="courriel"><s:property value="proCourriel" escapeHtml="true"/></td>
                    <td headers="organisme"><s:property value="organisme" escapeHtml="true"/></td>
                    <td headers="vip"><s:property value="labelIsVIP" /></td>
                    <td headers="dateModif"><s:date name="dateModif" format="dd/MM/yyyy" /></td>
                    <td headers="consultation"><s:a id="lp_c_%{#rowstatus.index}" cssClass="hijaxConsultAction icone consulter" href="%{urlConsulterPartenaire}" title="%{#titleConsultation}" ><img alt="<s:property value="%{#titleConsultation}" escapeHtml="true" escapeXml="true"/>" src="${icoConsulterUrl}"/></s:a></td>
                    <security:authorize access="hasRole('ROLE_AppliTuto_ADMIN')">
                    <td headers="edition"><s:a id="lp_e_%{#rowstatus.index}" cssClass="hijaxEditAction icone editer" href="%{urlEditerPartenaire}" title="%{#titleEdition}"><img alt="<s:property value="%{#titleEdition}" escapeXml="true" escapeHtml="true" />" src="${icoEditerUrl}" /></s:a></td>
                    <td headers="suppression"><s:a id="lp_s_%{#rowstatus.index}" cssClass="hijaxSupAction icone supprimer" href="%{urlSupprimerPartenaire}" title="%{#titleSuppression}"><img alt="<s:property value="%{#titleSuppression}" escapeXml="true" escapeHtml="true" />" src="${icoSupprimerUrl}"/></s:a></td>
                    </security:authorize>
                </tr>
            </s:iterator>
            </tbody>
        </table>
        <s:if test="partenaires.isEmpty">
            <p>
                <s:text name="commun.tableau.vide"></s:text>
            </p>
        </s:if>

        <!-- PAGINATION -->
        <div class="yui-pg-container">
           <hornet:paginator
              tableId="partenaires"
              count="${totalItems}" selected="${pagination.pageIndex}" itemPerPage="${itemsParPage}"
              anchor="listePartenairesContainer" />
        </div>
    </s:if>
    </div>
    <div <s:if test="(partenaires == null)">class="js-disabled-hidden"</s:if>>
        <div class="outils bas">
            <security:authorize access="hasRole('ROLE_AppliTuto_ADMIN')">
            <div class="selection"></div>
            <div class="actions actionsMasse">
                <span class="icone supprimer"><s:submit cssClass="hijaxSupAllAction"
                    id="supprEnMassePartenaireBas" type="image" src="%{icoSupprimerEnMasseUrl}" 
                    label="%{getText('GESTION_PARTENAIRE.recherche.tableau.title.supprEnMasse')}" title="%{getText('GESTION_PARTENAIRE.recherche.tableau.title.supprEnMasse')}" 
                    action="supprEnMassePartenaire"/></span>
            </div>
            </security:authorize> 
            <div class="actions">
                <security:authorize access="hasRole('ROLE_AppliTuto_ADMIN')">
                <s:a cssClass="hijaxAjoutAction icone ajouter" id="ajouterPartenaire_bas" href="%{ajoutUrl}" 
                   title="%{getText('GESTION_PARTENAIRE.recherche.tableau.title.ajouter')}">
                    <img alt="<s:text name="GESTION_PARTENAIRE.recherche.tableau.title.ajouter"><s:param></s:param></s:text>" src="${icoAjouterUrl}" />
                </s:a>
                </security:authorize>
            </div>
            <div id="pag-below" class="yui-pg-container"><!-- pagination controls will go here --></div>
        </div>
    </div>
    </s:form>
</div>

<script type="text/javascript">
//<![CDATA[
hornet().use("event", "node", "hornet-pagintable", "hornet-ajax", "hornet-filtre", function (Y) {
        var YAHOO = Y.YUI2;
        
        var myFormRecherche,
        myDataSource = null,
        myDataTable = null,
        myFilter = null;


        // Configuration du formulaire
        var formId = "formRecherche",
        zoneError = '.errorBox_formRecherche',
        zoneInfo = '.infoBox_formRecherche',
        titleError = '<s:property escapeJavaScript="true" escapeHtml="false" value="#attr.titleError" />',
        titleInfo = '<s:property escapeJavaScript="true" escapeHtml="false" value="#attr.titleInfo" />',
        configNotification = {
            zoneError : zoneError,
            zoneInfo : zoneInfo,
            titleError : titleError,
            titleInfo: titleInfo
        };
        
        // Definition des colonnes du tableau
        var myColumnDefs = [
<security:authorize access="hasRole('ROLE_AppliTuto_ADMIN')">
            { key: "selection",    label: '<a class="hijackCheckboxAll" href="#" title="<s:text name="GESTION_PARTENAIRE.recherche.tableau.title.toutSelectionner"/>" >' 
                + '<img src="${icoSelectionnerTousUrl}" alt="<s:text name="GESTION_PARTENAIRE.recherche.tableau.title.toutSelectionner"/>" /></a>'
                + '&nbsp;<a class="hijackCheckboxNone" href="#" title="<s:text name="GESTION_PARTENAIRE.recherche.tableau.title.toutDeselectionner"/>" >'
                + '<img src="${icoDeselectionnerTousUrl}" alt="<s:text name="GESTION_PARTENAIRE.recherche.tableau.title.toutDeselectionner"/>" /></a>'},
</security:authorize>
            { key: "nom",          label: "<s:text name='GESTION_PARTENAIRE.recherche.tableau.nom'/>",     sortable:true, resizeable:true}, 
            { key: "prenom",       label: "<s:text name='GESTION_PARTENAIRE.recherche.tableau.prenom'/>",   sortable:true, resizeable:true}, 
            { key: "courriel",     label: "<s:text name='GESTION_PARTENAIRE.recherche.tableau.courriel'/>",   sortable:true, resizeable:true}, 
            { key: "organisme",    label: "<s:text name='GESTION_PARTENAIRE.recherche.tableau.organisme'/>",  sortable:false, resizeable:true}, 
            { key: "vip",          label: "<s:text name='GESTION_PARTENAIRE.recherche.tableau.vip'/>",  sortable:true, resizeable:true },  
            { key: "dateModif",    label: "<s:text name='GESTION_PARTENAIRE.recherche.tableau.dateModif'/>",   sortable:true, resizeable:true },
            { key: "consultation", label: "" }
<security:authorize access="hasRole('ROLE_AppliTuto_ADMIN')">
            ,{ key: "edition",      label: "" }
            ,{ key: "suppression",  label: "" }
</security:authorize>
        ]; 

        // Configuration de la pagination
        var paginatorConfig = {
            // REQUIRED
            rowsPerPage : ${itemsParPage} <c:if test="${empty itemsParPage}">10</c:if>,
            // If not provided, there is no last page or total pages.
            <c:if test="${!empty totalItems && totalItems > 0}">totalRecords:${totalItems},</c:if>
            // page to activate at load
            <c:if test="${!empty pagination.pageIndex}">initialPage:${pagination.pageIndex},</c:if>
            // Element(s) that will contain the controls
            containers:[ "pag-below" ],
            alwaysVisible: false
        };

        // Configuration du tableau
        var tableConfig = {
            tableName        : "partenaires"
            ,caption         : "<s:property value="getText('GESTION_PARTENAIRE.recherche.tableau.caption')" escapeJavaScript="true" />"
            ,summary         : "<s:property value="getText('GESTION_PARTENAIRE.recherche.tableau.summary')" escapeJavaScript="true" />"
            ,paginator       : Y.hornet.PaginTable.createPagination(paginatorConfig.rowsPerPage || 10, paginatorConfig)
            ,renderLoopSize  : 100
            ,initialLoad     : false
            ,dynamicData     : true// Enables dynamic server-driven data
            <c:if test="${!empty sort.key}">
            ,sortedBy:{
                key:"${sort.key}", 
                dir:<c:choose><c:when test="${sort.dir == 'DESC'}">YAHOO.widget.DataTable.CLASS_DESC</c:when><c:otherwise>YAHOO.widget.DataTable.CLASS_ASC</c:otherwise></c:choose>
            }
            </c:if>
        },
        formTableId = "formTableau",
        tableId = "listePartenaires", 
        tableauContainerId = "listePartenairesContainer";

        Y.on('domready', function(){
            myFormRecherche = Y.one("form[id='" + formId + "']");
            
            var urlRecherche = "";
            if (myFormRecherche) {
                urlRecherche = myFormRecherche.get('action');
            }

            /*
             * Tableau
             */
             
            // Recuperation du conteneur et du formulaire entourant le tableau
            var tableauContainer = Y.one("[id='" + tableauContainerId + "']"),
            formTableNode = Y.one("form[id='" + formTableId + "']");

            // Recuperation du tableau html
            var tableau = Y.one("table[id='" + tableId + "']");
            
            // DataSource instance
            myDataSource = Y.hornet.PaginTable.createDatasource(urlRecherche, myColumnDefs, "item", {
                 table: tableId
                <c:if test="${!empty pagination.pageIndex}">,initialPage:${pagination.pageIndex}</c:if>
                <c:if test="${!empty totalItems && totalItems > 0}">,totalRecords:${totalItems}</c:if>
            }, configNotification);
    
            // DataTable instance
            myDataTable = Y.hornet.PaginTable.createServerTable(tableauContainerId, 
                    myColumnDefs, myDataSource, tableConfig);
            myDataTable.subscribe("dataReturnEvent", function(e, oSelf){
                var error = (e.response? e.response.error : true);
                if (!error) {
                    // Affichage du tableau
                    show('#resultTableau');
                }
            }, this, true);

            // Masquage du tableau
            hide('#resultTableau');
            
            // Chargement du composant tableau termine
            Y.all('#resultTableau').removeClass("hornet-table-loading");

            if (tableauContainer) {
               // Definit des listeners pour gerer les checkbox du tableau
               tableauContainer.detach('hijackCheckboxAll|click');
               tableauContainer.delegate('hijackCheckboxAll|click', function (e) {
                   e.halt();
                   // Met a jour le cochage de chaque checkbox
                   tableauContainer.all('table tbody .hijackCheckbox').each(function (el) {
                       el.set('checked', true);
                   });
               }, 'table thead .hijackCheckboxAll');
               tableauContainer.detach('hijackCheckboxNone|click');
               tableauContainer.delegate('hijackCheckboxNone|click', function (e) {
                   e.halt();
                   // Met a jour le cochage de chaque checkbox
                   tableauContainer.all('table tbody .hijackCheckbox').each(function (el) {
                       el.set('checked', false);
                   });
               }, 'table thead .hijackCheckboxNone');
               
               // Definit des listeners pour gerer les confirmations de suppression
               tableauContainer.detach('hijaxSupActionConfirm|click');
               tableauContainer.delegate('hijaxSupActionConfirm|click', function (e) {
                   if(!confirm("<s:text name='GESTION_PARTENAIRE.msg.suppression.confirm'/>")){
                       e.halt();
                   }
               }, 'table tbody .hijaxSupAction');
            }

           if (formTableNode) {
               formTableNode.detach('hijaxSupAllActionConfirm|click');
               formTableNode.delegate('hijaxSupAllActionConfirm|click', function (e) {
                   if(!confirm("<s:text name='GESTION_PARTENAIRE.msg.suppression.confirm'/>")){
                       e.halt();
                   }
               }, '.hijaxSupAllAction');
            }
            
            // Si tableau html present
            if (tableau) {
                // Chargement initial des donnees
                myDataTable.load();
            }

            /*
             * Recherche
             */
    
            // Masquage du tableau au reset
            myFormRecherche.on ("reset", function(){ hide('.table'); });
            // Suppression des messages et erreurs au reset
            myFormRecherche.on ("reset", function(){ resetNotifications(); });
            
            // Recherche
            Y.on ("submit", function (e) {
                if (myFilter != null) {
                    // Reinit des filtres
                    myFilter.reset();

                    // Fermeture du bloc de filtrage
                    myFilter.hide();
                }
                if (myDataTable != null) {
                    // Stop la propagation pour eviter le submit par le navigateur
                    e.halt();
                    e.preventDefault();

                    // Reinit du tableau
                    myDataTable.initializeTable();

                    // Ajout des criteres de recherche
                    myDataTable.getDataSource().connMgr.setForm(this.getDOMNode());

                    // Chargement des donnees avec reinitialisation du filtrage
                    myDataTable.load();
                }
                return false;
            }, myFormRecherche);

            /*
             * Filtre
             */
             
            myFilter = new Y.hornet.filtre({
                contentBox: '#filtres',
                icon: '${icoFiltrerUrl}',
                buttonsHeader: '.yui3-filtre-buttons-hd',
                buttonsFooter: '.yui3-filtre-buttons-ft'
            });
            myFilter.render();
            // Masquage si filtre inactif
            if(! myFilter.get('active')) {
                myFilter.hide();
            }

            // Filtre
            var filtrage = function (e) {
                if (myFilter != null) {
                    // Mise a jour de l'etat du filtrage
                    myFilter.fire('update');
                }
                if (myDataTable != null) {
                    // Stop la propagation pour eviter le submit par le navigateur
                    e.halt();
                    e.preventDefault();

                    // Reinit du tableau
                    myDataTable.initializeTable();

                    // Ajout des criteres de filtrage
                    myDataTable.getDataSource().connMgr.setForm(formTableNode.getDOMNode());

                    // Chargement des donnees
                    myDataTable.load();
                }
                return false;
            };
            Y.delegate("click", filtrage, "#formTableau", "#filterButton, #filterButton2");
            
            // Annulation du filtre
            Y.on ("click", function (e) {
                if (myFilter != null) {
                    // Reinit des filtres
                    myFilter.reset();

                    // Fermeture du bloc de filtrage
                    myFilter.hide();
                }
                if (myDataTable != null) {
                    // Stop la propagation pour eviter le submit par le navigateur
                    e.halt();
                    e.preventDefault();

                    // Reinit du tableau
                    myDataTable.initializeTable();

                    // Ajout des criteres de filtrage
                    myDataTable.getDataSource().connMgr.setForm(formTableNode.getDOMNode());

                    // Chargement des donnees
                    myDataTable.load();
                }
                return false;
            }, "#cancelFilterButton");
            
        });

});
//]]>
</script>
