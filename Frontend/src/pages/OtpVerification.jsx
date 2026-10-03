import React, {
  useEffect,
  useState
} from "react";

import {
  Link,
  useNavigate
} from "react-router-dom";

import {
  FaShieldAlt,
  FaLock,
  FaArrowRight,
  FaRedo,
  FaCheckCircle,
  FaHome
} from "react-icons/fa";

import emailjs from "@emailjs/browser";

import "../assets/styles/otpVerification.css";


function OtpVerification() {

  const navigate =
    useNavigate();


  const [otp, setOtp] =
    useState([
      "",
      "",
      "",
      "",
      "",
      ""
    ]);


  const [message, setMessage] =
    useState("");


  const [timeLeft, setTimeLeft] =
    useState(0);


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
     START 15 MINUTE TIMER
  ===================================================== */

  useEffect(() => {

    const expiry =
      Number(
        localStorage.getItem(
          "resetOtpExpiry"
        )
      );


    if (!expiry) {

      setTimeLeft(0);

      return;

    }


    const updateTimer = () => {

      const remaining =
        Math.max(
          0,
          expiry - Date.now()
        );


      setTimeLeft(
        remaining
      );


      if (
        remaining <= 0
      ) {

        localStorage.removeItem(
          "resetOtp"
        );

        localStorage.removeItem(
          "resetOtpExpiry"
        );

      }

    };


    updateTimer();


    const timer =
      setInterval(
        updateTimer,
        1000
      );


    return () =>
      clearInterval(
        timer
      );

  }, []);


  /* =====================================================
     FORMAT TIMER
  ===================================================== */

  const formatTime = () => {

    const minutes =
      Math.floor(
        timeLeft / 60000
      );


    const seconds =
      Math.floor(
        (timeLeft % 60000) / 1000
      );


    return `${minutes}:${String(
      seconds
    ).padStart(2, "0")}`;

  };


  /* =====================================================
     OTP INPUT CHANGE
  ===================================================== */

  const handleChange = (
    value,
    index
  ) => {

    if (
      !/^[0-9]?$/.test(
        value
      )
    ) {

      return;

    }


    const newOtp =
      [...otp];


    newOtp[index] =
      value;


    setOtp(
      newOtp
    );


    /* =====================================================
       MOVE TO NEXT INPUT
    ===================================================== */

    if (
      value &&
      index < 5
    ) {

      document
        .getElementById(
          `otp-${index + 1}`
        )
        .focus();

    }

  };


  /* =====================================================
     BACKSPACE
  ===================================================== */

  const handleKeyDown = (
    e,
    index
  ) => {

    if (
      e.key === "Backspace" &&
      !otp[index] &&
      index > 0
    ) {

      document
        .getElementById(
          `otp-${index - 1}`
        )
        .focus();

    }

  };


  /* =====================================================
     VERIFY OTP
  ===================================================== */

  const handleVerify = (
    e
  ) => {

    e.preventDefault();


    const enteredOtp =
      otp.join("");


    /* =====================================================
       CHECK 6 DIGITS
    ===================================================== */

    if (
      enteredOtp.length !== 6
    ) {

      setMessage(
        "Please enter the complete 6-digit OTP."
      );

      return;

    }


    /* =====================================================
       GET SAVED OTP
    ===================================================== */

    const savedOtp =
      localStorage.getItem(
        "resetOtp"
      );


    const expiry =
      Number(
        localStorage.getItem(
          "resetOtpExpiry"
        )
      );


    /* =====================================================
       CHECK OTP EXISTS
    ===================================================== */

    if (
      !savedOtp ||
      !expiry
    ) {

      setMessage(
        "OTP has expired. Please request a new OTP."
      );

      return;

    }


    /* =====================================================
       CHECK OTP EXPIRY
    ===================================================== */

    if (
      Date.now() >
      expiry
    ) {

      localStorage.removeItem(
        "resetOtp"
      );

      localStorage.removeItem(
        "resetOtpExpiry"
      );


      setTimeLeft(0);


      setMessage(
        "OTP has expired. Please request a new OTP."
      );

      return;

    }


    /* =====================================================
       CHECK OTP
    ===================================================== */

    if (
      enteredOtp !==
      savedOtp
    ) {

      setMessage(
        "Invalid OTP. Please enter the correct OTP."
      );

      return;

    }


    /* =====================================================
       OTP VERIFIED
    ===================================================== */

    setMessage(
      "OTP verified successfully!"
    );


    localStorage.setItem(
      "otpVerified",
      "true"
    );


    /* =====================================================
       REMOVE USED OTP
    ===================================================== */

    localStorage.removeItem(
      "resetOtp"
    );

    localStorage.removeItem(
      "resetOtpExpiry"
    );


    /* =====================================================
       GO TO RESET PASSWORD
    ===================================================== */

    setTimeout(() => {

      navigate(
        "/reset-password"
      );

    }, 1200);

  };


  /* =====================================================
     RESEND OTP
  ===================================================== */

  const handleResend = async () => {

    const resetEmail =
      localStorage.getItem(
        "resetEmail"
      );


    if (!resetEmail) {

      setMessage(
        "Please start password recovery again."
      );

      return;

    }


    /* =====================================================
       CLEAN EMAIL
    ===================================================== */

    const cleanEmail =
      resetEmail.trim();


    if (!cleanEmail) {

      setMessage(
        "Registered email address is missing."
      );

      return;

    }


    /* =====================================================
       GENERATE NEW OTP
    ===================================================== */

    let newOtp;


    if (
      window.crypto &&
      window.crypto.getRandomValues
    ) {

      const randomArray =
        new Uint32Array(1);


      window.crypto.getRandomValues(
        randomArray
      );


      newOtp =
        (
          100000 +
          (
            randomArray[0] %
            900000
          )
        ).toString();

    } else {

      newOtp =
        Math.floor(
          100000 +
          Math.random() *
          900000
        ).toString();

    }


    /* =====================================================
       NEW 15 MINUTE EXPIRY
    ===================================================== */

    const newExpiry =
      Date.now() +
      15 * 60 * 1000;


    /* =====================================================
       SHOW SENDING MESSAGE
    ===================================================== */

    setOtp([
      "",
      "",
      "",
      "",
      "",
      ""
    ]);


    setTimeLeft(0);


    setMessage(
      "Sending new OTP..."
    );


    /* =====================================================
       SEND NEW OTP THROUGH EMAILJS
    ===================================================== */

    try {

      const response =
        await emailjs.send(
          EMAILJS_SERVICE_ID,
          EMAILJS_TEMPLATE_ID,
          {
            email:
              cleanEmail,

            passcode:
              newOtp,

            time:
              "15 minutes"
          },
          EMAILJS_PUBLIC_KEY
        );


      console.log(
        "EmailJS resend response:",
        response
      );


      /* =====================================================
         SAVE OTP ONLY AFTER EMAILJS SUCCESS
      ===================================================== */

      localStorage.setItem(
        "resetOtp",
        newOtp
      );


      localStorage.setItem(
        "resetOtpExpiry",
        newExpiry.toString()
      );


      setTimeLeft(
        15 * 60 * 1000
      );


      setMessage(
        "A new OTP has been sent to your registered email."
      );


    } catch (error) {

      console.error(
        "Unable to resend OTP:",
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


      /* =====================================================
         REMOVE OTP IF EMAIL WAS NOT SENT
      ===================================================== */

      localStorage.removeItem(
        "resetOtp"
      );

      localStorage.removeItem(
        "resetOtpExpiry"
      );


      setTimeLeft(0);


      setMessage(
        `Unable to send OTP. ${
          error?.text ||
          "Please try again."
        }`
      );

    }

  };


  return (

    <div className="otp-page">


      {/* Background decorative elements */}

      <div className="otp-circle otp-circle-one"></div>

      <div className="otp-circle otp-circle-two"></div>


      {/* Home Button */}

      <Link
        to="/"
        className="otp-home-button"
      >

        <FaHome />

        <span>

          Home

        </span>

      </Link>


      <div className="otp-wrapper">


        {/* LEFT SIDE */}

        <div className="otp-info">


          <div className="otp-brand-icon">

            <FaShieldAlt />

          </div>


          <p className="otp-small-title">

            SECURE VERIFICATION

          </p>


          <h1>

            Verify Your

            <br />

            <span>

              Account

            </span>

          </h1>


          <p className="otp-description">

            Protecting your account is our priority. Enter the
            verification code sent to your registered email
            address to continue.

          </p>


          <div className="otp-info-card">


            <div className="otp-info-icon">

              <FaLock />

            </div>


            <div>

              <h3>

                Secure & Protected

              </h3>


              <p>

                Your verification code keeps your account
                safe and secure.

              </p>

            </div>


          </div>


        </div>


        {/* RIGHT SIDE */}

        <div className="otp-card">


          <div className="otp-card-icon">

            <FaShieldAlt />

          </div>


          <h2>

            OTP Verification

          </h2>


          <p className="otp-card-subtitle">

            Enter the 6-digit verification code

          </p>


          <p className="otp-message-text">

            We have sent a verification code to your
            registered email address.

          </p>


          <form onSubmit={handleVerify}>


            <div className="otp-input-container">


              {otp.map(
                (
                  digit,
                  index
                ) => (

                  <input
                    key={index}
                    id={`otp-${index}`}
                    type="text"
                    maxLength="1"
                    value={digit}
                    onChange={(e) =>
                      handleChange(
                        e.target.value,
                        index
                      )
                    }
                    onKeyDown={(e) =>
                      handleKeyDown(
                        e,
                        index
                      )
                    }
                    className="otp-input"
                  />

                )
              )}


            </div>


            {timeLeft > 0 && (

              <p
                style={{
                  textAlign: "center",
                  marginTop: "10px"
                }}
              >

                OTP expires in{" "}

                <strong>

                  {formatTime()}

                </strong>

              </p>

            )}


            {timeLeft === 0 && (

              <p
                style={{
                  textAlign: "center",
                  marginTop: "10px"
                }}
              >

                OTP expired. Please resend OTP.

              </p>

            )}


            <button
              type="submit"
              className="otp-verify-button"
            >

              Verify OTP

              <FaArrowRight />

            </button>


          </form>


          {message && (

            <div
              className={
                message.includes(
                  "successfully"
                )
                  ? "otp-message success"
                  : "otp-message"
              }
            >

              {message.includes(
                "successfully"
              ) && (

                <FaCheckCircle />

              )}


              <span>

                {message}

              </span>


            </div>

          )}


          <div className="otp-resend">


            <span>

              Didn't receive the code?

            </span>


            <button
              type="button"
              onClick={handleResend}
              className="resend-button"
            >

              <FaRedo />

              Resend OTP

            </button>


          </div>


          <div className="otp-login-link">


            <span>

              Remember your password?

            </span>


            <Link to="/login">

              Login

            </Link>


          </div>


        </div>


      </div>


      <div className="otp-footer">

        <p>

          © 2026 SAI CHARITHA AGENCIES. All Rights Reserved.

        </p>

      </div>


    </div>

  );

}


export default OtpVerification;