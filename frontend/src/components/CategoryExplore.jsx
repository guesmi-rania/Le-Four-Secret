// src/components/CategoryExplore.jsx
import React from "react";
import "../styles/CategoryExplore.css";

const categories = [
  { name: "Gâteaux", image: "/images/categories/gateau.jpg" },
  { name: "Viennoiseries", image: "/images/categories/viennoiserie.jpg" },
  { name: "Chocolats", image: "/images/categories/chocolat.jpg" },
  { name: "Salés", image: "/images/categories/sale.jpg" },
  { name: "Desserts", image: "/images/categories/dessert.jpg" },
  { name: "Boissons", image: "/images/categories/boisson.jpg" },
];

function CategoryExplore() {
  return (
    <section className="category-explore">
      <h2>🍽️ Gammes de produit </h2>
      <div className="category-list">
        {categories.map((cat, index) => (
          <div key={index} className="category-item">
            <img src={cat.image} alt={cat.name} />
            <span>{cat.name}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

export default CategoryExplore;
