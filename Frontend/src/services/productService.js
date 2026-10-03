import API_BASE_URL from "../constants/api";

const API_URL = `${API_BASE_URL}/api/products`;


// ===============================
// ADD PRODUCT
// ===============================

export const addProduct = async (product) => {

    const response = await fetch(API_URL, {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(product)

    });


    if (!response.ok) {

        throw new Error(
            "Failed to add product"
        );

    }


    return await response.json();

};


// ===============================
// GET ALL PRODUCTS
// ===============================

export const getProducts = async () => {

    const response = await fetch(API_URL);


    if (!response.ok) {

        throw new Error(
            "Failed to fetch products"
        );

    }


    return await response.json();

};


// ===============================
// GET PRODUCT BY ID
// ===============================

export const getProductById = async (id) => {

    const response =
        await fetch(`${API_URL}/${id}`);


    if (!response.ok) {

        throw new Error(
            "Failed to fetch product"
        );

    }


    return await response.json();

};


// ===============================
// UPDATE PRODUCT
// ===============================

export const updateProduct = async (
    id,
    product
) => {

    const response =
        await fetch(`${API_URL}/${id}`, {

            method: "PUT",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(product)

        });


    if (!response.ok) {

        throw new Error(
            "Failed to update product"
        );

    }


    return await response.json();

};


// ===============================
// DELETE PRODUCT
// ===============================

export const deleteProduct = async (id) => {

    const response =
        await fetch(`${API_URL}/${id}`, {

            method: "DELETE"

        });


    if (!response.ok) {

        throw new Error(
            "Failed to delete product"
        );

    }


    return await response.text();

};