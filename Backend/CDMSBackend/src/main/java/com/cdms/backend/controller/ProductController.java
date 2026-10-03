package com.cdms.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cdms.backend.entity.Product;
import com.cdms.backend.service.ProductService;

@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = "http://localhost:5173")
public class ProductController {

    @Autowired
    private ProductService productService;


    // ==========================================
    // ADD PRODUCT
    // ==========================================

    @PostMapping
    public Product saveProduct(
            @RequestBody Product product) {

        return productService.saveProduct(product);

    }


    // ==========================================
    // GET ALL PRODUCTS
    // ==========================================

    @GetMapping
    public List<Product> getAllProducts() {

        return productService.getAllProducts();

    }


    // ==========================================
    // GET PRODUCT BY ID
    // ==========================================

    @GetMapping("/{id}")
    public Product getProductById(
            @PathVariable Long id) {

        return productService.getProductById(id);

    }


    // ==========================================
    // UPDATE PRODUCT
    // ==========================================

    @PutMapping("/{id}")
    public Product updateProduct(
            @PathVariable Long id,
            @RequestBody Product product) {

        Product existingProduct =
                productService.getProductById(id);

        if (existingProduct == null) {
            return null;
        }


        existingProduct.setProductName(
                product.getProductName()
        );

        existingProduct.setBrandName(
                product.getBrandName()
        );

        existingProduct.setFlavour(
                product.getFlavour()
        );

        existingProduct.setMrp(
                product.getMrp()
        );

        existingProduct.setSellingPrice(
                product.getSellingPrice()
        );

        existingProduct.setPiecesPerBox(
                product.getPiecesPerBox()
        );

        existingProduct.setBoxesPerCase(
                product.getBoxesPerCase()
        );

        existingProduct.setStock(
                product.getStock()
        );

        existingProduct.setImage(
                product.getImage()
        );


        return productService.saveProduct(
                existingProduct
        );

    }


    // ==========================================
    // DELETE PRODUCT
    // ==========================================

    @DeleteMapping("/{id}")
    public void deleteProduct(
            @PathVariable Long id) {

        productService.deleteProduct(id);

    }

}