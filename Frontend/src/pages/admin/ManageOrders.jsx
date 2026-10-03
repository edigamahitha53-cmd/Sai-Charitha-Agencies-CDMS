import React, { useEffect, useState } from "react";

import {
  FaArrowLeft,
  FaSearch,
  FaTimes,
  FaShoppingCart,
  FaStore,
  FaUser,
  FaPhone,
  FaEnvelope,
  FaCalendarAlt,
  FaEye,
  FaTrash,
  FaCheckCircle,
  FaClock,
  FaBox,
  FaRupeeSign
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";

import "./ManageOrders.css";


function ManageOrders() {

  const navigate = useNavigate();


  /* =========================================
     ORDERS
  ========================================= */

  const [orders, setOrders] = useState([]);


  const [loading, setLoading] =
    useState(true);


  /* =========================================
     SEARCH
  ========================================= */

  const [searchText, setSearchText] =
    useState("");


  /* =========================================
     VIEW ORDER
  ========================================= */

  const [selectedOrder, setSelectedOrder] =
    useState(null);


  /* =========================================
     STATUS FILTER
  ========================================= */

  const [statusFilter, setStatusFilter] =
    useState("All");


  /* =========================================
     LOAD ORDERS FROM DATABASE
  ========================================= */

  useEffect(() => {

    const loadOrders = async () => {

      try {

        setLoading(true);

        const response =
          await fetch(
            "https://sai-charitha-agencies-cdms.onrender.com/api/orders"
          );


        if (!response.ok) {

          throw new Error(
            "Unable to load orders"
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


  /* =========================================
     PARSE JSON VALUE
  ========================================= */

  const parseJsonValue = (value) => {

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


  /* =========================================
     GET DELIVERY DETAILS
  ========================================= */

  const getDeliveryDetails = (order) => {

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


  /* =========================================
     GET ORDER ITEMS
  ========================================= */

  const getOrderItems = (order) => {

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


  /* =========================================
     GET SHOP NAME
  ========================================= */

  const getShopName = (order) => {

    const deliveryDetails =
      getDeliveryDetails(order);


    return (

      order.shopName ||

      order.customer?.shopName ||

      order.shop?.shopName ||

      order.user?.shopName ||

      deliveryDetails.customerName ||

      "Shop"

    );

  };


  /* =========================================
     GET OWNER NAME
  ========================================= */

  const getOwnerName = (order) => {

    return (

      order.ownerName ||

      order.customer?.ownerName ||

      order.shop?.ownerName ||

      order.user?.ownerName ||

      "Not Available"

    );

  };


  /* =========================================
     GET PHONE
  ========================================= */

  const getPhone = (order) => {

    const deliveryDetails =
      getDeliveryDetails(order);


    return (

      order.phone ||

      order.mobile ||

      order.customer?.phone ||

      order.shop?.phone ||

      order.user?.phone ||

      deliveryDetails.phoneNumber ||

      "Not Available"

    );

  };


  /* =========================================
     GET EMAIL
  ========================================= */

  const getEmail = (order) => {

    return (

      order.email ||

      order.customer?.email ||

      order.shop?.email ||

      order.user?.email ||

      "Not Available"

    );

  };


  /* =========================================
     GET DATE
  ========================================= */

  const getDate = (order) => {

    return (

      order.orderDate ||

      order.createdAt ||

      order.date ||

      "Not Available"

    );

  };


  /* =========================================
     GET ORDER ID
  ========================================= */

  const getOrderId = (order, index) => {

    return (

      order.orderId ||

      order.id ||

      `ORD-${index + 1}`

    );

  };


  /* =========================================
     GET STATUS
  ========================================= */

  const getStatus = (order) => {

    return (

      order.status ||

      "Order Received"

    );

  };


  /* =========================================
     GET TOTAL
  ========================================= */

  const getTotal = (order) => {

    if (
      order.totalAmount !== undefined
    ) {

      return Number(
        order.totalAmount
      ) || 0;

    }


    if (
      order.total !== undefined
    ) {

      return Number(
        order.total
      ) || 0;

    }


    if (
      order.amount !== undefined
    ) {

      return Number(
        order.amount
      ) || 0;

    }


    return 0;

  };


  /* =========================================
     UPDATE STATUS IN DATABASE
  ========================================= */

  const handleStatusChange = async (
    id,
    status
  ) => {

    const existingOrder =
      orders.find(
        (order) =>
          String(order.id) ===
            String(id) ||
          String(order.orderId) ===
            String(id)
      );


    if (!existingOrder) {

      return;

    }


    const updatedOrder = {

      orderId:
        existingOrder.orderId,

      orderDate:
        existingOrder.orderDate,

      status:
        status,

      items:
        typeof existingOrder.items ===
        "string"
          ? existingOrder.items
          : JSON.stringify(
              existingOrder.items || []
            ),

      totalCases:
        existingOrder.totalCases || 0,

      totalItems:
        existingOrder.totalItems || 0,

      totalAmount:
        existingOrder.totalAmount || 0,

      shopId:
        existingOrder.shopId || "",

      customerId:
        existingOrder.customerId || "",

      shopName:
        existingOrder.shopName || "",

      ownerName:
        existingOrder.ownerName || "",

      email:
        existingOrder.email || "",

      phone:
        existingOrder.phone || "",

      deliveryDetails:
        typeof existingOrder.deliveryDetails ===
        "string"
          ? existingOrder.deliveryDetails
          : JSON.stringify(
              existingOrder.deliveryDetails || {}
            )

    };


    try {

      const response =
        await fetch(
          `https://sai-charitha-agencies-cdms.onrender.com/api/orders/${existingOrder.id}`,
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
          "Unable to update order status"
        );

      }


      const savedOrder =
        await response.json();


      setOrders(
        (previousOrders) =>
          previousOrders.map(
            (order) =>
              String(order.id) ===
              String(existingOrder.id)
                ? savedOrder
                : order
          )
      );


      if (
        selectedOrder &&
        String(selectedOrder.id) ===
        String(existingOrder.id)
      ) {

        setSelectedOrder(
          savedOrder
        );

      }


    } catch (error) {

      console.error(
        "Unable to update order:",
        error
      );

      alert(
        "Unable to update order status."
      );

    }

  };


  /* =========================================
     DELETE ORDER FROM DATABASE
  ========================================= */

  const handleDeleteOrder = async (id) => {

    const confirmDelete =
      window.confirm(
        "Are you sure you want to delete this order?"
      );


    if (!confirmDelete) {

      return;

    }


    try {

      const order =
        orders.find(
          (item) =>
            String(item.id) ===
            String(id) ||
            String(item.orderId) ===
            String(id)
        );


      if (!order) {

        return;

      }


      const response =
        await fetch(
          `https://sai-charitha-agencies-cdms.onrender.com/api/orders/${order.id}`,
          {
            method: "DELETE"
          }
        );


      if (!response.ok) {

        throw new Error(
          "Unable to delete order"
        );

      }


      setOrders(
        (previousOrders) =>
          previousOrders.filter(
            (item) =>
              String(item.id) !==
              String(order.id)
          )
      );


      setSelectedOrder(null);


    } catch (error) {

      console.error(
        "Unable to delete order:",
        error
      );

      alert(
        "Unable to delete order."
      );

    }

  };


  /* =========================================
     FILTER ORDERS
  ========================================= */

  const filteredOrders =
    orders.filter((order) => {

      const search =
        searchText.toLowerCase();


      const matchesSearch =

        String(
          getShopName(order)
        )
          .toLowerCase()
          .includes(search)

        ||

        String(
          getOwnerName(order)
        )
          .toLowerCase()
          .includes(search)

        ||

        String(
          getPhone(order)
        )
          .toLowerCase()
          .includes(search)

        ||

        String(
          getEmail(order)
        )
          .toLowerCase()
          .includes(search)

        ||

        String(
          getOrderId(order, 0)
        )
          .toLowerCase()
          .includes(search);


      const matchesStatus =

        statusFilter === "All" ||

        getStatus(order) ===
        statusFilter;


      return (
        matchesSearch &&
        matchesStatus
      );

    });


  /* =========================================
     TOTAL SALES
  ========================================= */

  const totalSales =
    orders.reduce(
      (total, order) =>
        total +
        getTotal(order),
      0
    );


  /* =========================================
     PENDING ORDERS
  ========================================= */

  const pendingOrders =
    orders.filter(
      (order) =>
        getStatus(order) ===
          "Order Received" ||

        getStatus(order) ===
          "Confirmed" ||

        getStatus(order) ===
          "Out for Delivery"
    ).length;


  /* =========================================
     RENDER
  ========================================= */

  return (

    <div className="manage-orders-page">


      {/* =====================================
          HEADER
      ===================================== */}

      <div className="manage-orders-header">


        <div className="manage-orders-heading">


          <button
            className="order-back-button"
            onClick={() =>
              navigate("/admin-dashboard")
            }
          >

            <FaArrowLeft />

          </button>


          <div>

            <p className="manage-orders-small-title">

              SAI CHARITHA AGENCIES

            </p>


            <h1>

              Manage Orders

            </h1>


            <p>

              View and manage customer orders

            </p>

          </div>


        </div>



        {/* =================================
            SUMMARY
        ================================= */}

        <div className="orders-summary">


          <div className="order-summary-box">

            <FaShoppingCart />

            <div>

              <strong>
                {orders.length}
              </strong>

              <span>
                Orders
              </span>

            </div>

          </div>


          <div className="order-summary-box">

            <FaClock />

            <div>

              <strong>
                {pendingOrders}
              </strong>

              <span>
                Pending
              </span>

            </div>

          </div>


          <div className="order-summary-box">

            <FaRupeeSign />

            <div>

              <strong>
                ₹{totalSales.toFixed(2)}
              </strong>

              <span>
                Total
              </span>

            </div>

          </div>


        </div>


      </div>



      {/* =====================================
          TOOLBAR
      ===================================== */}

      <div className="manage-orders-toolbar">


        <div className="order-search-box">

          <FaSearch />


          <input

            type="text"

            placeholder="Search shop, owner, phone or order ID..."

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



        {/* STATUS FILTER */}

        <div className="order-status-filter">

          <button
            className={
              statusFilter === "All"
                ? "active"
                : ""
            }
            onClick={() =>
              setStatusFilter("All")
            }
          >
            All
          </button>


          <button
            className={
              statusFilter === "Order Received"
                ? "active"
                : ""
            }
            onClick={() =>
              setStatusFilter("Order Received")
            }
          >
            New Orders
          </button>


          <button
            className={
              statusFilter === "Confirmed"
                ? "active"
                : ""
            }
            onClick={() =>
              setStatusFilter("Confirmed")
            }
          >
            Confirmed
          </button>


          <button
            className={
              statusFilter === "Out for Delivery"
                ? "active"
                : ""
            }
            onClick={() =>
              setStatusFilter("Out for Delivery")
            }
          >
            Out for Delivery
          </button>


          <button
            className={
              statusFilter === "Delivered"
                ? "active"
                : ""
            }
            onClick={() =>
              setStatusFilter("Delivered")
            }
          >
            Delivered
          </button>

        </div>


      </div>



      {/* =====================================
          COUNT
      ===================================== */}

      <div className="orders-count">

        <FaShoppingCart />

        Showing{" "}
        <strong>
          {filteredOrders.length}
        </strong>{" "}
        orders

      </div>



      {/* =====================================
          LOADING
      ===================================== */}

      {loading ? (

        <div className="orders-empty">

          <div className="orders-empty-icon">

            <FaShoppingCart />

          </div>

          <h2>

            Loading Orders...

          </h2>

          <p>

            Please wait while orders are loaded.

          </p>

        </div>

      ) : filteredOrders.length === 0 ? (

        <div className="orders-empty">


          <div className="orders-empty-icon">

            <FaShoppingCart />

          </div>


          <h2>

            No Orders Found

          </h2>


          <p>

            {searchText

              ? "Try another search."

              : "Customer orders will appear here."

            }

          </p>


        </div>

      ) : (


        /* ===================================
           ORDERS GRID
        =================================== */

        <div className="orders-grid">


          {filteredOrders.map(
            (order, index) => {


              const deliveryDetails =
                getDeliveryDetails(
                  order
                );


              return (

                <div
                  className="order-card"
                  key={
                    order.id ||
                    order.orderId ||
                    index
                  }
                >


                  {/* ==========================
                      TOP
                  ========================== */}

                  <div className="order-card-top">


                    <div className="order-icon">

                      <FaShoppingCart />

                    </div>


                    <div className="order-heading-info">

                      <span>
                        ORDER
                      </span>

                      <h2>

                        {getOrderId(
                          order,
                          index
                        )}

                      </h2>

                    </div>


                    <div
                      className={
                        `order-status ${getStatus(order)
                          .toLowerCase()
                          .replace(
                            " ",
                            "-"
                          )}`
                      }
                    >

                      <FaCheckCircle />

                      {getStatus(order)}

                    </div>


                  </div>



                  {/* ==========================
                      SHOP
                  ========================== */}

                  <div className="order-shop-section">


                    <div className="order-shop-icon">

                      <FaStore />

                    </div>


                    <div>

                      <span>
                        CUSTOMER SHOP
                      </span>


                      <strong>
                        {getShopName(order)}
                      </strong>

                    </div>


                  </div>



                  {/* ==========================
                      CUSTOMER
                  ========================== */}

                  <div className="order-customer-details">


                    <div>

                      <FaUser />

                      <span>
                        {getOwnerName(order)}
                      </span>

                    </div>


                    <div>

                      <FaPhone />

                      <span>
                        {getPhone(order)}
                      </span>

                    </div>


                  </div>



                  {/* ==========================
                      ORDER TOTAL
                  ========================== */}

                  <div className="order-total-section">


                    <div>

                      <span>
                        TOTAL AMOUNT
                      </span>


                      <strong>
                        ₹{getTotal(order).toFixed(2)}
                      </strong>

                    </div>


                    <div className="order-date">

                      <FaCalendarAlt />

                      {getDate(order)}

                    </div>


                  </div>



                  {/* ==========================
                      ACTIONS
                  ========================== */}

                  <div className="order-card-footer">


                    <button
                      className="order-view-button"
                      onClick={() =>
                        setSelectedOrder(
                          order
                        )
                      }
                    >

                      <FaEye />

                      View

                    </button>


                    <select
                      value={
                        getStatus(order)
                      }
                      onChange={(event) =>
                        handleStatusChange(
                          order.id,
                          event.target.value
                        )
                      }
                    >

                      <option value="Order Received">
                        Order Received
                      </option>

                      <option value="Confirmed">
                        Confirmed
                      </option>

                      <option value="Out for Delivery">
                        Out for Delivery
                      </option>

                      <option value="Delivered">
                        Delivered
                      </option>

                      <option value="Order Cancelled">
                        Order Cancelled
                      </option>

                    </select>


                    <button
                      className="order-delete-button"
                      onClick={() =>
                        handleDeleteOrder(
                          order.id
                        )
                      }
                    >

                      <FaTrash />

                    </button>


                  </div>


                </div>

              );

            }
          )}

        </div>

      )}



      {/* =====================================
          ORDER MODAL
      ===================================== */}

      {selectedOrder && (

        <div
          className="order-modal-overlay"
          onMouseDown={(event) => {

            if (
              event.target ===
              event.currentTarget
            ) {

              setSelectedOrder(null);

            }

          }}
        >


          <div className="order-modal">


            {/* HEADER */}

            <div className="order-modal-header">


              <div>

                <span>
                  ORDER DETAILS
                </span>


                <h2>

                  {getOrderId(
                    selectedOrder,
                    0
                  )}

                </h2>

              </div>


              <button
                onClick={() =>
                  setSelectedOrder(null)
                }
              >

                <FaTimes />

              </button>


            </div>



            {/* BODY */}

            <div className="order-modal-body">


              {/* CUSTOMER */}

              <div className="order-modal-section">


                <h3>

                  <FaStore />

                  Customer Details

                </h3>


                <div className="order-modal-info">


                  <div>

                    <span>
                      Shop Name
                    </span>

                    <strong>
                      {getShopName(
                        selectedOrder
                      )}
                    </strong>

                  </div>


                  <div>

                    <span>
                      Owner Name
                    </span>

                    <strong>
                      {getOwnerName(
                        selectedOrder
                      )}
                    </strong>

                  </div>


                  <div>

                    <span>
                      Phone
                    </span>

                    <strong>
                      {getPhone(
                        selectedOrder
                      )}
                    </strong>

                  </div>


                  <div>

                    <span>
                      Email
                    </span>

                    <strong>
                      {getEmail(
                        selectedOrder
                      )}
                    </strong>

                  </div>


                  <div>

                    <span>
                      Delivery Address
                    </span>

                    <strong>
                      {
                        getDeliveryDetails(
                          selectedOrder
                        ).address ||
                        "Not Available"
                      }
                    </strong>

                  </div>


                  <div>

                    <span>
                      City
                    </span>

                    <strong>
                      {
                        getDeliveryDetails(
                          selectedOrder
                        ).city ||
                        "Not Available"
                      }
                    </strong>

                  </div>


                  <div>

                    <span>
                      Pincode
                    </span>

                    <strong>
                      {
                        getDeliveryDetails(
                          selectedOrder
                        ).pincode ||
                        "Not Available"
                      }
                    </strong>

                  </div>

                </div>


              </div>



              {/* ORDER INFORMATION */}

              <div className="order-modal-section">


                <h3>

                  <FaBox />

                  Order Information

                </h3>


                <div className="order-modal-info">


                  <div>

                    <span>
                      Order Date
                    </span>

                    <strong>
                      {getDate(
                        selectedOrder
                      )}
                    </strong>

                  </div>


                  <div>

                    <span>
                      Status
                    </span>

                    <strong>
                      {getStatus(
                        selectedOrder
                      )}
                    </strong>

                  </div>


                  <div>

                    <span>
                      Total Amount
                    </span>

                    <strong className="modal-total">

                      ₹
                      {getTotal(
                        selectedOrder
                      ).toFixed(2)}

                    </strong>

                  </div>

                </div>


              </div>



              {/* PRODUCTS */}

              {getOrderItems(
                selectedOrder
              ).length > 0 && (

                <div className="order-modal-section">


                  <h3>

                    <FaBox />

                    Ordered Products

                  </h3>


                  <div className="order-products-list">


                    {getOrderItems(
                      selectedOrder
                    ).map(
                      (item, index) => (


                        <div
                          className="order-product-row"
                          key={index}
                        >


                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "16px"
                            }}
                          >

                            {
                              (
                                item.image ||
                                item.imageUrl ||
                                item.productImage ||
                                item.imagePath
                              ) && (

                                <img
                                  src={
                                    item.image ||
                                    item.imageUrl ||
                                    item.productImage ||
                                    item.imagePath
                                  }
                                  alt={
                                    item.productName ||
                                    item.name ||
                                    "Product"
                                  }
                                  style={{
                                    width: "64px",
                                    height: "64px",
                                    objectFit: "contain",
                                    borderRadius: "8px"
                                  }}
                                />

                              )
                            }

                            <div>

                              <strong>

                                {
                                  item.productName ||
                                  item.name ||
                                  "Product"
                                }

                              </strong>


                            <span>

                              Flavour:{" "}

                              {
                                item.flavour ||
                                item.flavor ||
                                item.selectedFlavour ||
                                "Not Available"
                              }

                            </span>


                            <span>

                              MRP: ₹
                              {
                                Number(
                                  item.mrp ||
                                  item.selectedMrp ||
                                  item.MRP ||
                                  0
                                ).toFixed(2)
                              }

                            </span>


                            <span>

                              Selling Price: ₹
                              {
                                Number(
                                  item.sellingPrice ||
                                  item.salePrice ||
                                  item.pricePerPiece ||
                                  item.price ||
                                  0
                                ).toFixed(2)
                              } / piece

                            </span>


                            <span>

                              Cases:{" "}

                              {
                                item.cases ||
                                item.caseQuantity ||
                                item.numberOfCases ||
                                item.quantity ||
                                item.boxes ||
                                item.boxQuantity ||
                                1
                              }

                            </span>

                            </div>

                          </div>


                          <strong>

                            ₹
                            {
                              Number(
                                item.totalAmount ||
                                item.total ||
                                item.itemTotal ||
                                (
                                  Number(
                                    item.sellingPrice ||
                                    item.salePrice ||
                                    item.pricePerPiece ||
                                    item.price ||
                                    0
                                  ) *
                                  Number(
                                    item.quantity ||
                                    item.boxes ||
                                    item.boxQuantity ||
                                    item.cases ||
                                    1
                                  )
                                )
                              ).toFixed(2)
                            }

                          </strong>


                        </div>

                      )
                    )}

                  </div>


                </div>

              )}


            </div>



            {/* FOOTER */}

            <div className="order-modal-footer">


              <button
                onClick={() =>
                  setSelectedOrder(null)
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


export default ManageOrders;
