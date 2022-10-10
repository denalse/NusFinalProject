package nuss.iss.Backend.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping()
public class TesterRestController {

    private Logger logger = LoggerFactory.getLogger(TesterRestController.class.getName());
    
    @GetMapping(path="/test")
    public String register() {
        logger.info("\ttest");
        return "\"TEST\"";
    }

    @GetMapping(path="/probe")
    public String probe() {
        logger.info("I am the backend");
        return "\"PROBE\""; //??
    }
    

}
