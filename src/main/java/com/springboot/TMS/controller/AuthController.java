package com.springboot.TMS.controller;

import com.springboot.TMS.dto.LoginRequest;
import com.springboot.TMS.entity.User;
import com.springboot.TMS.service.JwtService;
import com.springboot.TMS.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private UserService userService;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {
        Optional<User> existingUser = userService.findByEmail(user.getEmail());

        if (existingUser.isPresent()) {
            return ResponseEntity.status(400).body(Map.of("error", "User already exists!"));
        }
        userService.registerUser(user.getName(), user.getEmail(), user.getPassword());
        return ResponseEntity.ok("User registered successfully!");
    }


    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        Optional<User> userOptional = userService.findByEmail(loginRequest.getEmail());

        if (userOptional.isPresent()) {
            User user = userOptional.get();

            System.out.println("Stored Password (Hashed): " + user.getPassword());
            System.out.println("Entered Password (Raw): " + loginRequest.getPassword());

            if (passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
                String token = jwtService.generateToken(user.getEmail());
                return ResponseEntity.ok(Map.of("token", "Bearer " + token));
            } else {
                System.out.println("Password does not match!");
                return ResponseEntity.status(401).body(Map.of("error", "Invalid credentials"));
            }
        }

        System.out.println("User not found!");
        return ResponseEntity.status(401).body(Map.of("error", "Invalid credentials"));
    }


}
