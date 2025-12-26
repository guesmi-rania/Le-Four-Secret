import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/ProductDetail.css";
import { FaShoppingCart, FaHeart, FaRegHeart } from "react-icons/fa";
import axios from "axios";

export default function ProductDetail({
  onAddToCart,
  onAddToWishlist,
  wishlist,
  onAddToCompare
}) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const BASE_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${BASE_URL}/api/products/${id}`);
        if (!res.data) throw new Error("Produit non trouvé");
        setProduct(res.data);
        setSelectedImage(res.data.imageUrl || "/placeholder.png");
      } catch (err) {
        console.error(err);
        setError("Produit non trouvé");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id, BASE_URL]);

  if (loading) return <p className="loading">Chargement du produit...</p>;
  if (error)
    return (
      <div className="error-page">
        <p className="error">{error}</p>
        <button onClick={() => navigate(-1)} className="back-btn">
          ← Retour à la boutique
        </button>
      </div>
    );

  const isInWishlist = wishlist?.some(item => item._id === product._id);

  const handleQuantityChange = (type) => {
    if (type === "plus") setQuantity(prev => prev + 1);
    else if (type === "minus" && quantity > 1) setQuantity(prev => prev - 1);
  };

  return (
    <div className="product-detail-page">
      <div className="product-detail-left">
        <div className="main-image-container">
          <img src={selectedImage} alt={product.name} className="main-image" />
        </div>

        {product.gallery && product.gallery.length > 0 && (
          <div className="image-gallery">
            {[product.imageUrl, ...product.gallery].map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`${product.name}-${idx}`}
                className={selectedImage === img ? "active" : ""}
                onClick={() => setSelectedImage(img)}
              />
            ))}
          </div>
        )}
      </div>

      <div className="product-detail-right">
        <h1 className="product-title">{product.name}</h1>
        <p className="price">{product.price?.toFixed(2)} TND</p>

        <div className="product-description">
          <h2>Description</h2>
          <p>{product.description}</p>
        </div>

        <div className="quantity-selector">
          <button onClick={() => handleQuantityChange("minus")}>−</button>
          <span>{quantity}</span>
          <button onClick={() => handleQuantityChange("plus")}>+</button>
        </div>

        <div className="buttons">
          <button
            onClick={() => onAddToCart({ ...product, quantity })}
            className="add-to-cart"
          >
            <FaShoppingCart /> Ajouter au panier
          </button>

          <button
            onClick={() => onAddToWishlist(product)}
            className={`wishlist ${isInWishlist ? "active" : ""}`}
          >
            {isInWishlist ? <FaHeart /> : <FaRegHeart />} Ajouter à la wishlist
          </button>

          <button
            onClick={() => onAddToCompare(product)}
            className="compare-btn"
          >
            ⚖️ Comparer
          </button>
        </div>

        <div className="payment-methods">
          <h3>Méthodes de paiement :</h3>
          <div className="payment-icons">
            <span>💳 Visa</span>
            <span>💳 Mastercard</span>
            <span>💳 PayPal</span>
          </div>
        </div>

        <div className="back-section">
          <button onClick={() => navigate(-1)} className="back-btn">
            ← Retour à la boutique
          </button>
        </div>
      </div>
    </div>
  );
}
