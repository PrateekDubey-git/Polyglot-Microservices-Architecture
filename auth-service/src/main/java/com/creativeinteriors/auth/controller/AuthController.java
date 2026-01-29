package com.creativeinteriors.auth.controller;

import com.creativeinteriors.auth.dto.AuthResponse;
import com.creativeinteriors.auth.dto.SendOtpRequest;
import com.creativeinteriors.auth.dto.VerifyOtpRequest;
import com.creativeinteriors.auth.service.AuthService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/send-otp")
    public String sendOtp(@RequestBody SendOtpRequest req) {
        authService.sendOtp(req.getEmail());
        return "OTP sent";
    }

    @PostMapping("/verify-otp")
    public AuthResponse verifyOtp(@RequestBody VerifyOtpRequest req) {
        return authService.verifyOtp(req.getEmail(), req.getOtp());
    }
}
