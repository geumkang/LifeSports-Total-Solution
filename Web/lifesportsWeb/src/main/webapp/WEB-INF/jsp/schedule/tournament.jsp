<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%> 
<jsp:include page="/WEB-INF/jsp/header.jsp" flush="true"></jsp:include>
<jsp:include page="/WEB-INF/jsp/topMenu.jsp" flush="true"></jsp:include>

<section class="w3ls-bnrbtm py-5" id="about">
	<div class="container py-xl-5 py-lg-3">
		<h3 class="title-w3 mb-md-5 mb-sm-4 mb-2 text-center font-weight-bold">Gym Information</h3>
		<div class="row">
			<div class="col-lg-6 text-center">
				<img src="/images/about.jpg" alt="about" class="img-fluid mt-4" />
			</div>
			<div class="col-lg-6 pr-xl-5 mt-4">
				<form name="myGymUpdate_form01" id="myGymUpdate_form01" method="post" onsubmit="return false;">
				
		            <table class="normalTable">
						<colgroup>
							<col style="width:164px;">
							<col style="width:*;">
						</colgroup>
						<tbody>
							<tr>
								<th><span class="text-red">* </span>Facility Name</th>
								<td>
									<div class="row">
										<div class="col-xs-4">
											<input type="text" class="form-control input-sm" name="facilityName" id="facilityName" value="">
										</div>
									</div>
								</td>
							</tr>
						</tbody>
					</table>
				
				</form>
			</div>
		</div>
	</div>
</section>

<jsp:include page="/WEB-INF/jsp/footer.jsp" flush="true"></jsp:include>