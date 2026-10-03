package com.cdms.backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cdms.backend.entity.Product;
import com.cdms.backend.repository.ProductRepository;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    public Product saveProduct(Product product) {

        return productRepository.save(product);

    }

    public List<Product> getAllProducts() {

        return productRepository.findAll();

    }

    public Product getProductById(Long id) {

        return productRepository.findById(id).orElse(null);

    }

    public void deleteProduct(Long id) {

        productRepository.deleteById(id);

    }

}