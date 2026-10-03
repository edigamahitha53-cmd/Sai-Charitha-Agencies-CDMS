import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  FaLock,
  FaEye,
  FaEyeSlash,
  FaKey,
  FaArrowRight,
  FaCheckCircle
} from "react-icons/fa";

import "../assets/styles/resetPassword.css";


function ResetPassword() {

  const navigate =
    useNavigate();


  const [password, setPassword] =
    useState("");


  const [confirmPassword, setConfirmPassword] =
    useState("");


  const [showPassword, setShowPassword] =
    useState(false);


  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);


  const [message, setMessage] =
    useState("");


  const [error, setError] =
    useState("");


  /* =====================================================
     RESET PASSWORD
  ===================================================== */

  const handleResetPassword = async (
    e
  ) => {

    e.preventDefault();


    setError("");
    setMessage("");


    /* =====================================================
       CHECK OTP VERIFICATION
    ===================================================== */

    const otpVerified =
      localStorage.getItem(
        "otpVerified"
      );


    if (
      otpVerified !== "true"
    ) {

      setError(
        "Please verify the OTP first."
      );

      return;

    }


    /* =====================================================
       CHECK RESET EMAIL
    ===================================================== */

    const resetEmail =
      localStorage.getItem(
        "resetEmail"
      );


    if (!resetEmail) {

      setError(
        "Password reset session expired. Please try again."
      );

      return;

    }


    /* =====================================================
       CHECK EMPTY FIELDS
    ===================================================== */

    if (
      !password ||
      !confirmPassword
    ) {

      setError(
        "Please fill all fields."
      );

      return;

    }


    /* =====================================================
       PASSWORD LENGTH
    ===================================================== */

    if (
      password.length < 6
    ) {

      setError(
        "Password must contain at least 6 characters."
      );

      return;

    }


    /* =====================================================
       CHECK PASSWORD MATCH
    ===================================================== */

    if (
      password !==
      confirmPassword
    ) {

      setError(
        "Passwords do not match."
      );

      return;

    }


    /* =====================================================
       UPDATE PASSWORD IN DATABASE
    ===================================================== */

    try {

      const cleanEmail =
        resetEmail.trim().toLowerCase();


      const response =
        await fetch(
          `http://localhost:8080/api/shops/update-password?email=${encodeURIComponent(
            cleanEmail
          )}`,
          {
            method: "PUT",

            headers: {
              "Content-Type":
                "text/plain"
            },

            body:
              password
          }
        );


      /* =====================================================
         CHECK BACKEND RESPONSE
      ===================================================== */

      if (!response.ok) {

        const errorText =
          await response.text();


        console.error(
          "Password update failed:",
          errorText
        );


        if (
          response.status ===
          404
        ) {

          setError(
            "Registered email was not found."
          );

        } else {

          setError(
            "Unable to update password. Please try again."
          );

        }

        return;

      }


      /* =====================================================
         PASSWORD UPDATED SUCCESSFULLY
      ===================================================== */

      const successMessage =
        await response.text();


      console.log(
        "Backend:",
        successMessage
      );


      /* =====================================================
         REMOVE OTP RESET SESSION
      ===================================================== */

      localStorage.removeItem(
        "otpVerified"
      );

      localStorage.removeItem(
        "resetEmail"
      );

      localStorage.removeItem(
        "resetOtp"
      );

      localStorage.removeItem(
        "resetOtpExpiry"
      );


      /* =====================================================
         REMOVE OLD LOCAL LOGIN DATA
      ===================================================== */

      localStorage.removeItem(
        "shopUser"
      );

      localStorage.removeItem(
        "loggedInShop"
      );


      /* =====================================================
         SUCCESS MESSAGE
      ===================================================== */

      setMessage(
        "Password reset successfully!"
      );


      /* =====================================================
         GO TO LOGIN
      ===================================================== */

      setTimeout(() => {

        navigate(
          "/login"
        );

      }, 1800);

    } catch (error) {

      console.error(
        "Password reset error:",
        error
      );


      setError(
        "Unable to connect to the server. Please try again."
      );

    }

  };


  return (

    <div className="reset-page">


      {/* ================= BACKGROUND ================= */}

      <div className="reset-circle reset-circle-one"></div>

      <div className="reset-circle reset-circle-two"></div>


      <div className="reset-card">


        {/* ================= LEFT SIDE ================= */}

        <div className="reset-info">


          <div className="reset-info-icon">

            <FaKey />

          </div>


          <h1>
            Reset Password
          </h1>


          <p>

            Create a new password for

            <strong>
              {" "}SAI CHARITHA AGENCIES{" "}
            </strong>

            account.

          </p>


          <div className="reset-points">


            <div>

              <FaCheckCircle />

              <span>
                Use at least 6 characters
              </span>

            </div>


            <div>

              <FaCheckCircle />

              <span>
                Use a different password
              </span>

            </div>


            <div>

              <FaCheckCircle />

              <span>
                Keep your password secure
              </span>

            </div>


            <div>

              <FaCheckCircle />

              <span>
                Do not share your password
              </span>

            </div>


          </div>


        </div>


        {/* ================= RIGHT SIDE ================= */}

        <div className="reset-form-container">


          <div className="reset-heading">


            <div className="reset-lock-icon">

              <FaLock />

            </div>


            <h2>
              Create New Password
            </h2>


            <p>
              Enter your new password below.
            </p>


          </div>


          <form
            onSubmit={
              handleResetPassword
            }
          >


            {/* ================= NEW PASSWORD ================= */}

            <div className="reset-input-group">


              <label>
                New Password
              </label>


              <div className="reset-input-wrapper">


                <FaLock
                  className="reset-input-icon"
                />


                <input

                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }

                  placeholder="Enter new password"

                  value={
                    password
                  }

                  onChange={(e) =>
                    setPassword(
                      e.target.value
                    )
                  }

                />


                <button

                  type="button"

                  className="reset-eye-button"

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


            {/* ================= CONFIRM PASSWORD ================= */}

            <div className="reset-input-group">


              <label>
                Confirm Password
              </label>


              <div className="reset-input-wrapper">


                <FaLock
                  className="reset-input-icon"
                />


                <input

                  type={
                    showConfirmPassword
                      ? "text"
                      : "password"
                  }

                  placeholder="Confirm new password"

                  value={
                    confirmPassword
                  }

                  onChange={(e) =>
                    setConfirmPassword(
                      e.target.value
                    )
                  }

                />


                <button

                  type="button"

                  className="reset-eye-button"

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


            {/* ================= ERROR ================= */}

            {error && (

              <div className="reset-error">

                {error}

              </div>

            )}


            {/* ================= SUCCESS ================= */}

            {message && (

              <div className="reset-success">

                <FaCheckCircle />

                {message}

              </div>

            )}


            {/* ================= BUTTON ================= */}

            <button

              type="submit"

              className="reset-button"

            >

              Reset Password

              <FaArrowRight />

            </button>


          </form>


          {/* ================= LOGIN ================= */}

          <div className="reset-back-login">

            <span>
              Remember your password?
            </span>


            <Link to="/login">

              Login

            </Link>


          </div>


        </div>


      </div>


    </div>

  );

}


export default ResetPassword;