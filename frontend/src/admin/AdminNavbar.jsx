import React from "react";
import { Link } from "react-router-dom";
import "../styles/admin.css";

export default function AdminNavbar() {
  return (
    <nav className="admin-navbar">
      <h2 className="logo">🍰 Admin Pâtisserie</h2>
      <ul>
        <li><Link to="/admin/dashboard">Dashboard</Link></li>
        <li><Link to="/admin/products">Produits</Link></li>
        <li><Link to="/admin/orders">Commandes</Link></li>
        <li><Link to="/admin/login">Déconnexion</Link></li>
      </ul>
    </nav>
  );
}
