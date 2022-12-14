package nus.iss.Backend.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import nus.iss.Backend.model.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByUsername(String username);

    // Boolean wrongPassword(String password);

    Boolean existsByUsername(String username);

    // List<EmailDetails> findByEmail(String email);
  
}
