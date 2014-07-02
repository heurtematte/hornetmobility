<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="/struts-tags" prefix="s"%>

<div id="produits">
    <h4 class="titreTableau"><s:text name="GESTION_PARTENAIRE.produits.tableau.caption"/></h4>
    <div id="tableProduitsContainer" class="hornet-table-loading">
    <table id="tableProduits">
        <caption><s:text name="GESTION_PARTENAIRE.produits.tableau.caption"/></caption>
        <thead>
            <tr>
                <th scope="col"><s:text name="GESTION_PARTENAIRE.produits.tableau.entete.produit"/></th>
                <th scope="col"><s:text name="GESTION_PARTENAIRE.produits.tableau.entete.secteur"/></th>
            </tr>
        </thead>
        <tbody>
        <s:iterator value="listeProduit">
            <tr>
                <td><s:property value="nom" /></td>
                <td><s:property value="secteur.nom" /></td>
            </tr>
        </s:iterator>
        </tbody>
    </table>
    <s:if test="listeProduit.isEmpty">
        <p>
            <s:text name="commun.tableau.vide"></s:text>
        </p>
    </s:if>
    </div>
</div>

<script type="text/javascript">
//<![CDATA[
hornet().use("hornet_tableau", function (Y) {
    var YAHOO = Y.YUI2;
    //tableau html initial présent seulement si le tableau yui n'est pas encore créé
    initDatatable(Y, "tableProduits", "tableProduitsContainer", [
        {key:"produit", label:"<s:text name='GESTION_PARTENAIRE.produits.tableau.entete.produit'/>"}, 
        {key:"secteur", label:"<s:text name='GESTION_PARTENAIRE.produits.tableau.entete.secteur'/>"}
    ], {
        caption : "<s:text name='GESTION_PARTENAIRE.produits.tableau.caption'/>",
        summary : "<s:text name='GESTION_PARTENAIRE.produits.tableau.summary'/>"
    });
    // Chargement du composant tableau termine
    Y.all('#tableProduitsContainer').removeClass("hornet-table-loading");
});
//]]>
</script>