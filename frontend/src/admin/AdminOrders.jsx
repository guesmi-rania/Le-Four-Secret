import React, { useState } from "react";
import AdminNavbar from "./AdminNavbar";
import "../styles/admin.css";

export default function AdminOrders() {
  const [orders] = useState([
    { id: 1, client: "Alice", product: "Tarte au citron", status: "En attente" },
    { id: 2, client: "Bob", product: "Millefeuille", status: "Livré" },
  ]);

  return (
    <div className="admin-container">
      <AdminNavbar />
      <div className="admin-content">
        <h2>Gestion des Commandes</h2>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Client</th>
              <th>Produit</th>
              <th>Statut</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((o) => (
              <tr key={o.id}>
                <td>{o.id}</td>
                <td>{o.client}</td>
                <td>{o.product}</td>
                <td>{o.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
