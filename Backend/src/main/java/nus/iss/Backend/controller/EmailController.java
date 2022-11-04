package nus.iss.Backend.controller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.thymeleaf.spring5.SpringTemplateEngine;


@Controller
@RequestMapping("/about")
public class EmailController {
    
    @Autowired
    SpringTemplateEngine templateEngine;

    @Autowired
    private JavaMailSender sender;
    
}
