// package nus.iss.Backend.controller;

// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.context.annotation.Bean;
// import org.springframework.mail.javamail.JavaMailSender;
// import org.springframework.mail.javamail.MimeMessageHelper;

// import org.springframework.stereotype.Controller;
// import org.springframework.web.bind.annotation.PostMapping;
// import org.springframework.web.bind.annotation.RequestBody;
// import org.springframework.web.bind.annotation.RequestMapping;
// import org.springframework.web.bind.annotation.ResponseBody;
// import org.springframework.web.bind.annotation.RestController;
// import org.thymeleaf.context.Context;
// import org.thymeleaf.spring4.SpringTemplateEngine;

// import javax.mail.internet.MimeMessage;

// import java.nio.charset.StandardCharsets;
// import java.util.HashMap;
// import java.util.Map;

// import nus.iss.Backend.model.EmailDetails;

// @Controller
// @RequestMapping("/test")
// public class EmailController {
    
//     @Autowired
//     SpringTemplateEngine templateEngine;

//     @Autowired
//     private JavaMailSender sender;
    
//     @PostMapping("/send")
//     public @ResponseBody EmailDetails sendMail(@RequestBody EmailDetails details) throws Exception {

//         MimeMessage message = sender.createMimeMessage();
//         MimeMessageHelper helper = new MimeMessageHelper(message,
//                 MimeMessageHelper.MULTIPART_MODE_MIXED_RELATED,
//                 StandardCharsets.UTF_8.name());

//         Map<String, Object> model = new HashMap<String, Object>();
//         model.put("name",details.getName());

//         Context context = new Context();
//         context.setVariables(model);
//         String html = templateEngine.process("email-template", context);

//         try {
//             helper.setFrom("noreply@moodboard.com");
//             helper.setTo(details.getEmail());
//             helper.setText(html,true);
//             helper.setSubject("Thank You Email!");
//         } catch (javax.mail.MessagingException e) {
//             e.printStackTrace();
//         }
//         sender.send(message);

//         return details;
//     }
    
// }
