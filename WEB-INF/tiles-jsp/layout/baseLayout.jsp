<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/xml" prefix="x"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
        
<%-- Switch theme --%>
<c:if test="${!empty param.themeName}">
    <c:set var="themeName" scope="session">${param.themeName}</c:set>
    <c:set var="themeVersion" scope="session"></c:set>
</c:if>
<c:if test="${!empty param.themeVersion}">
    <c:set var="themeVersion" scope="session">${param.themeVersion}</c:set>
</c:if>

<%-- theme --%>
<c:if test="${empty themeName}">
    <c:set var="themeName" scope="session" value="${application.themeName}"/>
    <c:set var="themeVersion" scope="session" value="${application.themeVersion}"/>
</c:if>
<c:choose>
    <c:when test="${!empty themeName and empty themeVersion}">
        <c:set var="themeClass" value="hornet-skin-${themeName}"/>
        <c:set var="themeComponent" value="hornet-skin-${themeName}"/>
    </c:when>
    <c:when test="${!empty themeName and !empty themeVersion}">
        <c:set var="themeClass" value="hornet-skin-${themeName}"/>
        <c:set var="themeComponent" value="hornet-skin-${themeName}-${themeVersion}"/>
    </c:when>
    <c:otherwise>
        <c:set var="themeClass" value="hornet-skin-defaut"/>
        <c:set var="themeComponent" value="hornet-skin-defaut"/>
    </c:otherwise>
</c:choose>

<%-- Recuperation id FilAriane --%>
<tiles:importAttribute name="filArianeKey" toName="idFilAriane"/>
<tiles:importAttribute name="pageErreur" ignore="true" />

<fmt:bundle basename="package">
    <fmt:message key="header.titre.libelleLong" var="titleLabel"><fmt:param value=""/></fmt:message>
    <fmt:message key="erreur.libelle" var="errorTitleLabel"><fmt:param value=""/></fmt:message>
    <fmt:message key="${idFilAriane}.libelleLong" var="pageTitleLabel"><fmt:param value=""/></fmt:message>

    <fmt:message key='ajax.authentification.confirm.message' var="ajaxAuthentificationMessage"><fmt:param value=""/></fmt:message>
</fmt:bundle>


<%-- initialisation des chemins vers les themes --%>
<c:if test="${!empty application.fwkRoot}">
	<c:set var="themeRoot" scope="application" value="${application.fwkRoot}/../themes"/>
	<c:set var="themeDefautPath" scope="application" value="${application.themeRoot}/hornet-skin-defaut"/>
</c:if>
<c:if test="${!empty themeComponent and !empty application.themeRoot}">
	<c:set var="themeIcoPath" scope="application" value="${application.themeRoot}/${themeComponent}" />
</c:if>



