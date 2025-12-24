import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../styles/ProductDetail.css";
import { FaShoppingCart, FaHeart, FaRegHeart } from "react-icons/fa";
import axios from "axios";

export default function ProductDetail({ onAddToCart, onAddToWishlist, wishlist }) {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const BASE_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${BASE_URL}/api/products/slug/${slug}`);
        setProduct(res.data);
      } catch (err) {
        console.error("Erreur récupération produit :", err);
        setError("Produit non trouvé");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [slug]);

  if (loading) return <p>Chargement du produit...</p>;
  if (error) return <p className="error">{error}</p>;

  const isInWishlist = wishlist?.some(item => item._id === product._id);

  return (
    <div className="product-detail-page">
      <div className="product-detail-left">
        <img src={product.imageUrl} alt={product.name} className="main-image" />
        <div className="product-description">
          <h2>Description</h2>
          <p>{product.description}</p>
        </div>
      </div>

      <div className="product-detail-right">
        <h1>{product.name}</h1>
        <p className="price">{product.price.toFixed(2)} TND</p>

        <div className="buttons">
          <button onClick={() => onAddToCart?.(product)} className="add-to-cart"><FaShoppingCart /> Ajouter au panier</button>
          <button onClick={() => onAddToWishlist?.(product)} className="wishlist">
            {isInWishlist ? <FaHeart /> : <FaRegHeart />} Ajouter à la wishlist
          </button>
        </div>

        <div className="payment-methods">
          <h3>Méthodes de paiement :</h3>
          <span>💳 Visa</span> <span>💳 Mastercard</span> <span>💳 PayPal</span>
        </div>
      </div>
    </div>
  );
}
