package nus.iss.Backend.payload.request;

import java.util.Set;

import javax.validation.constraints.NotBlank;

import lombok.*;

@Getter
@Setter
public class RegisterRequest {

    @NotBlank
    private String username;
    
    private Set<String> role;
    
    @NotBlank
    private String password;
    
}
