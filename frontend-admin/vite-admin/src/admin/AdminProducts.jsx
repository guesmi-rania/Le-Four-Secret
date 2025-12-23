import React, { useEffect, useState } from "react";
import axios from "axios";

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({ name: "", category: "", price: "" });
  const [editingId, setEditingId] = useState(null);
  const token = localStorage.getItem("adminToken");
  const PRODUCTS_URL = import.meta.env.VITE_PRODUCTS_URL;

  const fetchProducts = async () => {
    try {
      const res = await axios.get(PRODUCTS_URL, { headers: { Authorization: `Bearer ${token}` } });
      setProducts(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error(err);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) fetchProducts();
  }, [token]);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        // Modifier
        await axios.put(`${PRODUCTS_URL}/${editingId}`, formData, { headers: { Authorization: `Bearer ${token}` } });
      } else {
        // Ajouter
        await axios.post(PRODUCTS_URL, formData, { headers: { Authorization: `Bearer ${token}` } });
      }
      setFormData({ name: "", category: "", price: "" });
      setEditingId(null);
      fetchProducts();
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (prod) => {
    setFormData({ name: prod.name, category: prod.category, price: prod.price });
    setEditingId(prod._id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Supprimer ce produit ?")) return;
    try {
      await axios.delete(`${PRODUCTS_URL}/${id}`, { headers: { Authorization: `Bearer ${token}` } });
      fetchProducts();
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <p>Chargement des produits...</p>;

  return (
    <div className="dashboard-content">
      <h3>Produits</h3>

      {/* Formulaire Ajouter / Modifier */}
      <form onSubmit={handleSubmit} style={{ marginBottom: "20px", display: "flex", gap: "10px" }}>
        <input name="name" placeholder="Nom" value={formData.name} onChange={handleChange} required />
        <input name="category" placeholder="Catégorie" value={formData.category} onChange={handleChange} required />
        <input name="price" type="number" placeholder="Prix" value={formData.price} onChange={handleChange} required />
        <button type="submit">{editingId ? "Modifier" : "Ajouter"}</button>
      </form>

      {/* Tableau produits */}
      {products.length === 0 ? (
        <p>Aucun produit trouvé.</p>
      ) : (
        <table className="orders-table">
          <thead>
            <tr>
              <th>Nom</th>
              <th>Catégorie</th>
              <th>Prix</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((prod) => (
              <tr key={prod._id}>
                <td>{prod.name}</td>
                <td>{prod.category}</td>
                <td>{prod.price} DT</td>
                <td>
                  <button onClick={() => handleEdit(prod)}>Modifier</button>
                  <button onClick={() => handleDelete(prod._id)} style={{ marginLeft: "10px", color: "red" }}>Supprimer</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
