package first.lifesports.web.reservation;

import java.util.List;
import java.util.Map;
import javax.annotation.Resource;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import first.lifesports.dao.ReservationDAO;

@Service("ReservationService")
public class ReservationService{
	private final Logger logger = LoggerFactory.getLogger(this.getClass());
	@Resource(name = "reservationDAO")
	private ReservationDAO reservationDAO;

	public List<Map<String, Object>> selectUser(Map<String, Object> map) {
		try {
			return reservationDAO.selectBoardList(map);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return null;
		}
	}
	
	public List<Map<String, Object>> testMethod(Map<String, Object> map) {
		try {
			return reservationDAO.testCall(map);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return null;
		}
	}
}