// ShopPage.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/Shop.css";
import { FaShoppingCart, FaHeart, FaRegHeart } from "react-icons/fa";
import { IoIosGitCompare } from "react-icons/io";
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

  const [selectedCategories, setSelectedCategories] = useState([]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await axios.get(`${BASE_URL}/api/categories`);
        const categoriesData = res.data;
        const allProducts = [];

        categoriesData.forEach((cat) => {
          cat.subcategories.forEach((sub) => {
            sub.products.forEach((prod) => {
              allProducts.push({
                _id: `${cat.category}-${sub.name}-${prod.name}`,
                name: prod.name,
                category: cat.category,
                subcategory: sub.name,
                price: Math.floor(Math.random() * 20 + 5),
                imageUrl: `/images/products/${prod.name
                  .toLowerCase()
                  .replace(/[\s\(\)&]/g, "-")}.jpg`,
              });
            });
          });
        });

        setProducts(allProducts);
        setCategories([...new Set(allProducts.map((p) => p.category))]);
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
    if (search) {
      temp = temp.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()));
    }
    if (selectedCategories.length > 0) {
      temp = temp.filter((p) => selectedCategories.includes(p.category));
    }
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

  return (
    <div className="shop-page">
      <div className="shop-sidebar">
        <h3>Recherche</h3>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Rechercher un produit..."
        />

        <h3>Catégories</h3>
        <div className="checkbox-group">
          {categories.map((cat, i) => (
            <label key={i} className="checkbox-label">
              <input
                type="checkbox"
                checked={selectedCategories.includes(cat)}
                onChange={() => toggleCategory(cat)}
              />
              {cat}
            </label>
          ))}
        </div>

        <h3>Prix</h3>
        <div className="price-filter">
          <input
            type="number"
            placeholder="Min"
            value={minPrice}
            onChange={(e) => setMinPrice(Number(e.target.value))}
          />
          <span> - </span>
          <input
            type="number"
            placeholder="Max"
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
          />
        </div>

        <button className="reset-btn" onClick={resetFilters}>Réinitialiser</button>
      </div>

      <div className="shop-products">
        {loading ? (
          <p>Chargement des produits...</p>
        ) : (
          <div className="shop-grid">
            {filteredProducts.map((product) => {
              const isInWishlist = wishlist.some((item) => item._id === product._id);
              const isInCompare = compareList.some((item) => item._id === product._id);

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
                    <span className="old-price">{(product.price * 1.2).toFixed(2)} Dt</span>
                  </div>

                  <div className="product-actions">
                    <button className="add-btn" onClick={() => onAddToCart(product)}>
                      <FaShoppingCart /> Ajouter au panier
                    </button>

                    <div className="right-buttons">
                      <button
                        className="wishlist-btn"
                        onClick={() => onToggleWishlist(product)}
                        aria-label="Ajouter aux favoris"
                      >
                        {isInWishlist ? <FaHeart /> : <FaRegHeart />}
                      </button>

                      <button
                        className="compare-btn"
                        onClick={() => onAddToCompare(product)}
                        disabled={isInCompare}
                        aria-label="Ajouter à la comparaison"
                      >
                        ⚖
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
