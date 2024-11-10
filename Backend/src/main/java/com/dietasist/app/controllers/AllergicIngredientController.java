package com.dietasist.app.controllers;

import com.dietasist.app.middlewares.IAuthenticationMiddleware;
import com.dietasist.app.models.payload.MensajeResponse;
import com.dietasist.app.services.AllergicIngredientService;
import com.dietasist.app.services.UserService;
import com.dietasist.app.utils.JWTUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("api/v1/allergicingredient")
public class AllergicIngredientController {
    @Autowired
    private AllergicIngredientService allergicIngredientService;
    @Autowired
    private IAuthenticationMiddleware authenticationMiddleware;
    @Autowired
    private UserService userService;
    @PostMapping("/add")
    public ResponseEntity<?> addallergicingredient(@RequestBody List<String> allergicIngredients, @RequestHeader("Authorization") String token) {

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
            allergicIngredientService.registerIngredients(allergicIngredients, userid);
            return new ResponseEntity<>(
                    MensajeResponse.builder()
                            .mensaje("Se agregaron exitosamente")
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
    @GetMapping("/get_all_for_user")
    public ResponseEntity<?> getallergicingredients(@RequestHeader("Authorization") String token) {

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
                        .mensaje("Lista de ingredientes alergicos")
                        .object(allergicIngredientService.getbyuser(userid))
                        .build()
                , HttpStatus.OK);
    }

    @GetMapping("/getallfordropdown")
    public ResponseEntity<?> getallfordropdown(@RequestHeader("Authorization") String token) {

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
                        .mensaje("Lista de ingredientes para dropdown")
                        .object(allergicIngredientService.get_all_for_dropdown_ingredient(userid))
                        .build()
                , HttpStatus.OK);
    }

    @DeleteMapping("/delete/{ingredient_id}")
    public ResponseEntity<?> deleteallergicingredient(@PathVariable Integer ingredient_id,@RequestHeader("Authorization") String token) {

        ResponseEntity<?> authenticated=authenticationMiddleware.authenticate(token);
        if(authenticated!=null){
            return authenticated;
        }

        try{
            allergicIngredientService.deleteIngredient(ingredient_id);
            return new ResponseEntity<>(
                    MensajeResponse.builder()
                            .mensaje("Eliminacion exitosa")
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
}
