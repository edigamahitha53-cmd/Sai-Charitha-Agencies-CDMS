package com.cdms.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cdms.backend.entity.ShopCustomer;

public interface ShopCustomerRepository extends JpaRepository<ShopCustomer, Long> {

    boolean existsByEmailIgnoreCase(String email);

    boolean existsByPhone(String phone);
}