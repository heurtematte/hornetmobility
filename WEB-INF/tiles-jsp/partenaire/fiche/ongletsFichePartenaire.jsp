<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="/struts-tags" prefix="s"%>
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>

    <%-- 
        Zone d'affichage des notifications
    --%>
    <div class="messageBox errorBox errorBox_formPartenaire">
        <s:fielderror title="<h2 class='titleError'>%{getText('commun.input.msg')}</h2>"/>
        <s:actionerror title="<h2 class='titleError'>%{getText('commun.error.msg')}</h2>"/>
    </div>
    <div class="messageBox infoBox infoBox_formPartenaire">
        <s:actionmessage title="<h2 class='titleInfo'>%{getText('commun.info.msg')}</h2>"/>
    </div>
    
    <h2>
        <s:text name="GESTION_PARTENAIRE.cadre.titre"/>
            <s:if test="partenaireEnCours.id!=null">
                 - <s:property value="partenaireEnCours.nom"/>&nbsp;<s:property value="partenaireEnCours.prenom"/>
            </s:if>
    </h2>
    
    
<s:form action="initFichePartenaire" id="formPartenaire" cssClass="form">
    
    <s:hidden name="idPartenaire"/>
    
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

<c:set var="retour" value="${param.retour}"/>
<s:if test="%{#attr.retour != null && #attr.retour != ''}">
    <s:url id="urlAnnuler" action="%{#attr.retour}" />
</s:if>
<s:else>
    <s:url id="urlAnnuler" action="cancelFichePartenaire"></s:url>
</s:else>

<div class="button-group">
    <s:a cssStyle="button" id="cancelFichePartenaire_consultation" href="%{urlAnnuler}" title="%{getText('GESTION_PARTENAIRE.retour.label')}"><s:text name="commun.btn.annuler"/></s:a> 
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