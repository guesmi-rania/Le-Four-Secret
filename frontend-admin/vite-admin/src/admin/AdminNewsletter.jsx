import React, { useEffect, useState } from "react";
import axios from "axios";

export default function AdminNewsletter() {
  const [subscribers, setSubscribers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const token = localStorage.getItem("adminToken");
  const BASE_URL = import.meta.env.VITE_API_URL || "https://recettes-de-cuisine.onrender.com";

  useEffect(() => {
    const fetchSubscribers = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/admin/newsletter`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setSubscribers(res.data || []);
      } catch (err) {
        console.error(err);
        setError("Impossible de charger les abonnés.");
      } finally {
        setLoading(false);
      }
    };

    fetchSubscribers();
  }, [token]);

  if (loading) return <p>Chargement des abonnés...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!subscribers.length) return <p>Aucun abonné trouvé.</p>;

  return (
    <div>
      <h2>Abonnés à la Newsletter</h2>
      <table className="orders-table">
        <thead>
          <tr>
            <th>Email</th>
            <th>Inscrit le</th>
          </tr>
        </thead>
        <tbody>
          {subscribers.map((sub) => (
            <tr key={sub._id}>
              <td>{sub.email}</td>
              <td>{new Date(sub.createdAt).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
