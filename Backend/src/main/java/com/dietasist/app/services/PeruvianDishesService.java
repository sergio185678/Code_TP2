package com.dietasist.app.services;

import com.dietasist.app.models.dto.PeruvianDishesDto;
import com.dietasist.app.models.entity.PeruvianDishes;
import com.dietasist.app.models.repository.PeruvianDishesRepository;
import com.dietasist.app.services.interfaces.IPeruvianDishesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class  PeruvianDishesService implements IPeruvianDishesService {
    @Autowired
    private PeruvianDishesRepository peruvianDishesRepository;
    @Override
    public void registerDishes(PeruvianDishesDto peruvianDishesDto) {
        PeruvianDishes peruvianDishes=PeruvianDishes.builder()
                .name(peruvianDishesDto.getName())
                .receta(peruvianDishesDto.getReceta())
                .portion(peruvianDishesDto.getPortion())
                .calories(peruvianDishesDto.getCalories())
                .carbohydrates(peruvianDishesDto.getCarbohydrates())
                .protein(peruvianDishesDto.getProtein())
                .total_fat(peruvianDishesDto.getTotal_fat())
                .cholesterol_level(peruvianDishesDto.getCholesterol_level())
                .uric_acid_level(peruvianDishesDto.getUric_acid_level())
                .List_ingredient_portion(peruvianDishesDto.getList_ingredient_portion())
                .List_important_ingredient_portion(peruvianDishesDto.getList_important_ingredient_portion())
                .individual_percentage(peruvianDishesDto.getIndividual_percentage())
                .total_percentage(peruvianDishesDto.getTotal_percentage())
                .array_portions(peruvianDishesDto.getArray_portions())
                .build();
        peruvianDishesRepository.save(peruvianDishes);
    }

    @Override
    public String getreceta(Integer peruvinsheid) {
        PeruvianDishes peruvianDishes=peruvianDishesRepository.findById(peruvinsheid).orElse(null);
        if(peruvianDishes!=null){
            return peruvianDishes.getReceta();
        }else{
            return "";
        }
    }
}
