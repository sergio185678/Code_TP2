package com.dietasist.app.services.interfaces;

import com.dietasist.app.models.dto.CreateMessageDto;
import com.dietasist.app.models.dto.PredecirDto;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

public interface IMessageService {
    void create(CreateMessageDto createMessageDto);
    Boolean hipertension(Integer personaid);
    List<String> ingredientesalergicos(Integer personaid,Integer comidaid);
    PredecirDto predecir(Integer personaid, Integer comidaid);
    Boolean obesidad_apto(Integer personaid,Integer comidaid);
    Boolean colesterol_apto(Integer personaid,Integer comidaid);
    Boolean acidourico_apto(Integer personaid,Integer comidaid);
    List<Map<String, Object>> getRecomendation(Integer personaid, Integer comidaid);
}
