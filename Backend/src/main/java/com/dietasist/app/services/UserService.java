package com.dietasist.app.services;

import com.dietasist.app.models.dto.*;
import com.dietasist.app.models.entity.AllergicIngredient;
import com.dietasist.app.models.entity.RecoverToken;
import com.dietasist.app.models.entity.User;
import com.dietasist.app.models.entity.ValidationToken;
import com.dietasist.app.models.repository.RecoverTokenRepository;
import com.dietasist.app.models.repository.UserRepository;
import com.dietasist.app.models.repository.ValidationTokenRepository;
import com.dietasist.app.services.interfaces.IUserService;
import de.mkammerer.argon2.Argon2;
import de.mkammerer.argon2.Argon2Factory;
import jakarta.mail.MessagingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.util.Random;
import java.util.UUID;

@Service
public class UserService implements IUserService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ValidationTokenRepository validationTokenRepository;
    @Autowired
    private RecoverTokenRepository recoverTokenRepository;

    @Autowired
    private EmailService emailService;

    @Autowired
    private TokenGeneratorService tokenGeneratorService;
    @Value("${upload.dir}")
    private String uploadDir;

    private static final Random random = new Random();


    @Override
    public void registerUser(RegisterDto registerDto) {

        User usuario_exist=userRepository.findByEmail(registerDto.getEmail()).orElse(null);

        User user;
        if(usuario_exist!=null && usuario_exist.getEstado_validacion().equals("pendiente")){
            user=existuserpendient(registerDto,usuario_exist);
        }
        else{
            Argon2 argon2 = Argon2Factory.create(Argon2Factory.Argon2Types.ARGON2id);
            String hash = argon2.hash(3, 2048, 1, registerDto.getPassword());

            user=User.builder()
                    .email(registerDto.getEmail())
                    .fullname(registerDto.getFullname())
                    .password(hash)
                    .estado_validacion("pendiente")
                    .profile_photo("user.png")
                    .build();
            userRepository.save(user);
        }

        int code = 1000 + random.nextInt(9000); // Genera un número de 4 dígitos
        String token = String.valueOf(code);

        ValidationToken validationToken=ValidationToken.builder()
                .token(token)
                .user(user)
                .expiryDate(LocalDateTime.now().plusHours(1))
                .build();
        validationTokenRepository.save(validationToken);

        emailService.ValidateEmail(user.getEmail(),"Valida tu cuenta de DietAsist",registerDto.getFullname(), token);
    }

    public void resendvalidate(User user) {
        Integer userid=user.getId();
        ValidationToken validationToken=validationTokenRepository.findByUserId(userid);
        if(validationToken!=null){
            validationTokenRepository.delete(validationToken);

            int code = 1000 + random.nextInt(9000); // Genera un número de 4 dígitos
            String token = String.valueOf(code);

            ValidationToken validationToken2=ValidationToken.builder()
                    .token(token)
                    .user(user)
                    .expiryDate(LocalDateTime.now().plusHours(1))
                    .build();
            validationTokenRepository.save(validationToken2);

            emailService.ValidateEmail(user.getEmail(),"Valida tu cuenta de DietAsist",user.getFullname(), token);
        }
    }

    @Override
    public ValidationToken findValidationToken(String token) {
        return validationTokenRepository.findByToken(token);
    }

    @Override
    public void updatevalidation(ValidationToken validationToken) {
        User user = validationToken.getUser();
        user.setEstado_validacion("validado");
        userRepository.save(user);
        validationTokenRepository.delete(validationToken);
    }

    @Override
    public User existing_user_by_mail(String email) {
        User usuario_exist=userRepository.findByEmail(email).orElse(null);
        if(usuario_exist==null){
            return null;
        }
        else{
            if(usuario_exist.getEstado_validacion().equals("pendiente")){
                return null;
            }
            return usuario_exist;
        }
    }

    @Override
    public User existing_user_by_mail_with_pendiente(String email) {
        User usuario_exist=userRepository.findByEmail(email).orElse(null);
        if(usuario_exist==null){
            return null;
        }
        else{
            return usuario_exist;
        }
    }

    @Override
    public User existing_user_by_id(Integer userid) {
        User usuario_exist=userRepository.findById(userid).orElse(null);
        if(usuario_exist.getEstado_validacion().equals("pendiente")){
            return null;
        }
        return usuario_exist;
    }

    @Override
    public User existuserpendient(RegisterDto registerDto,User usuario_exist) {
        Argon2 argon2 = Argon2Factory.create(Argon2Factory.Argon2Types.ARGON2id);
        String hash = argon2.hash(3, 2048, 1, registerDto.getPassword());
        usuario_exist.setPassword(hash);
        usuario_exist.setFullname(registerDto.getFullname());
        ValidationToken validationToken=validationTokenRepository.findByUserId(usuario_exist.getId());
        if(validationToken!=null){
            validationTokenRepository.deleteById(validationToken.getId());
        }
        return userRepository.save(usuario_exist);
    }

    @Override
    public void requestrecoverr(User user) {
        RecoverToken recoverToken=recoverTokenRepository.findByUserId(user.getId());
        if(recoverToken!=null){
            recoverTokenRepository.delete(recoverToken);
        }

        String token = tokenGeneratorService.generateToken();
        RecoverToken newrecoverToken=RecoverToken.builder()
                .token(token)
                .user(user)
                .expiryDate(LocalDateTime.now().plusHours(1))
                .build();
        recoverTokenRepository.save(newrecoverToken);
        emailService.RecoverPassword(user.getEmail(),"Restablecimiento de Contraseña",user.getFullname(), token);
    }

    @Override
    public RecoverToken findRecoverToken(String token) {
        return recoverTokenRepository.findByToken(token);
    }

    @Override
    public void recoverpassword(RecoverToken recoverToken,String password) {
        User user = recoverToken.getUser();
        Argon2 argon2 = Argon2Factory.create(Argon2Factory.Argon2Types.ARGON2id);
        String hash = argon2.hash(3, 2048, 1, password);
        user.setPassword(hash);
        userRepository.save(user);
        recoverTokenRepository.delete(recoverToken);
    }

    @Override
    public void uploadimage(MultipartFile file,Integer userid) {
        String fileName = UUID.randomUUID().toString() + "_" + file.getOriginalFilename();
        Path path = Paths.get(uploadDir, fileName);
        System.out.println(path);
        User user=userRepository.findById(userid).orElse(null);
        if(user.getProfile_photo()!=null && !user.getProfile_photo().equals("user.png")){
            try{
                Path pathdelete = Paths.get(uploadDir, user.getProfile_photo());
                Files.delete(pathdelete);
            }catch (IOException e) {
                System.out.println("No se pudo eliminar el archivo");
            } catch (Exception e) {
                System.out.println("Ocurrió un error inesperado");
            }
        }
        try{
            Files.copy(file.getInputStream(), path);
        }catch (IOException e) {
            e.printStackTrace();
        }
        user.setProfile_photo(fileName);
        userRepository.save(user);
    }

    @Override
    public void editbasicdata(EditBaseDataDto editBaseDataDto,Integer userid) {
        User user=userRepository.findById(userid).orElse(null);
        user.setGender(editBaseDataDto.getGender());
        user.setSize(editBaseDataDto.getSize());
        user.setAge(editBaseDataDto.getAge());
        user.setWeight(editBaseDataDto.getWeight());
        user.setPhysical_activity(editBaseDataDto.getPhysical_activity());
        user.setMeal_frequency(editBaseDataDto.getMeal_frequency());

        if(user.getAge()!=null && user.getGender()!=null && user.getSize()!=null && user.getWeight()!=null
                && user.getPhysical_activity()!=null && user.getMeal_frequency()!=null
                && user.getGlycosylated_hemoglobin()!=null && user.getTriglyceride()!=null){

            Integer IMC=user.getWeight()/((user.getSize()/100)*(user.getSize()/100));
            Integer calories_intake= (Integer) 0;
            Float multiplicate=0F;
            switch (user.getPhysical_activity()){
                case "Ninguno":
                    multiplicate= 1.2F;
                    break;
                case "Poco":
                    multiplicate= 1.2F;
                    break;
                case "Ligero":
                    multiplicate= 1.375F;
                    break;
                case "Moderado":
                    multiplicate= 1.55F;
                    break;
                case "Fuerte":
                    multiplicate= 1.725F;
                    break;
                case "Muy fuerte":
                    multiplicate= 1.9F;
                    break;
            }

            if(IMC>=25 || user.getGlycosylated_hemoglobin()>6.5 || user.getTriglyceride()>=200){
                if(user.getGender().equals("Hombre")){
                    calories_intake= (int) ((10*user.getWeight())+(6.25*user.getSize())-(5*user.getAge())+5);
                }
                else{
                    calories_intake= (int) ((10*user.getWeight())+(6.25*user.getSize())-(5*user.getAge())-161);
                }
            }
            else{
                if(user.getGender().equals("Hombre")){
                    calories_intake= (int) (((10*user.getWeight())+(6.25*user.getSize())-(5*user.getAge())+5)*multiplicate);
                }
                else{
                    calories_intake= (int) (((10*user.getWeight())+(6.25*user.getSize())-(5*user.getAge())-161)*multiplicate);
                }
            }

            if(user.getMeal_frequency()==3){
                calories_intake=calories_intake*45/100;
            }
            else{
                calories_intake=calories_intake*35/100;
            }
            user.setCalories_intake(calories_intake);
            user.setCarbohydrate_required(calories_intake*50/100/4);
            user.setProtein_required(calories_intake*15/100/4);
            user.setTotalfat_required(calories_intake*35/100/4);
        }
        userRepository.save(user);
    }

    @Override
    public void editmedicalparameters(EditMedicalParametersDto editMedicalParametersDto, Integer userid) {
        User user=userRepository.findById(userid).orElse(null);
        user.setHypertension(editMedicalParametersDto.getHypertension());
        user.setGlycosylated_hemoglobin(editMedicalParametersDto.getGlycosylated_hemoglobin());
        user.setTriglyceride(editMedicalParametersDto.getTriglyceride());
        user.setCholesterol_total(editMedicalParametersDto.getCholesterol_total());
        user.setCholesterol_LDL(editMedicalParametersDto.getCholesterol_LDL());
        user.setUrid_acid(editMedicalParametersDto.getUrid_acid());
        if(user.getAge()!=null && user.getGender()!=null && user.getSize()!=null && user.getWeight()!=null
                && user.getPhysical_activity()!=null && user.getMeal_frequency()!=null
                && user.getGlycosylated_hemoglobin()!=null && user.getTriglyceride()!=null){

            Integer IMC=user.getWeight()/((user.getSize()/100)*(user.getSize()/100));
            Integer calories_intake= (Integer) 0;
            Float multiplicate=0F;
            switch (user.getPhysical_activity()){
                case "Ninguno":
                    multiplicate= 1.2F;
                    break;
                case "Poco":
                    multiplicate= 1.2F;
                    break;
                case "Ligero":
                    multiplicate= 1.375F;
                    break;
                case "Moderado":
                    multiplicate= 1.55F;
                    break;
                case "Fuerte":
                    multiplicate= 1.725F;
                    break;
                case "Muy fuerte":
                    multiplicate= 1.9F;
                    break;
            }

            if(IMC>=25 || user.getGlycosylated_hemoglobin()>6.5 || user.getTriglyceride()>=200){
                if(user.getGender().equals("Hombre")){
                    calories_intake= (int) ((10*user.getWeight())+(6.25*user.getSize())-(5*user.getAge())+5);
                }
                else{
                    calories_intake= (int) ((10*user.getWeight())+(6.25*user.getSize())-(5*user.getAge())-161);
                }
            }
            else{
                if(user.getGender().equals("Hombre")){
                    calories_intake= (int) (((10*user.getWeight())+(6.25*user.getSize())-(5*user.getAge())+5)*multiplicate);
                }
                else{
                    calories_intake= (int) (((10*user.getWeight())+(6.25*user.getSize())-(5*user.getAge())-161)*multiplicate);
                }
            }

            if(user.getMeal_frequency()==3){
                calories_intake=calories_intake*45/100;
            }
            else{
                calories_intake=calories_intake*35/100;
            }
            user.setCalories_intake(calories_intake);
            user.setCarbohydrate_required(calories_intake*50/100/4);
            user.setProtein_required(calories_intake*15/100/4);
            user.setTotalfat_required(calories_intake*35/100/4);
        }
        userRepository.save(user);
    }

    @Override
    public User checkpassword(String login_password,User user) {
        Argon2 argon2 = Argon2Factory.create(Argon2Factory.Argon2Types.ARGON2id);
        if (argon2.verify(user.getPassword(), login_password)) {
            return user;
        }
        return null;
    }

    @Override
    public UserDto get_info_user(Integer userid) {
        User user=userRepository.findById(userid).orElse(null);
        return convertToDTO(user);
    }
    private UserDto convertToDTO(User user) {

        UserDto userDto = new UserDto();
        userDto.setFullname(user.getFullname());
        userDto.setProfile_photo(user.getProfile_photo());
        userDto.setGender(user.getGender());
        userDto.setAge(user.getAge());
        userDto.setSize(user.getSize());
        userDto.setHypertension(user.getHypertension());
        userDto.setTriglyceride(user.getTriglyceride());
        userDto.setWeight(user.getWeight());
        userDto.setCholesterol_LDL(user.getCholesterol_LDL());
        userDto.setCholesterol_total(user.getCholesterol_total());
        userDto.setMeal_frequency(user.getMeal_frequency());
        userDto.setPhysical_activity(user.getPhysical_activity());
        userDto.setGlycosylated_hemoglobin(user.getGlycosylated_hemoglobin());
        userDto.setUrid_acid(user.getUrid_acid());
        userDto.setCarbohydrate_required(user.getCarbohydrate_required());
        userDto.setProtein_required(user.getProtein_required());
        userDto.setTotalfat_required(user.getTotalfat_required());
        return userDto;
    }
}
