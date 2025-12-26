import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import "../styles/Shop.css";
import "../styles/QuickView.css";

export default function ShopPage({
  onAddToCart,
  wishlist,
  onToggleWishlist,
  compareList,
  onAddToCompare,
  openQuickView
}) {
  const BASE_URL = import.meta.env.VITE_API_URL;

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [filters, setFilters] = useState({ price: 100, weight: 5 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [catRes, prodRes] = await Promise.all([
          axios.get(`${BASE_URL}/api/categories`),
          axios.get(`${BASE_URL}/api/products`)
        ]);
        setCategories(catRes.data.map(c => c.name));
        setProducts(prodRes.data);
      } catch (err) {
        console.error(err);
        setError("Impossible de charger les produits.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleCategoryChange = (category) => {
    setCurrentPage(1);
    setSelectedCategories(prev =>
      prev.includes(category) ? prev.filter(c => c !== category) : [...prev, category]
    );
  };

  const filteredProducts = products.filter(p => {
    const matchCategory = selectedCategories.length === 0 || selectedCategories.includes(p.category);
    const matchPrice = p.price <= filters.price;
    const matchWeight = p.weight <= filters.weight;
    return matchCategory && matchPrice && matchWeight;
  });

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const handleQuickView = (product) => setQuickViewProduct(product);
  const closeQuickView = () => setQuickViewProduct(null);

  return (
    <div className="shop-page">
      <aside className="filters">
        <h2>Filtres</h2>

        <div className="category-filter">
          <h3>Catégories</h3>
          {categories.map(cat => (
            <label key={cat}>
              <input
                type="checkbox"
                value={cat}
                checked={selectedCategories.includes(cat)}
                onChange={() => handleCategoryChange(cat)}
              />
              {cat}
            </label>
          ))}
        </div>

        <div className="price-filter">
          <label>Prix max : {filters.price} TND</label>
          <input
            type="range"
            min="0"
            max="100"
            value={filters.price}
            onChange={e => { setFilters({...filters, price: Number(e.target.value)}); setCurrentPage(1); }}
          />
        </div>

        <div className="weight-filter">
          <label>Poids max : {filters.weight} kg</label>
          <input
            type="range"
            min="0"
            max="5"
            step="0.1"
            value={filters.weight}
            onChange={e => { setFilters({...filters, weight: Number(e.target.value)}); setCurrentPage(1); }}
          />
        </div>
      </aside>

      <main className="products-section">
        {loading && <p>Chargement des produits...</p>}
        {error && <p className="error">{error}</p>}
        {!loading && !error && currentProducts.length === 0 && <p>Aucun produit trouvé.</p>}

        <div className="products-grid">
          {currentProducts.map(product => (
            <ProductCard
              key={product._id}
              product={product}
              onAddToCart={onAddToCart}
              wishlist={wishlist}
              onToggleWishlist={onToggleWishlist}
              onAddToCompare={onAddToCompare}
              openQuickView={handleQuickView}
            />
          ))}
        </div>

        {totalPages > 1 && (
          <div className="pagination">
            {Array.from({ length: totalPages }, (_, idx) => (
              <button
                key={idx}
                className={currentPage === idx + 1 ? "active" : ""}
                onClick={() => setCurrentPage(idx + 1)}
              >
                {idx + 1}
              </button>
            ))}
          </div>
        )}
      </main>

      {quickViewProduct && (
        <div className="quickview-overlay" onClick={closeQuickView}>
          <div className="quickview-modal" onClick={e => e.stopPropagation()}>
            <button className="close-btn" onClick={closeQuickView}>✖</button>
            <img src={quickViewProduct.imageUrl || "/placeholder.png"} alt={quickViewProduct.name} />
            <h2>{quickViewProduct.name}</h2>
            <p>{quickViewProduct.description}</p>
            <p className="price">{quickViewProduct.price.toFixed(2)} TND</p>
            <div className="buttons">
              <button onClick={() => onAddToCart(quickViewProduct)}>Ajouter au panier</button>
              <button onClick={() => onToggleWishlist(quickViewProduct)}>
                {wishlist.some(item => item._id === quickViewProduct._id) ? "❤️" : "🤍"} Wishlist
              </button>
              <button onClick={() => onAddToCompare(quickViewProduct)}>⚖️ Comparer</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
