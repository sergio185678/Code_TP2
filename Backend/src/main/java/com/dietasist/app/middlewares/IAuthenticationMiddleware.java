package com.dietasist.app.middlewares;

import org.springframework.http.ResponseEntity;

public interface IAuthenticationMiddleware {
    ResponseEntity<?> authenticate(String token);

    Boolean validarToken(String token);
    Integer get_userid(String token);
}
