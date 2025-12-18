import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import axios from "axios";
import Footer from "../components/Footer"; // ✅ Assure-toi d’avoir le Footer
import "../styles/Orders.css";

const BASE_URL =
  import.meta.env.VITE_API_URL || "https://recettes-de-cuisine.onrender.com";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/api/orders`)
      .then((res) => {
        setOrders(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Erreur lors du chargement des commandes", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="orders-page">
      {/* SEO */}
      <Helmet>
        <title>Mes commandes | Douceurs du Chef</title>
        <meta
          name="description"
          content="Consultez vos commandes passées sur Douceurs du Chef. Retrouvez vos produits, quantités et détails de livraison."
        />
        <meta name="robots" content="noindex, nofollow" />
        <link rel="canonical" href={`${window.location.origin}/orders`} />
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
                <p>
                  <strong>Client :</strong> {order.clientName}
                </p>
                <p>
                  <strong>Email :</strong> {order.clientEmail}
                </p>
                <p>
                  <strong>Adresse :</strong> {order.address}
                </p>
                <p>
                  <strong>Total :</strong> {order.totalPrice.toFixed(2)} DT
                </p>
              </div>

              <div className="order-products">
                <p><strong>Produits :</strong></p>
                <ul>
                  {order.products.map((p) => (
                    <li key={p.product._id}>
                      {p.product.name} x {p.quantity}
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
