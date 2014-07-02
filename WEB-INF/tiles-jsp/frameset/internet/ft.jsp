<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>

<div id="pied_de_page">
    <hr/>
    
     <div id="pied_content_phone" class="pied_content"> 
    	<ul>
    		<li id="langues_phone" class="menu-trigger-show">
    			<h2 class="yui3-hidden-desktop yui3-hidden-tablet"><span>LANGUES<i class="icon_fleche_noire"></i></span></h2>
    			<div class="menu-target-show yui3-visible-phone">
	    			<ul id="pied_langues" class="pied_langues_lien">
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
    		</li>
    		<li id="reseaux_sociaux" class="menu-trigger-show">
    			<h2 class="yui3-hidden-desktop yui3-hidden-tablet"><span>RÉSEAUX SOCIAUX<i class="icon_fleche_noire"></i></span></h2>
    			<div class="menu-target-show yui3-visible-phone">
	    			<ul id="pied_reseaux" class="pied_resaux_lien">
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
    		</li>
    	</ul>
    </div>

    <div id="pied_content" class="pied_content"> 
    	<ul>
    		<li id="mentions_legales" class="menu-trigger-show">
    			<h2 class="yui3-hidden-desktop"><span>MENTIONS LÉGALES &amp; INFOS PRATIQUES<i class="icon_fleche_noire"></i></span></h2>
    			<div class="menu-target-show yui3-visible-desktop">
	    			<dl id="pied_haut" class="pied_haut_lien">
		                <dd class="lepremier"> <a target="_top" href="http://www.diplomatie.gouv.fr/fr/navigation/nous-ecrire/" title="Nous écrire">Nous écrire</a> </dd>
		                <dd> <a target="_top" href="http://www.diplomatie.gouv.fr/fr/navigation/faq/" title="FAQ">FAQ</a> </dd>
		                <dd> <a target="_top" href="http://www.diplomatie.gouv.fr/fr/navigation/a-propos/" title="A propos">A propos</a> </dd>
		                <dd> <a target="_top" href="http://www.diplomatie.gouv.fr/fr/navigation/mentions-legales/article/mentions-legales" title="Mentions légales">Mentions légales</a> </dd>
		                <dd> <a target="_top" href="http://www.diplomatie.gouv.fr/fr/navigation/abonnements/article/abonnements" title="Lettres d'information">Lettres d'information</a> </dd>
		                <dd> <a target="_top" href="http://www.diplomatie.gouv.fr/fr/spip.php?page=plan" title="Plan du site">Plan du site</a></dd>
		            </dl>
				            
			        <div id="pied_bas" class="pied_bas">
			            Tous droits réservés - Ministère des Affaires étrangères 2013
			        </div> 
					        
			        <div id="interministeriel">
			           <dl class="interministeriel">
			                <dd><a href="http://www.service-public.fr/" title="service-public.fr" target="_top">
			                    <img src="<c:url value="${themeIcoPath}/assets/charte/service_public.jpg"/>" alt="service public"/><span class="hidden"> (nouvelle fenêtre)</span></a></dd>
			                <dd><a href="http://www.legifrance.gouv.fr/" title="legifrance.gouv.fr" target="_top"> 
			                    <img src="<c:url value="${themeIcoPath}/assets/charte/legifrance.jpg"/>" alt="Legifrance"/><span class="hidden"> (nouvelle fenêtre)</span></a></dd>
			                <dd><a href="http://www.gouvernement.fr/" title="gouvernement.fr" target="_top"> 
			                    <img src="<c:url value="${themeIcoPath}/assets/charte/gouvernement.jpg"/>" alt="Gouvernement.fr"/><span class="hidden"> (nouvelle fenêtre)</span></a></dd>
			                <dd><a href="http://www.france.fr/" title="france.fr" target="_top"> 
			                    <img src="<c:url value="${themeIcoPath}/assets/charte/franceFR.jpg"/>" alt="france.fr"/><span class="hidden"> (nouvelle fenêtre)</span></a></dd>
			                <dd><a href="http://www.data.gouv.fr/" title="data.gouv.fr" target="_top"> 
			                    <img src="<c:url value="${themeIcoPath}/assets/charte/datagouv.jpg"/>" alt="data.gouv.fr"/><span class="hidden"> (nouvelle fenêtre)</span></a></dd>
			            </dl>
			        </div>
    			</div>
    		</li>
    	</ul>
    </div>
</div>