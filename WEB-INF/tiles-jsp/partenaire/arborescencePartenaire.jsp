<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="/struts-tags" prefix="s"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles" %>
<%@ taglib uri="/hornet-tags" prefix="hornet"%>


<h2><s:text name="ARBORESCENCE_PARTENAIRE.organismeVipPartenaire" /></h2>

<hornet:tree cssClass="yui3-arborescence-loading" 
	id="folder" name="treeState"
	jsTreeEnabled="true"
	
	rootNode="arborescencePartenaire"
	childCollectionProperty="children"
	nodeIdProperty="id"
	nodeTitleProperty="title"
	nodeHrefProperty="url"
/>
