package nus.iss.Backend.security.service;

import org.springframework.beans.factory.annotation.Autowired;


import org.springframework.security.core.userdetails.UsernameNotFoundException;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import nus.iss.Backend.beans.UserDetailsDto;
import nus.iss.Backend.model.User;
import nus.iss.Backend.repository.UserRepository;

@Service
public class UserDetailsServiceImpl implements UserDetailsService{

    @Autowired
    private UserRepository userRepo;
  
    @Override
    @Transactional
    public UserDetailsDto loadUserByUsername(String username) throws UsernameNotFoundException {
      User user = userRepo.findByUsername(username)
          .orElseThrow(() -> new UsernameNotFoundException("User Not Found with username: " + username));
      UserDetailsDto userDto = convertToUserDto(user);
  
      return userDto;
    }

    public UserDetailsDto convertToUserDto(User user){
      return new UserDetailsDto(
          user.getUsername());
    }
    
}
