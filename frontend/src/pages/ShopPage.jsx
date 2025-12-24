import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import "../styles/Shop.css";

export default function ShopPage({ onAddToCart, onAddToWishlist, wishlist }) {
  const BASE_URL = import.meta.env.VITE_API_URL;
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filters, setFilters] = useState({ category: "All", price: [0, 100], color: "All" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${BASE_URL}/api/products`);
        setProducts(res.data);
        const cats = ["All", ...new Set(res.data.map(p => p.category))];
        setCategories(cats);
      } catch (err) {
        console.error("Erreur récupération produits :", err);
        setError("Impossible de charger les produits.");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const filteredProducts = products.filter((p) => {
    const inCategory = filters.category === "All" || p.category === filters.category;
    const inPrice = p.price >= filters.price[0] && p.price <= filters.price[1];
    const inColor = filters.color === "All" || p.color === filters.color;
    return inCategory && inPrice && inColor;
  });

  return (
    <div className="shop-container">
      <h1>Nos Produits</h1>

      {/* Filtres */}
      <div className="filters">
        <select value={filters.category} onChange={e => setFilters({ ...filters, category: e.target.value })}>
          {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
        </select>

        <input
          type="range"
          min="0"
          max="100"
          value={filters.price[1]}
          onChange={e => setFilters({ ...filters, price: [0, Number(e.target.value)] })}
        />
        <span>Max: {filters.price[1]} TND</span>

        <select value={filters.color} onChange={e => setFilters({ ...filters, color: e.target.value })}>
          <option value="All">Toutes les couleurs</option>
          <option value="Red">Rouge</option>
          <option value="Blue">Bleu</option>
          <option value="Green">Vert</option>
        </select>
      </div>

      {/* Produits */}
      {loading && <p>Chargement des produits...</p>}
      {error && <p className="error">{error}</p>}
      {!loading && !error && filteredProducts.length === 0 && <p>Aucun produit trouvé.</p>}

      <div className="products-grid">
        {!loading && !error && filteredProducts.map(product => (
          <ProductCard key={product._id} product={product} onAddToCart={onAddToCart} onAddToWishlist={onAddToWishlist} wishlist={wishlist} />
        ))}
      </div>
    </div>
  );
}
