import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import {jwtDecode} from "jwt-decode";

const ProtectedRoute = ({ children=React.Children, requiredRole }) => {
  const location = useLocation();

  // Get the token from localStorage
  const token = localStorage.getItem("token");

  if (!token) {
    // If there's no token, redirect to the products page
    return <Navigate to="/" />;
  }

  try {
    // Decode the token to check the user's role
    const decodedToken = jwtDecode(token);

    // If the user's role doesn't match the required role, redirect to login
    if (decodedToken.role !== requiredRole) {
      return <Navigate to="/login" state={{ from: location }} />;
    }

    // If everything is good, render the protected route
    return children;
  } catch (error) {
    // If token decoding fails or there's any error, redirect to login
    return <Navigate to="/login" state={{ from: location }} />;
  }
};

export default ProtectedRoute;
