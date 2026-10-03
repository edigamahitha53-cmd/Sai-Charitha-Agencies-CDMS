import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  FaUser,
  FaStore,
  FaEnvelope,
  FaPhone,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaArrowRight,
  FaShieldAlt
} from "react-icons/fa";

import "../assets/styles/register.css";


function ShopRegister() {

  const navigate = useNavigate();


  const [showPassword, setShowPassword] =
    useState(false);

  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);


  const [formData, setFormData] = useState({

    shopName: "",
    ownerName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: ""

  });


  /* =====================================================
     HANDLE INPUT CHANGE
  ===================================================== */

  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]:
        e.target.value

    });

  };


  /* =====================================================
     REGISTER SHOP
  ===================================================== */

  const handleSubmit = async (e) => {

    e.preventDefault();


    /* =================================================
       PASSWORD CHECK
    ================================================= */

    if (
      formData.password !==
      formData.confirmPassword
    ) {

      alert(
        "Passwords do not match"
      );

      return;

    }


    /* =================================================
       CREATE SHOP DATA
    ================================================= */

    const shopData = {

      shopName:
        formData.shopName,

      ownerName:
        formData.ownerName,

      email:
        formData.email,

      phone:
        formData.phone,

      password:
        formData.password

    };


    try {

      /* =================================================
         SAVE SHOP TO DATABASE
      ================================================= */

      const response =
        await fetch(
          "http://localhost:8080/api/shops/register",
          {

            method: "POST",

            headers: {

              "Content-Type":
                "application/json"

            },

            body:
              JSON.stringify(
                shopData
              )

          }
        );


      /* =================================================
         EMAIL OR PHONE ALREADY EXISTS
      ================================================= */

      if (
        response.status === 409
      ) {

        const message =
          await response.text();

        alert(message);

        return;

      }


      /* =================================================
         OTHER ERROR
      ================================================= */

      if (
        !response.ok
      ) {

        alert(
          "Registration failed"
        );

        return;

      }


      /* =================================================
         GET SAVED SHOP
      ================================================= */

      const savedShop =
        await response.json();


      /* =================================================
         SAVE CURRENT SHOP FOR FRONTEND SESSION
      ================================================= */

      localStorage.setItem(

        "shopUser",

        JSON.stringify(
          savedShop
        )

      );


      /* =================================================
         REMOVE OLD LOGIN SESSION
      ================================================= */

      localStorage.removeItem(
        "loggedInShop"
      );


      /* =================================================
         SAVE CUSTOMER INFORMATION
         FOR ADMIN CUSTOMERS PAGE
      ================================================= */

      try {

        const customerResponse =
          await fetch(
            "http://localhost:8080/api/shop-customers/register",
            {

              method: "POST",

              headers: {

                "Content-Type":
                  "application/json"

              },

              body:
                JSON.stringify(
                  shopData
                )

            }
          );


        /* =================================================
           CUSTOMER ALREADY EXISTS
        ================================================= */

        if (
          customerResponse.status === 409
        ) {

          console.log(
            "Customer already exists in shop_customer table."
          );

        }


        /* =================================================
           CUSTOMER SAVE ERROR
        ================================================= */

        else if (
          !customerResponse.ok
        ) {

          console.error(
            "Unable to save customer information."
          );

        }

      } catch (customerError) {

        console.error(
          "Customer save error:",
          customerError
        );

      }


      /* =================================================
         SUCCESS
      ================================================= */

      alert(
        "Account created successfully"
      );


      /* =================================================
         GO TO LOGIN
      ================================================= */

      navigate("/login");


    } catch (error) {

      console.error(
        "Registration Error:",
        error
      );


      alert(
        "Unable to connect to server. Please make sure Spring Boot is running."
      );

    }

  };


  return (

    <div className="register-page auth-page">


      <div className="register-circle register-circle-one"></div>

      <div className="register-circle register-circle-two"></div>


      <div className="register-wrapper">


        {/* LEFT SIDE */}

        <div className="register-intro">


          <div className="register-icon">

            <FaStore />

          </div>


          <p className="register-small-title">

            JOIN OUR NETWORK

          </p>


          <h1>

            SAI CHARITHA

            <span>
              AGENCIES
            </span>

          </h1>


          <div className="register-typing">

            Grow your shop with smarter distribution

          </div>


          <p>

            Create your shop account and get access to
            our chocolate products and simple ordering system.

          </p>


          <div className="register-security">

            <FaShieldAlt />

            <span>
              Safe • Simple • Reliable
            </span>

          </div>


        </div>


        {/* REGISTER CARD */}

        <div className="register-card">


          <div className="register-header">


            <div className="register-header-icon">

              <FaStore />

            </div>


            <h2>

              Create Account

            </h2>


            <p>

              Register your shop with us

            </p>


          </div>


          <form onSubmit={handleSubmit}>


            {/* SHOP NAME */}

            <div className="register-input-group">

              <label>
                Shop Name
              </label>


              <div className="register-input-box">

                <FaStore />


                <input

                  type="text"

                  name="shopName"

                  placeholder="Enter shop name"

                  value={
                    formData.shopName
                  }

                  onChange={
                    handleChange
                  }

                  required

                />

              </div>

            </div>


            {/* OWNER NAME */}

            <div className="register-input-group">

              <label>
                Owner Name
              </label>


              <div className="register-input-box">

                <FaUser />


                <input

                  type="text"

                  name="ownerName"

                  placeholder="Enter owner name"

                  value={
                    formData.ownerName
                  }

                  onChange={
                    handleChange
                  }

                  required

                />

              </div>

            </div>


            {/* EMAIL + PHONE */}

            <div className="register-two-column">


              <div className="register-input-group">

                <label>
                  Email
                </label>


                <div className="register-input-box">

                  <FaEnvelope />


                  <input

                    type="email"

                    name="email"

                    placeholder="Email"

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


              <div className="register-input-group">

                <label>
                  Phone
                </label>


                <div className="register-input-box">

                  <FaPhone
                    className="register-phone-icon"
                  />


                  <input

                    type="tel"

                    name="phone"

                    placeholder="Phone"

                    value={
                      formData.phone
                    }

                    onChange={
                      handleChange
                    }

                    required

                  />

                </div>

              </div>


            </div>


            {/* PASSWORD */}

            <div className="register-input-group">

              <label>
                Password
              </label>


              <div className="register-input-box">

                <FaLock />


                <input

                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }

                  name="password"

                  placeholder="Create password"

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

                  className="register-password-toggle"

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


            {/* CONFIRM PASSWORD */}

            <div className="register-input-group">

              <label>
                Confirm Password
              </label>


              <div className="register-input-box">

                <FaLock />


                <input

                  type={
                    showConfirmPassword
                      ? "text"
                      : "password"
                  }

                  name="confirmPassword"

                  placeholder="Confirm password"

                  value={
                    formData.confirmPassword
                  }

                  onChange={
                    handleChange
                  }

                  required

                />


                <button

                  type="button"

                  className="register-password-toggle"

                  onClick={() =>
                    setShowConfirmPassword(
                      !showConfirmPassword
                    )
                  }

                >

                  {showConfirmPassword ? (

                    <FaEyeSlash />

                  ) : (

                    <FaEye />

                  )}

                </button>


              </div>

            </div>


            {/* SUBMIT */}

            <button

              type="submit"

              className="register-submit"

            >

              Create Account

              <FaArrowRight />

            </button>


          </form>


          {/* LOGIN LINK */}

          <div className="register-login">

            <span>

              Already have an account?

            </span>


            <Link to="/login">

              Login

            </Link>

          </div>


          {/* BACK HOME */}

          <Link

            to="/"

            className="register-back-home"

          >

            ← Back to Home

          </Link>


        </div>

      </div>

    </div>

  );

}


export default ShopRegister;