import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import axios from "axios";
import RecipeShowcase from "../components/RecipeShowcase";
import AboutUs from "../components/AboutUs";
import Footer from "../components/Footer";
import CategoryExplore from "../components/CategoryExplore";
import PopularProducts from "../components/PopularProducts";
import "../styles/Home.css";
import { FaShippingFast, FaHeadset, FaLock, FaTags } from "react-icons/fa";

export default function Home({ onAddToCart, wishlist, compareList, onToggleWishlist, onAddToCompare }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const BASE_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${BASE_URL}/api/products`);
        const productsWithPrice = res.data.map(p => ({
          ...p,
          price: p.price || Math.floor(Math.random() * 50) + 10
        }));
        setProducts(productsWithPrice);
      } catch (err) {
        console.error("Erreur récupération produits :", err);
        setError("Impossible de charger les produits.");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="home-page">
      <Helmet>
        <title>Douceurs du Chef | Pâtisseries et Délices à Domicile</title>
        <meta
          name="description"
          content="Découvrez Douceurs du Chef : pâtisseries artisanales, délices sucrés et salés, livraison rapide et paiement sécurisé."
        />
        <link rel="canonical" href={`${window.location.origin}/`} />
      </Helmet>

      <div className="main-content">
        {/* Slider ou bannière principale ici */}
      </div>

      <hr className="section-separator" />

      <CategoryExplore />

      <hr className="section-separator" />

      {loading && <p>Chargement des produits...</p>}
      {error && <p className="error">{error}</p>}
      {!loading && !error && (
        <PopularProducts
          products={products}
          onAddToCart={onAddToCart}
          wishlist={wishlist}
          compareList={compareList}
          onToggleWishlist={onToggleWishlist}
          onAddToCompare={onAddToCompare}
        />
      )}

      <hr className="section-separator" />

      <RecipeShowcase />
      <hr className="section-separator" />
      <AboutUs />
      <hr className="section-separator" />

      <section className="home-features">
        <div className="features-container">
          <div className="feature-item">
            <FaShippingFast size={30} color="#FE81CC" />
            <h4>Livraison gratuite dès 200 DT</h4>
            <p>Pour toute commande supérieure à 200 DT</p>
          </div>
          <div className="feature-item">
            <FaHeadset size={30} color="#FE81CC" />
            <h4>Support 24/7</h4>
            <p>Disponible à tout moment pour vous aider</p>
          </div>
          <div className="feature-item">
            <FaLock size={30} color="#FE81CC" />
            <h4>Paiement sécurisé</h4>
            <p>Achetez en toute sécurité et confiance</p>
          </div>
          <div className="feature-item">
            <FaTags size={30} color="#FE81CC" />
            <h4>Dernières offres</h4>
            <p>Jusqu'à 18% de réduction sur nos produits</p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
