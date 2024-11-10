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
@Table(name="user")
public class User implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @Column(name = "email")
    private String email;
    @Column(name = "password")
    private String password;
    @Column(name = "fullname")
    private String fullname;
    @Column(name = "estado_validacion")
    private String estado_validacion;
    @Column(name = "profile_photo")
    private String profile_photo;
    @Column(name = "gender")
    private String gender;
    @Column(name = "size")
    private Integer size;
    @Column(name = "age")
    private Integer age;
    @Column(name = "weight")
    private Integer weight;
    @Column(name = "physical_activity")
    private String physical_activity;
    @Column(name = "meal_frequency")
    private Integer meal_frequency;
    @Column(name = "hypertension")
    private Integer hypertension;
    @Column(name = "glycosylated_hemoglobin")
    private Float glycosylated_hemoglobin;
    @Column(name = "triglyceride")
    private Integer triglyceride;
    @Column(name = "cholesterol_total")
    private Integer cholesterol_total;
    @Column(name = "cholesterol_LDL")
    private Integer cholesterol_LDL;
    @Column(name = "urid_acid")
    private Float urid_acid;

    @Column(name = "calories_intake")
    private Integer calories_intake;
    @Column(name = "carbohydrate_required")
    private Integer carbohydrate_required;
    @Column(name = "protein_required")
    private Integer protein_required;
    @Column(name = "totalfat_required")
    private Integer totalfat_required;

    @OneToMany(mappedBy = "user")
    @JsonIgnore
    private List<AllergicIngredient> allergicIngredients;

    @OneToMany(mappedBy = "user")
    @JsonIgnore
    private List<Chat> chats;

    @OneToOne(mappedBy = "user")
    @JsonIgnore
    private ValidationToken validationToken;

    @OneToOne(mappedBy = "user")
    @JsonIgnore
    private RecoverToken recoverToken;
}
