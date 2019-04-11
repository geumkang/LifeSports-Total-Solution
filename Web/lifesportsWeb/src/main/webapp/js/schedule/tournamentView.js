function deltBtn(serial)
{
	var form = document.frm;
	
	frm.serial.value = serial;
	frm.action = "/schedule/deltTournament.do";
	frm.target = "_self";
	frm.submit();
}

function updtBtn(serial)
{
	var form = document.frm;
	
	frm.serial.value = serial;
	frm.action = "/schedule/tournamentUpdt.do";
	frm.target = "_self";
	frm.submit();
}