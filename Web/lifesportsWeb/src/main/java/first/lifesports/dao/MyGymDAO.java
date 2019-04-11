package first.lifesports.dao;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;
import first.common.dao.AbstractDAO;

@Repository("mygymDAO")
public class MyGymDAO extends AbstractDAO {
	
	@SuppressWarnings("unchecked")
	public List<Map<String, Object>> selectGym(Map<String, Object> map) throws Exception {
		return (List<Map<String, Object>>) selectList("MyGym.viewGym", map);
	}

	@SuppressWarnings("unchecked")
	public List<Map<String, Object>> selectFacility(Map<String, Object> map) throws Exception {
		return (List<Map<String, Object>>) selectList("MyGym.viewFacility", map);
	}
	
	@SuppressWarnings("unchecked")
	public List<Map<String, Object>> insertGym(Map<String, Object> map) throws Exception {
		return (List<Map<String, Object>>) selectList("MyGym.registerGym", map);
	}
	
	@SuppressWarnings("unchecked")
	public List<Map<String, Object>> updateGym(Map<String, Object> map) throws Exception {
		return (List<Map<String, Object>>) selectList("MyGym.editGym", map);
	}
	
	@SuppressWarnings("unchecked")
	public List<Map<String, Object>> insertFacility(Map<String, Object> map) throws Exception {
		return (List<Map<String, Object>>) selectList("MyGym.addFacility", map);
	}
	
	@SuppressWarnings("unchecked")
	public List<Map<String, Object>> updateFacility(Map<String, Object> map) throws Exception {
		return (List<Map<String, Object>>) selectList("MyGym.editFacility", map);
	}
	
	@SuppressWarnings("unchecked")
	public List<Map<String, Object>> deleteFacility(Map<String, Object> map) throws Exception {
		return (List<Map<String, Object>>) selectList("MyGym.delFacility", map);
	}
	
}
