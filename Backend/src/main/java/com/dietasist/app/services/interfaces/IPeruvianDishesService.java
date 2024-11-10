package com.dietasist.app.services.interfaces;

import com.dietasist.app.models.dto.PeruvianDishesDto;

public interface IPeruvianDishesService {
    void registerDishes(PeruvianDishesDto peruvianDishesDto);
    String getreceta(Integer peruvinsheid);
}
