import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { 
  FaShoppingCart, FaHeart, FaRegHeart, FaBalanceScale 
} from "react-icons/fa";
import "../styles/ProductDetail.css";

const BASE_URL = import.meta.env.VITE_API_URL;

export default function ProductDetail({
  onAddToCart,
  onAddToWishlist,
  onAddToCompare,
  wishlist = [],
  compareList = [],
}) {
  const { id } = useParams(); // ✅ doit correspondre à la route "/produits/:id"
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const res = await axios.get(`${BASE_URL}/api/products/${id}`);
        setProduct(res.data);
      } catch (err) {
        console.error("Produit non trouvé", err);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    }
    fetchProduct();
  }, [id]);

  if (loading) return <div className="product-detail-wrapper">Chargement…</div>;
  if (!product) return <div className="product-detail-wrapper">❌ Produit non trouvé</div>;

  const isInWishlist = wishlist.some((i) => i._id === product._id);
  const isInCompare = compareList.some((i) => i._id === product._id);

  return (
    <div className="product-detail-wrapper">
      <div className="product-detail">
        <div className="product-images">
          <img src={product.imageUrl} alt={product.name} />
        </div>

        <div className="product-info">
          <h1>{product.name}</h1>
          <p className="price">{product.price.toFixed(2)} TND</p>

          <div className="quantity-box">
            <button onClick={() => setQuantity(q => Math.max(1, q - 1))}>-</button>
            <span>{quantity}</span>
            <button onClick={() => setQuantity(q => q + 1)}>+</button>
          </div>

          <div className="product-buttons">
            <button onClick={() => onAddToCart({ ...product, quantity })} className="btn-cart">
              <FaShoppingCart /> Ajouter au panier
            </button>
            <button onClick={() => onAddToWishlist(product)} className="btn-wishlist">
              {isInWishlist ? <FaHeart color="red" /> : <FaRegHeart />} Wishlist
            </button>
            <button onClick={() => onAddToCompare(product)} className="btn-compare" disabled={isInCompare}>
              <FaBalanceScale /> Comparer
            </button>
          </div>

          <div className="product-description">
            <h3>Description</h3>
            <p>{product.description}</p>
          </div>

          {product.categories && (
            <p><strong>Catégories :</strong> {product.categories.join(", ")}</p>
          )}
          {product.tags && (
            <p><strong>Tags :</strong> {product.tags.join(", ")}</p>
          )}
          {product.brands && (
            <p><strong>Marques :</strong> {product.brands.join(", ")}</p>
          )}
        </div>
      </div>
    </div>
  );
}
