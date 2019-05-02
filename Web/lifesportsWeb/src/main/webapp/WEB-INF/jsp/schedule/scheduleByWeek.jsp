<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jstl/fmt_rt"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="app" uri="/WEB-INF/tld/app.tld"%>
<%@ taglib prefix="f" uri="/WEB-INF/tld/f.tld"%>
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
	/*
	 * Global variables 
	 */

	var calendar;
	var currentEvent = null;
	var currentColor = 0;
	var colorList = [ 'rgba(255,0,0,0.5)', 'rgba(0,0,255,0.5)','rgba(0,255,0,0.5)', 'rgba(255,255,0,0.5)' ];
	var current_fac_id;

	/*
	 * Global variables (END) 
	 */

	/*
	 * document 
	 */

	document.addEventListener('DOMContentLoaded', function() {
		var calendarEl = document.getElementById('calendar');

		// today calculate

		calendar = new FullCalendar.Calendar(calendarEl, {
			plugins : [ 'interaction', 'timeGrid' ],
			defaultDate : new Date(),
			editable: true,
			eventLimit: true, // allow "more" link when too many events
			selectable: true,
			selectMirror: true,
			unselectAuto : false,
			select: function(info) {
				currentEvent = info;
				displayList(info);
			},
			eventClick: function(info) {
				currentEvent = info;
				loadPlan(info);
			},
			eventDrop : function(info) {
				currentEvent = info;
				editPlan();
			},
			eventResize : function(info) {
				currentEvent = info;
				editPlan();
			},
			events: [
			]
		});

		calendar.render();
	});

	$(document).ready(function() {

		current_fac_id = $('#fac_listBox').val();
		load_schedule();


		$('#fac_listBox').change(function() {
			current_fac_id = $('#fac_listBox').val();
			load_schedule();
		});

		// 이전달 이동 버튼 클릭
		$('.fc-prev-button').click(function() {
			load_schedule();
		});

		// 다음달 이동 버튼 클릭
		$('.fc-next-button').click(function() {
			load_schedule();
		});

		$('#addBtn').click(function() {
			registerPlan();
		});
		$('#editBtn').click(function() {
			editPlan();
		});
		$('#delBtn').click(function() {
			deletePlan();
		});
		$('#cancelBtn').click(function() {
			$("#content").css("display", "none");
			$("#calendar").css("marginLeft", "auto");
		});
	});

	/*
	 * document(END)
	 */

	/*
	 * AJAX call function
	 */

	function load_schedule() {
		var date = calendar.getDate();
		var data = {
			"fac_id" : current_fac_id,
			"year" : date.getFullYear(),
			"month" : date.getMonth() + 1
		};

		calendar.getEvents().forEach(function(item, index, array) {
			item.remove();
		});

		$.ajax({
			headers : {
				Accept : "application/json"
			},
			url : "/scheduleRequestAjax.do",
			type : "POST",
			data : JSON.stringify(data),
			contentType : "application/json; charset=UTF-8",
			success : function(result) {

				var result_ = new Array();
				result_ = result;

				result.resultList.forEach(function(item, index, array) {
					calendar.addEvent({
						title : item.name,
						start : item.startTime,
						end : item.endTime,
						description : item.name,
						schedule_type : item.type,
						schedule_id : item.id,
						allDay : false,
						backgroundColor : colorList[item.type - 1]
					});
				});

			},
			error : function(xhr, status, error) {
				alert(error);
			}
		});
	}

	function registerPlan() {
		var title = $("#register tr").eq(0).children().eq(1).children().eq(0).val();
		
		if (title == "")
			alert("Title is Empty");
		else {
			var description = $("#register tr").eq(1).children().eq(1).children().eq(0).val();
			var start = $("#register tr").eq(2).children().eq(1).html();
			var end = $("#register tr").eq(3).children().eq(1).html();
			var type = $("#schedule_typeBox").val();
			
			var data = {
				"fac_id": current_fac_id,
				"startDate": start,
				"endDate": end,
				"title": title,
				"detail": description,
				"type": type,
			};

			$.ajax({
				headers : {
					Accept : "application/json"
				},
				url : "/insertScheduleRequestAjax.do",
				type : "POST",
				data : JSON.stringify(data),
				contentType : "application/json; charset=UTF-8",
				success : function(result) {
					calendar.addEvent({
						title : title,
						start : start,
						end : end,
						description : description,
						allDay : false,
						backgroundColor : colorList[type-1],
						schedule_id: result,
						schedule_type: type
					});
					console.log("insert schedule complete");
				},
				error : function(xhr, status, error) {
					alert(error);
				}
			});
		}

		
	}
	

	function updateQuery(title, description) {
		var data = {
			"fac_id" : current_fac_id,
			"startDate" : dateFormat(currentEvent.event.start),
			"endDate" : dateFormat(currentEvent.event.end),
			"title" : title,
			"detail" : description,
			"type" : currentEvent.event.extendedProps.schedule_type,
			"schedule_id": currentEvent.event.extendedProps.schedule_id
		};

		$.ajax({
			headers : {
				Accept : "application/json"
			},
			url : "/updateScheduleRequestAjax.do",
			type : "POST",
			data : JSON.stringify(data),
			contentType : "application/json; charset=UTF-8",
			success : function(result) {
				console.log("update schedule complete")
			},
			error : function(xhr, status, error) {
				alert(error);
			}
		});
	}
	
	function deleteQuery() {
		var data = {
			"schedule_id": currentEvent.event.extendedProps.schedule_id
		};

		$.ajax({
			headers : {
				Accept : "application/json"
			},
			url : "/deleteScheduleRequestAjax.do",
			type : "POST",
			data : JSON.stringify(data),
			contentType : "application/json; charset=UTF-8",
			success : function(result) {
				console.log("delete schedule complete")
			},
			error : function(xhr, status, error) {
				alert(error);
			}
		});
	}

	/*
	 * AJAX call function (END)
	 */

	/*
	 * UTILS
	 */

	function dateFormat(input) {
		var date = new Date(input);
		var year = date.getFullYear();
		var month = new String(date.getMonth() + 1);
		var day = new String(date.getDate());
		var hour = new String(date.getHours());
		var minute = new String(date.getMinutes());
		var second = new String(date.getSeconds());

		if (month.length == 1) {
			month = "0" + month;
		}
		if (day.length == 1) {
			day = "0" + day;
		}
		if (hour.length == 1) {
			hour = "0" + hour;
		}
		if (minute.length == 1) {
			minute = "0" + minute;
		}
		if (second.length == 1) {
			second = "0" + second;
		}

		return year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second;
	}

	/*
	 * UTILS (END)
	 */

	/*
	 * CallBack
	 */

	function deletePlan() {
		if (currentEvent != null) {
			deleteQuery();
			currentEvent.event.remove();
		}
		currentEvent = null;
		$("#content").css("display", "none");
		$("#calendar").css("marginLeft", "auto");
		$("#register tr").eq(0).children().eq(1).children().eq(0).val("");
		$("#register tr").eq(1).children().eq(1).children().eq(0).val("");

	}

	function displayList(info) {
		$("#addBtn").css("display", "block");
		$("#editBtn").css("display", "none");
		$("#delBtn").css("display", "none");
		$("#cancelBtn").css("display", "block");

		if ($("#content").css("display") == "none") {
			$("#calendar").css("marginLeft", "-30px");
			$("#content").css("display", "block");
			$("#register tr").eq(2).children().eq(1).html(dateFormat(info.start));
			$("#register tr").eq(3).children().eq(1).html(dateFormat(info.end));
		} else {
			$("#register tr").eq(0).children().eq(1).children().eq(0).val("");
			$("#register tr").eq(1).children().eq(1).children().eq(0).val("");
			$("#register tr").eq(2).children().eq(1).html(dateFormat(info.start));
			$("#register tr").eq(3).children().eq(1).html(dateFormat(info.end));
		}
	}

	function loadPlan(info) {
		if(info.event.extendedProps.schedule_type == '3'){
			$("#content").css("display", "none");
			$("#calendar").css("marginLeft", "auto");
			return;
		}
		
		$("#addBtn").css("display", "none");
		$("#editBtn").css("display", "block");
		$("#delBtn").css("display", "block");
		$("#cancelBtn").css("display", "block");

		if ($("#content").css("display") == "none") {
			$("#calendar").css("marginLeft", "-80px");
			$("#content").css("display", "block");
			$("#register tr").eq(0).children().eq(1).children().eq(0).val(info.event.title);
			$("#register tr").eq(1).children().eq(1).children().eq(0).val(info.event.extendedProps.description);
			$("#register tr").eq(2).children().eq(1).html(dateFormat(info.event.start));
			$("#register tr").eq(3).children().eq(1).html(dateFormat(info.event.end));
			$("#schedule_typeBox").val(info.event.extendedProps.schedule_type);
		} else {
			$("#register tr").eq(0).children().eq(1).children().eq(0).val(info.event.title);
			$("#register tr").eq(1).children().eq(1).children().eq(0).val(info.event.extendedProps.description);
			$("#register tr").eq(2).children().eq(1).html(dateFormat(info.event.start));
			$("#register tr").eq(3).children().eq(1).html(dateFormat(info.event.end));
			$("#schedule_typeBox").val(info.event.extendedProps.schedule_type);
		}
	}

	function editPlan() {
		if (currentEvent != null) {
			
			var title = $("#register tr").eq(0).children().eq(1).children().eq(0).val();
			var description = $("#register tr").eq(1).children().eq(1).children().eq(0).val()
			
			if(title == ""){
				title = currentEvent.event.title;
				description = currentEvent.event.extendedProps.description
			}
			
			currentEvent.event.setProp('title', title);
			currentEvent.event.setExtendedProp('description', description);
			updateQuery(title, description);
		}

		currentEvent = null;
	}

	/*
	 * CallBack (END)
	 */

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

