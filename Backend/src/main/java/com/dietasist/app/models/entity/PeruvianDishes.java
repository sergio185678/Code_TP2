package com.dietasist.app.models.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.io.Serializable;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Builder
@Entity
@Table(name="peruviandishes")
public class PeruvianDishes implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @Column(name = "name")
    private String name;
    @Column(name = "receta")
    private String receta;
    @Column(name = "portion")
    private Integer portion;
    @Column(name = "calories")
    private Integer calories;
    @Column(name = "carbohydrates")
    private Float carbohydrates;
    @Column(name = "protein")
    private Float protein;
    @Column(name = "total_fat")
    private Float total_fat;
    @Column(name = "cholesterol_level")
    private String cholesterol_level;
    @Column(name = "uric_acid_level")
    private String uric_acid_level;
    @Column(name = "List_ingredient_portion")
    private String List_ingredient_portion;
    @Column(name = "List_important_ingredient_portion")
    private String List_important_ingredient_portion;
    @Column(name = "individual_percentage")
    private String individual_percentage;
    @Column(name = "total_percentage")
    private Float total_percentage;
    @Column(name = "array_portions")
    private String array_portions;

    @OneToMany(mappedBy = "peruvianDishes")
    @JsonIgnore
    private List<Message> messages;
}
