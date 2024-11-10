package com.dietasist.app.models.repository;

import com.dietasist.app.models.entity.Chat;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ChatRepository extends CrudRepository<Chat,Integer> {
    @Query("SELECT c FROM Chat c WHERE c.user.id = :user_id")
    List<Chat> findByUserId(@Param("user_id") Integer user_id);
}
