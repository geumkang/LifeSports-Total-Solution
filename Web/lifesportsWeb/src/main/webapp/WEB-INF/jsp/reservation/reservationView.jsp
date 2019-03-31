<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%> 
<jsp:include page="/WEB-INF/jsp/header.jsp" flush="true"></jsp:include>
<jsp:include page="/WEB-INF/jsp/topMenu.jsp" flush="true"></jsp:include>
<script src='/webResource/jquery-3.3.1.js'></script>

<script>

$(document).ready(function() {

	loadData();
	
	$(".okBtn").on("click", function(){
		addInfo($(this).parent().siblings());
		$(this).parent().parent().remove();
		
		emptyCheck();
	});
	
	$(".rejectBtn").on("click", function(){
		
		$(this).parent().parent().remove();
		
		emptyCheck();
	});
	
});

function loadData(){
	var dataSet = new Array();
	var data = new Array();
	data.push("name", "Date", "start", "end", "ID");
	
	dataSet.push(data);
	
	for(var len = 0; len < dataSet.length; len++){
		$("#reservation").children('tbody').append("<tr></tr>");
		for(var idx = 0; idx < 5; idx++){
			$("#reservation").children('tbody').children('tr:last').append("<td>" + dataSet[len][idx] + "</td>");
		}
		$("#reservation").children('tbody').children('tr:last').append("<td><button class='okBtn' type='button'>OK</button><button class='rejectBtn' type='button'>Reject</button></td>");
	}
	
	emptyCheck();
}

function addInfo(row){
	var Data = new Array();
	
	for(var i = 0; i < row.length; i++){
		Data[i] = row.eq(i).text();
	}
	
	// db에 넣기
}

function emptyCheck(){
	if($("#reservation").find('tr').length == 1)
		$("#emptyText").css("display", "block");
	else 
		$("#emptyText").css("display", "none");
}

</script>

<style>

#reservation {
	width: 100%;
	height: 100%;
	overflow: auto;
	margin: auto;
}

#reservation th {
	border-top-width: 2px;
	border-top-style: solid;
	border-top-color: rgba(113, 156, 254, 0.9);
	
	border-bottom-width: 2px;
	border-bottom-style: solid;
	border-bottom-color: rgba(113, 156, 254, 0.9);
}

#reservation th, td {
	text-align: center;
	width: 16%;
	height: 60px;
}

#reservation button {
	width: 60px;
	margin: auto;
}

#emptyText {
	display: none;
	text-align: center;
	margin:auto;
	margin-top: 30px;
	font-size: 30px;
}

</style>


<section class="w3ls-bnrbtm py-5" id="about">
	<div class="container py-xl-5 py-lg-3">
		<h3 class="title-w3 mb-md-5 mb-sm-4 mb-2 text-center font-weight-bold">Reservations</h3>
		<div class="row">
			<table id="reservation">
				<thead>
					<tr>
						<th>Facility Name</th>
						<th>Date</th>
						<th>Start Time</th>
						<th>End Time</th>
						<th>Applicant ID</th>
						<th>Confirm</th>
					</tr>
				</thead>
				
				<tbody>
					<tr>
						<td>ChoongAng</td>
						<td>2018.03.01</td>
						<td>08:00</td>
						<td>11:00</td>
						<td>hou</td>
						<td>
							<button class="okBtn" type="button">OK</button>
							<button class="rejectBtn" type="button">Reject</button>
						</td>
					</tr>
					
					<tr>
						<td>ChoongAng</td>
						<td>2018.03.02</td>
						<td>10:00</td>
						<td>12:00</td>
						<td>hou</td>
						<td>
							<button class="okBtn" type="button">OK</button>
							<button class="rejectBtn" type="button">Reject</button>
						</td>
					</tr>
					
					<tr>
						<td>ChoongAng</td>
						<td>2018.03.03</td>
						<td>10:00</td>
						<td>13:00</td>
						<td>hou</td>
						<td>
							<button class="okBtn" type="button">OK</button>
							<button class="rejectBtn" type="button">Reject</button>
						</td>
					</tr>
				</tbody>
			</table>
			<label id="emptyText">List is Empty</label>
		</div>
	</div>
</section>

<jsp:include page="/WEB-INF/jsp/footer.jsp" flush="true"></jsp:include>