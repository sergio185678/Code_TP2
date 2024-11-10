package com.dietasist.app.models.repository;

import com.dietasist.app.models.entity.Message;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MessageRepository extends CrudRepository<Message,Integer> {
    @Query("SELECT m FROM Message m WHERE m.chat.id = :chat_id")
    List<Message> findByChatId(@Param("chat_id") Integer chat_id);
}
