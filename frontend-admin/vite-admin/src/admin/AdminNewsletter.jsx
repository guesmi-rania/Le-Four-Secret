import React, { useEffect, useState } from "react";
import axios from "axios";

export default function AdminCategories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = localStorage.getItem("adminToken");
  const BASE_URL = import.meta.env.VITE_API_URL || "https://recettes-de-cuisine.onrender.com";

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/admin/categories`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCategories(res.data || []);
      } catch (err) {
        console.error(err);
        setError("Impossible de charger les catégories.");
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, [token]);

  if (loading) return <p>Chargement des catégories...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!categories.length) return <p>Aucune catégorie trouvée.</p>;

  return (
    <table className="orders-table">
      <thead>
        <tr>
          <th>Nom</th>
          <th>Créé le</th>
        </tr>
      </thead>
      <tbody>
        {categories.map((c) => (
          <tr key={c._id}>
            <td>{c.name}</td>
            <td>{new Date(c.createdAt).toLocaleDateString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
