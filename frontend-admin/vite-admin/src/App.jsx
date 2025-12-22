import React from "react";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import AdminDashboard from "./admin/AdminDashboard";
import "./styles/admin.css";

export default function App() {
  return (
    <div className="admin-layout">
      <Sidebar />
      <div className="admin-main">
        <Header />
        <AdminDashboard />
      </div>
    </div>
  );
}
