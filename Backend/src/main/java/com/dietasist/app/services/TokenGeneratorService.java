package com.dietasist.app.services;

import org.springframework.stereotype.Service;

import java.math.BigInteger;
import java.security.SecureRandom;

@Service
public class TokenGeneratorService {
    private static final SecureRandom secureRandom = new SecureRandom(); // threadsafe
    private static final int TOKEN_LENGTH = 32; // 32 bytes

    public String generateToken() {
        byte[] tokenBytes = new byte[TOKEN_LENGTH];
        secureRandom.nextBytes(tokenBytes);
        return toHex(tokenBytes);
    }

    private String toHex(byte[] bytes) {
        BigInteger bigInteger = new BigInteger(1, bytes);
        String hexString = bigInteger.toString(16);

        // Zero pad it to the length (each byte is 2 hex characters)
        while (hexString.length() < TOKEN_LENGTH * 2) {
            hexString = "0" + hexString;
        }

        return hexString;
    }
}
