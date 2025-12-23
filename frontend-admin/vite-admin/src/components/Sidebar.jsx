import React from "react";

export default function Sidebar({ activeSection, setActiveSection, onLogout }) {
  const menuItems = [
    { id: "dashboard", label: "Dashboard" },
    { id: "orders", label: "Commandes" },
    { id: "products", label: "Produits" },
    { id: "categories", label: "Catégories" },
    { id: "newsletter", label: "Newsletter" },
  ];

  return (
    <aside style={{
      width: "220px",
      backgroundColor: "#2c3e50",
      color: "#fff",
      minHeight: "100vh",
      padding: "20px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between"
    }}>
      <div>
        <h2 style={{ textAlign: "center", marginBottom: "30px" }}>Admin</h2>
        <ul style={{ listStyle: "none", padding: 0 }}>
          {menuItems.map(item => (
            <li
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              style={{
                padding: "12px 10px",
                marginBottom: "8px",
                cursor: "pointer",
                borderRadius: "8px",
                background: activeSection === item.id ? "#007bff" : "transparent",
                color: activeSection === item.id ? "#fff" : "#fff",
                transition: "0.3s"
              }}
            >
              {item.label}
            </li>
          ))}
        </ul>
      </div>

      <button
        onClick={onLogout}
        style={{
          marginTop: "20px",
          padding: "10px",
          backgroundColor: "#e74c3c",
          color: "#fff",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer"
        }}
      >
        Déconnexion
      </button>
    </aside>
  );
}
