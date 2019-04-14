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
	public void insertGym(Map<String, Object> map) throws Exception {
		insert("MyGym.registerGym", map);
		update("MyGym.updateGymAdminID", map);
		return;
	}
	
	@SuppressWarnings("unchecked")
	public void updateGym(Map<String, Object> map) throws Exception {
		update("MyGym.editGym", map);
		return;
	}
	
	@SuppressWarnings("unchecked")
	public void insertFacility(Map<String, Object> map) throws Exception {
		insert("MyGym.addFacility1", map);
		update("MyGym.addFacility2", map);
		
		return;
	}
	
	@SuppressWarnings("unchecked")
	public void updateFacility(Map<String, Object> map) throws Exception {
		update("MyGym.editFacility", map);
		return;
	}
	
	@SuppressWarnings("unchecked")
	public void deleteFacility(Map<String, Object> map) throws Exception {
		delete("MyGym.delFacility", map);
		
		return;
	}
	
}
