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

import org.codehaus.jackson.map.ObjectMapper;
import org.codehaus.jackson.type.TypeReference;
import org.codehaus.jackson.JsonProcessingException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
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
	
	@RequestMapping(value = "/testAjax.do", method=RequestMethod.POST, headers="Accept=*/*",produces = "application/json")
	@ResponseBody
	public Map<String, Object> goAjax5(@RequestBody String map) throws Exception{
		
		Map reqMap = CommUtils.convertJSONstringToMap(map);
		
		reqMap.put("test", "xodidth");
		
		//Server Call
		List<Map<String, Object>> res = authorityService.testMethod(reqMap);
		
		//Data Injection
		String id = (String) res.get(0).get("id");
		String name = (String) res.get(0).get("name");
		
		//Map maker
		Map<String, Object> resMap = new HashMap();
		resMap.put("result", id);

		return resMap;
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
