package nus.iss.Backend.security.service;

import org.springframework.security.core.userdetails.UsernameNotFoundException;
import nus.iss.Backend.beans.UserDetailsDto;

public interface UserDetailsService {
    UserDetailsDto loadUserByUsername(String username) throws UsernameNotFoundException;
  }
