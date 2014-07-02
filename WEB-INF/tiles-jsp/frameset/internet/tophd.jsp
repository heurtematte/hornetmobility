<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<fmt:bundle basename="package">
    <fmt:message key="header.titre.libelle" var="titleLabel"><fmt:param value=""/></fmt:message>
    <fmt:message key="menu.aide.libelle" var="aideLabel"><fmt:param value=""/></fmt:message>
</fmt:bundle>
<div id="header">
     <div class="logo">
        <h1 class="print">
            <a href="http://www.diplomatie.gouv.fr/fr" target="_blank" title="Aller à l'accueil de France Diplomatie (nouvelle fenêtre)"><span class="logo_title">France Diplomatie - Ministère des Affaires étrangères</span></a>
        </h1>
     </div>
     
     <div id="haut_droit">
         <div class="reseaux_sociaux">
             <div class="btn_reseaux_sociaux"><a href="#"
                 class="toggler_reseaux_sociaux">Réseaux sociaux</a></div>
             </div>
         <div class="fermer_reseaux_sociaux">
             <ul id="menu_reseaux_sociaux">
                 <li class="retrouvez_nous">Retrouvez-nous</li>
                 <li class="reseau_social haut_facebook"><a target="_blank"
                     href="http://www.facebook.com/home.php?ref=home#/pages/Paris-France/Ministere-des-Affaires-etrangeres-et-europeennes/75042608259?ref=ts"
                     title="Facebook (nouvelle fenêtre)"><img
                     src="<c:url value="${themeIcoPath}/assets/charte/transp.gif"/>"
                    alt="Facebook (nouvelle fenêtre)" class="trans_lien"/></a></li>
                <li class="reseau_social haut_twitter"><a target="_blank"
                    href="http://www.twitter.com/francediplo" title="Twitter (nouvelle fenêtre)"><img
                    src="<c:url value="${themeIcoPath}/assets/charte/transp.gif"/>"
                    alt="Twitter (nouvelle fenêtre)" class="trans_lien"/></a></li>
                <li class="reseau_social haut_googleplus"><a target="_blank"
                    href="http://google.com/+francediplomatie" title="Google+ (nouvelle fenêtre)"><img
                    src="<c:url value="${themeIcoPath}/assets/charte/transp.gif"/>"
                    alt="Google+ (nouvelle fenêtre)" class="trans_lien"/></a></li>
                <li class="reseau_social haut_youtube"><a target="_blank"
                    href="http://www.youtube.com/francediplotv" title="Youtube (nouvelle fenêtre)"><img
                    src="<c:url value="${themeIcoPath}/assets/charte/transp.gif"/>"
                    alt="YouTube (nouvelle fenêtre)" class="trans_lien"/></a></li>
                <li class="reseau_social haut_dailymotion"><a target="_blank"
                    href="http://www.dailymotion.com/francediplotv" title="Dailymotion (nouvelle fenêtre)"><img
                    src="<c:url value="${themeIcoPath}/assets/charte/transp.gif"/>"
                    alt="Dailymotion (nouvelle fenêtre)" class="trans_lien"/></a></li>
                <li class="reseau_social haut_flickr"><a target="_blank"
                    href="http://www.flickr.com/photos/francediplomatie/" title="Flickr (nouvelle fenêtre)"><img
                    src="<c:url value="${themeIcoPath}/assets/charte/transp.gif"/>"
                    alt="Flickr (nouvelle fenêtre)" class="trans_lien"/></a></li>
                <li class="reseau_social haut_foursquare"><a target="_blank"
                    href="https://fr.foursquare.com/p/france-diplomatie/12618519"
                    title="Foursquare (nouvelle fenêtre)"><img
                    src="<c:url value="${themeIcoPath}/assets/charte/transp.gif"/>"
                    alt="Foursquare (nouvelle fenêtre)" class="trans_lien"/></a></li>
                <li class="reseau_social haut_storify"><a target="_blank"
                    href="http://storify.com/francediplo" title="Storify (nouvelle fenêtre)"><img
                    src="<c:url value="${themeIcoPath}/assets/charte/transp.gif"/>"
                    alt="Storify (nouvelle fenêtre)" class="trans_lien"/></a></li>
                <li class="reseau_social haut_rss"><a target="_blank"
                    href="http://www.diplomatie.gouv.fr/fr/navigation/a-propos/article/les-flux-rss-de-france-diplomatie"
                    title="RSS (nouvelle fenêtre)"><img
                    src="<c:url value="${themeIcoPath}/assets/charte/transp.gif"/>"
                    alt="RSS (nouvelle fenêtre)" class="trans_lien"/></a></li>
                <li class="reseau_social haut_information"><a target="_blank"
                    href="http://www.diplomatie.gouv.fr/fr/navigation/abonnements/article/abonnements"
                    title="Les lettres d'informations (nouvelle fenêtre)"><img
                    src="<c:url value="${themeIcoPath}/assets/charte/transp.gif"/>"
                    alt="Les lettres d'informations (nouvelle fenêtre)" class="trans_lien"/></a></li>
            </ul>
          </div>
    
        <div class="langues">
                <div class="btn_langues"><a target="_blank" href="#" class="toggler_langues">Langues</a></div>
        </div>
        
        <div class="fermer_langues">
            <ul id="menu_langues">
                <li><a target="_blank" href="http://www.diplomatie.gouv.fr/en/"
                    title="English (nouvelle fenêtre)">English</a></li>
                <li><a target="_blank"
                    href="http://www.diplomatie.gouv.fr/fr/deutsch/" title="Deutsch (nouvelle fenêtre)">Deutsch</a></li>
                <li><a target="_blank" href="http://www.diplomatie.gouv.fr/es/"
                    title="Espanol (nouvelle fenêtre)">Español</a></li>
                <li><a target="_blank" href="http://www.diplomatie.gouv.fr/ar/"
                    title="Version arabe (nouvelle fenêtre)">عربي</a></li>
                <li class="no_border"><a target="_blank"
                    href="http://www.ambafrance-cn.org/?lang=zh" title="Version chinoise (nouvelle fenêtre)">中文</a></li>
            </ul>
        </div>
        
    </div>
</div>
<div class="clearfix"></div>