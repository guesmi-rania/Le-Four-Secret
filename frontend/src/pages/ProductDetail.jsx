import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../styles/ProductDetail.css";
import { FaShoppingCart, FaHeart, FaRegHeart, FaBalanceScale } from "react-icons/fa";

const BASE_URL = import.meta.env.VITE_API_URL;

export default function ProductDetail({
  onAddToCart,
  onAddToWishlist,
  onAddToCompare,
  wishlist = [],
  compareList = [],
}) {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const res = await axios.get(`${BASE_URL}/api/products/${id}`);
        setProduct(res.data);
      } catch (err) {
        console.error("Produit non trouvé", err);
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    }
    fetchProduct();
  }, [id]);

  const isInWishlist = wishlist.some(item => item._id === id);
  const isInCompare = compareList.some(item => item._id === id);

  if (loading) return <div className="product-detail">Chargement...</div>;
  if (notFound || !product) return <div className="product-detail">❌ Produit non trouvé</div>;

  return (
    <div className="product-detail">
      <div className="detail-card">
        <img src={product.imageUrl} alt={product.name} className="detail-image" />
        <div className="detail-info">
          <h2>{product.name}</h2>
          <p className="category">{product.category}</p>
          <p className="by">Par Douceurs du Chef</p>

          <div className="price-box">
            <span className="price">{product.price} Dt</span>
            <span className="old-price">{(product.price * 1.2).toFixed(2)} Dt</span>
          </div>

          <div className="detail-actions">
            <button
              className="wishlist-btn"
              onClick={() => onAddToWishlist(product)}
              aria-label="Ajouter aux favoris"
            >
              {isInWishlist ? <FaHeart color="red" /> : <FaRegHeart />}
            </button>

            <button
              className="compare-btn"
              onClick={() => onAddToCompare(product)}
              disabled={isInCompare}
              aria-label="Ajouter à la comparaison"
            >
              <FaBalanceScale />
            </button>

            <button className="add-btn" onClick={() => onAddToCart(product)}>
              <FaShoppingCart /> Ajouter au panier
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
