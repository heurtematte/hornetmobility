<?xml version="1.0" encoding="UTF-8" standalone="yes" ?>
<%@ page contentType="text/xml; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="/struts-tags" prefix="s"%>

<s:url id="icoEditerUrl" value="%{#application.themeDefautPath}/assets/ico_editer.png"/>
<s:url id="icoSupprimerUrl" value="%{#application.themeDefautPath}/assets/ico_supprimer.png"/>

<PAGE>
    <RESULTAT><s:if test="(fieldErrors.size > 0) || (actionErrors.size > 0)">KO</s:if><s:else>OK</s:else></RESULTAT>

    <DATA>
	    <SECTEUR>
	       <s:url id="editUrl" value="/dyn/protected/administration/secteur/initEdition.html">
                <s:param name="id" value="secteurEnCours.id"/>
            </s:url>
            <s:url id="supUrl" value="/dyn/protected/administration/secteur/suppression.html">
                <s:param name="id" value="secteurEnCours.id"/>
            </s:url>
	        <s:set name="titleEdition" value="%{getText('ADMINISTRATION.GESTION_SECTEUR.table.row.edit.label', {secteurEnCours.nom})}" />
            <s:set name="titleSuppression" value="%{getText('ADMINISTRATION.GESTION_SECTEUR.table.row.sup.label', {secteurEnCours.nom})}" />
                        
            <id><s:property value="secteurEnCours.id" /></id>
	        <nomSecteur><s:property value="secteurEnCours.nom" escapeXml="true" escapeHtml="true" /></nomSecteur>
	        <description><s:property value="secteurEnCours.desc" escapeXml="true" escapeHtml="true" /></description>
            <dateCreation><s:property value="secteurEnCours.dateCreat" /></dateCreation>
            <dateMajEnreg><s:property value="secteurEnCours.dateMajEnreg" /></dateMajEnreg>
            <auteurCreation><s:property value="secteurEnCours.auteurCreat"  escapeXml="true" escapeHtml="true" /></auteurCreation>
            <edition><![CDATA[<s:a cssClass="hijaxEditAction icone editer" href="%{editUrl}" title="%{#titleEdition}"><img alt="<s:property value="%{#titleEdition}" escapeHtml="true" escapeXml="true"/>" src="${icoEditerUrl}"/></s:a>]]></edition>
            <suppression><![CDATA[<s:a cssClass="hijaxSupAction icone supprimer" href="%{supUrl}" title="%{#titleSuppression}"><img alt="%{#titleSuppression}" src="${icoSupprimerUrl}"/></s:a>]]></suppression>
	    </SECTEUR>
    </DATA>
</PAGE>