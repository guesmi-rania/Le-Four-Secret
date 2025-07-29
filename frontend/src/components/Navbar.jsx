import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FaChevronDown,
  FaSearch,
  FaUserCircle,
  FaHeart,
  FaShoppingBag,
  FaSignOutAlt,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaTag,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import logo from "../assets/loglou.png";
import Categories from "./Categories";
import "../styles/Navbar.css";

const statesList = [
  "Alabama", "Alaska", "Arizona", "California", "Colorado",
  "New Jersey", "New York", "Texas", "Washington"
];

const Navbar = ({ cart = [], wishlist = [] }) => {
  const [showCategories, setShowCategories] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [firstName, setFirstName] = useState(null);
  const [locationSearch, setLocationSearch] = useState("");

  useEffect(() => {
    const storedClient = JSON.parse(localStorage.getItem("client"));
    if (storedClient?.name) {
      setFirstName(storedClient.name.split(" ")[0]);
    }
  }, []);

  const filteredStates = statesList.filter(state =>
    state.toLowerCase().includes(locationSearch.toLowerCase())
  );

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);
  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <>
      <nav className="navbar">
        {/* Partie mobile visible uniquement en petit écran */}
        <div className="mobile-navbar">
          <button className="hamburger" onClick={toggleMobileMenu}>
            {mobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>

          <Link to="/" className="logo">
            <img src={logo} alt="Logo Mr. Chef" />
          </Link>

          <Link to="/cart" className="cart-icon">
            <FaShoppingBag />
            {cart.length > 0 && <span className="badge">{cart.length}</span>}
          </Link>
        </div>
      </nav>

      {/* Mobile menu drawer */}
      <div className={`mobile-menu ${mobileMenuOpen ? "open" : ""}`}>
        <ul className="nav-links">
          <li><Link to="/" onClick={closeMobileMenu}>Accueil</Link></li>
          <li><Link to="/produits" onClick={closeMobileMenu}>Produits</Link></li>
          <li><Link to="/contact" onClick={closeMobileMenu}>Contact</Link></li>
        </ul>

        <ul className="categories">
          <li onClick={() => setShowCategories(!showCategories)}>
            <span>Toutes les catégories <FaChevronDown /></span>
          </li>
          {showCategories && (
            <Categories onClickCategory={closeMobileMenu} />
          )}
        </ul>
      </div>

      {/* Overlay quand menu mobile est ouvert */}
      {mobileMenuOpen && (
        <div className="menu-overlay open" onClick={closeMobileMenu}></div>
      )}
    </>
  );
};

export default Navbar;
