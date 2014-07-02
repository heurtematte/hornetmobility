<?xml version="1.0" encoding="UTF-8" standalone="yes" ?>
<%@ page contentType="text/xml; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="/struts-tags" prefix="s"%>

<PAGE>
    <errors>
        <s:iterator value="fieldErrors" status="festatus">
            <s:iterator value="value">
                <error>
                    <key><s:property value='key'/></key>
                    <value><s:property escapeXml="true" escapeHtml="false" /></value>
                </error>
            </s:iterator>
        </s:iterator>
        <s:iterator value="actionErrors" status="aestatus">
                <error>
                    <value><s:property escapeXml="true" escapeHtml="false" /></value>
                </error>
        </s:iterator>
    </errors>
    <messages>
        <s:iterator value="actionMessages" status="amstatus">
                <message>
                    <value><s:property escapeXml="true" escapeHtml="false" /></value>
                </message>
        </s:iterator>
    </messages>

    <RESULTAT>KO</RESULTAT>
</PAGE>