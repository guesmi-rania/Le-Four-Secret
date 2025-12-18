import React from "react";
import { FaShoppingCart, FaHeart, FaRegHeart, FaEye } from "react-icons/fa";
import { FaCodeCompare } from "react-icons/fa6";
import { Link } from "react-router-dom";
import "../styles/Shop.css"; // Assure-toi que les styles sont communs

export default function PopularProducts({
  products,
  onAddToCart,
  wishlist,
  compareList,
  onToggleWishlist,
  onAddToCompare,
  openQuickView,
}) {
  if (!products || products.length === 0) return null;

  return (
    <section className="popular-products">
      <h2>Produits Populaires</h2>
      <div className="shop-grid popular-grid">
        {products.slice(0, 6).map((product, i) => {
          const isInWishlist = wishlist.some((item) => item._id === product._id);
          const isInCompare = compareList.some((item) => item._id === product._id);

          return (
            <article key={i} className="shop-card popular-card">
              <div className="badge animate-badge">🔥 Populaire</div>

              <Link to={`/produits/${product._id}`} className="product-link">
                <img src={product.imageUrl} alt={product.name} />
                <h2>{product.name}</h2>
              </Link>

              <p className="category">{(product.categories || []).join(", ")}</p>
              <p className="by">Mr.Chef Lotfi</p>

              <div className="price-box">
                <span className="price">{product.price.toFixed(2)} TND</span>
                <span className="old-price">{(product.price * 1.2).toFixed(2)} TND</span>
              </div>

              <div className="right-buttons">
                <button className="cart-btn" onClick={() => onAddToCart(product)}>
                  <FaShoppingCart />
                </button>
                <button className="wishlist-btn" onClick={() => onToggleWishlist(product)}>
                  {isInWishlist ? <FaHeart /> : <FaRegHeart />}
                </button>
                <button className="quickview-btn" onClick={() => openQuickView(product)}>
                  <FaEye />
                </button>
                <button
                  className="compare-btn"
                  onClick={() => onAddToCompare(product)}
                  disabled={isInCompare}
                >
                  <FaCodeCompare />
                </button>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
