package com.dietasist.app.models.dto;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Builder
public class UserDto {
    private String fullname;
    private String profile_photo;
    private String gender;
    private Integer size;
    private Integer age;
    private Integer weight;
    private String physical_activity;
    private Integer meal_frequency;
    private Integer hypertension;
    private Float glycosylated_hemoglobin;
    private Integer triglyceride;
    private Integer cholesterol_total;
    private Integer cholesterol_LDL;
    private Float urid_acid;
    private Integer carbohydrate_required;
    private Integer protein_required;
    private Integer totalfat_required;
}
