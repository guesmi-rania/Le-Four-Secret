import React, { useEffect, useState } from "react";
import axios from "axios";

export default function AdminNewsletter() {
  const [subscribers, setSubscribers] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("adminToken");
  const BASE_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchSubscribers = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/newsletter`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setSubscribers(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error(err);
        setSubscribers([]);
      } finally {
        setLoading(false);
      }
    };
    if (token) fetchSubscribers();
  }, [token, BASE_URL]);

  if (loading) return <p>Chargement des abonnés...</p>;

  return (
    <div className="dashboard-content">
      <h3>Newsletter</h3>
      {subscribers.length === 0 ? (
        <p>Aucun abonné trouvé.</p>
      ) : (
        <table className="orders-table">
          <thead>
            <tr>
              <th>Email</th>
              <th>Date d'inscription</th>
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
      )}
    </div>
  );
}
