<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="/struts-tags" prefix="s"%>

<s:url var="icoTooltipUrl" value="%{#application.themeDefautPath}/assets/ico_tooltip.png"/>

<div class="readonly">
	
	<!-- TYPE -->
	<div class="collapsible-section collapsible-section-active">
		<h4 class="collapsible-section-trigger"><s:text name="GESTION_PARTENAIRE.type.titre"/></h4>
		
	    <div class="yui3-g-r collapsible-section-target">
	        <div class="yui3-u-1-2">
	            <div class="yui3-g-r">
	                <div class="yui3-u-1-2">
	                    <s:label for="partenaireEnCours.client" id="clientLabel" name="getText('GESTION_PARTENAIRE.typepartenaire')"/>
	                </div>
	                <div class="yui3-u">
	                    <s:if test="partenaireEnCours.isClient">
	                        <s:textfield id="partenaireEnCours.client" value="%{getText('GESTION_PARTENAIRE.type.client')}" readonly="true"/>
	                    </s:if><s:else>
	                        <s:textfield id="partenaireEnCours.client" value="%{getText('GESTION_PARTENAIRE.type.fournisseur')}" readonly="true"/>
	                    </s:else>
	                </div>
	            </div>
	        </div>
	        
	        <div class="yui3-u-1-2">
	            <div class="yui3-g-r">
	                <div class="yui3-u-1-2">
	                    <s:label for="partenaireEnCours.vip" id="vipLabel" value="%{getText('GESTION_PARTENAIRE.recherche.vip.lbl')}"><s:param name="escape" value="false" /></s:label>
	                </div>
	                <div class="yui3-u">
	                    <s:if test="partenaireEnCours.isVIP">
	                        <s:textfield id="partenaireEnCours.vip" size="3" name="partenaireEnCours.isVIP" value="oui" readonly="true"/>
	                    </s:if><s:else>
	                        <s:textfield id="partenaireEnCours.vip" size="3" name="partenaireEnCours.isVIP" value="non" readonly="true"/>
	                    </s:else>
	                </div>
	            </div>
	        </div>
	    </div>
	</div>
	
	<!-- CIVILITE -->
	<div class="collapsible-section">
		<h4 class="collapsible-section-trigger"><s:text name="GESTION_PARTENAIRE.civilite.titre"/></h4>
		<div class="collapsible-section-target">
		    <div class="yui3-g-r">
		        <div class="yui3-u-1-4">
		            <s:label for="partenaireEnCours.civilite" id="civiliteLabel" name="getText('GESTION_PARTENAIRE.civilite')"/>
		        </div>
		        <div class="yui3-u">
		            <s:textfield id="partenaireEnCours.civilite" name="partenaireEnCours.civilite.libelle" readonly="true"/>
		        </div>
		    </div>
		    
		    <div class="yui3-g-r">
		        <div class="yui3-u-1-2">
		            <div class="yui3-g-r">
		                <div class="yui3-u-1-2">
		                    <s:label for="partenaireEnCours.nomUsage" id="nomUsageLabel" name="getText('GESTION_PARTENAIRE.civilite.nom')"/>
		                </div>
		                <div class="yui3-u">
		                    <s:textfield id="partenaireEnCours.nomUsage" name="partenaireEnCours.nom" size="20" readonly="true"/>
		                </div>
		            </div>
		        </div>
		        
		        <div class="yui3-u-1-2">
		            <div class="yui3-g-r">
		                <div class="yui3-u-1-2">
		                    <s:label for="partenaireEnCours.nomLocal" id="nomLocalLabel" name="getText('GESTION_PARTENAIRE.civilite.nomlocal')"/>
		                </div>
		                <div class="yui3-u">
		                    <s:textfield id="partenaireEnCours.nomLocal" name="partenaireEnCours.nomLocal" size="20" readonly="true"/>
		                </div>
		            </div>
		        </div>
		    </div>
		
		    <div class="yui3-g-r">
		        <div class="yui3-u-1-2">
		            <div class="yui3-g-r">
		                <div class="yui3-u-1-2">
		                    <s:label for="partenaireEnCours.prenomUsage" id="prenomUsageLabel" name="getText('GESTION_PARTENAIRE.civilite.prenom')"/>
		                </div>
		                <div class="yui3-u">
		                    <s:textfield id="partenaireEnCours.prenomUsage" name="partenaireEnCours.prenom" size="20" readonly="true"/>
		                </div>
		            </div>
		        </div>
		        
		        <div class="yui3-u-1-2">
		            <div class="yui3-g-r">
		                <div class="yui3-u-1-2">
		                    <s:label for="partenaireEnCours.prenomLocal" id="prenomLocalLabel" name="getText('GESTION_PARTENAIRE.civilite.prenomlocal')"/>
		                </div>
		                <div class="yui3-u">
		                    <s:textfield id="partenaireEnCours.prenomLocal" name="partenaireEnCours.prenomLocal" size="20" readonly="true" />
		                </div>
		            </div>
		        </div>
		    </div>
		    
		    <div class="yui3-g-r">
		        <div class="yui3-u-1-4">
		            <s:label for="partenaireEnCours.nationalite" id="nationaliteLabel" name="getText('GESTION_PARTENAIRE.civilite.nationalite')"/>
		        </div>
		        <div class="yui3-u">
		            <s:textfield id="partenaireEnCours.nationalite" name="partenaireEnCours.nationalite.nationalite" readonly="true"/>
		        </div>
		    </div>
	    </div>
	</div>
	
	<div class="collapsible-section">
		<h4 class="collapsible-section-trigger"><s:text name="GESTION_PARTENAIRE.coordpro.titre"/></h4>
		<div class="collapsible-section-target">
		    <div class="yui3-g-r">
		        <div class="yui3-u-1-4">
		            <s:label for="partenaireEnCours.organisme" id="organismeLabel" name="getText('GESTION_PARTENAIRE.coordpro.organisme')"/>
		        </div>
		        <div class="yui3-u">
		            <s:textfield id="partenaireEnCours.organisme" size="40" name="partenaireEnCours.organisme" readonly="true"/>
		        </div>
		    </div>
		    
		    <div class="yui3-g-r">
		        <div class="yui3-u-1-4">
		            <s:label for="partenaireEnCours.fonction" id="fonctionLabel" name="getText('GESTION_PARTENAIRE.coordpro.fonction')"/>
		        </div>
		        <div class="yui3-u">
		            <s:textfield id="partenaireEnCours.fonction" size="40" name="partenaireEnCours.fonction" readonly="true"/>
		        </div>
		    </div>
		    
		    <div class="yui3-g-r">
		        <div class="yui3-u-1-4">
		            <s:label for="partenaireEnCours.proTelFixe" id="proTelFixeLabel" name="getText('GESTION_PARTENAIRE.coordpro.telfixe')"/>
		        </div>
		        <div class="yui3-u">
		            <s:textfield id="partenaireEnCours.proTelFixe" size="10" name="partenaireEnCours.proTelFixe" readonly="true"/>
		        </div>
		    </div>
		    
		    <div class="yui3-g-r">
		        <div class="yui3-u-1-4">
		            <s:label for="partenaireEnCours.proTelPort" id="proTelPortLabel" name="getText('GESTION_PARTENAIRE.coordpro.telport')"/>
		        </div>
		        <div class="yui3-u">
		            <s:textfield id="partenaireEnCours.proTelPort" size="10" name="partenaireEnCours.proTelPort" readonly="true"/>
		        </div>
		    </div>
		    
		    <div class="yui3-g-r">
		        <div class="yui3-u-1-4">
		            <s:label for="partenaireEnCours.proCourriel" id="proCourrielLabel" name="getText('GESTION_PARTENAIRE.coordpro.courriel')"
		                tooltip="%{getText('GESTION_PARTENAIRE.coordpro.infocourriel')}" tooltipConfig="#{'tooltipIcon':'%{icoTooltipUrl}', 'jsTooltipEnabled':'true'}" />
		        </div>
		        <div class="yui3-u">
		            <s:textfield id="partenaireEnCours.proCourriel" size="40" name="partenaireEnCours.proCourriel" readonly="true"/>
		        </div>
		    </div>
		    
		    <div class="yui3-g-r">
		        <div class="yui3-u-1-4">
		            <s:label for="partenaireEnCours.proFax" id="proFaxLabel" name="getText('GESTION_PARTENAIRE.coordpro.fax')"/>
		        </div>
		        <div class="yui3-u">
		            <s:textfield id="partenaireEnCours.proFax" size="40" name="partenaireEnCours.proFax" readonly="true"/>
		        </div>
		    </div>
	   </div>
	</div>
	
	<div class="collapsible-section">
		<h4 class="collapsible-section-trigger"><s:text name="GESTION_PARTENAIRE.coordpro.adresse.titre"/></h4>
		<div class="collapsible-section-target">
		    <div class="yui3-g-r">
		        <div class="yui3-u-1-4">
		            <s:label for="partenaireEnCours.proAdrRue" id="proAdrRueLabel" name="getText('GESTION_PARTENAIRE.coordpro.adresse.rue')"/>
		        </div>
		        <div class="yui3-u">
		            <s:textfield id="partenaireEnCours.proAdrRue" size="80" name="partenaireEnCours.proAdrRue" readonly="true" />
		        </div>
		    </div>
		    
		    <div class="yui3-g-r">
		        <div class="yui3-u-1-4">
		            <s:label for="partenaireEnCours.proAdrCP" id="proAdrCPLabel" name="getText('GESTION_PARTENAIRE.coordpro.adresse.cp')"/>
		        </div>
		        <div class="yui3-u">
		            <s:textfield id="partenaireEnCours.proAdrCP" size="20" name="partenaireEnCours.proAdrCP" readonly="true"/>
		        </div>
		    </div>
		
		    <div class="yui3-g-r">
		        <div class="yui3-u-1-2">
		            <div class="yui3-g-r">
		                <div class="yui3-u-1-2">
		                    <s:label for="partenaireEnCours.pays" id="paysLabel" name="getText('GESTION_PARTENAIRE.coordpro.adresse.pays')"/>
		                </div>
		                <div class="yui3-u">
		                    <s:textfield id="partenaireEnCours.pays" name="partenaireEnCours.ville.pays.libelle" readonly="true"/>
		                </div>
		            </div>
		        </div>
		        
		        <div class="yui3-u-1-2">
		            <div class="yui3-g-r">
		                <div class="yui3-u-1-2">
		                    <s:label for="partenaireEnCours.ville" id="villeLabel" name="getText('GESTION_PARTENAIRE.coordpro.adresse.ville')"/>
		                </div>
		                <div class="yui3-u">
		                    <s:textfield id="partenaireEnCours.ville" name="partenaireEnCours.ville.libelle" readonly="true"/>
		                </div>
		            </div>
		        </div>
		    </div>
	    </div>
	</div>
	
	<div class="collapsible-section">
		<h4 class="collapsible-section-trigger"><s:text name="GESTION_PARTENAIRE.coordassist.titre"/></h4>
		<div class="collapsible-section-target">
		    <div class="yui3-g-r">
		        <div class="yui3-u-1-2">
		            <div class="yui3-g-r">
		                <div class="yui3-u-1-2">
		                    <s:label for="partenaireEnCours.assistNom" id="assistNomLabel" name="getText('GESTION_PARTENAIRE.coordassist.nom')"/>
		                </div>
		                <div class="yui3-u">
		                    <s:textfield id="partenaireEnCours.assistNom" size="20" name="partenaireEnCours.assistNom" readonly="true"/>
		                </div>
		            </div>
		        </div>
		        
		        <div class="yui3-u-1-2">
		            <div class="yui3-g-r">
		                <div class="yui3-u-1-2">
		                    <s:label for="partenaireEnCours.assistPrenom" id="assistPrenomLabel" name="getText('GESTION_PARTENAIRE.coordassist.prenom')"/>
		                </div>
		                <div class="yui3-u">
		                    <s:textfield id="partenaireEnCours.assistPrenom" size="20" name="partenaireEnCours.assistPrenom" readonly="true"/>
		                </div>
		            </div>
		        </div>
		    </div>
		    
		    <div class="yui3-g-r">
		        <div class="yui3-u-1-4">
		            <s:label for="partenaireEnCours.assistTel" id="assistTelLabel" name="getText('GESTION_PARTENAIRE.coordassist.tel')"/>
		        </div>
		        <div class="yui3-u">
		            <s:textfield id="partenaireEnCours.assistTel" size="10" name="partenaireEnCours.assistTel" readonly="true"/>
		        </div>
		    </div>
		    
		    <div class="yui3-g-r">
		        <div class="yui3-u-1-4">
		            <s:label for="partenaireEnCours.assistCourriel" id="assistCourrielLabel" name="getText('GESTION_PARTENAIRE.coordassist.courriel')" />
		        </div>
		        <div class="yui3-u">
		            <s:textfield id="partenaireEnCours.assistCourriel" size="40" name="partenaireEnCours.assistCourriel" readonly="true"/>
		        </div>
		    </div>
		</div>
	</div>
	
	<div class="collapsible-section">
		<h4 class="collapsible-section-trigger"><s:text name="GESTION_PARTENAIRE.divers.titre"/></h4>
		<div class="collapsible-section-target">
		    <div class="yui3-g-r">
		        <div class="yui3-u-1-4">
		            <s:label for="partenaireEnCours.commentaire" id="commentaireLabel" name="getText('GESTION_PARTENAIRE.divers.commentaire')"/>
		        </div>
		        <div class="yui3-u">
		            <s:textarea id="partenaireEnCours.commentaire" name="partenaireEnCours.commentaire" cols="100" rows="5" readonly="true"/>
		        </div>
		    </div>
	    </div>
	</div>
</div>
