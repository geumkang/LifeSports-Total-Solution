package first.common.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import first.lifesports.web.main.HomeController;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Controller
public class TestController {
     
	private static final Logger log = LoggerFactory.getLogger(HomeController.class);
     
    @RequestMapping(value="/interceptorTest.do")
    public ModelAndView interceptorTest() throws Exception{
         
        ModelAndView mv = new ModelAndView("");
        log.debug("인터셉터 테스트입니다!");
         
        return mv;
    }
     
}