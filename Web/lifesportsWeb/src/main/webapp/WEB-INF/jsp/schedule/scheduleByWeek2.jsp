<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<jsp:include page="/WEB-INF/jsp/header.jsp" flush="true"></jsp:include>
<jsp:include page="/WEB-INF/jsp/topMenu.jsp" flush="true"></jsp:include>

<link href='/webResource/fullcalendar/packages/core/main.css' rel='stylesheet' />
<link href='/webResource/fullcalendar/packages/daygrid/main.css' rel='stylesheet' />
<link href='/webResource/fullcalendar/packages/timegrid/main.css' rel='stylesheet' />
<script src='/webResource/fullcalendar/packages/core/main.js'></script>
<script src='/webResource/fullcalendar/packages/interaction/main.js'></script>
<script src='/webResource/fullcalendar/packages/daygrid/main.js'></script>
<script src='/webResource/fullcalendar/packages/timegrid/main.js'></script>
<script src='/webResource/jquery-3.3.1.js'></script>
<script>

var calendar;
var currentEvent = null;
var currentColor = 0;
var colorList = ['rgba(255,0,0,0.5)', 'rgba(0,0,255,0.5)', 'rgba(0,255,0,0.5)', 'rgba(255,255,0,0.5)']

document.addEventListener('DOMContentLoaded', function() {
	var calendarEl = document.getElementById('calendar');
    
    // today calculate
    var date = new Date(); 
    var year = date.getFullYear(); 
    var month = new String(date.getMonth()+1); 
    var day = new String(date.getDate()); 

    if(month.length == 1){ 
      month = "0" + month;
    } 
    if(day.length == 1){ 
      day = "0" + day;
    } 

    calendar = new FullCalendar.Calendar(calendarEl, {
		plugins: [ 'interaction', 'timeGrid' ],
		defaultDate: year + "-" + month + "-" + day,
		editable: true,
		eventLimit: true, // allow "more" link when too many events
		selectable: true,
		selectMirror: true,
		select: function(info) {
			currentEvent = info;
			displayList(info);
		},
		eventClick: function(info) {
			currentEvent = info;
			loadPlan(info);
		},
		events: [
		]
    });

    calendar.render();
});



$(document).ready(function() {
	$('#addBtn').click(function(){
		registerPlan();
	});
	$('#editBtn').click(function(){
		editPlan();
	});
	$('#delBtn').click(function(){
		deletePlan();
	});
	$('#cancelBtn').click(function(){
		$("#content").css("display", "none");
		$("#calendar").css("marginLeft", "auto");
	});
	
	$(".colorBtn").each(function(index, item){
		$(item).css("backgroundColor", colorList[index]);
		$(item).click(function(){
			$('.colorBtn').each(function(index2, item2){
				$(item2).text("");
			});
			$(item).text("V");
			currentColor = index;
		})
	});
	$("#color1").text("V");
});

function dateFormat(input){
	var date = new Date(input);
    var year = date.getFullYear(); 
    var month = new String(date.getMonth()+1); 
    var day = new String(date.getDate()); 
	var hour = new String(date.getHours());
	var minute = new String(date.getMinutes());
	
    if(month.length == 1){ 
		month = "0" + month;
    } 
    if(day.length == 1){ 
		day = "0" + day;
    } 
    if(hour.length == 1){ 
    	hour = "0" + hour;
	}
    if(minute.length == 1){ 
    	minute = "0" + minute;
	} 

	return year + "-" + month + "-" + day + "T" + hour + ":" + minute + ":00";
}

function displayList(info){
	
	$("#addBtn").css("display", "block");
	$("#editBtn").css("display", "none");
	$("#delBtn").css("display", "none");
	$("#cancelBtn").css("display", "block");
	
	if($("#content").css("display") == "none"){
		$("#calendar").css("marginLeft", "-30px");
		$("#content").css("display", "block");
		$("#register tr").eq(2).children().eq(1).html(dateFormat(info.start));
		$("#register tr").eq(3).children().eq(1).html(dateFormat(info.end));
	}
	else{
		$("#register tr").eq(0).children().eq(1).children().eq(0).val("");
		$("#register tr").eq(1).children().eq(1).children().eq(0).val("");
		$("#register tr").eq(2).children().eq(1).html(dateFormat(info.start));
		$("#register tr").eq(3).children().eq(1).html(dateFormat(info.end));
	}
}

