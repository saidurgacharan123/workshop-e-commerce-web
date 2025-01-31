import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../../src/common/components/navbar"; // Shared Navbar for Admin

import "../assets/styles/admin.css"; // Admin-specific CSS

const AdminLayout = () => {
  return (
    <div className="admin-layout">
      <Navbar role="Admin" />
      <div className="admin-content">
        <Outlet /> {/* Nested route content will be rendered here */}
      </div>
    </div>
  );
};

export default AdminLayout;
