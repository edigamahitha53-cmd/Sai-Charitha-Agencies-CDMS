import React, {
  useEffect,
  useState
} from "react";

import {
  useNavigate,
  useParams
} from "react-router-dom";

import {
  FaClipboardList,
  FaShoppingBag,
  FaArrowLeft,
  FaBoxOpen,
  FaCalendarAlt,
  FaCheckCircle,
  FaRupeeSign,
  FaEye,
  FaTimesCircle,
  FaTruck,
  FaExclamationTriangle
} from "react-icons/fa";

import "../assets/styles/myOrder.css";


function MyOrder() {

  const navigate =
    useNavigate();

  const { id } =
    useParams();


  const [orders, setOrders] =
    useState([]);


  const [loading, setLoading] =
    useState(true);


  /* =====================================================
     CANCEL ORDER STATES
  ===================================================== */

  const [cancelOrderId, setCancelOrderId] =
    useState(null);


  /* =====================================================
     GET CURRENT SHOP
  ===================================================== */

  const getCurrentShop = () => {

    const possibleKeys = [

      "loggedInShop",

      "shopUser",

      "currentShop",

      "loggedInUser",

      "currentUser",

      "user",

      "customer"

    ];


    for (
      const key of possibleKeys
    ) {

      try {

        const saved =
          JSON.parse(
            localStorage.getItem(key)
          );


        if (
          saved &&
          typeof saved === "object"
        ) {

          return saved;

        }

      } catch {

        const saved =
          localStorage.getItem(key);


        if (saved) {

          return {
            email: saved
          };

        }

      }

    }


    return null;

  };


  /* =====================================================
     GET SHOP ID
  ===================================================== */

  const getShopId = () => {

    const currentShop =
      getCurrentShop();


    if (!currentShop) {

      return "";

    }


    return (

      currentShop.id ||

      currentShop.shopId ||

      currentShop.customerId ||

      ""

    );

  };


  /* =====================================================
     PARSE JSON VALUE
  ===================================================== */

  const parseJsonValue = (
    value
  ) => {

    if (
      value === null ||
      value === undefined ||
      value === ""
    ) {

      return null;

    }


    if (
      typeof value === "object"
    ) {

      return value;

    }


    try {

      return JSON.parse(value);

    } catch {

      return null;

    }

  };


  /* =====================================================
     GET ORDER ITEMS
  ===================================================== */

  const getOrderItems = (
    order
  ) => {

    const items =
      parseJsonValue(
        order.items
      );


    if (
      Array.isArray(items)
    ) {

      return items;

    }


    return [];

  };


  /* =====================================================
     GET DELIVERY DETAILS
  ===================================================== */

  const getDeliveryDetails = (
    order
  ) => {

    const delivery =
      parseJsonValue(
        order.deliveryDetails
      );


    if (
      delivery &&
      typeof delivery === "object"
    ) {

      return delivery;

    }


    return {};

  };


  /* =====================================================
     GET ORDER ID
  ===================================================== */

  const getOrderId =
    (order) => {

      return (
        order.orderId ||
        order.id ||
        "N/A"
      );

    };


  /* =====================================================
     LOAD ORDERS FROM DATABASE
  ===================================================== */

  useEffect(() => {

    const loadOrders = async () => {

      try {

        setLoading(true);


        const currentShop =
          getCurrentShop();


        if (!currentShop) {

          console.warn(
            "No logged-in shop found."
          );

          setOrders([]);

          return;

        }


        const shopId =
          getShopId();


        if (!shopId) {

          console.warn(
            "Shop ID not found."
          );

          setOrders([]);

          return;

        }


        const response =
          await fetch(
            `http://localhost:8080/api/orders/shop/${shopId}`
          );


        if (!response.ok) {

          throw new Error(
            "Unable to load shop orders"
          );

        }


        const data =
          await response.json();


        setOrders(
          Array.isArray(data)
            ? data
            : []
        );


      } catch (error) {

        console.error(
          "Unable to load orders:",
          error
        );

        setOrders([]);

      } finally {

        setLoading(false);

      }

    };


    loadOrders();

  }, []);


  /* =====================================================
     TOTAL CASES
  ===================================================== */

  const getTotalCases =
    (order) => {

      if (
        order.totalCases !==
        undefined &&
        order.totalCases !==
        null
      ) {

        return Number(
          order.totalCases
        ) || 0;

      }


      const items =
        getOrderItems(order);


      if (
        items.length === 0
      ) {

        return 0;

      }


      return items.reduce(
        (total, item) => {

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


  /* =====================================================
     DELIVERY INFORMATION
  ===================================================== */

  const getDeliveryText =
    (order) => {

      if (
        order.status ===
        "Order Cancelled"
      ) {

        return "Order Cancelled";

      }

      if (
        order.status ===
        "Delivered"
      ) {

        return "Order Delivered";

      }

      return "Expected within 3–5 days";

    };


  /* =====================================================
     CAN CANCEL ORDER
  ===================================================== */

  const canCancelOrder =
    (order) => {

      const status =
        order.status ||
        "Order Received";


      return (
        status !==
          "Order Cancelled" &&
        status !==
          "Delivered" &&
        status !==
          "Out for Delivery"
      );

    };


  /* =====================================================
     SHOW CANCEL CONFIRMATION
  ===================================================== */

  const handleCancelClick =
    (order) => {

      setCancelOrderId(
        getOrderId(order)
      );

    };


  /* =====================================================
     CONFIRM CANCEL ORDER
  ===================================================== */

  const confirmCancelOrder =
    async (order) => {

      const orderId =
        getOrderId(order);


      if (!order.id) {

        alert(
          "Order ID not available."
        );

        return;

      }


      const updatedOrder = {

        orderId:
          order.orderId,

        orderDate:
          order.orderDate,

        status:
          "Order Cancelled",

        items:
          typeof order.items ===
          "string"
            ? order.items
            : JSON.stringify(
                order.items || []
              ),

        totalCases:
          order.totalCases || 0,

        totalItems:
          order.totalItems || 0,

        totalAmount:
          order.totalAmount || 0,

        shopId:
          order.shopId || "",

        customerId:
          order.customerId || "",

        shopName:
          order.shopName || "",

        ownerName:
          order.ownerName || "",

        email:
          order.email || "",

        phone:
          order.phone || "",

        deliveryDetails:
          typeof order.deliveryDetails ===
          "string"
            ? order.deliveryDetails
            : JSON.stringify(
                order.deliveryDetails || {}
              )

      };


      try {

        const response =
          await fetch(
            `http://localhost:8080/api/orders/${order.id}`,
            {
              method: "PUT",

              headers: {
                "Content-Type":
                  "application/json"
              },

              body:
                JSON.stringify(
                  updatedOrder
                )

            }
          );


        if (!response.ok) {

          throw new Error(
            "Unable to cancel order"
          );

        }


        const savedOrder =
          await response.json();


        setOrders(
          (previousOrders) =>
            previousOrders.map(
              (item) =>
                String(item.id) ===
                String(order.id)
                  ? savedOrder
                  : item
            )
        );


        setCancelOrderId(
          null
        );


      } catch (error) {

        console.error(
          "Unable to cancel order:",
          error
        );

        alert(
          "Unable to cancel order."
        );

      }

    };


  /* =====================================================
     CLOSE CANCEL CONFIRMATION
  ===================================================== */

  const closeCancelConfirmation =
    () => {

      setCancelOrderId(null);

    };


  /* =====================================================
     SELECTED ORDER
  ===================================================== */

  const selectedOrder =
    id
      ? orders.find(
          (order) =>
            String(
              getOrderId(order)
            ) ===
            String(id)
        )
      : null;


  /* =====================================================
     ORDER DETAILS PAGE
  ===================================================== */

  if (
    !loading &&
    id &&
    selectedOrder
  ) {

    const selectedItems =
      getOrderItems(
        selectedOrder
      );


    const deliveryDetails =
      getDeliveryDetails(
        selectedOrder
      );


    return (

      <div className="my-orders-page">

        <div className="my-orders-header">

          <div>

            <p className="my-orders-small-title">

              SAI CHARITHA AGENCIES

            </p>


            <h1>

              Order Details

            </h1>


            <p>

              View complete details
              of your order

            </p>

          </div>


          <button
            className="my-orders-back-btn"
            onClick={() =>
              navigate(
                "/my-orders"
              )
            }
          >

            <FaArrowLeft />

            Back

          </button>

        </div>


        <div className="my-orders-container">


          <div className="my-orders-title-row">

            <h2>

              <FaClipboardList />

              &nbsp;

              {getOrderId(
                selectedOrder
              )}

            </h2>

          </div>


          <div className="my-order-card">


            <div className="my-order-card-header">

              <div>

                <p className="my-order-label">

                  ORDER ID

                </p>


                <h3>

                  {getOrderId(
                    selectedOrder
                  )}

                </h3>

              </div>


              <div
                className={
                  selectedOrder.status ===
                  "Order Cancelled"
                    ? "my-order-status cancelled-status"
                    : "my-order-status"
                }
              >

                {selectedOrder.status ===
                "Order Cancelled" ? (
                  <FaTimesCircle />
                ) : (
                  <FaCheckCircle />
                )}

                {selectedOrder.status ||
                  "Order Received"}

              </div>

            </div>


            <div className="my-order-details">


              <div className="my-order-detail">

                <FaCalendarAlt />

                <div>

                  <span>
                    Order Date
                  </span>

                  <strong>

                    {selectedOrder.orderDate ||
                      "N/A"}

                  </strong>

                </div>

              </div>


              <div className="my-order-detail">

                <FaBoxOpen />

                <div>

                  <span>
                    Total Cases
                  </span>

                  <strong>

                    {getTotalCases(
                      selectedOrder
                    )}

                  </strong>

                </div>

              </div>


              <div className="my-order-detail">

                <FaRupeeSign />

                <div>

                  <span>
                    Total Amount
                  </span>

                  <strong>

                    ₹
                    {Number(
                      selectedOrder.totalAmount ||
                      0
                    ).toLocaleString(
                      "en-IN"
                    )}

                  </strong>

                </div>

              </div>

            </div>


            <div className="order-delivery-section">

              <div className="delivery-icon">

                <FaTruck />

              </div>


              <div className="delivery-content">

                <h3>

                  Delivery Information

                </h3>

                <p>

                  {getDeliveryText(
                    selectedOrder
                  )}

                </p>


                {selectedOrder.status !==
                  "Order Cancelled" &&
                  selectedOrder.status !==
                  "Delivered" && (

                    <span>

                      🚚 Your order will
                      normally be delivered
                      within 3–5 days.

                    </span>

                  )}

              </div>

            </div>


            {selectedItems.length >
              0 && (

                <div className="my-order-products">

                  <h4>

                    <FaShoppingBag />

                    &nbsp;

                    Products

                  </h4>


                  {selectedItems.map(
                    (
                      item,
                      itemIndex
                    ) => (

                      <div
                        className="my-order-product"
                        key={
                          itemIndex
                        }
                      >


                        <div className="my-order-product-info">


                          {item.image && (

                            <img
                              src={
                                item.image
                              }
                              alt={
                                item.productName ||
                                item.name ||
                                "Product"
                              }
                            />

                          )}


                          <div>

                            <strong>

                              {item.productName ||
                                item.name ||
                                "Product"}

                            </strong>


                            {item.flavour && (

                              <span>

                                Flavour:
                                {" "}
                                {item.flavour}

                              </span>

                            )}


                            {item.mrp && (

                              <span>

                                MRP:
                                ₹
                                {item.mrp}

                              </span>

                            )}


                            {item.sellingPrice && (

                              <span>

                                Selling Price:
                                {" "}
                                ₹
                                {
                                  item.sellingPrice
                                }
                                {" "}
                                / piece

                              </span>

                            )}


                            {item.piecesPerBox && (

                              <span>

                                Pieces / Box:
                                {" "}
                                {
                                  item.piecesPerBox
                                }

                              </span>

                            )}


                            {item.boxesPerCase && (

                              <span>

                                Boxes / Case:
                                {" "}
                                {
                                  item.boxesPerCase
                                }

                              </span>

                            )}

                          </div>

                        </div>


                        <div className="my-order-product-quantity">

                          <span>
                            Cases
                          </span>

                          <strong>

                            {item.quantity ||
                              0}

                          </strong>

                        </div>

                      </div>

                    )
                  )}

                </div>

              )}


            {cancelOrderId ===
              getOrderId(
                selectedOrder
              ) && (

              <div className="cancel-confirmation">

                <div className="cancel-warning-icon">

                  <FaExclamationTriangle />

                </div>


                <div className="cancel-confirmation-content">

                  <h3>

                    Cancel This Order?

                  </h3>

                  <p>

                    Are you sure you want to
                    cancel this order?

                    <br />

                    This action cannot be
                    undone.

                  </p>


                  <div className="cancel-confirmation-buttons">

                    <button
                      className="cancel-yes-btn"
                      onClick={() =>
                        confirmCancelOrder(
                          selectedOrder
                        )
                      }
                    >

                      <FaTimesCircle />

                      Yes, Cancel Order

                    </button>


                    <button
                      className="cancel-no-btn"
                      onClick={
                        closeCancelConfirmation
                      }
                    >

                      Keep My Order

                    </button>

                  </div>

                </div>

              </div>

            )}


            <div className="my-order-card-footer">

              <span>

                Order Status:

                <strong>

                  {" "}

                  {
                    selectedOrder.status ||
                    "Order Received"
                  }

                </strong>

              </span>


              <div className="order-action-buttons">

                {canCancelOrder(
                  selectedOrder
                ) && (

                  <button
                    className="cancel-order-btn"
                    onClick={() =>
                      handleCancelClick(
                        selectedOrder
                      )
                    }
                  >

                    <FaTimesCircle />

                    Cancel Order

                  </button>

                )}


                <button
                  onClick={() =>
                    navigate(
                      "/my-orders"
                    )
                  }
                >

                  <FaArrowLeft />

                  Back to Orders

                </button>

              </div>

            </div>


          </div>

        </div>

      </div>

    );

  }


  /* =====================================================
     LOADING
  ===================================================== */

  if (loading) {

    return (

      <div className="my-orders-page">

        <div className="my-orders-header">

          <div>

            <p className="my-orders-small-title">

              SAI CHARITHA AGENCIES

            </p>


            <h1>

              My Orders

            </h1>


            <p>

              View your previous orders

            </p>

          </div>


          <button
            className="my-orders-back-btn"
            onClick={() =>
              navigate(
                "/shop-dashboard"
              )
            }
          >

            <FaArrowLeft />

            Back

          </button>

        </div>


        <div className="my-orders-empty">

          <div className="my-orders-empty-icon">

            <FaClipboardList />

          </div>


          <h2>

            Loading Orders...

          </h2>


          <p>

            Please wait while your orders
            are loaded.

          </p>

        </div>

      </div>

    );

  }


  /* =====================================================
     ORDER NOT FOUND
  ===================================================== */

  if (
    id &&
    !selectedOrder
  ) {

    return (

      <div className="my-orders-page">

        <div className="my-orders-header">

          <div>

            <p className="my-orders-small-title">

              SAI CHARITHA AGENCIES

            </p>

            <h1>

              Order Details

            </h1>

          </div>


          <button
            className="my-orders-back-btn"
            onClick={() =>
              navigate(
                "/my-orders"
              )
            }
          >

            <FaArrowLeft />

            Back

          </button>

        </div>


        <div className="my-orders-empty">

          <div className="my-orders-empty-icon">

            <FaClipboardList />

          </div>


          <h2>

            Order Not Found

          </h2>


          <p>

            The requested order
            could not be found.

          </p>


          <button
            onClick={() =>
              navigate(
                "/my-orders"
              )
            }
          >

            <FaClipboardList />

            View My Orders

          </button>

        </div>

      </div>

    );

  }


  /* =====================================================
     EMPTY ORDERS
  ===================================================== */

  if (
    orders.length === 0
  ) {

    return (

      <div className="my-orders-page">


        <div className="my-orders-header">

          <div>

            <p className="my-orders-small-title">

              SAI CHARITHA AGENCIES

            </p>


            <h1>

              My Orders

            </h1>


            <p>

              View your previous orders

            </p>

          </div>


          <button
            className="my-orders-back-btn"
            onClick={() =>
              navigate("/shop-dashboard")
            }
          >

            <FaArrowLeft />

            Back

          </button>

        </div>


        <div className="my-orders-empty">

          <div className="my-orders-empty-icon">

            <FaClipboardList />

          </div>


          <h2>

            No Orders Found

          </h2>


          <p>

            You have not placed
            any orders yet.

          </p>


          <button
            onClick={() =>
              navigate(
                "/products"
              )
            }
          >

            <FaShoppingBag />

            Start Shopping

          </button>

        </div>


      </div>

    );

  }


  /* =====================================================
     ORDER HISTORY
  ===================================================== */

  return (

    <div className="my-orders-page">


      <div className="my-orders-header">

        <div>

          <p className="my-orders-small-title">

            SAI CHARITHA AGENCIES

          </p>


          <h1>

            My Orders

          </h1>


          <p>

            View and track your
            previous orders

          </p>

        </div>


        <button
          className="my-orders-back-btn"
          onClick={() =>
            navigate("/shop-dashboard")
          }
        >

          <FaArrowLeft />

          Back

        </button>

      </div>


      <div className="my-orders-container">


        <div className="my-orders-title-row">

          <h2>

            <FaClipboardList />

            &nbsp;

            Order History

          </h2>


          <span>

            {orders.length}

            {" "}

            Order
            {orders.length >
            1
              ? "s"
              : ""}

          </span>

        </div>


        {orders.map(
          (
            order,
            index
          ) => {

            const items =
              getOrderItems(
                order
              );


            return (

              <div
                className="my-order-card"
                key={
                  getOrderId(
                    order
                  ) ||
                  index
                }
              >


                <div className="my-order-card-header">


                  <div>

                    <p className="my-order-label">

                      ORDER ID

                    </p>


                    <h3>

                      {getOrderId(
                        order
                      )}

                    </h3>

                  </div>


                  <div
                    className={
                      order.status ===
                      "Order Cancelled"
                        ? "my-order-status cancelled-status"
                        : "my-order-status"
                    }
                  >

                    {order.status ===
                    "Order Cancelled" ? (
                      <FaTimesCircle />
                    ) : (
                      <FaCheckCircle />
                    )}

                    {order.status ||
                      "Order Received"}

                  </div>

                </div>


                <div className="my-order-details">


                  <div className="my-order-detail">

                    <FaCalendarAlt />

                    <div>

                      <span>

                        Order Date

                      </span>


                      <strong>

                        {order.orderDate ||
                          "N/A"}

                      </strong>

                    </div>

                  </div>


                  <div className="my-order-detail">

                    <FaBoxOpen />

                    <div>

                      <span>

                        Total Cases

                      </span>


                      <strong>

                        {getTotalCases(
                          order
                        )}

                      </strong>

                    </div>

                  </div>


                  <div className="my-order-detail">

                    <FaRupeeSign />

                    <div>

                      <span>

                        Total Amount

                      </span>


                      <strong>

                        ₹
                        {Number(
                          order.totalAmount ||
                          0
                        ).toLocaleString(
                          "en-IN"
                        )}

                      </strong>

                    </div>

                  </div>

                </div>


                <div className="order-delivery-section">

                  <div className="delivery-icon">

                    <FaTruck />

                  </div>


                  <div className="delivery-content">

                    <h3>

                      Delivery Information

                    </h3>


                    <p>

                      {getDeliveryText(
                        order
                      )}

                    </p>


                    {order.status !==
                      "Order Cancelled" &&
                      order.status !==
                      "Delivered" && (

                        <span>

                          🚚 Normally delivered
                          within 3–5 days.

                        </span>

                      )}

                  </div>

                </div>


                {items.length >
                  0 && (

                  <div className="my-order-products">

                    <h4>

                      <FaShoppingBag />

                      &nbsp;

                      Products

                    </h4>


                    {items.map(
                      (
                        item,
                        itemIndex
                      ) => (

                        <div
                          className="my-order-product"
                          key={
                            itemIndex
                          }
                        >


                          <div className="my-order-product-info">


                            {item.image && (

                              <img
                                src={
                                  item.image
                                }
                                alt={
                                  item.productName ||
                                  item.name ||
                                  "Product"
                                }
                              />

                            )}


                            <div>

                              <strong>

                                {item.productName ||
                                  item.name ||
                                  "Product"}

                              </strong>


                              {item.flavour && (

                                <span>

                                  Flavour:
                                  {" "}
                                  {
                                    item.flavour
                                  }

                                </span>

                              )}


                              {item.mrp && (

                                <span>

                                  MRP:
                                  ₹
                                  {
                                    item.mrp
                                  }

                                </span>

                              )}


                              {item.sellingPrice && (

                                <span>

                                  Selling Price:
                                  {" "}
                                  ₹
                                  {
                                    item.sellingPrice
                                  }
                                  {" "}
                                  / piece

                                </span>

                              )}

                            </div>

                          </div>


                          <div className="my-order-product-quantity">

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

                        </div>

                      )
                    )}

                  </div>

                )}


                {cancelOrderId ===
                  getOrderId(order) && (

                  <div className="cancel-confirmation">

                    <div className="cancel-warning-icon">

                      <FaExclamationTriangle />

                    </div>


                    <div className="cancel-confirmation-content">

                      <h3>

                        Cancel This Order?

                      </h3>


                      <p>

                        Are you sure you want to
                        cancel this order?

                        <br />

                        This action cannot be
                        undone.

                      </p>


                      <div className="cancel-confirmation-buttons">

                        <button
                          className="cancel-yes-btn"
                          onClick={() =>
                            confirmCancelOrder(
                              order
                            )
                          }
                        >

                          <FaTimesCircle />

                          Yes, Cancel Order

                        </button>


                        <button
                          className="cancel-no-btn"
                          onClick={
                            closeCancelConfirmation
                          }
                        >

                          Keep My Order

                        </button>

                      </div>

                    </div>

                  </div>

                )}


                <div className="my-order-card-footer">


                  <span>

                    Order Status:

                    <strong>

                      {" "}

                      {
                        order.status ||
                        "Order Received"
                      }

                    </strong>

                  </span>


                  <div className="order-action-buttons">

                    {canCancelOrder(
                      order
                    ) && (

                      <button
                        className="cancel-order-btn"
                        onClick={() =>
                          handleCancelClick(
                            order
                          )
                        }
                      >

                        <FaTimesCircle />

                        Cancel Order

                      </button>

                    )}


                    <button
                      onClick={() =>
                        navigate(
                          `/my-orders/${getOrderId(
                            order
                          )}`
                        )
                      }
                    >

                      <FaEye />

                      View Details

                    </button>

                  </div>


                </div>


              </div>

            );

          }
        )}

      </div>

    </div>

  );

}


export default MyOrder;