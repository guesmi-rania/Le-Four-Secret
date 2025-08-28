import React, { useState } from "react";
import { Link } from "react-router-dom";
import { MdOutlineSoupKitchen, MdOutlineDinnerDining } from "react-icons/md";
import { GiCupcake, GiCheeseWedge, GiDonut } from "react-icons/gi";
import { FaBirthdayCake, FaBreadSlice } from "react-icons/fa";
import { TbRectangle } from "react-icons/tb";
import { BsFillCloudFill } from "react-icons/bs";
import "../styles/Categories.css";

function Categories({ onClickCategory }) {
  const [selected, setSelected] = useState(null);

  const categories = [
    { name: "Gâteaux Signature", icon: <MdOutlineSoupKitchen /> },
    { name: "Mousses & Entremets", icon: <GiCupcake />, isNew: true },
    { name: "Gâteaux Événementiels", icon: <FaBirthdayCake /> },
    { name: "Viennoiseries", icon: <FaBreadSlice /> },
    { name: "Millefeuilles", icon: <TbRectangle />, isNew: true },
    { name: "Feuilletés Salés", icon: <MdOutlineDinnerDining /> },
    { name: "Choux & Crèmes", icon: <BsFillCloudFill /> },
    { name: "Cheesecakes", icon: <GiCheeseWedge /> },
    { name: "Donuts", icon: <GiDonut /> },
  ];

  const newItems = [
    { name: "Tartelette Fruits Rouges" },
    { name: "Éclair Chocolat Blanc" },
    { name: "Brownie Noisette" },
  ];

  return (
    <ul className="categories-list" role="menu">
      {categories.map((cat, index) => (
        <li key={index} className="dropdown-item" role="none">
          <Link
            to={`/categorie/${encodeURIComponent(cat.name)}`}
            className={`category-link ${selected === cat.name ? "selected" : ""}`}
            onClick={() => {
              setSelected(cat.name);
              if (onClickCategory) onClickCategory(cat.name);
            }}
            role="menuitem"
            tabIndex={0}
            aria-selected={selected === cat.name}
          >
            <span className="icon">{cat.icon}</span>
            <span className="name">{cat.name}</span>
          </Link>
        </li>
      ))}

      {/* ====== Section Nouveautés ====== */}
      <li className="dropdown-item nouveautes-title">Nouveautés</li>
      {newItems.map((item, index) => (
        <li key={index} className="dropdown-item" role="none">
          <Link
            to={`/produit/${encodeURIComponent(item.name)}`}
            className="category-link nouveaute-link"
          >
            <span className="name">{item.name}</span>
            <span className="badge-new">NEW</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default Categories;
