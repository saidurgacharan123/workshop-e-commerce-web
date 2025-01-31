import React, { useEffect, useState } from "react";
import { getAllProducts } from "../actions/product-actions";  // Import the action
import Slider from "react-slick";
import "../../assets/styles/product.css";  // Ensure the updated CSS is imported
import "slick-carousel/slick/slick.css";  // Basic Slick Carousel CSS
import "slick-carousel/slick/slick-theme.css";  // Slick Carousel Theme CSS
import { Navigate, useNavigate } from "react-router-dom";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate=useNavigate();
  // Fetch products data
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getAllProducts();
        setProducts(response.data); // Set the products to state
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch products.");
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <p>Loading products...</p>;
  if (error) return <p>{error}</p>;

  // Carousel settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,  // Adjust this number based on how many items you want to show at once
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };
  const handleItemSelect=(id)=>{
    navigate(`/products/${id}`)
  }
  return (
    <div className="products-page">
      {/* Carousel Container */}
      <div className="carousel-container">
        <h2>Featured Products</h2>
        <Slider {...settings}>
          {products.map((product) => (
            <div onClick={()=>handleItemSelect(product._id)} key={product.id} className="carousel-item">
              {/* Check if image is in Base64 format or URL */}
              <img 
                src={product.image.startsWith('data:image') ? product.image : `data:image/png;base64,${product.image}`} 
                alt={product.name} 
                className="carousel-image" 
              />
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <span className="price">${product.price}</span>
            </div>
          ))}
        </Slider>
      </div>

      {/* Add more content or other product sections below as needed */}
    </div>
  );
};

export default ProductList;
