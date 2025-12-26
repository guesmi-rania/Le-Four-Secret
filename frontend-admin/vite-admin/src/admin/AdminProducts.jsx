import React, { useEffect, useState } from "react";
import axios from "axios";

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = localStorage.getItem("adminToken");
  const BASE_URL = import.meta.env.VITE_API_URL || "https://recettes-de-cuisine.onrender.com";

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/admin/products`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProducts(res.data || []);
      } catch (err) {
        console.error(err);
        setError("Impossible de charger les produits.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [token]);

  if (loading) return <p>Chargement des produits...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!products.length) return <p>Aucun produit trouvé.</p>;

  return (
    <table className="orders-table">
      <thead>
        <tr>
          <th>Nom</th>
          <th>Prix</th>
          <th>Catégorie</th>
          <th>Créé le</th>
        </tr>
      </thead>
      <tbody>
        {products.map((p) => (
          <tr key={p._id}>
            <td>{p.name}</td>
            <td>{p.price} DT</td>
            <td>{p.category}</td>
            <td>{new Date(p.createdAt).toLocaleDateString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
