import React, { useEffect, useState } from "react";

import {
  FaBoxOpen,
  FaShoppingCart,
  FaUsers,
  FaRupeeSign,
  FaTags,
  FaChartLine,
  FaArrowRight
} from "react-icons/fa";

import {
  Link,
  useNavigate
} from "react-router-dom";

import "./AdminDashboard.css";


function AdminDashboard() {

  const navigate = useNavigate();


  /* =========================================
     DASHBOARD STATISTICS
  ========================================= */

  const [totalProducts, setTotalProducts] =
    useState(0);

  const [totalOrders, setTotalOrders] =
    useState(0);

  const [registeredShops, setRegisteredShops] =
    useState(0);

  const [totalRevenue, setTotalRevenue] =
    useState(0);



  /* =========================================
     API URLS
  ========================================= */

  const PRODUCTS_API =
    "https://sai-charitha-agencies-cdms.onrender.com/api/products";

  const ORDERS_API =
    "https://sai-charitha-agencies-cdms.onrender.com/api/orders";

  const CUSTOMERS_API =
    "https://sai-charitha-agencies-cdms.onrender.com/api/shop-customers";



  /* =========================================
     ADMIN LOGOUT
  ========================================= */

  const handleLogout = () => {

    sessionStorage.removeItem(
      "adminLoggedIn"
    );

    navigate(
      "/admin-login"
    );

  };



  /* =========================================
     LOAD DASHBOARD DATA FROM DATABASE
  ========================================= */

  const loadDashboardData = async () => {


    /* =========================================
       TOTAL PRODUCTS
    ========================================= */

    try {

      const response =
        await fetch(PRODUCTS_API);


      if (response.ok) {

        const products =
          await response.json();


        setTotalProducts(
          products.length
        );

      }

    } catch (error) {

      console.error(
        "Error loading products:",
        error
      );

    }



    /* =========================================
       TOTAL ORDERS + TOTAL REVENUE
    ========================================= */

    try {

      const response =
        await fetch(ORDERS_API);


      if (response.ok) {

        const orders =
          await response.json();


        /* =====================================
           TOTAL ORDERS
        ===================================== */

        setTotalOrders(
          orders.length
        );



        /* =====================================
           TOTAL REVENUE
        ===================================== */

        const revenue =
          orders.reduce(
            (total, order) => {

              return (
                total +
                Number(
                  order.totalAmount || 0
                )
              );

            },
            0
          );


        setTotalRevenue(
          revenue
        );

      }

    } catch (error) {

      console.error(
        "Error loading orders:",
        error
      );

    }



    /* =========================================
       REGISTERED SHOPS / CUSTOMERS
    ========================================= */

    try {

      const response =
        await fetch(CUSTOMERS_API);


      if (response.ok) {

        const customers =
          await response.json();


        setRegisteredShops(
          customers.length
        );

      }

    } catch (error) {

      console.error(
        "Error loading customers:",
        error
      );

    }

  };



  /* =========================================
     LOAD DATA WHEN PAGE OPENS
  ========================================= */

  useEffect(() => {

    loadDashboardData();

  }, []);



  /* =========================================
     AUTO REFRESH DATABASE DATA
     Every 5 seconds
  ========================================= */

  useEffect(() => {

    const refreshInterval =
      setInterval(() => {

        loadDashboardData();

      }, 5000);


    return () => {

      clearInterval(
        refreshInterval
      );

    };

  }, []);



  return (

    <div className="admin-dashboard">


      {/* =========================================
          HEADER
      ========================================= */}

      <div className="admin-dashboard-header">

        <div>

          <p className="admin-small-title">
            SAI CHARITHA AGENCIES
          </p>

          <h1>
            Admin Dashboard
          </h1>

          <p>
            Manage your business from one place
          </p>

        </div>


        <div className="admin-profile">

          <div className="admin-profile-icon">
            A
          </div>

          <div>

            <strong>
              Admin
            </strong>

            <span>
              Administrator
            </span>

          </div>


          {/* LOGOUT BUTTON */}

          <button
            onClick={handleLogout}
            className="admin-logout-button"
          >
            Logout
          </button>

        </div>

      </div>



      {/* =========================================
          STATISTICS
      ========================================= */}

      <div className="admin-stats-container">


        {/* =========================================
            TOTAL PRODUCTS
        ========================================= */}

        <div className="admin-stat-card">

          <div className="admin-stat-icon">
            <FaBoxOpen />
          </div>

          <div>

            <span>
              Total Products
            </span>

            <h2>
              {totalProducts}
            </h2>

          </div>

        </div>



        {/* =========================================
            TOTAL ORDERS
        ========================================= */}

        <div className="admin-stat-card">

          <div className="admin-stat-icon">
            <FaShoppingCart />
          </div>

          <div>

            <span>
              Total Orders
            </span>

            <h2>
              {totalOrders}
            </h2>

          </div>

        </div>



        {/* =========================================
            REGISTERED SHOPS
        ========================================= */}

        <div className="admin-stat-card">

          <div className="admin-stat-icon">
            <FaUsers />
          </div>

          <div>

            <span>
              Registered Shops
            </span>

            <h2>
              {registeredShops}
            </h2>

          </div>

        </div>



        {/* =========================================
            TOTAL REVENUE
        ========================================= */}

        <div className="admin-stat-card">

          <div className="admin-stat-icon">
            <FaRupeeSign />
          </div>

          <div>

            <span>
              Total Revenue
            </span>

            <h2>
              ₹
              {totalRevenue.toLocaleString(
                "en-IN"
              )}
            </h2>

          </div>

        </div>


      </div>



      {/* =========================================
         ADMIN MENU
      ========================================= */}

      <div className="admin-menu-section">

        <div className="admin-section-title">

          <span>
            ADMIN MANAGEMENT
          </span>

          <h2>
            Manage Your Business
          </h2>

        </div>


        <div className="admin-menu-grid">


          {/* PRODUCTS */}

          <Link
            to="/admin/products"
            className="admin-menu-card"
          >

            <div className="admin-menu-icon">
              <FaBoxOpen />
            </div>

            <div className="admin-menu-text">

              <h3>
                Manage Products
              </h3>

              <p>
                Add, edit and delete products
              </p>

            </div>

            <FaArrowRight
              className="admin-menu-arrow"
            />

          </Link>



          {/* BRANDS */}

          <Link
            to="/admin/brands"
            className="admin-menu-card"
          >

            <div className="admin-menu-icon">
              <FaTags />
            </div>

            <div className="admin-menu-text">

              <h3>
                Manage Brands
              </h3>

              <p>
                Add and manage chocolate brands
              </p>

            </div>

            <FaArrowRight
              className="admin-menu-arrow"
            />

          </Link>



          {/* CUSTOMERS */}

          <Link
            to="/admin/customers"
            className="admin-menu-card"
          >

            <div className="admin-menu-icon">
              <FaUsers />
            </div>

            <div className="admin-menu-text">

              <h3>
                Manage Customers
              </h3>

              <p>
                View registered shop customers
              </p>

            </div>

            <FaArrowRight
              className="admin-menu-arrow"
            />

          </Link>



          {/* ORDERS */}

          <Link
            to="/admin/orders"
            className="admin-menu-card"
          >

            <div className="admin-menu-icon">
              <FaShoppingCart />
            </div>

            <div className="admin-menu-text">

              <h3>
                Manage Orders
              </h3>

              <p>
                View and manage customer orders
              </p>

            </div>

            <FaArrowRight
              className="admin-menu-arrow"
            />

          </Link>



          {/* REPORTS */}

          <Link
            to="/admin/reports"
            className="admin-menu-card"
          >

            <div className="admin-menu-icon">
              <FaChartLine />
            </div>

            <div className="admin-menu-text">

              <h3>
                Reports
              </h3>

              <p>
                View sales and business reports
              </p>

            </div>

            <FaArrowRight
              className="admin-menu-arrow"
            />

          </Link>


        </div>

      </div>



      {/* =========================================
          WELCOME CARD
      ========================================= */}

      <div className="admin-dashboard-content">

        <div className="admin-welcome-card">

          <h2>
            Welcome to Admin Dashboard
          </h2>

          <p>
            From here you can manage products,
            brands, customers, orders and your
            business reports.
          </p>

        </div>

      </div>


    </div>

  );

}


export default AdminDashboard;
