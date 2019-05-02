<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jstl/fmt_rt"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="app" uri="/WEB-INF/tld/app.tld"%>
<%@ taglib prefix="f" uri="/WEB-INF/tld/f.tld"%>


<%@ page language="java" contentType="text/html" pageEncoding="utf-8"%> 


<jsp:include page="/WEB-INF/jsp/header.jsp" flush="true"></jsp:include>
<jsp:include page="/WEB-INF/jsp/topMenu.jsp" flush="true"></jsp:include>
<script src='/webResource/jquery-3.3.1.js'></script>

<script src="//cdn.quilljs.com/1.3.6/quill.js"></script>
<script src="//cdn.quilljs.com/1.3.6/quill.min.js"></script>

<link href="//cdn.quilljs.com/1.3.6/quill.snow.css" rel="stylesheet">
<link href="//cdn.quilljs.com/1.3.6/quill.bubble.css" rel="stylesheet">

						    
<script>

var listChanged = true;
var currentLatLng = new Array();

$(document).ready(function() {
	
	loadData();
	emptyCheck();
	
	$(document).on("click", ".timeBox", function(){
	
		startTime = $("#GYM_STARTTIME").val().substr(0,5);
		endTime = $("#GYM_ENDTIME").val().substr(0,5);
		
		var current = startTime;
		var timeList = new Array();
		timeList.push(current);
		
		while(current.substr(0,3) <= endTime.substr(0,3)){
			if(current.substr(3,5) == '00'){
				current = current.substr(0,3) + '30';
			}
			else{
				current = String(Number(current.substr(0,2)) + 1) + ':00';
				if(current.length == 4)
					current = "0" + current;
			}
			timeList.push(current)
			if(current == endTime)
				break;
		}
		console.log(timeList.length)
		for(var i = 0; i < timeList.length; i++){
			if(i == 0)
				$(this).append('<option value=' + "12" + 'selected="selected">' + timeList[i] + '</option>');
			else
				$(this).append('<option value=' + timeList[i] + '>' + timeList[i] + '</option>');
		}
		
	});
	
	$("#addBtn").on("click", function(){
		if(listChanged){
			$temp = $("#newFacility tbody").clone();
			$temp.find("select[name='start']").empty()
			$temp.find("select[name='start']").wrapInner(loadTime($("#GYM_STARTTIME"), $("#GYM_ENDTIME")));
			$temp.find("select[name='end']").empty()
			$temp.find("select[name='end']").wrapInner(loadTime($("#GYM_STARTTIME"), $("#GYM_ENDTIME")));
			
			$temp.find(".okBtn").attr("name", "new");
			$("#groundList").append($temp.html());
			
			listChanged = false;	
		}
	});
	
	$(document).on("click", ".editCompleteBtn", function(){
		var isEmpty = true;
		
		if($("#gymName input").val() != "" && $(this).parent().parent().siblings().eq(0).find('input').val() != ""){
			for(var i = 1; i < $(this).parent().parent().siblings().length; i++){
				if($(this).parent().parent().siblings().eq(0).find('input').val() != ""){
					isEmpty = false;
				}
				else{
					isEmpty = true;
					break;
				}
			}
		}
			
		if(isEmpty){
			alert("빈 칸이 존재합니다. 채워주세요.")
		}
		else{
			var gym_data = new Array();
			
			var name = $("#gymName input").val();
			$("#gymName input").remove();
			$("#gymName").text(name);
			gym_data.push(name);
			
			var text = $(this).parent().parent().siblings().eq(0).find('input').val();
			$(this).parent().parent().siblings().eq(0).children().eq(2).children().remove();
			$(this).parent().parent().siblings().eq(0).children().eq(2).text(text);	
			gym_data.push(text);
			
			for(var i = 1; i < $(this).parent().parent().siblings().length; i++){
				var text = $(this).parent().parent().siblings().eq(i).find('input').val();
				$(this).parent().parent().siblings().eq(i).children().eq(1).children().remove();
				$(this).parent().parent().siblings().eq(i).children().eq(1).text(text);	
				gym_data.push(text);
			}
			
			$(this).css("display", "none");
			$(this).prev().css("display", "block");
			
			// Request Data
			var data = {
				"gym_name": gym_data[0],
				"gym_location": gym_data[1],
				"avail_starttime": gym_data[2].substr(0,5) + ":00",
				"avail_endtime": gym_data[2].substr(8,13) + ":00",
				"gym_info": gym_data[3],
				"admin_ID": $("#ADMIN_UDID").val()
			};
			console.log(data)
			$.ajax({
				headers: { 
				    Accept : "application/json"
				},
				url:"/myGym/editGym.do",
				type:"POST",
				data : JSON.stringify(data),
				contentType : "application/json; charset=UTF-8",
				success: function(result){
					console.log("save complete")
				},
				error: function(xhr, status, error) {
					alert(error);
				}
			});
		}
	});
	
	$(document).on("click", ".editBtn", function(){
		var name = $("#gymName").text()
		$("#gymName").wrapInner('<input type="text"/>');
		$("#gymName input").val(name);
		$("#gymName input").css("textAlign", "center");
		
		var text = $(this).parent().parent().siblings().eq(0).children().eq(2).text();
		$(this).parent().parent().siblings().eq(0).children().eq(2).wrapInner('<input type="text"/>')
		$(this).parent().parent().siblings().eq(0).children().eq(2).children().val(text);
		
		for(var i = 1; i < $(this).parent().parent().siblings().length; i++){
			var text = $(this).parent().parent().siblings().eq(i).children().eq(1).text();
			$(this).parent().parent().siblings().eq(i).children().eq(1).wrapInner('<input type="text"/>')
			$(this).parent().parent().siblings().eq(i).children().eq(1).children().val(text);
		}
		
		$(this).css("display", "none");
		$(this).next().css("display", "block");
	});
	
	$(document).on("click", ".deleteBtn", function(){
		
		var fac_ID = $(this).parent().next().text();
		$(this).parent().parent().remove();
		// Request Data
 		var data = {
 			"fac_ID": fac_ID
 		};
		
 		$.ajax({
 			headers: { 
 			    Accept : "application/json"
 			},
 			url:"/myGym/delFacility.do",
 			type:"POST",
 			data : JSON.stringify(data),
 			contentType : "application/json; charset=UTF-8",
 			success: function(result){
 				console.log("Facility Delete Completely");
			},
 			error: function(xhr, status, error) {
 				alert(error);
 			}
 		});
	});
	
	$(document).on("click", ".okBtn", function(){
		if($(this).text() == "OK"){
			if(!listChanged){
				if($(this).parent().parent().find("input:eq(0)").val() == "" ||
					$(this).parent().parent().find("input:eq(2)").val() == ""){
					alert("미입력된 항목이 존재합니다");
					return;
				}
				
				var gym_data = new Array();
				
				// 이름
				var name = $(this).parent().siblings().eq(0).children().val();
				$(this).parent().siblings().eq(0).children().remove();
				$(this).parent().siblings().eq(0).text(name);
				gym_data.push(name);
				
				// 이용 시간
				var startTime = $(this).parent().siblings().eq(1).children().eq(0).val();
				var endTime = $(this).parent().siblings().eq(1).children().eq(1).val();
				$(this).parent().siblings().eq(1).children().remove();
				$(this).parent().siblings().eq(1).text(startTime + " ~ " + endTime);
				gym_data.push(startTime + ":00");
				gym_data.push(endTime + ":00");
				
				// 인원
				var participant = $(this).parent().siblings().eq(2).children().val();
				$(this).parent().siblings().eq(2).children().remove();
				$(this).parent().siblings().eq(2).text(participant);
				gym_data.push(participant);
				
				// 종목
				var subject = $(this).parent().siblings().eq(3).children().find("option:selected").text();
				$(this).parent().siblings().eq(3).children().remove();
				$(this).parent().siblings().eq(3).text(subject);
				gym_data.push(subject);
				
				var id = $(this).parent().siblings().eq(4).text();
				gym_data.push(id);
				
				var url;
				if($(this).attr("name") == 'new'){
					url = "/myGym/addFacility.do";
					$(this).attr("name", "");
				}
				else
					url = "/myGym/editFacility.do";
					
				// Request Data
				var data = {
					"avail_starttime": gym_data[1],
					"avail_endtime": gym_data[2],
					"avail_participant": gym_data[3],
					"fac_name": gym_data[0],
					"subj_name": gym_data[4],
					"fac_ID": gym_data[5],
					"gym_ID": $("#GYM_ID").val() 
				};
				
				$.ajax({
					headers: { 
					    Accept : "application/json"
					},
					url: url,
					type:"POST",
					data : JSON.stringify(data),
					contentType : "application/json; charset=UTF-8",
					success: function(result){
						console.log("Edit Facility Info Completely");
					},
					error: function(xhr, status, error) {
						alert(error);
					}
				});
				
				$(this).text("EDIT");
				listChanged = true;
			}
		}
		else if($(this).text() == "EDIT"){
			if(listChanged){
				
				$temp = $("#newFacility tbody tr").clone();
				$temp.find("select[name='start']").empty()
				$temp.find("select[name='start']").wrapInner(loadTime($("#GYM_STARTTIME"), $("#GYM_ENDTIME")));
				$temp.find("select[name='end']").empty()
				$temp.find("select[name='end']").wrapInner(loadTime($("#GYM_STARTTIME"), $("#GYM_ENDTIME")));
				
				// 시설명
				$temp.find("input[name='f_name']").val($(this).parent().siblings().eq(0).text());
				
				// 운영시간
				var start = $(this).parent().siblings().eq(1).text().substr(0,5);
				var end = $(this).parent().siblings().eq(1).text().substr(8,13);
				$temp.find("select[name='start'] option:contains(" + start + ")").prop("selected", "selected");
				$temp.find("select[name='end'] option:contains(" + end + ")").prop("selected", "selected");
				
				// 수용인원
				$temp.find("input[name='f_participant']").val($(this).parent().siblings().eq(2).text());
				
				//종목
				var subject = $(this).parent().siblings().eq(3).text();
				$temp.find("select[name='f_subject'] option:contains(" + subject + ")").prop("selected", "selected");
				
				//ID
				var id = $(this).parent().siblings().eq(4).text();
				$temp.find("td[name='f_id']").text(id);
				
				
				$(this).parent().parent().replaceWith($temp);
				
				listChanged = false;
			}
		}
	});
	
	$("#registerBtn").on("click", function(){
		if($("#nameInput").val() != "" && $("#info").val() != ""){
			var gym_data = new Array();
			
			var name = $("#nameInput").val();
			gym_data.push(name);
			
			var figure = $(".ql-editor p").html();
			gym_data.push(figure);
			
			var location = $("#locationInput").text();
			gym_data.push(location);
			
			var startTime = $('#newInfo').find("select[name='start']").find("option:selected").text();
			gym_data.push(startTime);
			
			var endTime = $('#newInfo').find("select[name='end']").find("option:selected").text();
			gym_data.push(endTime);
			
			var info = $("#info").val();
			gym_data.push(info);
			
			// Request Data
			var data = {
				"gym_name": gym_data[0],
				"gym_fig": gym_data[1],
				"gym_location": gym_data[2],
				"gym_latitude": currentLatLng[0],
				"gym_longitude": currentLatLng[1],
				"avail_starttime": gym_data[3],
				"avail_endtime": gym_data[4],
				"gym_info": gym_data[5],
				"gym_admin_ID": $("#ADMIN_UDID").val(), 
			};
			
			$.ajax({
				headers: { 
				    Accept : "application/json"
				},
				url:"/myGym/registerGym.do",
				type:"POST",
				data : JSON.stringify(data),
				contentType : "application/json; charset=UTF-8",
				success: function(result){
					console.log("Register Gym Completely");
					window.location.href = '/myGym/myGymUpdate.do';
				},
				error: function(xhr, status, error) {
					alert(error);
				}
			});
		}
		else{
			alert("빈 칸이 존재합니다.");
		}
	});
	
	$("#cancelBtn").on("click", function(){
		$("#newInfo input").val("");
		$("#registerInfoBox").css("display", "none");	
	});
	
	getLocation();
    
});

