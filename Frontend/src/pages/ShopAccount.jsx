
import React, {
  useEffect,
  useState
} from "react";

import { useNavigate } from "react-router-dom";

import {
  FaStore,
  FaUser,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaArrowLeft,
  FaSignOutAlt,
  FaIdCard,
  FaEdit,
  FaSave,
  FaTimes
} from "react-icons/fa";

import "../assets/styles/shopAccount.css";


function ShopAccount() {

  const navigate = useNavigate();


  /* =====================================================
     GET LOGGED-IN SHOP
  ===================================================== */

  const [loggedInShop, setLoggedInShop] =
    useState(() => {

      try {

        return (
          JSON.parse(
            localStorage.getItem(
              "loggedInShop"
            )
          ) || null
        );

      } catch (error) {

        return null;

      }

    });


  /* =====================================================
     EDIT MODE
  ===================================================== */

  const [isEditing, setIsEditing] =
    useState(false);


  /* =====================================================
     EDIT FORM
  ===================================================== */

  const [formData, setFormData] =
    useState({

      shopName: "",
      ownerName: "",
      email: "",
      phone: "",
      address: ""

    });


  /* =====================================================
     LOAD SHOP DETAILS INTO FORM
  ===================================================== */

  useEffect(() => {

    if (loggedInShop) {

      setFormData({

        shopName:
          loggedInShop.shopName ||
          "",

        ownerName:
          loggedInShop.ownerName ||
          loggedInShop.name ||
          "",

        email:
          loggedInShop.email ||
          "",

        phone:
          loggedInShop.phone ||
          loggedInShop.mobile ||
          "",

        address:
          loggedInShop.address ||
          ""

      });

    }

  }, [loggedInShop]);


  /* =====================================================
     HANDLE INPUT CHANGE
  ===================================================== */

  const handleChange = (event) => {

    const {
      name,
      value
    } = event.target;


    setFormData({

      ...formData,

      [name]: value

    });

  };


  /* =====================================================
     START EDIT
  ===================================================== */

  const handleEdit = () => {

    setFormData({

      shopName:
        loggedInShop.shopName ||
        "",

      ownerName:
        loggedInShop.ownerName ||
        loggedInShop.name ||
        "",

      email:
        loggedInShop.email ||
        "",

      phone:
        loggedInShop.phone ||
        loggedInShop.mobile ||
        "",

      address:
        loggedInShop.address ||
        ""

    });


    setIsEditing(true);

  };


  /* =====================================================
     CANCEL EDIT
  ===================================================== */

  const handleCancelEdit = () => {

    setFormData({

      shopName:
        loggedInShop.shopName ||
        "",

      ownerName:
        loggedInShop.ownerName ||
        loggedInShop.name ||
        "",

      email:
        loggedInShop.email ||
        "",

      phone:
        loggedInShop.phone ||
        loggedInShop.mobile ||
        "",

      address:
        loggedInShop.address ||
        ""

    });


    setIsEditing(false);

  };


  /* =====================================================
     SAVE DETAILS
  ===================================================== */

  const handleSave = () => {

    const updatedShop = {

      ...loggedInShop,

      shopName:
        formData.shopName,

      ownerName:
        formData.ownerName,

      email:
        formData.email,

      phone:
        formData.phone,

      mobile:
        formData.phone,

      address:
        formData.address

    };


    /* =========================================
       UPDATE LOGGED-IN SHOP
    ========================================= */

    localStorage.setItem(

      "loggedInShop",

      JSON.stringify(
        updatedShop
      )

    );


    /* =========================================
       UPDATE REGISTERED SHOP
    ========================================= */

    const registeredShop =
      JSON.parse(
        localStorage.getItem(
          "shopUser"
        )
      );


    if (registeredShop) {

      const updatedRegisteredShop = {

        ...registeredShop,

        shopName:
          formData.shopName,

        ownerName:
          formData.ownerName,

        email:
          formData.email,

        phone:
          formData.phone,

        mobile:
          formData.phone,

        address:
          formData.address

      };


      localStorage.setItem(

        "shopUser",

        JSON.stringify(
          updatedRegisteredShop
        )

      );

    }


    /* =========================================
       UPDATE PAGE
    ========================================= */

    setLoggedInShop(
      updatedShop
    );


    setIsEditing(false);


    alert(
      "Shop details updated successfully!"
    );

  };


  /* =====================================================
     LOGOUT
  ===================================================== */

  const handleLogout = () => {

    localStorage.removeItem(
      "loggedInShop"
    );

    navigate("/login");

  };


  /* =====================================================
     SHOP NOT LOGGED IN
  ===================================================== */

  if (!loggedInShop) {

    return (

      <div className="shop-account-page">

        <div className="shop-account-empty">

          <FaStore />

          <h2>
            Please Login First
          </h2>

          <p>
            You need to login to view
            your shop account.
          </p>

          <button
            onClick={() =>
              navigate("/login")
            }
          >

            Go to Login

          </button>

        </div>

      </div>

    );

  }


  return (

    <div className="shop-account-page">


      {/* =================================================
          BACKGROUND DECORATIONS
      ================================================= */}

      <div className="shop-account-circle circle-one"></div>

      <div className="shop-account-circle circle-two"></div>

      <div className="shop-account-circle circle-three"></div>


      {/* =================================================
          HEADER
      ================================================= */}

      <div className="shop-account-header">

        <div>

          <p className="shop-account-small-title">

            SAI CHARITHA AGENCIES

          </p>

          <h1>

            My Account

          </h1>

          <p>

            View and manage your registered shop information

          </p>

        </div>


        <div className="shop-account-header-buttons">

          <button
            className="shop-account-back-btn"
            onClick={() =>
              navigate(
                "/shop-dashboard"
              )
            }
          >

            <FaArrowLeft />

            Back to Dashboard

          </button>


          <button
            className="shop-account-logout-btn"
            onClick={
              handleLogout
            }
          >

            <FaSignOutAlt />

            Logout

          </button>

        </div>

      </div>


      {/* =================================================
          MAIN CONTAINER
      ================================================= */}

      <div className="shop-account-container">


        {/* =================================================
            PROFILE CARD
        ================================================= */}

        <div className="shop-profile-card">


          <div className="shop-profile-icon">

            <FaStore />

          </div>


          <div className="shop-profile-content">

            <p>
              SHOP ACCOUNT
            </p>

            <h2>

              {
                loggedInShop.shopName ||
                loggedInShop.name ||
                "Shop Owner"
              }

            </h2>

            <span>

              {
                loggedInShop.email ||
                "No email available"
              }

            </span>

          </div>


          {/* ================= EDIT BUTTON ================= */}

          {!isEditing && (

            <button
              className="shop-edit-btn"
              onClick={handleEdit}
            >

              <FaEdit />

              Edit Details

            </button>

          )}

        </div>


        {/* =================================================
            EDIT FORM
        ================================================= */}

        {isEditing ? (

          <div className="shop-account-card shop-edit-card">


            <div className="shop-account-card-header">

              <div className="shop-account-card-icon">

                <FaEdit />

              </div>

              <div>

                <h2>
                  Edit Shop Information
                </h2>

                <p>
                  Update your registered shop details
                </p>

              </div>

            </div>


            <div className="shop-edit-form">


              {/* ================= SHOP NAME ================= */}

              <div className="shop-edit-field">

                <label>
                  <FaStore />

                  Shop Name
                </label>

                <input
                  type="text"
                  name="shopName"
                  value={
                    formData.shopName
                  }
                  onChange={
                    handleChange
                  }
                  placeholder="Enter shop name"
                />

              </div>


              {/* ================= OWNER NAME ================= */}

              <div className="shop-edit-field">

                <label>
                  <FaUser />

                  Owner Name
                </label>

                <input
                  type="text"
                  name="ownerName"
                  value={
                    formData.ownerName
                  }
                  onChange={
                    handleChange
                  }
                  placeholder="Enter owner name"
                />

              </div>


              {/* ================= EMAIL ================= */}

              <div className="shop-edit-field">

                <label>
                  <FaEnvelope />

                  Email Address
                </label>

                <input
                  type="email"
                  name="email"
                  value={
                    formData.email
                  }
                  onChange={
                    handleChange
                  }
                  placeholder="Enter email address"
                />

              </div>


              {/* ================= PHONE ================= */}

              <div className="shop-edit-field">

                <label>
                  <FaPhone />

                  Phone Number
                </label>

                <input
                  type="tel"
                  name="phone"
                  value={
                    formData.phone
                  }
                  onChange={
                    handleChange
                  }
                  placeholder="Enter phone number"
                />

              </div>


              {/* ================= ADDRESS ================= */}

              <div className="shop-edit-field shop-edit-address">

                <label>
                  <FaMapMarkerAlt />

                  Shop Address
                </label>

                <textarea
                  name="address"
                  value={
                    formData.address
                  }
                  onChange={
                    handleChange
                  }
                  placeholder="Enter shop address"
                  rows="4"
                />

              </div>


            </div>


            {/* ================= EDIT BUTTONS ================= */}

            <div className="shop-edit-buttons">

              <button
                className="shop-save-btn"
                onClick={
                  handleSave
                }
              >

                <FaSave />

                Save Changes

              </button>


              <button
                className="shop-cancel-edit-btn"
                onClick={
                  handleCancelEdit
                }
              >

                <FaTimes />

                Cancel

              </button>

            </div>


          </div>

        ) : (


          /* =================================================
             ACCOUNT INFORMATION
          ================================================= */

          <div className="shop-account-card">


            <div className="shop-account-card-header">

              <div className="shop-account-card-icon">

                <FaIdCard />

              </div>

              <div>

                <h2>
                  Shop Information
                </h2>

                <p>
                  Your registered account details
                </p>

              </div>

            </div>


            <div className="shop-account-details">


              {/* ================= SHOP NAME ================= */}

              <div className="shop-account-detail">

                <div className="shop-detail-icon">

                  <FaStore />

                </div>

                <div>

                  <span>
                    Shop Name
                  </span>

                  <strong>

                    {
                      loggedInShop.shopName ||
                      loggedInShop.name ||
                      "Not Provided"
                    }

                  </strong>

                </div>

              </div>


              {/* ================= OWNER NAME ================= */}

              <div className="shop-account-detail">

                <div className="shop-detail-icon">

                  <FaUser />

                </div>

                <div>

                  <span>
                    Owner Name
                  </span>

                  <strong>

                    {
                      loggedInShop.ownerName ||
                      loggedInShop.name ||
                      "Not Provided"
                    }

                  </strong>

                </div>

              </div>


              {/* ================= EMAIL ================= */}

              <div className="shop-account-detail">

                <div className="shop-detail-icon">

                  <FaEnvelope />

                </div>

                <div>

                  <span>
                    Email Address
                  </span>

                  <strong>

                    {
                      loggedInShop.email ||
                      "Not Provided"
                    }

                  </strong>

                </div>

              </div>


              {/* ================= PHONE ================= */}

              <div className="shop-account-detail">

                <div className="shop-detail-icon">

                  <FaPhone />

                </div>

                <div>

                  <span>
                    Phone Number
                  </span>

                  <strong>

                    {
                      loggedInShop.phone ||
                      loggedInShop.mobile ||
                      "Not Provided"
                    }

                  </strong>

                </div>

              </div>


              {/* ================= ADDRESS ================= */}

              <div className="shop-account-detail shop-address-detail">

                <div className="shop-detail-icon">

                  <FaMapMarkerAlt />

                </div>

                <div>

                  <span>
                    Shop Address
                  </span>

                  <strong>

                    {
                      loggedInShop.address ||
                      "Not Provided"
                    }

                  </strong>

                </div>

              </div>


            </div>

          </div>

        )}


        {/* =================================================
            QUICK ACTIONS
        ================================================= */}

        <div className="shop-account-actions-card">

          <h2>
            Quick Actions
          </h2>

          <p>
            Manage your shop activities
          </p>


          <div className="shop-account-actions">


            <button
              onClick={() =>
                navigate(
                  "/products"
                )
              }
            >

              <FaStore />

              <span>
                Browse Products
              </span>

            </button>


            <button
              onClick={() =>
                navigate(
                  "/order-cart"
                )
              }
            >

              <FaStore />

              <span>
                View Cart
              </span>

            </button>


            <button
              onClick={() =>
                navigate(
                  "/my-orders"
                )
              }
            >

              <FaIdCard />

              <span>
                My Orders
              </span>

            </button>


          </div>

        </div>


      </div>

    </div>

  );

}


export default ShopAccount;
