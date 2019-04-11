package first.lifesports.web.authority;

import java.util.List;
import java.util.Map;
import javax.annotation.Resource;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import first.lifesports.dao.AuthorityDAO;
import first.lifesports.dao.SampleDAO;

@Service("AuthorityService")
public class AuthorityService{
	private final Logger logger = LoggerFactory.getLogger(this.getClass());
	@Resource(name = "authorityDAO")
	private AuthorityDAO authorityDAO;

	public List<Map<String, Object>> selectUser(Map<String, Object> map) {
		try {
			return authorityDAO.selectBoardList(map);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return null;
		}
	}
	
	public List<Map<String, Object>> testMethod(Map<String, Object> map) {
		try {
			return authorityDAO.testCall(map);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return null;
		}
	}
	
	public List<Map<String, Object>> getUserInfo(Map<String, Object> map) {
		try {
			return authorityDAO.getUserInfo(map);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return null;
		}
	}
}