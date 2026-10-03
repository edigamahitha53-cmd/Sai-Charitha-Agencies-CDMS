import React, { useEffect, useState } from "react";

import {
  FaPlus,
  FaSearch,
  FaEdit,
  FaTrash,
  FaBoxOpen,
  FaTimes,
  FaSave,
  FaImage,
  FaArrowLeft,
  FaBoxes,
  FaRupeeSign
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";

import "../../assets/styles/manageProducts.css";


function ManageProducts() {

  const navigate = useNavigate();


  /* =========================================
     PRODUCTS
  ========================================= */

  const [products, setProducts] =
    useState([]);


  /* =========================================
     SEARCH
  ========================================= */

  const [searchText, setSearchText] =
    useState("");


  /* =========================================
     MODAL
  ========================================= */

  const [showModal, setShowModal] =
    useState(false);


  /* =========================================
     EDIT MODE
  ========================================= */

  const [editId, setEditId] =
    useState(null);


  /* =========================================
     FORM
  ========================================= */

  const [productName, setProductName] =
    useState("");

  const [brand, setBrand] =
    useState("");

  const [flavour, setFlavour] =
    useState("");

  const [mrp, setMrp] =
    useState("");

  const [sellingPrice, setSellingPrice] =
    useState("");

  const [packingType, setPackingType] =
    useState("Box");

  const [piecesPerBox, setPiecesPerBox] =
    useState("");

  const [boxesPerCase, setBoxesPerCase] =
    useState("");

  const [stock, setStock] =
    useState("");

  const [image, setImage] =
    useState("");


  /* =========================================
     LOADING
  ========================================= */

  const [loading, setLoading] =
    useState(false);


  /* =========================================
     API URL
  ========================================= */

  const API_URL =
    "https://sai-charitha-agencies-cdms.onrender.com/api/products";


  /* =========================================
     GET PRODUCTS
  ========================================= */

  const fetchProducts = async () => {

    try {

      setLoading(true);

      const response =
        await fetch(API_URL);


      if (!response.ok) {

        throw new Error(
          "Failed to fetch products"
        );

      }


      const data =
        await response.json();


      setProducts(
        Array.isArray(data)
          ? data
          : []
      );

    } catch (error) {

      console.error(
        "Error fetching products:",
        error
      );

      alert(
        "Unable to load products from server."
      );

    } finally {

      setLoading(false);

    }

  };


  /* =========================================
     LOAD PRODUCTS WHEN PAGE OPENS
  ========================================= */

  useEffect(() => {

    fetchProducts();

  }, []);


  /* =========================================
     RESET FORM
  ========================================= */

  const resetForm = () => {

    setProductName("");

    setBrand("");

    setFlavour("");

    setMrp("");

    setSellingPrice("");

    setPackingType("Box");

    setPiecesPerBox("");

    setBoxesPerCase("");

    setStock("");

    setImage("");

    setEditId(null);

  };


  /* =========================================
     OPEN ADD MODAL
  ========================================= */

  const handleAddProduct = () => {

    resetForm();

    setShowModal(true);

  };


  /* =========================================
     CLOSE MODAL
  ========================================= */

  const handleCloseModal = () => {

    setShowModal(false);

    resetForm();

  };


  /* =========================================
     IMAGE
  ========================================= */

  const handleImageChange = (event) => {

    const file =
      event.target.files[0];


    if (!file) {

      return;

    }


    const reader =
      new FileReader();


    reader.onloadend = () => {

      setImage(
        reader.result
      );

    };


    reader.readAsDataURL(file);

  };


  /* =========================================
     SAVE PRODUCT
  ========================================= */

  const handleSaveProduct = async (event) => {

    event.preventDefault();


    if (
      !productName.trim() ||
      !brand.trim() ||
      !mrp ||
      !sellingPrice ||
      !piecesPerBox ||
      !boxesPerCase ||
      !stock
    ) {

      alert(
        "Please fill all product details."
      );

      return;

    }


    /* =========================================
       PRODUCT DATA FOR SPRING BOOT
    ========================================= */

    const productData = {

      productName:
        productName.trim(),

      brandName:
        brand.trim(),

      flavour:
        flavour.trim(),

      mrp:
        Number(mrp),

      sellingPrice:
        Number(sellingPrice),

      piecesPerBox:
        Number(piecesPerBox),

      boxesPerCase:
        Number(boxesPerCase),

      stock:
        Number(stock),

      image:
        image || ""

    };


    try {

      setLoading(true);


      /* =========================================
         ADD PRODUCT
         POST /api/products
      ========================================= */

      let response;


      if (editId) {

        /* =======================================
           UPDATE PRODUCT
           PUT /api/products/{id}
        ======================================= */

        response =
          await fetch(
            `${API_URL}/${editId}`,
            {
              method: "PUT",

              headers: {
                "Content-Type":
                  "application/json"
              },

              body:
                JSON.stringify(
                  productData
                )
            }
          );

      } else {

        /* =======================================
           ADD PRODUCT
           POST /api/products
        ======================================= */

        response =
          await fetch(
            API_URL,
            {
              method: "POST",

              headers: {
                "Content-Type":
                  "application/json"
              },

              body:
                JSON.stringify(
                  productData
                )
            }
          );

      }


      /* =========================================
         CHECK RESPONSE
      ========================================= */

      if (!response.ok) {

        const errorText =
          await response.text();

        console.error(
          "Server Error:",
          errorText
        );

        throw new Error(
          "Product could not be saved"
        );

      }


      const savedProduct =
        await response.json();


      console.log(
        "Product saved:",
        savedProduct
      );


      /* =========================================
         REFRESH PRODUCTS FROM DATABASE
      ========================================= */

      await fetchProducts();


      alert(
        editId
          ? "Product updated successfully."
          : "Product added successfully."
      );


      handleCloseModal();


    } catch (error) {

      console.error(
        "Error saving product:",
        error
      );


      alert(
        "Unable to save product. Please check Spring Boot."
      );

    } finally {

      setLoading(false);

    }

  };


  /* =========================================
     EDIT PRODUCT
  ========================================= */

  const handleEditProduct = (product) => {

    setEditId(
      product.id
    );


    setProductName(
      product.productName || ""
    );


    setBrand(
      product.brandName || ""
    );


    setFlavour(
      product.flavour || ""
    );


    setMrp(
      product.mrp ?? ""
    );


    setSellingPrice(
      product.sellingPrice ?? ""
    );


    setPiecesPerBox(
      product.piecesPerBox ?? ""
    );


    setBoxesPerCase(
      product.boxesPerCase ?? ""
    );


    setStock(
      product.stock ?? ""
    );


    setImage(
      product.image || ""
    );


    setShowModal(true);

  };


  /* =========================================
     DELETE PRODUCT
  ========================================= */

  const handleDeleteProduct = async (id) => {

    const confirmDelete =
      window.confirm(
        "Are you sure you want to delete this product?"
      );


    if (!confirmDelete) {

      return;

    }


    try {

      setLoading(true);


      const response =
        await fetch(
          `${API_URL}/${id}`,
          {
            method: "DELETE"
          }
        );


      if (!response.ok) {

        throw new Error(
          "Delete failed"
        );

      }


      await fetchProducts();


      alert(
        "Product deleted successfully."
      );


    } catch (error) {

      console.error(
        "Error deleting product:",
        error
      );


      alert(
        "Unable to delete product."
      );

    } finally {

      setLoading(false);

    }

  };


  /* =========================================
     FILTER PRODUCTS
  ========================================= */

  const filteredProducts =
    products.filter((product) => {

      const search =
        searchText.toLowerCase();


      return (

        (product.productName || "")
          .toLowerCase()
          .includes(search)

        ||

        (product.brandName || "")
          .toLowerCase()
          .includes(search)

        ||

        (product.flavour || "")
          .toLowerCase()
          .includes(search)

      );

    });


  /* =========================================
     RENDER
  ========================================= */

  return (

    <div className="manage-products-page">


      {/* =====================================
          HEADER
      ===================================== */}

      <div className="manage-products-header">


        <div className="manage-products-heading">


          <button
            className="back-button"
            onClick={() =>
              navigate("/admin-dashboard")
            }
          >

            <FaArrowLeft />

          </button>


          <div>

            <p className="manage-products-small-title">

              SAI CHARITHA AGENCIES

            </p>


            <h1>

              Manage Products

            </h1>


            <p>

              Add, edit and manage your products

            </p>

          </div>


        </div>


        <button
          className="add-product-button"
          onClick={handleAddProduct}
        >

          <FaPlus />

          <span>

            Add Product

          </span>

        </button>


      </div>


      {/* =====================================
          SEARCH
      ===================================== */}

      <div className="manage-products-toolbar">


        <div className="product-search-box">

          <FaSearch />


          <input

            type="text"

            placeholder="Search product, brand or flavour..."

            value={searchText}

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


        <div className="product-count">

          <FaBoxOpen />

          <span>

            {filteredProducts.length} Products

          </span>

        </div>


      </div>


      {/* =====================================
          LOADING
      ===================================== */}

      {loading && (

        <div className="product-loading">

          Loading...

        </div>

      )}


      {/* =====================================
          PRODUCT GRID
      ===================================== */}

      {!loading &&
      filteredProducts.length === 0 ? (

        <div className="no-products">


          <div className="no-products-icon">

            <FaBoxOpen />

          </div>


          <h2>

            No Products Found

          </h2>


          <p>

            {searchText

              ? "Try another search."

              : "Start by adding your first product."

            }

          </p>


          {!searchText && (

            <button
              onClick={handleAddProduct}
            >

              <FaPlus />

              Add Product

            </button>

          )}


        </div>

      ) : (

        <div className="products-grid">


          {filteredProducts.map(
            (product, index) => (

              <div

                className="product-admin-card"

                key={product.id}

                style={{

                  animationDelay:
                    `${index * 0.08}s`

                }}

              >


                {/* IMAGE */}

                <div className="product-image-container">


                  {product.image ? (

                    <img

                      src={product.image}

                      alt={
                        product.productName
                      }

                    />

                  ) : (

                    <div className="product-no-image">

                      <FaImage />

                    </div>

                  )}


                  <div className="packing-badge">

                    <FaBoxes />

                    {packingType}

                  </div>


                </div>


                {/* CONTENT */}

                <div className="product-card-content">


                  <span className="product-brand">

                    {product.brandName}

                  </span>


                  <h2>

                    {product.productName}

                  </h2>


                  {product.flavour && (

                    <small>

                      Flavour: {product.flavour}

                    </small>

                  )}


                  {/* PRICE */}

                  <div className="product-price-row">


                    <div>

                      <small>

                        MRP

                      </small>


                      <strong className="mrp-price">

                        <FaRupeeSign />

                        {product.mrp}

                      </strong>

                    </div>


                    <div>

                      <small>

                        Selling Price

                      </small>


                      <strong className="selling-price">

                        <FaRupeeSign />

                        {product.sellingPrice}

                      </strong>

                    </div>


                  </div>


                  {/* PACKING */}

                  <div className="product-details-row">


                    <div>

                      <span>

                        Pieces / Box

                      </span>


                      <strong>

                        {product.piecesPerBox}

                      </strong>

                    </div>


                    <div>

                      <span>

                        Boxes / Case

                      </span>


                      <strong>

                        {product.boxesPerCase}

                      </strong>

                    </div>


                    <div>

                      <span>

                        Stock

                      </span>


                      <strong>

                        {product.stock}

                      </strong>

                    </div>


                  </div>


                  {/* ACTIONS */}

                  <div className="product-actions">


                    <button

                      className="edit-product-button"

                      onClick={() =>
                        handleEditProduct(
                          product
                        )
                      }

                    >

                      <FaEdit />

                      Edit

                    </button>


                    <button

                      className="delete-product-button"

                      onClick={() =>
                        handleDeleteProduct(
                          product.id
                        )
                      }

                    >

                      <FaTrash />

                      Delete

                    </button>


                  </div>


                </div>


              </div>

            )

          )}


        </div>

      )}


      {/* =====================================
          MODAL
      ===================================== */}

      {showModal && (

        <div

          className="product-modal-overlay"

          onMouseDown={(event) => {

            if (
              event.target ===
              event.currentTarget
            ) {

              handleCloseModal();

            }

          }}

        >


          <div className="product-modal">


            {/* MODAL HEADER */}

            <div className="product-modal-header">


              <div>

                <span>

                  PRODUCT MANAGEMENT

                </span>


                <h2>

                  {editId

                    ? "Edit Product"

                    : "Add Product"

                  }

                </h2>

              </div>


              <button
                onClick={handleCloseModal}
              >

                <FaTimes />

              </button>


            </div>


            {/* FORM */}

            <form
              onSubmit={handleSaveProduct}
            >


              {/* PRODUCT NAME */}

              <div className="form-group">

                <label>

                  Product Name

                </label>


                <input

                  type="text"

                  placeholder="Enter product name"

                  value={productName}

                  onChange={(event) =>
                    setProductName(
                      event.target.value
                    )
                  }

                  required

                />

              </div>


              {/* BRAND */}

              <div className="form-group">

                <label>

                  Brand

                </label>


                <input

                  type="text"

                  placeholder="Enter brand name"

                  value={brand}

                  onChange={(event) =>
                    setBrand(
                      event.target.value
                    )
                  }

                  required

                />

              </div>


              {/* FLAVOUR */}

              <div className="form-group">

                <label>

                  Flavour

                </label>


                <input

                  type="text"

                  placeholder="Enter flavour"

                  value={flavour}

                  onChange={(event) =>
                    setFlavour(
                      event.target.value
                    )
                  }

                />

              </div>


              {/* PRICE GRID */}

              <div className="form-row">


                <div className="form-group">

                  <label>

                    MRP

                  </label>


                  <div className="input-with-icon">

                    <FaRupeeSign />


                    <input

                      type="number"

                      min="0"

                      placeholder="0"

                      value={mrp}

                      onChange={(event) =>
                        setMrp(
                          event.target.value
                        )
                      }

                      required

                    />

                  </div>

                </div>


                <div className="form-group">

                  <label>

                    Selling Price

                  </label>


                  <div className="input-with-icon">

                    <FaRupeeSign />


                    <input

                      type="number"

                      min="0"

                      placeholder="0"

                      value={sellingPrice}

                      onChange={(event) =>
                        setSellingPrice(
                          event.target.value
                        )
                      }

                      required

                    />

                  </div>

                </div>


              </div>


              {/* PACKING */}

              <div className="form-row">


                <div className="form-group">

                  <label>

                    Packing Type

                  </label>


                  <select

                    value={packingType}

                    onChange={(event) =>
                      setPackingType(
                        event.target.value
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

                </div>


                <div className="form-group">

                  <label>

                    Pieces per Box

                  </label>


                  <input

                    type="number"

                    min="1"

                    placeholder="Example: 24"

                    value={piecesPerBox}

                    onChange={(event) =>
                      setPiecesPerBox(
                        event.target.value
                      )
                    }

                    required

                  />

                </div>


              </div>


              {/* CASE + STOCK */}

              <div className="form-row">


                <div className="form-group">

                  <label>

                    Boxes per Case

                  </label>


                  <input

                    type="number"

                    min="1"

                    placeholder="Example: 12"

                    value={boxesPerCase}

                    onChange={(event) =>
                      setBoxesPerCase(
                        event.target.value
                      )
                    }

                    required

                  />

                </div>


                <div className="form-group">

                  <label>

                    Stock

                  </label>


                  <input

                    type="number"

                    min="0"

                    placeholder="Available stock"

                    value={stock}

                    onChange={(event) =>
                      setStock(
                        event.target.value
                      )
                    }

                    required

                  />

                </div>


              </div>


              {/* IMAGE */}

              <div className="form-group">

                <label>

                  Product Image

                </label>


                <label className="image-upload-box">


                  {image ? (

                    <img

                      src={image}

                      alt="Product preview"

                    />

                  ) : (

                    <>

                      <FaImage />

                      <span>

                        Click to upload image

                      </span>

                    </>

                  )}


                  <input

                    type="file"

                    accept="image/*"

                    onChange={
                      handleImageChange
                    }

                  />


                </label>


              </div>


              {/* BUTTONS */}

              <div className="modal-actions">


                <button

                  type="button"

                  className="cancel-button"

                  onClick={handleCloseModal}

                >

                  <FaTimes />

                  Cancel

                </button>


                <button

                  type="submit"

                  className="save-product-button"

                  disabled={loading}

                >

                  <FaSave />

                  {loading

                    ? "Saving..."

                    : editId

                    ? "Update Product"

                    : "Save Product"

                  }

                </button>


              </div>


            </form>


          </div>

        </div>

      )}


    </div>

  );

}


export default ManageProducts;