function loadTime($start, $end){
	if($start == "00:00:00"){
		startTime = $start.substr(0,5);
		endTime = $end.substr(0,5);
	}
	else{
		startTime = $start.val().substr(0,5);
		endTime = $end.val().substr(0,5);
	}
	
	var current = startTime;
	var timeList = new Array();
	timeList.push(current);
	
	while(current.substr(0,3) <= endTime.substr(0,3)){
		if(current.substr(3,5) == '00'){
			current = current.substr(0,3) + '30';
		}
		else{
			current = String(Number(current.substr(0,2)) + 1) + ':00';
			if(current.length == 4)
				current = "0" + current;
		}
		timeList.push(current)
		if(current == endTime)
			break;
	}
	
	var result;
	for(var i = 0; i < timeList.length; i++){
		if(i == 0)
			result += '<option value=' + timeList[i] + ' selected="selected">' + timeList[i] + '</option>'
		else
			result += '<option value=' + timeList[i] + '>' + timeList[i] + '</option>'
	}
	return result;
}

function loadData(){
	
	// 데이터 있을 때
	if($("#GYM_ISEMPTY").val() == "FALSE"){
		$("#gymName").text($("#GYM_NAME").val())
		$("#gymLocation").text($("#GYM_LOC").val())
		$("#gymUsableTime").text($("#GYM_STARTTIME").val().substr(0,5) + " ~ " + $("#GYM_ENDTIME").val().substr(0,5))
		$("#gymDescription").text($("#GYM_INFO").val())
	}
}

