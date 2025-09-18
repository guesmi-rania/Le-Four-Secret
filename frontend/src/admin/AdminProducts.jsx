import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminNavbar from "./AdminNavbar";
import "../styles/admin.css";

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState("");

  const token = localStorage.getItem("adminToken");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/products`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProducts(res.data);
      } catch (err) {
        console.error(err.response?.data || err.message);
      }
    };
    fetchProducts();
  }, []);

  const addProduct = async () => {
    if (newProduct.trim() === "") return;
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/products`,
        { name: newProduct },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setProducts([...products, res.data]);
      setNewProduct("");
    } catch (err) {
      console.error(err.response?.data || err.message);
    }
  };

  const deleteProduct = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts(products.filter((p) => p._id !== id));
    } catch (err) {
      console.error(err.response?.data || err.message);
    }
  };

  return (
    <div className="admin-container">
      <AdminNavbar />
      <div className="admin-content">
        <h2>Gestion des Produits</h2>
        <div className="product-form">
          <input
            type="text"
            placeholder="Nom du produit"
            value={newProduct}
            onChange={(e) => setNewProduct(e.target.value)}
          />
          <button onClick={addProduct}>Ajouter</button>
        </div>
        <ul className="product-list">
          {products.map((p) => (
            <li key={p._id}>
              {p.name}
              <button onClick={() => deleteProduct(p._id)}>❌</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
