package com.dietasist.app;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.nio.file.Path;
import java.nio.file.Paths;
@Configuration
public class StaticResourceConfiguration implements WebMvcConfigurer {
    //WINDOWS
    /*@Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        Path uploadDir = Paths.get("Uploads");
        String uploadPath = uploadDir.toFile().getAbsolutePath();

        registry.addResourceHandler("/Uploads/**").addResourceLocations("file:/" + uploadPath + "/");
    }*/

    //UBUNTU
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        Path uploadDir = Paths.get("Uploads");
        String uploadPath = uploadDir.toAbsolutePath().toUri().toString(); // Cambia esto

        registry.addResourceHandler("/Uploads/**").addResourceLocations(uploadPath);
    }
}
