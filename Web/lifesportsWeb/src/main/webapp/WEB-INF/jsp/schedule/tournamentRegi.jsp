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
				<form name="frm" id="frm" method="post"
					enctype="multipart/form-data" onsubmit="return false;">
					<input type="hidden" id="serial" name="serial"
						value="${result.serial}">

					<table class="normalTable">
						<colgroup>
							<col style="width: 190px;">
							<col style="height: *;">
						</colgroup>
						<tbody>
							<tr>
								<th><span class="text-red">* </span>제목</th>
								<td><input type="text"
									class="form-control input-sm width140" name="title" id="title"
									value="${result.title}"></td>
							</tr>

							<!-- 180731 수정 -->
							<tr>
								<th>첨부 파일<span class="text-red" style="font-size: 6pt">&nbsp&nbsp
										* &nbsp삭제하실 첨부파일은 체크 해주세요.</span></th>
								<td><c:if test="${fileInfo ne null}">
										<c:forEach items="${fileInfo}" var="abc" varStatus="state">

											<span id="checkFileNm${state.index}" name="checkFileNm"
												class="checkFileNm"> <input type="checkbox"
												id="arrFilePk${state.index}" name="arrFilePk"
												value="${abc.fileSn}" /> <span id="fileNm" name="fileNm">${abc.fileOrgNm}</span>
											</span>


										</c:forEach>
									</c:if> <input type="button" id="fileAdd" name="fileAdd"
									onclick="fileAddFn()" value="추가" /> <input type="button"
									id="fileDel" name="fileDel" onclick="fileDelFn()" value="삭제" />
									<table id="fileTable" style="width: 85%;">
										<tr>
											<td><input type="checkbox" id="delCheck" name="delCheck" />
												<input type="file" id="upfile0" name="upfile0"
												class="file_M" /></td>
										</tr>
									</table></td>
							</tr>
							<!-- 180731 수정 -->
						</tbody>
					</table>
					<!-- Create the editor container -->
					<div id="editor">${result.contents}</div>
					<!-- Initialize Quill editor -->
					<script>
var toolbarOptions = [
	 ['bold', 'italic', 'underline'],        // toggled buttons
	  ['code-block'],
	  [{ 'list': 'ordered'}, { 'list': 'bullet' }],

	  [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
	  ['image']
	];
var Delta = Quill.import('delta');
var quill = new Quill('#editor', {
	  modules: {
	    toolbar: toolbarOptions
	  },
	  theme: 'snow'
	});
var change = new Delta();

quill.on('text-change', function(delta) {
  change = change.compose(delta);
});
//Save periodically
setInterval(function() {
  if (change.length() > 0) {
    console.log('Saving changes', change);
    /* 
    Send partial changes
    $.post('/your-endpoint', { 
      partial: JSON.stringify(change) 
    });
    
    Send entire document
    $.post('/your-endpoint', { 
      doc: JSON.stringify(quill.getContents())
    });
    */
    change = new Delta();
    
    var temp = $("#editor").html();
    temp = replaceAll(temp, '<', '&lt;');
    temp = replaceAll(temp, '>', '&gt;');    
    $("#contents").val(temp);
  }
}, 5*1000);
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
						<button class="btn btn-sky" onclick="regiBtn('${gubun}', upfile0)">등록</button>
						&nbsp&nbsp
						<button class="btn btn-danger" onclick="cancelBtn()">
							<i class="fa fa-remove">&nbsp;</i>취소
						</button>
					</div>
				</form>
			</div>
		</div>
	</div>
</section>

<jsp:include page="/WEB-INF/jsp/footer.jsp" flush="true"></jsp:include>