function registerPlan(){
	var title = $("#register tr").eq(0).children().eq(1).children().eq(0).val();
	if(title == "")
		alert("Title is Empty");
	else{
		if(currentEvent != null){
			calendar.addEvent({
				title: title,
				start: currentEvent.start,
				end: currentEvent.end,
				description: $("#register tr").eq(1).children().eq(1).children().eq(0).val(),
				allDay: currentEvent.allDay,
				backgroundColor: colorList[currentColor]
			});
		}
		currentEvent = null;
	}
}

function loadPlan(info){
	$("#addBtn").css("display", "none");
	$("#editBtn").css("display", "block");
	$("#delBtn").css("display", "block");
	$("#cancelBtn").css("display", "block");
	
	if($("#content").css("display") == "none"){
		$("#calendar").css("marginLeft", "-80px");
		$("#content").css("display", "block");
		$("#register tr").eq(0).children().eq(1).children().eq(0).val(info.event.title);
		$("#register tr").eq(1).children().eq(1).children().eq(0).val(info.event.extendedProps.description);
		$("#register tr").eq(2).children().eq(1).html(dateFormat(info.event.start));
		$("#register tr").eq(3).children().eq(1).html(dateFormat(info.event.end));
	}
	else{
		$("#register tr").eq(0).children().eq(1).children().eq(0).val(info.event.title);
		$("#register tr").eq(1).children().eq(1).children().eq(0).val(info.event.extendedProps.description);
		$("#register tr").eq(2).children().eq(1).html(dateFormat(info.event.start));
		$("#register tr").eq(3).children().eq(1).html(dateFormat(info.event.end));
	}
}

function editPlan(){
	if(currentEvent != null){
		currentEvent.event.setProp('title', $("#register tr").eq(0).children().eq(1).children().eq(0).val());
		currentEvent.event.setExtendedProp('description', $("#register tr").eq(1).children().eq(1).children().eq(0).val());
	}
	currentEvent = null;
}

function deletePlan(){
	if(currentEvent != null){
		currentEvent.event.remove();
	}
	currentEvent = null;
	$("#content").css("display", "none");
	$("#calendar").css("marginLeft", "auto");
	$("#register tr").eq(0).children().eq(1).children().eq(0).val("");
	$("#register tr").eq(1).children().eq(1).children().eq(0).val("");
}


</script>
<style>

	body {
		/* margin: 40px 10px; */
		padding: 0;
		/* font-family: Arial, Helvetica Neue, Helvetica, sans-serif; */
		font-size: 14px;
	}

	#calendar {
		max-width: 900px;
		margin: 0 auto;
	}

	#register tr{
		height: 40px;
	}
	
	#btnBlock input{
		margin-bottom: 10px;
		width: 100%;
	}
	
	.colorBtn{
		width:25px;
		height:25px;
		border: none;
		color: white;
		text-align: center;
		text-decoration: none;
		display: inline-block;
		font-size: 16px;
		cursor: pointer;
	}

</style>

<section class="w3ls-bnrbtm py-5" id="about">
	<div class="container py-xl-5 py-lg-3">
		<h3 class="title-w3 mb-md-5 mb-sm-4 mb-2 text-center font-weight-bold">Weekly Schedule</h3>
		<div class="row">
			<div id="calendar"></div>
			<div id="content" style="float:left; display:none">
				<h3 style="margin-bottom: 15px;">Register Plan</h3>
				<table id="register">
					<tr>
						<td>TITLE</td>
						<td><input type="text"></td>
					</tr>
					
					<tr>
						<td>DESCRIPTION</td>
						<td><input type="text"></td>
					</tr>
					
					<tr>
						<td>START</td>
						<td></td>
					</tr>
					
					<tr>
						<td>END</td>
						<td></td>
					</tr>
					
					<tr>
						<td>COLOR</td>
						<td colspan="3">
							<table style="width:100%">
								<tr>
									<td><button id="color1" class="colorBtn"></button></td>
									<td><button id="color2" class="colorBtn"></button></td>
									<td><button id="color3" class="colorBtn"></button></td>
									<td><button id="color4" class="colorBtn"></button></td>
								</tr>
							</table>
						</td>
					</tr>
				</table>
				<div id="btnBlock">
					<input id="addBtn" type="button" value="ADD" style="display:none">
					<input id="editBtn" type="button" value="EDIT" style="display:none">
					<input id="delBtn" type="button" value="DELETE" style="display:none">
					<input id="cancelBtn" type="button" value="CANCEL" style="display:none">
				</div>
			</div>
		</div>
	</div>
</section>

<jsp:include page="/WEB-INF/jsp/footer.jsp" flush="true"></jsp:include>