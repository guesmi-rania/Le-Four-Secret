import React from "react";
import AdminNavbar from "./AdminNavbar";
import "../styles/admin.css";

export default function AdminDashboard() {
  return (
    <div className="admin-container">
      <AdminNavbar />
      <div className="admin-content">
        <h2>Tableau de Bord</h2>
        <div className="cards">
          <div className="card">Produits : 12</div>
          <div className="card">Commandes : 8</div>
          <div className="card">Clients : 25</div>
        </div>
      </div>
    </div>
  );
}
