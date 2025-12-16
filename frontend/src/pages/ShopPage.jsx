// src/pages/ShopPage.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/Shop.css";
import { FaShoppingCart, FaHeart, FaRegHeart, FaEye } from "react-icons/fa";
import { FaCodeCompare } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { createProduct } from "../utils/productFactory.js";

const BASE_URL = import.meta.env.VITE_API_URL;

// Normalisation du produit
const normalizeProduct = (product) => ({
  _id: product._id,
  name: product.name,
  category: product.category,
  price: product.price,
  imageUrl: product.imageUrl,
});

export default function ShopPage({ onAddToCart, wishlist = [], compareList = [], onToggleWishlist, onAddToCompare }) {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);

  // Quick View modal
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await axios.get(`${BASE_URL}/api/categories`);
        const categoriesData = res.data;

        const allProducts = [];
        categoriesData.forEach((cat) => {
          cat.products.forEach((prodName) => {
            allProducts.push(createProduct(cat.category, prodName));
          });
        });

        setProducts(allProducts);
        setCategories(categoriesData.map((c) => c.category));
        setFilteredProducts(allProducts);
      } catch (error) {
        console.error("Erreur fetchCategories:", error);
        alert("Erreur lors du chargement des produits");
      } finally {
        setLoading(false);
      }
    }

    fetchCategories();
  }, []);

  useEffect(() => {
    let temp = [...products];
    if (search) temp = temp.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()));
    if (selectedCategories.length > 0) temp = temp.filter((p) => selectedCategories.includes(p.category));
    temp = temp.filter((p) => p.price >= minPrice && p.price <= maxPrice);
    setFilteredProducts(temp);
  }, [search, selectedCategories, minPrice, maxPrice, products]);

  const toggleCategory = (cat) => {
    if (selectedCategories.includes(cat)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== cat));
    } else {
      setSelectedCategories([...selectedCategories, cat]);
    }
  };

  const resetFilters = () => {
    setSearch("");
    setSelectedCategories([]);
    setMinPrice(0);
    setMaxPrice(1000);
  };

  const openQuickView = (product) => setQuickViewProduct(product);
  const closeQuickView = () => setQuickViewProduct(null);

  return (
    <div className="shop-page">
      <aside className="shop-sidebar">
        <h3>Recherche</h3>
        <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Rechercher un produit..." aria-label="Rechercher un produit" />

        <h3>Catégories</h3>
        <div className="checkbox-group">
          {categories.map((cat, i) => (
            <label key={i} className="checkbox-label">
              <input type="checkbox" checked={selectedCategories.includes(cat)} onChange={() => toggleCategory(cat)} />
              {cat}
            </label>
          ))}
        </div>

        <h3>Prix</h3>
        <div className="price-filter">
          <input type="number" placeholder="Min" value={minPrice} onChange={(e) => setMinPrice(Number(e.target.value))} />
          <span> - </span>
          <input type="number" placeholder="Max" value={maxPrice} onChange={(e) => setMaxPrice(Number(e.target.value))} />
        </div>

        <button className="reset-btn" onClick={resetFilters}>Réinitialiser</button>
      </aside>

      <section className="shop-products">
        {loading ? (
          <p>Chargement des produits...</p>
        ) : (
          <div className="shop-grid">
            {filteredProducts.map((product) => {
              const isInWishlist = wishlist.some((item) => item._id === product._id);
              const isInCompare = compareList.some((item) => item._id === product._id);
              const safeProduct = normalizeProduct(product);

              return (
                <article key={product._id} className="shop-card">
                  <div className="badge">{Math.floor(Math.random() * 30) + 5}%</div>

                  <Link to={`/produits/${product._id}`} className="product-link">
                    <img src={product.imageUrl} alt={`${product.name} (${product.category})`} />
                    <h2>{product.name}</h2>
                  </Link>

                  <p className="category">{product.category}</p>
                  <p className="by">Mr.Chef Lotfi</p>

                  <div className="price-box">
                    <span className="price">{product.price} Dt</span>
                    <span className="old-price">{(product.price * 1.2).toFixed(2)} Dt</span>
                  </div>

                  <div className="right-buttons">
                    <button className="cart-btn" onClick={() => onAddToCart(safeProduct)}>
                      <FaShoppingCart />
                    </button>
                    <button className="wishlist-btn" onClick={() => onToggleWishlist(safeProduct)}>
                      {isInWishlist ? <FaHeart /> : <FaRegHeart />}
                    </button>
                    <button className="quickview-btn" onClick={() => openQuickView(product)}>
                      <FaEye />
                    </button>
                    <button className="compare-btn" onClick={() => onAddToCompare(safeProduct)} disabled={isInCompare}>
                      <FaCodeCompare />
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>

      {quickViewProduct && (
        <div className="quickview-modal" onClick={closeQuickView} role="dialog" aria-modal="true">
          <div className="quickview-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={closeQuickView} aria-label="Fermer">&times;</button>
            <img src={quickViewProduct.imageUrl} alt={quickViewProduct.name} />
            <h2>{quickViewProduct.name}</h2>
            <p>Catégorie: {quickViewProduct.category}</p>
            <p>Prix: {quickViewProduct.price} Dt</p>

            <div className="quickview-buttons">
              <button onClick={() => onAddToCart(normalizeProduct(quickViewProduct))}><FaShoppingCart /> Ajouter au panier</button>
              <button onClick={() => onToggleWishlist(normalizeProduct(quickViewProduct))}>
                {wishlist.some((item) => item._id === quickViewProduct._id) ? <FaHeart /> : <FaRegHeart />} Wishlist
              </button>
              <button onClick={() => onAddToCompare(normalizeProduct(quickViewProduct))} disabled={compareList.some((item) => item._id === quickViewProduct._id)}>
                <FaCodeCompare /> Comparer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
