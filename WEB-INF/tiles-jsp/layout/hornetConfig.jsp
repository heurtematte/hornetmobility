<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<script type="text/javascript">
//<![CDATA[
    //Permet d'eviter les erreurs si le framework n'est pas accessible 
    if (typeof hornet == 'undefined' || typeof YUI == 'undefined') {
        hornet = function() { return { use: function(){} }; };
        hornet.getDefaultConfig = function(){ return {groups:{}}; }; }

    //Ajout des modules "personalisés"
    var yuiConfig = hornet.getDefaultConfig(),
    appModules = {
        "hornet_base" : {
            type: "js", fullpath : "${pageContext.request.contextPath}/static-1.2.0/js/base.js",
            requires : ['event', 'node', 'yui2-button', 'node-menunav'] },
        "hornet_form" : {
            type: "js", fullpath : "${pageContext.request.contextPath}/static-1.2.0/js/form.js",
            requires : ['io-form', 'yui2-container', 'hornet-ajax'] },
        "hornet_tableau" : {
            type: "js", fullpath : "${pageContext.request.contextPath}/static-1.2.0/js/tableau.js",
            requires : ['event', 'node', 'hornet-pagintable'] },
        "appModules" : {
            use: [ 'hornet_base', 'hornet_form', 'hornet_tableau' ] }
    };
    yuiConfig.groups.appModules = {
        base: '${pageContext.request.contextPath}/static-1.2.0/js/',
        combine: false, filter: 'RAW', modules: appModules };

    //Initialise une instance yui avec la configuration personnalisee
    hornet(yuiConfig);
//]]>
</script>