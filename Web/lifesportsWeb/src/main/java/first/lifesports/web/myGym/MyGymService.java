package first.lifesports.web.myGym;

import java.util.List;
import java.util.Map;
import javax.annotation.Resource;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import first.lifesports.dao.MyGymDAO;

@Service("MyGymService")
public class MyGymService{
	private final Logger logger = LoggerFactory.getLogger(this.getClass());
	@Resource(name = "mygymDAO")
	private MyGymDAO mygymDAO;

	public List<Map<String, Object>> registerGym(Map<String, Object> map) {
		try {
			return mygymDAO.insertGym(map);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return null;
		}
	}
	
	public List<Map<String, Object>> editGym(Map<String, Object> map) {
		try {
			return mygymDAO.updateGym(map);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return null;
		}
	}
	
	public List<Map<String, Object>> addFacility(Map<String, Object> map) {
		try {
			return mygymDAO.insertFacility(map);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return null;
		}
	}
	
	public List<Map<String, Object>> editFacility(Map<String, Object> map) {
		try {
			return mygymDAO.updateFacility(map);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return null;
		}
	}
	
	public List<Map<String, Object>> delFacility(Map<String, Object> map) {
		try {
			return mygymDAO.deleteFacility(map);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return null;
		}
	}
	
}