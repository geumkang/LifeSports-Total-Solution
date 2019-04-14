<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="f" uri="/WEB-INF/tld/f.tld"%>

<%

Object o_userId = session.getAttribute("id");
Object o_userName = session.getAttribute("name");

String userId;
String userName;
if(o_userId != null){
	userId = o_userId.toString();
	userName = o_userName.toString();
}
else{
	userId = "";
	userName = "";
}
%>

<c:set var="sessionId" value="<%=userId%>" />
<c:set var="sessionName" value="<%=userName%>" />

<!-- header -->
    <header>
        <div class="container">
            <div class="header d-lg-flex justify-content-between align-items-center py-2 px-sm-2 px-1">
                <!-- logo -->
                <div id="logo">
                    <h1><a href="/main.do">LifeSports</a></h1>
                </div>
                <!-- //logo -->
                <!-- nav -->
                <div class="nav_w3ls ml-lg-5">
                    <nav>
                        <label for="drop" class="toggle">Menu</label>
                        <input type="checkbox" id="drop" />
                        <ul class="menu">
                            <li><a href="/main.do">Home</a></li>
                            <li><a href="/myGym/myGymUpdate.do">My Gym</a></li>
                            <li>
                                <a href="#">Schedule<span class="fa fa-angle-down" aria-hidden="true"></span></a>
                                <input type="checkbox" id="drop-2" />
                                <ul>
                                    <li><a href="/schedule/scheduleByMonth.do" class="drop-text">Holyday Management</a></li>
                                    <li><a href="/schedule/scheduleByWeek.do" class="drop-text">Schedule Management</a></li>
                                    <!-- <li><a href="/schedule/scheduleByWeek.do" class="drop-text">Reservation Start Date</a></li> -->
                                    <li><a href="/schedule/tournament.do" class="drop-text">Tournament</a></li>
                                </ul>
                            </li>
                            <li><a href="/reservation/reservationView.do">Reservations</a></li>
                            <c:if test="${sessionId eq ''}">
                            	<li><a href="/login.do">Log In </a></li>
                            </c:if>
                            <c:if test="${sessionId ne ''}">
                            	<li><a href="/logout.do">Logout </a></li>
                            	<li>${sessionName}님 안녕하세요!</li>
                            </c:if>
                            
                            <!-- <li><a href="#contact">Contact</a></li>
                            <li><a href="login.html">Login</a></li>
                            <li><a href="register.html">Register</a></li> -->
                        </ul>
                    </nav>
                </div>
                <!-- //nav -->
            </div>
        </div>
    </header>
    <!-- //header -->