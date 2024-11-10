package com.dietasist.app.models.dto;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Builder
public class AllergicIngredientDto {
    private Integer id;
    private String name;
}
