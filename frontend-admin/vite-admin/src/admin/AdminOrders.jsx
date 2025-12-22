import React, { useEffect, useState } from "react";
import AdminNavbar from "../components/Sidebar";
import axios from "axios";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios
      .get("https://your-backend-url.com/api/orders") // Remplace par ton backend
      .then((res) => setOrders(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <AdminNavbar />
      <main className="dashboard-main">
        <h2>Liste des commandes</h2>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Client</th>
              <th>Total</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.customerName}</td>
                <td>{order.total} TND</td>
                <td>{order.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
}
