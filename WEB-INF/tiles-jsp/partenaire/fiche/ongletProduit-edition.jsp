<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="/struts-tags" prefix="s"%>
<%@ taglib uri="/hornet-tags" prefix="hornet"%>

<div id="produits">
    
    <fieldset class="groupeChamps formmgr-row">
        <legend><s:text name="GESTION_PARTENAIRE.produits.tableau.caption"/></legend>
        <div class="formmgr-message-text"></div>
        <hornet:rattachement 
             id="produitsRattachement"
             name="produits"
             list="listeProduit" listKey="id" listValue="nom"
             rightTitle="%{getText('GESTION_PARTENAIRE.produits.rattachement.listeDroite')}"
             leftTitle="%{getText('GESTION_PARTENAIRE.produits.rattachement.listeGauche')}"
             addToRightLabel="%{getText('GESTION_PARTENAIRE.produits.rattachement.btn.deplacerDroite')}"
             addToLeftLabel="%{getText('GESTION_PARTENAIRE.produits.rattachement.btn.deplacerGauche')}" 
             addAllToRightLabel="%{getText('GESTION_PARTENAIRE.produits.rattachement.btn.deplacerTousDroite')}"
             addAllToLeftLabel="%{getText('GESTION_PARTENAIRE.produits.rattachement.btn.deplacerTousGauche')}" 
        />
    </fieldset>
     
</div>
