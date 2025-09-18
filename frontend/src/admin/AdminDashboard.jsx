import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminNavbar from "./AdminNavbar";
import "../styles/admin.css";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    clients: 0,
    products: 0,
    orders: 0,
  });
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("adminToken");

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [clientsRes, productsRes, ordersRes] = await Promise.all([
          axios.get(`${import.meta.env.VITE_API_URL}/api/admin/clients`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get(`${import.meta.env.VITE_API_URL}/api/products`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get(`${import.meta.env.VITE_API_URL}/api/orders`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        setStats({
          clients: clientsRes.data.length,
          products: productsRes.data.length,
          orders: ordersRes.data.length,
        });
        setLoading(false);
      } catch (err) {
        console.error("Erreur chargement stats :", err.response?.data || err.message);
        setLoading(false);
      }
    };

    fetchStats();
  }, [token]);

  if (loading) return <p>Chargement des statistiques...</p>;

  return (
    <div className="admin-container">
      <AdminNavbar />
      <div className="admin-content">
        <h2>Tableau de Bord</h2>
        <div className="cards">
          <div className="card">Produits : {stats.products}</div>
          <div className="card">Commandes : {stats.orders}</div>
          <div className="card">Clients : {stats.clients}</div>
        </div>
      </div>
    </div>
  );
}
