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
    { name: "Gâteaux Signature", icon: <MdOutlineSoupKitchen /> },
    { name: "Viennoiseries & Feuilletés", icon: <GiCupcake />, isNew: true },
    { name: "Feuilletés & Salés ", icon: <SiCakephp /> },
    { name: "Choux & Crèmes", icon: <BsCake /> },
    { name: "Cheesecakes & Gâteaux Froid", icon: <GiChocolateBar />, isNew: true },
    { name: "Donuts & Pâtisseries Modernes", icon: <LuCroissant /> },
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
