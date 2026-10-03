package com.cdms.backend.controller;

import com.cdms.backend.entity.Shop;
import com.cdms.backend.repository.ShopRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/shops")
@CrossOrigin(origins = "http://localhost:5173")
public class ShopController {

    @Autowired
    private ShopRepository shopRepository;


    // =====================================================
    // REGISTER SHOP
    // =====================================================

    @PostMapping("/register")
    public ResponseEntity<?> registerShop(@RequestBody Shop shop) {

        Optional<Shop> existingEmail =
                shopRepository.findByEmail(shop.getEmail());

        if (existingEmail.isPresent()) {

            return ResponseEntity
                    .status(HttpStatus.CONFLICT)
                    .body("Email already registered");
        }


        Optional<Shop> existingPhone =
                shopRepository.findByPhone(shop.getPhone());

        if (existingPhone.isPresent()) {

            return ResponseEntity
                    .status(HttpStatus.CONFLICT)
                    .body("Phone number already registered");
        }


        Shop savedShop =
                shopRepository.save(shop);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(savedShop);
    }


    // =====================================================
    // LOGIN SHOP
    // =====================================================

    @PostMapping("/login")
    public ResponseEntity<?> loginShop(
            @RequestBody Shop loginShop) {

        Optional<Shop> shop =
                shopRepository.findByEmail(
                        loginShop.getEmail()
                );


        if (shop.isEmpty()) {

            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body("Email not registered");
        }


        Shop existingShop =
                shop.get();


        if (!existingShop.getPassword()
                .equals(loginShop.getPassword())) {

            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body("Incorrect password");
        }


        return ResponseEntity.ok(
                existingShop
        );
    }


    // =====================================================
    // CHECK EMAIL FOR FORGOT PASSWORD
    // =====================================================

    @GetMapping("/check-email")
    public ResponseEntity<?> checkEmail(
            @RequestParam String email) {

        Optional<Shop> shop =
                shopRepository.findByEmail(email);

        if (shop.isEmpty()) {

            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body("Email not registered");
        }

        return ResponseEntity.ok(
                "Email registered"
        );
    }


    // =====================================================
    // UPDATE PASSWORD
    // =====================================================

    @PutMapping("/update-password")
    public ResponseEntity<?> updatePassword(
            @RequestParam String email,
            @RequestBody String newPassword) {

        Optional<Shop> shop =
                shopRepository.findByEmail(email);

        if (shop.isEmpty()) {

            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body("Email not registered");
        }


        Shop existingShop =
                shop.get();


        existingShop.setPassword(
                newPassword.trim()
        );


        shopRepository.save(existingShop);


        return ResponseEntity.ok(
                "Password updated successfully"
        );
    }


    // =====================================================
    // GET ALL SHOPS
    // =====================================================

    @GetMapping
    public ResponseEntity<?> getAllShops() {

        return ResponseEntity.ok(
                shopRepository.findAll()
        );
    }
}