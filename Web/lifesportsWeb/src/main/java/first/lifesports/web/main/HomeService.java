package first.lifesports.web.main;

import java.util.List;
import java.util.Map;
import javax.annotation.Resource;
import org.apache.log4j.Logger;
import org.springframework.stereotype.Service;

import first.lifesports.dao.SampleDAO;

@Service("HomeService")
public class HomeService{
	Logger log = Logger.getLogger(this.getClass());
	@Resource(name = "sampleDAO")
	private SampleDAO sampleDAO;

	public List<Map<String, Object>> selectBoardList(Map<String, Object> map) throws Exception {
		return sampleDAO.selectBoardList(map);
	}
}