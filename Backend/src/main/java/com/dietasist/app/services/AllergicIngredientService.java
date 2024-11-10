package com.dietasist.app.services;

import com.dietasist.app.models.dto.AllergicIngredientDto;
import com.dietasist.app.models.entity.AllergicIngredient;
import com.dietasist.app.models.entity.Ingredient;
import com.dietasist.app.models.entity.User;
import com.dietasist.app.models.repository.AllergicIngredientRepository;
import com.dietasist.app.models.repository.IngredientRepository;
import com.dietasist.app.models.repository.UserRepository;
import com.dietasist.app.services.interfaces.IAllergicIngredientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class AllergicIngredientService implements IAllergicIngredientService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private IngredientRepository ingredientRepository;
    @Autowired
    private AllergicIngredientRepository allergicIngredientRepository;
    @Override
    public void registerIngredients(List<String> allergicIngredients, Integer userid) {
        User user=userRepository.findById(userid).orElse(null);
        for (String ingredient : allergicIngredients) {
            AllergicIngredient allergicIngredient=AllergicIngredient.builder()
                    .name(ingredient)
                    .user(user)
                    .build();
            allergicIngredientRepository.save(allergicIngredient);
        }
    }

    @Override
    public List<AllergicIngredientDto> getbyuser(Integer userid) {
        List<AllergicIngredient> allergicIngredientList=allergicIngredientRepository.findByUserId(userid);
        return allergicIngredientList.stream().map(this::convertToDTO).collect(Collectors.toList());
    }

    @Override
    public void deleteIngredient(Integer allergicingredientid) {
        AllergicIngredient allergicIngredient=allergicIngredientRepository.findById(allergicingredientid).orElse(null);
        if(allergicIngredient!=null){
            allergicIngredientRepository.delete(allergicIngredient);
        }
    }

    @Override
    public List<Ingredient> get_all_for_dropdown_ingredient(Integer userid) {
        List<AllergicIngredient> allergicIngredientList=allergicIngredientRepository.findByUserId(userid);
        List<Ingredient> ingredients= (List<Ingredient>) ingredientRepository.findAll();

        // Crear una lista con los nombres de los ingredientes alérgicos
        List<String> allergicIngredientNames = allergicIngredientList.stream()
                .map(AllergicIngredient::getName)
                .collect(Collectors.toList());

        // Filtrar los ingredientes eliminando aquellos que están en la lista de alérgicos
        ingredients.removeIf(ingredient -> allergicIngredientNames.contains(ingredient.getName()));
        return ingredients;
    }

    private AllergicIngredientDto convertToDTO(AllergicIngredient allergicIngredient) {

        AllergicIngredientDto allergicIngredientDto = new AllergicIngredientDto();
        allergicIngredientDto.setId(allergicIngredient.getId());
        allergicIngredientDto.setName(allergicIngredient.getName());
        return allergicIngredientDto;
    }
}
