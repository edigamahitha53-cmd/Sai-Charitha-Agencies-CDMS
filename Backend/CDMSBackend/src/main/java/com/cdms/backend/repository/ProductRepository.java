package com.cdms.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cdms.backend.entity.Product;

public interface ProductRepository
        extends JpaRepository<Product, Long> {

}