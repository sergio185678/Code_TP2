package com.dietasist.app.controllers;

import com.dietasist.app.middlewares.IAuthenticationMiddleware;
import com.dietasist.app.models.dto.CreateMessageDto;
import com.dietasist.app.models.dto.EditMedicalParametersDto;
import com.dietasist.app.models.payload.MensajeResponse;
import com.dietasist.app.services.UserService;
import com.dietasist.app.services.interfaces.IChatService;
import com.dietasist.app.services.interfaces.IMessageService;
import com.dietasist.app.utils.JWTUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("api/v1/chat")
public class ChatController {
    @Autowired
    private UserService userService;
    @Autowired
    private IAuthenticationMiddleware authenticationMiddleware;
    @Autowired
    private IChatService chatService;
    @Autowired
    private IMessageService messageService;
    @PostMapping("/register")
    public ResponseEntity<?> registerchat(@RequestHeader("Authorization") String token) {

        ResponseEntity<?> authenticated=authenticationMiddleware.authenticate(token);
        if(authenticated!=null){
            return authenticated;
        }
        Integer userid = authenticationMiddleware.get_userid(token);

        if (userService.existing_user_by_id(userid) == null) {
            return new ResponseEntity<>(
                    MensajeResponse.builder()
                            .mensaje("El usuario no existe")
                            .object(null)
                            .build()
                    , HttpStatus.BAD_REQUEST);
        }
        try {
            var chatid=chatService.register(userid);
            return new ResponseEntity<>(
                    MensajeResponse.builder()
                            .mensaje("Se registro correctamente")
                            .object(chatid)
                            .build()
                    , HttpStatus.OK);
        } catch (Exception exception) {
            return new ResponseEntity<>(
                    MensajeResponse.builder()
                            .mensaje("Error:" + exception)
                            .object(null)
                            .build()
                    , HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/update_name/{chatid}")
    public ResponseEntity<?> updatename(@PathVariable Integer chatid,@RequestParam String newname,@RequestHeader("Authorization") String token) {

        ResponseEntity<?> authenticated=authenticationMiddleware.authenticate(token);
        if(authenticated!=null){
            return authenticated;
        }

        try {
            chatService.edit_name(chatid,newname);
            return new ResponseEntity<>(
                    MensajeResponse.builder()
                            .mensaje("Se actualizo correctamente")
                            .object(null)
                            .build()
                    , HttpStatus.OK);
        } catch (Exception exception) {
            return new ResponseEntity<>(
                    MensajeResponse.builder()
                            .mensaje("Error:" + exception)
                            .object(null)
                            .build()
                    , HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/delete/{chatid}")
    public ResponseEntity<?> delete(@PathVariable Integer chatid,@RequestHeader("Authorization") String token) {

        ResponseEntity<?> authenticated=authenticationMiddleware.authenticate(token);
        if(authenticated!=null){
            return authenticated;
        }

        try {
            chatService.delete(chatid);
            return new ResponseEntity<>(
                    MensajeResponse.builder()
                            .mensaje("Se elimino correctamente")
                            .object(null)
                            .build()
                    , HttpStatus.OK);
        } catch (Exception exception) {
            return new ResponseEntity<>(
                    MensajeResponse.builder()
                            .mensaje("Error:" + exception)
                            .object(null)
                            .build()
                    , HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/get_all_by_user")
    public ResponseEntity<?> get_all_by_user(@RequestHeader("Authorization") String token) {

        ResponseEntity<?> authenticated=authenticationMiddleware.authenticate(token);
        if(authenticated!=null){
            return authenticated;
        }
        Integer userid = authenticationMiddleware.get_userid(token);

        if (userService.existing_user_by_id(userid) == null) {
            return new ResponseEntity<>(
                    MensajeResponse.builder()
                            .mensaje("El usuario no existe")
                            .object(null)
                            .build()
                    , HttpStatus.BAD_REQUEST);
        }
        try {
            return new ResponseEntity<>(
                    MensajeResponse.builder()
                            .mensaje("Historial de chats")
                            .object(chatService.get_all_by_user(userid))
                            .build()
                    , HttpStatus.OK);
        } catch (Exception exception) {
            return new ResponseEntity<>(
                    MensajeResponse.builder()
                            .mensaje("Error:" + exception)
                            .object(null)
                            .build()
                    , HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/getonechat/{chatid}")
    public ResponseEntity<?> getonechat(@PathVariable Integer chatid,@RequestHeader("Authorization") String token) {

        ResponseEntity<?> authenticated=authenticationMiddleware.authenticate(token);
        if(authenticated!=null){
            return authenticated;
        }

        return new ResponseEntity<>(
                MensajeResponse.builder()
                        .mensaje("Lista de mensajes")
                        .object(chatService.getonechat(chatid))
                        .build()
                , HttpStatus.OK);
    }

    @PostMapping("/create_message")
    public ResponseEntity<?> crearmensaje(@RequestBody CreateMessageDto createMessageDto, @RequestHeader("Authorization") String token){
        ResponseEntity<?> authenticated=authenticationMiddleware.authenticate(token);
        if(authenticated!=null){
            return authenticated;
        }

        try{
            messageService.create(createMessageDto);
            return new ResponseEntity<>(
                    MensajeResponse.builder()
                            .mensaje("Creación correctamente")
                            .object(null)
                            .build()
                    , HttpStatus.OK);
        }catch (Exception exception) {
            return new ResponseEntity<>(
                    MensajeResponse.builder()
                            .mensaje("Error:" + exception)
                            .object(null)
                            .build()
                    , HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    @PostMapping("/prediction/{disheid}")
    public ResponseEntity<?> prediction(@RequestHeader("Authorization") String token,@PathVariable Integer disheid){
        ResponseEntity<?> authenticated=authenticationMiddleware.authenticate(token);
        if(authenticated!=null){
            return authenticated;
        }
        Integer userid = authenticationMiddleware.get_userid(token);
        return new ResponseEntity<>(
                MensajeResponse.builder()
                        .mensaje("Resultado del modelo")
                        .object(messageService.predecir(userid,disheid))
                        .build()
                , HttpStatus.OK);
    }

    @GetMapping("/hipertension")
    public ResponseEntity<?> hipertension(@RequestHeader("Authorization") String token){
        ResponseEntity<?> authenticated=authenticationMiddleware.authenticate(token);
        if(authenticated!=null){
            return authenticated;
        }
        Integer userid = authenticationMiddleware.get_userid(token);
        return new ResponseEntity<>(
                MensajeResponse.builder()
                        .mensaje("Resultado de hipertensión")
                        .object(messageService.hipertension(userid))
                        .build()
                , HttpStatus.OK);
    }

    @GetMapping("/alergicosporcomida/{disheid}")
    public ResponseEntity<?> alergicosporcomida(@RequestHeader("Authorization") String token,@PathVariable Integer disheid){
        ResponseEntity<?> authenticated=authenticationMiddleware.authenticate(token);
        if(authenticated!=null){
            return authenticated;
        }
        Integer userid = authenticationMiddleware.get_userid(token);
        return new ResponseEntity<>(
                MensajeResponse.builder()
                        .mensaje("Lista de ingredientes alergicos en la comida")
                        .object(messageService.ingredientesalergicos(userid,disheid))
                        .build()
                , HttpStatus.OK);
    }
    @GetMapping("/obesidad_apto/{disheid}")
    public ResponseEntity<?> obesidad_apto(@RequestHeader("Authorization") String token,@PathVariable Integer disheid){
        ResponseEntity<?> authenticated=authenticationMiddleware.authenticate(token);
        if(authenticated!=null){
            return authenticated;
        }
        Integer userid = authenticationMiddleware.get_userid(token);
        return new ResponseEntity<>(
                MensajeResponse.builder()
                        .mensaje("¿Es apto su nivel de obesidad con la comida?")
                        .object(messageService.obesidad_apto(userid,disheid))
                        .build()
                , HttpStatus.OK);
    }
    @GetMapping("/colesterol_apto/{disheid}")
    public ResponseEntity<?> colesterol_apto(@RequestHeader("Authorization") String token,@PathVariable Integer disheid){
        ResponseEntity<?> authenticated=authenticationMiddleware.authenticate(token);
        if(authenticated!=null){
            return authenticated;
        }
        Integer userid = authenticationMiddleware.get_userid(token);
        return new ResponseEntity<>(
                MensajeResponse.builder()
                        .mensaje("¿Es apto el nivel de colesterol de la comida para la persona?")
                        .object(messageService.colesterol_apto(userid,disheid))
                        .build()
                , HttpStatus.OK);
    }
    @GetMapping("/acidourico_apto/{disheid}")
    public ResponseEntity<?> acidourico_apto(@RequestHeader("Authorization") String token,@PathVariable Integer disheid){
        ResponseEntity<?> authenticated=authenticationMiddleware.authenticate(token);
        if(authenticated!=null){
            return authenticated;
        }
        Integer userid = authenticationMiddleware.get_userid(token);
        return new ResponseEntity<>(
                MensajeResponse.builder()
                        .mensaje("¿Es apto el nivel de colesterol de la comida para la persona?")
                        .object(messageService.acidourico_apto(userid,disheid))
                        .build()
                , HttpStatus.OK);
    }
    @GetMapping("/recomendation/{disheid}")
    public ResponseEntity<?> recomendation(@RequestHeader("Authorization") String token,@PathVariable Integer disheid){
        ResponseEntity<?> authenticated=authenticationMiddleware.authenticate(token);
        if(authenticated!=null){
            return authenticated;
        }
        Integer userid = authenticationMiddleware.get_userid(token);
        return new ResponseEntity<>(
                MensajeResponse.builder()
                        .mensaje("Recomendaciones similares al plato "+disheid.toString())
                        .object(messageService.getRecomendation(userid,disheid))
                        .build()
                , HttpStatus.OK);
    }

}
