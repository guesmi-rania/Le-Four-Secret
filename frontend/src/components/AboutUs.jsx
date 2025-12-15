import React from "react";
import "../styles/AboutUs.css";
import chefImage from "../assets/chef.webp"; 

function AboutUs() {
  return (
    <section className="about-us">
      <div className="about-content">
        <h2>À propos de nous</h2>
        <p>
          Bienvenue sur <strong>Douceurs du Chef</strong> ! Notre mission est
          de partager avec vous les créations délicieuses du Chef, pâtissier
          passionné depuis plus de 20 ans. Nos produits sont faits maison avec
          amour, savoir-faire et des ingrédients de qualité.
        </p>
        <p>
          Que vous soyez fan de douceurs traditionnelles ou à la recherche de
          nouvelles saveurs, vous trouverez votre bonheur chez nous.
        </p>
      </div>
      <div className="about-image">
      <img src={chefImage} alt="Le chef pâtissier" />
      </div>
    </section>
  );
}

export default AboutUs;
