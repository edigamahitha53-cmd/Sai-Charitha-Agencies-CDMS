package com.cdms.backend.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String productName;

    private String brandName;

    private String flavour;

    private Double mrp;

    private Double sellingPrice;

    private Integer piecesPerBox;

    private Integer boxesPerCase;

    private Integer stock;

    @Column(columnDefinition = "LONGTEXT")
    private String image;


    // ================================
    // DEFAULT CONSTRUCTOR
    // ================================

    public Product() {
    }


    // ================================
    // GETTER AND SETTER - ID
    // ================================

    public Long getId() {

        return id;

    }

    public void setId(Long id) {

        this.id = id;

    }


    // ================================
    // GETTER AND SETTER - PRODUCT NAME
    // ================================

    public String getProductName() {

        return productName;

    }

    public void setProductName(String productName) {

        this.productName = productName;

    }


    // ================================
    // GETTER AND SETTER - BRAND NAME
    // ================================

    public String getBrandName() {

        return brandName;

    }

    public void setBrandName(String brandName) {

        this.brandName = brandName;

    }


    // ================================
    // GETTER AND SETTER - FLAVOUR
    // ================================

    public String getFlavour() {

        return flavour;

    }

    public void setFlavour(String flavour) {

        this.flavour = flavour;

    }


    // ================================
    // GETTER AND SETTER - MRP
    // ================================

    public Double getMrp() {

        return mrp;

    }

    public void setMrp(Double mrp) {

        this.mrp = mrp;

    }


    // ================================
    // GETTER AND SETTER - SELLING PRICE
    // ================================

    public Double getSellingPrice() {

        return sellingPrice;

    }

    public void setSellingPrice(Double sellingPrice) {

        this.sellingPrice = sellingPrice;

    }


    // ================================
    // GETTER AND SETTER - PIECES PER BOX
    // ================================

    public Integer getPiecesPerBox() {

        return piecesPerBox;

    }

    public void setPiecesPerBox(Integer piecesPerBox) {

        this.piecesPerBox = piecesPerBox;

    }


    // ================================
    // GETTER AND SETTER - BOXES PER CASE
    // ================================

    public Integer getBoxesPerCase() {

        return boxesPerCase;

    }

    public void setBoxesPerCase(Integer boxesPerCase) {

        this.boxesPerCase = boxesPerCase;

    }


    // ================================
    // GETTER AND SETTER - STOCK
    // ================================

    public Integer getStock() {

        return stock;

    }

    public void setStock(Integer stock) {

        this.stock = stock;

    }


    // ================================
    // GETTER AND SETTER - IMAGE
    // ================================

    public String getImage() {

        return image;

    }

    public void setImage(String image) {

        this.image = image;

    }

}