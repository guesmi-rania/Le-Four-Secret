// src/components/PopularProducts.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { FaShoppingCart, FaHeart, FaRegHeart, FaExchangeAlt } from "react-icons/fa";

const BASE_URL = import.meta.env.VITE_API_URL;

function PopularProducts({ onAddToCart, wishlist, compareList, onToggleWishlist, onAddToCompare }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await axios.get(`${BASE_URL}/api/categories`);
        const allProducts = [];
        res.data.forEach((cat) => {
          cat.products.forEach((prodName) => {
            allProducts.push({
              _id: `${cat.category}-${prodName}`,
              name: prodName,
              category: cat.category,
              price: Math.floor(Math.random() * 20 + 5),
              imageUrl: `/images/products/${prodName
                .toLowerCase()
                .replace(/[\s\(\)&]/g, "-")}.webp`,
            });
          });
        });
        setProducts(allProducts.slice(0, 6));
      } catch (err) {
        console.error(err);
        setError("Impossible de charger les produits populaires.");
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  return (
    <section className="popular-products">
      <div className="section-header">
        <h2>Produits Populaires</h2>
        <p>Découvrez tous nos produits populaires de la semaine.</p>
      </div>

      {loading ? (
        <p className="loading">Chargement...</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : (
        <div className="products-grid">
          {products.map((product) => {
            const isInWishlist = wishlist?.some((item) => item._id === product._id);
            const isInCompare = compareList?.some((item) => item._id === product._id);

            return (
              <div key={product._id} className="product-card">
                <Link to={`/produits/${product._id}`} className="product-link">
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    onError={(e) => (e.target.src = "/images/products/default.webp")}
                  />
                  <h4>{product.name}</h4>
                </Link>
                <p className="category">{product.category}</p>
                <div className="price-box">
                  <span className="price">{product.price} Dt</span>
                  <span className="old-price">{(product.price * 1.2).toFixed(2)} Dt</span>
                </div>

                <div className="product-buttons">
                  <button onClick={() => onAddToCart(product)} title="Ajouter au panier">
                    <FaShoppingCart />
                  </button>
                  <button onClick={() => onToggleWishlist(product)} title="Ajouter à la wishlist">
                    {isInWishlist ? <FaHeart className="wishlist-active" /> : <FaRegHeart />}
                  </button>
                  <button
                    onClick={() => onAddToCompare(product)}
                    disabled={isInCompare}
                    title="Comparer"
                  >
                    <FaExchangeAlt />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}

export default PopularProducts;
