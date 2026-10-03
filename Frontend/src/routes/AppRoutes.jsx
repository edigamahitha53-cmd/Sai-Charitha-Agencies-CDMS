import React from "react";

import {
  Routes,
  Route,
  Navigate
} from "react-router-dom";


/* ================= PROTECTED ROUTE ================= */

import ProtectedRoute
  from "./ProtectedRoute";

import AdminProtectedRoute
  from "./AdminProtectedRoute";


/* ================= HOME ================= */

import Home
  from "../pages/Home";


/* ================= PRODUCTS ================= */

import Products
  from "../pages/Products";

import ProductDetails
  from "../pages/ProductDetails";


/* ================= ORDERS ================= */

import OrderCart
  from "../pages/OrderCart";

import OrderConfirmation
  from "../pages/OrderConfirmation";

import MyOrder
  from "../pages/MyOrder";


/* ================= SHOP AUTH ================= */

import ShopLogin
  from "../pages/ShopLogin";

import ShopRegister
  from "../pages/ShopRegister";

import ForgotPassword
  from "../pages/ForgotPassword";

import OtpVerification
  from "../pages/OtpVerification";

import ResetPassword
  from "../pages/ResetPassword";


/* ================= HOME COMPONENTS ================= */

import About
  from "../components/home/About";

import Contact
  from "../components/home/Contact";


/* ================= SHOP ================= */

import ShopDashboard
  from "../pages/shop/ShopDashboard";

import ShopAccount
  from "../pages/ShopAccount";


/* ================= ADMIN AUTH ================= */

import AdminLogin
  from "../pages/AdminLogin";


/* ================= ADMIN ================= */

import AdminDashboard
  from "../pages/admin/AdminDashboard";

import ManageProducts
  from "../pages/admin/ManageProducts";

import ManageBrands
  from "../pages/admin/ManageBrands";

import ManageCustomers
  from "../pages/admin/ManageCustomers";

import ManageOrders
  from "../pages/admin/ManageOrders";

import Reports
  from "../pages/admin/Reports";


function AppRoutes() {

  return (

    <Routes>


      {/* =========================================
          HOME
      ========================================= */}

      <Route
        path="/"
        element={
          <Home />
        }
      />


      {/* =========================================
          CUSTOMER PRODUCTS
      ========================================= */}

      <Route
        path="/products"
        element={
          <Products />
        }
      />


      {/* =========================================
          PRODUCT DETAILS
          
          IMPORTANT:
          Home and Products both use:
          /products/:id
      ========================================= */}

      <Route
        path="/products/:id"
        element={
          <ProductDetails />
        }
      />


      {/* =========================================
          ORDER CART
      ========================================= */}

      <Route
        path="/order-cart"
        element={
          <OrderCart />
        }
      />


      {/* =========================================
          ORDER CONFIRMATION
      ========================================= */}

      <Route
        path="/order-confirmation"
        element={
          <OrderConfirmation />
        }
      />


      {/* =========================================
          MY ORDERS
      ========================================= */}

      <Route
        path="/my-orders"
        element={
          <MyOrder />
        }
      />


      <Route
        path="/my-orders/:id"
        element={
          <MyOrder />
        }
      />


      {/* =========================================
          ABOUT
      ========================================= */}

      <Route
        path="/about"
        element={
          <About />
        }
      />


      {/* =========================================
          CONTACT
      ========================================= */}

      <Route
        path="/contact"
        element={
          <Contact />
        }
      />


      {/* =========================================
          SHOP LOGIN
      ========================================= */}

      <Route
        path="/login"
        element={
          <ShopLogin />
        }
      />


      {/* =========================================
          SHOP REGISTER
      ========================================= */}

      <Route
        path="/register"
        element={
          <ShopRegister />
        }
      />


      {/* =========================================
          FORGOT PASSWORD
      ========================================= */}

      <Route
        path="/forgot-password"
        element={
          <ForgotPassword />
        }
      />


      {/* =========================================
          OTP VERIFICATION
      ========================================= */}

      <Route
        path="/otp-verification"
        element={
          <OtpVerification />
        }
      />


      {/* =========================================
          RESET PASSWORD
      ========================================= */}

      <Route
        path="/reset-password"
        element={
          <ResetPassword />
        }
      />


      {/* =========================================
          SHOP DASHBOARD
      ========================================= */}

      <Route
        path="/shop-dashboard"
        element={
          <ProtectedRoute>
            <ShopDashboard />
          </ProtectedRoute>
        }
      />


      {/* =========================================
          SHOP ACCOUNT
      ========================================= */}

      <Route
        path="/shop-account"
        element={
          <ProtectedRoute>
            <ShopAccount />
          </ProtectedRoute>
        }
      />


      {/* =========================================
          ADMIN LOGIN
      ========================================= */}

      <Route
        path="/admin-login"
        element={
          <AdminLogin />
        }
      />


      {/* =========================================
          ADMIN DASHBOARD
      ========================================= */}

      <Route
        path="/admin-dashboard"
        element={
          <AdminProtectedRoute>
            <AdminDashboard />
          </AdminProtectedRoute>
        }
      />


      {/* =========================================
          ADMIN PRODUCTS
      ========================================= */}

      <Route
        path="/admin/products"
        element={
          <AdminProtectedRoute>
            <ManageProducts />
          </AdminProtectedRoute>
        }
      />


      {/* =========================================
          ADMIN BRANDS
      ========================================= */}

      <Route
        path="/admin/brands"
        element={
          <AdminProtectedRoute>
            <ManageBrands />
          </AdminProtectedRoute>
        }
      />


      {/* =========================================
          ADMIN CUSTOMERS
      ========================================= */}

      <Route
        path="/admin/customers"
        element={
          <AdminProtectedRoute>
            <ManageCustomers />
          </AdminProtectedRoute>
        }
      />


      {/* =========================================
          ADMIN ORDERS
      ========================================= */}

      <Route
        path="/admin/orders"
        element={
          <AdminProtectedRoute>
            <ManageOrders />
          </AdminProtectedRoute>
        }
      />


      {/* =========================================
          ADMIN REPORTS
      ========================================= */}

      <Route
        path="/admin/reports"
        element={
          <AdminProtectedRoute>
            <Reports />
          </AdminProtectedRoute>
        }
      />


      {/* =========================================
          INVALID URL
      ========================================= */}

      <Route
        path="*"
        element={
          <Navigate
            to="/"
            replace
          />
        }
      />


    </Routes>

  );

}


export default AppRoutes;