import React from "react";
import { FaTimes, FaShoppingCart, FaHeart, FaRegHeart, FaBalanceScale } from "react-icons/fa";
import "../styles/QuickView.css";

export default function QuickView({
  product,
  onClose,
  onAddToCart,
  onToggleWishlist,
  wishlist,
  onAddToCompare
}) {
  if (!product) return null;

  const isInWishlist = wishlist.some(item => item._id === product._id);

  return (
    <div className="quickview-overlay" onClick={onClose}>
      <div className="quickview-modal" onClick={e => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}><FaTimes /></button>

        <div className="quickview-content">
          <img src={product.imageUrl || "/placeholder.png"} alt={product.name} />
          <div className="quickview-info">
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <p className="price">{product.price.toFixed(2)} TND</p>
            <div className="buttons">
              <button onClick={() => onAddToCart(product)}>
                <FaShoppingCart /> Ajouter au panier
              </button>
              <button onClick={() => onToggleWishlist(product)}>
                {isInWishlist ? <FaHeart /> : <FaRegHeart />} Wishlist
              </button>
              <button onClick={() => onAddToCompare(product)}>
                <FaBalanceScale /> Comparer
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