function emptyCheck(){
	console.log($("#GYM_ID").val())
	if($("#GYM_ID").val() == ""){
		$("#newInfo").find("select[name='start']").wrapInner(loadTime("00:00:00", "23:30:00"));
		$("#newInfo").find("select[name='end']").wrapInner(loadTime("00:00:00", "23:30:00"));
		
		$("#registerInfoBox").css("display", "block");
		$("#gymInfo").css("display", "none");
	}
	else{ 
		$("#registerInfoBox").css("display", "none");
		$("#gymInfo").css("display", "block");
	}
}

var map;
function initMap() {
	var myLatLng = new google.maps.LatLng(latitude, longitude);
    var mapOptions = {
        zoom: 16,
        center: myLatLng
    };
    map = new google.maps.Map(document.getElementById('map'), mapOptions);
    var marker = new google.maps.Marker({
        position: myLatLng,
        map: map
    });
    
    geocoder =  new google.maps.Geocoder();
    geocoder.geocode({'latLng' : myLatLng}, function(results, status) {
		if (status == google.maps.GeocoderStatus.OK) {
			if (results[1]) {	
				$("#locationInput").text(results[1].formatted_address);
				
				currentLatLng = new Array();
				currentLatLng.push(results[1].geometry.location.lat());
				currentLatLng.push(results[1].geometry.location.lng());
			}
		}
	});
    
    google.maps.event.addListener(map, 'click', function(event) {
		marker = placeMarker(event.latLng, marker);
		geocoder.geocode({'latLng' : event.latLng}, function(results, status) {
			if (status == google.maps.GeocoderStatus.OK) {
				if (results[1]) {	
					$("#locationInput").text(results[1].formatted_address);

					currentLatLng = new Array();
					currentLatLng.push(results[1].geometry.location.lat());
					currentLatLng.push(results[1].geometry.location.lng());
				}
			}
		});
	});
}

