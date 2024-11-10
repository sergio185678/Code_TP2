package com.dietasist.app.models.dto;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Builder
public class RegisterDto {
    private String email;
    private String password;
    private String fullname;
}
