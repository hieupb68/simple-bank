package com.example.loanmanagement.controller;

import com.example.loanmanagement.entity.ERole;
import com.example.loanmanagement.entity.ESignupError;
import com.example.loanmanagement.entity.Role;
import com.example.loanmanagement.entity.User;
import com.example.loanmanagement.model.payload.request.LoginRequest;
import com.example.loanmanagement.model.payload.request.SignupRequest;
import com.example.loanmanagement.model.payload.response.JwtResponse;
import com.example.loanmanagement.model.payload.response.MessageResponse;
import com.example.loanmanagement.repository.RoleRepository;
import com.example.loanmanagement.security.jwt.JwtUtils;
import com.example.loanmanagement.security.services.UserDetailsImpl;
import com.example.loanmanagement.service.MemberService;
import jakarta.validation.Valid;
import jakarta.websocket.server.PathParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;

import java.util.*;
import java.util.stream.Collectors;

@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    MemberService userService;

    @Autowired
    RoleRepository roleRepository;

    @Autowired
    PasswordEncoder encoder;

    @Autowired
    JwtUtils jwtUtils;

    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequest loginRequest) {

        Optional<User> existUser = userService.existsByUsername(loginRequest.getUsername());
        if (existUser.isEmpty()) {
            return ResponseEntity.badRequest().body(new MessageResponse("USERNAME_NOT_EXIST"));
        }

        if (!encoder.matches(loginRequest.getPassword(), existUser.get().getPassword())) {
            return ResponseEntity.badRequest().body(new MessageResponse("PASSWORD_INCORRECT"));
        }

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);

        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        List<String> roles = userDetails.getAuthorities().stream()
                .map(item -> item.getAuthority())
                .collect(Collectors.toList());

        return ResponseEntity.ok(new JwtResponse(jwt,
                userDetails.getId(),
                userDetails.getUsername(),
                userDetails.getEmail(),
                userDetails.getIsDeclared(),
                roles));
    }

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signUpRequest) {
        System.out.println("Register: " + userService.existsByUsername(signUpRequest.getUsername()).isPresent());
        if (userService.existsByUsername(signUpRequest.getUsername()).isPresent()) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse(ESignupError.USERNAME_EXIST.toString()));
        }

        if (userService.existsByEmail(signUpRequest.getEmail()).isPresent()) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse(ESignupError.EMAIL_EXIST.toString()));
        }

        // Create new user's account
        User user = new User(signUpRequest.getUsername(),
                signUpRequest.getEmail(),
                encoder.encode(signUpRequest.getPassword()));

        user.setRoles(signUpRequest.getRole());
        userService.createUser(user);

        return ResponseEntity.ok(new MessageResponse("User registered successfully!"));
    }

    @GetMapping
    public ResponseEntity<?> getUserByEmail(@PathParam("email") String email) {
        Optional<User> userOptional = userService.existsByEmail(email);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            return ResponseEntity.ok(user);
        }

        return ResponseEntity.ok(new MessageResponse("Could not find"));
    }
}
