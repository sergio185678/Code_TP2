package com.dietasist.app.models.repository;

import com.dietasist.app.models.entity.AllergicIngredient;
import com.dietasist.app.models.entity.ValidationToken;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AllergicIngredientRepository extends CrudRepository<AllergicIngredient,Integer> {
    @Query("SELECT a FROM AllergicIngredient a WHERE a.user.id = :user_id")
    List<AllergicIngredient> findByUserId(@Param("user_id") Integer user_id);
}
