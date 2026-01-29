package com.creativeinteriors.auth.service;

import com.creativeinteriors.auth.entity.User;
import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;

@Service
public class JwtService {

    private final SecretKey secretKey;
    private final long expiry;

    public JwtService(
            @Value("${jwt.secret}") String secret,
            @Value("${jwt.expiry}") long expiry) {

        // convert String secret → Secure Key
        this.secretKey = Keys.hmacShaKeyFor(
                secret.getBytes(StandardCharsets.UTF_8)
        );
        this.expiry = expiry;
    }

    // Generate JWT
    public String generateToken(User user) {

        return Jwts.builder()
                .setSubject(user.getEmail())
                .claim("userId", user.getId())
                .claim("onBoard", user.isOnBoard())
                .claim("role", user.getRole()) //[ADMIN, USER]
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + expiry))
                .signWith(secretKey, SignatureAlgorithm.HS256) 
                .compact();
    }

    // 🔍 Verify & parse JWT
    public Claims verifyAndParse(String token) {

        return Jwts.parserBuilder()     
                .setSigningKey(secretKey)
                .build()
                .parseClaimsJws(token)
                .getBody();
    }
}
