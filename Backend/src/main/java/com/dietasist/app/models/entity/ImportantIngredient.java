package com.dietasist.app.models.entity;

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
@Table(name="important_ingredient")
public class ImportantIngredient implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @Column(name = "name")
    private String name;
    @Column(name = "Portion")
    private Double portion;
    @Column(name = "Calories")
    private Double calories;
    @Column(name = "Protein")
    private Double protein;
    @Column(name = "Carbohydrates")
    private Double carbohydrates;
    @Column(name = "Total fat")
    private Double totalfat;
    @Column(name = "Calo/Port")
    private Double Calo_Port;
    @Column(name = "Prot/Port")
    private Double prot_Port;
    @Column(name = "Carbo/Port")
    private Double carbo_Port;
    @Column(name = "Fat/Port")
    private Double fat_Port;

}
