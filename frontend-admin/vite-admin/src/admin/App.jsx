// src/admin/App.jsx
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import AdminDashboard from "./AdminDashboard";
import AdminOrders from "./AdminOrders";
import AdminProducts from "./AdminProducts";
import AdminCategories from "./AdminCategories";
import AdminNewsletter from "./AdminNewsletter";
import AdminLogin from "./AdminLogin";

function PrivateRoute({ children }) {
  const token = localStorage.getItem("adminToken");
  return token ? children : <Navigate to="/login" replace />;
}

export default function App() {
  const [isLogged, setIsLogged] = useState(!!localStorage.getItem("adminToken"));

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    setIsLogged(false);
  };

  return (
    <Router>
      <div className="admin-container" style={{ display: "flex", minHeight: "100vh", background: "#f5f6fa" }}>
        {isLogged && <Sidebar onLogout={handleLogout} />}
        <div className="admin-main" style={{ flex: 1, padding: "20px" }}>
          <Routes>
            <Route path="/login" element={<AdminLogin onLogin={() => setIsLogged(true)} />} />
            <Route path="/" element={<PrivateRoute><AdminDashboard /></PrivateRoute>} />
            <Route path="/orders" element={<PrivateRoute><AdminOrders /></PrivateRoute>} />
            <Route path="/products" element={<PrivateRoute><AdminProducts /></PrivateRoute>} />
            <Route path="/categories" element={<PrivateRoute><AdminCategories /></PrivateRoute>} />
            <Route path="/newsletter" element={<PrivateRoute><AdminNewsletter /></PrivateRoute>} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}
