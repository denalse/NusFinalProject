package nus.iss.Backend.model;

import java.io.StringReader;

import javax.persistence.*;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "user")

public class User {
    
    @Id
    @Column(name="username")
    private String username;

    @Column(name="password")
    private String password;
    // private boolean terms;

    // public static User create(String json) {
        
    //     JsonReader reader = Json.createReader(new StringReader(json));
    //     JsonObject data = reader.readObject();
        
    //     final User user = new User();
    //     user.setUsername(data.getString("username"));
    //     user.setPassword(data.getString("password"));
    //     // user.setTerms(data.getBoolean("false"));

    //     return user;
    // }

    // public JsonObject toJson() {
    //     return Json.createObjectBuilder()
    //     .add("username", username)
    //     .add("password", password)
    //     // .add("terms", terms)
    //     .build();
    // }

    // public static User createSql(SqlRowSet rs) {
    //     User user = new User();
    //     user.setUsername(rs.getString("username"));
    //     user.setPassword(rs.getString("password"));
    //     // user.setTerms(rs.getBoolean("false"));
    
    //     return user;
    // }

    
}
