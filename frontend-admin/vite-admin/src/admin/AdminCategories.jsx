import React, { useEffect, useState } from "react";
import axios from "axios";

export default function AdminCategories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("adminToken");
  const BASE_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/categories`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCategories(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error(err);
        setCategories([]);
      } finally {
        setLoading(false);
      }
    };
    if (token) fetchCategories();
  }, [token, BASE_URL]);

  if (loading) return <p>Chargement des catégories...</p>;

  return (
    <div className="dashboard-content">
      <h3>Catégories</h3>
      {categories.length === 0 ? (
        <p>Aucune catégorie trouvée.</p>
      ) : (
        <table className="orders-table">
          <thead>
            <tr>
              <th>Nom</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((cat) => (
              <tr key={cat._id}>
                <td>{cat.name}</td>
                <td>{cat.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
