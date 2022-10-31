package nus.iss.Backend.payload.request;

import javax.validation.constraints.NotBlank;

import lombok.*;

@Getter
@Setter
public class LoginRequest {

    @NotBlank
	private String username;

	@NotBlank
	private String password;
    
}
