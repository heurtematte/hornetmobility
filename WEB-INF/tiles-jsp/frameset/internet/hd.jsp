<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ taglib uri="http://www.springframework.org/security/tags" prefix="security" %>

<fmt:bundle basename="package">
    <fmt:message key='menu.accueil.libelle' var="accueilLabel"><fmt:param value=""/></fmt:message>
    <fmt:message key="header.titre.libelle" var="titleLabel"><fmt:param value=""/></fmt:message>
    <fmt:message key="menu.aide.libelle" var="aideLabel"><fmt:param value=""/></fmt:message>
    <fmt:message key="menu.contact.libelle" var="contactLabel"><fmt:param value=""/></fmt:message>
    <fmt:message key="header.deconnexion.libelle" var="deconnexionLabel"><fmt:param value=""/></fmt:message>
    
    <fmt:message key='menu.accessibilite.libelle' var="accessibiliteLabel"><fmt:param value=""/></fmt:message>
    <fmt:message key='menu.accessibilite.libelleLong' var="accessibiliteTitle"><fmt:param value=""/></fmt:message>
    <fmt:message key='menu.contenu.libelle' var="contenuLabel"><fmt:param value=""/></fmt:message>
    <fmt:message key='menu.contenu.libelleLong' var="contenuTitle"><fmt:param value=""/></fmt:message>
    <fmt:message key='menu.planSite.libelle' var="planSiteLabel"><fmt:param value=""/></fmt:message>
    <fmt:message key='menu.planSite.libelleLong' var="planSiteTitle"><fmt:param value=""/></fmt:message>
    <fmt:message key="menu.aide.libelle" var="aideLabel"><fmt:param value=""/></fmt:message>
    <fmt:message key="menu.contact.libelle" var="contactLabel"><fmt:param value=""/></fmt:message>
</fmt:bundle>

<c:url var="urlAccessibilite" value="/dyn/protected/accessibilite.html" ></c:url>
<c:url var="urlPlanSite" value="/dyn/protected/planSite.html" ></c:url>

<div id="hd">
       
	<div id="infos"> 
    	<ul id="access_liens">
        	<li class="first"><a title="${accessibiliteTitle}" href="<c:out value='${urlAccessibilite}' />">${accessibiliteLabel}</a></li>
        	<li><a title="${planSiteTitle}" href="<c:out value='${urlPlanSite}' />">${planSiteLabel}</a></li>
        	<li class="yui3-hidden-phone"><a title="${contenuTitle}" href="#main">${contenuLabel}</a></li>
        	<li class="yui3-hidden-phone"><a href="<c:url value="/dyn/protected/aide.html"/>">${aideLabel}</a></li>
            <li class="yui3-hidden-phone"><a href="<c:url value="/dyn/protected/contact/formContact.html"/>">${contactLabel}</a></li>
         </ul>
    </div>
    
    <div id="bandeau_appli">
		<div id="logo_appli">
	        <a title="${accueilLabel} - ${titleLabel}" href="<c:url value="/"/>">
	        	<img src="<c:url value="/static-1.2.0/images/logo_grd.png "/>" alt="${titleLabel}" />
	        	<h1>${titleLabel}</h1>
	        </a>
	    </div>
    </div>    
</div>
 