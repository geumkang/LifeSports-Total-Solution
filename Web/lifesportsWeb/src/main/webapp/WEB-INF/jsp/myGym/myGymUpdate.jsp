<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%> 
<jsp:include page="/WEB-INF/jsp/header.jsp" flush="true"></jsp:include>
<jsp:include page="/WEB-INF/jsp/topMenu.jsp" flush="true"></jsp:include>
<script src='/webResource/jquery-3.3.1.js'></script>

<script>
$(document).ready(function() {
	$("#addBtn").on("click", function(){
		$("#facilityInfo").append("")
	});
	
	$(document).on("click", ".editCompleteBtn", function(){
		var text = $(this).parent().parent().siblings().eq(0).find('input').val();
		console.log(text)
		$(this).parent().parent().siblings().eq(0).children().eq(2).children().remove();
		$(this).parent().parent().siblings().eq(0).children().eq(2).text(text);	
		
		for(var i = 1; i < $(this).parent().parent().siblings().length; i++){
			var text = $(this).parent().parent().siblings().eq(i).find('input').val();
			$(this).parent().parent().siblings().eq(i).children().eq(1).children().remove();
			$(this).parent().parent().siblings().eq(i).children().eq(1).text(text);	
		}
		
		$(this).css("display", "none");
		$(this).prev().css("display", "block");
	});
	
	$(document).on("click", ".editBtn", function(){
		
		var text = $(this).parent().parent().siblings().eq(0).children().eq(2).text();
		$(this).parent().parent().siblings().eq(0).children().eq(2).wrapInner('<input type="text">')
		$(this).parent().parent().siblings().eq(0).children().eq(2).children().val(text);
		
		for(var i = 1; i < $(this).parent().parent().siblings().length; i++){
			var text = $(this).parent().parent().siblings().eq(i).children().eq(1).text();
			$(this).parent().parent().siblings().eq(i).children().eq(1).wrapInner('<input type="text">')
			$(this).parent().parent().siblings().eq(i).children().eq(1).children().val(text);
		}
		
		$(this).css("display", "none");
		$(this).next().css("display", "block");
	});
	
	$("#addBtn").on("click", function(){
		$(this).parent().parent().next().children().append("<table class='facilityInfo'><tr><th>A. 잔디 구장</th><th></th><th style='text-align:right; vertical-align:middle;'><button class='editBtn' type='button'>EDIT</button><button class='editCompleteBtn' type='button'>OK</button></th></tr><tr><td rowspan='5'><img src='/images/about.jpg'></td><td>Name</td><td>ChoongAng</td></tr><tr><td>Location</td><td>서울특별시 동작구 흑석로 123</td></tr><tr><td>Usable Time</td><td>9:00 ~ 21:00</td></tr><tr><td>123</td><td>123</td></tr><tr><td>123</td><td>123</td></tr></table>")
	});
});
</script>

<style>

#gymInfo {
	width: 100%;
	margin: auto;
	margin-bottom: 50px;
}

.facilityInfo {
	width: 100%;
	margin-left: 50px;
	margin-bottom: 50px;
}

.facilityInfo img {
	width: 100%;
	height: 200px;
	margin: 0px 0px 0px 0px;
}

#gymInfo th, .facilityInfo th{
	height: 60px;
	
	
}
#infoHeader {
	border-top-width: 2px;
	border-top-style: solid;
	border-top-color: rgba(113, 156, 254, 0.9);
	
	border-bottom-width: 2px;
	border-bottom-style: solid;
	border-bottom-color: rgba(113, 156, 254, 0.9);
	padding-right: 10px;
	padding-left: 10px;
}

.facilityInfo tr {
	height: 30px;
}

.facilityInfo td {
	width: 30%;
	text-align: center;
}

.facilityInfo input {
	width: 100%;
	text-align: center;
}

#addBtn {
	width: 50px;
	float: right;
}

.editBtn {
	width: 50px;
	float: right;
}

.editCompleteBtn{
	width: 50px;
	float: right;
	display: none;	
}
</style>


<section class="w3ls-bnrbtm py-5" id="about">
	<div class="container py-xl-5 py-lg-3">
		<h3 class="title-w3 mb-md-5 mb-sm-4 mb-2 text-center font-weight-bold">Gym Information</h3>
		<div class="row">
			<table id="gymInfo">
				<tr id="infoHeader">
					<th>1. 중앙대학교</th>
					<th>
						<button id="addBtn" type="button">ADD</button>
					</th>
				</tr>
				<tr>
					<td>
					<table class="facilityInfo">
						<tr>
							<th>A. 잔디 구장</th>
							<th></th>
							<th style="text-align:right; vertical-align:middle;">
								<button class="editBtn" type="button">EDIT</button>
								<button class="editCompleteBtn" type="button">OK</button>
							</th>
						</tr>
						<tr>
							<td rowspan="5">
								<img src="/images/about.jpg">
							</td>
							<td>Name</td>
							<td>ChoongAng</td>
						</tr>
						<tr>
							<td>Location</td>
							<td>서울특별시 동작구 흑석로 123</td>
						</tr>
						<tr>
							<td>Usable Time</td>
							<td>9:00 ~ 21:00</td>
						</tr>
						<tr>
							<td>123</td>
							<td>123</td>
						</tr>
						<tr>
							<td>123</td>
							<td>123</td>
						</tr>
					</table>
					</td>
				</tr>
			</table>
			
			
		</div>
	</div>
</section>

<jsp:include page="/WEB-INF/jsp/footer.jsp" flush="true"></jsp:include>