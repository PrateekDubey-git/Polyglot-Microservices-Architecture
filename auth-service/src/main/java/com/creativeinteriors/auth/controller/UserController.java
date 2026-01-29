package com.creativeinteriors.auth.controller;

import com.creativeinteriors.auth.dto.OnboardRequest;
import com.creativeinteriors.auth.entity.User;
import com.creativeinteriors.auth.exception.ApiException;
import com.creativeinteriors.auth.repository.UserRepository;
import com.creativeinteriors.auth.service.JwtService;
import io.jsonwebtoken.Claims;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user")
public class UserController {

    private final JwtService jwtService;
    private final UserRepository userRepository;

    public UserController(JwtService jwtService,
                          UserRepository userRepository) {
        this.jwtService = jwtService;
        this.userRepository = userRepository;
    }

    @PutMapping("/onboard")
    public String onboard(@RequestHeader("Authorization") String authHeader,
                          @RequestBody OnboardRequest req) {

        String token = authHeader.substring(7);
        Claims claims = jwtService.verifyAndParse(token);

        String email = claims.getSubject();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ApiException("User not found"));

        user.setName(req.getName());
        user.setPhoneNumber(req.getPhoneNumber());
        user.setOnBoard(true);

        userRepository.save(user);
        return "User onboarded successfully";
    }
}
