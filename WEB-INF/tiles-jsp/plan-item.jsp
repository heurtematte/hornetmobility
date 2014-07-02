<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles"%>
<%@ taglib uri="/struts-tags" prefix="s"%>

	<c:set var="href" value="${item.value.href}" />
	<c:set var="id" value="${item.value.id}" />
	<c:set var="visibleDansPlan" value="${item.value.visibleDansPlan}" />
	<c:set var="hasVisibleChild" value="${item.value.hasVisibleChild}" />
	<fmt:message var="label" key="${id}.libelle"><fmt:param value=""/></fmt:message>

	<c:choose>
	    <c:when test="${hasVisibleChild}">
            <s:if test="%{#attr.item.value.estAutorise(#attr.roles)}">
		    <li>
		    <c:if test="${visibleDansPlan}">
		        <c:if test="${empty href}">${label}</c:if>
		        <c:if test="${!empty href}"><a <c:if test="${!empty id}"> id="${id}"</c:if> href="<c:url value="${href}" />">${label}</a></c:if>
		    </c:if>
		    <ul>
		    <c:forEach var="item" items="${item.value.sousMenus}">
				<c:set var="item" value="${item}" scope="request" />
		        <jsp:include page="plan-item.jsp" />
		    </c:forEach>
		    </ul>
		    </li>
	        </s:if>
	    </c:when>
	    <c:otherwise>
            <s:if test="%{#attr.item.value.estAutorise(#attr.roles)}">
		    <c:if test="${visibleDansPlan}">
		     <li>
		         <c:if test="${empty href}">${label}</c:if>
		         <c:if test="${!empty href}"><a <c:if test="${!empty id}"> id="${id}"</c:if> href="<c:url value="${href}" />">${label}</a></c:if>
		     </li>
		    </c:if>
            </s:if>
	    </c:otherwise>
	</c:choose>