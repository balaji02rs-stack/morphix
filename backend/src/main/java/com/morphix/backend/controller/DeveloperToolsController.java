package com.morphix.backend.controller;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.web.bind.annotation.*;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.SecureRandom;
import java.util.Base64;
import java.util.UUID;

@RestController
@RequestMapping("/api/dev")
@CrossOrigin(origins = "*")
public class DeveloperToolsController {

    private static final String UPPER = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    private static final String LOWER = "abcdefghijklmnopqrstuvwxyz";
    private static final String NUMBERS = "0123456789";
    private static final String SYMBOLS = "!@#$%^&*()_-+=<>?";

    private static final SecureRandom RANDOM = new SecureRandom();

    private final ObjectMapper objectMapper = new ObjectMapper();

    @GetMapping("/health")
    public String health() {
        return "Morphix Backend Running";
    }

    @GetMapping("/uuid")
    public String generateUUID() {
        return UUID.randomUUID().toString();
    }

    @GetMapping("/password")
    public String generatePassword(
            @RequestParam(defaultValue = "16") int length,
            @RequestParam(defaultValue = "true") boolean upper,
            @RequestParam(defaultValue = "true") boolean lower,
            @RequestParam(defaultValue = "true") boolean number,
            @RequestParam(defaultValue = "true") boolean symbol) {

        StringBuilder characters = new StringBuilder();

        if (upper) characters.append(UPPER);
        if (lower) characters.append(LOWER);
        if (number) characters.append(NUMBERS);
        if (symbol) characters.append(SYMBOLS);

        if (characters.length() == 0) {
            return "Please select at least one character type.";
        }

        StringBuilder password = new StringBuilder();

        for (int i = 0; i < length; i++) {
            password.append(characters.charAt(RANDOM.nextInt(characters.length())));
        }

        return password.toString();
    }

    @GetMapping("/sha256")
    public String generateSHA256(@RequestParam String text) {

        try {

            MessageDigest digest = MessageDigest.getInstance("SHA-256");

            byte[] hash = digest.digest(text.getBytes(StandardCharsets.UTF_8));

            StringBuilder hex = new StringBuilder();

            for (byte b : hash) {

                String value = Integer.toHexString(0xff & b);

                if (value.length() == 1) {
                    hex.append('0');
                }

                hex.append(value);
            }

            return hex.toString();

        } catch (Exception e) {
            return "Error generating SHA-256 hash.";
        }
    }

    @GetMapping("/base64/encode")
    public String encode(@RequestParam String text) {
        return Base64.getEncoder()
                .encodeToString(text.getBytes(StandardCharsets.UTF_8));
    }

    @GetMapping("/base64/decode")
    public String decode(@RequestParam String text) {

        try {
            return new String(
                    Base64.getDecoder().decode(text),
                    StandardCharsets.UTF_8
            );
        } catch (Exception e) {
            return "Invalid Base64 Input";
        }
    }

    @PostMapping("/json/format")
    public String formatJson(@RequestBody String json) {

        try {

            JsonNode node = objectMapper.readTree(json);

            return objectMapper
                    .writerWithDefaultPrettyPrinter()
                    .writeValueAsString(node);

        } catch (Exception e) {
            return "Invalid JSON";
        }
    }

    @PostMapping("/json/validate")
    public String validateJson(@RequestBody String json) {

        try {

            objectMapper.readTree(json);

            return "Valid JSON ✅";

        } catch (Exception e) {
            return "Invalid JSON ❌";
        }
    }
}