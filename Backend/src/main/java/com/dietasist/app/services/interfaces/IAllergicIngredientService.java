package com.dietasist.app.services.interfaces;

import com.dietasist.app.models.dto.AllergicIngredientDto;
import com.dietasist.app.models.entity.AllergicIngredient;
import com.dietasist.app.models.entity.Ingredient;

import java.util.List;

public interface IAllergicIngredientService {
    void registerIngredients(List<String> allergicIngredients, Integer userid);
    List<AllergicIngredientDto> getbyuser(Integer userid);
    void deleteIngredient(Integer allergicingredientid);
    List<Ingredient> get_all_for_dropdown_ingredient(Integer userid);

}
