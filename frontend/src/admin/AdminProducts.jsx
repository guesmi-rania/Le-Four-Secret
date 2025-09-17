import React, { useState } from "react";
import AdminNavbar from "./AdminNavbar";
import "../styles/admin.css";

export default function AdminProducts() {
  const [products, setProducts] = useState([
    { id: 1, name: "Tarte au citron" },
    { id: 2, name: "Millefeuille" },
  ]);
  const [newProduct, setNewProduct] = useState("");

  const addProduct = () => {
    if (newProduct.trim() !== "") {
      setProducts([...products, { id: Date.now(), name: newProduct }]);
      setNewProduct("");
    }
  };

  const deleteProduct = (id) => {
    setProducts(products.filter((p) => p.id !== id));
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
            <li key={p.id}>
              {p.name}
              <button onClick={() => deleteProduct(p.id)}>❌</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
