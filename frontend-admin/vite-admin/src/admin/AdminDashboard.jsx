import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/admin.css";

export default function AdminDashboard() {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("adminToken");
  const BASE_URL = import.meta.env.VITE_API_URL; // admin routes
  const PRODUCTS_URL = import.meta.env.VITE_PRODUCTS_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const ordersRes = await axios.get(`${BASE_URL}/orders`, {
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

    if (token) fetchData();
    else setLoading(false);
  }, [token, BASE_URL, PRODUCTS_URL]);

  if (loading) return <p style={{ padding: "20px" }}>Chargement...</p>;

  return (
    <div>
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
      <div className="dashboard-content">
        <h3>Commandes récentes</h3>
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
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
