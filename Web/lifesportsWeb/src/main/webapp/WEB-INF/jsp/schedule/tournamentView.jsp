<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jstl/fmt_rt"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="app" uri="/WEB-INF/tld/app.tld"%>
<%@ taglib prefix="f" uri="/WEB-INF/tld/f.tld"%>
<jsp:include page="/WEB-INF/jsp/header.jsp" flush="true"></jsp:include>
<jsp:include page="/WEB-INF/jsp/topMenu.jsp" flush="true"></jsp:include>
<script src='/webResource/jquery-3.3.1.js'></script>
<script src='/js/schedule/tournament.js'></script>
<script src="//cdn.quilljs.com/1.3.6/quill.js"></script>
<script src="//cdn.quilljs.com/1.3.6/quill.min.js"></script>

<link href="//cdn.quilljs.com/1.3.6/quill.snow.css" rel="stylesheet">
<link href="//cdn.quilljs.com/1.3.6/quill.bubble.css" rel="stylesheet">


<section class="w3ls-bnrbtm py-5" id="about">
	<div class="container py-xl-5 py-lg-3">
		<h3 class="title-w3 mb-md-5 mb-sm-4 mb-2 text-center font-weight-bold">Gym
			Information</h3>
		<div class="row">
			<div class="col-lg-6 pr-xl-5 mt-4">
				<form name="frm" id="frm" method="post" onsubmit="return false;">
					<input type="hidden" id="serial" name="serial"
						value="${result.serial}" />

					<div class="K_contents_title">
						<img src="/img/CONTENTS/TITLE_ACTIVITY05.png">
					</div>

					<div class="boardTitle">
						<i class="fa fa-file-text">&nbsp;</i>${result.title}
					</div>

					<div class="boardDate">

						<i class="fa fa-clock-o">&nbsp;</i>게시일<span>${result.dateTime}</span>
						첨부 파일 <span> <c:forEach items="${fileInfo}" var="abc"
								varStatus="state">
								<a href="#" onclick="javascript:fileDownLoad('${abc.fileSn}');">
									${abc.fileOrgNm} </a>&nbsp&nbsp&nbsp
							</c:forEach>

						</span>

					</div>

					<div class="boardContent">

						<!-- Create the editor container -->
						<div id="editor">${result.contents}</div>

						<script>
var toolbarOptions = [

	];
var Delta = Quill.import('delta');
var quill = new Quill('#editor', {
	  modules: {
	    toolbar: toolbarOptions
	  },
	  theme: 'bubble',
	  readOnly: 'true',
	});
var change = new Delta();
quill.on('text-change', function(delta) {
  change = change.compose(delta);
});
//Save periodically
function quillGetHTML(inputDelta) {
    var tempCont = document.createElement("div");
    (new Quill(tempCont)).setContents(inputDelta);
    return tempCont.getElementsByClassName("ql-editor")[0].innerHTML;
}
function replaceAll(str, searchStr, replaceStr) {
	  return str.split(searchStr).join(replaceStr);
	}
</script>
						<input type="hidden" rows="10" cols="70"
							class="form-control input-smm " id="contents" name="contents" />


						<!-- ${prev.dateTime}	-->
					</div>

					<div class="row">
						<div class="col-xs-6">
							<a href="#" onclick="downNextView('${next.serial}')">
								<ul class="nav navbar-nav boardPrev">
									<c:if test="${next eq null }">
										<li class="left"><i class="fa fa-angle-left"></i></li>
										<li><span>이전글</span>
											<p>없습니다.</p> <em><i class="fa fa-clock-o">&nbsp;</i>-</em>
									</c:if>
									<c:if test="${next ne null }">
										<li class="left"><i class="fa fa-angle-left"></i></li>
										<li><span>이전글 </span>
											<p>${next.title }</p> <em><i class="fa fa-clock-o">&nbsp;</i>${next.dateTime }</em>
										</li>
									</c:if>
								</ul>
							</a>
						</div>
						<div class="col-xs-6">
							<a href="#" onclick="downPrevView('${prev.serial}')">
								<ul class="nav navbar-nav boardNext">
									<c:if test="${prev eq null }">
										<li><span>다음글</span>
											<p>없습니다.</p> <em><i class="fa fa-clock-o">&nbsp;</i>-</em></li>
										<li class="right"><i class="fa fa-angle-right">&nbsp;</i></li>
									</c:if>
									<c:if test="${prev ne null }">
										<li><span>다음글</span>
											<p>${prev.title}.</p> <em><i class="fa fa-clock-o">&nbsp;</i>${prev.dateTime}</em>

										</li>
										<li class="right"><i class="fa fa-angle-right">&nbsp;</i></li>
									</c:if>
								</ul>
							</a>
						</div>
					</div>

					<br>

					<div align="center">
							<button class="btn btn-sky" onclick="updtBtn()">수정</button> &nbsp&nbsp&nbsp
						<button class="btn btn-danger" onclick="deltBtn()">
								<i class="fa fa-trash">&nbsp;</i>삭제
							</button>&nbsp&nbsp&nbsp
						<button class="btn btn-sky" onclick="goList()">
							<i class="fa fa-th-list">&nbsp;</i>목록
						</button>
					</div>

				</form>
			</div>
		</div>
	</div>
</section>

<jsp:include page="/WEB-INF/jsp/footer.jsp" flush="true"></jsp:include>