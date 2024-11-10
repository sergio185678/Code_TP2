package com.dietasist.app.models.dto;

import com.dietasist.app.models.entity.PeruvianDishes;
import lombok.*;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Builder
public class MessageDto {
    private String msg;
    private Integer is_bot;
    private String color;
    private LocalDateTime created_at;
    private String list_result;
    private PeruvianDishes peruvianDishes;
    private Integer f_Porcion;
    private Integer f_Calorias;
    private Float f_Carbohidratos;
    private Float f_Proteinas;
    private Float f_Grasas;
}
