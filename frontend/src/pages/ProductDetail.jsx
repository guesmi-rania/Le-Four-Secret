import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaHeart, FaRegHeart, FaStar, FaArrowLeft, FaBalanceScale } from "react-icons/fa";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export default function ProductDetail({ onAddToCart, wishlist, onToggleWishlist, onAddToCompare, compareList }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    axios.get(`${BASE_URL}/products/${id}`)
      .then(res => {
        setProduct(res.data);
        setSelectedImage(res.data.images?.[0] || null);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p>Chargement...</p>;
  if (!product) return <p>Produit non trouvé</p>;

  const isInWishlist = wishlist.some(item => item._id === product._id);
  const isInCompare = compareList.some(item => item._id === product._id);

  return (
    <div className="product-detail">
      <button className="back-btn" onClick={() => navigate("/produits")}>
        <FaArrowLeft /> Retour
      </button>

      <div className="product-main">
        <div className="gallery">
          {product.images && product.images.length > 1 && (
            <div className="thumbnails">
              {product.images.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt={`Miniature ${i + 1}`}
                  className={selectedImage === img ? "selected" : ""}
                  onClick={() => setSelectedImage(img)}
                />
              ))}
            </div>
          )}
          <img className="main-image" src={selectedImage || product.images?.[0]} alt={product.name} />
        </div>

        <div className="product-info">
          <h1>{product.name}</h1>

          <div className="rating">
            {[1,2,3,4,5].map(star => (
              <FaStar
                key={star}
                color={star <= Math.round(product.rating || 0) ? "#FFD700" : "#ccc"}
              />
            ))}
            <span> ({product.ratingCount || 0} avis)</span>
          </div>

          <p className="price">{product.price.toFixed(2)} €</p>
          <p className="description">{product.description}</p>

          <label>
            Quantité :
            <input
              type="number"
              min="1"
              max={product.stock || 100}
              value={quantity}
              onChange={e => setQuantity(Math.max(1, Math.min(product.stock || 100, Number(e.target.value))))}
            />
          </label>

          <div className="actions">
            <button onClick={() => onAddToCart(product, quantity)}>
              Ajouter au panier
            </button>

            <button onClick={() => onToggleWishlist(product)}>
              {isInWishlist ? <FaHeart color="red" /> : <FaRegHeart />}
              <span>Favoris</span>
            </button>

            <button onClick={() => onAddToCompare(product)} disabled={isInCompare}>
              <FaBalanceScale />
              <span>{isInCompare ? "Déjà en comparaison" : "Comparer"}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