function getLocation(){
	if(navigator.geolocation){
		navigator.geolocation.getCurrentPosition(locationSuccess, locationError, geo_options);
	}else{
		console.log("지오 로케이션 없음")
	}
};

//getLocation
var latitude, longitude;
function locationSuccess(p){
	latitude = p.coords.latitude,
	longitude = p.coords.longitude;
	initMap();
}

function locationError(error){
	var errorTypes = {
	    0 : "무슨 에러냥~",
	    1 : "허용 안눌렀음",
	    2 : "위치가 안잡힘",
	    3 : "응답시간 지남"
	};
	var errorMsg = errorTypes[error.code];
}
 
var geo_options = {
	enableHighAccuracy: true,
	maximumAge        : 30000,
	timeout           : 27000
};

function placeMarker(location, marker) {
	marker.setMap(null)
	marker = new google.maps.Marker({
		position: location, 
		map: map
	});
	map.setCenter(location);
	return marker;
}
</script>
<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyA0nWEFZlzN4zupghK8m85mEIkkMR0D03U&callback=initMap" async defer></script>
    
<style>
.row > table {
	width: 100%;
}
#gymInfo {
	width: 100%;
	margin: auto;
	margin-bottom: 20px;
}

#gymInfo tbody {
	width: 100%;
	margin: auto;
}

