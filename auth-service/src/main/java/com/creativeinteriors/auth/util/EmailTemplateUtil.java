package com.creativeinteriors.auth.util;

public class EmailTemplateUtil {

    //  OTP TEMPLATE
    public static String otpTemplate(String otp) {
        return """
            <div style="font-family: Arial, sans-serif;">
                <h2>Your OTP Code</h2>
                <p>Use the OTP below to continue:</p>
                <h1 style="letter-spacing: 4px;">%s</h1>
                <p>This OTP is valid for <b>5 minutes</b>.</p>
                <p>If you did not request this, please ignore.</p>
            </div>
        """.formatted(otp);
    }

    //  WELCOME TEMPLATE
    public static String welcomeTemplate(String name) {
        return """
            <div style="font-family: Arial, sans-serif;">
                <h2>Welcome, %s 👋</h2>
                <p>Your account has been successfully created.</p>
                <p>We’re happy to have you with us.</p>
            </div>
        """.formatted(name);
    }

    //  GENERIC ALERT TEMPLATE
    public static String alertTemplate(String message) {
        return """
            <div style="font-family: Arial, sans-serif;">
                <h2>Notification</h2>
                <p>%s</p>
            </div>
        """.formatted(message);
    }
}
