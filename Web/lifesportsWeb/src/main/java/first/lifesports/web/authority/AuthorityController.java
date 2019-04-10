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
import net.minidev.json.JSONObject;
import net.sf.json.JSONArray;
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
	
	
	@RequestMapping(value = "/testAjax.do", method=RequestMethod.POST, headers="Accept=*/*",produces = "application/json")
	@ResponseBody
	public String testAjax(@RequestBody String map) throws Exception{
		
		Map reqMap = CommUtils.convertJSONstringToMap(map);
		reqMap.put("test", "star7357");
		//Server Call
		List<Map<String, Object>> res = authorityService.testMethod(reqMap);
		
		//Data Injection
		String id = (String) res.get(0).get("id");
		String name = (String) res.get(0).get("name");
		
		//Map maker
		Map<String, Object> resMap = new HashMap();
		resMap.put("id", id);
		resMap.put("name", name);
		
		return CommUtils.getJsonStringFromMap(resMap).toJSONString();
	}

}
