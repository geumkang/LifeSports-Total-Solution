<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<jsp:include page="/WEB-INF/jsp/header.jsp" flush="true"></jsp:include>
<jsp:include page="/WEB-INF/jsp/topMenu.jsp" flush="true"></jsp:include>

<link href='/webResource/fullcalendar/packages/core/main.css' rel='stylesheet' />
<link href='/webResource/fullcalendar/packages/daygrid/main.css' rel='stylesheet' />
<script src='/webResource/fullcalendar/packages/core/main.js'></script>
<script src='/webResource/fullcalendar/packages/interaction/main.js'></script>
<script src='/webResource/fullcalendar/packages/daygrid/main.js'></script>
<script src='/webResource/jquery-3.3.1.js'></script>

<script>

var calendar;
var currentEvent = null;


document.addEventListener('DOMContentLoaded', function() {
	var calendarEl = document.getElementById('calendar');
    
	calendar = new FullCalendar.Calendar(calendarEl, {
		plugins: [ 'interaction', 'dayGrid' ],
		defaultDate: dateFormat(new Date()),
		editable: true,
		eventLimit: true, // allow "more" link when too many events
		selectable: true,
		unselectAuto: true,
		dateClick: function(info) {
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

$(document).ready(function(){
	// 이전달 이동 버튼 클릭
	$('.fc-prev-button').click(function(){
		var selDate = calendar.getDate();
		var today = new Date();

		if(monthDiff(today, selDate) != -1){
			calendar.next();
			
			/*var date = calendar.getDate();
			var data = {
				"year": date.getFullYear(),
				"month": date.getMonth() + 1
			};
			
			$.ajax({
				headers: { 
				    Accept : "application/json"
				},
				url:"/prevMonth.do",
				type:"POST",
				data : JSON.stringify(data),
				contentType : "application/json; charset=UTF-8",
				success: function(result){
					console.log(result);
				},
				error: function(xhr, status, error) {
					alert(error);
				}
			}); */
		}
	});
	
	// 다음달 이동 버튼 클릭
	$('.fc-next-button').click(function(){
		var selDate = calendar.getDate();
		var today = new Date();
		console.log(selDate, today)
		console.log(monthDiff(today, selDate))
		if(monthDiff(today, selDate) != 0){
			calendar.prev();
						
			/*var date = calendar.getDate();
			var data = {
				"year": date.getFullYear(),
				"month": date.getMonth() + 1
			};
			
			$.ajax({
				headers: { 
				    Accept : "application/json"
				},
				url:"/nextMonth.do",
				type:"POST",
				data : JSON.stringify(data),
				contentType : "application/json; charset=UTF-8",
				success: function(result){
					console.log(result);
				},
				error: function(xhr, status, error) {
					alert(error);
				}
			}); */
		}
	});
	
});

function monthDiff(d1, d2) {
    var months;
    months = (d2.getFullYear() - d1.getFullYear()) * 12;
    months -= d1.getMonth() + 1;
    months += d2.getMonth();
    return months;
}

function dateFormat(input){
	var date = new Date(input);
    var year = date.getFullYear(); 
    var month = new String(date.getMonth()+1); 
    var day = new String(date.getDate()); 
	
    if(month.length == 1){ 
		month = "0" + month;
    } 
    if(day.length == 1){ 
		day = "0" + day;
    } 
    
	return year + "-" + month + "-" + day;
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
		margin: auto;
	}

</style>

<section class="w3ls-bnrbtm py-5" id="about">
	<div class="container py-xl-5 py-lg-3">
		<h3 class="title-w3 mb-md-5 mb-sm-4 mb-2 text-center font-weight-bold">Reservation Status</h3>
		<div class="row">
			<div id="calendar"></div>
		</div>
	</div>
</section>

<jsp:include page="/WEB-INF/jsp/footer.jsp" flush="true"></jsp:include>