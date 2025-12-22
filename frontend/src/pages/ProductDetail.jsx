import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../styles/ProductDetail.css";
import { FaShoppingCart, FaHeart, FaRegHeart, FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";
import React360Viewer from "react-360-view";
import axios from "axios";

export default function ProductDetail({ onAddToCart, onAddToWishlist, wishlist }) {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const BASE_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    // Récupérer le produit depuis le backend
    axios.get(`${BASE_URL}/api/products/${id}`)
      .then(res => {
        const p = res.data;
        // Ajouter description et images360 si pas présentes
        setProduct({
          ...p,
          description: p.description || `Description détaillée pour ${p.name}. Ici vous pouvez ajouter toutes les informations du produit.`,
          images360: p.images360 || Array.from({ length: 36 }, (_, i) =>
            `/images/products/360/${p.name.replace(/\s+/g, "-")}/${i}.jpg`
          ),
          price: p.price || Math.floor(Math.random() * 50) + 10
        });
      })
      .catch(err => console.error("Erreur récupération produit :", err));
  }, [id]);

  if (!product) return <p>Chargement du produit...</p>;

  const isInWishlist = wishlist.some((item) => item._id === product._id);

  return (
    <div className="product-detail-page">
      <div className="product-detail-left">
        <img src={product.imageUrl} alt={product.name} className="main-image" />

        {product.images360 && product.images360.length > 0 && (
          <React360Viewer
            amount={product.images360.length}
            imagePath={`/images/products/360/${product.name.replace(/\s+/g, "-")}/`}
            fileName="{}.jpg"
            spinReverse={false}
          />
        )}

        <hr className="separator" />

        <div className="product-description">
          <h2>Description du produit</h2>
          <p>{product.description}</p>
        </div>

        <div className="social-buttons">
          <button className="facebook"><FaFacebookF /> Partager</button>
          <button className="twitter"><FaTwitter /> Tweeter</button>
          <button className="instagram"><FaInstagram /> Instagram</button>
        </div>
      </div>

      <div className="product-detail-right">
        <h1>{product.name}</h1>
        <p className="price">{product.price.toFixed(2)} TND</p>

        <div className="product-buttons">
          <button className="add-to-cart" onClick={() => onAddToCart(product)}>
            <FaShoppingCart /> Ajouter au panier
          </button>

          <button className="wishlist" onClick={() => onAddToWishlist(product)}>
            {isInWishlist ? <FaHeart /> : <FaRegHeart />} Ajouter à la wishlist
          </button>
        </div>

        <div className="payment-methods-right">
          <h3>Méthodes de paiement acceptées :</h3>
          <span>💳 Visa</span>
          <span>💳 Mastercard</span>
          <span>💳 PayPal</span>
        </div>
      </div>
    </div>
  );
}
