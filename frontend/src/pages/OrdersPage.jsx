import React, { useState, useEffect } from "react";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL || "https://recettes-de-cuisine.onrender.com";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Appel API pour récupérer les commandes
    axios.get(`${BASE_URL}/api/orders`)
      .then((res) => {
        setOrders(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Erreur lors du chargement des commandes", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Chargement des commandes...</p>;

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "auto" }}>
      <h2>Mes commandes</h2>
      {orders.length === 0 ? (
        <p>Vous n’avez pas encore passé de commande.</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {orders.map(order => (
            <li key={order._id} style={{ border: "1px solid #ddd", marginBottom: "10px", padding: "10px", borderRadius: "8px" }}>
              <p><strong>Client :</strong> {order.clientName}</p>
              <p><strong>Email :</strong> {order.clientEmail}</p>
              <p><strong>Adresse :</strong> {order.address}</p>
              <p><strong>Total :</strong> {order.totalPrice} €</p>
              <p><strong>Produits :</strong></p>
              <ul>
                {order.products.map(p => (
                  <li key={p.product._id}>
                    {p.product.name} x {p.quantity}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
