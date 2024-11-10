package com.dietasist.app.models.dto;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Builder
public class EditMedicalParametersDto {
    private Integer hypertension;
    private Float glycosylated_hemoglobin;
    private Integer triglyceride;
    private Integer cholesterol_total;
    private Integer cholesterol_LDL;
    private Float urid_acid;
}
