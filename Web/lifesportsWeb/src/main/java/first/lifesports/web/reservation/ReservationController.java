package first.lifesports.web.reservation;

import java.text.DateFormat;
import java.util.Date;
import java.util.Locale;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import first.lifesports.web.main.HomeController;
import first.lifesports.web.schedule.ScheduleService;;

/**
 * Handles requests for the application home page.
 */
@Controller
public class ReservationController {
	
	@Resource(name="ReservationService")
	ReservationService reservationService;
	
	private static final Logger logger = LoggerFactory.getLogger(HomeController.class);
	
	@RequestMapping(value = "/reservation/reservationView.do")
	public String reservationView(HttpServletRequest request, Model model) {
		
		return "/reservation/reservationView";
	}
	
}
