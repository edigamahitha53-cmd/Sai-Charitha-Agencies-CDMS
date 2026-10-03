import React, { useEffect, useState } from "react";

import {
  FaSearch,
  FaBoxOpen,
  FaArrowLeft,
  FaShoppingCart,
  FaArrowRight,
  FaTimes,
} from "react-icons/fa";

import {
  useNavigate,
  useLocation
} from "react-router-dom";

import "../assets/styles/products.css";


function Products() {

  const navigate = useNavigate();
  const location = useLocation();

  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);


  /*
   * =====================================================
   * CHECK WHERE USER CAME FROM
   * =====================================================
   *
   * Home -> Products
   *       Back -> Home
   *
   * Shop Dashboard -> Products
   *       Back -> Shop Dashboard
   *
   */

  const fromShopDashboard =
    location.state?.from === "shop-dashboard";


  const handleBack = () => {

    if (fromShopDashboard) {

      navigate("/shop-dashboard");

    } else {

      navigate("/");

    }

  };


  /*
   * =====================================================
   * GET PRODUCTS FROM BACKEND
   * =====================================================
   */

  useEffect(() => {

    const fetchProducts = async () => {

      try {

        setLoading(true);

        const response =
          await fetch(
            "http://localhost:8080/api/products"
          );


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

        setProducts([]);


      } finally {

        setLoading(false);

      }

    };


    fetchProducts();

  }, []);


  /*
   * =====================================================
   * SEARCH
   * =====================================================
   */

  const filteredProducts =
    products.filter((product) => {

      const searchText =
        search.toLowerCase().trim();


      return (

        String(
          product.productName || ""
        )
          .toLowerCase()
          .includes(searchText)

        ||

        String(
          product.brandName || ""
        )
          .toLowerCase()
          .includes(searchText)

        ||

        String(
          product.flavour || ""
        )
          .toLowerCase()
          .includes(searchText)

      );

    });


  /*
   * =====================================================
   * VIEW PRODUCT
   * =====================================================
   *
   * Route is /products/:id
   *
   */

  const handleViewProduct = (productId) => {

    navigate(
      `/products/${productId}`
    );

  };


  /*
   * =====================================================
   * CLEAR SEARCH
   * =====================================================
   */

  const clearSearch = () => {

    setSearch("");

  };


  return (

    <div className="products-page">


      {/* =====================================================
          HEADER
      ===================================================== */}

      <header className="products-header">

        <div
          className="products-header-content"
          style={{
            position: "relative"
          }}
        >

          <button
            type="button"
            className="back-to-home-btn"
            onClick={handleBack}
            style={{
              position: "absolute",
              left: "30px",
              top: "30px",
              zIndex: 9999,
              cursor: "pointer"
            }}
          >

            <FaArrowLeft />

            {fromShopDashboard
              ? "Back to Shop Dashboard"
              : "Back"}

          </button>


          <p className="products-small-title">

            SAI CHARITHA AGENCIES

          </p>


          <h1 className="products-main-title">

            Our Products

          </h1>


          <p>

            Choose your favourite chocolate, flavour and MRP
            and place your order easily.

          </p>

        </div>

      </header>


      {/* =====================================================
          SEARCH
      ===================================================== */}

      <section className="products-search-section">

        <div className="products-search-box">

          <FaSearch
            className="products-search-icon"
          />


          <input
            type="text"
            placeholder="Search chocolates..."
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
          />


          {search && (

            <button
              className="clear-search"
              onClick={clearSearch}
              type="button"
            >

              <FaTimes />

            </button>

          )}

        </div>

      </section>


      {/* =====================================================
          PRODUCTS
      ===================================================== */}

      <section className="products-section">


        <div className="products-section-title">

          <div></div>


          <h2>

            <FaBoxOpen
              className="section-title-icon"
            />

            Available Products

          </h2>


          <div></div>

        </div>


        {/* =====================================================
            LOADING
        ===================================================== */}

        {loading ? (

          <div className="no-products">

            <FaBoxOpen
              className="no-products-icon"
            />

            <h3>

              Loading products...

            </h3>


            <p>

              Please wait while we load
              the available products.

            </p>

          </div>

        ) : filteredProducts.length === 0 ? (

          /* =====================================================
             NO PRODUCTS
          ===================================================== */

          <div className="no-products">

            <FaSearch
              className="no-products-icon"
            />


            <h3>

              No products found

            </h3>


            <p>

              There are no products available.

            </p>

          </div>

        ) : (

          /* =====================================================
             PRODUCT GRID
          ===================================================== */

          <div className="products-grid">

            {filteredProducts.map(
              (product, index) => (

                <div
                  className="product-card"
                  key={product.id}
                  onClick={() =>
                    handleViewProduct(
                      product.id
                    )
                  }
                  style={{
                    cursor: "pointer"
                  }}
                >


                  {/* =================================================
                      IMAGE
                  ================================================= */}

                  <div className="product-image-container">

                    <div
                      className="product-image-glow"
                    />


                    {product.image ? (

                      <img
                        src={product.image}
                        alt={
                          product.productName
                        }
                      />

                    ) : (

                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          width: "100%",
                          height: "100%",
                        }}
                      >

                        <FaBoxOpen
                          size={60}
                        />

                      </div>

                    )}


                    <div
                      className="product-floating-icon"
                    >

                      <FaShoppingCart />

                    </div>

                  </div>


                  {/* =================================================
                      CONTENT
                  ================================================= */}

                  <div
                    className="product-card-content"
                  >


                    <div
                      className="product-card-top"
                    >

                      <span
                        className="product-number"
                      >

                        #

                        {String(
                          index + 1
                        ).padStart(2, "0")}

                      </span>


                      <span
                        className="product-category"
                      >

                        <FaBoxOpen />

                        {product.brandName ||
                          "Chocolate"}

                      </span>

                    </div>


                    <h3>

                      {product.productName}

                    </h3>


                    <p>

                      {product.flavour
                        ? `Flavour: ${product.flavour}`
                        : "Delicious chocolate available from SAI CHARITHA AGENCIES."
                      }

                    </p>


                    <span
                      className="view-product"
                    >

                      View Details

                      <FaArrowRight />

                    </span>


                  </div>

                </div>

              )
            )}

          </div>

        )}

      </section>

    </div>

  );

}


export default Products;