import React, { useState } from "react";
import { Link } from "react-router-dom";

import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
  FaArrowRight,
  FaPaperPlane,
  FaBoxes
} from "react-icons/fa";

import "../../assets/styles/Contact.css";

function Contact() {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value
    }));
  };

  const handleSendMessage = async (e) => {

    e.preventDefault();

    console.log("SEND MESSAGE BUTTON CLICKED");

    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.subject.trim() ||
      !formData.message.trim()
    ) {
      alert("Please fill all the fields.");
      return;
    }

    try {

      const response = await fetch(
        "http://localhost:8080/api/contact/send",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(formData)
        }
      );

      const data = await response.json();

      console.log("Backend response:", data);

      if (response.ok && data.success === true) {

        alert("Message sent successfully!");

        setFormData({
          name: "",
          email: "",
          subject: "",
          message: ""
        });

      } else {

        alert(
          data.message ||
          "Failed to send message."
        );

      }

    } catch (error) {

      console.error(
        "Contact message error:",
        error
      );

      alert(
        "Unable to connect to the server. Please try again."
      );
    }
  };


  return (
    <div className="contact-page">

      {/* ================= NAVBAR ================= */}

      <nav className="contact-navbar">

        <div className="contact-logo">

          <div className="contact-logo-icon">
            <FaBoxes />
          </div>

          <div>
            <h2>SAI CHARITHA AGENCIES</h2>

            <span>
              Chocolate Distribution Management System
            </span>
          </div>

        </div>


        <div className="contact-nav-links">

          <Link
            to="/"
            className="contact-nav-link"
          >
            Home
          </Link>

          <Link
            to="/products"
            className="contact-nav-link"
          >
            Products
          </Link>

          <Link
            to="/about"
            className="contact-nav-link"
          >
            About
          </Link>

          <Link
            to="/contact"
            className="contact-nav-link active"
          >
            Contact
          </Link>

        </div>


        <div className="contact-auth">

          <Link
            to="/login"
            className="contact-login"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="contact-register"
          >
            Register
          </Link>

        </div>

      </nav>


      {/* ================= HERO ================= */}

      <section className="contact-hero">

        <div className="contact-hero-overlay"></div>

        <div className="contact-hero-content">

          <div className="contact-small-title">

            <span></span>

            GET IN TOUCH

            <span></span>

          </div>


          <h1>
            LET'S
            <br />
            <span>CONNECT</span>
          </h1>


          <div className="contact-typing">
            We are here to help you
          </div>


          <p>
            Have a question about our products or distribution
            system? Feel free to contact us.
          </p>

        </div>

      </section>


      {/* ================= CONTACT INFORMATION ================= */}

      <section className="contact-info-section">

        <div className="contact-section-title">

          <span></span>

          <h2>
            Contact Information
          </h2>

          <span></span>

        </div>


        <p className="contact-section-subtitle">
          Reach out to us through any of the following options
        </p>


        <div className="contact-info-grid">


          <div className="contact-info-card">

            <div className="contact-info-icon">
              <FaPhoneAlt />
            </div>

            <h3>
              Call Us
            </h3>

            <p>
              +91 9160583726
            </p>

            <span>
              Monday - Saturday
            </span>

          </div>


          <div className="contact-info-card">

            <div className="contact-info-icon">
              <FaEnvelope />
            </div>

            <h3>
              Email Us
            </h3>

            <p>
              edigamahitha53@gmail.com
            </p>

            <span>
              We reply as soon as possible
            </span>

          </div>


          <div className="contact-info-card">

            <div className="contact-info-icon">
              <FaMapMarkerAlt />
            </div>

            <h3>
              Our Location
            </h3>

            <p>
              Andhra Pradesh, India
            </p>

            <span>
              Serving local businesses
            </span>

          </div>


          <div className="contact-info-card">

            <div className="contact-info-icon">
              <FaClock />
            </div>

            <h3>
              Working Hours
            </h3>

            <p>
              9:00 AM - 6:00 PM
            </p>

            <span>
              Monday - Saturday
            </span>

          </div>

        </div>

      </section>


      {/* ================= CONTACT FORM ================= */}

      <section className="contact-main">

        <div className="contact-main-container">


          {/* LEFT */}

          <div className="contact-message">

            <div className="contact-section-label">

              <span></span>

              SEND US A MESSAGE

            </div>


            <h2>

              We'd Love To

              <span>
                Hear From You
              </span>

            </h2>


            <p>

              Whether you have a question, suggestion or simply
              want to know more about our products, send us a
              message and our team will get back to you.

            </p>


            <div className="contact-message-item">

              <FaPhoneAlt />

              <div>

                <strong>
                  Phone
                </strong>

                <span>
                  +91 9160583726
                </span>

              </div>

            </div>


            <div className="contact-message-item">

              <FaEnvelope />

              <div>

                <strong>
                  Email
                </strong>

                <span>
                  edigamahitha53@gmail.com
                </span>

              </div>

            </div>


            <div className="contact-message-item">

              <FaMapMarkerAlt />

              <div>

                <strong>
                  Address
                </strong>

                <span>
                  Andhra Pradesh, India
                </span>

              </div>

            </div>

          </div>


          {/* RIGHT - FORM */}

          <div className="contact-form-card">

            <form onSubmit={handleSendMessage}>


              <div className="contact-form-row">


                <div className="contact-input-group">

                  <label>
                    Your Name
                  </label>

                  <input
                    type="text"
                    name="name"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={handleChange}
                  />

                </div>


                <div className="contact-input-group">

                  <label>
                    Email Address
                  </label>

                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                  />

                </div>

              </div>


              <div className="contact-input-group">

                <label>
                  Subject
                </label>

                <input
                  type="text"
                  name="subject"
                  placeholder="Enter subject"
                  value={formData.subject}
                  onChange={handleChange}
                />

              </div>


              <div className="contact-input-group">

                <label>
                  Message
                </label>

                <textarea
                  rows="6"
                  name="message"
                  placeholder="Write your message..."
                  value={formData.message}
                  onChange={handleChange}
                ></textarea>

              </div>


              {/* ================= SEND BUTTON ================= */}

              <button
                type="submit"
                className="contact-submit"
              >
                Send Message
                <FaPaperPlane />
              </button>


            </form>

          </div>

        </div>

      </section>


      {/* ================= CTA ================= */}

      <section className="contact-cta">

        <div className="contact-cta-content">

          <div className="contact-cta-icon">
            <FaPhoneAlt />
          </div>


          <h2>
            Need Help With Our Products?
          </h2>


          <p>
            Explore our products and discover what we have
            available for your shop.
          </p>


          <Link
            to="/products"
            className="contact-cta-button"
          >
            View Products
            <FaArrowRight />
          </Link>

        </div>

      </section>


      {/* ================= FOOTER ================= */}

      <footer className="contact-footer">

        <div className="contact-footer-container">


          <div className="contact-footer-about">

            <div className="contact-footer-logo">
              <FaBoxes />
            </div>

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

          </div>


          <div className="contact-footer-column">

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


          <div className="contact-footer-column">

            <h3>
              Our Products
            </h3>

            <Link to="/products/galaxy">
              Galaxy
            </Link>

            <Link to="/products/snickers">
              Snickers
            </Link>

            <Link to="/products/boomer">
              Boomer
            </Link>

            <Link to="/products/orbit">
              Orbit
            </Link>

            <Link to="/products/centerfresh">
              Center Fresh
            </Link>

          </div>


          <div className="contact-footer-column">

            <h3>
              Contact Us
            </h3>

            <p>
              <FaPhoneAlt />
              +91 9160583726
            </p>

            <p>
              <FaEnvelope />
              edigamahitha53@gmail.com
            </p>

            <p>
              <FaMapMarkerAlt />
              Andhra Pradesh, India
            </p>

          </div>

        </div>


        <div className="contact-footer-bottom">

          <p>
            © 2026 SAI CHARITHA AGENCIES.
            All Rights Reserved.
          </p>

        </div>

      </footer>

    </div>
  );
}

export default Contact;