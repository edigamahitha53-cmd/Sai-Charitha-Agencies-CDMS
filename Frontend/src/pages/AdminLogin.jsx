import React, { useState } from "react";

import {
  FaUserShield,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaArrowRight,
  FaChartLine,
  FaBoxes,
  FaShoppingCart,
  FaStore,
  FaShieldAlt
} from "react-icons/fa";

import {
  useNavigate
} from "react-router-dom";

import "../assets/styles/adminlogin.css";


function AdminLogin() {

  const navigate = useNavigate();

  const [username, setUsername] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [showPassword, setShowPassword] =
    useState(false);

  const [error, setError] =
    useState("");

  const [loading, setLoading] =
    useState(false);


  const handleLogin = (e) => {

    e.preventDefault();

    setError("");

    if (!username || !password) {

      setError(
        "Please enter username and password."
      );

      return;

    }


    setLoading(true);


    /*
      TEMPORARY FRONTEND LOGIN

      Later we will replace this with
      Spring Boot API authentication.
    */

    setTimeout(() => {

      if (
        username === "admin" &&
        password === "admin123"
      ) {

        sessionStorage.setItem(
          "adminLoggedIn",
          "true"
        );

        navigate(
          "/admin-dashboard"
        );

      } else {

        setError(
          "Invalid admin username or password."
        );

      }

      setLoading(false);

    }, 900);

  };


  return (

    <div className="admin-login-page">


      {/* =================================
          BACKGROUND DECORATIONS
      ================================= */}

      <div className="admin-bg-circle circle-one"></div>

      <div className="admin-bg-circle circle-two"></div>

      <div className="admin-bg-circle circle-three"></div>



      {/* =================================
          MAIN CONTENT
      ================================= */}

      <div className="admin-login-container">


        {/* =================================
            LEFT SIDE
        ================================= */}

        <div className="admin-login-left">


          <div className="admin-brand-badge">

            <FaUserShield />

            <span>
              ADMIN PANEL
            </span>

          </div>


          <h1 className="admin-welcome-title">

            <span className="admin-typing-text">
              Welcome Back,
            </span>

            <br />

            <strong>
              Administrator
            </strong>

          </h1>


          <p className="admin-welcome-text">

            Manage your chocolate distribution
            business with complete control,
            powerful reports and real-time
            order management.

          </p>



          {/* =================================
              FEATURE CARDS
          ================================= */}

          <div className="admin-feature-grid">


            <div className="admin-feature-card">

              <div className="admin-feature-icon">

                <FaChartLine />

              </div>

              <div>

                <h3>
                  Business Reports
                </h3>

                <p>
                  Track your business performance
                </p>

              </div>

            </div>



            <div className="admin-feature-card">

              <div className="admin-feature-icon">

                <FaBoxes />

              </div>

              <div>

                <h3>
                  Stock Management
                </h3>

                <p>
                  Manage products and inventory
                </p>

              </div>

            </div>



            <div className="admin-feature-card">

              <div className="admin-feature-icon">

                <FaShoppingCart />

              </div>

              <div>

                <h3>
                  Order Management
                </h3>

                <p>
                  Monitor customer orders
                </p>

              </div>

            </div>



            <div className="admin-feature-card">

              <div className="admin-feature-icon">

                <FaStore />

              </div>

              <div>

                <h3>
                  Shop Management
                </h3>

                <p>
                  Manage registered shops
                </p>

              </div>

            </div>


          </div>

        </div>



        {/* =================================
            RIGHT LOGIN CARD
        ================================= */}

        <div className="admin-login-card">


          {/* TOP ICON */}

          <div className="admin-login-icon-wrapper">

            <div className="admin-login-icon">

              <FaShieldAlt />

            </div>

          </div>



          <div className="admin-card-heading">

            <span>
              SAI CHARITHA AGENCIES
            </span>

            <h2>
              Admin Login
            </h2>

            <p>
              Sign in to access your dashboard
            </p>

          </div>



          {/* ERROR */}

          {error && (

            <div className="admin-login-error">

              <FaLock />

              <span>
                {error}
              </span>

            </div>

          )}



          {/* FORM */}

          <form
            onSubmit={handleLogin}
            className="admin-login-form"
          >


            {/* USERNAME */}

            <div className="admin-input-group">

              <label>
                Admin Username
              </label>


              <div className="admin-input-wrapper">

                <FaUserShield
                  className="admin-input-icon"
                />


                <input
                  type="text"
                  placeholder="Enter admin username"
                  value={username}
                  onChange={(e) =>
                    setUsername(
                      e.target.value
                    )
                  }
                />

              </div>

            </div>



            {/* PASSWORD */}

            <div className="admin-input-group">

              <label>
                Password
              </label>


              <div className="admin-input-wrapper">

                <FaLock
                  className="admin-input-icon"
                />


                <input
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) =>
                    setPassword(
                      e.target.value
                    )
                  }
                />


                <button
                  type="button"
                  className="admin-password-toggle"
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



            {/* LOGIN BUTTON */}

            <button
              type="submit"
              className="admin-login-button"
              disabled={loading}
            >

              {loading ? (

                <span>
                  Signing In...
                </span>

              ) : (

                <>
                  <span>
                    Sign In to Dashboard
                  </span>

                  <FaArrowRight />
                </>

              )}

            </button>


          </form>



          {/* SECURITY */}

          <div className="admin-security-note">

            <FaShieldAlt />

            <span>
              Secure administrator access
            </span>

          </div>



          {/* BACK HOME */}

          <button
            className="admin-back-home"
            onClick={() =>
              navigate("/")
            }
          >

            ← Back to Customer Website

          </button>


        </div>

      </div>

    </div>

  );

}


export default AdminLogin;