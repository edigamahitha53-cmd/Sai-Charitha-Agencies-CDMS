import React from "react";
import { useNavigate } from "react-router-dom";

import {
  FaStore,
  FaShoppingBag,
  FaClipboardList,
  FaSignOutAlt,
  FaUser,
  FaBoxOpen,
  FaArrowRight,
  FaArrowLeft,
  FaTruck,
  FaHeart,
  FaStar
} from "react-icons/fa";

import "../../assets/styles/shopDashboard.css";


function ShopDashboard() {

  const navigate = useNavigate();


  /* =====================================================
     GET LOGGED-IN SHOP
  ===================================================== */

  const loggedInShop =
    JSON.parse(
      localStorage.getItem("loggedInShop")
    );


  /* =====================================================
     BACK TO HOME
  ===================================================== */

  const handleBack = () => {

    navigate("/");

  };


  /* =====================================================
     LOGOUT
  ===================================================== */

  const handleLogout = () => {

    localStorage.removeItem("loggedInShop");
    localStorage.removeItem("currentShop");
    localStorage.removeItem("loggedInUser");
    localStorage.removeItem("currentUser");
    localStorage.removeItem("shopUser");
    localStorage.removeItem("user");
    localStorage.removeItem("customer");

    navigate("/");

  };


  /* =====================================================
     SHOP NOT LOGGED IN
  ===================================================== */

  if (!loggedInShop) {

    return (

      <div className="shop-dashboard-page">

        <div className="shop-dashboard-bg-circle shop-bg-one"></div>
        <div className="shop-dashboard-bg-circle shop-bg-two"></div>

        <div className="shop-dashboard-empty">

          <div className="shop-empty-icon">
            <FaStore />
          </div>

          <h2>
            Please Login First
          </h2>

          <p>
            You need to login to access
            your shop dashboard.
          </p>

          <button
            onClick={() =>
              navigate("/login")
            }
          >
            <FaUser />

            Go to Login

            <FaArrowRight />

          </button>

        </div>

      </div>

    );

  }


  return (

    <div className="shop-dashboard-page">


      {/* =================================================
          BACKGROUND DECORATIONS
      ================================================= */}

      <div className="shop-dashboard-bg-circle shop-bg-one"></div>

      <div className="shop-dashboard-bg-circle shop-bg-two"></div>

      <div className="shop-dashboard-bg-circle shop-bg-three"></div>


      {/* =================================================
          HEADER
      ================================================= */}

      <div className="shop-dashboard-header">


        <div className="shop-header-content">


          {/* ================= BACK BUTTON ================= */}

          <button
            className="shop-logout-btn"
            onClick={handleBack}
            style={{
              marginBottom: "18px"
            }}
          >

            <FaArrowLeft />

            Back

          </button>


          {/* ================= DASHBOARD TITLE ================= */}

          <h1>

            Shop Dashboard

          </h1>


          <p className="shop-dashboard-subtitle">

            Manage your shop, explore chocolates
            and track your orders easily.

          </p>

        </div>


        {/* ================= LOGOUT ================= */}

        <button
          className="shop-logout-btn"
          onClick={handleLogout}
        >

          <FaSignOutAlt />

          Logout

        </button>

      </div>


      {/* =================================================
          MAIN CONTAINER
      ================================================= */}

      <div className="shop-dashboard-container">


        {/* =================================================
            WELCOME CARD
        ================================================= */}

        <div className="shop-welcome-card">


          <div className="shop-welcome-left">


            <div className="shop-welcome-icon">

              <FaStore />

            </div>


            <div className="shop-welcome-text">

              <p>
                Welcome back
              </p>


              <h2>

                {
                  loggedInShop.shopName ||
                  loggedInShop.name ||
                  "Shop Owner"
                }

              </h2>


              <span>

                {loggedInShop.email}

              </span>

            </div>

          </div>


          <div className="shop-welcome-decoration">

            <FaHeart />

            <FaStar />

            <FaShoppingBag />

          </div>

        </div>


        {/* =================================================
            QUICK STATS
        ================================================= */}

        <div className="shop-dashboard-stats">


          {/* PRODUCTS */}

          <div className="shop-stat-card">

            <div className="shop-stat-icon">

              <FaBoxOpen />

            </div>


            <div>

              <span>
                Products
              </span>

              <strong>
                Explore
              </strong>

            </div>

          </div>


          {/* CART */}

          <div className="shop-stat-card">

            <div className="shop-stat-icon">

              <FaShoppingBag />

            </div>


            <div>

              <span>
                Shopping
              </span>

              <strong>
                My Cart
              </strong>

            </div>

          </div>


          {/* ORDERS */}

          <div className="shop-stat-card">

            <div className="shop-stat-icon">

              <FaClipboardList />

            </div>


            <div>

              <span>
                Order History
              </span>

              <strong>
                My Orders
              </strong>

            </div>

          </div>


          {/* DELIVERY */}

          <div className="shop-stat-card">

            <div className="shop-stat-icon">

              <FaTruck />

            </div>


            <div>

              <span>
                Delivery
              </span>

              <strong>
                3–5 Days
              </strong>

            </div>

          </div>


        </div>


        {/* =================================================
            SECTION TITLE
        ================================================= */}

        <div className="shop-dashboard-section-title">

          <div>

            <p>
              QUICK ACCESS
            </p>

            <h2>
              What would you like to do?
            </h2>

          </div>

        </div>


        {/* =================================================
            DASHBOARD CARDS
        ================================================= */}

        <div className="shop-dashboard-cards">


          {/* =================================================
              PRODUCTS
          ================================================= */}

          <div className="shop-dashboard-card">

            <div className="shop-card-top">

              <div className="shop-dashboard-card-icon">

                <FaBoxOpen />

              </div>


              <span className="shop-card-number">
                01
              </span>

            </div>


            <h3>
              Products
            </h3>


            <p>
              Browse our available chocolate
              products and explore different
              brands, flavours and prices.
            </p>


            <button
              onClick={() =>
                navigate("/products", {
                  state: {
                    from: "shop-dashboard"
                  }
                })
              }
            >

              View Products

              <FaArrowRight />

            </button>

          </div>


          {/* =================================================
              CART
          ================================================= */}

          <div className="shop-dashboard-card">

            <div className="shop-card-top">

              <div className="shop-dashboard-card-icon">

                <FaShoppingBag />

              </div>


              <span className="shop-card-number">
                02
              </span>

            </div>


            <h3>
              My Cart
            </h3>


            <p>
              View the products you have added
              to your cart and continue placing
              your shop order.
            </p>


            <button
              onClick={() =>
                navigate("/order-cart")
              }
            >

              View Cart

              <FaArrowRight />

            </button>

          </div>


          {/* =================================================
              ORDERS
          ================================================= */}

          <div className="shop-dashboard-card">

            <div className="shop-card-top">

              <div className="shop-dashboard-card-icon">

                <FaClipboardList />

              </div>


              <span className="shop-card-number">
                03
              </span>

            </div>


            <h3>
              My Orders
            </h3>


            <p>
              View your previous orders, check
              order status and track your
              delivery information.
            </p>


            <button
              onClick={() =>
                navigate("/my-orders")
              }
            >

              View Orders

              <FaArrowRight />

            </button>

          </div>


          {/* =================================================
              ACCOUNT
          ================================================= */}

          <div className="shop-dashboard-card">

            <div className="shop-card-top">

              <div className="shop-dashboard-card-icon">

                <FaUser />

              </div>


              <span className="shop-card-number">
                04
              </span>

            </div>


            <h3>
              My Account
            </h3>


            <p>
              View your registered shop
              information and manage your
              account details.
            </p>


            <button
              onClick={() =>
                navigate("/shop-account")
              }
            >

              View Account

              <FaArrowRight />

            </button>

          </div>


        </div>


        {/* =================================================
            BOTTOM INFORMATION CARD
        ================================================= */}

        <div className="shop-dashboard-info-card">


          <div className="shop-info-icon">

            <FaTruck />

          </div>


          <div className="shop-info-content">

            <span>
              DELIVERY INFORMATION
            </span>

            <h3>
              Your chocolates, delivered with care.
            </h3>

            <p>
              Orders are normally delivered within
              3–5 days. You can check your order
              status anytime from My Orders.
            </p>

          </div>


          <button
            onClick={() =>
              navigate("/my-orders")
            }
          >

            Track Orders

            <FaArrowRight />

          </button>


        </div>


      </div>


      {/* =================================================
          FOOTER
      ================================================= */}

      <div className="shop-dashboard-footer">

        <FaStore />

        <span>
          SAI CHARITHA AGENCIES
        </span>

        <small>
          Trusted Chocolate Distribution Partner
        </small>

      </div>


    </div>

  );

}


export default ShopDashboard;