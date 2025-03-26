package com.springboot.TMS.service;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.*;
import java.util.function.Function;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class JwtService {

    private static final String SECRET = "TenX - A Task Management App"; // Secret Key
    private final SecretKey secretKey = Keys.hmacShaKeyFor(Base64.getEncoder().encode(SECRET.getBytes(StandardCharsets.UTF_8)));

    // Store blacklisted tokens (thread-safe)
    private static final Set<String> BLACKLISTED_TOKENS = Collections.newSetFromMap(new ConcurrentHashMap<>());

    /**
     * Generates a JWT token for a given email.
     */
    public String generateToken(String email) {
        return Jwts.builder()
                .setSubject(email)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60)) // 1 hour expiry
                .signWith(secretKey, SignatureAlgorithm.HS256)
                .compact();
    }

    /**
     * Extracts username (email) from the JWT token.
     */
    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    /**
     * Validates the token against the provided user details.
     */
//    public boolean validateToken(String token, UserDetails userDetails) {
//        final String username = extractUsername(token);
//        return username.equals(userDetails.getUsername()) && !isTokenExpired(token) && !isTokenBlacklisted(token);
//    }

    public boolean validateToken(String token, UserDetails userDetails) {
        final String username = extractUsername(token);

        // 🚨 Reject blacklisted tokens
        if (isTokenBlacklisted(token)) {
            System.out.println("Token is blacklisted: " + token);
            return false;
        }

        return username.equals(userDetails.getUsername()) && !isTokenExpired(token);
    }


    /**
     * Checks if a token is expired.
     */
    private boolean isTokenExpired(String token) {
        return extractClaim(token, Claims::getExpiration).before(new Date());
    }

    /**
     * Extracts a claim from the token.
     */
    private <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        Claims claims = Jwts.parserBuilder()
                .setSigningKey(secretKey)
                .build()
                .parseClaimsJws(token)
                .getBody();
        return claimsResolver.apply(claims);
    }

    /**
     * Blacklists a token (e.g., on logout).
     */
    public void blacklistToken(String token) {
        BLACKLISTED_TOKENS.add(token);
    }

    /**
     * Checks if a token is blacklisted.
     */
    public boolean isTokenBlacklisted(String token) {
        return BLACKLISTED_TOKENS.contains(token);
    }

    /**
     * Checks if a token is valid (not expired & not blacklisted).
     */
    public boolean isTokenValid(String token, String email) {
        String extractedEmail = extractUsername(token);
        return extractedEmail.equals(email) && !isTokenExpired(token) && !isTokenBlacklisted(token);
    }
}
