// package nus.iss.Backend.security.service;

// import java.util.Collection;
// import java.util.List;
// import java.util.Objects;
// import java.util.stream.Collectors;

// import lombok.*;

// import org.springframework.security.core.GrantedAuthority;
// import org.springframework.security.core.authority.SimpleGrantedAuthority;
// import org.springframework.security.core.userdetails.UserDetails;

// import com.fasterxml.jackson.annotation.JsonIgnore;

// import nus.iss.Backend.model.User;

// // @Getter
// // @Setter

// public class UserDetailsImpl {
  
//     private String username;
    
//     @JsonIgnore
//     private String password;
  
  
//     public UserDetailsImpl(String username, String password) {
//       this.username = username;

//       this.password = password;
//     }
  

//     @Override
//     public String getPassword() {
//       return password;
//     }
  
//     @Override
//     public String getUsername() {
//       return username;
//     }
  
//     @Override
//     public boolean isEnabled() {
//       return true;
//     }
  
//     @Override
//     public boolean equals(Object o) {
//       if (this == o)
//         return true;
//       if (o == null || getClass() != o.getClass())
//         return false;
//       UserDetailsImpl user = (UserDetailsImpl) o;
//       return Objects.equals(username, user.username);
//     }


// }
