<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ taglib uri="/struts-tags" prefix="s"%>
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>

<tiles:importAttribute name="idFilAriane" />
<tiles:importAttribute name="menuVO" />

<c:set var="filarianeContent">
	<fmt:bundle basename="package">
		<%-- Recuperation noeud root --%>
		<c:set var="href" value="${menuVO.root.href}" />
		<c:set var="id" value="${menuVO.root.id}" />
		<fmt:message var="label" key="${id}.libelle">
			<fmt:param value="" />
		</fmt:message>
		<fmt:message var="labelLong" key="${id}.libelleLong">
			<fmt:param value="" />
		</fmt:message>

		<ul id="fil-ariane">
			<li class="fil-ariane-racine">
				<a id="${id}" href="<c:url value="${href}" />" <c:if test="${label != labelLong}"> title="${labelLong}" </c:if>><span>${label}</span>&nbsp;</a>
			</li>

			<%-- Récuperation noeuds menu --%>
			<c:forEach var="item" items="${menuVO.items}">
				<c:set var="href" value="${item.value.href}" />
				<c:set var="id" value="${item.value.id}" />
				<c:set var="visibleDansFilArianeNdCourant" value="${item.value.visibleDansFilAriane}" />
				<fmt:message var="labelLong" key="${id}.libelleLong">
					<fmt:param value="" />
				</fmt:message>
				<fmt:message var="label" key="${id}.libelle">
					<fmt:param value="" />
				</fmt:message>

				<c:if test="${id == idFilAriane}">
					<c:set var="nbAncetres" value="${fn:length(item.value.ancetres)}" />
					<c:forEach var="ancetre" items="${item.value.ancetres}" varStatus="statutAncetre">
						<c:set var="href" value="${ancetre.value.href}" />
						<c:set var="id" value="${ancetre.value.id}" />
						<c:set var="visibleDansFilAriane" value="${ancetre.value.visibleDansFilAriane}" />
						<fmt:message var="label" key="${id}.libelle">
							<fmt:param value="" />
						</fmt:message>
						<fmt:message var="labelLong" key="${id}.libelleLong">
							<fmt:param value="" />
						</fmt:message>
						
						<c:set var="classAditionnelle" value="fil-ariane-minimisable" />
						<c:if test="${statutAncetre.count == nbAncetres}">
							<c:set var="classAditionnelle" value="fil-ariane-parent" />
						</c:if>

						<c:if test="${visibleDansFilAriane}">
							<li class="${classAditionnelle}"><span class="fil-ariane-chevron">&gt;</span>
							<c:if test="${empty href}">
								<span>${label}</span>
							</c:if>
							<c:if test="${!empty href}">
								<a id="${id}" href="<c:url value="${href}" />" <c:if test="${label != labelLong}">title="${labelLong}"</c:if>>${label}</a>
							</c:if>
							</li>
						</c:if>
					</c:forEach>

					<c:if test="${visibleDansFilArianeNdCourant}">
						<c:set var="id" value="${item.value.id}" />
						<fmt:message var="label" key="${id}.libelle">
							<fmt:param value="" />
						</fmt:message>
						<fmt:message var="labelLong" key="${id}.libelleLong">
							<fmt:param value="" />
						</fmt:message>

						<li class="fil-ariane-courant"><span class="fil-ariane-chevron">&gt;</span><span><strong>${label}</strong></span></li>
					</c:if>
				</c:if>
			</c:forEach>

		</ul>
	</fmt:bundle>
</c:set>

<!-- Debut Filariane -->
<c:out value="${filarianeContent}" escapeXml="false" />
<!-- Fin Filariane -->
