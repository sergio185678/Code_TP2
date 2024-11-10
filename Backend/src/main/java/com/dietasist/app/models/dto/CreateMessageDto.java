package com.dietasist.app.models.dto;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Builder
public class CreateMessageDto {
    private Integer chat_id;
    private Integer is_bot;
    private String msg;
    private String color;
    private String list_result;
    private Integer peruviandisheid;
    private Integer f_Porcion;
    private Integer f_Calorias;
    private Float f_Carbohidratos;
    private Float f_Proteinas;
    private Float f_Grasas;
}
