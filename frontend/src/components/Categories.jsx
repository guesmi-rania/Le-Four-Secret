import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Categories.css";
import { MdOutlineSoupKitchen } from "react-icons/md";
import { BsCake } from "react-icons/bs";
import { GiChocolateBar, GiPieSlice, GiCupcake } from "react-icons/gi";
import { SiCakephp } from "react-icons/si";
import { LuDessert, LuCroissant } from "react-icons/lu";
import { GiButter } from "react-icons/gi";
import { LiaCookieSolid } from "react-icons/lia";

function Categories({ onClickCategory }) {
  const categories = [
    { name: "Cuisine Tunisienne", icon: <MdOutlineSoupKitchen /> },
    { name: "Pâtisserie Classique", icon: <GiCupcake />, isNew: true },
    { name: "Pâtisseries Orientales ", icon: <SiCakephp /> },
    { name: "Gâteaux Spéciaux", icon: <BsCake /> },
    { name: "Chocolaterie & Confiserie", icon: <GiChocolateBar />, isNew: true },
    { name: "Viennoiseries", icon: <LuCroissant /> },
    { name: "Tartes et Tartelettes", icon: <GiPieSlice /> },
    { name: "Biscuits & Petits Gâteaux", icon: <LiaCookieSolid /> },
    { name: "Desserts Glacés", icon: <LuDessert /> },
    { name: "Pâtes à Tartiner et Confitures", icon: <GiButter /> },
  ];

  const [selected, setSelected] = useState(null);

  return (
    <ul className="dropdown-list" role="menu">
      {categories.map((cat, index) => (
        <li key={index} className="dropdown-item" role="none">
          <Link
            to={`/categorie/${encodeURIComponent(cat.name)}`}
            className={`category-link ${selected === cat.name ? "selected" : ""}`}
            onClick={() => {
              setSelected(cat.name);
              if (onClickCategory) onClickCategory();
            }}
            role="menuitem"
            tabIndex={0}
          >
            <span className="icon">{cat.icon}</span>
            <span className="name">{cat.name}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default Categories;
