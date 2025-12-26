// frontend/src/pages/AdminOrders.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { jsPDF } from "jspdf";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = localStorage.getItem("adminToken");
  const BASE_URL = import.meta.env.VITE_API_URL || "https://recettes-de-cuisine.onrender.com";

  useEffect(() => {
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
    fetchOrders();
  }, [token]);

  const generatePDF = (order) => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Devis / Commande", 20, 20);
    doc.setFontSize(12);
    doc.text(`Client : ${order.clientInfo?.name}`, 20, 35);
    doc.text(`Email : ${order.clientInfo?.email}`, 20, 45);
    doc.text(`Adresse : ${order.clientInfo?.address}`, 20, 55);
    doc.text(`Date : ${new Date(order.createdAt).toLocaleString()}`, 20, 65);
    doc.text("Produits :", 20, 75);

    let y = 85;
    order.cart.forEach((item, idx) => {
      doc.text(`${idx + 1}. ${item.name} × ${item.quantity} - ${item.price} DT`, 25, y);
      y += 10;
    });

    doc.text(`Total : ${order.totalPrice} DT`, 20, y + 5);
    doc.save(`commande_${order._id}.pdf`);
  };

  if (loading) return <p>Chargement des commandes...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!orders.length) return <p>Aucune commande trouvée.</p>;

  return (
    <table className="orders-table">
      <thead>
        <tr>
          <th>Client</th>
          <th>Email</th>
          <th>Adresse</th>
          <th>Produits</th>
          <th>Total</th>
          <th>Statut</th>
          <th>Date</th>
          <th>PDF</th>
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
            <td>{new Date(order.createdAt).toLocaleDateString()}</td>
            <td>
              <button onClick={() => generatePDF(order)}>📄 PDF</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
