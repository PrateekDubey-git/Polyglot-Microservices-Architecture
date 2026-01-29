package com.creativeinteriors.auth.dto;

public class AuthResponse {

    private String token;
    private boolean onBoard;

    public AuthResponse(String token, boolean onBoard) {
        this.token = token;
        this.onBoard = onBoard;
    }

    public String getToken() {
        return token;
    }

    public boolean isOnBoard() {
        return onBoard;
    }
}
