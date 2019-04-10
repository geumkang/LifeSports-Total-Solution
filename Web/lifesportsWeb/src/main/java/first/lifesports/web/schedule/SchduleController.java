package first.lifesports.web.schedule;

import java.text.DateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;

import javax.annotation.Resource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import first.lifesports.web.authority.AuthorityService;
import first.lifesports.web.main.HomeController;
import first.utils.CommUtils;;

/**
 * Handles requests for the application home page.
 */
@Controller
public class SchduleController {
	
	@Resource(name="ScheduleService")
	ScheduleService scheduleService;
	
	private static final Logger logger = LoggerFactory.getLogger(HomeController.class);
	
	@RequestMapping(value = "/schedule/scheduleByMonth.do")
	public String scheduleByMonth(Locale locale, Model model) {
		logger.info("Welcome home! The client locale is {}.", locale);
		
		Date date = new Date();
		DateFormat dateFormat = DateFormat.getDateTimeInstance(DateFormat.LONG, DateFormat.LONG, locale);
		
		String formattedDate = dateFormat.format(date);
		
		model.addAttribute("serverTime", formattedDate );
		
		return "/schedule/scheduleByMonth";
	}
	
	@RequestMapping(value = "/schedule/scheduleByWeek.do")
	public String scheduleByWeek(Locale locale, Model model) {
		logger.info("Welcome home! The client locale is {}.", locale);
		
		Date date = new Date();
		DateFormat dateFormat = DateFormat.getDateTimeInstance(DateFormat.LONG, DateFormat.LONG, locale);
		
		String formattedDate = dateFormat.format(date);
		
		model.addAttribute("serverTime", formattedDate );
		
		return "/schedule/scheduleByWeek";
	}
	
	@RequestMapping(value = "/schedule/tournament.do")
	public String tornament(Locale locale, Model model) {
		logger.info("Welcome home! The client locale is {}.", locale);
		
		Date date = new Date();
		DateFormat dateFormat = DateFormat.getDateTimeInstance(DateFormat.LONG, DateFormat.LONG, locale);
		
		String formattedDate = dateFormat.format(date);
		
		model.addAttribute("serverTime", formattedDate );
		
		return "/schedule/tournament";
	}
	
	// 이전 월로 이동 버튼 클릭
	@RequestMapping(value = "/prevMonth.do", method=RequestMethod.POST, headers="Accept=*/*",produces = "application/json")
	@ResponseBody
	public String prevMonth(@RequestBody String map) throws Exception{
		
		// key : year, month
		Map reqMap = CommUtils.convertJSONstringToMap(map);
		
		//Server Call
		List<Map<String, Object>> res = scheduleService.getSchedule(reqMap);
		
		//Data Injection
		String id = (String) res.get(0).get("id");
		String name = (String) res.get(0).get("name");
		
		//Map maker
		Map<String, Object> resMap = new HashMap();
		resMap.put("id", id);
		resMap.put("name", name);
		
		return CommUtils.getJsonStringFromMap(resMap).toJSONString();
	}
	
	// 다음 월로 이동 버튼 클릭
	@RequestMapping(value = "/nextMonth.do", method=RequestMethod.POST, headers="Accept=*/*",produces = "application/json")
	@ResponseBody
	public String nextMonth(@RequestBody String map) throws Exception{
		
		// key : year, month
		Map reqMap = CommUtils.convertJSONstringToMap(map);
		
		//Server Call
		List<Map<String, Object>> res = scheduleService.getSchedule(reqMap);
		
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
