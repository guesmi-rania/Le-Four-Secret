import React, { useState, useEffect } from "react";
import "../styles/Shop.css";
import { FaShoppingCart, FaHeart, FaRegHeart, FaBalanceScale, FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "axios";
import Footer from "../components/Footer";

export default function ShopPage({
  onAddToCart,
  wishlist = [],
  compareList = [],
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
  const [currentPage, setCurrentPage] = useState(1);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const productsPerPage = 9;

  const BASE_URL = import.meta.env.VITE_API_URL;

  // Liste fixe des catégories
  const allCategories = [
    "Gâteaux Signature",
    "Mousses & Entremets",
    "Gâteaux Événementiels",
    "Viennoiseries",
    "Millefeuilles",
    "Feuilletés Salés",
    "Choux & Crèmes",
    "Cheesecakes",
    "Donuts"
  ];

  // --- Charger les produits depuis le backend ---
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/products`);
        setProducts(res.data);
        setFilteredProducts(res.data);
        setCategories(allCategories); // utilise la liste fixe
        setLoading(false);
      } catch (err) {
        console.error("Erreur chargement produits :", err.message);
        setLoading(false);
      }
    };
    fetchProducts();
  }, [BASE_URL]);

  // --- Filtrage et recherche ---
  useEffect(() => {
    let temp = [...products];

    if (search) temp = temp.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()));
    if (selectedCategories.length > 0)
      temp = temp.filter((p) => selectedCategories.includes(p.category));
    temp = temp.filter((p) => p.price >= minPrice && p.price <= maxPrice);

    setFilteredProducts(temp);
    setCurrentPage(1);
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

  const indexOfLast = currentPage * productsPerPage;
  const indexOfFirst = indexOfLast - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirst, indexOfLast);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const openQuickView = (product) => setQuickViewProduct(product);

  return (
    <div className="shop-page-wrapper">
      <div className="shop-banner"></div>

      <div className="shop-page">
        <aside className="shop-sidebar">
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
          <div className="price-slider-container">
            <input
              type="range"
              min="0"
              max="1000"
              value={minPrice}
              onChange={(e) => setMinPrice(Number(e.target.value))}
            />
            <input
              type="range"
              min="0"
              max="1000"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
            />
            <div className="price-values">
              <span>{minPrice} TND</span>
              <span>{maxPrice} TND</span>
            </div>
          </div>

          <button className="reset-btn" onClick={resetFilters}>
            Réinitialiser
          </button>
        </aside>

        <section className="shop-products">
          {loading ? (
            <p>Chargement des produits...</p>
          ) : filteredProducts.length === 0 ? (
            <p>Aucun produit trouvé.</p>
          ) : (
            <>
              <div className="shop-grid">
                {currentProducts.map((product) => {
                  const isInWishlist = wishlist.some((item) => item._id === product._id);
                  const isInCompare = compareList.some((item) => item._id === product._id);

                  return (
                    <article key={product._id} className="shop-card">
                      <div className="badge">{Math.floor(Math.random() * 30) + 5}%</div>
                      <Link to={`/produits/detail/${product._id}`} className="product-link">
                        <img src={product.imageUrl} alt={product.name} />
                        <h2>{product.name}</h2>
                      </Link>
                      <p className="category">{product.category}</p>
                      <p className="by">Mr.Chef Lotfi</p>

                      <div className="price-box">
                        <span className="price">{product.price.toFixed(2)} TND</span>
                        <span className="old-price">{(product.price * 1.2).toFixed(2)} TND</span>
                      </div>

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
                        <button
                          className="compare-btn"
                          onClick={() => onAddToCompare(product)}
                          disabled={isInCompare}
                        >
                          <FaBalanceScale />
                        </button>
                      </div>
                    </article>
                  );
                })}
              </div>

              <div className="pagination">
                {Array.from({ length: Math.ceil(filteredProducts.length / productsPerPage) }).map(
                  (_, i) => (
                    <button
                      key={i}
                      className={currentPage === i + 1 ? "active" : ""}
                      onClick={() => paginate(i + 1)}
                    >
                      {i + 1}
                    </button>
                  )
                )}
              </div>
            </>
          )}
        </section>
      </div>

      {quickViewProduct && (
        <div className="quickview-modal" onClick={() => setQuickViewProduct(null)}>
          <div className="quickview-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={() => setQuickViewProduct(null)}>
              ×
            </button>
            <img src={quickViewProduct.imageUrl} alt={quickViewProduct.name} />
            <h2>{quickViewProduct.name}</h2>
            <p>Prix : {quickViewProduct.price.toFixed(2)} TND</p>
            <button onClick={() => onAddToCart(quickViewProduct)}>Ajouter au panier</button>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
