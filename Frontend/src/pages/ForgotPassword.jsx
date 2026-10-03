import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  FaEnvelope,
  FaLock,
  FaArrowRight,
  FaShieldAlt
} from "react-icons/fa";

import emailjs from "@emailjs/browser";

import "../assets/styles/forgotPassword.css";


function ForgotPassword() {

  const navigate =
    useNavigate();


  const [email, setEmail] =
    useState("");


  /* =====================================================
     EMAILJS DETAILS
  ===================================================== */

  const EMAILJS_SERVICE_ID =
    "service_3040qkd";

  const EMAILJS_TEMPLATE_ID =
    "template_5f41o8s";

  const EMAILJS_PUBLIC_KEY =
    "qhs3cf-2fo-btmD0H";


  /* =====================================================
     GENERATE 6 DIGIT OTP
  ===================================================== */

  const generateOtp = () => {

    const array =
      new Uint32Array(1);

    window.crypto.getRandomValues(
      array
    );

    return String(
      array[0] % 1000000
    ).padStart(6, "0");

  };


  /* =====================================================
     SEND OTP
  ===================================================== */

  const handleSubmit = async (e) => {

    e.preventDefault();


    /* =====================================================
       CLEAN EMAIL
    ===================================================== */

    const cleanEmail =
      email.trim().toLowerCase();


    /* =====================================================
       CHECK EMAIL
    ===================================================== */

    if (!cleanEmail) {

      alert(
        "Please enter your registered email."
      );

      return;

    }


    /* =====================================================
       CHECK REGISTERED ACCOUNT FROM DATABASE
    ===================================================== */

    try {

      const response =
        await fetch(
          `https://sai-charitha-agencies-cdms.onrender.com/api/shops/check-email?email=${encodeURIComponent(
            cleanEmail
          )}`
        );


      /* =====================================================
         EMAIL NOT FOUND
      ===================================================== */

      if (!response.ok) {

        alert(
          "This email is not registered."
        );

        return;

      }


      /* =====================================================
         EMAIL FOUND
      ===================================================== */

      let emailExists =
        true;


      try {

        const responseText =
          await response.text();


        if (responseText) {

          try {

            const result =
              JSON.parse(
                responseText
              );


            if (
              result === false ||
              result === "false"
            ) {

              emailExists =
                false;

            }

            else if (
              result &&
              typeof result === "object"
            ) {

              if (
                result.exists === false ||
                result.emailExists === false
              ) {

                emailExists =
                  false;

              }

            }

          } catch {

            if (
              responseText
                .trim()
                .toLowerCase() ===
              "false"
            ) {

              emailExists =
                false;

            }

          }

        }

      } catch {

        emailExists =
          true;

      }


      if (!emailExists) {

        alert(
          "This email is not registered."
        );

        return;

      }


      /* =====================================================
         GENERATE OTP
      ===================================================== */

      const generatedOtp =
        generateOtp();


      /* =====================================================
         OTP EXPIRY - 15 MINUTES
      ===================================================== */

      const otpExpiry =
        Date.now() +
        15 * 60 * 1000;


      /* =====================================================
         SAVE OTP INFORMATION
      ===================================================== */

      localStorage.setItem(
        "resetEmail",
        cleanEmail
      );


      localStorage.setItem(
        "resetOtp",
        generatedOtp
      );


      localStorage.setItem(
        "resetOtpExpiry",
        otpExpiry.toString()
      );


      localStorage.removeItem(
        "otpVerified"
      );


      /* =====================================================
         SEND OTP TO EMAIL
      ===================================================== */

      try {

        const emailData = {
          email:
            cleanEmail,

          passcode:
            generatedOtp,

          time:
            "15 minutes"
        };


        console.log(
          "Sending OTP through EmailJS:",
          emailData
        );


        const emailResponse =
          await emailjs.send(
            EMAILJS_SERVICE_ID,
            EMAILJS_TEMPLATE_ID,
            emailData,
            EMAILJS_PUBLIC_KEY
          );


        console.log(
          "EmailJS response:",
          emailResponse
        );


        /* =====================================================
           OTP SENT SUCCESSFULLY
        ===================================================== */

        alert(
          "OTP has been sent to your registered email."
        );


        /* =====================================================
           GO TO OTP PAGE
        ===================================================== */

        navigate(
          "/otp-verification"
        );


      } catch (error) {

        console.error(
          "Unable to send OTP:",
          error
        );


        console.error(
          "EmailJS Status:",
          error?.status
        );


        console.error(
          "EmailJS Text:",
          error?.text
        );


        console.error(
          "EmailJS Full Error:",
          JSON.stringify(
            error
          )
        );


        /* =====================================================
           REMOVE OTP IF EMAIL FAILED
        ===================================================== */

        localStorage.removeItem(
          "resetOtp"
        );

        localStorage.removeItem(
          "resetOtpExpiry"
        );

        localStorage.removeItem(
          "resetEmail"
        );


        alert(
          `Unable to send OTP. ${
            error?.text ||
            "Please check EmailJS configuration."
          }`
        );

      }


    } catch (error) {

      console.error(
        "Database email check failed:",
        error
      );


      alert(
        "Unable to connect to the server. Please make sure the backend is running."
      );

    }

  };


  return (

    <div className="forgot-page auth-page">


      <div className="forgot-circle forgot-circle-one"></div>

      <div className="forgot-circle forgot-circle-two"></div>


      <div className="forgot-wrapper">


        {/* LEFT */}

        <div className="forgot-intro">


          <div className="forgot-icon">

            <FaLock />

          </div>


          <p className="forgot-small-title">

            ACCOUNT RECOVERY

          </p>


          <h1>

            RESET YOUR

            <span>PASSWORD</span>

          </h1>


          <div className="forgot-typing">

            Don't worry, we'll help you get back in

          </div>


          <p>

            Enter your registered email address and we'll
            help you recover access to your shop account.

          </p>


          <div className="forgot-security">

            <FaShieldAlt />

            <span>

              Your account security matters to us.

            </span>

          </div>


        </div>


        {/* CARD */}

        <div className="forgot-card">


          <div className="forgot-header">


            <div className="forgot-header-icon">

              <FaEnvelope />

            </div>


            <h2>

              Forgot Password?

            </h2>


            <p>

              Enter your email to reset your password

            </p>


          </div>


          <form onSubmit={handleSubmit}>


            <div className="forgot-input-group">


              <label>

                Email Address

              </label>


              <div className="forgot-input-box">


                <FaEnvelope />


                <input
                  type="email"
                  placeholder="Enter your registered email"
                  value={email}
                  onChange={(e) =>
                    setEmail(
                      e.target.value
                    )
                  }
                  required
                />


              </div>


            </div>


            <button
              type="submit"
              className="forgot-submit"
            >

              Send Reset OTP

              <FaArrowRight />

            </button>


          </form>


          <div className="forgot-links">

            <span>

              Remember your password?

            </span>


            <Link to="/login">

              Login

            </Link>

          </div>


          <div className="forgot-register">

            <span>

              Don't have an account?

            </span>


            <Link to="/register">

              Register

            </Link>

          </div>


          <Link
            to="/"
            className="forgot-back-home"
          >

            ← Back to Home

          </Link>


        </div>


      </div>


    </div>

  );

}


export default ForgotPassword;
