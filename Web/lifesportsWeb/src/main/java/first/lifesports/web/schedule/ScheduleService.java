package first.lifesports.web.schedule;

import java.util.List;
import java.util.Map;
import javax.annotation.Resource;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import first.lifesports.dao.ScheduleDAO;

@Service("ScheduleService")
public class ScheduleService{
	private final Logger logger = LoggerFactory.getLogger(this.getClass());
	@Resource(name = "scheduleDAO")
	private ScheduleDAO scheduleDAO;

	public List<Map<String, Object>> getTournamentList(Map<String, Object> map) {
		try {
			return scheduleDAO.tournamentList(map);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return null;
		}
	}
	
	public List<Map<String, Object>> getSchedule(Map<String, Object> map) {
		try {
			return scheduleDAO.scheduleList(map);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return null;
		}
	}
	
	public List<Map<String, Object>> searchScheduleByMonth(Map<String, Object> map) {
		try {
			return scheduleDAO.searchScheduleByMonth(map);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return null;
		}
	}
	
	public Map<String, Object> searchTournament(Map<String, Object> map) {
		try {
			List temp = scheduleDAO.searchTournament(map);
			if(temp.size() > 0) {
				Map<String, Object> temp_m = (Map<String, Object>)temp.get(0);
				temp_m.put("contents", new String((byte[])temp_m.get("contents"), "utf-8"));
				return (Map<String, Object>) temp.get(0);
				}
			else {
				return null;}
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return null;
		}
	}
	
	public void insertTournament(Map<String, Object> map) {
		try {
			String temp = (String)map.get("contents");
			temp = temp.replaceAll("&lt;", "<");
			temp = temp.replaceAll("&gt;", ">");
			map.put("contents", temp);
			scheduleDAO.insertTournament(map);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

	public void updateTournament(Map<String, Object> map) {
		try {
			String temp = (String)map.get("contents");
			temp = temp.replaceAll("&lt;", "<");
			temp = temp.replaceAll("&gt;", ">");
			map.put("contents", temp);
			scheduleDAO.updateTournament(map);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	public void deleteTournament(Map<String, Object> map) {
		try {
			scheduleDAO.deleteTournament(map);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	public List<Map<String, Object>> viewFacilityList(Map<String, Object> map) {
		try {
			return scheduleDAO.viewFacilityList(map);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return null;
		}
	}
	
	public void insertSchedule(Map<String, Object> map) {
		try {
			scheduleDAO.insertSchedule(map);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return;
		}
	}
	
	public void updateSchedule(Map<String, Object> map) {
		try {
			scheduleDAO.updateSchedule(map);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return;
		}
	}
	
	public void deleteSchedule(Map<String, Object> map) {
		try {
			scheduleDAO.deleteSchedule(map);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return;
		}
	}
}
