function tournamentView(serial)
{
	var form = document.frm;
	
	frm.serial.value = serial;
	frm.action = "/schedule/tournamentView.do";
	frm.target = "_self";
	frm.submit();
}