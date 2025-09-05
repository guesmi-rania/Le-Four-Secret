// src/pages/AdminDashboard.jsx
import React from "react";
import {
  FaChartBar,
  FaShoppingBag,
  FaUsers,
  FaBox,
  FaCheckCircle,
} from "react-icons/fa";
import "../styles/AdminDashboard.css";

const AdminDashboard = () => {
  // 👉 Tu peux remplacer ces données par ton fetch API
  const stats = [
    { id: 1, label: "Produits", value: 128, icon: <FaBox /> },
    { id: 2, label: "Commandes", value: 56, icon: <FaShoppingBag /> },
    { id: 3, label: "Utilisateurs", value: 340, icon: <FaUsers /> },
    { id: 4, label: "Ventes", value: "2.450 DT", icon: <FaChartBar /> },
  ];

  const orders = [
    { id: 1, client: "Amira B.", status: "Livrée", total: "45 DT" },
    { id: 2, client: "Sami K.", status: "En attente", total: "120 DT" },
    { id: 3, client: "Rania M.", status: "En préparation", total: "75 DT" },
    { id: 4, client: "Yassine T.", status: "Livrée", total: "200 DT" },
  ];

  return (
    <div className="admin-dashboard">
      {/* Titre */}
      <h1 className="dashboard-title">Tableau de bord</h1>

      {/* Statistiques */}
      <div className="stats-grid">
        {stats.map((stat) => (
          <div key={stat.id} className="stat-card">
            <div className="stat-icon">{stat.icon}</div>
            <div className="stat-info">
              <h3>{stat.value}</h3>
              <p>{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Commandes récentes */}
      <div className="recent-orders">
        <h2>📦 Commandes Récentes</h2>
        <table>
          <thead>
            <tr>
              <th>Client</th>
              <th>Statut</th>
              <th>Total</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>{order.client}</td>
                <td>
                  <span
                    className={`status ${
                      order.status === "Livrée"
                        ? "delivered"
                        : order.status === "En attente"
                        ? "pending"
                        : "processing"
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
                <td>{order.total}</td>
                <td>
                  <button className="validate-btn">
                    <FaCheckCircle /> Valider
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;
