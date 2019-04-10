package first.lifesports.web.myGym;

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

import first.lifesports.web.main.HomeController;
import first.lifesports.web.reservation.ReservationService;
import first.utils.CommUtils;;

/**
 * Handles requests for the application home page.
 */
@Controller
public class MyGymController {
	
	@Resource(name="MyGymService")
	MyGymService mygymService;
	
	private static final Logger logger = LoggerFactory.getLogger(HomeController.class);
	
	@RequestMapping(value = "/myGym/myGymUpdate.do")
	public String myGym(Locale locale, Model model) {
		logger.info("Welcome home! The client locale is {}.", locale);
		
		Date date = new Date();
		DateFormat dateFormat = DateFormat.getDateTimeInstance(DateFormat.LONG, DateFormat.LONG, locale);
		
		String formattedDate = dateFormat.format(date);
		
		model.addAttribute("serverTime", formattedDate );
		
		return "/myGym/myGymUpdate";
	}
	
	// 체육관 등록 버튼 클릭
	@RequestMapping(value = "/registerGym.do", method=RequestMethod.POST, headers="Accept=*/*",produces = "application/json")
	@ResponseBody
	public String registerGym(@RequestBody String map) throws Exception{
		
		// key : year, month
		Map reqMap = CommUtils.convertJSONstringToMap(map);
		
		//Server Call
		List<Map<String, Object>> res = mygymService.registerGym(reqMap);
		
		//Data Injection
		String id = (String) res.get(0).get("id");
		String name = (String) res.get(0).get("name");
		
		//Map maker
		Map<String, Object> resMap = new HashMap();
		resMap.put("id", id);
		resMap.put("name", name);
		
		return CommUtils.getJsonStringFromMap(resMap).toJSONString();
	}
	
	// 체육관 정보 수정 버튼 클릭
	@RequestMapping(value = "/editGym.do", method=RequestMethod.POST, headers="Accept=*/*",produces = "application/json")
	@ResponseBody
	public String editGym(@RequestBody String map) throws Exception{
		
		// key : year, month
		Map reqMap = CommUtils.convertJSONstringToMap(map);
		
		//Server Call
		List<Map<String, Object>> res = mygymService.editGym(reqMap);
		
		//Data Injection
		String id = (String) res.get(0).get("id");
		String name = (String) res.get(0).get("name");
		
		//Map maker
		Map<String, Object> resMap = new HashMap();
		resMap.put("id", id);
		resMap.put("name", name);
		
		return CommUtils.getJsonStringFromMap(resMap).toJSONString();
	}
	
	// 시설 추가 버튼 클릭
	@RequestMapping(value = "/addFacility.do", method=RequestMethod.POST, headers="Accept=*/*",produces = "application/json")
	@ResponseBody
	public String addFacility(@RequestBody String map) throws Exception{
		
		// key : year, month
		Map reqMap = CommUtils.convertJSONstringToMap(map);
		
		//Server Call
		List<Map<String, Object>> res = mygymService.addFacility(reqMap);
		
		//Data Injection
		String id = (String) res.get(0).get("id");
		String name = (String) res.get(0).get("name");
		
		//Map maker
		Map<String, Object> resMap = new HashMap();
		resMap.put("id", id);
		resMap.put("name", name);
		
		return CommUtils.getJsonStringFromMap(resMap).toJSONString();
	}
	
	// 시설 정보 변경 버튼 클릭
	@RequestMapping(value = "/editFacility.do", method=RequestMethod.POST, headers="Accept=*/*",produces = "application/json")
	@ResponseBody
	public String editFacility(@RequestBody String map) throws Exception{
		
		// key : year, month
		Map reqMap = CommUtils.convertJSONstringToMap(map);
		
		//Server Call
		List<Map<String, Object>> res = mygymService.editFacility(reqMap);
		
		//Data Injection
		String id = (String) res.get(0).get("id");
		String name = (String) res.get(0).get("name");
		
		//Map maker
		Map<String, Object> resMap = new HashMap();
		resMap.put("id", id);
		resMap.put("name", name);
		
		return CommUtils.getJsonStringFromMap(resMap).toJSONString();
	}
	
	// 시설 정보 삭제 버튼 클릭
	@RequestMapping(value = "/delFacility.do", method=RequestMethod.POST, headers="Accept=*/*",produces = "application/json")
	@ResponseBody
	public String delFacility(@RequestBody String map) throws Exception{
		
		// key : year, month
		Map reqMap = CommUtils.convertJSONstringToMap(map);
		
		//Server Call
		List<Map<String, Object>> res = mygymService.delFacility(reqMap);
		
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
