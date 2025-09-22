import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminNavbar from "./AdminNavbar";
import "../styles/admin.css";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const token = localStorage.getItem("adminToken");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/orders`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOrders(res.data);
      } catch (err) {
        console.error(err.response?.data || err.message);
      }
    };
    fetchOrders();
  }, []);

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
              <tr key={o._id}>
                <td>{o._id}</td>
                <td>{o.clientName}</td>
                <td>{o.productName}</td>
                <td>
              <span className={`status ${o.status.toLowerCase().replace(" ", "-")}`}>
                 {o.status}
              </span>
               </td>
             </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
