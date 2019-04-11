package first.lifesports.dao;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;
import first.common.dao.AbstractDAO;

@Repository("authorityDAO")
public class AuthorityDAO extends AbstractDAO {

	@SuppressWarnings("unchecked")
	public List<Map<String, Object>> selectBoardList(Map<String, Object> map) throws Exception {
		return (List<Map<String, Object>>) selectList("Authority.selectUser", map);
	}
	
	@SuppressWarnings("unchecked")
	public List<Map<String, Object>> testCall(Map<String, Object> map) throws Exception {
		return (List<Map<String, Object>>) selectList("Authority.testCall", map);
	}
	
	@SuppressWarnings("unchecked")
	public List<Map<String, Object>> getUserInfo(Map<String, Object> map) throws Exception {
		return (List<Map<String, Object>>) selectList("Authority.getUserInfo", map);
	}
}
