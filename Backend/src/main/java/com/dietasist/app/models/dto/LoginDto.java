package com.dietasist.app.models.dto;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Builder
public class LoginDto {
    private String email;
    private String password;
}
