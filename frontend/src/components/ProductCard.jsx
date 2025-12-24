import React from "react";
import { Link } from "react-router-dom";
import "../styles/ProductCard.css";
import { FaHeart, FaRegHeart, FaShoppingCart } from "react-icons/fa";

export default function ProductCard({ product, onAddToCart, onAddToWishlist, wishlist }) {
  const isInWishlist = wishlist?.some(item => item._id === product._id);

  return (
    <div className="product-card">
      {product.discount && <div className="badge-discount">-{product.discount}%</div>}

      <Link to={`/product/${product.slug}`}>
        <div className="product-image-wrapper">
          <img src={product.imageUrl} alt={product.name} />
        </div>
      </Link>

      <div className="product-info">
        <h3>{product.name}</h3>
        <p className="category">{product.category}</p>
        {product.color && <p className="color">Couleur: {product.color}</p>}
        <p className="price">
          {product.discount
            ? <>
                <span className="old-price">{product.price.toFixed(2)} TND</span> 
                {(product.price * (1 - product.discount / 100)).toFixed(2)} TND
              </>
            : `${product.price.toFixed(2)} TND`}
        </p>

        <div className="buttons">
          <button onClick={() => onAddToCart?.(product)} className="btn-add"><FaShoppingCart /> Ajouter</button>
          <button onClick={() => onAddToWishlist?.(product)} className="btn-wishlist">
            {isInWishlist ? <FaHeart /> : <FaRegHeart />}
          </button>
        </div>

        <Link to={`/product/${product.slug}`} className="btn-view">Voir détail</Link>
      </div>
    </div>
  );
}
