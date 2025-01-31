import React from "react";
import { Outlet } from "react-router-dom";
import "../../src/assets/styles/user.css";  // Import User CSS
import Navbar from "../common/components/navbar";

const UserLayout = () => {
  return (
    <div className="user-layout">
      <div className="user-navbar">
      
        <Navbar/>
      </div>
      <div className="user-content">
        <Outlet />
      </div>
    </div>
  );
};

export default UserLayout;
