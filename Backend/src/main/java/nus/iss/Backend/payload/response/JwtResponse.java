package nus.iss.Backend.payload.response;

import java.util.List;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor

public class JwtResponse {
    private String token;
    private String type = "Bearer";
    private Long id;
    private String username;
    private List<String> roles;

    public JwtResponse(String accessToken, Long id, String username, List<String> roles) {
        this.token = accessToken;
        this.id = id;
        this.username = username;
        this.roles = roles;
    }

    public String getAccessToken() {
        return token;
      }
    
      public void setAccessToken(String accessToken) {
        this.token = accessToken;
      }
    
      public String getTokenType() {
        return type;
      }
    
      public void setTokenType(String tokenType) {
        this.type = tokenType;
      }
}
