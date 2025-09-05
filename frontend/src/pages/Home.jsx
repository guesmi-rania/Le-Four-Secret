import React, { useState, useEffect } from "react";
import RecipeShowcase from "../components/RecipeShowcase";
import AboutUs from "../components/AboutUs";
import Footer from "../components/Footer";
import CategoryExplore from "../components/CategoryExplore";
import { Link } from "react-router-dom";
import axios from "axios";
import "../styles/Home.css";
import { FaShippingFast, FaHeadset, FaLock, FaTags } from "react-icons/fa";

const BASE_URL = import.meta.env.VITE_API_URL;

function Home({ onAddToCart, wishlist, compareList, onToggleWishlist, onAddToCompare }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await axios.get(`${BASE_URL}/api/categories`);
        const allProducts = [];
        res.data.forEach((cat) => {
          cat.products.forEach((prodName) => {
            allProducts.push({
              _id: `${cat.category}-${prodName}`,
              name: prodName,
              category: cat.category,
              price: Math.floor(Math.random() * 20 + 5),
              imageUrl: `/images/products/${prodName
                .toLowerCase()
                .replace(/[\s\(\)&]/g, "-")}.webp`,
            });
          });
        });
        setProducts(allProducts);
      } catch (err) {
        console.error(err);
        alert("Erreur lors du chargement des produits");
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  return (
    <div className="home-page">
      <div className="main-content">
        {/* Tu peux ajouter ici ton slider ou autre contenu */}
      </div>

      <hr className="section-separator" />

      <CategoryExplore />

      <hr className="section-separator" />

      {/* === Popular Products Section === */}
      <section className="popular-products">
        <div className="section-header">
        <h2>Produits Populaires</h2>
<p>Découvrez tous nos produits populaires de la semaine.</p>
        </div>

        {loading ? (
          <p>Loading products...</p>
        ) : (
          <div className="products-grid">
            {products.map((product) => {
              const isInWishlist = wishlist.some((item) => item._id === product._id);
              const isInCompare = compareList.some((item) => item._id === product._id);

              return (
                <div key={product._id} className="product-card">
                  <Link to={`/produits/${product._id}`} className="product-link">
                    <img src={product.imageUrl} alt={product.name} />
                    <h4>{product.name}</h4>
                  </Link>
                  <p className="category">{product.category}</p>
                  <div className="price-box">
                    <span className="price">{product.price} Dt</span>
                    <span className="old-price">{(product.price * 1.2).toFixed(2)} Dt</span>
                  </div>

                  <div className="product-buttons">
                    <button onClick={() => onAddToCart(product)}>Add to Cart</button>
                    <button onClick={() => onToggleWishlist(product)}>
                      {isInWishlist ? "❤️" : "🤍"}
                    </button>
                    <button onClick={() => onAddToCompare(product)} disabled={isInCompare}>
                      Compare
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      <hr className="section-separator" />

      <div className="below-sections">
        <RecipeShowcase />
        <hr className="section-separator" />
        <AboutUs />
        <hr className="section-separator" />

        <section className="home-features">
       <div className="features-container">
        <div className="feature-item">
      <FaShippingFast size={30} color="#FE81CC" />
      <h4>Livraison gratuite dès 200 DT</h4>
      <p>Profitez de la livraison gratuite pour toute commande supérieure à 200 DT</p>
       </div>
       <div className="feature-item">
      <FaHeadset size={30} color="#FE81CC" />
      <h4>Support 24/7</h4>
      <p>Nous sommes disponibles à tout moment pour vous aider</p>
    </div>
    <div className="feature-item">
      <FaLock size={30} color="#FE81CC" />
      <h4>Paiement sécurisé</h4>
      <p>Effectuez vos achats en toute sécurité et en toute confiance</p>
    </div>
    <div className="feature-item">
      <FaTags size={30} color="#FE81CC" />
      <h4>Dernières offres</h4>
      <p>Bénéficiez jusqu'à 20% de réduction sur nos produits</p>
    </div>
  </div>
</section>

        <Footer />
      </div>
    </div>
  );
}

export default Home;
