package com.dietasist.app.services;

import com.dietasist.app.models.dto.ChatDto;
import com.dietasist.app.models.dto.MessageDto;
import com.dietasist.app.models.dto.UserDto;
import com.dietasist.app.models.entity.Chat;
import com.dietasist.app.models.entity.Message;
import com.dietasist.app.models.entity.User;
import com.dietasist.app.models.repository.ChatRepository;
import com.dietasist.app.models.repository.MessageRepository;
import com.dietasist.app.models.repository.UserRepository;
import com.dietasist.app.services.interfaces.IChatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ChatService implements IChatService {
    @Autowired
    private ChatRepository chatRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private MessageRepository messageRepository;
    @Override
    public Integer register(Integer userid) {
        User user=userRepository.findById(userid).orElse(null);
        Chat chat = new Chat();
        LocalDateTime now = LocalDateTime.now();
        chat.setName("Chat");
        chat.setCreated_at(now);
        chat.setUser(user);
        chatRepository.save(chat);
        return chat.getId();
    }

    @Override
    public void edit_name(Integer chatid,String newname) {
        Chat chat = chatRepository.findById(chatid).orElse(null);
        if(chat!=null){
            chat.setName(newname);
            chatRepository.save(chat);
        }
    }

    @Override
    public void delete(Integer chatid) {
        Chat chat = chatRepository.findById(chatid).orElse(null);
        if(chat!=null){
            chatRepository.delete(chat);
        }
    }

    @Override
    public List<ChatDto> get_all_by_user(Integer userid) {
        List<Chat> chats=chatRepository.findByUserId(userid);
        return chats.stream().map(this::convertToDTO).collect(Collectors.toList()).reversed();
    }

    @Override
    public List<MessageDto> getonechat(Integer chatid) {
        List<Message> messages=messageRepository.findByChatId(chatid);
        return messages.stream().map(this::convertMessageToDTO).collect(Collectors.toList());
    }

    private ChatDto convertToDTO(Chat chat) {

        ChatDto chatDto = new ChatDto();
        chatDto.setId(chat.getId());
        chatDto.setName(chat.getName());
        chatDto.setCreated_at(chat.getCreated_at());
        return chatDto;
    }
    private MessageDto convertMessageToDTO(Message message) {

        MessageDto messageDto = new MessageDto();
        messageDto.setMsg(message.getMsg());
        messageDto.setIs_bot(message.getIs_bot());
        messageDto.setColor(message.getColor());
        messageDto.setCreated_at(message.getCreated_at());
        messageDto.setList_result(message.getList_result());
        messageDto.setPeruvianDishes(message.getPeruvianDishes());
        messageDto.setF_Porcion(message.getF_Porcion());
        messageDto.setF_Calorias(message.getF_Calorias());
        messageDto.setF_Carbohidratos(message.getF_Carbohidratos());
        messageDto.setF_Proteinas(message.getF_Proteinas());
        messageDto.setF_Grasas(message.getF_Grasas());

        return messageDto;
    }
}
