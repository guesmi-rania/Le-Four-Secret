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

function Home({ onAddToCart, wishlist, compareList, onToggleWishlist, onAddToCompare }) {
  const [products, setProducts] = useState([]);
  const BASE_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    axios.get(`${BASE_URL}/api/products`)
      .then(res => {
        const productsWithPrice = res.data.map(p => ({
          ...p,
          price: p.price || Math.floor(Math.random() * 50) + 10 // si pas de prix dans la DB
        }));
        setProducts(productsWithPrice);
      })
      .catch(err => console.error("Erreur récupération produits :", err));
  }, []);

  return (
    <div className="home-page">
      <Helmet>
        <title>Douceurs du Chef | Pâtisseries et Délices à Domicile</title>
        <meta
          name="description"
          content="Découvrez Douceurs du Chef : pâtisseries artisanales, délices sucrés et salés, livraison rapide et paiement sécurisé. Commandez vos gourmandises préférées en ligne !"
        />
        <link rel="canonical" href={`${window.location.origin}/`} />
      </Helmet>

      <div className="main-content">
        {/* Slider ou contenu principal */}
      </div>

      <hr className="section-separator" />

      <CategoryExplore />

      <hr className="section-separator" />

      <PopularProducts
        products={products}
        onAddToCart={onAddToCart}
        wishlist={wishlist}
        compareList={compareList}
        onToggleWishlist={onToggleWishlist}
        onAddToCompare={onAddToCompare}
      />

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
              <p>Bénéficiez jusqu'à 18% de réduction sur nos produits</p>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </div>
  );
}

export default Home;
