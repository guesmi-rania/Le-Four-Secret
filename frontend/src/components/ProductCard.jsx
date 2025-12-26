import React from "react";
import { FaShoppingCart, FaHeart, FaRegHeart, FaEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "../styles/ProductCard.css";

export default function ProductCard({
  product,
  onAddToCart,
  wishlist,
  onToggleWishlist,
  onAddToCompare,
  openQuickView
}) {
  const navigate = useNavigate();
  const isInWishlist = wishlist?.some(item => item._id === product._id);

  const handleWishlistClick = (e) => {
    e.stopPropagation(); // empêche le clic de propager vers la page détail
    onToggleWishlist(product);
  };

  return (
    <div
      className="product-card"
      onClick={() => navigate(`/produits/detail/${product._id}`)} // clique sur la carte = page détail
    >
      <div className="product-image-container">
        <img
          src={product.imageUrl || "/placeholder.png"}
          alt={product.name}
          className="product-image"
        />
        <div className="product-icons">
          <button
            className={`icon-btn wishlist ${isInWishlist ? "active" : ""}`}
            onClick={handleWishlistClick}
          >
            {isInWishlist ? <FaHeart /> : <FaRegHeart />}
          </button>

          <button
            className="icon-btn compare"
            onClick={(e) => { e.stopPropagation(); onAddToCompare(product); }}
          >
            ⚖️
          </button>

          <button
            className="icon-btn quickview"
            onClick={(e) => { e.stopPropagation(); openQuickView(product); }}
          >
            <FaEye />
          </button>
        </div>
      </div>

      <div className="product-info">
        <h3>{product.name}</h3>
        <p className="price">{product.price?.toFixed(2)} TND</p>
        <button
          className="add-to-cart-btn"
          onClick={(e) => { e.stopPropagation(); onAddToCart(product); }}
        >
          <FaShoppingCart /> Ajouter au panier
        </button>
      </div>
    </div>
  );
}