<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" dir="ltr" lang="fr">
    <head>
		
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        <title><c:if test="${pageErreur}">${errorTitleLabel} - </c:if><c:if test="${!fn:contains(pageTitleLabel,'???')}">${pageTitleLabel} - </c:if>${titleLabel}</title>
    
    
		<%-- chargement des listes de fichiers CSS --%>
		<tiles:useAttribute name="yuiCssItems" scope="request" classname="java.util.List" />
		<tiles:useAttribute name="appCssItems" scope="request" classname="java.util.List" />
		<tiles:useAttribute name="rwdCssItems" scope="request" classname="java.util.List" />
		<tiles:useAttribute name="rwdCssItemsExt" scope="request" classname="java.util.List" />

     	<c:forEach items="${yuiCssItems}" var="item">
        	<link rel="stylesheet" type="text/css" href="<c:url value='${application.yui3Root}${item}' />" />
        </c:forEach>
    	<c:forEach items="${appCssItems}" var="item">
       		<link rel="stylesheet" type="text/css" href="<c:url value='${item}' />" />
        </c:forEach>
         	
	    <c:if test="${!empty application.themeDefautPath}">
	        <link rel="stylesheet" type="text/css" href="<c:url value='${application.themeDefautPath}/base-min.css' />" />
	        </c:if>
	    <c:if test="${!empty themeComponent and !empty application.themeRoot}">
	        <link rel="stylesheet" type="text/css" href="<c:url value='${application.themeRoot}/${themeComponent}/theme-min.css' />" />
	    </c:if>
        
        <c:forEach items="${rwdCssItems}" var="item">
    	    <link rel="stylesheet" type="text/css" href="<c:url value='${item}' />" />
	    </c:forEach>
        <c:forEach items="${rwdCssItemsExt}" var="item">
    	    <link rel="stylesheet" type="text/css" href="<c:url value='${item}' />" />
	    </c:forEach>
               
        <script type="text/javascript" src="<c:url value='${application.yui3Root}/yui/yui-min.js' />" ></script>
        <script type="text/javascript" src="<c:url value='${application.fwkRoot}/hornetconfig/hornetconfig-min.js' />" ></script>
        
        <tiles:insertAttribute name="hornetConfig" ignore="true"/>
        <script type="text/javascript">
        //<![CDATA[
        	//Charge les styles css des composants
            hornet().use('${themeComponent}');
            
            // Ajout du style css pour masquer la page le temps du chargement
            var elm = document.documentElement, 
            className = "hornet-page-loading",
            regexp = new RegExp("(^|\\s)" + className + "(\\s|$)", "g");
            
            elm.className += " " + className;
            function onContentReady() {
                elm.className = elm.className.replace(regexp, "$2");
            }
            
            //Charge les styles css des composants
            hornet().use('${themeComponent}');
            
            //Ajoute les styles css pour masquer les composants le temps du chargement
            hornet().use('node', function(Y){
                var doc = Y.one(Y.config.doc.documentElement);
                if (doc) {
                    doc.addClass("hornet-loading-menu");
                    doc.addClass("hornet-loading-table");
                    doc.addClass("hornet-loading-tabview");
                }
            });
        //]]>
        </script>
        
        <noscript>
	        <style type="text/css">
	        	#cssmenu:hover>ul {
					display: block;
					z-index: 2;
					position: relative;
				}
				.menu-trigger-show:hover>.menu-target-show {
					display: block;
				}
				
				/* sections toujours affichées */
				div.collapsible-section div {
					display: block;
				}
	        </style>
        </noscript>
        
    </head>
    <body <c:if test="${!empty themeClass}">class="${themeClass}"</c:if> onload="onContentReady()">
    <div id="site">
    
        <tiles:insertAttribute name="topheader" ignore="true"/>
    
        <tiles:insertAttribute name="header"/>
        
        <tiles:insertAttribute name="menu" ignore="true" />
        
        <div id="bd" class="">
            <tiles:importAttribute name="filariane" />
            <c:if test="${! empty filariane}">
            <div id="path" class="yui3-u-1">
                <tiles:insertAttribute name="filariane" ignore="true">
                    <tiles:putAttribute name="idFilAriane" value="${idFilAriane}" />
                </tiles:insertAttribute>
            </div>
            </c:if>
            <div id="main" class="yui3-u-1">
                <tiles:insertAttribute name="content"/>
            </div>
        </div>

        <tiles:insertAttribute name="footer"/>
    </div>

    <script type="text/javascript">
    //<![CDATA[
        hornet({fetchCSS: false}).use('hornet_base', 'hornet-ajax', 'hornet-notification', function(Y){
                // Creation du menu horizontal
                initMenu(Y, "#cssmenu");
                initMenu(Y, "#mentions_legales");
                initMenu(Y, "#reseaux_sociaux");
                initMenu(Y, "#langues_phone");
                initCollapsibleSections(Y);
                                
                // Afficher les elements etant utilises uniquement lorsque JavaScript est active
                showJSElements(Y);
                
                // Demande de confirmation avant redirection vers la page d'authentification (requetes AJAX)
                Y.hornet.Ajax.checkAuthAJAXRequest("${ajaxAuthentificationMessage}");
                
	            // Gestion du focus sur les elements en erreur associes aux messages presents dans les zones d'erreur
	            Y.hornet.Notification.addFocusForAnchorLinks('#main', '.errorBox a', '#', '_anchor');
        });
    //]]>
    </script>
    </body>
</html>