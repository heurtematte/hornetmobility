<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@taglib uri="/struts-tags" prefix="s"%>
<%@ taglib uri="/hornet-tags" prefix="hornet"%>
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles" %>

<s:url id="icoTooltipUrl" value="%{#application.themeDefautPath}/assets/ico_tooltip.png"/>
<s:url id="icoConsulterUrl" value="%{#application.themeDefautPath}/assets/ico_consulter.png"/>
   
    <p class="discret"><s:text name="info.general.obligatoire"/></p>
    
    <!-- TYPE -->
	<div class="collapsible-section collapsible-section-active">
	    <h4 class="collapsible-section-trigger"><s:text name="GESTION_PARTENAIRE.type.titre"/></h4>
	    
	    <div class="yui3-g-r collapsible-section-target">
	        <div class="yui3-u-1-2">
	            <fieldset class="inline yui3-g-r formmgr-row">
	                <s:component template="legend" cssClass="yui3-u-1-2" cssStyle="label" value="%{getText('GESTION_PARTENAIRE.typepartenaire')}"/>
	                <div class="yui3-u-1-2 liste-radio-inline">
	                    <div class="formmgr-message-text"></div>
	                    <s:radio list="#{'true':getText('GESTION_PARTENAIRE.type.client'),'false':getText('GESTION_PARTENAIRE.type.fournisseur')}" name="partenaireEnCours.isClient" />
	                </div>
	            </fieldset>
	        </div>
	        
	        <div class="yui3-u-1-2">
	            <div class="yui3-g-r formmgr-row">
	                <div class="yui3-u-1-2">
	                    <s:label for="partenaireEnCours.vip" id="vipLabel" value="%{getText('GESTION_PARTENAIRE.recherche.vip.lbl')}"><s:param name="escape" value="false" /></s:label>
	                </div>
	                <div class="yui3-u-1-2">
	                    <div class="formmgr-message-text"></div>
	                    <s:checkbox id="partenaireEnCours.vip" name="partenaireEnCours.isVIP"  />
	                </div>
	            </div>
	        </div>
	    </div>
   </div>
    
    <!-- CIVILITE -->
	<div class="collapsible-section">
	    <h4 class="collapsible-section-trigger"><s:text name="GESTION_PARTENAIRE.civilite.titre"/></h4>
	    
		<div class="collapsible-section-target">
		    <div class="yui3-g-r formmgr-row">
		        <div class="yui3-u-1-4">
		            <s:label requiredLabel="true" for="partenaireEnCours.civilite" id="civiliteLabel" name="getText('GESTION_PARTENAIRE.civilite')"/>
		        </div>
		        <div class="yui3-u-3-4">
		            <div class="formmgr-message-text"></div>
		            <div class="yui3-g-r">
		                <div class="yui3-u">
		                    <div class="formmgr-message-text"></div>
		                    <s:select id="partenaireEnCours.civilite" list="listeCivil" listKey="id" listValue="libelle" name="partenaireEnCours.civilite.id"/>
		                </div>
		                <div class="yui3-u">
		                    <p class="texte">Lorem ipsum dolor sit amet, iam.</p>
		                </div>
		            </div>
		        </div>
		    </div>
		    
		    <div class="yui3-g-r">
		        <div class="yui3-u-1-2">
		            <div class="yui3-g-r formmgr-row">
		                <div class="yui3-u-1-2">
		                    <s:label requiredLabel="true" for="partenaireEnCours.nom" id="nomLabel" name="getText('GESTION_PARTENAIRE.civilite.nom')"/>
		                </div>
		                <div class="yui3-u-1-2">
		                    <div class="formmgr-message-text"></div>
		                    <s:textfield id="partenaireEnCours.nom" name="partenaireEnCours.nom" value="%{partenaireEnCours.nom}" maxlength="50" size="20" />
		                </div>
		            </div>
		        </div>
		        
		        <div class="yui3-u-1-2">
		            <div class="yui3-g-r formmgr-row">
		                <div class="yui3-u-1-2">
		                    <s:label for="partenaireEnCours.nomLocal" id="nomLocalLabel" name="getText('GESTION_PARTENAIRE.civilite.nomlocal')"/>
		                </div>
		                <div class="yui3-u-1-2">
		                    <div class="formmgr-message-text"></div>
		                    <s:textfield id="partenaireEnCours.nomLocal" name="partenaireEnCours.nomLocal" maxlength="50" size="20" />
		                </div>
		            </div>
		        </div>
		    </div>
		         
		    <div class="yui3-g-r">
		        <div class="yui3-u-1-2">
		            <div class="yui3-g-r formmgr-row">
		                <div class="yui3-u-1-2">
		                    <s:label requiredLabel="true" for="partenaireEnCours.prenom" id="prenomLabel" name="getText('GESTION_PARTENAIRE.civilite.prenom')"/>
		                </div>
		                <div class="yui3-u-1-2">
		                    <div class="formmgr-message-text"></div>
		                    <s:textfield id="partenaireEnCours.prenom" name="partenaireEnCours.prenom" maxlength="50" size="20" />
		                </div>
		            </div>
		        </div>
		        
		        <div class="yui3-u-1-2">
		            <div class="yui3-g-r formmgr-row">
		                <div class="yui3-u-1-2">
		                    <s:label for="partenaireEnCours.prenomLocal" id="prenomLocalLabel"  name="getText('GESTION_PARTENAIRE.civilite.prenomlocal')"/>
		                </div>
		                <div class="yui3-u-1-2">
		                    <div class="formmgr-message-text"></div>
		                    <s:textfield id="partenaireEnCours.prenomLocal" name="partenaireEnCours.prenomLocal" maxlength="50" size="20"/>
		                </div>
		            </div>
		        </div>
		    </div>
		    
		    <fieldset class="inline yui3-g-r formmgr-row" id="nationaliteGroupe">
		        <s:component template="legend" cssClass="yui3-u-1-4" cssStyle="label" requiredLabel="true" value="%{getText('GESTION_PARTENAIRE.civilite.nationalite')}"/>
		        
		        <div class="yui3-u-3-4">
		            <div class="formmgr-message-text"></div>
		            
		            <tiles:importAttribute name="action"/>
		            <s:url id="urlReloadNationaliteJson" action="reloadNationalite%{#attr.action}">
		                <s:param name="mode">JSON</s:param>
		            </s:url>
		            <hornet:autocomplete cssClass="hornet-autocomplete formmgr-field"
		                id="partenaireEnCours.nationalite" 
		                
		                inputLabel="%{getText('GESTION_PARTENAIRE.civilite.nationalite.saisie')}"
		                buttonLabel="%{getText('GESTION_PARTENAIRE.civilite.nationalite.rechercher')}" 
		                selectLabel="%{getText('GESTION_PARTENAIRE.civilite.nationalite.selection')}" 
		                 
		                inputName="partenaireEnCours.nationalite.nationalite"
		                selectName="partenaireEnCours.nationalite.id" 
		                
		                iconSrc="%{#icoConsulterUrl}"
		                action="reloadNationalite%{#attr.action}"
		                
		                list="listeNation" 
		                listKey="id" 
		                listValue="nationalite"
		                
		                queryDelay="500"
		                minQueryLength="3"
		                maxResults="0"
		                resultHighlighter="phraseMatch"
		                
		                url="%{urlReloadNationaliteJson}" 
		                errorsAreaTitle="%{#attr.titleError}"
		            />
		        </div>
		    </fieldset>
		</div>
	</div>
    
	<div class="collapsible-section">
	    <h4 class="collapsible-section-trigger"><s:text name="GESTION_PARTENAIRE.coordpro.titre"/></h4>
	    
		<div class="collapsible-section-target">
		    <div class="yui3-g-r formmgr-row">
		        <div class="yui3-u-1-4">
		            <s:label for="partenaireEnCours.organisme" id="organismeLabel" name="getText('GESTION_PARTENAIRE.coordpro.organisme')"/>
		        </div>
		        <div class="yui3-u">
		            <div class="formmgr-message-text"></div>
		            <s:textfield id="partenaireEnCours.organisme" maxlength="50" size="40" name="partenaireEnCours.organisme"/>
		        </div>
		    </div>
		    
		    <div class="yui3-g-r formmgr-row">
		        <div class="yui3-u-1-4">
		            <s:label for="partenaireEnCours.fonction" id="fonctionLabel" name="getText('GESTION_PARTENAIRE.coordpro.fonction')"/>
		        </div>
		        <div class="yui3-u">
		            <div class="formmgr-message-text"></div>
		            <s:textfield id="partenaireEnCours.fonction" maxlength="50" size="40" name="partenaireEnCours.fonction"/>
		        </div>
		    </div>
		        
		    <div class="yui3-g-r">
		        <div class="yui3-u-1-2">
		            <div class="yui3-g-r formmgr-row">
		                <div class="yui3-u-1-2">
		                    <s:label for="partenaireEnCours.proTelFixe" id="proTelFixeLabel" name="getText('GESTION_PARTENAIRE.coordpro.telfixe')"/>
		                </div>
		                <div class="yui3-u-1-2">
		                    <div class="formmgr-message-text"></div>
		                    <s:textfield id="partenaireEnCours.proTelFixe" maxlength="10" size="10" name="partenaireEnCours.proTelFixe"/>
		                </div>
		            </div>
		        </div>
		        
		        <div class="yui3-u-1-2">
		            <div class="yui3-g-r formmgr-row">
		                <div class="yui3-u-1-2">
		                    <s:label for="partenaireEnCours.proTelPort" id="proTelPortLabel" name="getText('GESTION_PARTENAIRE.coordpro.telport')"/>
		                </div>
		                <div class="yui3-u-1-2">
		                    <div class="formmgr-message-text"></div>
		                    <s:textfield id="partenaireEnCours.proTelPort" maxlength="10" size="10" name="partenaireEnCours.proTelPort"/>
		                </div>
		            </div>
		        </div>
		    </div>
		    
		    <div class="yui3-g-r formmgr-row">
		        <div class="yui3-u-1-4">
		            <s:label requiredLabel="true" for="partenaireEnCours.proCourriel" id="proCourrielLabel" name="getText('GESTION_PARTENAIRE.coordpro.courriel')" 
		                tooltip="%{getText('GESTION_PARTENAIRE.coordpro.infocourriel')}" tooltipConfig="#{'tooltipIcon':'%{icoTooltipUrl}', 'jsTooltipEnabled':'true'}"/>
		        </div>
		        <div class="yui3-u">
		            <div class="formmgr-message-text"></div>
		            <s:textfield id="partenaireEnCours.proCourriel" maxlength="80" size="40" name="partenaireEnCours.proCourriel" />
		        </div>
		    </div>
		    
		    <div class="yui3-g-r formmgr-row">
		        <div class="yui3-u-1-4">
		            <s:label for="partenaireEnCours.proFax" id="proFaxLabel" name="getText('GESTION_PARTENAIRE.coordpro.fax')"/>
		        </div>
		        <div class="yui3-u">
		            <div class="formmgr-message-text"></div>
		            <s:textfield id="partenaireEnCours.proFax" maxlength="10" size="10" name="partenaireEnCours.proFax"/>
		        </div>
		    </div>
		</div>
	</div>
    
	<div class="collapsible-section">
	    <h4 class="collapsible-section-trigger"><s:text name="GESTION_PARTENAIRE.coordpro.adresse.titre"/></h4>
	    
		<div class="collapsible-section-target">
		    <div class="yui3-g-r formmgr-row">
		        <div class="yui3-u-1-4">
		            <s:label requiredLabel="true" for="partenaireEnCours.proAdrRue" id="proAdrRueLabel" name="getText('GESTION_PARTENAIRE.coordpro.adresse.rue')"/>
		        </div>
		        <div class="yui3-u">
		            <div class="formmgr-message-text"></div>
		            <s:textfield id="partenaireEnCours.proAdrRue" maxlength="250" size="80" name="partenaireEnCours.proAdrRue"/>
		        </div>
		    </div>
		    
		    <div class="yui3-g-r formmgr-row">
		        <div class="yui3-u-1-4">
		            <s:label requiredLabel="true" for="partenaireEnCours.proAdrCP" id="proAdrCPLabel" name="getText('GESTION_PARTENAIRE.coordpro.adresse.cp')"/>
		        </div>
		        <div class="yui3-u">
		            <div class="formmgr-message-text"></div>
		            <s:textfield id="partenaireEnCours.proAdrCP" maxlength="9" size="9" name="partenaireEnCours.proAdrCP"/>
		        </div>
		    </div>
		    
		    <div class="yui3-g-r formmgr-row">
		        <div class="yui3-u-1-4">
		            <s:label requiredLabel="true" for="partenaireEnCours.pays" id="paysLabel" name="getText('GESTION_PARTENAIRE.coordpro.adresse.pays')"/>
		        </div>
		        <div class="yui3-u">
		            <div class="formmgr-message-text"></div>
		            <s:select id="partenaireEnCours.pays" list="listePays" listKey="id" listValue="libelle" name="partenaireEnCours.ville.pays.id"/>
		        </div>
		    </div>
		    
		    <div class="yui3-g-r formmgr-row">
		        <div class="yui3-u-1-4">
		            <s:label requiredLabel="true" for="partenaireEnCours.ville" id="villeLabel" name="getText('GESTION_PARTENAIRE.coordpro.adresse.ville')"/>
		        </div>
		        <div class="yui3-u">
		            <div class="formmgr-message-text"></div>
		            <tiles:importAttribute name="reloadActionName"/>
		            <s:submit type="button" cssStyle="button" id="reloadlisteVilles" action="%{#attr.reloadActionName}" key="commun.btn.recharger" />
		            <s:doubleselect 
		                id="partenaireEnCours.ville" 
		                name="partenaireEnCours.ville.id"
		                list="listeVilles" listKey="id" listValue="libelle"
		                doubleName="partenaireEnCours.ville.pays.id" doubleId="partenaireEnCours.pays" doubleList="">
		                <s:param name="buttonId">reloadlisteVilles</s:param>
		                <s:param name="urlAction">reloadEditionPartenaire.xml?mode=XML</s:param>
		                <s:param name="titleError"><h2 class='titleError'><s:text name='commun.error.msg'/></h2></s:param>
		                <s:param name="addEmptyOption" value="true"/>
		                <s:param name="emptyOptionText"><s:text name='GESTION_PARTENAIRE.coordpro.adresse.ville.default'/></s:param>
		            </s:doubleselect>
		        </div>
		    </div>
		</div>
	</div>
    
	<div class="collapsible-section">
	    <h4 class="collapsible-section-trigger"><s:text name="GESTION_PARTENAIRE.coordassist.titre"/></h4>
	    
		<div class="collapsible-section-target">
		    <div class="yui3-g-r">
		        <div class="yui3-u-1-2">
		            <div class="yui3-g-r formmgr-row">
		                <div class="yui3-u-1-2">
		                    <s:label for="partenaireEnCours.assistNom" id="assistNomLabel" name="getText('GESTION_PARTENAIRE.coordassist.nom')"/>
		                </div>
		                <div class="yui3-u-1-2">
		                    <div class="formmgr-message-text"></div>
		                    <s:textfield id="partenaireEnCours.assistNom" maxlength="50" size="20" name="partenaireEnCours.assistNom"/>
		                </div>
		            </div>
		        </div>
		        
		        <div class="yui3-u-1-2">
		            <div class="yui3-g-r formmgr-row">
		                <div class="yui3-u-1-2">
		                    <s:label for="partenaireEnCours.assistPrenom" id="assistPrenomLabel" name="getText('GESTION_PARTENAIRE.coordassist.prenom')"/>
		                </div>
		                <div class="yui3-u-1-2">
		                    <div class="formmgr-message-text"></div>
		                    <s:textfield id="partenaireEnCours.assistPrenom" maxlength="50" size="20" name="partenaireEnCours.assistPrenom"/>
		                </div>
		            </div>
		        </div>
		    </div>
		    
		    <div class="yui3-g-r formmgr-row">
		        <div class="yui3-u-1-4">
		            <s:label for="partenaireEnCours.assistTel" id="assistTelLabel" name="getText('GESTION_PARTENAIRE.coordassist.tel')"/>
		        </div>
		        <div class="yui3-u-1-4">
		            <div class="formmgr-message-text"></div>
		            <s:textfield id="partenaireEnCours.assistTel" maxlength="10" size="10" name="partenaireEnCours.assistTel"/>
		        </div>
		    </div>
		    
		    <div class="yui3-g-r formmgr-row">
		        <div class="yui3-u-1-4">
		            <s:label for="partenaireEnCours.assistCourriel" id="assistCourrielLabel" name="getText('GESTION_PARTENAIRE.coordassist.courriel')"/>
		        </div>
		        <div class="yui3-u">
		            <div class="formmgr-message-text"></div>
		            <s:textfield id="partenaireEnCours.assistCourriel" maxlength="80" size="40" name="partenaireEnCours.assistCourriel"/>
		        </div>
		    </div>
		</div>
	</div>
    
	<div class="collapsible-section">
	    <h4 class="collapsible-section-trigger"><s:text name="GESTION_PARTENAIRE.divers.titre"/></h4>
	    
		<div class="collapsible-section-target">
		    <div class="yui3-g-r formmgr-row">
		        <div class="yui3-u-1-4">
		            <s:label for="partenaireEnCours.commentaire" id="commentaireLabel" name="getText('GESTION_PARTENAIRE.divers.commentaire')"/>
		        </div>
		        <div class="yui3-u">
		            <div class="formmgr-message-text"></div>
		            <s:textarea id="partenaireEnCours.commentaire" name="partenaireEnCours.commentaire" cols="100" rows="5"  />
		        </div>
		    </div>
		</div>
	</div>
