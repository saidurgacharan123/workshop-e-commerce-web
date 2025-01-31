import React from "react";
import { Link } from "react-router-dom";
import "../../assets/styles/navbar.css"; // Make sure this CSS file exists for the styles
import EnsarLogo from "../../assets/images/enar.svg";

const Navbar = ({ role }) => {
  return (
    <nav className="navbar">
      <div className="navbar-wrapper">
      <div className="navbar-logo">
          <img src={EnsarLogo}/>
          </div>
      <div className="navbar-container">
        {/* Logo and Role */}

        {/* Navbar Links */}
        <div className="navbar-links">
          
          {role === "Admin" ? (
            <>
              <Link to="/admin/dashboard" className="navbar-link">
                Dashboard
              </Link>
              <Link to="/admin/products" className="navbar-link">
                Manage Products
              </Link>
            </>
          ) : (
            <>
              <Link to="/products" className="navbar-link">
                Products
              </Link>
              <Link to="/cart" className="navbar-link">
                Cart
              </Link>
            </>
          )}
          <Link to="/login" className="navbar-link">Login</Link>
        </div>
      </div>
      </div>
    </nav>
  );
};

export default Navbar;
