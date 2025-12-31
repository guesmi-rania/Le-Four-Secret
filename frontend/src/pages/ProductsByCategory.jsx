import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "../styles/ProductsByCategory.css";
import { FaShoppingCart, FaHeart, FaRegHeart, FaEye, FaBalanceScale } from "react-icons/fa";

export default function ProductsByCategory({
  onAddToCart,
  wishlist = [],
  compareList = [],
  onToggleWishlist,
  onAddToCompare,
  openQuickView,
}) {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);

  const BASE_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    axios.get(`${BASE_URL}/api/products`)
      .then(res => {
        // Filtrer par catégorie et prix
        const filtered = res.data
          .filter(p => p.categories?.includes(category) && p.price >= minPrice && p.price <= maxPrice);
        setProducts(filtered);
      })
      .catch(err => console.error("Erreur récupération produits :", err));
  }, [category, minPrice, maxPrice]);

  return (
    <div className="products-by-category-page">
      <div className="banner">
        <h1>{category}</h1>
      </div>

      <div className="category-content">
        <aside className="sidebar">
          <h3>Filtrer par prix</h3>
          <div className="price-filter">
            <label>
              Min : {minPrice} TND
              <input type="range" min="0" max="1000" value={minPrice} onChange={(e) => setMinPrice(Number(e.target.value))} />
            </label>
            <label>
              Max : {maxPrice} TND
              <input type="range" min="0" max="1000" value={maxPrice} onChange={(e) => setMaxPrice(Number(e.target.value))} />
            </label>
          </div>
        </aside>

        <div className="products-list">
          {products.length === 0 && <p>Aucun produit trouvé pour cette catégorie.</p>}

          {products.map(product => {
            const isInWishlist = wishlist.some(i => i._id === product._id);
            const isInCompare = compareList.some(i => i._id === product._id);

            return (
              <div key={product._id} className="product-card">
                <Link to={`/produits/detail/${product._id}`} className="product-link">
                  <img src={product.imageUrl} alt={product.name} />
                  <h3>{product.name}</h3>
                </Link>
                <p className="price">{product.price.toFixed(2)} TND</p>

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
                  <button className="compare-btn" onClick={() => onAddToCompare(product)} disabled={isInCompare}>
                    <FaBalanceScale />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
