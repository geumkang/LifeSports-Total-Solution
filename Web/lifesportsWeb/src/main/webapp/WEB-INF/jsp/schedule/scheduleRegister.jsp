<!DOCTYPE HTML>
<html lang="en">

<script src='/webResource/jquery-3.3.1.js'></script>

<script type="text/javascript">

function _GET(search) {
    var obj = {};
    var uri = decodeURI(search);
        uri = uri.slice(1,uri.length);

    var param = uri.split('&');
    
    for (var i = 0; i < param.length; i++) {
        var devide = param[i].split('=');
        obj[devide[0]] = devide[1];
    }

    return obj;
}

function registerData(){
	console.log($("#calendar", parent.opener.document).fullCalendar('addEventSource', source ));
}

$(document).ready(function() {
	
	var search = window.location.search;
    var getData =  _GET(search);

	$("#dateInput").append("<td>" + getData.val + "</td>");
	console.log("ready!")
});
</script>


<head>
</head>
<body>
	<table>
		<tr>
			<td>TITLE</td>
			<td><input type="text"></td>
		</tr>
		
		<tr>
			<td>DESCRIPTION</td>
			<td><input type="text"></td>	
		</tr>
		
		<tr id="dateInput">
			<td>DATE</td>
		</tr>	
	</table>
	<button type="button" onClick="registerData()">OK</button>
	<button type="button" onClick="window.close()">Cancel</button>
</body>
</html>