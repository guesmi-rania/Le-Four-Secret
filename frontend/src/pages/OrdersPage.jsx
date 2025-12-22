import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import axios from "axios";
import Footer from "../components/Footer";
import "../styles/Orders.css";

const BASE_URL =
  import.meta.env.VITE_API_URL || "https://recettes-de-cuisine.onrender.com";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/deliveries`);
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
      <Helmet>
        <title>Mes commandes | Douceurs du Chef</title>
        <meta name="description" content="Consultez vos commandes passées sur Douceurs du Chef." />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="orders-container">
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
                <p><strong>Téléphone :</strong> {order.clientInfo?.phone}</p>
                <p><strong>Adresse :</strong> {order.clientInfo?.address}</p>
                <p><strong>Total :</strong> {order.totalPrice?.toFixed(2)} DT</p>
                <p>
                  <strong>Statut :</strong>{" "}
                  <span className={`status ${order.status?.toLowerCase().replace(" ", "-")}`}>
                    {order.status}
                  </span>
                </p>
              </div>

              <div className="order-products">
                <strong>Produits :</strong>
                <ul>
                  {order.cart?.map((item, idx) => (
                    <li key={idx}>
                      {item.name} × {item.quantity}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))
        )}
      </div>

      <Footer />
    </div>
  );
}
