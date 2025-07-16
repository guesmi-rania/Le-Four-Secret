import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/Shop.css";
import { FaShoppingCart, FaHeart, FaRegHeart } from "react-icons/fa";
import { Link } from "react-router-dom";

const BASE_URL = import.meta.env.VITE_API_URL;

export default function ShopPage({
  onAddToCart,
  wishlist,
  compareList,
  onToggleWishlist,
  onAddToCompare,
}) {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await axios.get(`${BASE_URL}/api/products`);
        setProducts(res.data);
        setFilteredProducts(res.data);
        const uniqueCategories = [...new Set(res.data.map((p) => p.category))];
        setCategories(uniqueCategories);
      } catch (error) {
        alert("Erreur lors du chargement des produits");
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  const handleSearch = (e) => {
    setSearch(e.target.value);
    const filtered = products.filter((p) =>
      p.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  const handleCategoryClick = (category) => {
    const filtered =
      category === "all"
        ? products
        : products.filter((p) => p.category === category);
    setFilteredProducts(filtered);
  };

  return (
    <div className="shop-page">
      <div className="shop-sidebar">
        <h3>Search</h3>
        <input
          type="text"
          value={search}
          onChange={handleSearch}
          placeholder="Search products..."
        />

        <h3>Product Categories</h3>
        <ul>
          <li onClick={() => handleCategoryClick("all")}>All</li>
          {categories.map((cat, i) => (
            <li key={i} onClick={() => handleCategoryClick(cat)}>
              {cat}
            </li>
          ))}
        </ul>
      </div>

      <div className="shop-products">
        {loading ? (
          <p>Loading products...</p>
        ) : (
          <div className="shop-grid">
            {filteredProducts.map((product) => {
              const isInWishlist = wishlist.some(
                (item) => item._id === product._id
              );
              const isInCompare = compareList.some(
                (item) => item._id === product._id
              );

              return (
                <div key={product._id} className="shop-card">
                  <div className="badge">
                    {Math.floor(Math.random() * 30) + 5}%
                  </div>

                  <Link to={`/produits/${product._id}`} className="product-link">
                    <img src={product.imageUrl} alt={product.name} />
                    <h4>{product.name}</h4>
                  </Link>

                  <p className="category">{product.category}</p>
                  <p className="by">By Douceurs du Chef</p>
                  <div className="price-box">
                    <span className="price">{product.price} Dt</span>
                    <span className="old-price">
                      {(product.price * 1.2).toFixed(2)} Dt
                    </span>
                  </div>

                  <div className="product-actions">
                    <button className="add-btn" onClick={() => onAddToCart(product)}>
                      <FaShoppingCart /> Add
                    </button>

                    <div className="right-buttons">
                      <button
                        className="wishlist-btn"
                        onClick={() => onToggleWishlist(product)}
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
                        Compare
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
