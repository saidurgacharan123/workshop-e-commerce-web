import axios from "axios";
import { addItemToCart, removeItemFromCart } from "./cart-slice"; // Redux actions
const API_URL = "http://localhost:5000/api"; // Change this to your actual backend URL

// Add product to cart
export const addToCart = (userId, productId, quantity) => async (dispatch) => {
  try {
    const response = await axios.post(API_URL+`/cart/${userId}/item`, { productId, quantity});
    // Assuming the response returns updated cart info
    const updatedCart = response.data; 
    // Dispatch the Redux action to update the cart state
    dispatch(addItemToCart(updatedCart)); 
  } catch (error) {
    console.error("Error adding item to cart", error);
  }
};

// Remove product from cart
export const removeFromCart = (userId, productId) => async (dispatch) => {
  try {
    const response = await axios.delete(`${API_URL}/${productId}`, { data: { userId } });
    // Assuming the response returns updated cart info
    const updatedCart = response.data; 
    // Dispatch the Redux action to update the cart state
    dispatch(removeItemFromCart(updatedCart)); 
  } catch (error) {
    console.error("Error removing item from cart", error);
  }
};
