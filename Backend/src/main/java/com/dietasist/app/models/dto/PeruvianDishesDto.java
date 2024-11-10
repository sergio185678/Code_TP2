package com.dietasist.app.models.dto;

import jakarta.persistence.Column;
import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Builder
public class PeruvianDishesDto {
    private String name;
    private String receta;
    private Integer portion;
    private Integer calories;
    private Float carbohydrates;
    private Float protein;
    private Float total_fat;
    private String cholesterol_level;
    private String uric_acid_level;
    private String List_ingredient_portion;
    private String List_important_ingredient_portion;
    private String individual_percentage;
    private Float total_percentage;
    private String array_portions;
}
