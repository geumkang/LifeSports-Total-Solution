package first.common.logger;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

public class LoggerInterceptor extends HandlerInterceptorAdapter {
	protected Log log = LogFactory.getLog(LoggerInterceptor.class);

	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
			throws Exception {
		if (log.isDebugEnabled()) {
			log.debug("====================================== START ======================================");
			log.debug(" Request URI \t: " + request.getRequestURI());
		}
		
		if(request.getRequestURI().toString().equals("/main.do") || request.getRequestURI().toString().equals("/login.do") || request.getRequestURI().toString().equals("/loginProcess.do")) {
			
		}
		else {
			if(request.getSession().getAttribute("UDID") == null) {
				response.sendRedirect("/login.do");
				return false;
			}
		}
		
		
		return super.preHandle(request, response, handler);
	}

	@Override
	public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler,
			ModelAndView modelAndView) throws Exception {
		if (log.isDebugEnabled()) {
			log.debug("====================================== END ======================================\n");
		}
	}
}