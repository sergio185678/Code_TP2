package com.dietasist.app.models.repository;

import com.dietasist.app.models.entity.ValidationToken;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ValidationTokenRepository extends CrudRepository<ValidationToken,Integer> {
    ValidationToken findByToken(String token);
    @Query("SELECT v FROM ValidationToken v WHERE v.user.id = :user_id")
    ValidationToken findByUserId(@Param("user_id") Integer user_id);
}