#gymInfo th {
	height: 60px;
}


#registerInfoBox {
	
	width:100%;
	margin: 0px 50px 0px 50px;
	padding: 10px 30px 10px 30px;
	border: 1.5px solid rgba(113, 156, 254, 0.9);
}

#newInfo {
/* 	width: 100%; */
	margin: auto;
}

#newInfo tr {
	height: 90px;
}

#newInfo td {
	width: 15%;
	text-align: center;
	vertical-align:middle;
}

#newInfo input {
	width: 100%;
}

.facilityInfo {
	width: 95%;
	float: right;
	margin-bottom: 30px;
}

.facilityInfo img {
	width: 450px;
	height: 250px;
}

#imgLoca {
	width: 100%;
	height: 250px;
	margin: 0px 0px 0px 0px;
	overflow: hidden;
}

.facilityInfo th{
	height: 60px;
}	

.facilityInfo tr {
	height: 50px;
}

.facilityInfo td {
	width: 15%;
	text-align: center;
}

.facilityInfo input, #groundList input {
	width: 90%;
	text-align: center;
}

#groundList {
	width: 95%;
	float: right;
	margin-bottom: 30px;
}

#groundList th{
	height: 40px;
	border-top-width: 2px;
	border-top-style: solid;
	border-top-color: rgba(113, 156, 254, 0.9);
}	

#groundList tr {
	height: 60px;
}

#groundList td {
	width: 15%;
	text-align: center;
}

.okBtn, .deleteBtn {
	width: 80px;
}

#registerBtn, #cancelBtn, #addBtn, .editBtn {
	width: 80px;
	float: right;
}

.editCompleteBtn{
	width: 80px;
	float: right;
	display: none;	
}

#map {
	margin-top: -30px;
	width: 555px;
	height: 255px;
}

#emptyText {
	display: none;
	text-align: center;
	margin:auto;
	margin-top: 30px;
	font-size: 30px;
}

.radioBtn {
	width: 10px;
}

.ql-editor {
	display: none;
}

.ql-snow {
	width : 28%;
	text-align: center;
	float:left;
}

#figureOK {
	margin-top: 10px;s
}
</style>


<section class="w3ls-bnrbtm py-5" id="about">
	<div class="container py-xl-5 py-lg-3">
		<h3 class="title-w3 mb-md-5 mb-sm-4 mb-2 text-center font-weight-bold">Gym Information</h3>
		<div class="row" style="width: 100%">
			<div id="registerInfoBox">
				<table id="newInfo">
					<tr style="height: 50px;">
