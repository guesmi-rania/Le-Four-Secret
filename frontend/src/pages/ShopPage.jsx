import React, { useState, useEffect } from "react";
import "../styles/Shop.css";
import { FaShoppingCart, FaHeart, FaRegHeart, FaBalanceScale } from "react-icons/fa";
import { Link } from "react-router-dom";
import rawData from "../data/data.json";
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
  const productsPerPage = 9;

  useEffect(() => {
    // Générer tous les produits depuis le JSON
    const productsData = rawData.flatMap((cat) =>
      cat.products.map((name, index) => ({
        _id: `${cat.category}-${index}`,
        name,
        categories: [cat.category],
        price: Math.floor(Math.random() * 50) + 10,
        imageUrl: `/images/products/${name.replace(/\s+/g, "-")}.jpg`,
      }))
    );
    setProducts(productsData);
    setFilteredProducts(productsData);
    setCategories(rawData.map((cat) => cat.category));
    setLoading(false);
  }, []);

  // Filtrage selon recherche, catégorie et prix
  useEffect(() => {
    let temp = [...products];
    if (search)
      temp = temp.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase())
      );
    if (selectedCategories.length > 0)
      temp = temp.filter((p) =>
        (p.categories || []).some((cat) => selectedCategories.includes(cat))
      );
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

  // Pagination
  const indexOfLast = currentPage * productsPerPage;
  const indexOfFirst = indexOfLast - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirst, indexOfLast);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
      <div className="shop-page-wrapper">
  {/* Bannière en haut */}
  <div className="shop-banner">
  </div>

      <div className="shop-page">
        {/* Sidebar */}
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

        {/* Produits */}
        <section className="shop-products">
          {loading ? (
            <p>Chargement des produits...</p>
          ) : (
            <>
              <div className="shop-grid">
                {currentProducts.map((product) => {
                  const isInWishlist = wishlist.some(
                    (item) => item._id === product._id
                  );
                  const isInCompare = compareList.some(
                    (item) => item._id === product._id
                  );

                  return (
                    <article key={product._id} className="shop-card">
                      <div className="badge">
                        {Math.floor(Math.random() * 30) + 5}%
                      </div>

                      {/* Lien vers ProductDetail */}
                      <Link
                        to={`/produits/detail/${product._id}`}
                        className="product-link"
                      >
                        <img src={product.imageUrl} alt={product.name} />
                        <h2>{product.name}</h2>
                      </Link>

                      <p className="category">
                        {(product.categories || []).join(", ")}
                      </p>
                      <p className="by">Mr.Chef Lotfi</p>

                      <div className="price-box">
                        <span className="price">{product.price.toFixed(2)} TND</span>
                        <span className="old-price">
                          {(product.price * 1.2).toFixed(2)} TND
                        </span>
                      </div>

                      <div className="right-buttons">
                        <button
                          className="cart-btn"
                          onClick={() => onAddToCart(product)}
                        >
                          <FaShoppingCart />
                        </button>
                        <button
                          className="wishlist-btn"
                          onClick={() => onToggleWishlist(product)}
                        >
                          {isInWishlist ? <FaHeart /> : <FaRegHeart />}
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

              {/* Pagination */}
              <div className="pagination">
                {Array.from({
                  length: Math.ceil(filteredProducts.length / productsPerPage),
                }).map((_, i) => (
                  <button
                    key={i}
                    className={currentPage === i + 1 ? "active" : ""}
                    onClick={() => paginate(i + 1)}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
            </>
          )}
        </section>
      </div>

      <Footer />
    </div>
  );
}
