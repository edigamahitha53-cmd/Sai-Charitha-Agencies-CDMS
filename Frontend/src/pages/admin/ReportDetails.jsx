import React, { useEffect, useState } from "react";

import {
  FaArrowLeft,
  FaChartBar,
  FaShoppingCart,
  FaRupeeSign,
  FaBox,
  FaClock,
  FaCheckCircle,
  FaTruck,
  FaTimesCircle,
  FaUser,
  FaStore,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaPhone,
  FaEye,
  FaClipboardList
} from "react-icons/fa";

import {
  useNavigate,
  useParams
} from "react-router-dom";

import "./ReportDetails.css";


function ReportDetails() {

  const navigate = useNavigate();

  const { type } = useParams();


  const [orders, setOrders] =
    useState([]);


  /* =========================================
     API URL
  ========================================= */

  const API_URL =
    "http://localhost:8080/api/orders";


  /* =========================================
     LOAD ORDERS FROM DATABASE
  ========================================= */

  const loadOrders = async () => {

    try {

      const response =
        await fetch(API_URL);


      if (!response.ok) {

        throw new Error(
          "Unable to load orders"
        );

      }


      const data =
        await response.json();


      if (Array.isArray(data)) {

        setOrders(data);

      } else {

        setOrders([]);

      }

    } catch (error) {

      console.error(
        "Unable to load orders from database:",
        error
      );

      setOrders([]);

    }

  };


  /* =========================================
     LOAD WHEN PAGE OPENS
  ========================================= */

  useEffect(() => {

    loadOrders();


    const handleFocus = () => {

      loadOrders();

    };


    const handleVisibilityChange = () => {

      if (
        document.visibilityState ===
        "visible"
      ) {

        loadOrders();

      }

    };


    window.addEventListener(
      "focus",
      handleFocus
    );


    document.addEventListener(
      "visibilitychange",
      handleVisibilityChange
    );


    return () => {

      window.removeEventListener(
        "focus",
        handleFocus
      );


      document.removeEventListener(
        "visibilitychange",
        handleVisibilityChange
      );

    };

  }, []);


  /* =========================================
     PARSE ITEMS
  ========================================= */

  const getItems = (order) => {

    if (!order) {

      return [];

    }


    if (Array.isArray(order.items)) {

      return order.items;

    }


    if (typeof order.items === "string") {

      try {

        const parsed =
          JSON.parse(order.items);


        return Array.isArray(parsed)
          ? parsed
          : [];

      } catch (error) {

        return [];

      }

    }


    return [];

  };


  /* =========================================
     PARSE DELIVERY DETAILS
  ========================================= */

  const getDeliveryDetails = (order) => {

    if (!order) {

      return {};

    }


    if (
      order.deliveryDetails &&
      typeof order.deliveryDetails ===
        "object"
    ) {

      return order.deliveryDetails;

    }


    if (
      typeof order.deliveryDetails ===
      "string"
    ) {

      try {

        const parsed =
          JSON.parse(
            order.deliveryDetails
          );


        return parsed || {};

      } catch (error) {

        return {};

      }

    }


    return {};

  };


  /* =========================================
     STATUS
  ========================================= */

  const getStatus = (order) => {

    const status =
      order.status ||
      "Pending";


    if (
      status === "Order Received"
    ) {

      return "Pending";

    }


    if (
      status === "Cancelled"
    ) {

      return "Order Cancelled";

    }


    return status;

  };


  /* =========================================
     ORDER ID
  ========================================= */

  const getOrderId = (order) => {

    return (
      order.orderId ||
      order.id ||
      "N/A"
    );

  };


  /* =========================================
     TOTAL
  ========================================= */

  const getTotal = (order) => {

    return (
      Number(
        order.totalAmount ||
        order.total ||
        order.amount ||
        0
      ) || 0
    );

  };


  /* =========================================
     CASES
  ========================================= */

  const getCases = (order) => {

    if (
      order.totalCases !==
      undefined
    ) {

      return (
        Number(
          order.totalCases
        ) || 0
      );

    }


    const items =
      getItems(order);


    if (
      !Array.isArray(items)
    ) {

      return 0;

    }


    return items.reduce(
      (
        total,
        item
      ) => {

        return (
          total +
          Number(
            item.quantity || 0
          )
        );

      },
      0
    );

  };


  /* =========================================
     FILTER ORDERS
  ========================================= */

  const getFilteredOrders = () => {

    switch (type) {

      case "pending":

        return orders.filter(
          (order) =>
            getStatus(order) ===
            "Pending"
        );


      case "confirmed":

        return orders.filter(
          (order) =>
            getStatus(order) ===
            "Confirmed"
        );


      case "processing":

        return orders.filter(
          (order) =>
            getStatus(order) ===
            "Processing"
        );


      case "shipped":

        return orders.filter(
          (order) =>
            getStatus(order) ===
            "Shipped"
        );


      case "delivered":

        return orders.filter(
          (order) =>
            getStatus(order) ===
            "Delivered"
        );


      case "cancelled":

        return orders.filter(
          (order) =>
            getStatus(order) ===
              "Order Cancelled" ||
            getStatus(order) ===
              "Cancelled"
        );


      case "active-orders":

        return orders.filter(
          (order) => {

            const status =
              getStatus(order);

            return (
              status === "Pending" ||
              status === "Confirmed" ||
              status === "Processing" ||
              status === "Shipped"
            );

          }
        );


      default:

        return orders;

    }

  };


  const filteredOrders =
    getFilteredOrders();


  /* =========================================
     REPORT INFORMATION
  ========================================= */

  const reportInformation = {

    "total-orders": {
      title: "Total Orders",
      subtitle:
        "Complete list of all orders received",
      icon: <FaShoppingCart />
    },

    "total-sales": {
      title: "Total Sales",
      subtitle:
        "Complete sales performance from all orders",
      icon: <FaRupeeSign />
    },

    "total-cases": {
      title: "Total Cases",
      subtitle:
        "Total number of cases ordered",
      icon: <FaBox />
    },

    "active-orders": {
      title: "Active Orders",
      subtitle:
        "Orders currently being processed or delivered",
      icon: <FaClock />
    },

    "pending": {
      title: "Pending Orders",
      subtitle:
        "Orders waiting for confirmation",
      icon: <FaClock />
    },

    "confirmed": {
      title: "Confirmed Orders",
      subtitle:
        "Orders confirmed by the business",
      icon: <FaCheckCircle />
    },

    "processing": {
      title: "Processing Orders",
      subtitle:
        "Orders currently being prepared",
      icon: <FaBox />
    },

    "shipped": {
      title: "Shipped Orders",
      subtitle:
        "Orders that have been shipped",
      icon: <FaTruck />
    },

    "delivered": {
      title: "Delivered Orders",
      subtitle:
        "Successfully delivered orders",
      icon: <FaCheckCircle />
    },

    "cancelled": {
      title: "Cancelled Orders",
      subtitle:
        "Orders cancelled by customers or admin",
      icon: <FaTimesCircle />
    },

    "average-order-value": {
      title: "Average Order Value",
      subtitle:
        "Average amount spent per order",
      icon: <FaChartBar />
    }

  };


  const currentReport =
    reportInformation[type] ||
    reportInformation["total-orders"];


  /* =========================================
     TOTAL AMOUNT
  ========================================= */

  const reportTotalAmount =
    filteredOrders.reduce(
      (
        total,
        order
      ) => {

        return (
          total +
          getTotal(order)
        );

      },
      0
    );


  /* =========================================
     TOTAL CASES
  ========================================= */

  const reportTotalCases =
    filteredOrders.reduce(
      (
        total,
        order
      ) => {

        return (
          total +
          getCases(order)
        );

      },
      0
    );


  /* =========================================
     AVERAGE
  ========================================= */

  const reportAverage =
    filteredOrders.length > 0
      ? reportTotalAmount /
        filteredOrders.length
      : 0;


  /* =========================================
     DISPLAY VALUE
  ========================================= */

  const getMainValue = () => {

    if (
      type === "total-sales"
    ) {

      return (
        <>
          ₹
          {reportTotalAmount.toLocaleString(
            "en-IN",
            {
              maximumFractionDigits: 2
            }
          )}
        </>
      );

    }


    if (
      type === "total-cases"
    ) {

      return reportTotalCases;

    }


    if (
      type === "average-order-value"
    ) {

      return (
        <>
          ₹
          {reportAverage.toLocaleString(
            "en-IN",
            {
              maximumFractionDigits: 2
            }
          )}
        </>
      );

    }


    return filteredOrders.length;

  };


  /* =========================================
     STATUS ICON
  ========================================= */

  const getStatusIcon = (status) => {

    if (
      status === "Pending"
    ) {

      return <FaClock />;

    }


    if (
      status === "Confirmed"
    ) {

      return <FaCheckCircle />;

    }


    if (
      status === "Processing"
    ) {

      return <FaBox />;

    }


    if (
      status === "Shipped"
    ) {

      return <FaTruck />;

    }


    if (
      status === "Delivered"
    ) {

      return <FaCheckCircle />;

    }


    if (
      status === "Order Cancelled"
    ) {

      return <FaTimesCircle />;

    }


    return <FaClock />;

  };


  /* =========================================
     RENDER
  ========================================= */

  return (

    <div className="report-details-page">


      {/* =====================================
          HEADER
      ===================================== */}

      <header className="report-details-header">


        <button
          className="report-details-back"
          onClick={() =>
            navigate(
              "/admin/reports"
            )
          }
        >

          <FaArrowLeft />

          <span>
            Back to Reports
          </span>

        </button>


        <div className="report-details-heading">

          <div className="report-details-icon">

            {currentReport.icon}

          </div>


          <div>

            <p>
              SAI CHARITHA AGENCIES
            </p>


            <h1>

              <span className="report-details-typing">
                {currentReport.title}
              </span>

            </h1>


            <span>
              {currentReport.subtitle}
            </span>

          </div>

        </div>

      </header>



      {/* =====================================
          MAIN SUMMARY
      ===================================== */}

      <main className="report-details-container">


        <section className="report-main-summary">


          <div className="report-summary-main-icon">

            {currentReport.icon}

          </div>


          <div>

            <span>
              Report Result
            </span>


            <h2>

              {getMainValue()}

            </h2>


            <p>

              Based on
              {" "}
              {filteredOrders.length}
              {" "}
              related order
              {filteredOrders.length !== 1
                ? "s"
                : ""}

            </p>

          </div>

        </section>



        {/* =====================================
            SMALL SUMMARY CARDS
        ===================================== */}

        <section className="report-mini-grid">


          <div className="report-mini-card">

            <div>

              <FaShoppingCart />

            </div>

            <span>
              Orders
            </span>

            <strong>
              {filteredOrders.length}
            </strong>

          </div>


          <div className="report-mini-card">

            <div>

              <FaBox />

            </div>

            <span>
              Total Cases
            </span>

            <strong>
              {reportTotalCases}
            </strong>

          </div>


          <div className="report-mini-card">

            <div>

              <FaRupeeSign />

            </div>

            <span>
              Total Amount
            </span>

            <strong>

              ₹
              {reportTotalAmount.toLocaleString(
                "en-IN"
              )}

            </strong>

          </div>


          <div className="report-mini-card">

            <div>

              <FaChartBar />

            </div>

            <span>
              Average
            </span>

            <strong>

              ₹
              {reportAverage.toLocaleString(
                "en-IN",
                {
                  maximumFractionDigits: 2
                }
              )}

            </strong>

          </div>


        </section>



        {/* =====================================
            RELATED ORDERS
        ===================================== */}

        <section className="related-orders-section">


          <div className="related-orders-heading">

            <div>

              <span>
                REPORT DETAILS
              </span>

              <h2>

                <FaClipboardList />

                Related Orders

              </h2>

            </div>


            <div className="related-orders-count">

              {filteredOrders.length}

              {" "}

              Order
              {filteredOrders.length !== 1
                ? "s"
                : ""}

            </div>

          </div>



          {/* ===================================
              NO ORDERS
          =================================== */}

          {filteredOrders.length === 0 ? (

            <div className="no-report-orders">


              <div className="no-report-icon">

                {currentReport.icon}

              </div>


              <h3>
                No Related Orders
              </h3>


              <p>

                There are currently no orders
                available for this report.

              </p>


              <button
                onClick={() =>
                  navigate(
                    "/admin/reports"
                  )
                }
              >

                <FaArrowLeft />

                Back to Reports

              </button>


            </div>

          ) : (


            /* =================================
               ORDER LIST
            ================================= */

            <div className="report-orders-list">


              {filteredOrders.map(
                (
                  order,
                  index
                ) => {

                  const deliveryDetails =
                    getDeliveryDetails(order);

                  const items =
                    getItems(order);


                  return (

                    <div
                      className="report-order-card"
                      key={
                        getOrderId(order) ||
                        index
                      }
                    >


                      {/* ORDER HEADER */}

                      <div className="report-order-top">


                        <div>

                          <span>
                            ORDER ID
                          </span>

                          <h3>

                            {getOrderId(
                              order
                            )}

                          </h3>

                        </div>


                        <div
                          className={
                            `report-order-status ${getStatus(
                              order
                            )
                              .toLowerCase()
                              .replace(
                                /\s+/g,
                                "-"
                              )}`
                          }
                        >

                          {getStatusIcon(
                            getStatus(order)
                          )}

                          {getStatus(order)}

                        </div>


                      </div>



                      {/* ORDER INFORMATION */}

                      <div className="report-order-info">


                        <div>

                          <FaCalendarAlt />

                          <span>
                            Order Date
                          </span>

                          <strong>

                            {order.orderDate ||
                              "N/A"}

                          </strong>

                        </div>


                        <div>

                          <FaBox />

                          <span>
                            Cases
                          </span>

                          <strong>

                            {getCases(order)}

                          </strong>

                        </div>


                        <div>

                          <FaRupeeSign />

                          <span>
                            Amount
                          </span>

                          <strong>

                            ₹
                            {getTotal(
                              order
                            ).toLocaleString(
                              "en-IN"
                            )}

                          </strong>

                        </div>

                      </div>



                      {/* CUSTOMER */}

                      <div className="report-customer">


                        <div className="report-customer-icon">

                          <FaUser />

                        </div>


                        <div>

                          <span>
                            Customer / Shop
                          </span>

                          <strong>

                            {
                              order.shopName ||
                              order.customerName ||
                              deliveryDetails.customerName ||
                              "Customer"
                            }

                          </strong>

                        </div>


                        <div>

                          <FaPhone />

                          <span>
                            Phone
                          </span>

                          <strong>

                            {
                              order.phone ||
                              order.phoneNumber ||
                              deliveryDetails.phoneNumber ||
                              "N/A"
                            }

                          </strong>

                        </div>


                        <div>

                          <FaStore />

                          <span>
                            City
                          </span>

                          <strong>

                            {
                              order.city ||
                              deliveryDetails.city ||
                              "N/A"
                            }

                          </strong>

                        </div>

                      </div>



                      {/* PRODUCTS */}

                      {Array.isArray(
                        items
                      ) &&
                        items.length > 0 && (

                          <div className="report-products">


                            <h4>

                              <FaBox />

                              Products

                            </h4>


                            {items.map(
                              (
                                item,
                                itemIndex
                              ) => (


                                <div
                                  className="report-product-row"
                                  key={
                                    itemIndex
                                  }
                                >


                                  <div className="report-product-name">


                                    {item.image ? (

                                      <img
                                        src={
                                          item.image
                                        }
                                        alt={
                                          item.name ||
                                          item.productName ||
                                          "Product"
                                        }
                                      />

                                    ) : (

                                      <div className="report-product-placeholder">

                                        <FaBox />

                                      </div>

                                    )}


                                    <div>

                                      <strong>

                                        {
                                          item.name ||
                                          item.productName ||
                                          "Product"
                                        }

                                      </strong>


                                      {(
                                        item.flavour ||
                                        item.flavor
                                      ) && (

                                        <span>

                                          Flavour:
                                          {" "}
                                          {
                                            item.flavour ||
                                            item.flavor
                                          }

                                        </span>

                                      )}

                                    </div>

                                  </div>


                                  <div>

                                    <span>
                                      Cases
                                    </span>

                                    <strong>

                                      {
                                        item.quantity ||
                                        0
                                      }

                                    </strong>

                                  </div>


                                  <div>

                                    <span>
                                      Selling Price
                                    </span>

                                    <strong>

                                      ₹
                                      {Number(
                                        item.sellingPrice ||
                                        item.price ||
                                        item.mrp ||
                                        0
                                      ).toLocaleString(
                                        "en-IN"
                                      )}

                                    </strong>

                                  </div>


                                </div>

                              )
                            )}

                          </div>

                        )}



                      {/* DELIVERY */}

                      {(deliveryDetails.address ||
                        deliveryDetails.city ||
                        deliveryDetails.pincode) && (

                        <div className="report-delivery">


                          <div className="report-delivery-icon">

                            <FaMapMarkerAlt />

                          </div>


                          <div>

                            <span>
                              Delivery Address
                            </span>


                            <strong>

                              {
                                deliveryDetails.address ||
                                "N/A"
                              }

                            </strong>


                            <p>

                              {
                                deliveryDetails.city ||
                                ""
                              }

                              {" "}

                              {
                                deliveryDetails.pincode ||
                                ""
                              }

                            </p>

                          </div>

                        </div>

                      )}



                      {/* VIEW ORDER */}

                      <div className="report-order-footer">


                        <button
                          onClick={() =>
                            navigate(
                              `/admin/manage-orders/${getOrderId(
                                order
                              )}`
                            )
                          }
                        >

                          <FaEye />

                          View Order

                        </button>

                      </div>


                    </div>

                  );

                }
              )}

            </div>

          )}

        </section>


      </main>

    </div>

  );

}


export default ReportDetails;