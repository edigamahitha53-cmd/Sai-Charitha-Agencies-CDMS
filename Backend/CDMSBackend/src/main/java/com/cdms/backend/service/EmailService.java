package com.cdms.backend.service;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    private final JavaMailSender mailSender;

    public EmailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    public void sendContactEmail(
            String name,
            String email,
            String subject,
            String message) {

        SimpleMailMessage mailMessage = new SimpleMailMessage();

        // Business email where customer messages will be received
        mailMessage.setTo("edigamahitha53@gmail.com");

        // Customer email
        mailMessage.setReplyTo(email);

        // Email subject
        mailMessage.setSubject(
                "CDMS Contact Message: " + subject
        );

        // Email body
        String emailBody =
                "New message received from CDMS Customer\n\n"
                + "Name: " + name + "\n"
                + "Email: " + email + "\n"
                + "Subject: " + subject + "\n\n"
                + "Message:\n"
                + message;

        mailMessage.setText(emailBody);

        mailSender.send(mailMessage);
    }
}