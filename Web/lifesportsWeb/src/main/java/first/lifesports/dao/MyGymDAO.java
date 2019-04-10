package first.lifesports.dao;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;
import first.common.dao.AbstractDAO;

@Repository("mygymDAO")
public class MyGymDAO extends AbstractDAO {

	@SuppressWarnings("unchecked")
	public List<Map<String, Object>> insertGym(Map<String, Object> map) throws Exception {
		return (List<Map<String, Object>>) selectList("Authority.addGym", map);
	}
	
	
}
