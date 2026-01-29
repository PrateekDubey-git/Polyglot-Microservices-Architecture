package com.creativeinteriors.auth.service;

import com.creativeinteriors.auth.dto.AuthResponse;
import com.creativeinteriors.auth.entity.User;
import com.creativeinteriors.auth.repository.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final OtpService otpService;
    private final JwtService jwtService;

    public AuthService(UserRepository userRepository,
                       OtpService otpService,
                       JwtService jwtService) {
        this.userRepository = userRepository;
        this.otpService = otpService;
        this.jwtService = jwtService;
    }

    public void sendOtp(String email) {
        otpService.sendOtp(email);
    }

    public AuthResponse verifyOtp(String email, String otp) {

        otpService.verifyOtp(email, otp);

        User user = userRepository.findByEmail(email)
                .orElseGet(() -> {
                    User u = new User();
                    u.setEmail(email);
                    return userRepository.save(u);
                });

        String token = jwtService.generateToken(user);
        return new AuthResponse(token, user.isOnBoard());
    }
}
