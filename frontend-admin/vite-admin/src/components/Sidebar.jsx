// src/components/Sidebar.jsx
import React from "react";
import { Link, useLocation } from "react-router-dom";
import "../styles/Sidebar.css";

export default function Sidebar({ onLogout }) {
  const location = useLocation();

  const links = [
    { name: "Dashboard", path: "/" },
    { name: "Commandes", path: "/orders" },
    { name: "Produits", path: "/products" },
    { name: "Catégories", path: "/categories" },
    { name: "Newsletter", path: "/newsletter" },
  ];

  return (
    <div className="sidebar">
      <h2>Admin</h2>
      <ul>
        {links.map((link) => (
          <li
            key={link.path}
            className={location.pathname === link.path ? "active" : ""}
          >
            <Link to={link.path}>{link.name}</Link>
          </li>
        ))}
        <li onClick={onLogout} style={{ marginTop: "auto", cursor: "pointer", background: "#e84118" }}>
          Déconnexion
        </li>
      </ul>
    </div>
  );
}
