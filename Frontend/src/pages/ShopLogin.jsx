import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  FaUser,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaArrowRight,
  FaStore,
  FaShieldAlt
} from "react-icons/fa";

import "../assets/styles/login.css";


function ShopLogin() {

  const navigate =
    useNavigate();


  const [showPassword, setShowPassword] =
    useState(false);


  const [formData, setFormData] =
    useState({
      email: "",
      password: ""
    });


  const [errorMessage, setErrorMessage] =
    useState("");


  /* =====================================================
     HANDLE INPUT
  ===================================================== */

  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]:
        e.target.value

    });

    setErrorMessage("");

  };


  /* =====================================================
     LOGIN
  ===================================================== */

  const handleSubmit = async (e) => {

    e.preventDefault();

    setErrorMessage("");


    /* =====================================================
       SEND LOGIN DATA TO SPRING BOOT
    ===================================================== */

    try {

      const response =
        await fetch(
          "https://sai-charitha-agencies-cdms.onrender.com/api/shops/login",
          {

            method: "POST",

            headers: {

              "Content-Type":
                "application/json"

            },

            body: JSON.stringify({

              email:
                formData.email,

              password:
                formData.password

            })

          }
        );


      /* =====================================================
         LOGIN FAILED
      ===================================================== */

      if (!response.ok) {

        const message =
          await response.text();


        setErrorMessage(
          message ||
          "Invalid email or password."
        );

        return;

      }


      /* =====================================================
         LOGIN SUCCESS
      ===================================================== */

      const savedShop =
        await response.json();


      console.log(
        "Login Successful:",
        savedShop
      );


      /* =====================================================
         STORE LOGGED-IN SHOP
      ===================================================== */

      localStorage.setItem(

        "loggedInShop",

        JSON.stringify(
          savedShop
        )

      );


      /* =====================================================
         NOTIFY NAVBAR ABOUT LOGIN
      ===================================================== */

      window.dispatchEvent(
        new Event("shopLoginStatusChanged")
      );


      /* =====================================================
         KEEP LAST SHOP FOR
         BACKWARD COMPATIBILITY
      ===================================================== */

      localStorage.setItem(

        "shopUser",

        JSON.stringify(
          savedShop
        )

      );


      /* =====================================================
         GO TO SHOP DASHBOARD
      ===================================================== */

      navigate(
        "/shop-dashboard"
      );


    } catch (error) {

      console.error(
        "Login Error:",
        error
      );


      setErrorMessage(

        "Unable to connect to server. " +
        "Please make sure the Spring Boot backend is running."

      );

    }

  };


  return (

    <div className="auth-page login-page">


      <div className="auth-circle auth-circle-one"></div>

      <div className="auth-circle auth-circle-two"></div>

      <div className="auth-circle auth-circle-three"></div>


      <div className="auth-wrapper">


        {/* ================= LEFT SIDE ================= */}

        <div className="auth-intro">


          <div className="auth-brand-icon">

            <FaStore />

          </div>


          <p className="auth-small-title">

            WELCOME BACK

          </p>


          <h1>

            SAI CHARITHA

            <span>

              AGENCIES

            </span>

          </h1>


          <div className="auth-typing">

            Your Trusted Chocolate Distribution Partner

          </div>


          <p className="auth-description">

            Manage your shop orders,
            explore delicious products
            and stay connected with
            SAI CHARITHA AGENCIES.

          </p>


          <div className="auth-feature">

            <FaShieldAlt />

            <span>

              Simple • Secure • Reliable

            </span>

          </div>


        </div>


        {/* ================= LOGIN CARD ================= */}

        <div className="auth-card">


          <div className="auth-card-header">


            <div className="auth-card-icon">

              <FaUser />

            </div>


            <h2>

              Welcome Back!

            </h2>


            <p>

              Login to your shop account

            </p>


          </div>


          <form
            onSubmit={handleSubmit}
          >


            {/* ================= EMAIL ================= */}

            <div className="input-group">

              <label>
                Email Address
              </label>


              <div className="input-box">

                <FaUser />


                <input

                  type="email"

                  name="email"

                  placeholder="Enter your email"

                  value={
                    formData.email
                  }

                  onChange={
                    handleChange
                  }

                  required

                />

              </div>

            </div>


            {/* ================= PASSWORD ================= */}

            <div className="input-group">

              <label>
                Password
              </label>


              <div className="input-box">

                <FaLock />


                <input

                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }

                  name="password"

                  placeholder="Enter your password"

                  value={
                    formData.password
                  }

                  onChange={
                    handleChange
                  }

                  required

                />


                <button

                  type="button"

                  className="password-toggle"

                  onClick={() =>
                    setShowPassword(
                      !showPassword
                    )
                  }

                >

                  {showPassword ? (

                    <FaEyeSlash />

                  ) : (

                    <FaEye />

                  )}

                </button>


              </div>

            </div>


            {/* ================= ERROR ================= */}

            {errorMessage && (

              <div className="login-error-message">

                {errorMessage}

              </div>

            )}


            {/* ================= FORGOT PASSWORD ================= */}

            <div className="auth-options">

              <Link
                to="/forgot-password"
              >

                Forgot Password?

              </Link>

            </div>


            {/* ================= LOGIN BUTTON ================= */}

            <button

              type="submit"

              className="auth-submit-btn"

            >

              Login

              <FaArrowRight />

            </button>


          </form>


          {/* ================= REGISTER ================= */}

          <div className="auth-bottom">

            <span>
              Don't have an account?
            </span>


            <Link
              to="/register"
            >

              Create Account

            </Link>

          </div>


          {/* ================= HOME ================= */}

          <Link

            to="/"

            className="back-home"

          >

            ← Back to Home

          </Link>


        </div>

      </div>

    </div>

  );

}


export default ShopLogin;
