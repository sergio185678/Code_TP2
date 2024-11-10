package com.dietasist.app.models.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.io.Serializable;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Builder
@Entity
@Table(name="message")
public class Message implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @Column(name = "msg")
    private String msg;
    @Column(name = "is_bot")
    private Integer is_bot;
    @Column(name = "color")
    private String color;
    @Column(name = "created_at")
    private LocalDateTime created_at;
    @Column(name = "list_result")
    private String list_result;
    @Column(name = "f_Porcion")
    private Integer f_Porcion;
    @Column(name = "f_Calorias")
    private Integer f_Calorias;
    @Column(name = "f_Carbohidratos")
    private Float f_Carbohidratos;
    @Column(name = "f_Proteinas")
    private Float f_Proteinas;
    @Column(name = "f_Grasas")
    private Float f_Grasas;

    @ManyToOne
    @JoinColumn(name="Chat_id")
    private Chat chat;

    @ManyToOne
    @JoinColumn(name="peruvian_dishes_id", nullable = true)
    private PeruvianDishes peruvianDishes;
}
