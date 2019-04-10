package first.lifesports.dao;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;
import first.common.dao.AbstractDAO;

@Repository("scheduleDAO")
public class ScheduleDAO extends AbstractDAO {

	@SuppressWarnings("unchecked")
	public List<Map<String, Object>> scheduleList(Map<String, Object> map) throws Exception {
		return (List<Map<String, Object>>) selectList("Schedule.scheduleList", map);
	}
	
	@SuppressWarnings("unchecked")
	public List<Map<String, Object>> tournamentList(Map<String, Object> map) throws Exception {
		return (List<Map<String, Object>>) selectList("Schedule.tournamentList", map);
	}
}
