<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles"%>
<%@ taglib uri="http://www.springframework.org/security/tags" prefix="security" %>
<%@ taglib uri="/struts-tags" prefix="s"%>

<tiles:importAttribute name="menuVO" />

<security:authentication property="authorities" var="roles" scope="request"/>

<fmt:formatNumber var="nivMenu" scope="request" value="0" />


<fmt:bundle basename="package">
    <fmt:message key="header.deconnexion.libelle" var="deconnexionLabel"><fmt:param value=""/></fmt:message>
</fmt:bundle>

<div id="nav">
    <div id="cssmenu-container">
    	<ul>
    		<li id="cssmenu">
    			<span class="menu-racine">Menu</span>
				<ul>
			          <c:set var="idMenu" value="0" scope="request"/>
			          <c:forEach var="item" items="${menuVO.listeItems}">
			              <c:set var="item" value="${item}" scope="request"/>
			              <jsp:include page="menuitem.jsp" />
			          </c:forEach>
			          <li id="logoutmenu" class="last">
							<a class="logout" href="<c:url value="/j_spring_security_logout"/>">
								<span class="user"><security:authentication property="principal.username" /></span>
								<span class="lien-deconnexion">(${deconnexionLabel})</span>
							</a>
					</li>
				</ul>
			</li>
		</ul>
	</div>

	<div id="logout-container">
		<ul>
			
		</ul>
	</div>
</div>
