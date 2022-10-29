package nus.iss.Backend.controller;

import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import nus.iss.Backend.model.Response;
import nus.iss.Backend.model.User;
import nus.iss.Backend.repository.UserRepository;
import nus.iss.Backend.security.service.UserService;

@RestController
@RequestMapping(path="/register")
public class RegisterRestController {

    @Autowired
    private UserRepository regRepo;

    // @Autowired
    // private RegisterService regSvc;

    private Logger logger = LoggerFactory.getLogger(RegisterRestController.class.getName());


    @PostMapping(path="/addRegister", consumes = MediaType.APPLICATION_JSON_VALUE )
    public Optional<User> createRegister(@RequestBody String payload) {

        User reg;
        Response resp;

        logger.info("Payload: %s".formatted(payload));

        try {
            reg = User.create(payload);
            // regRepo.insertContact(reg);

            resp = new Response();
            resp.setCode(201);
            resp.setMessage("abc");
            resp.setData(reg.toJson().toString());

            return Optional.of(reg);
        } catch(Exception ex) {
            resp = new Response();
            resp.setCode(400);
            resp.setMessage(ex.getMessage());

            logger.info("Error: %s".formatted(resp.toJson().toString()));
            return Optional.empty();
        }     
    }

}
