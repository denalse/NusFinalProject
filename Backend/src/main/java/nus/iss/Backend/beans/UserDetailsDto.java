package nus.iss.Backend.beans;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_DEFAULT)
public class UserDetailsDto {

    private String username;
    private String password;
    
    public UserDetailsDto(String username) {
        this.username = username;
    }


    
}


