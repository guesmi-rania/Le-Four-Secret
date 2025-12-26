import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/Orders.css";
import Footer from "../components/Footer";

const BASE_URL = import.meta.env.VITE_API_URL || "https://recettes-de-cuisine.onrender.com";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/orders`);
        setOrders(res.data);
      } catch (err) {
        console.error("Erreur lors du chargement des commandes", err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  return (
    <div className="orders-page">
      <h2 className="orders-title">Mes commandes</h2>
      {loading ? (
        <p className="loading">Chargement des commandes...</p>
      ) : orders.length === 0 ? (
        <p className="empty">Vous n’avez pas encore passé de commande.</p>
      ) : (
        orders.map((order) => (
          <div key={order._id} className="order-card">
            <div className="order-info">
              <p><strong>Client :</strong> {order.clientInfo?.name}</p>
              <p><strong>Email :</strong> {order.clientInfo?.email}</p>
              <p><strong>Adresse :</strong> {order.clientInfo?.address}</p>
              <p><strong>Total :</strong> {order.totalPrice.toFixed(2)} DT</p>
              <p>
                <strong>Statut :</strong>{" "}
                <span className={`status ${order.status.toLowerCase().replace(" ", "-")}`}>
                  {order.status}
                </span>
              </p>
            </div>
            <div className="order-products">
              <strong>Produits :</strong>
              <ul>
                {order.cart?.length > 0 ? (
                  order.cart.map((item, idx) => (
                    <li key={idx}>
                      {item.name} × {item.quantity}
                    </li>
                  ))
                ) : (
                  <li>Aucun produit</li>
                )}
              </ul>
            </div>
          </div>
        ))
      )}
      <Footer />
    </div>
  );
}
