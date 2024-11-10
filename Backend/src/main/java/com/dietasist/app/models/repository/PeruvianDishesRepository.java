package com.dietasist.app.models.repository;

import com.dietasist.app.models.entity.PeruvianDishes;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PeruvianDishesRepository extends CrudRepository<PeruvianDishes,Integer> {
}
