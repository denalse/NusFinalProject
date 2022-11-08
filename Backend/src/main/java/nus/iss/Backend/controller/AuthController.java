package nus.iss.Backend.controller;

import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

import javax.mail.internet.MimeMessage;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring4.SpringTemplateEngine;

import nus.iss.Backend.model.ERole;
import nus.iss.Backend.model.EmailDetails;
import nus.iss.Backend.model.Role;
import nus.iss.Backend.model.User;
import nus.iss.Backend.payload.request.LoginRequest;
import nus.iss.Backend.payload.request.RegisterRequest;
import nus.iss.Backend.payload.response.MessageResponse;
import nus.iss.Backend.payload.response.UserInfoResponse;
import nus.iss.Backend.repository.RoleRepository;
import nus.iss.Backend.repository.UserRepository;
import nus.iss.Backend.security.jwt.JwtUtils;
import nus.iss.Backend.security.service.UserDetailsImpl;


// @CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/auth")
public class AuthController {
  @Autowired
  AuthenticationManager authenticationManager;

  @Autowired
  UserRepository userRepo;

  @Autowired
  RoleRepository roleRepo;

  @Autowired
  PasswordEncoder encoder;

  @Autowired
  JwtUtils jwtUtils;

  @Autowired
  SpringTemplateEngine templateEngine;

  @Autowired
  private JavaMailSender sender;

  @PostMapping("mood/signin")
  public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {

    Authentication authentication = authenticationManager
        .authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

    SecurityContextHolder.getContext().setAuthentication(authentication);

    UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

    ResponseCookie jwtCookie = jwtUtils.generateJwtCookie(userDetails);

    List<String> roles = userDetails.getAuthorities().stream()
        .map(item -> item.getAuthority())
        .collect(Collectors.toList());

    // if (userRepo.wrongPassword(loginRequest.getPassword())) {
    // return ResponseEntity.badRequest().body(new MessageResponse("Error: Login
    // failed!"));
    // }
    return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE, jwtCookie.toString())
        .body(new UserInfoResponse(userDetails.getUsername(), roles));
  }

  @PostMapping("mood/signup")
  public ResponseEntity<?> registerUser(@Valid @RequestBody RegisterRequest regRequest) {
    if (userRepo.existsByUsername(regRequest.getUsername())) {
      return ResponseEntity.badRequest().body(new MessageResponse("Error: Username is already taken!"));
    }

    // Create new user's account
    User user = new User(regRequest.getUsername(),
        encoder.encode(regRequest.getPassword()));

    Set<String> strRoles = regRequest.getRole();
    Set<Role> roles = new HashSet<>();

    if (strRoles == null) {
      Role userRole = roleRepo.findByName(ERole.ROLE_USER)
          .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
      roles.add(userRole);
    } else {
      strRoles.forEach(role -> {
        switch (role) {
          case "admin":
            Role adminRole = roleRepo.findByName(ERole.ROLE_ADMIN)
                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
            roles.add(adminRole);

            break;
          case "mod":
            Role modRole = roleRepo.findByName(ERole.ROLE_MODERATOR)
                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
            roles.add(modRole);

            break;
          default:
            Role userRole = roleRepo.findByName(ERole.ROLE_USER)
                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
            roles.add(userRole);
        }
      });
    }

    user.setRoles(roles);
    userRepo.save(user);

    return ResponseEntity.ok(new MessageResponse("User registered successfully!"));
  }

  @PostMapping("mood/signout")
  public ResponseEntity<?> logoutUser() {
    ResponseCookie cookie = jwtUtils.getCleanJwtCookie();
    return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE, cookie.toString())
        .body(new MessageResponse("You've been signed out!"));
  }

  @PostMapping(path="/send",consumes=MediaType.APPLICATION_JSON_VALUE)
  public ResponseEntity <String> sendMail(@RequestBody EmailDetails details) throws Exception {

    MimeMessage message = sender.createMimeMessage();
    MimeMessageHelper helper = new MimeMessageHelper(message, true);
        // MimeMessageHelper.MULTIPART_MODE_MIXED_RELATED,
        // StandardCharsets.UTF_8.name());

    Map<String, Object> model = new HashMap<String, Object>();
    model.put("name", details.getName());

    Context context = new Context();
    context.setVariables(model);
    String html = templateEngine.process("email-template", context);

    try {
      helper.setTo(details.getEmail());
      helper.setText(html, true);
      helper.setSubject("Thank You Email!");

      sender.send(message);
     
      return ResponseEntity.ok("\"Email sent successfully\"");

    } catch (Exception e) {
      e.printStackTrace();

      // return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Feedback is invalid");

    }
    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("\"Feedback is invalid\"");

  }
}
