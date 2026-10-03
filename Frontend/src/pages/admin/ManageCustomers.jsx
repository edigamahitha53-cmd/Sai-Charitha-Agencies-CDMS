import React, { useEffect, useState } from "react";

import {
  FaArrowLeft,
  FaSearch,
  FaTimes,
  FaUsers,
  FaUser,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaTrash,
  FaEye,
  FaStore,
  FaCheckCircle
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";

import "./ManageCustomers.css";

function ManageCustomers() {

  const navigate = useNavigate();

  /* =========================================
     CUSTOMERS
  ========================================= */

  const [customers, setCustomers] = useState([]);

  const [loading, setLoading] = useState(true);

  /* =========================================
     SEARCH
  ========================================= */

  const [searchText, setSearchText] = useState("");

  /* =========================================
     VIEW MODAL
  ========================================= */

  const [selectedCustomer, setSelectedCustomer] = useState(null);

  /* =========================================
     GET CUSTOMERS FROM BACKEND
  ========================================= */

  useEffect(() => {

    fetch("https://sai-charitha-agencies-cdms.onrender.com/api/shop-customers")

      .then((response) => {

        if (!response.ok) {

          throw new Error("Failed to fetch customers");

        }

        return response.json();

      })

      .then((data) => {

        setCustomers(
          Array.isArray(data)
            ? data
            : []
        );

      })

      .catch((error) => {

        console.error(
          "Error fetching customers:",
          error
        );

        setCustomers([]);

      })

      .finally(() => {

        setLoading(false);

      });

  }, []);

  /* =========================================
     DELETE CUSTOMER
  ========================================= */

  const handleDeleteCustomer = async (id) => {

    const confirmDelete =
      window.confirm(
        "Are you sure you want to delete this customer?"
      );

    if (!confirmDelete) {

      return;

    }

    try {

      const response =
        await fetch(
          `https://sai-charitha-agencies-cdms.onrender.com/api/shop-customers/${id}`,
          {
            method: "DELETE"
          }
        );

      if (!response.ok) {

        alert(
          "Unable to delete customer."
        );

        return;

      }

      const updatedCustomers =
        customers.filter(
          (customer) =>
            customer.id !== id
        );

      setCustomers(
        updatedCustomers
      );

      if (
        selectedCustomer &&
        selectedCustomer.id === id
      ) {

        setSelectedCustomer(
          null
        );

      }

      alert(
        "Customer deleted successfully."
      );

    } catch (error) {

      console.error(
        "Delete customer error:",
        error
      );

      alert(
        "Unable to connect to server."
      );

    }

  };

  /* =========================================
     FILTER CUSTOMERS
  ========================================= */

  const filteredCustomers =
    customers.filter((customer) => {

      const search =
        searchText.toLowerCase();

      return (

        String(
          customer.shopName || ""
        )
          .toLowerCase()
          .includes(search)

        ||

        String(
          customer.ownerName ||
          customer.name ||
          ""
        )
          .toLowerCase()
          .includes(search)

        ||

        String(
          customer.phone ||
          customer.mobile ||
          ""
        )
          .toLowerCase()
          .includes(search)

        ||

        String(
          customer.email ||
          ""
        )
          .toLowerCase()
          .includes(search)

      );

    });

  /* =========================================
     CUSTOMER VALUES
  ========================================= */

  const getOwnerName = (customer) => {

    return (
      customer.ownerName ||
      customer.name ||
      "Not Available"
    );

  };

  const getPhone = (customer) => {

    return (
      customer.phone ||
      customer.mobile ||
      "Not Available"
    );

  };

  const getEmail = (customer) => {

    return (
      customer.email ||
      "Not Available"
    );

  };

  const getAddress = (customer) => {

    return (
      customer.address ||
      customer.shopAddress ||
      "Not Available"
    );

  };

  const getShopName = (customer) => {

    return (
      customer.shopName ||
      customer.businessName ||
      customer.storeName ||
      "Shop"
    );

  };

  const getDate = (customer) => {

    if (!customer.createdAt) {

      return "Not Available";

    }

    return new Date(
      customer.createdAt
    ).toLocaleDateString();

  };

  /* =========================================
     RENDER
  ========================================= */

  return (

    <div className="manage-customers-page">

      {/* =====================================
          HEADER
      ===================================== */}

      <div className="manage-customers-header">

        <div className="manage-customers-heading">

          <button

            className="customer-back-button"

            onClick={() =>
              navigate(
                "/admin-dashboard"
              )
            }

          >

            <FaArrowLeft />

          </button>

          <div>

            <p className="manage-customers-small-title">

              SAI CHARITHA AGENCIES

            </p>

            <h1>

              Manage Customers

            </h1>

            <p>

              View and manage registered shop customers

            </p>

          </div>

        </div>

        <div className="customer-total-badge">

          <FaUsers />

          <span>

            {customers.length} Customers

          </span>

        </div>

      </div>

      {/* =====================================
          SEARCH TOOLBAR
      ===================================== */}

      <div className="manage-customers-toolbar">

        <div className="customer-search-box">

          <FaSearch />

          <input

            type="text"

            placeholder="Search shop, owner, phone or email..."

            value={
              searchText
            }

            onChange={(event) =>
              setSearchText(
                event.target.value
              )
            }

          />

          {searchText && (

            <button

              onClick={() =>
                setSearchText("")
              }

            >

              <FaTimes />

            </button>

          )}

        </div>

        <div className="customer-count">

          <FaStore />

          <span>

            Showing {filteredCustomers.length} customers

          </span>

        </div>

      </div>

      {/* =====================================
          LOADING
      ===================================== */}

      {loading ? (

        <div className="customers-empty">

          <div className="customers-empty-icon">

            <FaUsers />

          </div>

          <h2>

            Loading Customers...

          </h2>

          <p>

            Please wait while registered customers are loaded.

          </p>

        </div>

      ) : filteredCustomers.length === 0 ? (

        <div className="customers-empty">

          <div className="customers-empty-icon">

            <FaUsers />

          </div>

          <h2>

            No Customers Found

          </h2>

          <p>

            {searchText

              ? "Try another search."

              : "Registered shop customers will appear here."

            }

          </p>

        </div>

      ) : (

        <div className="customers-grid">

          {filteredCustomers.map(
            (customer, index) => (

              <div

                className="customer-card"

                key={
                  customer.id ||
                  index
                }

                style={{
                  animationDelay:
                    `${index * 0.08}s`
                }}

              >

                {/* CARD TOP */}

                <div className="customer-card-top">

                  <div className="customer-avatar">

                    <FaStore />

                  </div>

                  <div className="customer-shop-info">

                    <span>

                      REGISTERED SHOP

                    </span>

                    <h2>

                      {getShopName(
                        customer
                      )}

                    </h2>

                  </div>

                  <div className="customer-active">

                    <FaCheckCircle />

                    Active

                  </div>

                </div>

                {/* CUSTOMER DETAILS */}

                <div className="customer-details">

                  <div className="customer-detail">

                    <div className="customer-detail-icon">

                      <FaUser />

                    </div>

                    <div>

                      <span>
                        Owner Name
                      </span>

                      <strong>

                        {getOwnerName(
                          customer
                        )}

                      </strong>

                    </div>

                  </div>

                  <div className="customer-detail">

                    <div className="customer-detail-icon">

                      <FaPhone />

                    </div>

                    <div>

                      <span>
                        Phone
                      </span>

                      <strong>

                        {getPhone(
                          customer
                        )}

                      </strong>

                    </div>

                  </div>

                  <div className="customer-detail">

                    <div className="customer-detail-icon">

                      <FaEnvelope />

                    </div>

                    <div>

                      <span>
                        Email
                      </span>

                      <strong>

                        {getEmail(
                          customer
                        )}

                      </strong>

                    </div>

                  </div>

                  <div className="customer-detail">

                    <div className="customer-detail-icon">

                      <FaMapMarkerAlt />

                    </div>

                    <div>

                      <span>
                        Address
                      </span>

                      <strong>

                        {getAddress(
                          customer
                        )}

                      </strong>

                    </div>

                  </div>

                </div>

                {/* FOOTER */}

                <div className="customer-card-footer">

                  <div className="customer-date">

                    <FaCalendarAlt />

                    <span>

                      {getDate(
                        customer
                      )}

                    </span>

                  </div>

                  <div className="customer-actions">

                    <button

                      className="customer-view-button"

                      onClick={() =>
                        setSelectedCustomer(
                          customer
                        )
                      }

                    >

                      <FaEye />

                      View

                    </button>

                    <button

                      className="customer-delete-button"

                      onClick={() =>
                        handleDeleteCustomer(
                          customer.id
                        )
                      }

                    >

                      <FaTrash />

                    </button>

                  </div>

                </div>

              </div>

            )
          )}

        </div>

      )}

      {/* =====================================
          VIEW CUSTOMER MODAL
      ===================================== */}

      {selectedCustomer && (

        <div

          className="customer-modal-overlay"

          onMouseDown={(event) => {

            if (
              event.target ===
              event.currentTarget
            ) {

              setSelectedCustomer(
                null
              );

            }

          }}

        >

          <div className="customer-modal">

            <div className="customer-modal-header">

              <div>

                <span>

                  CUSTOMER DETAILS

                </span>

                <h2>

                  {getShopName(
                    selectedCustomer
                  )}

                </h2>

              </div>

              <button

                onClick={() =>
                  setSelectedCustomer(
                    null
                  )
                }

              >

                <FaTimes />

              </button>

            </div>

            <div className="customer-modal-body">

              <div className="customer-modal-avatar">

                <FaStore />

              </div>

              <div className="customer-modal-details">

                <div>

                  <span>
                    Owner Name
                  </span>

                  <strong>

                    {getOwnerName(
                      selectedCustomer
                    )}

                  </strong>

                </div>

                <div>

                  <span>
                    Phone
                  </span>

                  <strong>

                    {getPhone(
                      selectedCustomer
                    )}

                  </strong>

                </div>

                <div>

                  <span>
                    Email
                  </span>

                  <strong>

                    {getEmail(
                      selectedCustomer
                    )}

                  </strong>

                </div>

                <div>

                  <span>
                    Address
                  </span>

                  <strong>

                    {getAddress(
                      selectedCustomer
                    )}

                  </strong>

                </div>

                <div>

                  <span>
                    Registration Date
                  </span>

                  <strong>

                    {getDate(
                      selectedCustomer
                    )}

                  </strong>

                </div>

              </div>

            </div>

            <div className="customer-modal-footer">

              <button

                onClick={() =>
                  setSelectedCustomer(
                    null
                  )
                }

              >

                <FaTimes />

                Close

              </button>

            </div>

          </div>

        </div>

      )}

    </div>

  );

}

export default ManageCustomers;
