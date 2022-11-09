package nus.iss.Backend.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
// import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import nus.iss.Backend.security.jwt.AuthEntryPointJwt;
import nus.iss.Backend.security.jwt.AuthTokenFilter;
import nus.iss.Backend.security.service.UserDetailsServiceImpl;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class WebSecurityConfig {
  @Autowired
  UserDetailsServiceImpl userDetailsService;

  @Autowired
  private AuthEntryPointJwt unauthorizedHandler;

  @Bean
  public AuthTokenFilter authenticationJwtTokenFilter() {
    return new AuthTokenFilter();
  }

//   @Override
//   public void configure(AuthenticationManagerBuilder authManagerBuilder) throws Exception {
//     authManagerBuilder.userDetailsService(userDetailsService).passwordEncoder(passwordEncoder());
//   }

  @Bean
  public DaoAuthenticationProvider authenticationProvider() {
      DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
       
      authProvider.setUserDetailsService(userDetailsService);
      authProvider.setPasswordEncoder(passwordEncoder());
   
      return authProvider;
  }

  @Bean
  public AuthenticationManager authenticationManager(AuthenticationConfiguration authConfig) throws Exception {
    return authConfig.getAuthenticationManager();
  }

  @Bean
  public PasswordEncoder passwordEncoder() {
    return new BCryptPasswordEncoder();
  }

  @Bean
  public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
    http.cors().and().csrf().disable()
        .exceptionHandling().authenticationEntryPoint(unauthorizedHandler).and()
        .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS).and()
        // .authorizeRequests().antMatchers("/api/auth/mood/**").permitAll()
        .authorizeRequests() //.antMatchers("/api/test/**", "/").permitAll()
        //which means allow all requests, see network(inspect) to add what is required to match the url pattern
        .antMatchers("assets/**", "/main.1ca72e24eb2b8b55.js", "/polyfills.ec8e0ab232edfb59.js", "/runtime.29b7a6b499445dfe.js", "/sakura.9b38791f4f980c22.gif", "/styles.ece84d036a3ffee6.css", "/wallpaper.797a61ab532ef45b.jpg", "/favicon.ico", "/index.html","/api/test/**","/api/auth/mood/**", "/api/auth/send", "/**", "/", "/home", "/about" ).permitAll()
        .anyRequest().authenticated();
    
    http.authenticationProvider(authenticationProvider());

    http.addFilterBefore(authenticationJwtTokenFilter(), UsernamePasswordAuthenticationFilter.class);
    
    return http.build();
  }

  // @Bean
  // public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
  //   http.cors().and().csrf().disable()
  //       .exceptionHandling().authenticationEntryPoint(unauthorizedHandler).and()
  //       .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS).and()
  //       .authorizeRequests().antMatchers("/api/auth/**").permitAll()
  //       .antMatchers("/api/test/**").permitAll()
  //       .anyRequest().authenticated();
    
  //   http.authenticationProvider(authenticationProvider());

  //   http.addFilterBefore(authenticationJwtTokenFilter(), UsernamePasswordAuthenticationFilter.class);
    
  //   return http.build();
  // }
}