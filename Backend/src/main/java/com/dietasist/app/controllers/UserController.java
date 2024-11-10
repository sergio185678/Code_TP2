package com.dietasist.app.controllers;

import com.dietasist.app.middlewares.IAuthenticationMiddleware;
import com.dietasist.app.models.dto.AllergicIngredientDto;
import com.dietasist.app.models.dto.EditBaseDataDto;
import com.dietasist.app.models.dto.EditMedicalParametersDto;
import com.dietasist.app.models.payload.MensajeResponse;
import com.dietasist.app.services.AllergicIngredientService;
import com.dietasist.app.services.UserService;
import com.dietasist.app.utils.JWTUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.UUID;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("api/v1/user")
public class UserController {
    @Value("${upload.dir}")
    private String uploadDir;
    @Autowired
    private UserService userService;
    @Autowired
    private AllergicIngredientService allergicIngredientService;
    @Autowired
    private IAuthenticationMiddleware authenticationMiddleware;

    @PostMapping("/upload")
    public ResponseEntity<?> uploadFile(@RequestParam("file") MultipartFile file,@RequestHeader("Authorization") String token) {

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
        if (file.isEmpty()) {
            return new ResponseEntity<>(
                    MensajeResponse.builder()
                            .mensaje("Archivo no existe")
                            .object(null)
                            .build()
                    , HttpStatus.BAD_REQUEST);
        }
        userService.uploadimage(file, userid);
        return new ResponseEntity<>(
                MensajeResponse.builder()
                        .mensaje("Archivo subido")
                        .object(null)
                        .build()
                , HttpStatus.OK);
    }

    @PutMapping("/basicdata")
    public ResponseEntity<?> editbasicdata(@RequestBody EditBaseDataDto editBaseDataDto,@RequestHeader("Authorization") String token) {

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
            userService.editbasicdata(editBaseDataDto, userid);
            return new ResponseEntity<>(
                    MensajeResponse.builder()
                            .mensaje("Se actualizo los datos basicos")
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

    @PutMapping("/medical_parameters")
    public ResponseEntity<?> medical_parameters(@RequestBody EditMedicalParametersDto editMedicalParametersDto,@RequestHeader("Authorization") String token) {

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
            userService.editmedicalparameters(editMedicalParametersDto, userid);
            return new ResponseEntity<>(
                    MensajeResponse.builder()
                            .mensaje("Se actualizo los datos medicos")
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

    @GetMapping("/get_all_info")
    public ResponseEntity<?> getallinfouser(@RequestHeader("Authorization") String token) {

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
        return new ResponseEntity<>(
                MensajeResponse.builder()
                        .mensaje("Informacion usuario")
                        .object(userService.get_info_user(userid))
                        .build()
                , HttpStatus.OK);
    }
}
