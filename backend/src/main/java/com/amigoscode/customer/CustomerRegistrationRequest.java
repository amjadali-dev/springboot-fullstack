package com.amigoscode.customer;

public record CustomerRegistrationRequest(
        String name,
        String email,
        Integer age,
        String gender,
        String password

) {
}
