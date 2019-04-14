package first.lifesports.web.schedule;

import java.text.DateFormat;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Date;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

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
				
		Map sesMap = CommUtils.getSessionMap(request);
		
		List<Map<String, Object>> res = scheduleService.viewFacilityList(sesMap);
		
		model.addAttribute("fac_list", res);
		
		return "/schedule/scheduleByMonth";
	}
	
	@RequestMapping(value = "/schedule/scheduleByWeek.do")
	public String scheduleByWeek(HttpServletRequest request, Model model) {
	
		Map sesMap = CommUtils.getSessionMap(request);
		
		List<Map<String, Object>> res = scheduleService.viewFacilityList(sesMap);
		
		model.addAttribute("fac_list", res);
		
		return "/schedule/scheduleByWeek";
	}
	
	@RequestMapping(value = "/schedule/tournament.do")
	public String tornament(HttpServletRequest request, Model model) {
		
		Map reqMap = CommUtils.getRequestMap(request);
		
		//List tournamentList = scheduleService.getTournamentList(reqMap);
		
		//model.addAttribute("tournamentList",  tournamentList);
		
		
		//디비에서 pagenatedList로 가져와서 model에 맵핑
		List list = scheduleService.getTournamentList(reqMap);
			
		Map sessionMap = CommUtils.getSessionMap(request);
		
		model.addAttribute("list", list);
		model.addAttribute("session", sessionMap);
		
		
		
		return "/schedule/tournament";
	}
	
	@RequestMapping(value = "/schedule/tournamentView.do", method=RequestMethod.POST)
	/*public String tornamentView(HttpServletRequest request, Model model, @RequestParam("serial") String serial) {*/
		public String tornamentView(HttpServletRequest request, Model model, @RequestParam("serial") String serial) {
		
		//디비에서 게시글 번호를 바탕으로 게시글의 상세 내용을 조회함 (serial)
		Map reqMap = new HashMap<String, Object>();
		reqMap.put("serial", serial);

		Map result = scheduleService.searchTournament(reqMap);
		
		model.addAttribute("result", result);
		
		return "/schedule/tournamentView";
	}
	
	@RequestMapping(value = "/schedule/tournamentRegi.do")
	/*public String tornamentRegi(HttpServletRequest request, Model model, @RequestParam("serial") String serial) {*/
	public String tornamentRegi(HttpServletRequest request, Model model) {
		
		Map sessionMap = CommUtils.getSessionMap(request);
		model.addAttribute("session", sessionMap);
		
		return "/schedule/tournamentRegi";
	}
	
	@RequestMapping(value = "/schedule/tournamentUpdt.do", method=RequestMethod.POST)
	public String tornamentUpdt(HttpServletRequest request, Model model, @RequestParam("serial") String serial) {
		
		Map reqMap = new HashMap<String, Object>();
		reqMap.put("serial", serial);
		
		Map sessionMap = CommUtils.getSessionMap(request);
		model.addAttribute("session", sessionMap);
		
		Map result = scheduleService.searchTournament(reqMap);
		
		model.addAttribute("result", result);
		
		return "/schedule/tournamentUpdt";
	}
	
	@RequestMapping(value = "/schedule/regiTournament.do", method=RequestMethod.POST)
	public String regiTornament(HttpServletRequest request, Model model, @RequestParam("contents") String contents, @RequestParam("title") String title) {
		
		Map reqMap = new HashMap<String, Object>();
		reqMap.put("contents", contents);
		reqMap.put("title", title);
		
		scheduleService.insertTournament(reqMap);
		
		//디비에서 게시글 번호를 바탕으로 게시글의 상세 내용을 조회함 (serial)
		List list = new ArrayList();
		Map test = new HashMap<String, Object>();
		test.put("title", "fuck");
		list.add(test);
		
		model.addAttribute("list", list);
		
		return "redirect:/schedule/tournament.do";
	}
	
	@RequestMapping(value = "/schedule/updtTournament.do", method=RequestMethod.POST)
	public String updtTornament(HttpServletRequest request, Model model, @RequestParam("serial") String serial, @RequestParam("contents") String contents, @RequestParam("title") String title) {
		
		Map reqMap = new HashMap<String, Object>();
		reqMap.put("serial", serial);
		reqMap.put("contents", contents);
		reqMap.put("title", title);
		
		scheduleService.updateTournament(reqMap);
		
		return "redirect:/schedule/tournament.do";
	}
	
	@RequestMapping(value = "/schedule/deltTournament.do", method=RequestMethod.POST)
	public String deltTornament(HttpServletRequest request, Model model, @RequestParam("serial") String serial) {
		
		Map reqMap = new HashMap<String, Object>();
		reqMap.put("serial", serial);
		
		scheduleService.deleteTournament(reqMap);
		
		return "redirect:/schedule/tournament.do";
	}
	
	/*
	 * Ajax Request for schedule
	 */
	@RequestMapping(value = "/scheduleRequestAjax.do", method = RequestMethod.POST, headers = "Accept=*/*", produces = "application/json")
	@ResponseBody
	public String scheduleRequestAjax(@RequestBody String map) throws Exception {

		// key : year, month
		Map reqMap = CommUtils.convertJSONstringToMap(map);

		reqMap.put("searchStartDate", (reqMap.get("year") + "-" + reqMap.get("month")));
		reqMap.put("searchEndDate", (reqMap.get("year") + "-" + ((int) reqMap.get("month") + 1)));

		// Server Call
		List<Map<String, Object>> res = scheduleService.searchScheduleByMonth(reqMap);

		// Map maker
		Map<String, Object> resMap = new HashMap();
		resMap.put("resultList", res);

		return CommUtils.getJsonStringFromMap(resMap).toJSONString();
	}
	
	/*
	 * Ajax Insert Request for schedule
	 */
	@RequestMapping(value = "/insertScheduleRequestAjax.do", method = RequestMethod.POST, headers = "Accept=*/*", produces = "application/json")
	@ResponseBody
	public String insertScheduleRequestAjax(@RequestBody String map) throws Exception {

		// key : year, month
		Map reqMap = CommUtils.convertJSONstringToMap(map);

		// Server Call
		scheduleService.insertSchedule(reqMap);

		return reqMap.get("id").toString();
	}
	/*
	 * Ajax Request for schedule
	 */
	@RequestMapping(value = "/updateScheduleRequestAjax.do", method = RequestMethod.POST, headers = "Accept=*/*", produces = "application/json")
	@ResponseBody
	public void updateScheduleRequestAjax(@RequestBody String map) throws Exception {

		Map reqMap = CommUtils.convertJSONstringToMap(map);
		
		scheduleService.updateSchedule(reqMap);
		
	}
	
	/*
	 * Ajax Request for schedule
	 */
	@RequestMapping(value = "/deleteScheduleRequestAjax.do", method = RequestMethod.POST, headers = "Accept=*/*", produces = "application/json")
	@ResponseBody
	public void deleteScheduleRequestAjax(@RequestBody String map) throws Exception {

		Map reqMap = CommUtils.convertJSONstringToMap(map);
		
		scheduleService.deleteSchedule(reqMap);

	}
}
