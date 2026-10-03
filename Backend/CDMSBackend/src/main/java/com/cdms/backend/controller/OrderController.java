package com.cdms.backend.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import com.cdms.backend.entity.Order;
import com.cdms.backend.entity.Product;
import com.cdms.backend.repository.OrderRepository;
import com.cdms.backend.repository.ProductRepository;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;


@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins = "http://localhost:5173")
public class OrderController {


    @Autowired
    private OrderRepository orderRepository;


    @Autowired
    private ProductRepository productRepository;


    @Autowired
    private ObjectMapper objectMapper;


    // =========================================================
    // CREATE ORDER + REDUCE STOCK
    // =========================================================

    @PostMapping
    @Transactional
    public ResponseEntity<?> createOrder(
            @RequestBody Order order) {

        try {

            // -------------------------------------------------
            // CHECK ORDER ITEMS
            // -------------------------------------------------

            if (order.getItems() == null
                    || order.getItems().trim().isEmpty()) {

                return ResponseEntity.badRequest().body(
                        Map.of(
                                "success", false,
                                "message",
                                "Order does not contain any products."
                        )
                );
            }


            // -------------------------------------------------
            // CONVERT ITEMS JSON INTO LIST
            // -------------------------------------------------

            List<Map<String, Object>> items =
                    objectMapper.readValue(
                            order.getItems(),
                            new TypeReference<List<Map<String, Object>>>() {
                            }
                    );


            // =================================================
            // STEP 1: CHECK STOCK FIRST
            // =================================================

            for (Map<String, Object> item : items) {

                Object productIdObject =
                        item.get("productId");

                if (productIdObject == null) {

                    return ResponseEntity.badRequest().body(
                            Map.of(
                                    "success", false,
                                    "message",
                                    "Product ID is missing in order."
                            )
                    );
                }


                Long productId =
                        Long.valueOf(
                                productIdObject.toString()
                        );


                Object quantityObject =
                        item.get("quantity");

                if (quantityObject == null) {

                    return ResponseEntity.badRequest().body(
                            Map.of(
                                    "success", false,
                                    "message",
                                    "Product quantity is missing."
                            )
                    );
                }


                int quantity =
                        Integer.parseInt(
                                quantityObject.toString()
                        );


                if (quantity <= 0) {

                    return ResponseEntity.badRequest().body(
                            Map.of(
                                    "success", false,
                                    "message",
                                    "Product quantity must be greater than zero."
                            )
                    );
                }


                // -------------------------------------------------
                // FIND PRODUCT
                // -------------------------------------------------

                Product product =
                        productRepository
                                .findById(productId)
                                .orElse(null);


                if (product == null) {

                    return ResponseEntity.badRequest().body(
                            Map.of(
                                    "success", false,
                                    "message",
                                    "Product with ID "
                                            + productId
                                            + " not found."
                            )
                    );
                }


                // -------------------------------------------------
                // GET CURRENT STOCK
                // -------------------------------------------------

                int currentStock =
                        product.getStock() == null
                                ? 0
                                : product.getStock();


                // -------------------------------------------------
                // CHECK AVAILABLE STOCK
                // -------------------------------------------------

                // CASE 1:
                // Product stock is completely finished

                if (currentStock == 0) {

                    return ResponseEntity.badRequest().body(
                            Map.of(
                                    "success", false,
                                    "message",
                                    product.getProductName()
                                            + " is not available. Currently out of stock."
                            )
                    );

                }


                // CASE 2:
                // Requested quantity is greater than available stock

                if (currentStock < quantity) {

                    return ResponseEntity.badRequest().body(
                            Map.of(
                                    "success", false,
                                    "message",
                                    "Only "
                                            + currentStock
                                            + " "
                                            + product.getProductName()
                                            + " are available. Please order "
                                            + currentStock
                                            + " or less."
                            )
                    );

                }

            }


            // =================================================
            // STEP 2: REDUCE STOCK
            // =================================================

            for (Map<String, Object> item : items) {

                Long productId =
                        Long.valueOf(
                                item.get("productId").toString()
                        );


                int quantity =
                        Integer.parseInt(
                                item.get("quantity").toString()
                        );


                // -------------------------------------------------
                // FIND PRODUCT
                // -------------------------------------------------

                Product product =
                        productRepository
                                .findById(productId)
                                .orElse(null);


                if (product == null) {

                    return ResponseEntity.badRequest().body(
                            Map.of(
                                    "success", false,
                                    "message",
                                    "Product not found."
                            )
                    );
                }


                // -------------------------------------------------
                // CURRENT STOCK
                // -------------------------------------------------

                int currentStock =
                        product.getStock() == null
                                ? 0
                                : product.getStock();


                // -------------------------------------------------
                // CALCULATE NEW STOCK
                // -------------------------------------------------

                int updatedStock =
                        currentStock - quantity;


                // -------------------------------------------------
                // UPDATE PRODUCT STOCK
                // -------------------------------------------------

                product.setStock(updatedStock);


                // -------------------------------------------------
                // SAVE PRODUCT
                // -------------------------------------------------

                productRepository.save(product);
            }


            // =================================================
            // STEP 3: SAVE ORDER
            // =================================================

            Order savedOrder =
                    orderRepository.save(order);


            // =================================================
            // SUCCESS RESPONSE
            // =================================================

            return ResponseEntity.ok(savedOrder);


        } catch (Exception e) {

            e.printStackTrace();

            return ResponseEntity
                    .internalServerError()
                    .body(
                            Map.of(
                                    "success", false,
                                    "message",
                                    "Unable to place order: "
                                            + e.getMessage()
                            )
                    );
        }
    }


