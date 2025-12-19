import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import rawData from "../data/data.json";
import "../styles/ProductsByCategory.css";
import { FaShoppingCart, FaHeart, FaRegHeart, FaEye, FaBalanceScale } from "react-icons/fa";

export default function ProductsByCategory({
  onAddToCart,
  wishlist = [],
  compareList = [],
  onToggleWishlist,
  onAddToCompare,
}) {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  useEffect(() => {
    const allProducts = rawData.flatMap((cat) =>
      cat.products.map((name, index) => ({
        _id: `${cat.category}-${index}`,
        name,
        categories: [cat.category],
        price: Math.floor(Math.random() * 50) + 10,
        imageUrl: `/images/products/${name.replace(/\s+/g, "-")}.jpg`,
      }))
    );

    const filtered = allProducts.filter(
      (p) =>
        p.categories.includes(category) &&
        p.price >= minPrice &&
        p.price <= maxPrice
    );

    setProducts(filtered);
  }, [category, minPrice, maxPrice]);

  return (
    <div className="products-by-category-page">
      <div className="banner">
        <h1>{category}</h1>
      </div>

      <div className="category-content">
        {/* Sidebar filtres */}
        <aside className="sidebar">
          <h3>Filtrer par prix</h3>
          <div className="price-filter">
            <label>
              Min : {minPrice} TND
              <input
                type="range"
                min="0"
                max="1000"
                value={minPrice}
                onChange={(e) => setMinPrice(Number(e.target.value))}
              />
            </label>
            <label>
              Max : {maxPrice} TND
              <input
                type="range"
                min="0"
                max="1000"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
              />
            </label>
          </div>
        </aside>

        {/* Liste des produits */}
        <div className="products-list">
          {products.map((product) => {
            const isInWishlist = wishlist.some((i) => i._id === product._id);
            const isInCompare = compareList.some((i) => i._id === product._id);

            return (
              <div key={product._id} className="product-card">
                <Link to={`/produits/${product._id}`} className="product-link">
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
                  <button className="quickview-btn" onClick={() => setQuickViewProduct(product)}>
                    <FaEye />
                  </button>
                  <button
                    className="compare-btn"
                    onClick={() => onAddToCompare(product)}
                    disabled={isInCompare}
                  >
                    <FaBalanceScale />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* QuickView Modal */}
      {quickViewProduct && (
        <div className="quickview-modal" onClick={() => setQuickViewProduct(null)}>
          <div className="quickview-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={() => setQuickViewProduct(null)}>×</button>
            <img src={quickViewProduct.imageUrl} alt={quickViewProduct.name} />
            <h2>{quickViewProduct.name}</h2>
            <p>Prix: {quickViewProduct.price.toFixed(2)} TND</p>
            <button onClick={() => onAddToCart(quickViewProduct)}>Ajouter au panier</button>
          </div>
        </div>
      )}
    </div>
  );
}
