import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { FaShoppingCart, FaHeart, FaRegHeart, FaExchangeAlt } from "react-icons/fa";

const BASE_URL = import.meta.env.VITE_API_URL;

export default function PopularProducts({ onAddToCart, wishlist = [], compareList = [], onToggleWishlist, onAddToCompare }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await axios.get(`${BASE_URL}/api/products`);
        setProducts(res.data.slice(0,6)); // Affiche 6 produits populaires
      } catch (err) {
        console.error("Erreur chargement produits :", err);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  if (loading) return <p>Chargement des produits populaires...</p>;

  return (
    <section className="popular-products">
      <div className="section-header">
        <h2>Produits Populaires</h2>
        <p>Découvrez nos produits les plus appréciés cette semaine.</p>
      </div>

      <div className="products-grid">
        {products.map(product => {
          const isInWishlist = wishlist.some(item => item._id === product._id);
          const isInCompare = compareList.some(item => item._id === product._id);
          const imageUrl = product.imageUrl || `/images/products/${product.name.toLowerCase().replace(/[\s\(\)&]/g,"-")}.webp`;

          return (
            <div key={product._id} className="product-card">
              <Link to={`/produits/${product.slug}`} className="product-link">
                <img src={imageUrl} alt={product.name} onError={e=>e.target.src="/images/products/default.webp"} />
                <h4>{product.name}</h4>
              </Link>
              <p className="category">{product.category}</p>
              <div className="price-box">
                <span className="price">{product.price} TND</span>
                <span className="old-price">{(product.price*1.2).toFixed(2)} TND</span>
              </div>
              <div className="product-buttons">
                <button onClick={()=>onAddToCart(product)} title="Ajouter au panier"><FaShoppingCart /></button>
                <button onClick={()=>onToggleWishlist(product)} title="Wishlist">{isInWishlist ? <FaHeart color="red"/> : <FaRegHeart />}</button>
                <button onClick={()=>onAddToCompare(product)} disabled={isInCompare} title="Comparer"><FaExchangeAlt /></button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
