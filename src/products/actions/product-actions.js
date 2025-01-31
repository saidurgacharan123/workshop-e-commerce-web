import axios from "axios";

// Base URL for your API (replace with your actual API base URL)
const API_URL = "http://localhost:5000/api/products"; // Change this to your actual backend URL

// Get all products
export const getAllProducts = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;  // Return products data
  } catch (error) {
    throw error; // Handle error appropriately
  }
};

// Get product by ID
export const getProductById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;  // Return the product details
  } catch (error) {
    throw error; // Handle error appropriately
  }
};

// Create a new product
export const createProduct = async (productData) => {
  try {
    const response = await axios.post(API_URL, productData);
    return response.data;  // Return the newly created product
  } catch (error) {
    throw error; // Handle error appropriately
  }
};

// Update product by ID
export const updateProductById = async (id, productData) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, productData);
    return response.data;  // Return the updated product
  } catch (error) {
    throw error; // Handle error appropriately
  }
};

// Delete product by ID
export const deleteProductById = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;  // Return success message or response
  } catch (error) {
    throw error; // Handle error appropriately
  }
};
