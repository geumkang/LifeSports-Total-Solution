package first.lifesports.web.authority;

import java.text.DateFormat;
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
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import first.utils.CommUtils;
import first.lifesports.web.main.HomeController;;

/**
 * Handles requests for the application home page.
 */
@Controller
public class AuthorityController {
	
	@Resource(name="AuthorityService")
	AuthorityService authorityService;
	
	private static final Logger logger = LoggerFactory.getLogger(HomeController.class);
	
	@RequestMapping(value = "/login.do")
	public String loginView(Locale locale, Model model) {
		logger.info("Welcome home! The client locale is {}.", locale);
		
		Date date = new Date();
		DateFormat dateFormat = DateFormat.getDateTimeInstance(DateFormat.LONG, DateFormat.LONG, locale);
		
		String formattedDate = dateFormat.format(date);
		
		model.addAttribute("serverTime", formattedDate );
		
		return "/authority/login";
	}
	
	@RequestMapping(value = "/loginTry.do")
	public String loginTry(HttpServletRequest request, Model model) {
		
		Map reqMap = getRequestMap(request);
		
		reqMap.put("userId", "admin");
		reqMap.put("passWord", "admin");
		
		List<Map<String, Object>> resMap = authorityService.selectUser(reqMap);
		
		return "main";
	}
	
	/*
	 * @RequestMapping("/testAjax.do") public ModelAndView
	 * testAjax(@ModelAttribute("VO") CommentVO commentVO, ModelMap model) throws
	 * Exception {
	 * 
	 * Map resultMap = new HashMap(); resultMap.put("result1", "1");
	 * resultMap.put("result2", "2");
	 * 
	 * ModelAndView modelAndView = new ModelAndView("jsonView",resultMap);
	 * 
	 * return modelAndView; }
	 */
	
	@RequestMapping(value = "/testAjax.do")
	  @ResponseBody
	  public Map<String, Object> goAjax5(@RequestBody Map<String, Object> map) throws Exception{
	     
	    System.out.println("userId:"+map.get("userId"));
	    System.out.println("userPass:"+map.get("userPass"));
	    System.out.println("type:"+map.get("type"));
	     
	     
	    Map<String, Object> resultMap = new HashMap<String, Object>();
	    map.put("result", "1");
	    return resultMap;
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
