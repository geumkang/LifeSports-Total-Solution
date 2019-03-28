<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>

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
                                    <li><a href="/schedule/scheduleByMonth.do" class="drop-text">Per Month</a></li>
                                    <li><a href="/schedule/scheduleByWeek.do" class="drop-text">Per Week</a></li>
                                    <li><a href="/schedule/scheduleByWeek.do" class="drop-text">Reservation Start Date</a></li>
                                    <li><a href="/schedule/tournament.do" class="drop-text">Tournament</a></li>
                                </ul>
                            </li>
                            <li><a href="/reservation/reservationView.do">Reservations</a></li>
                            <li><a href="/login.do">Log In</a></li>
                            
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