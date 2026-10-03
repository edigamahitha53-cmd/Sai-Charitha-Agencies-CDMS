package com.cdms.backend.controller;

import com.cdms.backend.service.EmailService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/contact")
@CrossOrigin(origins = "http://localhost:5173")
public class ContactController {

    private final EmailService emailService;

    public ContactController(EmailService emailService) {
        this.emailService = emailService;
    }

    @PostMapping("/send")
    public ResponseEntity<?> sendMessage(
            @RequestBody Map<String, String> request) {

        try {

            String name = request.get("name");
            String email = request.get("email");
            String subject = request.get("subject");
            String message = request.get("message");

            if (name == null || name.trim().isEmpty()
                    || email == null || email.trim().isEmpty()
                    || subject == null || subject.trim().isEmpty()
                    || message == null || message.trim().isEmpty()) {

                return ResponseEntity.badRequest().body(
                        Map.of(
                                "success", false,
                                "message", "Please fill all fields."
                        )
                );
            }

            emailService.sendContactEmail(
                    name,
                    email,
                    subject,
                    message
            );

            return ResponseEntity.ok(
                    Map.of(
                            "success", true,
                            "message", "Message sent successfully!"
                    )
            );

        } catch (Exception e) {

            return ResponseEntity.internalServerError().body(
                    Map.of(
                            "success", false,
                            "message", "Failed to send message."
                    )
            );
        }
    }
}