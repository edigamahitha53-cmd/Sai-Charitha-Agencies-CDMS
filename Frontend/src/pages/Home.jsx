import React, {
  useEffect,
  useState
} from "react";

import {
  Link
} from "react-router-dom";

import {
  FaArrowRight,
  FaShoppingCart,
  FaBoxes,
  FaStore,
  FaTruck,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaHeart,
  FaChevronDown,
  FaHome,
  FaBoxOpen,
  FaInfoCircle,
  FaAddressBook,
  FaSignInAlt,
  FaUserPlus
} from "react-icons/fa";

import "../assets/styles/Home.css";


function Home() {

  const [
    loggedInShop,
    setLoggedInShop
  ] = useState(null);


  /* =====================================================
     PRODUCTS FROM DATABASE
  ===================================================== */

  const [
    products,
    setProducts
  ] = useState([]);


  /* =====================================================
     GET LOGIN USER + PRODUCTS
  ===================================================== */

  useEffect(() => {

    /* ================= SHOP LOGIN ================= */

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


    for (
      const key of shopKeys
    ) {

      const storedData =
        localStorage.getItem(key);


      if (storedData) {

        try {

          const parsedData =
            JSON.parse(storedData);


          if (parsedData) {

            shopData =
              parsedData;

            break;

          }

        } catch (error) {

          if (
            storedData.trim()
          ) {

            shopData = {
              name: storedData
            };

            break;

          }

        }

      }

    }


    setLoggedInShop(
      shopData
    );


    /* ================= PRODUCTS ================= */

    fetch(
      "http://localhost:8080/api/products"
    )
      .then(
        (response) => {

          if (!response.ok) {

            throw new Error(
              "Failed to fetch products"
            );

          }

          return response.json();

        }
      )
      .then(
        (data) => {

          setProducts(
            Array.isArray(data)
              ? data
              : []
          );

        }
      )
      .catch(
        (error) => {

          console.error(
            "Product fetch error:",
            error
          );

          setProducts([]);

        }
      );


  }, []);


  /* =====================================================
     SHOP NAME
  ===================================================== */

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


  /* =====================================================
     FIND PRODUCT ID BY BRAND NAME
  ===================================================== */

  const getProductIdByBrand = (
    brandName
  ) => {

    if (
      !products ||
      products.length === 0
    ) {

      return null;

    }


    const product =
      products.find(
        (item) => {

          const productName =
            (
              item.productName ||
              item.name ||
              ""
            )
              .toString()
              .trim()
              .toLowerCase();


          const itemBrand =
            (
              item.brandName ||
              item.brand ||
              ""
            )
              .toString()
              .trim()
              .toLowerCase();


          const searchBrand =
            brandName
              .toString()
              .trim()
              .toLowerCase();


          return (
            productName ===
              searchBrand
            ||
            itemBrand ===
              searchBrand
          );

        }
      );


    if (product) {

      return product.id;

    }


    return null;

  };


  /* =====================================================
     CREATE PRODUCT LINK
     
     IMPORTANT:
     AppRoutes.jsx has:
     
     /products/:id
     
     So we MUST use:
     
     /products/${productId}
  ===================================================== */

  const getProductLink = (
    brandName
  ) => {

    const productId =
      getProductIdByBrand(
        brandName
      );


    if (productId) {

      return `/products/${productId}`;

    }


    return "/products";

  };


  return (

    <div className="home-container">


      {/* =================================================
          NAVBAR
      ================================================= */}

      <nav className="home-navbar">


        <div className="home-logo">

          <div>

            <h2>
              SAI CHARITHA AGENCIES
            </h2>

            <span>
              Chocolate Distribution Management System
            </span>

          </div>

        </div>


        <div className="home-nav-links">


          <Link
            to="/"
            className="home-nav-link active"
          >

            <FaHome />

            <span>
              Home
            </span>

          </Link>


          <Link
            to="/products"
            className="home-nav-link"
          >

            <FaBoxOpen />

            <span>
              Products
            </span>

          </Link>


          <Link
            to="/about"
            className="home-nav-link"
          >

            <FaInfoCircle />

            <span>
              About
            </span>

          </Link>


          <Link
            to="/contact"
            className="home-nav-link"
          >

            <FaAddressBook />

            <span>
              Contact
            </span>

          </Link>


        </div>


        <div className="home-auth">


          {loggedInShop ? (

            <Link
              to="/shop-dashboard"
              className="home-login"
            >

              <span>
                {getShopName()}
              </span>

            </Link>

          ) : (

            <>

              <Link
                to="/login"
                className="home-login"
              >

                <FaSignInAlt />

                <span>
                  Login
                </span>

              </Link>


              <Link
                to="/register"
                className="home-register"
              >

                <FaUserPlus />

                <span>
                  Register
                </span>

              </Link>

            </>

          )}


        </div>


      </nav>


      {/* =================================================
          HERO
      ================================================= */}

      <section className="home-hero">


        <div className="hero-overlay"></div>


        <div className="hero-content">


          <div className="hero-small-title">

            <span></span>

            WELCOME TO OUR CHOCOLATE WORLD

            <span></span>

          </div>


          <h1>

            SAI CHARITHA

            <br />

            <span>
              AGENCIES
            </span>

          </h1>


          <div className="typing-container">

            <p className="typing-text">

              Your Trusted Chocolate Distribution Partner

            </p>

          </div>


          <p className="hero-description">

            Manage chocolates, products, orders and shop owners
            easily with our simple and powerful distribution
            management system.

          </p>


          <div className="hero-buttons">


            <Link
              to="/products"
              className="hero-primary-btn"
            >

              Explore Chocolates

              <FaArrowRight />

            </Link>


            <Link
              to="/products"
              className="hero-secondary-btn"
            >

              <FaShoppingCart />

              View Products

            </Link>


          </div>


          <div className="hero-scroll">

            <FaChevronDown />

            <span>
              Discover More
            </span>

          </div>


        </div>


      </section>


      {/* =================================================
          FEATURES
      ================================================= */}

      <section className="features-section">


        <div className="section-title">

          <span className="title-line"></span>

          <h2>
            Why Choose Us?
          </h2>

          <span className="title-line"></span>

        </div>


        <p className="section-subtitle">

          Everything you need to manage your chocolate distribution

        </p>


        <div className="features-container">


          {/* FEATURE 1 */}

          <div className="feature-card">


            <div className="feature-icon">

              <FaBoxes />

            </div>


            <h3>
              Easy Stock Management
            </h3>


            <p>

              Manage your chocolate stock and product quantities
              easily and efficiently.

            </p>


          </div>


          {/* FEATURE 2 */}

          <div className="feature-card">


            <div className="feature-icon">

              <FaShoppingCart />

            </div>


            <h3>
              Simple Ordering
            </h3>


            <p>

              Shop owners can easily browse products and place
              their orders.

            </p>


          </div>


          {/* FEATURE 3 */}

          <div className="feature-card">


            <div className="feature-icon">

              <FaStore />

            </div>


            <h3>
              Shop Management
            </h3>


            <p>

              Manage shop owners and their orders from one
              convenient system.

            </p>


          </div>


          {/* FEATURE 4 */}

          <div className="feature-card">


            <div className="feature-icon">

              <FaTruck />

            </div>


            <h3>
              Better Distribution
            </h3>


            <p>

              Make your daily chocolate distribution process
              faster and more organized.

            </p>


          </div>


        </div>


      </section>


      {/* =================================================
          BRANDS
      ================================================= */}

      <section className="brands-section">


        <div className="section-title">

          <span className="title-line"></span>

          <h2>
            Our Chocolate Brands
          </h2>

          <span className="title-line"></span>

        </div>


        <p className="section-subtitle">

          Explore our delicious range of chocolate products

        </p>


        <div className="brands-container">


          {/* =================================================
              GALAXY
          ================================================= */}

          <div className="brand-card">


            <div className="brand-image">


              <img
                src="/images/galaxy.png"
                alt="Galaxy"
              />


              <div className="brand-overlay">


                <Link
                  to={getProductLink("Galaxy")}
                >

                  View Products

                  <FaArrowRight />

                </Link>


              </div>


            </div>


            <div className="brand-content">


              <span className="brand-number">

                01

              </span>


              <h3>
                Galaxy
              </h3>


              <p>

                Smooth and delicious chocolate

              </p>


              <Link
                to={getProductLink("Galaxy")}
                className="brand-view"
              >

                Explore

                <FaArrowRight />

              </Link>


            </div>


          </div>


          {/* =================================================
              SNICKERS
          ================================================= */}

          <div className="brand-card">


            <div className="brand-image">


              <img
                src="/images/snickers.png"
                alt="Snickers"
              />


              <div className="brand-overlay">


                <Link
                  to={getProductLink("Snickers")}
                >

                  View Products

                  <FaArrowRight />

                </Link>


              </div>


            </div>


            <div className="brand-content">


              <span className="brand-number">

                02

              </span>


              <h3>
                Snickers
              </h3>


              <p>

                Chocolate with peanuts and caramel

              </p>


              <Link
                to={getProductLink("Snickers")}
                className="brand-view"
              >

                Explore

                <FaArrowRight />

              </Link>


            </div>


          </div>


          {/* =================================================
              BOOMER
          ================================================= */}

          <div className="brand-card">


            <div className="brand-image">


              <img
                src="/images/boomer.png"
                alt="Boomer"
              />


              <div className="brand-overlay">


                <Link
                  to={getProductLink("Boomer")}
                >

                  View Products

                  <FaArrowRight />

                </Link>


              </div>


            </div>


            <div className="brand-content">


              <span className="brand-number">

                03

              </span>


              <h3>
                Boomer
              </h3>


              <p>

                Chewy bubble gum in different flavours

              </p>


              <Link
                to={getProductLink("Boomer")}
                className="brand-view"
              >

                Explore

                <FaArrowRight />

              </Link>


            </div>


          </div>


          {/* =================================================
              ORBIT
          ================================================= */}

          <div className="brand-card">


            <div className="brand-image">


              <img
                src="/images/orbit.png"
                alt="Orbit"
              />


              <div className="brand-overlay">


                <Link
                  to={getProductLink("Orbit")}
                >

                  View Products

                  <FaArrowRight />

                </Link>


              </div>


            </div>


            <div className="brand-content">


              <span className="brand-number">

                04

              </span>


              <h3>
                Orbit
              </h3>


              <p>

                Refreshing chewing gum

              </p>


              <Link
                to={getProductLink("Orbit")}
                className="brand-view"
              >

                Explore

                <FaArrowRight />

              </Link>


            </div>


          </div>


          {/* =================================================
              CENTER FRESH
          ================================================= */}

          <div className="brand-card">


            <div className="brand-image">


              <img
                src="/images/centerfresh.jpg"
                alt="Center Fresh"
              />


              <div className="brand-overlay">


                <Link
                  to={getProductLink("Center Fresh")}
                >

                  View Products

                  <FaArrowRight />

                </Link>


              </div>


            </div>


            <div className="brand-content">


              <span className="brand-number">

                05

              </span>


              <h3>
                Center Fresh
              </h3>


              <p>

                Fresh and long-lasting chewing gum

              </p>


              <Link
                to={getProductLink("Center Fresh")}
                className="brand-view"
              >

                Explore

                <FaArrowRight />

              </Link>


            </div>


          </div>


        </div>


      </section>


      {/* =================================================
          CTA
      ================================================= */}

      <section className="home-cta">


        <div className="cta-content">


          <h2>

            Ready to Explore Our Chocolates?

          </h2>


          <p>

            Discover our products and find your favourite
            chocolate today.

          </p>


          <Link
            to="/products"
            className="cta-button"
          >

            Explore Products

            <FaArrowRight />

          </Link>


        </div>


      </section>


      {/* =================================================
          FOOTER
      ================================================= */}

      <footer className="home-footer">


        <div className="footer-container">


          {/* ================= FOOTER ABOUT ================= */}

          <div className="footer-about">


            <h2>

              SAI CHARITHA AGENCIES

            </h2>


            <p>

              Chocolate Distribution Management System.

            </p>


            <p>

              Making chocolate distribution simple,
              organized and efficient.

            </p>


            <div className="footer-heart">

              Made with <FaHeart /> for chocolates

            </div>


          </div>


          {/* ================= QUICK LINKS ================= */}

          <div className="footer-column">


            <h3>
              Quick Links
            </h3>


            <Link to="/">
              Home
            </Link>


            <Link to="/products">
              Products
            </Link>


            <Link to="/about">
              About
            </Link>


            <Link to="/contact">
              Contact
            </Link>


          </div>


          {/* ================= OUR PRODUCTS ================= */}

          <div className="footer-column">


            <h3>
              Our Products
            </h3>


            <Link
              to={getProductLink("Galaxy")}
            >
              Galaxy
            </Link>


            <Link
              to={getProductLink("Snickers")}
            >
              Snickers
            </Link>


            <Link
              to={getProductLink("Boomer")}
            >
              Boomer
            </Link>


            <Link
              to={getProductLink("Orbit")}
            >
              Orbit
            </Link>


            <Link
              to={getProductLink("Center Fresh")}
            >
              Center Fresh
            </Link>


          </div>


          {/* ================= CONTACT ================= */}

          <div className="footer-column">


            <h3>
              Contact Us
            </h3>


            <p>

              <FaPhoneAlt />

              +91 9160583726

            </p>


            <p>

              <FaEnvelope />

              saicharitha@example.com

            </p>


            <p>

              <FaMapMarkerAlt />

              Andhra Pradesh, India

            </p>


          </div>


        </div>


        <div className="footer-bottom">


          <p>

            © 2026 SAI CHARITHA AGENCIES.
            All Rights Reserved.

          </p>


        </div>


      </footer>


    </div>

  );

}


export default Home;