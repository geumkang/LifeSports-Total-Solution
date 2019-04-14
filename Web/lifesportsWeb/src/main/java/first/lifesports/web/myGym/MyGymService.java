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
	
	public List<Map<String, Object>> viewGym(Map<String, Object> map) {
		try {
			List temp = mygymDAO.selectGym(map);
			if(temp.size() > 0){
				Map<String, Object> temp_m = (Map<String, Object>)temp.get(0);
				if(temp_m.containsKey("fig")) {
					if(temp_m.get("fig") != null)
						temp_m.put("fig", new String((byte[])temp_m.get("fig"), "utf-8"));
				}
				
				temp.set(0, temp_m);
				return temp;
			}
			else return null;
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return null;
		}
	}
	
	public List<Map<String, Object>> viewFacility(Map<String, Object> map) {
		try {
			return mygymDAO.selectFacility(map);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return null;
		}
	}
	
	public void registerGym(Map<String, Object> map) {
		try {
			mygymDAO.insertGym(map);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return;
		}
	}
	
	public void editGym(Map<String, Object> map) {
		try {
			mygymDAO.updateGym(map);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return;
		}
	}
	
	public void addFacility(Map<String, Object> map) {
		try {
			mygymDAO.insertFacility(map);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	public void editFacility(Map<String, Object> map) {
		try {
			mygymDAO.updateFacility(map);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return;
		}
	}
	
	public void delFacility(Map<String, Object> map) {
		try {
			mygymDAO.deleteFacility(map);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return;
		}
	}
	
}