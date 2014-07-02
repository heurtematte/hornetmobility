<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>

<fmt:bundle basename="package">
    <fmt:message key='menu.accessibilite.libelle' var="accessibiliteLabel"><fmt:param value=""/></fmt:message>
    <fmt:message key='menu.accessibilite.libelleLong' var="accessibiliteTitle"><fmt:param value=""/></fmt:message>
    <fmt:message key='menu.contenu.libelle' var="contenuLabel"><fmt:param value=""/></fmt:message>
    <fmt:message key='menu.contenu.libelleLong' var="contenuTitle"><fmt:param value=""/></fmt:message>
    <fmt:message key='menu.planSite.libelle' var="planSiteLabel"><fmt:param value=""/></fmt:message>
    <fmt:message key='menu.planSite.libelleLong' var="planSiteTitle"><fmt:param value=""/></fmt:message>
    <fmt:message key="menu.aide.libelle" var="aideLabel"><fmt:param value=""/></fmt:message>
    <fmt:message key="menu.contact.libelle" var="contactLabel"><fmt:param value=""/></fmt:message>
    <fmt:message key="header.deconnexion.libelle" var="deconnexionLabel"><fmt:param value=""/></fmt:message>
</fmt:bundle>
<c:url var="urlAccessibilite" value="/dyn/protected/accessibilite.html" ></c:url>
<c:url var="urlPlanSite" value="/dyn/protected/planSite.html" ></c:url>

<div id="menu_access" class="yui3-g">
    <ul id="access_liens" class="yui3-u-1">
        <li class="first"><a title="${accessibiliteTitle}" href="<c:out value='${urlAccessibilite}' />">${accessibiliteLabel}</a></li>
        <li><a title="${planSiteTitle}" href="<c:out value='${urlPlanSite}' />">${planSiteLabel}</a></li>
        <li><a title="${contenuTitle}" href="#main">${contenuLabel}</a></li>
        <li class="mobile"><a href="<c:url value="/j_spring_security_logout"/>">${deconnexionLabel}</a></li>
        <li class="mobile"><a href="<c:url value="/dyn/protected/aide.html"/>">${aideLabel}</a></li>
        <li class="mobile"><a href="<c:url value="/dyn/protected/contact/formContact.html"/>">${contactLabel}</a></li>
    </ul>
</div>