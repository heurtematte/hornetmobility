<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@taglib uri="/struts-tags" prefix="s"%>

<div class="messageBox errorBox">
    <s:fielderror title="<h2 class='titleError'>%{getText('commun.input.msg')}</h2>"/>
    <s:actionerror title="<h2 class='titleError'>%{getText('commun.error.msg')}</h2>"/>
</div>
<div class="messageBox infoBox">
    <s:actionmessage title="<h2 class='titleInfo'>%{getText('commun.info.msg')}</h2>"/>
</div>