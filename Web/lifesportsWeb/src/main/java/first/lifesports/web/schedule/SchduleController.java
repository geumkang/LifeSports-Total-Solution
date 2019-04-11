package first.lifesports.web.schedule;

import java.text.DateFormat;
import java.util.ArrayList;
import java.util.Date;
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
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
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
	public String scheduleByMonth(HttpServletRequest request, Model model) {
		
		return "/schedule/scheduleByMonth";
	}
	
	@RequestMapping(value = "/schedule/scheduleByWeek.do")
	public String scheduleByWeek(HttpServletRequest request, Model model) {
	
		return "/schedule/scheduleByWeek";
	}
	
	@RequestMapping(value = "/schedule/tournament.do")
	public String tornament(HttpServletRequest request, Model model) {
		
		Map reqMap = CommUtils.getRequestMap(request);
		
		//List tournamentList = scheduleService.getTournamentList(reqMap);
		
		//model.addAttribute("tournamentList",  tournamentList);
		
		
		//디비에서 pagenatedList로 가져와서 model에 맵핑
		List list = new ArrayList();
		Map test = new HashMap<String, Object>();
		test.put("title", "fuck");
		list.add(test);
		
		model.addAttribute("list", list);
		
		
		
		return "/schedule/tournament";
	}
	
	@RequestMapping(value = "/schedule/tournamentView.do")
	/*public String tornamentView(HttpServletRequest request, Model model, @RequestParam("serial") String serial) {*/
		public String tornamentView(HttpServletRequest request, Model model) {
		
		Map reqMap = CommUtils.getRequestMap(request);
		
		//List tournamentList = scheduleService.getTournamentList(reqMap);
		
		//model.addAttribute("tournamentList",  tournamentList);
		
		
		//디비에서 게시글 번호를 바탕으로 게시글의 상세 내용을 조회함 (serial)
		List list = new ArrayList();
		Map test = new HashMap<String, Object>();
		test.put("title", "fuck");
		list.add(test);
		
		model.addAttribute("list", list);
		
		return "/schedule/tournamentView";
	}
	
	@RequestMapping(value = "/schedule/tournamentRegi.do")
	/*public String tornamentRegi(HttpServletRequest request, Model model, @RequestParam("serial") String serial) {*/
	public String tornamentRegi(HttpServletRequest request, Model model) {
		
		Map reqMap = CommUtils.getRequestMap(request);
		
		//List tournamentList = scheduleService.getTournamentList(reqMap);
		
		//model.addAttribute("tournamentList",  tournamentList);
		
		
		//디비에서 게시글 번호를 바탕으로 게시글의 상세 내용을 조회함 (serial)
		List list = new ArrayList();
		Map test = new HashMap<String, Object>();
		test.put("title", "fuck");
		list.add(test);
		
		model.addAttribute("list", list);
		
		return "/schedule/tournamentRegi";
	}
	
	@RequestMapping(value = "/schedule/regiTournament.do")
	public String regiTornament(HttpServletRequest request, Model model, @RequestParam("serial") String serial) {
		
		Map reqMap = CommUtils.getRequestMap(request);
		
		//List tournamentList = scheduleService.getTournamentList(reqMap);
		
		//model.addAttribute("tournamentList",  tournamentList);
		
		
		//디비에서 게시글 번호를 바탕으로 게시글의 상세 내용을 조회함 (serial)
		List list = new ArrayList();
		Map test = new HashMap<String, Object>();
		test.put("title", "fuck");
		list.add(test);
		
		model.addAttribute("list", list);
		
		return "/schedule/tournament";
	}
	
	@RequestMapping(value = "/schedule/deltTournament.do")
	public String deltTornament(HttpServletRequest request, Model model, @RequestParam("serial") String serial) {
		
		Map reqMap = CommUtils.getRequestMap(request);
		
		//List tournamentList = scheduleService.getTournamentList(reqMap);
		
		//model.addAttribute("tournamentList",  tournamentList);
		
		
		//디비에서 게시글 번호를 바탕으로 게시글의 상세 내용을 조회함 (serial)
		List list = new ArrayList();
		Map test = new HashMap<String, Object>();
		test.put("title", "fuck");
		list.add(test);
		
		model.addAttribute("list", list);
		
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
	
	// 일정 추가 버튼 클릭
	@RequestMapping(value = "/addSchedule.do", method=RequestMethod.POST, headers="Accept=*/*",produces = "application/json")
	@ResponseBody
	public String addSchedule(@RequestBody String map) throws Exception{
		
		// key : year, month
		Map reqMap = CommUtils.convertJSONstringToMap(map);
		
		//Server Call
		List<Map<String, Object>> res = scheduleService.addSchedule(reqMap);
		
		//Data Injection
		String id = (String) res.get(0).get("id");
		String name = (String) res.get(0).get("name");
		
		//Map maker
		Map<String, Object> resMap = new HashMap();
		resMap.put("id", id);
		resMap.put("name", name);
		
		return CommUtils.getJsonStringFromMap(resMap).toJSONString();
	}
	
	// 일정 변경 버튼 클릭
	@RequestMapping(value = "/editSchedule.do", method=RequestMethod.POST, headers="Accept=*/*",produces = "application/json")
	@ResponseBody
	public String editSchedule(@RequestBody String map) throws Exception{
		
		// key : year, month
		Map reqMap = CommUtils.convertJSONstringToMap(map);
		
		//Server Call
		List<Map<String, Object>> res = scheduleService.editSchedule(reqMap);
		
		//Data Injection
		String id = (String) res.get(0).get("id");
		String name = (String) res.get(0).get("name");
		
		//Map maker
		Map<String, Object> resMap = new HashMap();
		resMap.put("id", id);
		resMap.put("name", name);
		
		return CommUtils.getJsonStringFromMap(resMap).toJSONString();
	}
	
	// 일정 변경 버튼 클릭
	@RequestMapping(value = "/delSchedule.do", method=RequestMethod.POST, headers="Accept=*/*",produces = "application/json")
	@ResponseBody
	public String delSchedule(@RequestBody String map) throws Exception{
		
		// key : year, month
		Map reqMap = CommUtils.convertJSONstringToMap(map);
		
		//Server Call
		List<Map<String, Object>> res = scheduleService.delSchedule(reqMap);
		
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
