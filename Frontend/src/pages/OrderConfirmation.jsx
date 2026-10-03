import React from "react";

import {
  useLocation,
  useNavigate
} from "react-router-dom";

import {
  FaCheck,
  FaShoppingBag,
  FaHome,
  FaClipboardList
} from "react-icons/fa";

import "../assets/styles/orderConfirmation.css";


function OrderConfirmation() {

  const location =
    useLocation();

  const navigate =
    useNavigate();


  /* =====================================================
     GET ORDER
  ===================================================== */

  const order =
    location.state?.order;



  /* =====================================================
     NO ORDER
  ===================================================== */

  if (!order) {

    return (

      <div className="order-confirmation-page">

        <div className="confirmation-card">

          <div className="success-icon">

            <FaClipboardList />

          </div>


          <h1>

            No Order Found

          </h1>


          <p>

            We could not find the
            order details.

          </p>


          <button

            className="go-home-btn"

            onClick={() =>
              navigate("/")
            }

          >

            <FaHome />

            &nbsp;

            Go Home

          </button>


        </div>

      </div>

    );

  }



  /* =====================================================
     SAFE VALUES
  ===================================================== */

  const orderId =

    order.orderId ||

    order.id ||

    "N/A";


  const orderDate =

    order.orderDate ||

    "N/A";


  const status =

    order.status ||

    "Order Received";


  const totalCases =

    Number(
      order.totalCases || 0
    );


  const totalAmount =

    Number(
      order.totalAmount || 0
    );



  /* =====================================================
     UI
  ===================================================== */

  return (

    <div className="order-confirmation-page">


      <div className="confirmation-card">


        {/* SUCCESS */}

        <div className="success-icon">

          <FaCheck />

        </div>



        {/* COMPANY */}

        <div className="company-name">

          SAI CHARITHA AGENCIES

        </div>



        {/* TITLE */}

        <h1>

          Order Placed Successfully!

        </h1>



        <p className="confirmation-message">

          Thank you for placing your order
          with us. Your order has been
          received successfully.

        </p>



        <div className="confirmation-line"></div>



        {/* STATUS */}

        <div className="order-status-box">

          <div className="status-icon">

            <FaClipboardList />

          </div>


          <div>

            <span>

              Order Status

            </span>


            <strong>

              {status}

            </strong>

          </div>

        </div>



        {/* ORDER ID */}

        <div className="confirmation-info">

          <span>

            Order ID

          </span>


          <strong>

            {orderId}

          </strong>

        </div>



        {/* DATE & TIME */}

        <div className="confirmation-info">

          <span>

            Order Date & Time

          </span>


          <strong>

            {orderDate}

          </strong>

        </div>



        {/* SUMMARY */}

        <div className="confirmation-summary">


          <div className="summary-box">

            <span>

              Total Cases

            </span>


            <strong>

              {totalCases}

            </strong>

          </div>



          <div className="summary-box">

            <span>

              Total Amount

            </span>


            <strong>

              ₹
              {totalAmount.toLocaleString(
                "en-IN"
              )}

            </strong>

          </div>


        </div>



        {/* BUTTONS */}

        <div className="confirmation-buttons">


          <button

            className="continue-shopping-btn"

            onClick={() =>
              navigate(
                "/products"
              )
            }

          >

            <FaShoppingBag />

            &nbsp;

            Continue Shopping

          </button>



          <button

            className="go-home-btn"

            onClick={() =>
              navigate("/")
            }

          >

            <FaHome />

            &nbsp;

            Go Home

          </button>


        </div>



        {/* VIEW ORDERS */}

        <button

          className="view-orders-btn"

          onClick={() =>
            navigate(
              "/my-orders"
            )
          }

        >

          <FaClipboardList />

          &nbsp;

          View My Orders

        </button>


      </div>

    </div>

  );

}


export default OrderConfirmation;