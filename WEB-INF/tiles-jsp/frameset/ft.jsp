<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<fmt:bundle
	basename="package" prefix="footer.">
	<fmt:message key='copyright.libelle' var="copyright"><fmt:param value=""/></fmt:message>
</fmt:bundle>

<div id="ft" class="yui3-g">
    <div id="footer" class="yui3-u-1">
        <p>${copyright}&nbsp;-&nbsp;v${application.version}</p>
    </div>
</div>
	