package com.creativeinteriors.auth.service;

import com.creativeinteriors.auth.exception.ApiException;
import com.creativeinteriors.auth.util.OtpUtil;
import com.creativeinteriors.auth.util.ResendEmailUtil;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.util.concurrent.TimeUnit;

@Service
public class OtpService {

    private final RedisTemplate<String, String> redisTemplate;
    private final ResendEmailUtil emailUtil;

    
    public OtpService(RedisTemplate<String, String> redisTemplate,
                      ResendEmailUtil emailUtil) {
        this.redisTemplate = redisTemplate;
        this.emailUtil = emailUtil;
    }

    //  Send OTP
    public void sendOtp(String email) {

        String otp = OtpUtil.generateOtp();

        redisTemplate.opsForValue()
                .set("otp:" + email, otp, 5, TimeUnit.MINUTES);

        //  Send OTP via Resend
        emailUtil.sendOtpMail(email, otp);
        System.out.println("OTP for " + email + " = " + otp);
    }

    //  Verify OTP
    public void verifyOtp(String email, String otp) {

        String savedOtp = redisTemplate.opsForValue().get("otp:" + email);

        if (savedOtp == null || !savedOtp.equals(otp)) {
            throw new ApiException("Invalid or expired OTP");
        }

        redisTemplate.delete("otp:" + email);
    }
}
