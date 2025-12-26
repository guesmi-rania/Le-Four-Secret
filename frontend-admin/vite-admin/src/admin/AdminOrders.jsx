import React, { useEffect, useState } from "react";
import axios from "axios";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const token = localStorage.getItem("adminToken");
  const BASE_URL = import.meta.env.VITE_API_URL || "https://recettes-de-cuisine.onrender.com";

  const fetchOrders = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/admin/orders`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrders(res.data || []);
    } catch (err) {
      console.error(err);
      setError("Impossible de charger les commandes.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleUpdateStatus = async (orderId, status) => {
    try {
      await axios.put(`${BASE_URL}/api/admin/orders/${orderId}/status`, { status }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchOrders();
    } catch (err) {
      console.error(err);
      alert("Erreur lors de la mise à jour du statut");
    }
  };

  const handleSendEmail = async (email) => {
    const subject = prompt("Sujet de l'email:");
    const message = prompt("Message à envoyer:");
    if (!subject || !message) return;

    try {
      await axios.post(`${BASE_URL}/api/admin/send-email`, { email, subject, message }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMessage("Email envoyé avec succès !");
      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      console.error(err);
      alert("Erreur lors de l'envoi de l'email");
    }
  };

  if (loading) return <p>Chargement des commandes...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!orders.length) return <p>Aucune commande trouvée.</p>;

  return (
    <div>
      <h2>Commandes</h2>
      {message && <p style={{ color: "green" }}>{message}</p>}
      <table className="orders-table">
        <thead>
          <tr>
            <th>Client</th>
            <th>Commande</th>
            <th>Total</th>
            <th>Status</th>
            <th>Créée le</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order._id}>
              <td>{order.clientInfo.name}<br/>{order.clientInfo.email}</td>
              <td>
                {order.cart.map(item => (
                  <div key={item.name}>{item.name} x{item.quantity} - {item.price} TND</div>
                ))}
              </td>
              <td>{order.totalPrice} TND</td>
              <td>{order.status}</td>
              <td>{new Date(order.createdAt).toLocaleString()}</td>
              <td>
                <button onClick={() => handleUpdateStatus(order._id, "Validée")}>Valider</button>
                <button onClick={() => handleUpdateStatus(order._id, "Annulée")}>Annuler</button>
                <button onClick={() => handleSendEmail(order.clientInfo.email)}>Envoyer Email</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
