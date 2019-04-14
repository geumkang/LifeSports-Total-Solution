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
<script src='/js/schedule/tournamentView.js'></script>
<script src="//cdn.quilljs.com/1.3.6/quill.js"></script>
<script src="//cdn.quilljs.com/1.3.6/quill.min.js"></script>

<link href="//cdn.quilljs.com/1.3.6/quill.snow.css" rel="stylesheet">
<link href="//cdn.quilljs.com/1.3.6/quill.bubble.css" rel="stylesheet">

<style>
#boardRegTable {
	width: 100%;
	text-align: center;
	margin: auto;
}
</style>


<section class="w3ls-bnrbtm py-5" id="about">
	<div class="container py-xl-5 py-lg-3" style="height: 700px">
		<h3 class="title-w3 mb-md-5 mb-sm-4 mb-2 text-center font-weight-bold">Tournament</h3>
			<div class="row">
				<form name="frm" id="frm" method="post" onsubmit="return false;">
					<input type="hidden" id="serial" name="serial" value="${result.serial}" />

					
					<table id="boardRegTable">
						<colgroup>
							<col style="width: 190px;">
							<col style="height: *;">
						</colgroup>
						<tbody>
							<tr>
								<th><span class="text-red">* </span>제목</th>
								<td><input type="text" readonly="true"
									class="form-control input-sm width140" name="title" id="title"
									value="${result.title}"></td>
							</tr>
						</tbody>
					</table>
					
					<br>
					<!-- Create the editor container -->
					<div id="editor" style="height: 400px">${result.contents}</div>
					<!-- Initialize Quill editor -->
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
					<br>
					
					<div align="center">
							<button class="btn btn-sky" onclick="updtBtn(${result.serial})">수정</button> &nbsp&nbsp&nbsp
						<button class="btn btn-danger" onclick="deltBtn(${result.serial})">
								<i class="fa fa-trash">&nbsp;</i>삭제
							</button>&nbsp&nbsp&nbsp
					</div>

				</form>
			</div>
		</div>
</section>

<jsp:include page="/WEB-INF/jsp/footer.jsp" flush="true"></jsp:include>