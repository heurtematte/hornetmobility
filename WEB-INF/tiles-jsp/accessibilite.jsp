<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="/struts-tags" prefix="s"%>

<h2><s:text name="pagescommunes.accessibilite.titre" /></h2>

<div class="yui3-g-r">
    <div class="yui3-u-13-24">
        <p class="texte">Cette application Web a été développée en respectant les critères du <abbr title="Référentiel Général d'Accessibilité pour les Administrations">RGAA</abbr> (<a href="#attestation">Attestation de conformité au RGAA</a>) et ainsi se conformer à la Loi numéro 2005-102 du 11 février 2005 pour l'égalité des droits et des chances, la participation et la citoyenneté des personnes handicapées ainsi qu'au Décret numéro 2009-546 du 14 mai 2009 pris en application de l'article 47 de la loi numéro 2005-102 du 11 février 2005.</p>
		
		<a href="#" id="definition" name="definition"></a>
		<h3>Qu'est-ce-que l'accessibilité numérique ? </h3>
		<p class="texte">Selon <span lang="en">Tim Bernes-Lee</span> (directeur du <abbr lang="en" title="World Wide Web Consortium">W3C</abbr> et inventeur du <span lang="en">World Wide Web</span>), l'accessibilité consiste à :</p>
		
		<blockquote>Mettre le web et ses services à la disposition de tous les individus, quels que soient leur matériel ou logiciel, leur infrastructure réseau, leur langue maternelle, leur culture, leur localisation géographique ou leurs aptitudes physiques ou mentales.</blockquote>
        <p class="texte">Un site est accessible lorsqu'il est possible pour n'importe
        quelle personne d'y accéder de façon équivalente, quel que soit le
        navigateur utilisé, le périphérique d'affichage, l'aide technique
        utilisée, le handicap éventuel de l'internaute, ainsi que son niveau
        intellectuel et ses capacités à appréhender l'informatique.</p>
 		
		<a href="#" id="conformite" name="conformite"></a>
		<h3>Dispositifs facilitant l'accessibilité</h3>
		
		<h4>Respect des standards </h4>
		<p class="texte">Des efforts ont été réalisés pour que le code <abbr lang="en" title="eXtensible HyperText Markup Language">XHTML</abbr> 
		soit conforme à la spécification <abbr lang="en" title="eXtensible HyperText Markup Language">XHTML</abbr> 1.0.
		Le code, testé à l'aide du validateur <abbr lang="en" title="HyperText Markup Language">HTML</abbr> du <abbr lang="en" title="World Wide Web Consortium">W3C</abbr>, ne recèle que  
		<a href="#a9-4">quelques erreurs</a>.
		<br/>Si malgré nos efforts, d'autres erreurs étaient détectées suite à des validations, nous vous remercions de nous les signaler.</p>
		
		<h4>Structure et présentation </h4>
		<p class="texte">La mise en forme de l'application Web est séparée de son contenu grâce à l'utilisation des feuilles de style. L'utilisation des propriétés de positionnement <abbr lang="en" title="Cascading Style Sheets">CSS</abbr>, en séparant totalement présentation et contenu, permet aux documents de conserver hors <abbr lang="en" title="Cascading Style Sheets">CSS</abbr> un ordre cohérent : titre, menus, contenu...</p>
		
		<h4>Aides à la navigation</h4>
		
		<p class="texte">La navigation est compatible avec les équipements particuliers
		des personnes en situation de handicap, notamment les logiciels de
		synthèse vocale, de plage braille et de grossissement de caractère.</p>
		<p class="texte">Cette application Web propose de nombreuses fonctionnalités permettant de
		naviguer facilement :</p>
		<ul>
		    <li>ergonomie et navigation optimisées,</li>
		    <li>accessibilité de contenus sans JavaScript.</li>
		</ul>
		
		<h5>Liens d'accès rapide</h5>
		
		<p class="texte">Des liens d'accès direct permettent d'accéder rapidement à une partie recherchée sans avoir à parcourir des informations non souhaitées.</p>
		<p class="texte">Un lien permet d'aller directement au contenu.</p>
		<p class="texte">Au début du contenu de chaque page, on trouve :</p>
		<ul> 
			<li>lien vers la page donnant la politique d'accessibilité (cette page)</li>
            <li>lien vers le plan de l'application Web</li>
            <li>lien vers le contenu de l'application Web</li>
		</ul>
		
		<h5>Navigation par tabulation (exceptée pour le <a href="#menunav">menu de navigation</a>, les <a href="#onglet">onglets</a> et les composants <a href="#arbo">"Arborescence"</a>)</h5>
		<p class="texte">On peut naviguer d'un lien à l'autre à l'aide de la touche de tabulation (Appuyez sur <kbd>Tab</kbd> et répétez jusqu'à sélectionner le lien désiré, validez par <kbd>Entrée</kbd>).</p>
		
		<a href="#" id="menunav" name="menunav"></a>
		<h5>Menu de navigation</h5>
		<p class="texte">Le menu de navigation est utilisable au clavier selon les modalités suivantes :</p>
		<ul>
		    <li>Se déplacer parmi les items de même niveau : <kbd>flèche haut</kbd> et <kbd>flèche bas</kbd></li>
		    <li>Descendre d’un niveau : <kbd>flèche droite</kbd></li>
		    <li>Remonter d’un niveau : <kbd>flèche gauche</kbd></li>
		    <li>La touche <kbd>Tab</kbd> fait sortir du menu</li>
		</ul>

        <a href="#" id="onglet" name="onglet"></a>
        <h5>Onglets</h5>
        <p class="texte">Les onglets sont utilisables au clavier selon les modalités suivantes :</p>
        <ul>
            <li>Se déplacer parmi les onglets : <kbd>flèche gauche</kbd> et <kbd>flèche droite</kbd></li>
            <li>La touche <kbd>Tab</kbd> fait sortir de l'ensemble d'onglets</li>
        </ul>
		
        <a href="#" id="arbo" name="arbo"></a>
        <h5>Composant "Arborescence"</h5>
        <p class="texte">Ce composant est utilisable au clavier selon les modalités suivantes :</p>
        <ul>
            <li>Se déplacer parmi les items de même niveau : <kbd>flèche haut</kbd> et <kbd>flèche bas</kbd></li>
            <li>Déplier un niveau : <kbd>flèche droite</kbd></li>
            <li>Replier d’un niveau : <kbd>flèche gauche</kbd></li>
            <li>La touche <kbd>Tab</kbd> fait sortir du composant</li>
        </ul>		
		
		<h4>Ajustement de la taille du texte/de la page</h4>
		<p class="texte">Afin de permettre aux utilisateurs de modifier la présentation de l'application Web, et spécialement la taille des caractères affichés, la mise en page repose sur l'emploi d'unités relatives. Ainsi, la taille du texte/de la page peut être agrandie :</p>
		<p class="texte">
		Avec la majorité des navigateurs : <kbd>Ctrl</kbd> + <kbd>molette de la souris</kbd><br/>
		ou<br/><kbd>Ctrl+</kbd> pour augmenter la taille de la police et <kbd>Ctrl-</kbd> pour la diminuer.</p>
		<p class="texte">Sur les versions antérieures à <span lang="en">Internet explorer</span> 7 : dans la barre de menu en haut du navigateur, aller sur <b>Affichage</b> &gt; <b>Taille du texte</b> et choisir la taille qui vous convient.</p>
		
		<h4>Charte graphique</h4>
		<p class="texte">La charte graphique a été définie et réalisée en prenant en
		compte les paramètres de l'accessibilité. Les problèmes de contrastes et
		de superpositions de couleurs ont été pensés pour que les malvoyants
		n'aient pas de difficultés de lecture.</p>
		
		<h4>Ajouter cette application Web à vos "favoris"</h4>
		<p class="texte">Dans la barre de menu en haut du navigateur :</p>
		<ul>
		<li>Sous <span lang="en">Internet explorer</span> : <em>Favoris</em> &gt; <em>Ajouter aux favoris</em></li>
		<li>Sous <span lang="en">Mozilla Firefox</span> <em>: Marque-pages </em>&gt;<em> Marquer cette page</em></li>
		
		<li>Sous Safari<em> : Signets </em>&gt;<em> Ajouter aux signets</em></li>
		<li>Sous Opéra<em> : Signets </em>&gt;<em> Signet vers la page</em></li>
		</ul>
		
		<a href="#" id="attestation" name="attestation"></a>
		<h3>Attestation de conformité au RGAA</h3>
		
		<h4>Adresse de l'application Web</h4>
		<p class="texte">http://www.url-de-applicationweb</p>
		
		<h4>Date de réalisation</h4>
		<p class="texte">Mai 2013</p>
		
		<h3>Version du RGAA de référence</h3>
		<p class="texte"><a href="http://references.modernisation.gouv.fr/rgaa-accessibilite">RGAA V2.2.1</a> du 16/11/2009 (Référentiel Général d'Accessibilité pour les Administrations).</p>
		
		<h4>Déclarant</h4>
		<p class="texte">Ministère des Affaires Etrangères.</p>
		
		<h4>Technologies utilisées</h4>
		<p class="texte"><abbr lang="en" title="eXtensible HyperText Markup Language">XHTML</abbr> 1.0 transitional, <abbr lang="en" title="Cascading Style Sheets">CSS</abbr> 2.0, JavaScript, Yahoo! <span lang="en">User Interface Library</span> (YUI) bibliothèque logicielle écrite en JavaScript</p>
		
		<h4>Liste des agents utilisateurs et technologies d'assistance utilisées pour vérifier l'accessibilité des contenus</h4>
		<ul>
			<li>Contraste des couleurs (<span lang="en">Color Contrast Analyser</span>)</li>
			<li><span lang="en">Firefox</span> 17.0 <abbr lang="en" title="Extended Support Release">ESR</abbr>, IE 8, Chrome 25, Safari</li>
			<li>Navigateur textuel Lynx</li>
			<li>Revue d'écran <a href="http://www.nvda-fr.org/" target="_blank" title="NVDA (nouvelle fenêtre)">NVDA</a> 2012.3.1</li>
			<li>Extension <span lang="en">Firefox Web developer, Opquast Report</span></li>
			<li><span lang="en">Web Accessibility Toolbar For <abbr title="Internet Explorer">IE</abbr></span></li>
		</ul>
		
		<h4>Liste des pages ayant fait l’objet de la vérification de conformité</h4>
		<p class="texte">Toutes les pages du site font l'objet de la déclaration de conformité.</p>
		
		<h4>Résultats des tests</h4>
		<p class="texte">Le niveau d'accessibilité visé est AA.</p>
		<p class="texte">Ce niveau est partiellement atteint (<a href="#dero">points dérogatoires</a>).</p>

		<h5>Pages déclarées conformes</h5>
		<ul>
			<li>Connexion</li>
			<li>Accueil</li>
			<li>Politique d'accessibilité</li>
			<li>Plan du site</li>
		</ul>

		<h5>Pages faisant l'objet d'une déclaration de conformité partielle</h5>
        <ul>
            <li>Recherche de partenaires</li>
            <li>Edition d'un partenaire</li>
            <li>Liste des secteurs</li>
        </ul>

        <a href="#" id="dero" name="dero"></a>
		<h4>Points dérogatoires</h4>
        <p class="texte">Les points mentionnés ci-dessous sont liés à l'utilisation de la bibliothèque Yahoo UI.</p>
        <p class="texte">Le MAE n’est pas propriétaire de ces contenus et ne peut s'engager sur leur accessibilité. Cependant, le MAE veillera à mettre à jour la version de cette bibliothèque dès que celle-ci améliorera sa prise en compte de l'accessibilité.</p>

        <h5>Principe 1 : perceptibles</h5>
        <h6>Critère 1.3.1 : information et relations</h6>      
        <ul>
            <li>[Test Tableau] 03 : Présence d'une relation entre les en-têtes (th) et les cellules (td) qui s'y rattachent dans un tableau de données complexe grâce aux attributs id et headers.
                <ul>
                    <li>Assistant de saisie de date (calendrier).</li>
                </ul>
            </li>
            <li>[Test Tableau] 07 : Présence d'un titre pour les tableaux de données.
                <ul>
                    <li>Assistant de saisie de date (calendrier).</li>
                </ul>
            </li>
            <li>[Test Tableau] 08 : Présence d'un résumé pour les tableaux de données.
                <ul>
                    <li>Assistant de saisie de date (calendrier).</li>
                </ul>
            </li>
        </ul>        
    
        <h5>Principe 2 : utilisable</h5>
        <h6>Critère 2.4.4 : Fonction du lien (selon le contexte)</h6>        
        <ul>
            <li>[Test Navigation] 13 : Possibilité d'identifier la destination ou l'action des liens et des boutons
                <ul>
                    <li>Tri des tableaux
                        <p class="texte">Le tri est possible sur certaines colonnes. Ce tri se fait en cliquant sur le lien de l'en-tête de colonne.
                        <br/>le libellé du lien n'indique pas à quelle colonne s'applique le tri.</p>
                    </li>
                    <li>Assistant de saisie de date (calendrier)
                        <p class="texte">L'intitulé du lien permettant le choix d'un mois et/ou d'une année n'est pas explicite, par exemple "Septembre 2012".</p>
                    </li>
                </ul>
            </li>
        </ul>      

		<a href="#" id="a9-4" name="a9-4"></a>
		<h5>Principe 4 : robuste</h5>
        <h6>Critère 4.1.1 : analyse syntaxique</h6>
        <ul>
            <li>[Test Standards] 04 : Validité du code HTML / XHTML au regard de la DTD déclarée
                <p class="texte">Les pages suivantes sont concernées :</p>
		        <ul>
		            <li>Recherche de partenaires</li>
		            <li>Edition d'un partenaire</li>
		            <li>Liste des secteurs</li>
		        </ul> 
            </li>
        </ul>    
       		
		<h4>Détection d’éventuels défauts d’accessibilité</h4>
		<p class="texte">Si vous rencontrez un défaut d’accessibilité non signalé dans cette présente attestation, n’hésitez pas à contacter le déclarant.</p>
    </div>
</div>
