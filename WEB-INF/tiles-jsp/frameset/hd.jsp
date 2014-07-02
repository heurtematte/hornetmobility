<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ taglib uri="http://www.springframework.org/security/tags" prefix="security" %>

<fmt:bundle basename="package">
    <fmt:message key="header.titre.libelle" var="titleLabel"><fmt:param value=""/></fmt:message>
    <fmt:message key='menu.accueil.libelle' var="accueilLabel"><fmt:param value=""/></fmt:message>
    <fmt:message key='menu.aide.libelle' var="aideLabel"><fmt:param value=""/></fmt:message>
    <fmt:message key='menu.contact.libelle' var="contactLabel"><fmt:param value=""/></fmt:message>
    <fmt:message key='header.deconnexion.libelle' var="deconnexionLabel"><fmt:param value=""/></fmt:message>
</fmt:bundle>

    <tiles:insertAttribute name="a11y"/>
<div id="hd" class="yui3-g">
    <div id="header" class="yui3-u-1">
		<div class="yui3-g">
	        <div id="logo" class="yui3-u-1-8">
	            <a title="${accueilLabel} - ${titleLabel}" href="<c:url value="/"/>"><img src="<c:url value="/static-1.2.0/images/logo.png"/>" alt="Hornet"/></a>
	        </div>
			<div class="yui3-u-3-8">
				<h1>${titleLabel}</h1>
			</div>
			<div id="infos" class="yui3-u-1-2"> 
				<ul id="links">
				    <li class="first"><security:authentication property="principal.username" /> (<a href="<c:url value="/j_spring_security_logout"/>">${deconnexionLabel}</a>)</li>
					<li><a href="<c:url value="/dyn/protected/aide.html"/>">${aideLabel}</a></li>
					<li><a href="<c:url value="/dyn/protected/contact/formContact.html"/>">${contactLabel}</a></li>
				</ul>
			</div>
		</div>
	</div>
</div>

