<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="/struts-tags" prefix="s"%>
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>

<%-- 
    Zone d'affichage des notifications
--%>
<s:set var="titleError" scope="request"><h3 class="titleError"><s:text name="commun.error.msg" /></h3></s:set>
<s:set var="titleInputError" scope="request"><h3 class="titleError"><s:text name="commun.input.msg" /></h3></s:set>
<s:set var="titleInfo" scope="request"><h3 class="titleInfo"><s:text name="commun.info.msg" /></h3></s:set>

<div class="messageBox errorBox errorBox_formEditionPartenaire">
    <s:fielderror title="%{#attr.titleInputError}"/>
    <s:actionerror title="%{#attr.titleError}"/>
</div>
<div class="messageBox infoBox infoBox_formEditionPartenaire">
    <s:actionmessage title="%{#attr.titleInfo}"/>
</div>

    <h2>
        <s:text name="GESTION_PARTENAIRE.cadre.titre"/>
            <s:if test="partenaireEnCours.id!=null">
                 - <s:property value="partenaireEnCours.nom"/>&nbsp;<s:property value="partenaireEnCours.prenom"/>
            </s:if>
    </h2>
    
    
<tiles:importAttribute name="actionName"/>
<s:form validate="true" action="%{#attr.actionName}" id="formEditionPartenaire" cssClass="form">
    <s:param name="titleError"><h2 class='titleError'><s:text name='commun.error.msg'/></h2></s:param>
    <s:param name="inlineErrorMessage" value="true" />
    
    <s:hidden name="idPartenaire"/>
    <s:submit id="btnDefaultValider" cssClass="none" type="button" key="commun.btn.valider" name="btnValider" />
    
    <div id="cadreFiche" class="tabview yui3-tabview-loading">
        <ul id="onglets">
            <fmt:bundle basename="fr.gouv.diplomatie.applitutoriel.web.action.partenaire.package"
                prefix="GESTION_PARTENAIRE.onglet.">
            <tiles:useAttribute id="listKey" name="ongletsKey" classname="java.util.List" />
            <c:forEach var="item" items="${listKey}" varStatus="status">
            <li>
                <a href="#onglet${status.count}"><fmt:message key="${item}"><fmt:param value=""/></fmt:message></a>
            </li>
            </c:forEach>
            </fmt:bundle>
        </ul>
    
        <div>
            <tiles:useAttribute id="listPagelet" name="ongletsPagelet" classname="java.util.List" />
            <c:forEach var="item" items="${listPagelet}" varStatus="status">
            <div id="onglet${status.count}">
            
                <c:set var="key" value="${listKey[status.count - 1]}" />
                <c:if test="${key != null}">
                <fmt:bundle basename="fr.gouv.diplomatie.applitutoriel.web.action.partenaire.package"
                    prefix="GESTION_PARTENAIRE.onglet.">
                <h3 class="hornet-tabview-title-hidden"><fmt:message key="${key}"><fmt:param value=""/></fmt:message></h3>
                </fmt:bundle>
                </c:if>
                
                <tiles:insertAttribute value="${item}" flush="true" />
            </div>
            </c:forEach>
        </div>
    </div>
        
    <div class="button-group">
        <s:submit cssStyle="button" type="button" key="commun.btn.valider" name="btnValider" />
        <s:url id="urlAnnuler" action="cancelFichePartenaire"></s:url>
        <s:a cssStyle="button" id="cancelFichePartenaire_edition" href="%{urlAnnuler}" title="%{getText('GESTION_PARTENAIRE.retour.label')}"><s:text name="commun.btn.annuler"/></s:a> 
    </div>
    
<script type="text/javascript">
//<![CDATA[
    hornet().use('event', 'tabview', function(Y) {
        var tabviewCadre = new Y.TabView({srcNode:'#cadreFiche'});
        tabviewCadre.render();
        tabviewCadre.selectChild('<tiles:insertAttribute ignore="true" name="onglet"/>');
    });
//]]>
</script>

</s:form>