import React, { useState } from "react";
import "../styles/RecipeShowcase.css";

const techniques = [
  {
    title: "Infusion",
    text: "Infusion de crème aux épices",
    image: "/images/techniques/infusion.webp",
  },
  {
    title: "Mousse",
    text: "Préparer une mousse pour garnitures et pâtisseries",
    image: "/images/techniques/mousse.webp",
  },
  {
    title: "Glaçage noir",
    text: "Glacer des gâteaux et pâtisseries",
    image: "/images/techniques/glacage-noir.webp",
  },
  {
    title: "Whipped Ganache",
    text: "Technique de la ganache montée - Tenue & Foisonnement",
    image: "/images/techniques/ganache-montee.webp",
  },
  {
    title: "Crème fouettée à la machine",
    text: "Réalisation d’une crème fouettée à la machine à chantilly",
    image: "/images/techniques/creme-fouettee-machine.webp",
  },
  {
    title: "Glaçage coloré",
    text: "Glacer des gâteaux et pâtisseries avec des couleurs variées",
    image: "/images/techniques/glacage-colore.webp",
  },
  {
    title: "Préparation d’une pâte à gâteau",
    text: "Préparation d’une pâte à gâteau",
    image: "/images/techniques/pate-gateau.webp",
  },
  {
    title: "Garniture",
    text: "Garniture d’éclairs avec de la crème fouettée ou crème pâtissière",
    image: "/images/techniques/garniture.webp",
  },
  {
    title: "Rosace de crème fouettée",
    text: "Décoration de gâteaux et pâtisseries à la crème fouettée",
    image: "/images/techniques/rosace-creme.webp",
  },
  {
    title: "Incorporation de beurre",
    text: "Incorporation de beurre dans une pâte à brioche",
    image: "/images/techniques/incorporation-beurre.webp",
  },
  {
    title: "Masquage",
    text: "Masquage de gâteaux et pâtisseries",
    image: "/images/techniques/masquage.webp",
  },
  {
    title: "Crème au beurre",
    text: "Crème au beurre fouettée pour décoration de pâtisseries",
    image: "/images/techniques/creme-beurre.webp",
  },
  {
    title: "Crème au beurre à base de poudre à crème",
    text: "Recette de base pour réaliser une crème au beurre",
    image: "/images/techniques/creme-beurre-poudre.webp",
  },
  {
    title: "Crème au beurre à base de jaunes d'œufs",
    text: "Technique pour réaliser une crème au beurre à base de jaunes d'œufs",
    image: "/images/techniques/creme-beurre-jaunes.webp",
  },
  {
    title: "Feuilletage",
    text: "Feuilletage d’une pâte pour pâte feuilletée ou croissants",
    image: "/images/techniques/feuilletage.webp",
  },
  {
    title: "Glaçage miroir noir",
    text: "Préparer un glaçage noir homogène et brillant",
    image: "/images/techniques/glacage-miroir-noir.webp",
  },
  {
    title: "Crème au beurre à base de Parfait",
    text: "Une façon simple et rapide de faire une crème au beurre très légère",
    image: "/images/techniques/creme-beurre-parfait.webp",
  },
  {
    title: "Pâte à choux",
    text: "Réalisation et garnissage de pâte à choux",
    image: "/images/techniques/pate-choux.webp",
  },
  {
    title: "Pâte feuilletée inversée",
    text: "Réalisation d'une pâte feuilletée inversée",
    image: "/images/techniques/pate-feuilletee-inversee.webp",
  },
  {
    title: "Crème fouettée au batteur",
    text: "Réalisation d’une crème fouettée au batteur",
    image: "/images/techniques/creme-fouettee-batteur.webp",
  },
  {
    title: "Ganache",
    text: "Réalisation d'une ganache onctueuse",
    image: "/images/techniques/ganache.webp",
  },
  {
    title: "Crème chantilly",
    text: "Préparer une crème chantilly maison",
    image: "/images/techniques/chantilly.webp",
  },
  {
    title: "Ganache montée",
    text: "Préparer une ganache montée aérienne",
    image: "/images/techniques/ganache-montee2.webp",
  }
];

function RecipeShowcase() {
  const [visibleCount, setVisibleCount] = useState(5);

  const showMore = () => {
    setVisibleCount(techniques.length);
  };

  return (
    <section className="recipe-showcase full-width">
      <h2>Techniques | Chef Lotfi 👨‍🍳</h2>
      <div className="recipe-grid">
        {techniques.slice(0, visibleCount).map((technique, index) => (
          <div key={index} className="recipe-card">
            <img
              src={technique.image}
              alt={technique.title}
              className="recipe-image"
            />
            <h3>{technique.title}</h3>
            <p>{technique.text}</p>
          </div>
        ))}
      </div>
      {visibleCount < techniques.length && (
        <div className="show-more-container">
          <button className="show-more-btn" onClick={showMore}>
            Voir plus de techniques
          </button>
        </div>
      )}
    </section>
  );
}

export default RecipeShowcase;
