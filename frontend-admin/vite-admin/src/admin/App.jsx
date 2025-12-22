import React from "react";
import Sidebar from "../components/Sidebar";
import AdminOrders from "./AdminOrders";
import "../styles/admin.css";

export default function App() {
  return (
    <div className="admin-wrapper">
      <Sidebar />
      <main className="admin-content">
        <AdminOrders />
      </main>
    </div>
  );
}
