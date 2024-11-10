package com.dietasist.app.models.dto;

import lombok.*;

import java.util.HashMap;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Builder
public class PredecirDto {
    private HashMap<String, Integer> ingredientes_resultado;
    private int f_Porcion;
    private int f_Calorias;
    private float f_Carbohidratos;
    private float f_Proteinas;
    private float f_Grasas;
}
