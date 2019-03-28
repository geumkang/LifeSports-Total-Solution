<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>

<!-- header -->
    <header>
        <div class="container">
            <div class="header d-lg-flex justify-content-between align-items-center py-2 px-sm-2 px-1">
                <!-- logo -->
                <div id="logo">
                    <h1><a href="index.html">LifeSports</a></h1>
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
                            <li><a href="/schedule/scheduleByMonth.do">Schedule</a></li>
                            <li><a href="/reservation/reservationView.do">Reservations</a></li>
                            <li><a href="/login.do">Log In</a></li>
                            <li>
                                <a href="#">Reservation<span class="fa fa-angle-down" aria-hidden="true"></span></a>
                                <input type="checkbox" id="drop-2" />
                                <ul>
                                    <li><a href="#events" class="drop-text">Events</a></li>
                                    <li><a href="#what" class="drop-text">What We Do?</a></li>
                                    <li><a href="#courses" class="drop-text">Popular Courses</a></li>
                                    <li><a href="#stats" class="drop-text">Statistics</a></li>
                                    <li><a href="#gallery" class="drop-text">Gallery</a></li>
                                </ul>
                            </li>
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