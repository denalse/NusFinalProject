package nus.iss.Backend.payload.response;

import java.util.List;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor

public class UserInfoResponse {
    private String username;
    private List<String> roles;

    // public UserInfoResponse(String username, List<String> roles) {
    //     this.username = username;
    //     this.roles = roles;
    // }
}
