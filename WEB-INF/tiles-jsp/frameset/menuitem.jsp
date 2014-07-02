<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<%@ taglib uri="/struts-tags" prefix="s"%>

	<c:set var="href" value="${item.value.href}" />
    <c:set var="id" value="${item.value.id}" />
    <c:set var="visibleDansMenu" value="${item.value.visibleDansMenu}" />
    <c:set var="hasVisibleChild" value="${item.value.hasVisibleChild}" />
    <c:set var="niveau0" value="${idMenu/10 lt 1}" />
    <fmt:message var="label" key="${id}.libelle"><fmt:param value=""/></fmt:message>
    
    <c:if test="${visibleDansMenu}">
	   <c:set var="idMenu" value="${idMenu+1}" scope="request" />
	</c:if>
	
    <c:choose>
		<c:when test="${not empty href}">
			<c:if test="${visibleDansMenu}">
				<s:if test="%{#attr.item.value.estAutorise(#attr.roles)}">
					<li class="last"><a class="nivMenu${nivMenu}" href="<c:url value='${href}' />">${label}</a></li>
				</s:if>
			</c:if>
		</c:when>
		<c:when test="${hasVisibleChild}">
		    <s:if test="%{#attr.item.value.estAutorise(#attr.roles)}">
				<li class="has-sub">
				    <c:if test="${visibleDansMenu}">
					    <span class="nivMenu${nivMenu}">${label}<img src="<c:url value="/static-1.2.0/images/picto_fleche.png "/>" alt="${titleLabel}" /></span>
				    </c:if>
					<ul>
						<c:set var="idMenu" scope="request" value="${idMenu*10}" />
						<fmt:formatNumber var="nivMenu" scope="request" value="${nivMenu+1}"/>
						<c:forEach var="item" items="${item.value.sousMenus}">
							<c:set var="item" value="${item}" scope="request" />
							<jsp:include page="menuitem.jsp" />
						</c:forEach>
						<fmt:formatNumber var="idMenu" scope="request" value="${idMenu/10}" maxFractionDigits="0" />
						<fmt:formatNumber var="nivMenu" scope="request" value="${nivMenu-1}"/>
					</ul>
				</li>
			</s:if>
		</c:when>
		<c:otherwise>
			<c:if test="${visibleDansMenu}">
				<li class="">
				  <a class="nivMenu${nivMenu}" href="<c:url value='${href}' />">${label}</a>
				</li>
			</c:if>
		</c:otherwise>
	</c:choose>	