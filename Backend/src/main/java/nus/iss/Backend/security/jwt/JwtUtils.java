package nus.iss.Backend.security.jwt;

import java.util.Date;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseCookie;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;
import org.springframework.web.util.WebUtils;

import io.jsonwebtoken.*;

import nus.iss.Backend.security.service.UserDetailsImpl;

@Component
public class JwtUtils {

    private static final Logger logger = LoggerFactory.getLogger(JwtUtils.class);

    @Value("${dena.app.jwtSecret}") //change
    private String jwtSecret;
  
    @Value("${dena.app.jwtExpirationMs}") //change
    private int jwtExpirationMs;
  
    @Value("${dena.app.jwtCookieName}") //change
    private String jwtCookie;
  
    public String getJwtFromCookies(HttpServletRequest request) {
      Cookie cookie = WebUtils.getCookie(request, jwtCookie);
      if (cookie != null) {
        return cookie.getValue();
      } else {
        return null;
      }
    }

    public String generateJwtToken(Authentication authentication) {

      UserDetailsImpl userPrincipal = (UserDetailsImpl) authentication.getPrincipal();
  
      return Jwts.builder()
          .setSubject((userPrincipal.getUsername()))
          .setIssuedAt(new Date())
          .setExpiration(new Date((new Date()).getTime() + jwtExpirationMs))
          .signWith(SignatureAlgorithm.HS512, jwtSecret)
          .compact();
    }
  
    public ResponseCookie generateJwtCookie(UserDetailsImpl userPrincipal) {
      String jwt = generateTokenFromUsername(userPrincipal.getUsername());
      System.out.println(jwt);
      ResponseCookie cookie = ResponseCookie.from(jwtCookie, jwt).path("/api").maxAge(24 * 60 * 60).httpOnly(true).build();
      return cookie;
    }
  
    public ResponseCookie getCleanJwtCookie() {
      ResponseCookie cookie = ResponseCookie.from(jwtCookie, null).path("/api").build();
      return cookie;
    }
  
    public String getUserNameFromJwtToken(String token) {
      return Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(token).getBody().getSubject();
    }
  
    public boolean validateJwtToken(String authToken) {
      try {
        Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(authToken);
        return true;
      } catch (SignatureException e) {
        logger.error("Invalid JWT signature: {}", e.getMessage());
      } catch (MalformedJwtException e) {
        logger.error("Invalid JWT token: {}", e.getMessage());
      } catch (ExpiredJwtException e) {
        logger.error("JWT token is expired: {}", e.getMessage());
      } catch (UnsupportedJwtException e) {
        logger.error("JWT token is unsupported: {}", e.getMessage());
      } catch (IllegalArgumentException e) {
        logger.error("JWT claims string is empty: {}", e.getMessage());
      }
  
      return false;
    }
    
    public String generateTokenFromUsername(String username) {
      return Jwts.builder()
          .setSubject(username)
          .setIssuedAt(new Date())
          .setExpiration(new Date((new Date()).getTime() + jwtExpirationMs))
          .signWith(SignatureAlgorithm.HS512, jwtSecret)
          .compact();
    }
    
}
