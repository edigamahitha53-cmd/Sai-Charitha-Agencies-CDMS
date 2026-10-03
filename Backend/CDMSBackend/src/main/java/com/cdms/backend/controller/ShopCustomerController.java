package com.cdms.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.cdms.backend.entity.ShopCustomer;
import com.cdms.backend.repository.ShopCustomerRepository;

@RestController
@RequestMapping("/api/shop-customers")
@CrossOrigin(origins = "http://localhost:5173")
public class ShopCustomerController {

    @Autowired
    private ShopCustomerRepository shopCustomerRepository;


    @PostMapping("/register")
    public ResponseEntity<?> registerShop(
            @RequestBody ShopCustomer shopCustomer) {

        if (shopCustomer.getEmail() != null &&
            shopCustomerRepository.existsByEmailIgnoreCase(
                shopCustomer.getEmail()
            )) {

            return ResponseEntity
                    .status(HttpStatus.CONFLICT)
                    .body("Email already exists");
        }


        if (shopCustomer.getPhone() != null &&
            shopCustomerRepository.existsByPhone(
                shopCustomer.getPhone()
            )) {

            return ResponseEntity
                    .status(HttpStatus.CONFLICT)
                    .body("Phone number already exists");
        }


        ShopCustomer savedCustomer =
                shopCustomerRepository.save(shopCustomer);


        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(savedCustomer);
    }


    @GetMapping
    public List<ShopCustomer> getAllShops() {

        return shopCustomerRepository.findAll();
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteShop(
            @PathVariable Long id) {

        if (!shopCustomerRepository.existsById(id)) {

            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body("Customer not found");
        }


        shopCustomerRepository.deleteById(id);


        return ResponseEntity.ok(
                "Customer deleted successfully"
        );
    }
}