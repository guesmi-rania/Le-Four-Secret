// src/components/Header.jsx
import React from "react";
import "../styles/Sidebar.css"; // Même fichier CSS pour simplifier

export default function Header({ userName = "Admin" }) {
  return (
    <header className="admin-header">
      <h3>Dashboard</h3>
      <div className="admin-user">{userName}</div>
    </header>
  );
}
