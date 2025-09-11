import React from "react";
import RecipeShowcase from "../components/RecipeShowcase";
import AboutUs from "../components/AboutUs";
import Footer from "../components/Footer";
import CategoryExplore from "../components/CategoryExplore";
import "../styles/Home.css";
import { FaShippingFast, FaHeadset, FaLock, FaTags } from "react-icons/fa";

function Home() {
  return (
    <div className="home-page">
      <div className="main-content">
        {/* Tu peux ajouter ici ton slider ou autre contenu */}
      </div>

      <hr className="section-separator" />

      <CategoryExplore />

      <hr className="section-separator" />

      <div className="below-sections">
        <RecipeShowcase />

        <hr className="section-separator" />

        <AboutUs />

        <hr className="section-separator" />

        {/* === Features Section === */}
        <section className="home-features">
          <div className="features-container">
            <div className="feature-item">
              <FaShippingFast size={30} color="#FE81CC" />
              <h4>Livraison gratuite dès 200 DT</h4>
              <p>
                Profitez de la livraison gratuite pour toute commande supérieure
                à 200 DT
              </p>
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
