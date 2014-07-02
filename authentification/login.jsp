<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ page contentType="text/html; charset=utf-8"%>
<fmt:bundle
    basename="package"
    prefix="login.">
    <fmt:message key="echec.authentification.message" var="echecAuthentification"><fmt:param value=""/></fmt:message>
    <fmt:message key="titre.libelle" var="titreLabel"><fmt:param value=""/></fmt:message>
    <fmt:message key="authentification.application.libelle" var="applicationLabel"><fmt:param value=""/></fmt:message>
    <fmt:message key="authentification.soustitre.libelle" var="soustitreLabel"><fmt:param value=""/></fmt:message>
    <fmt:message key="authentification.username.libelle" var="usernameLabel"><fmt:param value=""/></fmt:message>
    <fmt:message key="authentification.password.libelle" var="passwordLabel"><fmt:param value=""/></fmt:message>
    <fmt:message key="authentification.warn.libelle" var="warnLabel"><fmt:param value=""/></fmt:message>
    <fmt:message key="authentification.submit.libelle" var="submitLabel"><fmt:param value=""/></fmt:message>
    <fmt:message key="authentification.reset.libelle" var="resetLabel"><fmt:param value=""/></fmt:message>
    <fmt:message key="sidebar.info.libelle" var="infoLabel"><fmt:param value=""/></fmt:message>
</fmt:bundle>

<%-- recuperation de l'attribut messageErreur depuis la session --%>
<c:set var="messageErreur" value="${sessionScope.messageErreur}" scope="page"/>
<%
  session.removeAttribute("messageErreur");
%>
<c:if test="${not empty param.erreur}">
<c:set var="messageErreur" scope="page">${echecAuthentification}</c:set>
</c:if>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" 
	"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="fr">
<head>
	<title>${titreLabel}</title>
	
	<link rel="stylesheet" type="text/css" href="<c:url value="/static-1.2.0/auth/css/auth.css"/>" />
	<!--[if gte IE 6]><link rel="stylesheet" type="text/css" href="<c:url value="/static-1.2.0/auth/css/ie_auth.css"/>" /><![endif]-->
</head>
<body id="auth">
<div id="site">
	<div id="header">
		<h1 id="app-name">${applicationLabel}</h1>
	</div>

	<div id="content">
		<form id="fm1" class="fm-v clearfix" action="<c:url value="/j_spring_security_check" />" method="post">
		
		<c:if test="${not empty messageErreur}">
			<div class="errors" id="status"><img src="<c:url value='/static-1.2.0/auth/images/error.gif'/>" alt="Erreur : " /><span><c:out value="${messageErreur}"/></span></div>
		</c:if>
		
			<!-- Bloc d'authentification -->
			<div id="login" class="box">
				<h2>${soustitreLabel}</h2>
				<div class="row">
					<label for="username">${usernameLabel}</label>
					<input type="text" size="25" value="" accesskey="i" tabindex="1" class="required" name="j_username" id="username" />
				</div>
				<div class="row">
					<label for="password">${passwordLabel}</label>
					<input type="password" size="25" value="" accesskey="m" tabindex="2" class="required" name="j_password" id="password" />
				</div>
				<div class="row check">
					<input type="checkbox" accesskey="p" tabindex="3" value="true" name="warn" id="warn" />
					<label for="warn">${warnLabel}</label>
				</div>
				<div class="row btn-row">
					<input type="submit" tabindex="4" value="${submitLabel}" accesskey="l" name="submit" class="btn-submit" />
					<input type="reset" tabindex="5" value="${resetLabel}" accesskey="c" name="reset" class="btn-reset" />
				</div>
			</div>
			
			<div id="sidebar">
				<p>${infoLabel}</p>
				<div id="list-languages">
					<h3>Languages:</h3>
					<ul><li class="first"><a href="#?locale=en">English</a></li>
						<li><a href="#?locale=es">Spanish</a></li>
						<li><a href="#?locale=fr">French</a></li>
						<li><a href="#?locale=ru">Russian</a></li>
						<li><a href="#?locale=nl">Nederlands</a></li>
						<li><a href="#?locale=sv">Svenskt</a></li>
						<li><a href="#?locale=it">Italiano</a></li>
						<li><a href="#?locale=ur">Urdu</a></li>
						<li><a href="#?locale=zh_CN">Chinese (Simplified)</a></li>
						<li><a href="#?locale=de">Deutsch</a></li>
						<li><a href="#?locale=ja">Japanese</a></li>
						<li><a href="#?locale=hr">Croatian</a></li>
						<li><a href="#?locale=cs">Czech</a></li>
						<li class="last"><a href="#?locale=pl">Polish</a></li>
					</ul>
				</div>
			</div>
		</form>
	</div>
	<div id="footer">
		<div>
			<p>&nbsp;</p>
		</div>
	</div>
</div>
</body>
</html>