import React, { useEffect, useState } from "react";
import axios from "axios";
import { jsPDF } from "jspdf";
import "../styles/admin.css";

export default function AdminDashboard() {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("adminToken");

  const BASE_URL = import.meta.env.VITE_API_URL;
  const PRODUCTS_URL = import.meta.env.VITE_PRODUCTS_URL;

  // Récupération des données
  const fetchData = async () => {
    try {
      const ordersRes = await axios.get(`${BASE_URL}/api/orders`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrders(Array.isArray(ordersRes.data) ? ordersRes.data : []);

      const productsRes = await axios.get(`${PRODUCTS_URL}`);
      setProducts(Array.isArray(productsRes.data) ? productsRes.data : []);

      const clientsRes = await axios.get(`${BASE_URL}/clients`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setClients(Array.isArray(clientsRes.data) ? clientsRes.data : []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) fetchData();
    else setLoading(false);
  }, [token]);

  // Modifier le statut d'une commande
  const handleStatusChange = async (id, status) => {
    try {
      await axios.put(
        `${BASE_URL}/orders/${id}`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  // Générer PDF d'une commande
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

  if (loading) return <p style={{ padding: "20px" }}>Chargement...</p>;

  return (
    <div className="dashboard-content">
      {/* Stats */}
      <div className="stats-grid">
        <div className="stat-card">
          <h4>Total Commandes</h4>
          <p>{orders.length}</p>
        </div>
        <div className="stat-card">
          <h4>Total Produits</h4>
          <p>{products.length}</p>
        </div>
        <div className="stat-card">
          <h4>Total Clients</h4>
          <p>{clients.length}</p>
        </div>
      </div>

      {/* Commandes récentes */}
      <h3 style={{ marginTop: "30px" }}>Commandes récentes</h3>
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
              <th>Date</th>
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
                <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                <td>
                  <button onClick={() => handleStatusChange(order._id, "Validée")}>
                    Valider
                  </button>
                  <button
                    onClick={() => handleStatusChange(order._id, "Annulée")}
                    style={{ marginLeft: "5px", backgroundColor: "#e74c3c" }}
                  >
                    Annuler
                  </button>
                  <button
                    onClick={() => generatePDF(order)}
                    style={{ marginLeft: "5px", backgroundColor: "#007bff" }}
                  >
                    PDF
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
