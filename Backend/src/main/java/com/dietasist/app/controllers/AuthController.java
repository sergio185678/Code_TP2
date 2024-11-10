package com.dietasist.app.controllers;

import com.dietasist.app.middlewares.IAuthenticationMiddleware;
import com.dietasist.app.models.dto.LoginDto;
import com.dietasist.app.models.dto.RecoverPasswordDto;
import com.dietasist.app.models.dto.RegisterDto;
import com.dietasist.app.models.entity.RecoverToken;
import com.dietasist.app.models.entity.User;
import com.dietasist.app.models.entity.ValidationToken;
import com.dietasist.app.models.payload.MensajeResponse;
import com.dietasist.app.services.interfaces.IUserService;
import com.dietasist.app.utils.JWTUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("api/v1/auth")
public class AuthController {
    @Autowired
    private IUserService userService;
    @Autowired
    private JWTUtil jwtUtil;

    @Autowired
    private IAuthenticationMiddleware authenticationMiddleware;

    @PostMapping("register")
    public ResponseEntity<?> registrar_usuario(@RequestBody RegisterDto registerDto) {
        if(userService.existing_user_by_mail(registerDto.getEmail())!=null){
            return new ResponseEntity<>(
                    MensajeResponse.builder()
                            .mensaje("El usuario ya existe")
                            .object(null)
                            .build()
                    , HttpStatus.CONFLICT);
        }
        try{
            userService.registerUser(registerDto);
            return new ResponseEntity<>(
                    MensajeResponse.builder()
                            .mensaje("Se registro correctamente")
                            .object(null)
                            .build()
                    , HttpStatus.OK);
        }
        catch (Exception exception){
            return new ResponseEntity<>(
                    MensajeResponse.builder()
                            .mensaje("Error:"+exception)
                            .object(null)
                            .build()
                    , HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    @PutMapping("validate")
    public ResponseEntity<?> validateAccount(@RequestParam("token") String token) {
        ValidationToken validationToken = userService.findValidationToken(token);
        if (validationToken == null) {
            return new ResponseEntity<>(
                    MensajeResponse.builder()
                            .mensaje("Código de validación inválido")
                            .object(null)
                            .build()
                    , HttpStatus.BAD_REQUEST);
        }

        if (validationToken.getExpiryDate().isBefore(LocalDateTime.now())) {
            return new ResponseEntity<>(
                    MensajeResponse.builder()
                            .mensaje("Código de validación expirado")
                            .object(null)
                            .build()
                    , HttpStatus.BAD_REQUEST);
        }

        try{
            userService.updatevalidation(validationToken);
            return new ResponseEntity<>(
                    MensajeResponse.builder()
                            .mensaje("Cuenta validada con éxito")
                            .object(null)
                            .build()
                    , HttpStatus.OK);
        }catch (Exception exception){
            return new ResponseEntity<>(
                    MensajeResponse.builder()
                            .mensaje("Error:"+exception)
                            .object(null)
                            .build()
                    , HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("resendvalidate")
    public ResponseEntity<?> resendvalidate(@RequestParam String email) {
        User user=userService.existing_user_by_mail_with_pendiente(email);
        if(user==null){
            return new ResponseEntity<>(
                    MensajeResponse.builder()
                            .mensaje("El usuario no existe")
                            .object(null)
                            .build()
                    , HttpStatus.BAD_REQUEST);
        }
        try{
            userService.resendvalidate(user);
            return new ResponseEntity<>(
                    MensajeResponse.builder()
                            .mensaje("Se envio un nuevo token a su correo")
                            .object(null)
                            .build()
                    , HttpStatus.OK);
        }
        catch (Exception exception){
            return new ResponseEntity<>(
                    MensajeResponse.builder()
                            .mensaje("Error:"+exception)
                            .object(null)
                            .build()
                    , HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("requestrecover")
    public ResponseEntity<?> requestrecover(@RequestParam("email") String email) {
        User user=userService.existing_user_by_mail(email);
        if(user==null){
            return new ResponseEntity<>(
                    MensajeResponse.builder()
                            .mensaje("El usuario no existe")
                            .object(null)
                            .build()
                    , HttpStatus.BAD_REQUEST);
        }
        try{
            userService.requestrecoverr(user);
            return new ResponseEntity<>(
                    MensajeResponse.builder()
                            .mensaje("Se solicito restablecimiento de contraseña correctamente")
                            .object(null)
                            .build()
                    , HttpStatus.OK);
        }
        catch (Exception exception){
            return new ResponseEntity<>(
                    MensajeResponse.builder()
                            .mensaje("Error:"+exception)
                            .object(null)
                            .build()
                    , HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("recoverpassword")
    public ResponseEntity<?> recoverpassword(@RequestBody RecoverPasswordDto recoverPasswordDto) {
        RecoverToken recoverToken = userService.findRecoverToken(recoverPasswordDto.getToken());
        if (recoverToken == null) {
            return new ResponseEntity<>(
                    MensajeResponse.builder()
                            .mensaje("Código de validación inválido")
                            .object(null)
                            .build()
                    , HttpStatus.BAD_REQUEST);
        }

        if (recoverToken.getExpiryDate().isBefore(LocalDateTime.now())) {
            return new ResponseEntity<>(
                    MensajeResponse.builder()
                            .mensaje("Código de validación expirado")
                            .object(null)
                            .build()
                    , HttpStatus.BAD_REQUEST);
        }

        try{
            userService.recoverpassword(recoverToken,recoverPasswordDto.getPassword());
            return new ResponseEntity<>(
                    MensajeResponse.builder()
                            .mensaje("Contraseña restablecida con éxito")
                            .object(null)
                            .build()
                    , HttpStatus.OK);
        }catch (Exception exception){
            return new ResponseEntity<>(
                    MensajeResponse.builder()
                            .mensaje("Error:"+exception)
                            .object(null)
                            .build()
                    , HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("login")
    public ResponseEntity<?> login(@RequestBody LoginDto loginDto){
        User user=userService.existing_user_by_mail(loginDto.getEmail());
        if(user==null){
            return new ResponseEntity<>(
                    MensajeResponse.builder()
                            .mensaje("El usuario no existe")
                            .object(null)
                            .build()
                    , HttpStatus.BAD_REQUEST);
        }
        if(userService.checkpassword(loginDto.getPassword(),user)!=null){
            String tokenJwt = jwtUtil.create(String.valueOf(user.getId()), user.getFullname());
            return new ResponseEntity<>(
                    MensajeResponse.builder()
                            .mensaje("Se logueo correctamente")
                            .object(tokenJwt)
                            .build()
                    , HttpStatus.OK);
        }
        return new ResponseEntity<>(
                MensajeResponse.builder()
                        .mensaje("Correo o contraseña incorrecta")
                        .object(null)
                        .build()
                , HttpStatus.UNAUTHORIZED);
    }

    @GetMapping("/validar_token")
    public Boolean validar_token(@RequestHeader("Authorization") String token){

        ResponseEntity<?> authenticated=authenticationMiddleware.authenticate(token);
        if(authenticated==null){
            return true;
        }
        return false;
    }
}
