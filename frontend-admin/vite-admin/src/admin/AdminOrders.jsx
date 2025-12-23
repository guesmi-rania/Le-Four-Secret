import React, { useEffect, useState } from "react";
import axios from "axios";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("adminToken");
  const BASE_URL = import.meta.env.VITE_API_URL;

  const fetchOrders = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/orders`, { headers: { Authorization: `Bearer ${token}` } });
      setOrders(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error(err);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) fetchOrders();
  }, [token]);

  const handleStatusChange = async (id, status) => {
    try {
      await axios.put(`${BASE_URL}/orders/${id}`, { status }, { headers: { Authorization: `Bearer ${token}` } });
      fetchOrders();
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <p>Chargement des commandes...</p>;

  return (
    <div className="dashboard-content">
      <h3>Commandes</h3>
      {orders.length === 0 ? (
        <p>Aucune commande trouvée.</p>
      ) : (
        <table className="orders-table">
          <thead>
            <tr>
              <th>Client</th>
              <th>Email</th>
              <th>Adresse</th>
              <th>Produits</th>
              <th>Total</th>
              <th>Statut</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order.clientInfo?.name}</td>
                <td>{order.clientInfo?.email}</td>
                <td>{order.clientInfo?.address}</td>
                <td>
                  <ul>
                    {order.cart?.map((item, idx) => (
                      <li key={idx}>
                        {item.name} × {item.quantity}
                      </li>
                    ))}
                  </ul>
                </td>
                <td>{order.totalPrice} DT</td>
                <td>{order.status || "En attente"}</td>
                <td>
                  <button onClick={() => handleStatusChange(order._id, "Validée")}>Valider</button>
                  <button onClick={() => handleStatusChange(order._id, "Annulée")} style={{ marginLeft: "5px", color: "red" }}>Annuler</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
