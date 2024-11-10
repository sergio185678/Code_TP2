package com.dietasist.app.controllers;

import com.dietasist.app.middlewares.IAuthenticationMiddleware;
import com.dietasist.app.models.dto.PeruvianDishesDto;
import com.dietasist.app.models.payload.MensajeResponse;
import com.dietasist.app.services.interfaces.IPeruvianDishesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("api/v1/peruvianDishes")
public class PeruvianDishesController {
    @Autowired
    private IPeruvianDishesService peruvianDishesService;
    @Autowired
    private IAuthenticationMiddleware authenticationMiddleware;
    @PostMapping("register")
    public ResponseEntity<?> register_food(@RequestBody PeruvianDishesDto peruvianDishesDto,@RequestHeader("Authorization") String token) {

        ResponseEntity<?> authenticated=authenticationMiddleware.authenticate(token);
        if(authenticated!=null){
            return authenticated;
        }

        try{
            peruvianDishesService.registerDishes(peruvianDishesDto);
            return new ResponseEntity<>(
                    MensajeResponse.builder()
                            .mensaje("Plato de comida agregado")
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
                    , HttpStatus.BAD_REQUEST);
        }
    }
    @GetMapping("/receta/{disheid}")
    public ResponseEntity<?> getreceta(@RequestHeader("Authorization") String token,@PathVariable Integer disheid){
        ResponseEntity<?> authenticated=authenticationMiddleware.authenticate(token);
        if(authenticated!=null){
            return authenticated;
        }
        return new ResponseEntity<>(
                MensajeResponse.builder()
                        .mensaje("La receta del plato de comida")
                        .object(peruvianDishesService.getreceta(disheid))
                        .build()
                , HttpStatus.OK);
    }
}
