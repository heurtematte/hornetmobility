<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles"%>
<%@ taglib uri="http://www.springframework.org/security/tags" prefix="security" %>
<%@ taglib uri="/struts-tags" prefix="s"%>

<security:authentication property="authorities" var="roles" scope="request"/>
<tiles:importAttribute name="menuVO" />

<h2><s:text name="pagescommunes.plansite.titre" /></h2>
<ul class="style1">
    <c:forEach var="item" items="${menuVO.listeItems}">
        <c:set var="item" value="${item}" scope="request"/>
        <jsp:include page="plan-item.jsp" />
    </c:forEach>
</ul>
