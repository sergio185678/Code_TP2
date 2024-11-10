package com.dietasist.app.services.interfaces;

import com.dietasist.app.models.dto.EditBaseDataDto;
import com.dietasist.app.models.dto.EditMedicalParametersDto;
import com.dietasist.app.models.dto.RegisterDto;
import com.dietasist.app.models.dto.UserDto;
import com.dietasist.app.models.entity.RecoverToken;
import com.dietasist.app.models.entity.User;
import com.dietasist.app.models.entity.ValidationToken;
import org.springframework.web.multipart.MultipartFile;

public interface IUserService {
    void registerUser(RegisterDto registerDto);
    ValidationToken findValidationToken(String token);
    void updatevalidation(ValidationToken validationToken);
    User existing_user_by_mail(String correo);
    User existing_user_by_mail_with_pendiente(String correo);
    User existing_user_by_id(Integer userid);
    User existuserpendient(RegisterDto registerDto,User usuario_exist);
    void requestrecoverr(User user);
    RecoverToken findRecoverToken(String token);
    void recoverpassword(RecoverToken recoverToken,String password);
    void uploadimage(MultipartFile file,Integer userid);
    void editbasicdata(EditBaseDataDto editBaseDataDto,Integer userid);
    void editmedicalparameters(EditMedicalParametersDto editMedicalParametersDto, Integer userid);
    User checkpassword(String login_password,User user);
    UserDto get_info_user(Integer userid);
    void resendvalidate(User user);
}
