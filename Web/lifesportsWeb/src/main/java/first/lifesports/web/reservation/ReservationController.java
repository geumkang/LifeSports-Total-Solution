package first.lifesports.web.reservation;

import java.text.DateFormat;
import java.util.Date;
import java.util.Locale;

import javax.annotation.Resource;

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
	public String reservationView(Locale locale, Model model) {
		logger.info("Welcome home! The client locale is {}.", locale);
		
		Date date = new Date();
		DateFormat dateFormat = DateFormat.getDateTimeInstance(DateFormat.LONG, DateFormat.LONG, locale);
		
		String formattedDate = dateFormat.format(date);
		
		model.addAttribute("serverTime", formattedDate );
		
		return "/reservation/reservationView";
	}
	
}
