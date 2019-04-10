package first.lifesports.web.schedule;

import java.util.List;
import java.util.Map;
import javax.annotation.Resource;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import first.lifesports.dao.ScheduleDAO;

@Service("ScheduleService")
public class ScheduleService{
	private final Logger logger = LoggerFactory.getLogger(this.getClass());
	@Resource(name = "scheduleDAO")
	private ScheduleDAO scheduleDAO;

	public List<Map<String, Object>> getSchedule(Map<String, Object> map) {
		try {
			return scheduleDAO.scheduleList(map);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return null;
		}
	}
}