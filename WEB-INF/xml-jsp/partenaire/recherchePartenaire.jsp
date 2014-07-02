<?xml version="1.0" encoding="UTF-8" standalone="yes" ?>
<%@ page contentType="text/xml; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="/struts-tags" prefix="s"%>
<%@taglib uri="http://www.springframework.org/security/tags" prefix="security" %>

<s:url id="icoConsulterUrl" value="%{#application.themeDefautPath}/assets/ico_consulter.png"/>
<s:url id="icoEditerUrl" value="%{#application.themeDefautPath}/assets/ico_editer.png"/>
<s:url id="icoSupprimerUrl" value="%{#application.themeDefautPath}/assets/ico_supprimer.png"/>

<PAGE>
    <RESULTAT><s:if test="(fieldErrors.size > 0) || (actionErrors.size > 0)">KO</s:if><s:else>OK</s:else></RESULTAT>
    <messages>
        <s:iterator value="actionMessages" status="amstatus">
                <message>
                    <value><s:property escape="false" /></value>
                </message>
        </s:iterator>
    </messages>
    
    <totalItems><s:property value="totalItems"/></totalItems>
    <indexPage><s:property value="tablesStates['partenaires'].pagination.pageIndex"/></indexPage>
    <items>
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
            <item>
              <s:set name="labelSelection" value="%{getText('GESTION_PARTENAIRE.recherche.tableau.title.selectionner', {nom, prenom})}"/>
              <s:set name="labelConsultation" value="%{getText('GESTION_PARTENAIRE.recherche.tableau.title.consulter', {nom, prenom})}" />
              <s:set name="labelEdition" value="%{getText('GESTION_PARTENAIRE.recherche.tableau.title.editer', {nom, prenom})}" />
              <s:set name="labelSuppression" value="%{getText('GESTION_PARTENAIRE.recherche.tableau.title.supprimer', {nom, prenom})}" />
<security:authorize access="hasRole('ROLE_AppliTuto_ADMIN')">
              <selection><![CDATA[<s:checkbox id="lp_sel_%{#rowstatus.index}" name="listeSelection" fieldValue="%{id}" cssClass="hijackCheckbox" title="%{#labelSelection}"><s:param name="anchor" value="false" /></s:checkbox>]]></selection>
</security:authorize>
              <id><s:property value="id"/></id>
              <nom><s:property value="nom" escapeXml="true" escapeHtml="true"/></nom>
              <prenom><s:property value="prenom" escapeXml="true" escapeHtml="true"/></prenom>
              <courriel><s:property value="proCourriel" escapeXml="true" escapeHtml="true"/></courriel>
              <organisme><s:property value="organisme" escapeXml="true" escapeHtml="true"/></organisme>
              <vip><s:property value="labelIsVIP" /></vip>
              <dateModif><s:date name="dateModif" format="dd/MM/yyyy"/></dateModif>
              <consultation><![CDATA[<s:a id="lp_c_%{#rowstatus.index}" cssClass="hijaxConsultAction icone consulter" href="%{urlConsulterPartenaire}" title="%{#labelConsultation}"><img alt="<s:property value="%{#labelConsultation}" escapeXml="true" escapeHtml="true"/>" src="${icoConsulterUrl}" /></s:a>]]></consultation>
<security:authorize access="hasRole('ROLE_AppliTuto_ADMIN')">              
              <edition><![CDATA[<s:a id="lp_e_%{#rowstatus.index}" cssClass="hijaxEditAction icone editer" href="%{urlEditerPartenaire}" title="%{#labelEdition}"><img alt="<s:property value="%{#labelEdition}" escapeXml="true" escapeHtml="true"/>" src="${icoEditerUrl}" /></s:a>]]></edition>
              <suppression><![CDATA[<s:a id="lp_s_%{#rowstatus.index}" cssClass="hijaxSupAction icone supprimer" href="%{urlSupprimerPartenaire}" title="%{#labelSuppression}"><img alt="<s:property value="%{#labelSuppression}" escapeXml="true" escapeHtml="true"/>" src="${icoSupprimerUrl}" /></s:a>]]></suppression>
</security:authorize>              
            </item>
        </s:iterator>
    </items>
</PAGE>