    // =========================================================
    // GET ALL ORDERS
    // =========================================================

    @GetMapping
    public List<Order> getAllOrders() {

        return orderRepository.findAll();
    }


    // =========================================================
    // GET ORDER BY ID
    // =========================================================

    @GetMapping("/{id}")
    public Order getOrderById(
            @PathVariable Long id) {

        return orderRepository
                .findById(id)
                .orElse(null);
    }


    // =========================================================
    // GET ORDERS BY SHOP
    // =========================================================

    @GetMapping("/shop/{shopId}")
    public List<Order> getOrdersByShop(
            @PathVariable String shopId) {

        return orderRepository
                .findByShopId(shopId);
    }


    // =========================================================
    // UPDATE ORDER
    // =========================================================

    @PutMapping("/{id}")
    public Order updateOrder(
            @PathVariable Long id,
            @RequestBody Order order) {

        Order existingOrder =
                orderRepository
                        .findById(id)
                        .orElse(null);


        if (existingOrder == null) {

            return null;
        }


        existingOrder.setOrderId(
                order.getOrderId()
        );


        existingOrder.setOrderDate(
                order.getOrderDate()
        );


        existingOrder.setStatus(
                order.getStatus()
        );


        existingOrder.setItems(
                order.getItems()
        );


        existingOrder.setTotalCases(
                order.getTotalCases()
        );


        existingOrder.setTotalItems(
                order.getTotalItems()
        );


        existingOrder.setTotalAmount(
                order.getTotalAmount()
        );


        existingOrder.setShopId(
                order.getShopId()
        );


        existingOrder.setCustomerId(
                order.getCustomerId()
        );


        existingOrder.setShopName(
                order.getShopName()
        );


        existingOrder.setOwnerName(
                order.getOwnerName()
        );


        existingOrder.setEmail(
                order.getEmail()
        );


        existingOrder.setPhone(
                order.getPhone()
        );


        existingOrder.setDeliveryDetails(
                order.getDeliveryDetails()
        );


        return orderRepository.save(existingOrder);
    }


    // =========================================================
    // DELETE ORDER
    // =========================================================

    @DeleteMapping("/{id}")
    public void deleteOrder(
            @PathVariable Long id) {

        orderRepository.deleteById(id);
    }
}