import React, { useEffect, useState } from "react";
import axios from "axios";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const BASE_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/orders`);
        setOrders(res.data);
      } catch (err) {
        console.error("Erreur chargement commandes", err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  if (loading) return <p>Chargement des commandes...</p>;

  return (
    <div className="admin-orders">
      <h2>Commandes</h2>
      <table>
        <thead>
          <tr>
            <th>Client</th>
            <th>Email</th>
            <th>Adresse</th>
            <th>Total</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id}>
              <td>{order.clientName || "—"}</td>
              <td>{order.clientEmail || "—"}</td>
              <td>{order.address || "—"}</td>
              <td>{order.totalPrice} TND</td>
              <td>{order.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
