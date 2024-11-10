package com.dietasist.app.utils;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class ScalerUtil {
    public static class ScalerParams {
        @JsonProperty("data_min_")
        private List<Float> data_min_;
        @JsonProperty("data_max_")
        private List<Float> data_max_;

        // Getters y setters
        public List<Float> getData_min_() {
            return data_min_;
        }

        public void setData_min_(List<Float> data_min_) {
            this.data_min_ = data_min_;
        }

        public List<Float> getData_max_() {
            return data_max_;
        }

        public void setData_max_(List<Float> data_max_) {
            this.data_max_ = data_max_;
        }
    }

    // Método para cargar los parámetros del scaler desde recursos empaquetados en el JAR
    public ScalerParams loadScalerParams(String filePath) throws IOException {
        ObjectMapper objectMapper = new ObjectMapper();
        InputStream inputStream = getClass().getClassLoader().getResourceAsStream(filePath);
        if (inputStream == null) {
            throw new IOException("Archivo no encontrado: " + filePath);
        }
        return objectMapper.readValue(inputStream, ScalerParams.class);
    }

    // Método para aplicar el escalado
    public List<Float> scaleData(List<Float> data, ScalerParams scalerParams) {
        if (data.size() != scalerParams.getData_min_().size() || data.size() != scalerParams.getData_max_().size()) {
            throw new IllegalArgumentException("El número de características en los datos no coincide con los parámetros del escalador.");
        }

        List<Float> scaledData = new ArrayList<>();
        for (int i = 0; i < data.size(); i++) {
            float min = scalerParams.getData_min_().get(i);
            float max = scalerParams.getData_max_().get(i);
            float value = data.get(i);
            float scaledValue = (value - min) / (max - min);
            scaledData.add(scaledValue);
        }
        return scaledData;
    }

    // Método para invertir el escalado
    public List<Float> inverseScaleData(List<Float> data, ScalerParams scalerParams) {
        if (data.size() != scalerParams.getData_min_().size() || data.size() != scalerParams.getData_max_().size()) {
            throw new IllegalArgumentException("El número de características en los datos no coincide con los parámetros del escalador.");
        }

        List<Float> originalData = new ArrayList<>();
        for (int i = 0; i < data.size(); i++) {
            float min = scalerParams.getData_min_().get(i);
            float max = scalerParams.getData_max_().get(i);
            float scaledValue = data.get(i);
            float originalValue = scaledValue * (max - min) + min;
            originalData.add(originalValue);
        }
        return originalData;
    }
}