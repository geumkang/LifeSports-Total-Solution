<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jstl/fmt_rt"  %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="app" uri="/WEB-INF/tld/app.tld"  %>
<%@ taglib prefix="f" uri="/WEB-INF/tld/f.tld" %>
<jsp:include page="/WEB-INF/jsp/header.jsp" flush="true"></jsp:include>
<jsp:include page="/WEB-INF/jsp/topMenu.jsp" flush="true"></jsp:include>
<script src='/webResource/jquery-3.3.1.js'></script>
<script src='/js/schedule/tournament.js'></script>

<style>
#boardList {
	text-align: center;
	margin: auto;
	width: 100%;
	border: 1px solid black;
}

#boardList th, td {
	text-align: center;
	border: 1px solid black;
	border-collapse : collapse;
	margin: 5px 0px 5px 25px;
	height: 60px;
}

</style>

<section class="w3ls-bnrbtm py-5" id="about">
	<div class="container py-xl-5 py-lg-3">
		<h3 class="title-w3 mb-md-5 mb-sm-4 mb-2 text-center font-weight-bold">Tournament</h3>
		<div class="row">
			<form id="frm" name="frm" method="post" onsubmit="return false;" style="width: 100%">
				<input type="hidden" id="serial" name="serial" />
				<input type="hidden" id="session" name="session" value="${session.UDID}"/>
				<table id="boardList" class="normalTable tableStriped text-center">
					<colgroup>
						<col style="width: 10%;">
						<col style="width: *;">
						<col style="width: 20%;">
					</colgroup>
					<thead>
						<tr>
							<th>번호</th>
							<th>제목</th>
						</tr>
					</thead>
					<tbody>
						<c:if test="${list.size() eq 0 }">
							<tr><td colspan="3">검색결과가 없습니다.</td></tr>
						</c:if>
						<c:if test="${list.size() ne 0 }">
							<c:forEach items="${list}" var="list" varStatus="state">
								<tr>
									<td><c:out value="${(totCnt - startNo) + state.index + 1}" /></td>
									<td><a href="#" onclick="tournamentView(${list.serial})">${list.title}</a></td>
								</tr>
							</c:forEach>
						</c:if>	

					</tbody>
				
				</table>
				
					<br>
					
					<div align="right">
						 	<button type="submit" class="btn btn-blue btn-sm btn-block" style="width: 85px" onclick="regiBtn()"><i class="fa fa-pencil">&nbsp;</i>신규 등록</button>
					</div>
			</form>
		</div>
	</div>
</section>

<jsp:include page="/WEB-INF/jsp/footer.jsp" flush="true"></jsp:include>