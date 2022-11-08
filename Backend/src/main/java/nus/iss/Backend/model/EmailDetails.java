package nus.iss.Backend.model;

// import com.fasterxml.jackson.databind.annotation.JsonDeserialize;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
// @JsonDeserialize(builder = EmailDetails.class)
public class EmailDetails {
    
    private String name;

    private String email;

}
