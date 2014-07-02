<?xml version="1.0" encoding="UTF-8" standalone="yes" ?>
<%@ page contentType="text/xml; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="/struts-tags" prefix="s"%>

<PAGE>
    <RESULTAT>OK</RESULTAT>
    <messages>
        <s:iterator value="actionMessages" status="amstatus">
                <message>
                    <value><s:property escapeXml="true" escapeHtml="false" /></value>
                </message>
        </s:iterator>
    </messages>
</PAGE>