<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%> 
<jsp:include page="/WEB-INF/jsp/header.jsp" flush="true"></jsp:include>
<jsp:include page="/WEB-INF/jsp/topMenu.jsp" flush="true"></jsp:include>
<script src='/webResource/jquery-3.3.1.js'></script>

						    
<script>
$(document).ready(function() {
	
	loadData();
	
	$("#addBtn").on("click", function(){
		$("#newInfoBox").css("display", "block");
	});
	
	$(document).on("click", ".editCompleteBtn", function(){
		var text = $(this).parent().parent().siblings().eq(0).find('input').val();
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
	
	$(document).on("click", ".deleteBtn", function(){
		$(this).parents(".facilityInfo").parent().parent().remove();
		emptyCheck();
	});
	
	$("#okBtn").on("click", function(){
		$("#facilityInfoBox").append("<tr><td><table class='facilityInfo'><tr><th>A. 잔디 구장</th><th></th><th style='text-align:right; vertical-align:middle;'><button class='deleteBtn' style='margin-left: 10px;' type='button'>DELETE</button><button class='editBtn' type='button'>EDIT</button><button class='editCompleteBtn' type='button'>OK</button></th></tr><tr><td rowspan='5'><img src='/images/about.jpg'></td><td>Name</td><td>ChoongAng</td></tr><tr><td>Location</td><td>서울특별시 동작구 흑석로 123</td></tr><tr><td>Usable Time</td><td>9:00 ~ 21:00</td></tr><tr><td>123</td><td>123</td></tr><tr><td>123</td><td>123</td></tr></table></td></tr>")
		$("#newInfo input").val("");
		$("#newInfoBox").css("display", "none");
		emptyCheck();
	});
	
	$("#cancelBtn").on("click", function(){
		$("#newInfo input").val("");
		$("#newInfoBox").css("display", "none");	
	});
	
	getLocation();
    
});

function loadData(){
	
	emptyCheck();
}

function emptyCheck(){
	if($("#facilityInfoBox").find('tr').length == 0)
		$("#emptyText").css("display", "block");
	else 
		$("#emptyText").css("display", "none");
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
			}
		}
	});
    
    google.maps.event.addListener(map, 'click', function(event) {
		marker = placeMarker(event.latLng, marker);
		geocoder.geocode({'latLng' : event.latLng}, function(results, status) {
			if (status == google.maps.GeocoderStatus.OK) {
				if (results[1]) {	
					$("#locationInput").text(results[1].formatted_address);
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

#gymInfo th {
	height: 60px;
	border-top-width: 2px;
	border-top-style: solid;
	border-top-color: rgba(113, 156, 254, 0.9);
	
	border-bottom-width: 2px;
	border-bottom-style: solid;
	border-bottom-color: rgba(113, 156, 254, 0.9);
}


#newInfoBox {
	display: none;
	width:100%;
	margin: 0px 50px 0px 50px;
	padding: 10px 30px 10px 30px;
	border: 1.5px solid rgba(113, 156, 254, 0.9);
}

#newInfo {
	width: 100%;
	margin: auto;
}

#newInfo tr {
	height: 90px;
}

#newInfo td {
	width: 15%;
	text-align: center;
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
	width: 100%;
	height: 200px;
	margin: 0px 0px 0px 0px;
}

.facilityInfo th{
	height: 60px;
}	

.facilityInfo tr {
	height: 30px;
}

.facilityInfo td {
	width: 15%;
	text-align: center;
}

.facilityInfo input {
	width: 100%;
	text-align: center;
}


#okBtn, #cancelBtn, #addBtn, .editBtn, .deleteBtn {
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
</style>


<section class="w3ls-bnrbtm py-5" id="about">
	<div class="container py-xl-5 py-lg-3">
		<h3 class="title-w3 mb-md-5 mb-sm-4 mb-2 text-center font-weight-bold">Gym Information</h3>
		<div class="row" style="width: 100%">
			<table id="gymInfo">
				<tr>
					<th>1. 중앙대학교</th>
					<th>
						<button id="addBtn" type="button">ADD</button>
					</th>
				</tr>
			</table>
			
			<div id="newInfoBox">
				<table id="newInfo">
					<tr style="height: 50px;">
						<th colspan="4">
							New Gym
						</th>
					</tr>
					
					<tr>
						<td>Name</td>
						<td><input id="nameInput" type="text"></td>
						<td style="width: 10%">Location</td>
						<td style="width: 25%" id="locationInput"></td>
					</tr>
					
					<tr>
						<td>234</td>
						<td><input id="234Input" type="text"></td>
						<td rowspan="3" colspan="2" style="text-align:right;">
							<div id="map" style="display: inline-block"></div>
						</td>
					</tr>
					
					<tr>
						<td>Usable Time</td>
						<td><input id="timeInput" type="text"></td>
					</tr>
					
					<tr>
						<td>234</td>
						<td><input id="234Input" type="text"></td>
					</tr>
					
					<tr style="height: 50px;">
						<td colspan="4">
							<button id="cancelBtn" type="button">CANCEL</button>
							<button id="okBtn" type="button" style="margin-right: 10px;">OK</button>
						</td>
					</tr>
					
				</table>
			</div>
			
			<table id="facilityInfoBox">
				<tr>
					<td>
					<table class="facilityInfo">
						<tr>
							<th>A. 잔디 구장</th>
							<th></th>
							<th style="text-align:right; vertical-align:middle;">
								<button class="deleteBtn" style="margin-left: 10px;" type="button">DELETE</button>
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
			<label id="emptyText">List is Empty</label>
		</div>
	</div>
</section>

<jsp:include page="/WEB-INF/jsp/footer.jsp" flush="true"></jsp:include>