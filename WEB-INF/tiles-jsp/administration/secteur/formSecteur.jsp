<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@taglib uri="/struts-tags" prefix="s"%>
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles" %>

<%-- 
    Zone d'affichage des notifications
--%>
<div class="messageBox errorBox errorBox_formAjoutSecteur">
    <s:fielderror title="<h3 class='titleError'>%{getText('commun.input.msg')}</h3>"/>
    <s:actionerror title="<h3 class='titleError'>%{getText('commun.error.msg')}</h3>"/>
</div>
<div class="messageBox infoBox infoBox_formAjoutSecteur">
    <s:actionmessage title="<h3 class='titleInfo'>%{getText('commun.info.msg')}</h3>"/>
</div>

<tiles:useAttribute id="titre" name="titre" ignore="true" classname="String" />
<c:if test="${!empty titre}">
<h2><tiles:getAsString name="titre"/></h2>
</c:if>

<s:url id="formAjoutActionUrl" value="%{getText('ADMINISTRATION.GESTION_SECTEUR.formSecteur.ajout.url')}" />
<s:url id="formEditActionUrl" value="%{getText('ADMINISTRATION.GESTION_SECTEUR.formSecteur.edition.url')}" />

<tiles:importAttribute name="actionName"/>
<s:form id="formAjoutSecteur" validate="true" action="%{#attr.actionName}">
    <s:param name="titleError"><h3 class='titleError'><s:text name='commun.input.msg'/></h3></s:param>
    <s:param name="inlineErrorMessage" value="false" />
    
    <s:hidden id="id" name="id"/>
    <p class="discret"><s:text name="info.general.obligatoire"/></p>
        
    <div class="yui3-g-r formmgr-row">
        <div class="yui3-u-1-3">
            <s:label requiredLabel="true" id="nomLabel" for="nom" name="getText('ADMINISTRATION.GESTION_SECTEUR.formSecteur.nomSecteur.label')"/>
        </div>
        <div class="yui3-u">
            <div class="formmgr-message-text"></div>
            <s:textfield cssClass="formmgr-field" name="secteurEnCours.nom" id="nom" size="40"/>
        </div>
    </div>
    
    <div class="yui3-g-r formmgr-row">
        <div class="yui3-u-1-3">
            <s:label requiredLabel="true" id="descriptionLabel" for="description" name="getText('ADMINISTRATION.GESTION_SECTEUR.formSecteur.descriptionSecteur.label')"/>
        </div>
        <div class="yui3-u">
            <div class="formmgr-message-text"></div>
            <s:textfield cssClass="formmgr-field" name="secteurEnCours.desc" id="description" size="40"/>
        </div>
    </div>
    
    <div class="button-group">
        <s:url id="listeUrl" namespace="/dyn/protected/administration/secteur" action="liste"/>
        <s:submit cssStyle="button" type="button" id="submitButton" key="commun.btn.valider" name="btnValider" />
        <s:a cssStyle="button" id="cancelButton" cssClass="cancelButton" href="%{listeUrl}" title="%{getText('ADMINISTRATION.GESTION_SECTEUR.formSecteur.retour.label')}"><s:property value="getText('commun.btn.annuler')"/></s:a>
    </div>
</s:form>