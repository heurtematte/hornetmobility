<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@taglib uri="/struts-tags" prefix="s"%>

<h2><s:text name='CONTACT.Titre.label'/></h2>

<%-- 
    Zone d'affichage des notifications
--%>
<div class="messageBox errorBox errorBox_formContact">
    <s:fielderror title="<h3 class='titleError'>%{getText('commun.input.msg')}</h3>"/>
    <s:actionerror title="<h3 class='titleError'>%{getText('commun.error.msg')}</h3>"/>
</div>
<div class="messageBox infoBox infoBox_formContact">
    <s:actionmessage title="<h3 class='titleInfo'>%{getText('commun.info.msg')}</h3>"/>
</div>

<p class="discret"><s:text name="info.general.obligatoire"/></p>

<s:form id="formContact" action="envoi" validate="true">
    <s:param name="titleError"><h3 class='titleError'><s:text name='commun.input.msg'/></h3></s:param>
    <s:param name="inlineErrorMessage" value="false" />
    
    <div class="yui3-g-r formmgr-row">
        <div class="yui3-u-1-3">
            <s:label requiredLabel="true" id="nomLabel" for="nom" value="%{getText('CONTACT.Nom.label')}"/>
        </div>
        <div class="yui3-u">
            <div class="formmgr-message-text"></div>
            <s:textfield cssClass="formmgr-field" name="nom" id="nom"/>
        </div>
    </div>
    
    <div class="yui3-g-r formmgr-row">
        <div class="yui3-u-1-3">
            <s:label requiredLabel="true" id="prenomLabel" for="prenom" value="%{getText('CONTACT.Prenom.label')}"/>                
        </div>
        <div class="yui3-u">
            <div class="formmgr-message-text"></div>
            <s:textfield cssClass="formmgr-field" name="prenom" id="prenom"/>
        </div>
    </div>
    
    <div class="yui3-g-r formmgr-row">
        <div class="yui3-u-1-3">
            <s:label requiredLabel="true" id="adresseLabel" for="adresseEmail" value="%{getText('CONTACT.AdresseMail.label')}"/>                
        </div>
        <div class="yui3-u">
            <div class="formmgr-message-text"></div>
            <s:textfield cssClass="formmgr-field" name="adresseEmail" id="adresseEmail"/>
        </div>
    </div>
    
    <div class="yui3-g-r formmgr-row">
        <div class="yui3-u-1-3">
            <s:label requiredLabel="true" id="messageLabel" for="message" value="%{getText('CONTACT.Message.label')}"/>                
        </div>
        <div class="yui3-u">
            <div class="formmgr-message-text"></div>
            <s:textarea cssClass="formmgr-field" name="message" id="message" cols="70" rows="5" />
        </div>
   </div>
    
   <div class="button-group">
        <s:submit id="envoi" cssStyle="button" type="button" value="%{getText('commun.btn.valider')}" action="envoi"/>            
   </div>
</s:form>