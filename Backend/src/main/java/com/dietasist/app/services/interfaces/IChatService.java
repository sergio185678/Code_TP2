package com.dietasist.app.services.interfaces;

import com.dietasist.app.models.dto.ChatDto;
import com.dietasist.app.models.dto.MessageDto;
import com.dietasist.app.models.entity.Chat;
import com.dietasist.app.models.entity.Message;

import java.util.List;

public interface IChatService {
    Integer register(Integer userid);
    void edit_name(Integer chatid,String newname);
    void delete(Integer chatid);
    List<ChatDto> get_all_by_user(Integer userid);
    List<MessageDto> getonechat(Integer chatid);
}
