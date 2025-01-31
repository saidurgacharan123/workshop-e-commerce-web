import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../../cart/actions/cart-actions"; // Import cart actions
import { getProductById } from "../actions/product-actions"; // Action to fetch a single product by ID
import "../../assets/styles/common.css"; // Import common styles for breadcrumb
import "../../assets/styles/product.css"; // Import product-specific styles
import LoginPopup from "../../common/components/Login-popup";
import { jwtDecode } from "jwt-decode";



const ProductDetail = () => {
  const { id } = useParams(); // Get the product ID from the URL
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openLoginPopup, setOpenLoginPopup] = useState(false); // State to handle login popup
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track if the user is logged in

  const cart = useSelector((state) => state.cart); // Access the Redux state for cart
  const dispatch = useDispatch();

  // Fetch product data
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await getProductById(id); // Fetch the product by ID
        setProduct(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch product details.");
        setLoading(false);
      }
    };

    fetchProduct();

    // Check if user is logged in (check for token in localStorage)
    const user = localStorage.getItem("token");
    console.log(user)
    if (user) {
      setIsLoggedIn(true);
    }
  }, [id]);

  // Handle Add to Cart
  const handleAddToCart = () => {
    if (isLoggedIn===false) {
      setOpenLoginPopup(true); // Open login modal if user is not logged in
    } else {
      const token = localStorage.getItem("token"); // Get user ID from localStorage
      if(token){
      let tokenData=jwtDecode(token);

    
      const quantity = 1; // Default quantity to add
      dispatch(addToCart(tokenData?.id,id, quantity )); // Dispatch Redux action
    }
      alert("Product added to cart successfully!");
    }
  };

  // Handle Remove from Cart
  const handleRemoveFromCart = () => {
    const userId = JSON.parse(localStorage.getItem("user")).id;
    dispatch(removeItemFromCart(userId, product.id)); // Dispatch Redux action to remove product from cart
  };

  // Handle Login Success (Close popup and mark user as logged in)
  const handleLoginSuccess = () => {
    setOpenLoginPopup(false); // Close login popup
    setIsLoggedIn(true); // Mark the user as logged in
  };

  if (loading) return <p>Loading product...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="product-detail-page">
      {/* Breadcrumb */}
      <div className="breadcrumb">
        <Link to="/products" className="breadcrumb-link">Products</Link> &gt; <span>{product.name}</span>
      </div>

      {/* Product Details */}
      {product && (
        <div className="product-detail-container">
          <div className="product-detail-image-container">
            <img
              src={product.image.startsWith('data:image') ? product.image : `data:image/png;base64,${product.image}`}
              alt={product.name}
              className="product-detail-image"
            />
          </div>
          <div className="product-detail-info">
            <h2 className="product-detail-title">{product.name}</h2>
            <p className="product-detail-description">{product.description}</p>
            <span className="product-detail-price">${product.price}</span>
            <button className="add-to-cart-button" onClick={handleAddToCart}>
              Add to Cart
            </button>
            {cart.items.some(item => item.id === product.id) && (
              <button className="remove-from-cart-button" onClick={handleRemoveFromCart}>
                Remove from Cart
              </button>
            )}
          </div>
        </div>
      )}

      {/* Login Popup */}
      <LoginPopup
        open={openLoginPopup}
        onClose={() => setOpenLoginPopup(false)}
        onLoginSuccess={handleLoginSuccess}
      />
    </div>
  );
};

export default ProductDetail;
