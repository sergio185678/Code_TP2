package com.dietasist.app.models.repository;

import com.dietasist.app.models.entity.ImportantIngredient;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ImportantIngredientRepository extends CrudRepository<ImportantIngredient,Integer> {
}