#register tr {
	height: 40px;
}

#btnBlock input {
	margin-bottom: 10px;
	width: 100%;
}
</style>

<section class="w3ls-bnrbtm py-5" id="about">
	<div class="container py-xl-5 py-lg-3">
		<h3 class="title-w3 mb-md-5 mb-sm-4 mb-2 text-center font-weight-bold">Schedule Management</h3>
		<div style="text-align: right; margin-bottom: 40px;">
			시설 선택 : <select id="fac_listBox">
				<c:forEach items="${fac_list}" var="elem" varStatus="status">
					<c:choose>
						<c:when test="${status.index eq '0'}">
							<option value="${elem.f_id}" selected="selected">${elem.f_name}</option>
						</c:when>
						<c:otherwise>
							<option value="${elem.f_id}">${elem.f_name}</option>
						</c:otherwise>
					</c:choose>
				</c:forEach>
			</select>
		</div>
		<div class="row">
			<div id="calendar"></div>
			<div id="content" style="float: left; display: none">
				<h3 style="margin-bottom: 20px;">Register Plan</h3>
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
						<td>TYPE</td>
						<td>
							<select id="schedule_typeBox">
								<option value="1" selected="selected">예약 경기</option>
								<option value="2">오픈 매칭</option>
								<option value="4">토너먼트</option>
							</select>
						</td>
					</tr>
				</table>
				<div id="btnBlock">
					<input id="addBtn" type="button" value="ADD" style="display: none">
					<input id="editBtn" type="button" value="EDIT"
						style="display: none"> <input id="delBtn" type="button"
						value="DELETE" style="display: none"> <input
						id="cancelBtn" type="button" value="CANCEL" style="display: none">
				</div>
			</div>
		</div>
	</div>
</section>

<jsp:include page="/WEB-INF/jsp/footer.jsp" flush="true"></jsp:include>