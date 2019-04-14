package first.lifesports.dao;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;
import first.common.dao.AbstractDAO;

@Repository("scheduleDAO")
public class ScheduleDAO extends AbstractDAO {

	@SuppressWarnings("unchecked")
	public List<Map<String, Object>> searchScheduleByMonth(Map<String, Object> map) throws Exception {
		return (List<Map<String, Object>>) selectList("Schedule.scheduleListByMonth", map);
	}
	
	@SuppressWarnings("unchecked")
	public List<Map<String, Object>> scheduleList(Map<String, Object> map) throws Exception {
		return (List<Map<String, Object>>) selectList("Schedule.scheduleList", map);
	}

	@SuppressWarnings("unchecked")
	public void insertSchedule(Map<String, Object> map) throws Exception {
		insert("Schedule.insertSchedule", map);
	}

	@SuppressWarnings("unchecked")
	public void updateSchedule(Map<String, Object> map) throws Exception {
		update("Schedule.updateSchedule", map);
	}

	@SuppressWarnings("unchecked")
	public void deleteSchedule(Map<String, Object> map) throws Exception {
		delete("Schedule.deleteSchedule", map);
	}
	@SuppressWarnings("unchecked")
		public List<Map<String, Object>> tournamentList(Map<String, Object> map) throws Exception {
			return (List<Map<String, Object>>) selectList("Schedule.listTournament_board", map);
	}
	@SuppressWarnings("unchecked")
	public List<Map<String, Object>> searchTournament(Map<String, Object> map) throws Exception {
		return (List<Map<String, Object>>) selectList("Schedule.selectTournament_board", map);
	}
	@SuppressWarnings("unchecked")
	public void insertTournament(Map<String, Object> map) throws Exception {
		insert("Schedule.insertTournament_board", map);
	}
	@SuppressWarnings("unchecked")
	public void updateTournament(Map<String, Object> map) throws Exception {
		update("Schedule.updateTournament_board", map);
	}
	@SuppressWarnings("unchecked")
	public void deleteTournament(Map<String, Object> map) throws Exception {
		delete("Schedule.deleteTournament_board", map);
	}
	@SuppressWarnings("unchecked")
	public List<Map<String, Object>> viewFacilityList(Map<String, Object> map) throws Exception {
		return (List<Map<String, Object>>) selectList("Schedule.viewFacilityList", map);
	}
}
