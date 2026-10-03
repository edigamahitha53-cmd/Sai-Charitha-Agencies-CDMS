import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import {
  FaShoppingCart,
  FaTrash,
  FaMinus,
  FaPlus,
  FaArrowLeft,
  FaClipboardList,
  FaMapMarkerAlt,
  FaUser,
  FaMobileAlt,
  FaBuilding,
  FaMapPin,
  FaBox,
  FaBoxes
} from "react-icons/fa";

import "../assets/styles/orderCart.css";

function OrderCart() {

  const navigate = useNavigate();

  /* =====================================================
     CART
  ===================================================== */

  const [cartItems, setCartItems] =
    useState([]);

  const [cartLoaded, setCartLoaded] =
    useState(false);

  /* =====================================================
     DELIVERY DETAILS
  ===================================================== */

  const [deliveryDetails, setDeliveryDetails] =
    useState({

      customerName: "",

      phoneNumber: "",

      address: "",

      city: "",

      pincode: ""

    });

  /* =====================================================
     LOAD CART
  ===================================================== */

  useEffect(() => {

    const savedCart =
      JSON.parse(
        localStorage.getItem(
          "orderCart"
        )
      ) || [];

    setCartItems(
      savedCart
    );

    setCartLoaded(
      true
    );

  }, []);

  /* =====================================================
     SAVE CART
  ===================================================== */

  useEffect(() => {

    if (!cartLoaded) {

      return;

    }

    localStorage.setItem(

      "orderCart",

      JSON.stringify(
        cartItems
      )

    );

  }, [
    cartItems,
    cartLoaded
  ]);

  /* =====================================================
     DELIVERY INPUT
  ===================================================== */

  const handleDeliveryChange =
    (event) => {

      const {
        name,
        value
      } = event.target;

      setDeliveryDetails(
        (previousDetails) => ({

          ...previousDetails,

          [name]:
            value

        })
      );

    };

  /* =====================================================
     SAFE NUMBER
  ===================================================== */

  const getNumber =
    (
      value,
      defaultValue = 0
    ) => {

      if (
        value === null ||
        value === undefined ||
        value === ""
      ) {

        return defaultValue;

      }

      const cleanedValue =
        String(value)
          .replace("₹", "")
          .replace(/,/g, "")
          .trim();

      const numberValue =
        Number(
          cleanedValue
        );

      return Number.isNaN(
        numberValue
      )

        ?

        defaultValue

        :

        numberValue;

    };

  /* =====================================================
     GET SELLING PRICE
  ===================================================== */

  const getSellingPrice =
    (item) => {

      return getNumber(

        item.sellingPrice ||

        item.price ||

        item.mrp ||

        0

      );

    };

  /* =====================================================
     ITEM TOTAL

     BOX:

     Selling Price
     × Pieces / Box
     × Quantity

     CASE:

     Selling Price
     × Pieces / Box
     × Boxes / Case
     × Quantity
  ===================================================== */

  const calculateItemTotal =
    (item) => {

      const sellingPrice =
        getSellingPrice(
          item
        );

      const quantity =
        getNumber(
          item.quantity,
          1
        );

      const piecesPerBox =
        getNumber(
          item.piecesPerBox,
          1
        );

      const boxesPerCase =
        getNumber(
          item.boxesPerCase,
          1
        );

      /*
       * Old cart items do not have
       * packingType.
       *
       * Therefore we treat them
       * as Case to avoid breaking
       * existing orders.
       */

      const packingType =
        item.packingType ||
        "Case";

      if (
        packingType === "Box"
      ) {

        return (

          sellingPrice *

          piecesPerBox *

          quantity

        );

      }

      return (

        sellingPrice *

        piecesPerBox *

        boxesPerCase *

        quantity

      );

    };

  /* =====================================================
     GRAND TOTAL
  ===================================================== */

  const grandTotal =
    cartItems.reduce(

      (total, item) => {

        return (

          total +

          calculateItemTotal(
            item
          )

        );

      },

      0

    );

  /* =====================================================
     TOTAL CASES
  ===================================================== */

  const totalCases =
    cartItems.reduce(

      (total, item) => {

        const packingType =
          item.packingType ||
          "Case";

        if (
          packingType !== "Case"
        ) {

          return total;

        }

        return (

          total +

          getNumber(
            item.quantity,
            1
          )

        );

      },

      0

    );

  /* =====================================================
     TOTAL BOXES
  ===================================================== */

  const totalBoxes =
    cartItems.reduce(

      (total, item) => {

        const packingType =
          item.packingType ||
          "Case";

        const quantity =
          getNumber(
            item.quantity,
            1
          );

        if (
          packingType === "Box"
        ) {

          return (
            total +
            quantity
          );

        }

        return (

          total +

          (
            quantity *
            getNumber(
              item.boxesPerCase,
              1
            )
          )

        );

      },

      0

    );

  /* =====================================================
     UPDATE QUANTITY
  ===================================================== */

  const updateQuantity =
    (
      index,
      change
    ) => {

      setCartItems(
        (previousItems) => {

          const updatedItems =
            [
              ...previousItems
            ];

          const currentQuantity =
            getNumber(

              updatedItems[
                index
              ].quantity,

              1

            );

          const newQuantity =
            currentQuantity +
            change;

          if (
            newQuantity <= 0
          ) {

            updatedItems.splice(
              index,
              1
            );

            return updatedItems;

          }

          updatedItems[
            index
          ] = {

            ...updatedItems[
              index
            ],

            quantity:
              newQuantity

          };

          return updatedItems;

        }

      );

    };

  /* =====================================================
     REMOVE ITEM
  ===================================================== */

  const removeItem =
    (index) => {

      setCartItems(
        (previousItems) => {

          return previousItems.filter(

            (
              _,
              itemIndex
            ) =>

              itemIndex !==
              index

          );

        }

      );

    };

  /* =====================================================
     CLEAR CART
  ===================================================== */

  const clearCart =
    () => {

      setCartItems(
        []
      );

      localStorage.removeItem(
        "orderCart"
      );

    };

  /* =====================================================
     GET CURRENT SHOP
  ===================================================== */

  const getCurrentShop =
    () => {

      const possibleKeys = [

        "loggedInShop",

        "currentShop",

        "loggedInUser",

        "currentUser",

        "shopUser",

        "user",

        "customer"

      ];

      for (
        const key of
        possibleKeys
      ) {

        try {

          const saved =
            JSON.parse(
              localStorage.getItem(
                key
              )
            );

          if (
            saved &&
            typeof saved ===
            "object"
          ) {

            return saved;

          }

        } catch {

          const saved =
            localStorage.getItem(
              key
            );

          if (saved) {

            return {

              email:
                saved

            };

          }

        }

      }

      return null;

    };

  /* =====================================================
     GET SHOP IDENTIFIER
  ===================================================== */

  const getShopIdentifier =
    () => {

      const shop =
        getCurrentShop();

      if (!shop) {

        return "";

      }

      return (

        shop.id ||

        shop.customerId ||

        shop.shopId ||

        shop.email ||

        shop.mobile ||

        shop.phone ||

        shop.phoneNumber ||

        shop.shopName ||

        ""

      );

    };

  /* =====================================================
     GET SHOP INFORMATION
  ===================================================== */

  const getShopInformation =
    () => {

      const shop =
        getCurrentShop();

      if (!shop) {

        return {

          shopId: "",

          shopName: "",

          ownerName: "",

          email: "",

          phone: "",

          customerId: "",

          id: ""

        };

      }

      return {

        shopId:

          shop.id ||

          shop.customerId ||

          shop.shopId ||

          shop.email ||

          shop.mobile ||

          shop.phone ||

          shop.phoneNumber ||

          shop.shopName ||

          "",

        shopName:

          shop.shopName ||

          shop.name ||

          shop.customerName ||

          "",

        ownerName:

          shop.ownerName ||

          shop.owner ||

          shop.fullName ||

          "",

        email:

          shop.email ||

          "",

        phone:

          shop.phone ||

          shop.mobile ||

          shop.phoneNumber ||

          "",

        customerId:

          shop.customerId ||

          "",

        id:

          shop.id ||

          ""

      };

    };

  /* =====================================================
     PLACE ORDER
  ===================================================== */

  const handlePlaceOrder =
    async () => {

      if (
        cartItems.length === 0
      ) {

        return;

      }

      /* =================================================
         LOGIN CHECK
      ================================================= */

      const currentShop =
        getCurrentShop();

      if (!currentShop) {

        alert(
          "Please login before placing an order."
        );

        navigate(
          "/login"
        );

        return;

      }

      const shopInformation =
        getShopInformation();

      const shopIdentifier =
        getShopIdentifier();

      const orderId =
        "ORD-" +
        Date.now();

      /* =================================================
         CURRENT INDIAN DATE & TIME
      ================================================= */

      const orderDate =
        new Date().toLocaleString(
          "en-IN",
          {
            timeZone:
              "Asia/Kolkata",

            day:
              "2-digit",

            month:
              "2-digit",

            year:
              "numeric",

            hour:
              "2-digit",

            minute:
              "2-digit",

            second:
              "2-digit",

            hour12:
              true

          }
        );

      const calculatedTotalAmount =
        cartItems.reduce(

          (total, item) => {

            return (

              total +

              calculateItemTotal(
                item
              )

            );

          },

          0

        );

      const calculatedTotalCases =
        cartItems.reduce(

          (total, item) => {

            const packingType =
              item.packingType ||
              "Case";

            if (
              packingType !==
              "Case"
            ) {

              return total;

            }

            return (

              total +

              getNumber(
                item.quantity,
                1
              )

            );

          },

          0

        );

      /* =================================================
         CREATE ORDER
      ================================================= */

      const newOrder = {

        orderId:
          orderId,

        orderDate:
          orderDate,

        status:
          "Order Received",

        /*
         * Backend Order.java stores items
         * as LONGTEXT.
         */

        items:
          JSON.stringify(
            cartItems
          ),

        totalCases:
          calculatedTotalCases,

        totalItems:
          cartItems.length,

        totalAmount:
          calculatedTotalAmount,

        /*
         * Backend Order.java stores
         * deliveryDetails as LONGTEXT.
         */

        deliveryDetails:
          JSON.stringify(
            deliveryDetails
          ),

        /* =================================================
           SHOP INFORMATION
        ================================================= */

        shopId:

          String(
            shopInformation.shopId ||
            shopIdentifier ||
            ""
          ),

        customerId:

          String(
            shopInformation.customerId ||
            shopInformation.shopId ||
            shopIdentifier ||
            ""
          ),

        shopName:

          shopInformation.shopName ||
          deliveryDetails.customerName,

        ownerName:

          shopInformation.ownerName ||
          "",

        email:

          shopInformation.email ||
          "",

        phone:

          shopInformation.phone ||
          deliveryDetails.phoneNumber

      };

      /* =================================================
         SAVE ORDER TO DATABASE
      ================================================= */

      try {

        const response =
          await fetch(
            "http://localhost:8080/api/orders",
            {
              method: "POST",

              headers: {
                "Content-Type":
                  "application/json"
              },

              body:
                JSON.stringify(
                  newOrder
                )

            }
          );

        if (!response.ok) {

          const errorText =
            await response.text();

          console.error(
            "Order save failed:",
            errorText
          );

          let errorMessage =
            "Unable to place order. Please try again.";

          try {

            const errorData =
              JSON.parse(errorText);

            if (
              errorData.message
            ) {

              errorMessage =
                errorData.message;

            }

          } catch (parseError) {

            console.error(
              "Error parsing backend message:",
              parseError
            );

          }

          alert(
            errorMessage
          );

          return;

        }

        const savedOrder =
          await response.json();

        /* =================================================
           CLEAR CART
        ================================================= */

        localStorage.removeItem(
          "orderCart"
        );

        setCartItems(
          []
        );

        /* =================================================
           OPEN CONFIRMATION
        ================================================= */

        navigate(

          "/order-confirmation",

          {

            state: {

              order:
                savedOrder

            }

          }

        );

      } catch (error) {

        console.error(
          "Place order error:",
          error
        );

        alert(
          "Unable to connect to server. Please make sure the backend is running."
        );

      }

    };

  /* =====================================================
     EMPTY CART
  ===================================================== */

  if (
    cartItems.length === 0
  ) {

    return (

      <div className="order-cart-page">

        <header className="order-cart-header">

          <div>

            <p className="cart-small-title">

              SAI CHARITHA AGENCIES

            </p>

            <h1>

              Your Order

            </h1>

            <p>

              Review your selected products

            </p>

          </div>

          <button
            className="continue-shopping-btn"

            onClick={() =>
              navigate(
                "/products"
              )
            }
          >

            <FaArrowLeft />

            &nbsp;

            Continue Shopping

          </button>

        </header>

        <div className="order-cart-container">

          <section className="cart-items-section">

            <div className="empty-cart">

              <div className="empty-cart-icon">

                <FaShoppingCart />

              </div>

              <h3>

                Your order is empty

              </h3>

              <p>

                Add some products before
                placing an order.

              </p>

              <button
                onClick={() =>
                  navigate(
                    "/products"
                  )
                }
              >

                Continue Shopping

              </button>

            </div>

          </section>

        </div>

      </div>

    );

  }

  /* =====================================================
     MAIN
  ===================================================== */

  return (

    <div className="order-cart-page">

      <header className="order-cart-header">

        <div>

          <p className="cart-small-title">

            SAI CHARITHA AGENCIES

          </p>

          <h1>

            Your Order

          </h1>

          <p>

            Review your selected products
            before placing the order.

          </p>

        </div>

        <button
          className="continue-shopping-btn"

          onClick={() =>
            navigate(
              "/products"
            )
          }
        >

          <FaArrowLeft />

          &nbsp;

          Continue Shopping

        </button>

      </header>

      <main className="order-cart-container">

        {/* =================================================
           CART ITEMS
        ================================================= */}

        <section className="cart-items-section">

          <div className="cart-items-header">

            <h2>

              <FaShoppingCart />

              &nbsp;

              Order Items

            </h2>

            <button
              className="clear-cart-btn"
              onClick={
                clearCart
              }
            >

              <FaTrash />

              &nbsp;

              Clear Order

            </button>

          </div>

          {cartItems.map(

            (item, index) => {

              const sellingPrice =
                getSellingPrice(
                  item
                );

              const quantity =
                getNumber(
                  item.quantity,
                  1
                );

              const piecesPerBox =
                getNumber(
                  item.piecesPerBox,
                  1
                );

              const boxesPerCase =
                getNumber(
                  item.boxesPerCase,
                  1
                );

              const packingType =
                item.packingType ||
                "Case";

              const itemTotal =
                calculateItemTotal(
                  item
                );

              return (

                <div
                  className="cart-product-card"

                  key={
                    item.id ||
                    item.productId ||
                    index
                  }
                >

                  {/* =================================================
                     PRODUCT INFO
                  ================================================= */}

                  <div className="cart-product-info">

                    <div className="cart-product-image">

                      {item.image ? (

                        <img
                          src={item.image}

                          alt={
                            item.name ||
                            item.productName ||
                            "Product"
                          }

                        />

                      ) : (

                        <FaShoppingCart
                          size={40}
                        />

                      )}

                    </div>

                    <div>

                      <h3>

                        {item.name ||
                          item.productName ||
                          "Chocolate"}

                      </h3>

                      <p>

                        Flavour:{" "}

                        {item.flavour ||
                          item.flavor ||
                          "Original"}

                      </p>

                      <p>

                        MRP: ₹

                        {getNumber(
                          item.mrp ||
                          item.price ||
                          sellingPrice
                        )}

                      </p>

                    </div>

                  </div>

                  {/* =================================================
                     PRODUCT DETAILS
                  ================================================= */}

                  <div className="cart-product-details">

                    <div className="cart-detail">

                      <span>

                        Selling Price

                      </span>

                      <strong>

                        ₹

                        {sellingPrice.toLocaleString(
                          "en-IN"
                        )}

                        {" "} / piece

                      </strong>

                    </div>

                    <div className="cart-detail">

                      <span>

                        Packing

                      </span>

                      <strong>

                        {packingType ===
                          "Box" ? (

                          <>

                            <FaBox />

                            {" "}

                            Box

                          </>

                        ) : (

                          <>

                            <FaBoxes />

                            {" "}

                            Case

                          </>

                        )}

                      </strong>

                    </div>

                    <div className="cart-detail">

                      <span>

                        Quantity

                      </span>

                      <strong>

                        {quantity}

                        {" "}

                        {packingType}

                        {quantity > 1
                          ? "s"
                          : ""}

                      </strong>

                    </div>

                    <div className="cart-detail">

                      <span>

                        Pieces / Box

                      </span>

                      <strong>

                        {piecesPerBox}

                      </strong>

                    </div>

                    {packingType ===
                      "Case" && (

                      <div className="cart-detail">

                        <span>

                          Boxes / Case

                        </span>

                        <strong>

                          {boxesPerCase}

                        </strong>

                      </div>

                    )}

                  </div>

                  {/* =================================================
                     PRICE
                  ================================================= */}

                  <div className="cart-price-section">

                    <div>

                      <span>

                        Item Total

                      </span>

                      <strong>

                        ₹

                        {itemTotal.toLocaleString(
                          "en-IN"
                        )}

                      </strong>

                    </div>

                  </div>

                  {/* =================================================
                     QUANTITY CONTROL
                  ================================================= */}

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: "15px"
                    }}
                  >

                    <button
                      type="button"

                      onClick={() =>
                        updateQuantity(
                          index,
                          -1
                        )
                      }
                    >

                      <FaMinus />

                    </button>

                    <strong>

                      {quantity}

                    </strong>

                    <button
                      type="button"

                      onClick={() =>
                        updateQuantity(
                          index,
                          1
                        )
                      }
                    >

                      <FaPlus />

                    </button>

                  </div>

                  {/* =================================================
                     REMOVE
                  ================================================= */}

                  <button
                    className="remove-cart-btn"

                    onClick={() =>
                      removeItem(
                        index
                      )
                    }
                  >

                    <FaTrash />

                    &nbsp;

                    Remove

                  </button>

                </div>

              );

            }

          )}

        </section>

        {/* =================================================
           ORDER SUMMARY
        ================================================= */}

        <aside className="cart-summary">

          <h2>

            <FaClipboardList />

            &nbsp;

            Order Summary

          </h2>

          <div className="summary-line">

            <span>

              Total Products

            </span>

            <strong>

              {cartItems.length}

            </strong>

          </div>

          <div className="summary-line">

            <span>

              Total Cases

            </span>

            <strong>

              {totalCases}

            </strong>

          </div>

          <div className="summary-line">

            <span>

              Total Boxes

            </span>

            <strong>

              {totalBoxes}

            </strong>

          </div>

          <div className="summary-divider"></div>

          {/* =================================================
             DELIVERY DETAILS
          ================================================= */}

          <div className="delivery-details">

            <h2>

              <FaMapMarkerAlt />

              &nbsp;

              Delivery Details

            </h2>

            <div className="delivery-field">

              <label>

                <FaUser />

                Customer / Shop Name

              </label>

              <input
                type="text"

                name="customerName"

                value={
                  deliveryDetails.customerName
                }

                onChange={
                  handleDeliveryChange
                }

                placeholder="Enter customer or shop name"

              />

            </div>

            <div className="delivery-field">

              <label>

                <FaMobileAlt />

                Phone Number

              </label>

              <input
                type="tel"

                name="phoneNumber"

                value={
                  deliveryDetails.phoneNumber
                }

                onChange={
                  handleDeliveryChange
                }

                placeholder="Enter phone number"

              />

            </div>

            <div className="delivery-field">

              <label>

                <FaMapMarkerAlt />

                Delivery Address

              </label>

              <textarea
                name="address"

                value={
                  deliveryDetails.address
                }

                onChange={
                  handleDeliveryChange
                }

                placeholder="Enter complete delivery address"

                rows="3"

              ></textarea>

            </div>

            <div className="delivery-row">

              <div className="delivery-field">

                <label>

                  <FaBuilding />

                  City

                </label>

                <input
                  type="text"

                  name="city"

                  value={
                    deliveryDetails.city
                  }

                  onChange={
                    handleDeliveryChange
                  }

                  placeholder="City"

                />

              </div>

              <div className="delivery-field">

                <label>

                  <FaMapPin />

                  Pincode

                </label>

                <input
                  type="text"

                  name="pincode"

                  value={
                    deliveryDetails.pincode
                  }

                  onChange={
                    handleDeliveryChange
                  }

                  placeholder="Pincode"

                />

              </div>

            </div>

          </div>

          <div className="summary-divider"></div>

          {/* =================================================
             GRAND TOTAL
          ================================================= */}

          <div className="grand-total">

            <span>

              Grand Total

            </span>

            <strong>

              ₹

              {grandTotal.toLocaleString(
                "en-IN"
              )}

            </strong>

          </div>

          {/* =================================================
             PLACE ORDER
          ================================================= */}

          <button
            className="place-order-btn"

            onClick={
              handlePlaceOrder
            }

            disabled={
              cartItems.length === 0
            }
          >

            <FaShoppingCart />

            &nbsp;

            Place Order

          </button>

        </aside>

      </main>

    </div>

  );

}

export default OrderCart;