<!-- 						<th colspan="4"> -->
							Register Gym
						</th>
					</tr>
					
					<tr>
						<td>Name</td>
						<td><input id="nameInput" type="text"></td>
						<td style="width: 10%">Location</td>
						<td style="width: 25%" id="locationInput"></td>
					</tr>
					
					<tr>
						<td>Figure</td>
						<td>
							<div id="editor" style="height: 0px"></div>
							<!-- Initialize Quill editor -->
							<script>
								var toolbarOptions = [
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
									$("#figureOK").text("File Uploaded!")
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
								    /*
								    temp = replaceAll(temp, '<', '&lt;');
								    temp = replaceAll(temp, '>', '&gt;'); */   
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
							<label id="figureOK" style="margin-top=10px"></label>
							<input type="hidden" rows="10" cols="70"
								class="form-control input-smm " id="contents" name="contents" />
							
						</td>
						<td rowspan="3" colspan="2" style="text-align:right;">
							<div id="map" style="display: inline-block"></div>
						</td>
					</tr>
					
					<tr>
						<td>Usable Time</td>
						<td>
							<select name="start"></select>
							<select name="end"></select>
						</td>
					</tr>
					
					<tr>
						<td>Info</td>
						<td><input id="info" type="text"></td>
					</tr>	
					
					<tr style="height: 50px;">
						<td colspan="4">
							<button id="cancelBtn" type="button">CANCEL</button>
							<button id="registerBtn" type="button" style="margin-right: 10px;">OK</button>
						</td>
					</tr>
					
				</table>
			</div>
			
			<table id="gymInfo">
				<tr>
					<th style="border-top-width: 2px;
						border-top-style: solid;
						border-top-color: rgba(113, 156, 254, 0.9);
						
						border-bottom-width: 2px;
						border-bottom-style: solid;
						border-bottom-color: rgba(113, 156, 254, 0.9);"
						id="gymName"></th>
				</tr>
				<tr>
					<td>
						<table id="facilityInfoBox">
							<tr>
								<td>
								<table class="facilityInfo">
									<tr>
										<th></th>
										<th></th>
										<th style="text-align:right; vertical-align:middle;">
											<button class="editBtn" type="button">EDIT</button>
											<button class="editCompleteBtn" type="button">OK</button>
										</th>
									</tr>
									<tr>
										<td rowspan="3">
											<!-- <img src="/images/about.jpg"> -->
											<div id="imgLoca">
												${list.fig}
											</div>
										</td>
										<td>Location</td>
										<td id="gymLocation"></td>
									</tr>
									<tr>
										<td>Usable Time</td>
										<td id="gymUsableTime"></td>
									</tr>
									<tr>
										<td rowspan="2">Description</td>
										<td rowspan="2" id="gymDescription"></td>
									</tr>
								</table>
								
								<table id="groundList">
									<tr>
										<th colspan = "5">
											구장 목록
											<button id="addBtn" type="button" style="float:right">ADD</button>
										</th>
									</tr>
									<tr style="border-bottom-width: 2px;
												border-bottom-style: solid;
												border-bottom-color: rgba(113, 156, 254, 0.9);
												font-weight: bold;">
										<td>이름</td>
										<td>이용 시간</td>
										<td>수용 인원</td>
										<td>종목</td>
										<td>확인</td>
									</tr>
									<c:if test="${facilityList.size() ne 0 }">
				                        <c:forEach items="${facilityList}" var="list" varStatus="state">
				                           <tr>
				                           		<td>${list.f_name}</td>
												<td>${list.time}</td>
												<td>${list.f_participant}</td>
												<td>${list.f_subject}</td>
												<td>
				                              		<button class='okBtn' type='button'>EDIT</button>
													<button class='deleteBtn' type='button'>DELETE</button>
												</td>
												<td style="display: none">${list.f_id}</td>
				                           </tr>
				                        </c:forEach>
									</c:if>
								</table>
								</td>
							</tr>
						</table>
					</td>
				</tr>
			</table>
		</div>
	</div>
</section>

<input type="hidden" id="ADMIN_UDID" value="${list.UDID}"/>
<input type="hidden" id="GYM_ISEMPTY" value="${list.isEmpty}"/>
<input type="hidden" id="GYM_ID" value="${list.id}"/>
<input type="hidden" id="GYM_NAME" value="${list.name}"/>
<input type="hidden" id="GYM_FIG" value="${list.fig}"/>
<input type="hidden" id="GYM_LOC" value="${list.location}"/>
<input type="hidden" id="GYM_LAT" value="${list.latitude}"/>
<input type="hidden" id="GYM_LONG" value="${list.longitude}"/>
<input type="hidden" id="GYM_STARTTIME" value="${list.startTime}"/>
<input type="hidden" id="GYM_ENDTIME" value="${list.endTime}"/>
<input type="hidden" id="GYM_INFO" value="${list.info}"/>

<input type="hidden" id="FACILITY_ISEMPTY" value="${facilityMap.f_isEmpty}"/>

<div id="newFacility" style="display: none">
<table>
	<tr>
		<td>
			<input type="text" placeholder="ex)축구장" name="f_name"/>
		</td>
		<td>
			<select name="start"></select>
			<select name="end"></select>
		</td>
		<td><input type="number" max="30" min="1" name="f_participant"/></td>
		<td>
			<select name="f_subject">
				<option value="1" selected="selected">soccer</option>
				<option value="2">baseball</option>
				<option value="3">basketball</option>
				<option value="4">badminton</option>
			</select>
		</td>
		<td>
            <button class='okBtn' type='button'>OK</button>
			<button class='deleteBtn' type='button'>DELETE</button>
		</td>
		<td name="f_id" style="display: none"></td>
	</tr>
</table>
</div>


<jsp:include page="/WEB-INF/jsp/footer.jsp" flush="true"></jsp:include>