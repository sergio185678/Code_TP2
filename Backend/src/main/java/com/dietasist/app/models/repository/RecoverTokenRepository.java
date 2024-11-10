package com.dietasist.app.models.repository;

import com.dietasist.app.models.entity.RecoverToken;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface RecoverTokenRepository extends CrudRepository<RecoverToken,Integer> {
    RecoverToken findByToken(String token);
    @Query("SELECT r FROM RecoverToken r WHERE r.user.id = :user_id")
    RecoverToken findByUserId(@Param("user_id") Integer user_id);
}
