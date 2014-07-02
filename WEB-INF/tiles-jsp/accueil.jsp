<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>

<div id="pageAccueil">
	<h2>Accueil</h2>
	
	<div class="collapsible-section collapsible-section-active">
		<h3 class="collapsible-section-trigger">Qu'est-ce que l'application Hornet Mobility ?</h3>
		<div class="collapsible-section-target">
			<p class="texte">L'application Hornet Mobility a pour objectif de présenter une application basée sur le framework Hornet.</p>
			<p class="texte"><em>A noter :</em></p>
			<ul>
			<li>Hornet facilite la mise en oeuvre du RGAA dans une application.</li>
			<li>Mais l'utilisation de Hornet ne garantit pas qu'une application soit valide RGAA.</li>
			</ul>
		</div>
	</div>
	
	<div class="collapsible-section">
		<h3 class="collapsible-section-trigger">Mise en oeuvre</h3>
		<div class="collapsible-section-target">
			<h4>Cas fonctionnels</h4>
			<p class="texte">Les cas fonctionnels présentés dans l'application sont :</p>
			<ul>
			    <li>Formulaire de recherche </li>
			    <li>Présentation du résultat sous forme de tableau éditable</li>
			    <li>Formulaire étendu</li>
			    <li>Tableau d'ajout/suppression/modification d'items</li>
			</ul>
			
			<p class="texte">Deux thèmes graphiques sont disponibles  :</p>
			<ul>
			    <li><a href="?themeName=diplonet&amp;themeVersion=${application.themeVersion}" >thème Diplonet</a></li>
			    <li><a href="?themeName=defaut&amp;themeVersion=" >thème par défaut</a></li>
			</ul>
			
			<h4>RGAA</h4>
			<p class="texte">Pour plus d'infos sur le RGAA, aller sur le lien <a href="./dyn/protected/accessibilite.html">Accessibilité</a>.</p>
			<p class="texte">Le framework fourni est un élément facilitant la mise en conformité RGAA.</p>
		</div>
	</div>
</div>
