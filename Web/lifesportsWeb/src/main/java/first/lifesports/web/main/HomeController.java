package first.lifesports.web.main;

import java.text.DateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import first.utils.CommUtils;

/**
 * Handles requests for the application home page.
 */
@Controller
public class HomeController {
	
	@Resource(name="HomeService")
	private HomeService homeService;
	
	
	private static final Logger logger = LoggerFactory.getLogger(HomeController.class);
	
	/**
	 * Simply selects the home view to render by returning its name.
	 */
	@RequestMapping(value = "/main.do")
	public String home(Locale locale, Model model) {
		logger.info("Welcome home! The client locale is {}.", locale);
		
		Date date = new Date();
		DateFormat dateFormat = DateFormat.getDateTimeInstance(DateFormat.LONG, DateFormat.LONG, locale);
		
		String formattedDate = dateFormat.format(date);
		
		logger.info("");
		
		try {
			List a = homeService.selectBoardList(new HashMap());
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		model.addAttribute("serverTime", formattedDate );
		
		return "main";
	}
	
	
	@RequestMapping(value = "/ajaxTest.do")
	//@RequestParam(value="year") String year, @RequestParam(value="month") String month
	public String ajaxTest(HttpServletRequest request, Model model) {
		
		Map reqMap = getRequestMap(request);
		
		return "ss";
	}
	
	protected HashMap getRequestMap(HttpServletRequest req) {

		HashMap map = new HashMap();

		String ajaxFlag = req.getHeader("AjaxFlag");

		Enumeration enm = req.getParameterNames();
		String name = null;
		String value = null;
		String[] arr = null;

		while (enm.hasMoreElements()) {
			name = (String) enm.nextElement();
			arr = req.getParameterValues(name);

			if (name.startsWith("arr")) {
				if ("true".equals(ajaxFlag))
					map.put(name, CommUtils.decodeAjax(arr, "UTF-8"));
				else
					map.put(name, arr);
			} else {
				if (arr != null && arr.length > 0) {
					value = arr[0];
				} else {
					value = req.getParameter(name);
				}

				if ("true".equals(ajaxFlag))
					map.put(name, CommUtils.decodeAjax(value, "UTF-8"));
				else
					map.put(name, value);
			}
		}

		return map;
	}
}
