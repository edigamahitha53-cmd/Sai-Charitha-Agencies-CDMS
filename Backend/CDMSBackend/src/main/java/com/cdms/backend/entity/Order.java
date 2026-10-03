package com.cdms.backend.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "orders")
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    private String orderId;

    private String orderDate;

    private String status;


    @Column(columnDefinition = "LONGTEXT")
    private String items;


    private Integer totalCases;

    private Integer totalItems;

    private Double totalAmount;


    private String shopId;

    private String customerId;

    private String shopName;

    private String ownerName;

    private String email;

    private String phone;


    @Column(columnDefinition = "LONGTEXT")
    private String deliveryDetails;


    public Order() {
    }


    // ================================
    // ID
    // ================================

    public Long getId() {

        return id;

    }

    public void setId(Long id) {

        this.id = id;

    }


    // ================================
    // ORDER ID
    // ================================

    public String getOrderId() {

        return orderId;

    }

    public void setOrderId(String orderId) {

        this.orderId = orderId;

    }


    // ================================
    // ORDER DATE
    // ================================

    public String getOrderDate() {

        return orderDate;

    }

    public void setOrderDate(String orderDate) {

        this.orderDate = orderDate;

    }


    // ================================
    // STATUS
    // ================================

    public String getStatus() {

        return status;

    }

    public void setStatus(String status) {

        this.status = status;

    }


    // ================================
    // ITEMS
    // ================================

    public String getItems() {

        return items;

    }

    public void setItems(String items) {

        this.items = items;

    }


    // ================================
    // TOTAL CASES
    // ================================

    public Integer getTotalCases() {

        return totalCases;

    }

    public void setTotalCases(Integer totalCases) {

        this.totalCases = totalCases;

    }


    // ================================
    // TOTAL ITEMS
    // ================================

    public Integer getTotalItems() {

        return totalItems;

    }

    public void setTotalItems(Integer totalItems) {

        this.totalItems = totalItems;

    }


    // ================================
    // TOTAL AMOUNT
    // ================================

    public Double getTotalAmount() {

        return totalAmount;

    }

    public void setTotalAmount(Double totalAmount) {

        this.totalAmount = totalAmount;

    }


    // ================================
    // SHOP ID
    // ================================

    public String getShopId() {

        return shopId;

    }

    public void setShopId(String shopId) {

        this.shopId = shopId;

    }


    // ================================
    // CUSTOMER ID
    // ================================

    public String getCustomerId() {

        return customerId;

    }

    public void setCustomerId(String customerId) {

        this.customerId = customerId;

    }


    // ================================
    // SHOP NAME
    // ================================

    public String getShopName() {

        return shopName;

    }

    public void setShopName(String shopName) {

        this.shopName = shopName;

    }


    // ================================
    // OWNER NAME
    // ================================

    public String getOwnerName() {

        return ownerName;

    }

    public void setOwnerName(String ownerName) {

        this.ownerName = ownerName;

    }


    // ================================
    // EMAIL
    // ================================

    public String getEmail() {

        return email;

    }

    public void setEmail(String email) {

        this.email = email;

    }


    // ================================
    // PHONE
    // ================================

    public String getPhone() {

        return phone;

    }

    public void setPhone(String phone) {

        this.phone = phone;

    }


    // ================================
    // DELIVERY DETAILS
    // ================================

    public String getDeliveryDetails() {

        return deliveryDetails;

    }

    public void setDeliveryDetails(
            String deliveryDetails) {

        this.deliveryDetails =
                deliveryDetails;

    }

}