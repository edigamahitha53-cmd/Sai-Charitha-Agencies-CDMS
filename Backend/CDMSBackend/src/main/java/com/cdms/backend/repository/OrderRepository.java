package com.cdms.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cdms.backend.entity.Order;

public interface OrderRepository
        extends JpaRepository<Order, Long> {

    List<Order> findByShopId(String shopId);

}
