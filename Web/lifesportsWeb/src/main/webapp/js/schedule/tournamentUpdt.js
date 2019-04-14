function updtBtn()
{
	var f = document.frm;

	frm.action = "/schedule/updtTournament.do";
	frm.target = "_self";
	frm.submit();
}

function cancelBtn(){
	var f = document.frm;

	frm.action = "/schedule/tournament.do";
	frm.target = "_self";
	frm.submit();
	
}