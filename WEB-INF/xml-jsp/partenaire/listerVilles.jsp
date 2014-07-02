<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<%@ page language="java" contentType="text/xml; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="/struts-tags" prefix="s"%>
<PAGE>
    <RESULTAT><s:if test="(fieldErrors.size > 0) || (actionErrors.size > 0)">KO</s:if><s:else>OK</s:else></RESULTAT>
    <DATA>
		<s:iterator value="listeVilles" status="status">
        <option>
            <value><s:property value="id"/></value>
            <text><s:property value="libelle" escapeXml="true" escapeHtml="false"/></text>
            <selected><s:property value="partenaireEnCours.ville.id == id" /></selected>
		</option>
		</s:iterator>
    </DATA>
</PAGE>