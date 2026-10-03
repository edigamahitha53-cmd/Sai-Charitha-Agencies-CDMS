import React, { useEffect, useState } from "react";

import {
  FaPlus,
  FaSearch,
  FaEdit,
  FaTrash,
  FaTags,
  FaTimes,
  FaSave,
  FaArrowLeft,
  FaBoxOpen,
  FaChartLine
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";

import "./ManageBrands.css";


function ManageBrands() {

  const navigate = useNavigate();


  /* =========================================
     BRANDS
  ========================================= */

  const [brands, setBrands] = useState(() => {

    const savedBrands =
      localStorage.getItem("adminBrands");

    return savedBrands
      ? JSON.parse(savedBrands)
      : [];

  });


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

  const [brandName, setBrandName] =
    useState("");

  const [description, setDescription] =
    useState("");


  /* =========================================
     SAVE TO LOCAL STORAGE
  ========================================= */

  useEffect(() => {

    localStorage.setItem(
      "adminBrands",
      JSON.stringify(brands)
    );

  }, [brands]);


  /* =========================================
     RESET FORM
  ========================================= */

  const resetForm = () => {

    setBrandName("");

    setDescription("");

    setEditId(null);

  };


  /* =========================================
     ADD BRAND
  ========================================= */

  const handleAddBrand = () => {

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
     SAVE BRAND
  ========================================= */

  const handleSaveBrand = (event) => {

    event.preventDefault();


    if (!brandName.trim()) {

      alert(
        "Please enter brand name."
      );

      return;

    }


    const brandData = {

      id:
        editId ||
        Date.now(),

      brandName:
        brandName.trim(),

      description:
        description.trim(),

      createdAt:
        editId
          ? brands.find(
              (brand) =>
                brand.id === editId
            )?.createdAt || Date.now()
          : Date.now()

    };


    if (editId) {

      setBrands(
        brands.map((brand) =>
          brand.id === editId
            ? brandData
            : brand
        )
      );

    } else {

      setBrands([
        ...brands,
        brandData
      ]);

    }


    handleCloseModal();

  };


  /* =========================================
     EDIT BRAND
  ========================================= */

  const handleEditBrand = (brand) => {

    setEditId(
      brand.id
    );

    setBrandName(
      brand.brandName
    );

    setDescription(
      brand.description || ""
    );

    setShowModal(true);

  };


  /* =========================================
     DELETE BRAND
  ========================================= */

  const handleDeleteBrand = (id) => {

    const confirmDelete =
      window.confirm(
        "Are you sure you want to delete this brand?"
      );


    if (!confirmDelete) {
      return;
    }


    setBrands(
      brands.filter(
        (brand) =>
          brand.id !== id
      )
    );

  };


  /* =========================================
     FILTER BRANDS
  ========================================= */

  const filteredBrands =
    brands.filter((brand) => {

      const search =
        searchText.toLowerCase();


      return (

        brand.brandName
          .toLowerCase()
          .includes(search)

        ||

        (brand.description || "")
          .toLowerCase()
          .includes(search)

      );

    });


  /* =========================================
     RENDER
  ========================================= */

  return (

    <div className="manage-brands-page">


      {/* =====================================
          HEADER
      ===================================== */}

      <div className="manage-brands-header">


        <div className="manage-brands-heading">


          <button
            className="brands-back-button"
            onClick={() =>
              navigate("/admin-dashboard")
            }
          >

            <FaArrowLeft />

          </button>


          <div>

            <p className="manage-brands-small-title">
              SAI CHARITHA AGENCIES
            </p>


            <h1>
              Manage Brands
            </h1>


            <p>
              Add, edit and manage chocolate brands
            </p>

          </div>


        </div>


        <button
          className="add-brand-button"
          onClick={handleAddBrand}
        >

          <FaPlus />

          <span>
            Add Brand
          </span>

        </button>


      </div>



      {/* =====================================
          SEARCH TOOLBAR
      ===================================== */}

      <div className="manage-brands-toolbar">


        <div className="brand-search-box">

          <FaSearch />

          <input
            type="text"
            placeholder="Search brand..."
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


        <div className="brand-count">

          <FaTags />

          <span>
            {filteredBrands.length} Brands
          </span>

        </div>


      </div>



      {/* =====================================
          BRAND CONTENT
      ===================================== */}

      {filteredBrands.length === 0 ? (

        <div className="no-brands">


          <div className="no-brands-icon">

            <FaTags />

          </div>


          <h2>
            No Brands Found
          </h2>


          <p>

            {searchText
              ? "Try another search."
              : "Start by adding your first chocolate brand."
            }

          </p>


          {!searchText && (

            <button
              onClick={handleAddBrand}
            >

              <FaPlus />

              Add Brand

            </button>

          )}


        </div>

      ) : (

        <div className="brands-grid">


          {filteredBrands.map(
            (brand, index) => (

              <div
                className="brand-admin-card"
                key={brand.id}
                style={{
                  animationDelay:
                    `${index * 0.08}s`
                }}
              >


                {/* BRAND ICON */}

                <div className="brand-card-top">


                  <div className="brand-icon">

                    <FaTags />

                  </div>


                  <span className="brand-number">

                    #{index + 1}

                  </span>


                </div>



                {/* BRAND CONTENT */}

                <div className="brand-card-content">


                  <span className="brand-label">

                    CHOCOLATE BRAND

                  </span>


                  <h2>

                    {brand.brandName}

                  </h2>


                  <p>

                    {brand.description
                      ? brand.description
                      : "No description available."
                    }

                  </p>


                </div>



                {/* BRAND FOOTER */}

                <div className="brand-card-footer">


                  <div className="brand-product-info">

                    <FaBoxOpen />

                    <span>
                      Products can be added
                    </span>

                  </div>


                  <div className="brand-actions">


                    <button
                      className="edit-brand-button"
                      onClick={() =>
                        handleEditBrand(
                          brand
                        )
                      }
                    >

                      <FaEdit />

                    </button>


                    <button
                      className="delete-brand-button"
                      onClick={() =>
                        handleDeleteBrand(
                          brand.id
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
          BRAND STATISTICS
      ===================================== */}

      <div className="brands-info-card">


        <div className="brands-info-icon">

          <FaChartLine />

        </div>


        <div>

          <span>
            BRAND MANAGEMENT
          </span>

          <h2>
            {brands.length} Total Brands
          </h2>

          <p>
            Manage all chocolate brands used in your business.
          </p>

        </div>


      </div>



      {/* =====================================
          MODAL
      ===================================== */}

      {showModal && (

        <div
          className="brand-modal-overlay"
          onMouseDown={(event) => {

            if (
              event.target ===
              event.currentTarget
            ) {

              handleCloseModal();

            }

          }}
        >


          <div className="brand-modal">


            {/* MODAL HEADER */}

            <div className="brand-modal-header">


              <div>

                <span>
                  BRAND MANAGEMENT
                </span>


                <h2>

                  {editId
                    ? "Edit Brand"
                    : "Add Brand"
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
              onSubmit={handleSaveBrand}
            >


              {/* BRAND NAME */}

              <div className="brand-form-group">


                <label>
                  Brand Name
                </label>


                <div className="brand-input-wrapper">

                  <FaTags />

                  <input
                    type="text"
                    placeholder="Example: Snickers"
                    value={brandName}
                    onChange={(event) =>
                      setBrandName(
                        event.target.value
                      )
                    }
                  />

                </div>


              </div>



              {/* DESCRIPTION */}

              <div className="brand-form-group">


                <label>
                  Description
                </label>


                <textarea
                  placeholder="Enter brand description..."
                  value={description}
                  onChange={(event) =>
                    setDescription(
                      event.target.value
                    )
                  }
                  rows="4"
                />


              </div>



              {/* BUTTONS */}

              <div className="brand-modal-actions">


                <button
                  type="button"
                  className="brand-cancel-button"
                  onClick={handleCloseModal}
                >

                  <FaTimes />

                  Cancel

                </button>


                <button
                  type="submit"
                  className="brand-save-button"
                >

                  <FaSave />

                  {editId
                    ? "Update Brand"
                    : "Save Brand"
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


export default ManageBrands;