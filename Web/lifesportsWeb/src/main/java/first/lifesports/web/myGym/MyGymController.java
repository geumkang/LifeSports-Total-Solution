package first.lifesports.web.myGym;

import java.text.DateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
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
	
	public Map<String, Object> responseMapping(List<Map<String, Object>> res, List<String> keyList, int n){
		Map map = new HashMap<String, Object>();
		for(int i = 0; i < keyList.size(); i++) {
			if(res.get(n).containsKey(keyList.get(i))) {
				map.put(keyList.get(i), res.get(n).get(keyList.get(i)).toString());
			}
			else {
				map.put(keyList.get(i), "");
			}
		}
		return map;		
	}
	
	// ������ �ε�� ��
	@RequestMapping(value = "/myGym/myGymUpdate.do")
	public String myGym(HttpServletRequest request, Model model) {
		
		HttpSession session = request.getSession();
		
		Map list = new HashMap<String, Object>();;
		Map map = new HashMap<String, Object>();
		map.put("UDID", session.getAttribute("UDID"));
		
		if(session.getAttribute("UDID") != null) {
			// Get Gym Info
			List<Map<String, Object>> res = mygymService.viewGym(map);
			
			String fig;
			if(res.size() != 0) {
				map.put("isEmpty", "FALSE");
				List<String> keyList = new ArrayList<String>(Arrays.asList("id", "name", "fig", "location", "latitude", "longitude", "startTime", "endTime", "info"));
				map.putAll(responseMapping(res, keyList, 0));
			}
			else {
				map.put("isEmpty", "TRUE");
			}
			
			
			// Get Facility Info
			
			Map map2 = new HashMap<String, Object>();
			map2.put("UDID", session.getAttribute("UDID"));
			res = mygymService.viewFacility(map2);
			
			Map newMap = new HashMap<String, Object>();
			
			
			Map facilityMap = new HashMap<String, Object>();
			List facilityList = new ArrayList<Map<String, Object>>();
			
			if(res.size() != 0) {
				facilityMap.put("f_isEmpty", "FALSE");
				Map temp = new HashMap<String, Object>();
				for(int i = 0; i < res.size(); i++) {
					List<String> keyList = new ArrayList<String>(Arrays.asList("f_id", "f_name", "f_startTime", "f_endTime", "f_participant", "f_subject"));
					temp = responseMapping(res, keyList, i);
					temp.put("time", temp.get("f_startTime").toString().substring(0, 5) + " ~ " + temp.get("f_endTime").toString().substring(0, 5));
					facilityList.add(temp);
				}
				
			}
			else {
				facilityMap.put("f_isEmpty", "TRUE");
			}
			
			model.addAttribute("list", map);
			model.addAttribute("facilityMap", facilityMap);
			model.addAttribute("facilityList", facilityList);
		}
		return "/myGym/myGymUpdate";
	}
	
	// ü���� ��� ��ư Ŭ��
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
	
	// ü���� ���� ���� ��ư Ŭ��
	@RequestMapping(value = "/editGym.do", method=RequestMethod.POST, headers="Accept=*/*",produces="application/json; charset=utf8")
	@ResponseBody
	public void editGym(@RequestBody String map) throws Exception{
		
		// key : id
		Map reqMap = CommUtils.convertJSONstringToMap(map);
		
		//Server Call
		List<Map<String, Object>> res = mygymService.editGym(reqMap);
		
		return;
	}
	
	// �ü� �߰� ��ư Ŭ��
	@RequestMapping(value = "/addFacility.do", method=RequestMethod.POST, headers="Accept=*/*",produces="application/json")
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
	
	// �ü� ���� ���� ��ư Ŭ��
	@RequestMapping(value = "/editFacility.do", method=RequestMethod.POST, headers="Accept=*/*",produces = "application/json")
	@ResponseBody
	public void editFacility(@RequestBody String map) throws Exception{
		
		Map reqMap = CommUtils.convertJSONstringToMap(map);
		
		//Server Call
		List<Map<String, Object>> res = mygymService.editFacility(reqMap);
		
		return;
	}
	
	// �ü� ���� ���� ��ư Ŭ��
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
