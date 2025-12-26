import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/PopularProducts.css";
import ProductCard from "./ProductCard";

export default function PopularProducts({ products, onAddToCart, wishlist, onToggleWishlist, onAddToCompare, openQuickView }) {
  const navigate = useNavigate();

  if (!products || products.length === 0) return null;

  return (
    <section className="popular-products">
      <h2>Produits Populaires</h2>
      <div className="popular-grid">
        {products.slice(0, 6).map(product => (
          <ProductCard
            key={product._id}
            product={product}
            onAddToCart={onAddToCart}
            wishlist={wishlist}
            onToggleWishlist={onToggleWishlist}
            onAddToCompare={onAddToCompare}
            openQuickView={openQuickView}
          />
        ))}
      </div>
    </section>
  );
}
