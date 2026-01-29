package com.creativeinteriors.auth.util;

import com.resend.*;
import com.resend.core.exception.ResendException;
import com.resend.services.emails.model.CreateEmailOptions;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class ResendEmailUtil {

    private final Resend resend;
    private final String fromEmail;

    public ResendEmailUtil(
            @Value("${resend.api-key}") String apiKey,
            @Value("${resend.from-email}") String fromEmail) {

        this.resend = new Resend(apiKey);
        this.fromEmail = fromEmail;
    }

    //  COMMON SEND FUNCTION
    public void sendEmail(String to, String subject, String htmlContent) {

        CreateEmailOptions params = CreateEmailOptions.builder()
                .from(fromEmail)
                .to(to)
                .subject(subject)
                .html(htmlContent)
                .build();

        try {
            resend.emails().send(params);
        } catch (ResendException e) {
            throw new RuntimeException("Email sending failed", e);
        }
    }

    //  OTP MAIL
    public void sendOtpMail(String to, String otp) {
        sendEmail(
                to,
                "Your OTP for Login",
                EmailTemplateUtil.otpTemplate(otp)
        );
    }

    //  WELCOME MAIL
    public void sendWelcomeMail(String to, String name) {
        sendEmail(
                to,
                "Welcome to Creative Interiors",
                EmailTemplateUtil.welcomeTemplate(name)
        );
    }
}
