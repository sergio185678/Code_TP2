package com.dietasist.app.models.dto;

import lombok.*;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Builder
public class ChatDto {
    private Integer id;
    private String name;
    private LocalDateTime created_at;
}
