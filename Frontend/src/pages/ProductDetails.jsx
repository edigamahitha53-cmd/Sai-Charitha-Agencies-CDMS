import React, { useEffect, useState } from "react";

import {
  FaArrowLeft,
  FaArrowRight,
  FaBox,
  FaBoxes,
  FaShoppingCart,
  FaRupeeSign,
  FaMinus,
  FaPlus,
  FaCheckCircle,
  FaTag,
  FaCheck
} from "react-icons/fa";

import { Link, useNavigate, useParams } from "react-router-dom";

import "../assets/styles/productDetails.css";


function ProductDetails() {

  const { id } = useParams();

  const navigate = useNavigate();


  /* =========================================
     PRODUCT
  ========================================= */

  const [product, setProduct] =
    useState(null);


  /* =========================================
     LOADING
  ========================================= */

  const [loading, setLoading] =
    useState(true);


  /* =========================================
     ERROR
  ========================================= */

  const [errorMessage, setErrorMessage] =
    useState("");


  /* =========================================
     SELECTED FLAVOUR
  ========================================= */

  const [selectedFlavour, setSelectedFlavour] =
    useState(null);


  /* =========================================
     SELECTED MRP
  ========================================= */

  const [selectedMrp, setSelectedMrp] =
    useState(0);


  /* =========================================
     PACKING TYPE

     Box = Pieces / Box

     Case = Pieces / Box × Boxes / Case
  ========================================= */

  const [packingType, setPackingType] =
    useState("Case");


  /* =========================================
     QUANTITY
  ========================================= */

  const [quantity, setQuantity] =
    useState(1);


  /* =========================================
     API
  ========================================= */

  const API_URL =
    `http://localhost:8080/api/products/${id}`;


  /* =========================================
     GET PRODUCT
  ========================================= */

  useEffect(() => {

    const fetchProduct = async () => {

      try {

        setLoading(true);

        setErrorMessage("");


        const response =
          await fetch(API_URL);


        if (!response.ok) {

          throw new Error(
            "Product not found"
          );

        }


        const data =
          await response.json();


        setProduct(data);


        /* =====================================
           DATABASE PRODUCT IS FLAT

           product.flavour
           product.mrp
           product.sellingPrice
           product.piecesPerBox
           product.boxesPerCase
        ===================================== */

        if (data?.flavour) {

          setSelectedFlavour({
            flavour: data.flavour,
            mrps: [
              {
                mrp: Number(data.mrp || 0),
                sellingPrice: Number(
                  data.sellingPrice || 0
                )
              }
            ],
            piecesPerBox: Number(
              data.piecesPerBox || 1
            ),
            boxesPerCase: Number(
              data.boxesPerCase || 1
            )
          });

        } else {

          setSelectedFlavour(null);

        }


        setSelectedMrp(
          Number(data.mrp || 0)
        );


      } catch (error) {

        console.error(
          "Error fetching product:",
          error
        );


        setErrorMessage(
          "Unable to load product. Please check Spring Boot."
        );


      } finally {

        setLoading(false);

      }

    };


    fetchProduct();

  }, [id]);


  /* =========================================
     LOADING
  ========================================= */

  if (loading) {

    return (

      <div className="product-not-found">

        <div className="not-found-card">

          <FaBox className="not-found-icon" />

          <h2>
            Loading product...
          </h2>

          <p>
            Please wait while we load the product details.
          </p>

        </div>

      </div>

    );

  }


  /* =========================================
     PRODUCT NOT FOUND
  ========================================= */

  if (!product) {

    return (

      <div className="product-not-found">

        <div className="not-found-card">

          <FaBox className="not-found-icon" />

          <h2>
            Product Not Found
          </h2>

          <p>
            {errorMessage}
          </p>


          <Link
            to="/products"
            className="back-products-btn"
          >

            <FaArrowLeft />

            Back to Products

          </Link>

        </div>

      </div>

    );

  }


  /* =========================================
     PRODUCT NAME
  ========================================= */

  const productName =
    product.productName ||
    product.name ||
    "Chocolate";


  /* =========================================
     BRAND
  ========================================= */

  const brandName =
    product.brandName ||
    product.brand ||
    "Chocolate";


  /* =========================================
     DESCRIPTION
  ========================================= */

  const description =
    product.description ||
    "Choose your preferred flavour, MRP and quantity.";


  /* =========================================
     FLAVOUR CHANGE
  ========================================= */

  const handleFlavourChange =
    (index) => {

      /*
       * Backend is currently using
       * one flat flavour.
       *
       * So we keep the existing
       * selection logic compatible.
       */

      if (
        product.flavours &&
        Array.isArray(product.flavours) &&
        product.flavours[index]
      ) {

        const flavour =
          product.flavours[index];

        setSelectedFlavour(
          flavour
        );

        setQuantity(1);

        setPackingType("Case");

        if (
          flavour?.mrps &&
          Array.isArray(flavour.mrps) &&
          flavour.mrps.length > 0
        ) {

          setSelectedMrp(
            Number(
              flavour.mrps[0].mrp || 0
            )
          );

        } else {

          setSelectedMrp(
            Number(product.mrp || 0)
          );

        }

      } else {

        /*
         * Flat database product
         */

        setSelectedFlavour({
          flavour:
            product.flavour || "",

          mrps: [
            {
              mrp:
                Number(product.mrp || 0),

              sellingPrice:
                Number(
                  product.sellingPrice || 0
                )
            }
          ],

          piecesPerBox:
            Number(
              product.piecesPerBox || 1
            ),

          boxesPerCase:
            Number(
              product.boxesPerCase || 1
            )
        });

        setSelectedMrp(
          Number(product.mrp || 0)
        );

        setQuantity(1);

        setPackingType("Case");

      }

    };


  /* =========================================
     MRP CHANGE
  ========================================= */

  const handleMrpChange =
    (value) => {

      setSelectedMrp(
        Number(value)
      );

    };


  /* =========================================
     PACKING CHANGE
  ========================================= */

  const handlePackingTypeChange =
    (value) => {

      setPackingType(
        value
      );

      setQuantity(
        1
      );

    };


  /* =========================================
     INCREASE QUANTITY
  ========================================= */

  const increaseQuantity = () => {

    setQuantity(
      (previous) =>
        previous + 1
    );

  };


  /* =========================================
     DECREASE QUANTITY
  ========================================= */

  const decreaseQuantity = () => {

    setQuantity(
      (previous) =>
        previous > 1
          ? previous - 1
          : 1
    );

  };


  /* =========================================
     SELECTED MRP OBJECT
  ========================================= */

  const selectedMrpItem =
    selectedFlavour?.mrps?.find(
      (item) =>
        Number(item.mrp) ===
        Number(selectedMrp)
    );


  /* =========================================
     SELLING PRICE
  ========================================= */

  const sellingPrice =
    Number(
      selectedMrpItem?.sellingPrice ??
      product.sellingPrice ??
      0
    );


  /* =========================================
     PIECES PER BOX
  ========================================= */

  const piecesPerBox =
    Number(
      selectedFlavour?.piecesPerBox ??
      product.piecesPerBox ??
      1
    );


  /* =========================================
     BOXES PER CASE
  ========================================= */

  const boxesPerCase =
    Number(
      selectedFlavour?.boxesPerCase ??
      product.boxesPerCase ??
      1
    );


  /* =========================================
     SELECTED PACKING PIECES
  ========================================= */

  const selectedPackingPieces =

    packingType === "Box"

      ?

      piecesPerBox

      :

      piecesPerBox *
      boxesPerCase;


  /* =========================================
     TOTAL AMOUNT

     BOX:
     Selling Price × Pieces / Box × Quantity

     CASE:
     Selling Price × Pieces / Box
     × Boxes / Case × Quantity
  ========================================= */

  const totalAmount =

    packingType === "Box"

      ?

      sellingPrice *
      piecesPerBox *
      quantity

      :

      sellingPrice *
      piecesPerBox *
      boxesPerCase *
      quantity;


  /* =========================================
     ADD TO ORDER CART
  ========================================= */

  const handleAddToCart = () => {

    const existingCart =
      JSON.parse(
        localStorage.getItem(
          "orderCart"
        )
      ) || [];


    const cartItem = {

      productId:
        product.id,


      productName:
        productName,


      brandName:
        brandName,


      flavour:
        selectedFlavour?.flavour ||
        product.flavour ||
        "",


      mrp:
        Number(
          selectedMrp
        ),


      sellingPrice:
        Number(
          sellingPrice
        ),


      piecesPerBox:
        Number(
          piecesPerBox
        ),


      boxesPerCase:
        Number(
          boxesPerCase
        ),


      /* =====================================
         SELECTED PACKING
      ===================================== */

      packingType:
        packingType,


      /* =====================================
         QUANTITY
      ===================================== */

      quantity:
        Number(
          quantity
        ),


      /* =====================================
         TOTAL PIECES
      ===================================== */

      totalPieces:
        Number(
          selectedPackingPieces *
          quantity
        ),


      /* =====================================
         TOTAL AMOUNT
      ===================================== */

      totalAmount:
        Number(
          totalAmount
        ),


      image:
        product.image ||
        ""

    };


    existingCart.push(
      cartItem
    );


    localStorage.setItem(
      "orderCart",
      JSON.stringify(
        existingCart
      )
    );


    navigate(
      "/order-cart"
    );

  };


  return (

    <div className="product-details-page">


      {/* =====================================
          HEADER
      ===================================== */}

      <header className="product-details-header">

        <div className="product-details-header-content">


          <Link
            to="/products"
            className="details-back-link"
          >

            <FaArrowLeft />

            Back to Products

          </Link>


          <p className="details-small-title">

            {brandName}

          </p>


          <h1>

            {productName}

          </h1>


          <p>

            Choose your favourite flavour, MRP and
            quantity and place your order easily.

          </p>


        </div>

      </header>


      {/* =====================================
          MAIN SECTION
      ===================================== */}

      <section className="product-details-section">


        <div className="product-details-container">


          {/* ===================================
              IMAGE
          =================================== */}

          <div className="product-details-image-card">


            <div className="product-details-image">


              {product.image ? (

                <img
                  src={product.image}
                  alt={productName}
                />

              ) : (

                <FaBox
                  size={80}
                  className="not-found-icon"
                />

              )}


            </div>


            <div className="image-card-label">

              <FaCheckCircle />

              Available Product

            </div>


          </div>


          {/* ===================================
              CONTENT
          =================================== */}

          <div className="product-details-content">


            {/* =================================
                TITLE
            ================================= */}

            <div className="product-details-title">


              <span>

                {brandName}

              </span>


              <h2>

                {productName}

              </h2>


              <p>

                {description}

              </p>


            </div>


            {/* =================================
                FLAVOUR
            ================================= */}

            {product.flavours &&
              Array.isArray(product.flavours) &&
              product.flavours.length > 0 ? (

              <div className="selection-card">


                <label>

                  <FaTag />

                  Select Flavour

                </label>


                <select

                  value={
                    product.flavours.findIndex(
                      (flavour) =>
                        flavour ===
                        selectedFlavour
                    )
                  }

                  onChange={(e) =>
                    handleFlavourChange(
                      Number(
                        e.target.value
                      )
                    )
                  }

                >

                  {product.flavours.map(
                    (flavour, index) => (

                    <option
                      key={index}
                      value={index}
                    >

                      {flavour.flavour ||
                        `Flavour ${index + 1}`}

                    </option>

                  ))}

                </select>


              </div>

            ) : (

              /*
               * Same existing UI style,
               * but now shows DB flavour.
               */

              <div className="selection-card">

                <label>

                  <FaTag />

                  Select Flavour

                </label>


                <select
                  value={
                    product.flavour || ""
                  }
                  onChange={(e) =>
                    handleFlavourChange(0)
                  }
                >

                  <option
                    value={
                      product.flavour || ""
                    }
                  >

                    {product.flavour ||
                      "Regular"}

                  </option>

                </select>

              </div>

            )}


            {/* =================================
                MRP
            ================================= */}

            <div className="selection-card">


              <label>

                <FaRupeeSign />

                Select MRP

              </label>


              <select

                value={
                  selectedMrp
                }

                onChange={(e) =>
                  handleMrpChange(
                    e.target.value
                  )
                }

              >


                {selectedFlavour?.mrps &&
                Array.isArray(
                  selectedFlavour.mrps
                ) &&
                selectedFlavour.mrps.length > 0 ? (

                  selectedFlavour.mrps.map(
                    (mrpItem, index) => (

                    <option
                      key={index}
                      value={
                        mrpItem.mrp
                      }
                    >

                      ₹{mrpItem.mrp}

                    </option>

                  ))

                ) : (

                  <option
                    value={
                      product.mrp
                    }
                  >

                    ₹{product.mrp}

                  </option>

                )}


              </select>


            </div>


            {/* =================================
                PRICE
            ================================= */}

            <div className="price-card">


              <div className="price-main">

                <span>

                  Selling Price / Piece

                </span>


                <strong>

                  <FaRupeeSign />

                  {sellingPrice}

                </strong>

              </div>


              <span className="price-mrp">

                MRP ₹{selectedMrp}

              </span>


            </div>


            {/* =================================
                PACKING DETAILS
            ================================= */}

            <div className="packing-grid">


              <div className="packing-card">


                <div className="packing-icon">

                  <FaBox />

                </div>


                <div>

                  <span>

                    Pieces / Box

                  </span>


                  <strong>

                    {piecesPerBox}

                  </strong>

                </div>


              </div>


              <div className="packing-card">


                <div className="packing-icon">

                  <FaBoxes />

                </div>


                <div>

                  <span>

                    Boxes / Case

                  </span>


                  <strong>

                    {boxesPerCase}

                  </strong>

                </div>


              </div>


            </div>


            {/* =================================
                SELECT PACKING

                SAME STYLE AS SELECT MRP
            ================================= */}

            <div className="selection-card">


              <label>

                <FaBoxes />

                Select Packing

              </label>


              <select

                value={
                  packingType
                }

                onChange={(e) =>
                  handlePackingTypeChange(
                    e.target.value
                  )
                }

              >

                <option value="Box">

                  Box

                </option>


                <option value="Case">

                  Case

                </option>

              </select>


              <p className="selected-packing-text">


                {packingType === "Box"

                  ?

                  `1 Box = ${piecesPerBox} Pieces`

                  :

                  `1 Case = ${boxesPerCase} Boxes = ${
                    piecesPerBox *
                    boxesPerCase
                  } Pieces`

                }


              </p>


            </div>


            {/* =================================
                QUANTITY
            ================================= */}

            <div className="quantity-section">


              <div className="quantity-heading">


                <span>

                  Quantity

                </span>


                <small>

                  Number of{" "}

                  {packingType.toLowerCase()}s

                </small>


              </div>


              <div className="quantity-control">


                <button
                  type="button"
                  onClick={
                    decreaseQuantity
                  }
                >

                  <FaMinus />

                </button>


                <span>

                  {quantity}

                </span>


                <button
                  type="button"
                  onClick={
                    increaseQuantity
                  }
                >

                  <FaPlus />

                </button>


              </div>


            </div>


            {/* =================================
                TOTAL
            ================================= */}

            <div className="order-total">


              <div className="total-information">


                <span>

                  Total Amount

                </span>


                <small>

                  ₹{sellingPrice}

                  {" × "}

                  {piecesPerBox}

                  {" pieces / box "}


                  {packingType === "Case" && (

                    <>

                      × {boxesPerCase}

                      {" boxes / case "}

                    </>

                  )}


                  × {quantity}

                  {" "}

                  {packingType.toLowerCase()}(s)

                </small>


              </div>


              <strong>

                <FaRupeeSign />

                {totalAmount.toLocaleString(
                  "en-IN"
                )}

              </strong>


            </div>


            {/* =================================
                ADD TO CART
            ================================= */}

            <button
              type="button"
              className="add-order-btn"
              onClick={
                handleAddToCart
              }
            >

              <FaShoppingCart />

              Add to Order Cart

              <FaArrowRight />

            </button>


            <div className="order-note">

              <FaCheck />

              Your product will be added to the order cart.

            </div>


          </div>

        </div>

      </section>


      {/* =====================================
          AVAILABLE OPTIONS
      ===================================== */}

      {product.flavours &&
        Array.isArray(product.flavours) &&
        product.flavours.length > 0 && (

        <section className="available-options">


          <div className="available-options-title">


            <span></span>


            <h2>

              Available Options

            </h2>


            <span></span>


          </div>


          <p>

            Available flavours and their MRP options.

          </p>


          <div className="flavour-summary-grid">


            {product.flavours.map(
              (flavour, index) => (

              <div
                className="flavour-summary-card"
                key={index}
              >


                <span className="flavour-number">

                  #{String(
                    index + 1
                  ).padStart(
                    2,
                    "0"
                  )}

                </span>


                <h3>

                  {flavour.flavour ||
                    `Flavour ${index + 1}`}

                </h3>


                <div className="mrp-list">


                  {flavour.mrps &&
                    Array.isArray(
                      flavour.mrps
                    ) &&
                    flavour.mrps.length > 0 ? (

                    flavour.mrps.map(
                      (mrpItem, mrpIndex) => (

                      <div
                        className="mrp-item"
                        key={mrpIndex}
                      >

                        <span>

                          MRP ₹{mrpItem.mrp}

                        </span>


                        <strong>

                          ₹{mrpItem.sellingPrice}

                          <small>

                            / piece

                          </small>

                        </strong>

                      </div>

                    ))

                  ) : (

                    <div className="mrp-item">


                      <span>

                        MRP ₹{product.mrp}

                      </span>


                      <strong>

                        ₹{product.sellingPrice}

                        <small>

                          / piece

                        </small>

                      </strong>


                    </div>

                  )}


                </div>


              </div>

            ))}


          </div>


        </section>

      )}


    </div>

  );

}


export default ProductDetails;