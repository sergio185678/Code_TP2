package com.dietasist.app.services;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
public class EmailService {
    @Autowired
    private JavaMailSender mailSender;

    public void sendEmail(String to, String subject, String htmlContent) throws MessagingException {
        MimeMessage mimeMessage = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, "utf-8");

        helper.setText(htmlContent, true);  // Set to true to indicate the content is HTML
        helper.setTo(to);
        helper.setSubject(subject);
        helper.setFrom("flores.ofiuco.sergio@gmail.com");

        mailSender.send(mimeMessage);
    }

    public void ValidateEmail(String to, String subject,String fullname,String token) {
        String htmlContent = String.format("""
            <html>
            <head>
                <style>
                    @import url('https://fonts.googleapis.com/css2?family=Jost:wght@100;200;300;400;500;600;700;800;900&display=swap');
                    body {
                        font-family: 'Jost', sans-serif;
                        margin: 0;
                        padding: 0;
                        background-color: #f7f7f7;
                    }
                    .container {
                        width: 100%%;
                        padding: 20px;
                        background-color: #ffffff;
                        border-radius: 8px;
                        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                        max-width: 600px;
                        margin: 40px auto;
                    }
                    .header {
                        background-color: #66CDEE;
                        padding: 10px;
                        text-align: center;
                        border-top-left-radius: 8px;
                        border-top-right-radius: 8px;
                    }
                    .header h1 {
                        margin: 0;
                        color: #ffffff;
                    }
                    .content {
                        padding: 20px;
                    }
                    .content h2 {
                        color: #333333;
                    }
                    .content p {
                        color: #666666;
                    }
                    .content .code {
                        display: block;
                        width: fit-content;
                        margin: 20px auto;
                        padding: 10px 20px;
                        border: 2px solid #cccccc;
                        border-radius: 10px;
                        font-size: 24px;
                        font-weight: bold;
                        color: #333333;
                        text-align: center;
                        background-color:#A5DDEF;
                    }
                    .footer {
                        text-align: center;
                        padding: 10px;
                        font-size: 12px;
                        color: #999999;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <h1>Validación de Email</h1>
                    </div>
                   <img style="margin-left: auto;margin-right: auto;display: flex;margin-top: 20px;" src="https://i.imgur.com/yvfQubJ.png" alt="DietAsist">
                    <div class="content">
                        <h2>¡Hola %s!</h2>
                        <p>Gracias por registrarte. Por favor, usa el siguiente código para validar tu dirección de correo electrónico:</p>
                        <div class="code" style="letter-spacing: 5px;">%s</div>
                        <p>Si no solicitaste esta validación, por favor ignora este correo.</p>
                    </div>
                    <div class="footer">
                        <p>&copy; 2024 DietAsist. Todos los derechos reservados.</p>
                    </div>
                </div>
            </body>
            </html>
        """, fullname, token);
        try {
            sendEmail(to, subject, htmlContent);
        } catch (MessagingException e) {
            e.printStackTrace();  // Handle the exception appropriately
        }
    }

    public void RecoverPassword (String to, String subject,String fullname,String token) {
        String htmlContent = String.format("""
            <html>
            <head>
                <style>
                    @import url('https://fonts.googleapis.com/css2?family=Jost:wght@100;200;300;400;500;600;700;800;900&display=swap');
                    body {
                        font-family: 'Jost', sans-serif;
                        margin: 0;
                        padding: 0;
                        background-color: #f7f7f7;
                    }
                    .container {
                        width: 100%%;
                        padding: 20px;
                        background-color: #ffffff;
                        border-radius: 8px;
                        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                        max-width: 600px;
                        margin: 40px auto;
                    }
                    .header {
                        background-color: #66CDEE;
                        padding: 10px;
                        text-align: center;
                        border-top-left-radius: 8px;
                        border-top-right-radius: 8px;
                    }
                    .header h1 {
                        margin: 0;
                        color: #ffffff;
                    }
                    .content {
                        padding: 20px;
                    }
                    .content h2 {
                        color: #333333;
                    }
                    .content p {
                        color: #666666;
                    }
                    .footer {
                        text-align: center;
                        padding: 10px;
                        font-size: 12px;
                        color: #999999;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <h1>Restablecimiento de Contraseña</h1>
                    </div>
                   <img style="margin-left: auto;margin-right: auto;display: flex;margin-top: 20px;" src="https://i.imgur.com/yvfQubJ.png" alt="DietAsist">
                    <div class="content">
                        <h2>¡Hola %s!</h2>
                        <p>Haga clic en el siguiente enlace para restablecer su contraseña:</p>
                        <p><a href=https://dietasist.online/restablecer-contrasena/%s>Restablecer Contraseña</a></p>
                        <p>Si no solicitó restablecer su contraseña, por favor ignore este correo electrónico.</p>
                    </div>
                    <div class="footer">
                        <p>&copy; 2024 DietAsist. Todos los derechos reservados.</p>
                    </div>
                </div>
            </body>
            </html>
        """, fullname, token);
        try {
            sendEmail(to, subject, htmlContent);
        } catch (MessagingException e) {
            e.printStackTrace();  // Handle the exception appropriately
        }
    }
}
