package com.dietasist.app.models.repository;

import com.dietasist.app.models.entity.Ingredient;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IngredientRepository extends CrudRepository<Ingredient,Integer> {
}
