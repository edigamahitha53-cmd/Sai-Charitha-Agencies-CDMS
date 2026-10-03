# 🍫 Sai Charitha Agencies - Chocolate Distribution Management System

A full-stack Chocolate Distribution Management System developed for Sai Charitha Agencies to manage chocolate products, shop owners, inventory, and orders through a centralized web application.

The system provides separate Customer and Admin modules. Shop owners can register, log in, browse available chocolate products, select products based on packing options, place orders, and provide delivery details. Administrators can manage products, stock, and customer orders.

---

## 📌 About the Project

Sai Charitha Agencies is a chocolate distribution business where shop owners need to place orders for chocolate products.

The Chocolate Distribution Management System (CDMS) is developed to simplify this process by providing a digital platform for shop owners and administrators.

The system reduces the dependency on manual order collection and provides a centralized way to manage products, stock, and orders.

---

## 🎯 Objectives

- Digitize the chocolate distribution process.
- Provide an online platform for shop owners to place orders.
- Manage chocolate products and their stock.
- Support box and case based ordering.
- Validate stock availability before placing an order.
- Automatically update stock after a successful order.
- Allow administrators to manage products and orders.
- Store application data using MySQL.

---

# 👤 Customer / Shop Owner Module

The Customer module allows shop owners to register and place orders for available chocolate products.

### Features

- Shop Owner Registration
- Shop Owner Login
- Customer Dashboard
- Browse Chocolate Products
- View Product Details
- Select Flavour
- View MRP and Selling Price
- Select Box or Case
- View Pieces per Box
- View Boxes per Case
- Add Products to Order Cart
- Update Product Quantity
- Remove Products from Cart
- View Order Summary
- Enter Delivery Details
- Place Order
- Order Confirmation

---

# 👨‍💼 Admin Module

The Admin module is used to manage the distribution system.

### Features

- Admin Login
- Admin Dashboard
- Add Products
- View Products
- Update Products
- Delete Products
- Manage Product Stock
- View Customer Orders
- View Order Details
- Manage Order Status

---

# 📦 Product Management

The system stores important information related to each chocolate product.

Product information includes:

- Product Name
- Flavour
- MRP
- Selling Price
- Pieces per Box
- Boxes per Case
- Packing Type
- Available Stock
- Product Image

Administrators can manage product information and stock through the Admin module.

---

# 🛒 Order Management

Shop owners can select products and add them to the Order Cart.

The system supports:

- Box-based ordering
- Case-based ordering
- Quantity management
- Automatic item total calculation
- Total boxes calculation
- Total cases calculation
- Order total calculation
- Delivery details
- Order placement
- Order confirmation

---

# 📊 Stock Management

Stock availability is checked when a customer places an order.

### If Stock is 0

The customer is informed that the product is currently out of stock.

### If Requested Quantity is Greater Than Available Stock

The customer is informed about the available quantity and is asked to order within the available stock.

### If Sufficient Stock is Available

The order is placed successfully and the corresponding product stock is automatically reduced.

---

# 🏗️ System Architecture

```text
┌───────────────────────────┐
│     Shop Owner / User     │
└─────────────┬─────────────┘
              │
              ▼
┌───────────────────────────┐
│     React.js Frontend     │
│          + Vite           │
└─────────────┬─────────────┘
              │
              │ REST API
              ▼
┌───────────────────────────┐
│     Spring Boot Backend   │
│          + Java           │
└─────────────┬─────────────┘
              │
              │ JPA / Hibernate
              ▼
┌───────────────────────────┐
│      MySQL Database       │
└───────────────────────────┘
              ▲
              │
              │
┌─────────────┴─────────────┐
│      Admin Module         │
└───────────────────────────┘