package com.springboot.TMS.controller;

import com.springboot.TMS.dto.LoginRequest;
import com.springboot.TMS.entity.User;
import com.springboot.TMS.service.JwtService;
import com.springboot.TMS.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.*;

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

    private static final Set<String> blacklistedTokens = new HashSet<>();

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {
        Optional<User> existingUser = userService.findByEmail(user.getEmail());

        if (existingUser.isPresent()) {
            return ResponseEntity.status(400).body(Map.of("error", "User already exists!"));
        }

        userService.registerUser(user.getName(), user.getEmail(), user.getPassword());
        return ResponseEntity.ok(Map.of("message", "User registered successfully!"));
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
                return ResponseEntity.ok(Map.of("token", "Bearer " + token, "message", "Login successful"));
            } else {
                System.out.println("Password does not match!");
                return ResponseEntity.status(401).body(Map.of("error", "Invalid credentials"));
            }
        }

        System.out.println("User not found!");
        return ResponseEntity.status(401).body(Map.of("error", "Invalid credentials"));
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(@RequestHeader("Authorization") String authHeader) {
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return ResponseEntity.status(400).body(Map.of("error", "Invalid token"));
        }

        String token = authHeader.substring(7); // Remove "Bearer " prefix
        jwtService.blacklistToken(token);

        return ResponseEntity.ok(Map.of("message", "Logged out successfully!"));
    }

    @GetMapping("/user-info")
    public ResponseEntity<?> getUserInfo(@RequestHeader("Authorization") String authHeader) {
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return ResponseEntity.status(400).body(Map.of("error", "Invalid token"));
        }

        String token = authHeader.substring(7); // Remove "Bearer " prefix
        String email = jwtService.extractUsername(token); // Extract email from JWT

        Optional<User> userOptional = userService.findByEmail(email);

        if (userOptional.isPresent()) {
            User user = userOptional.get();
            return ResponseEntity.ok(Map.of("name", user.getName(), "email", user.getEmail()));
        } else {
            return ResponseEntity.status(404).body(Map.of("error", "User not found"));
        }
    }

    @PutMapping("/updateUser")
    public ResponseEntity<?> updateUser(@RequestHeader("Authorization") String authHeader,
                                        @RequestBody User updatedUser) {
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return ResponseEntity.status(401).body(Map.of("error", "Unauthorized"));
        }

        String token = authHeader.substring(7);
        String userEmail = jwtService.extractUsername(token);

        Optional<User> existingUserOpt = userService.findByEmail(userEmail);
        if (existingUserOpt.isEmpty()) {
            return ResponseEntity.status(404).body(Map.of("error", "User not found"));
        }

        User existingUser = existingUserOpt.get();
        existingUser.setName(updatedUser.getName());
        existingUser.setEmail(updatedUser.getEmail());

        userService.save(existingUser);

        return ResponseEntity.ok(Map.of("message", "User updated successfully"));
    }



    public static boolean isTokenBlacklisted(String token) {
        return blacklistedTokens.contains(token);
    }
}
