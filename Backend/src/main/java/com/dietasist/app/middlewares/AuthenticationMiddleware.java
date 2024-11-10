package com.dietasist.app.middlewares;

import com.dietasist.app.models.entity.User;
import com.dietasist.app.models.payload.MensajeResponse;
import com.dietasist.app.services.UserService;
import com.dietasist.app.utils.JWTUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class AuthenticationMiddleware implements IAuthenticationMiddleware{
    @Autowired
    private JWTUtil jwtUtil;
    @Autowired
    private UserService userService;
    @Override
    public ResponseEntity<?> authenticate(String token) {
        if(token.startsWith("Bearer ")){
            token = token.substring(7);
        }
        try{
            if (!validarToken(token)) {
                return new  ResponseEntity<>(
                        MensajeResponse.builder()
                                .mensaje("Necesita autentificación.")
                                .object(null)
                                .build()
                        , HttpStatus.UNAUTHORIZED);
            }
        }catch (Exception err){
            return new  ResponseEntity<>(
                    MensajeResponse.builder()
                            .mensaje("Error en la autentificación.")
                            .object(null)
                            .build()
                    ,HttpStatus.UNAUTHORIZED);
        }
        return null;
    }

    @Override
    public Boolean validarToken(String token) {

        String usuarioId = jwtUtil.getKey(token);
        User user=userService.existing_user_by_id(Integer.valueOf(usuarioId));
        if(user.getEstado_validacion().equals("pendiente")){
            return false;
        }
        return true;
    }

    @Override
    public Integer get_userid(String token) {
        if(token.startsWith("Bearer ")){
            token = token.substring(7);
        }
        return Integer.valueOf(jwtUtil.getKey(token));
    }
}
