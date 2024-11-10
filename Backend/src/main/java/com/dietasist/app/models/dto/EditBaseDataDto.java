package com.dietasist.app.models.dto;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Builder
public class EditBaseDataDto {
    private String gender;
    private Integer size;
    private Integer age;
    private Integer weight;
    private String physical_activity;
    private Integer meal_frequency;
}
