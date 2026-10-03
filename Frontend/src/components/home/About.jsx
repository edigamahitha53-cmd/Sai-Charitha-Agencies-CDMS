import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
  FaArrowRight,
  FaBoxes,
  FaStore,
  FaTruck,
  FaUsers,
  FaChartLine,
  FaHandshake,
  FaCheckCircle
} from "react-icons/fa";

import "../../assets/styles/About.css";

function About() {

  const [loggedInShop, setLoggedInShop] = useState(null);

  useEffect(() => {

    const shopKeys = [
      "loggedInShop",
      "currentShop",
      "loggedInUser",
      "currentUser",
      "shopUser",
      "user",
      "customer"
    ];

    let shopData = null;

    for (const key of shopKeys) {

      const storedData = localStorage.getItem(key);

      if (storedData) {

        try {

          const parsedData = JSON.parse(storedData);

          if (parsedData) {
            shopData = parsedData;
            break;
          }

        } catch (error) {

          if (storedData.trim()) {

            shopData = {
              name: storedData
            };

            break;
          }

        }

      }

    }

    setLoggedInShop(shopData);

  }, []);


  const getShopName = () => {

    if (!loggedInShop) {
      return "";
    }

    return (
      loggedInShop.shopName ||
      loggedInShop.name ||
      loggedInShop.ownerName ||
      loggedInShop.customerName ||
      loggedInShop.username ||
      loggedInShop.email ||
      "My Account"
    );

  };


  return (
    <div className="about-page">

      {/* ================= NAVBAR ================= */}

      <nav className="about-navbar">

        <div className="about-logo">

          <div className="about-logo-icon">
            <FaBoxes />
          </div>

          <div>
            <h2>SAI CHARITHA AGENCIES</h2>
            <span>Chocolate Distribution Management System</span>
          </div>

        </div>

        <div className="about-nav-links">

          <Link to="/" className="about-nav-link">
            Home
          </Link>

          <Link to="/products" className="about-nav-link">
            Products
          </Link>

          <Link to="/about" className="about-nav-link active">
            About
          </Link>

          <Link to="/contact" className="about-nav-link">
            Contact
          </Link>

        </div>

        <div className="about-auth">

          {loggedInShop ? (

            <Link
              to="/shop-dashboard"
              className="about-login"
            >
              {getShopName()}
            </Link>

          ) : (

            <>
              <Link to="/login" className="about-login">
                Login
              </Link>

              <Link to="/register" className="about-register">
                Register
              </Link>
            </>

          )}

        </div>

      </nav>


      {/* ================= HERO ================= */}

      <section className="about-hero">

        <div className="about-hero-overlay"></div>

        <div className="about-hero-content">

          <div className="about-small-title">
            <span></span>
            ABOUT OUR BUSINESS
            <span></span>
          </div>

          <h1>
            SAI CHARITHA
            <br />
            <span>AGENCIES</span>
          </h1>

          <div className="about-typing">
            Chocolate Distribution Made Simple
          </div>

          <p>
            We provide a simple and organized way to manage
            chocolate products, stock, shop owners and orders
            through one powerful distribution management system.
          </p>

        </div>

      </section>


      {/* ================= ABOUT INTRO ================= */}

      <section className="about-intro">

        <div className="about-intro-container">

          <div className="about-intro-text">

            <div className="about-section-label">
              <span></span>
              WHO WE ARE
            </div>

            <h2>
              Making Chocolate Distribution
              <span> Easier & Smarter</span>
            </h2>

            <p>
              SAI CHARITHA AGENCIES is focused on making the
              chocolate distribution process easier, faster and
              more organized.
            </p>

            <p>
              Our Chocolate Distribution Management System helps
              manage products, stock and shop orders from a single
              platform. Shop owners can easily view available
              products and place their orders.
            </p>

            <Link to="/products" className="about-explore-btn">
              Explore Products
              <FaArrowRight />
            </Link>

          </div>


          <div className="about-intro-cards">

            <div className="about-mini-card">

              <div className="about-mini-icon">
                <FaBoxes />
              </div>

              <h3>Stock Management</h3>

              <p>
                Easily manage products and available stock.
              </p>

            </div>


            <div className="about-mini-card">

              <div className="about-mini-icon">
                <FaStore />
              </div>

              <h3>Shop Management</h3>

              <p>
                Manage shop owners and their orders efficiently.
              </p>

            </div>

          </div>

        </div>

      </section>


      {/* ================= FEATURES ================= */}

      <section className="about-features">

        <div className="about-section-title">

          <span></span>

          <h2>What We Offer</h2>

          <span></span>

        </div>

        <p className="about-section-subtitle">
          Everything required for efficient chocolate distribution
        </p>


        <div className="about-feature-grid">

          <div className="about-feature-card">

            <div className="about-feature-icon">
              <FaBoxes />
            </div>

            <h3>Product Management</h3>

            <p>
              Manage your chocolate products and maintain
              accurate product information in one place.
            </p>

          </div>


          <div className="about-feature-card">

            <div className="about-feature-icon">
              <FaStore />
            </div>

            <h3>Shop Management</h3>

            <p>
              Keep shop owner information organized and
              manage their orders efficiently.
            </p>

          </div>


          <div className="about-feature-card">

            <div className="about-feature-icon">
              <FaTruck />
            </div>

            <h3>Easy Distribution</h3>

            <p>
              Make daily distribution activities faster and
              more organized.
            </p>

          </div>


          <div className="about-feature-card">

            <div className="about-feature-icon">
              <FaChartLine />
            </div>

            <h3>Better Management</h3>

            <p>
              Get a simple overview of products, stock and
              orders through one system.
            </p>

          </div>

        </div>

      </section>


      {/* ================= WHY US ================= */}

      <section className="about-why">

        <div className="about-why-container">

          <div className="about-why-heading">

            <div className="about-section-label">
              <span></span>
              WHY CHOOSE US
            </div>

            <h2>
              Built For
              <span> Better Distribution</span>
            </h2>

            <p>
              Our system is designed to reduce manual work and
              make chocolate distribution simple and convenient.
            </p>

          </div>


          <div className="about-check-list">

            <div className="about-check-item">
              <FaCheckCircle />
              <span>Simple and easy-to-use system</span>
            </div>

            <div className="about-check-item">
              <FaCheckCircle />
              <span>Easy product and stock management</span>
            </div>

            <div className="about-check-item">
              <FaCheckCircle />
              <span>Convenient shop owner ordering</span>
            </div>

            <div className="about-check-item">
              <FaCheckCircle />
              <span>Organized distribution process</span>
            </div>

          </div>

        </div>

      </section>


      {/* ================= CTA ================= */}

      <section className="about-cta">

        <div className="about-cta-content">

          <div className="about-cta-icon">
            <FaHandshake />
          </div>

          <h2>
            Let's Make Distribution Better
          </h2>

          <p>
            Explore our products and experience a simpler
            way to manage chocolate distribution.
          </p>

          <Link to="/products" className="about-cta-button">
            Explore Products
            <FaArrowRight />
          </Link>

        </div>

      </section>


      {/* ================= FOOTER ================= */}

      <footer className="about-footer">

        <div className="about-footer-container">

          <div className="about-footer-about">

            <div className="about-footer-logo">
              <FaBoxes />
            </div>

            <h2>SAI CHARITHA AGENCIES</h2>

            <p>
              Chocolate Distribution Management System.
            </p>

            <p>
              Making chocolate distribution simple,
              organized and efficient.
            </p>

          </div>


          <div className="about-footer-column">

            <h3>Quick Links</h3>

            <Link to="/">Home</Link>
            <Link to="/products">Products</Link>
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>

          </div>


          <div className="about-footer-column">

            <h3>Our Products</h3>

            <Link to="/products/galaxy">Galaxy</Link>
            <Link to="/products/snickers">Snickers</Link>
            <Link to="/products/boomer">Boomer</Link>
            <Link to="/products/orbit">Orbit</Link>
            <Link to="/products/centerfresh">Center Fresh</Link>

          </div>


          <div className="about-footer-column">

            <h3>Contact Us</h3>

            <p>
              +91 9160583726
            </p>

            <p>
              edigamahitha53@gmail.com
            </p>

            <p>
              Andhra Pradesh, India
            </p>

          </div>

        </div>


        <div className="about-footer-bottom">

          <p>
            © 2026 SAI CHARITHA AGENCIES.
            All Rights Reserved.
          </p>

        </div>

      </footer>

    </div>
  );
}

export default About;