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
  FaThLarge,
} from "react-icons/fa";
import logo from "../assets/loglou.png";
import Categories from "./Categories";
import "../styles/Navbar.css";

const statesList = ["Tunis", "Ariana", "Bizerte", "Manouba", "Zaghouan", "Nabeul"];

const Navbar = ({ cart = [], wishlist = [] }) => {
  const [showCategories, setShowCategories] = useState(false);
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  const [locationSearch, setLocationSearch] = useState("");
  const [firstName, setFirstName] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const storedClient = JSON.parse(localStorage.getItem("client"));
    if (storedClient?.name) setFirstName(storedClient.name.split(" ")[0]);
  }, []);

  const filteredStates = statesList.filter((state) =>
    state.toLowerCase().includes(locationSearch.toLowerCase())
  );

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    setShowCategories(false);
  };

  return (
    <header className="navbar">
      {/* MOBILE NAVBAR */}
      <div className="mobile-navbar">
        <button
          className="hamburger"
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          aria-label={mobileMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? <FaTimes /> : <FaBars />}
        </button>

        <Link to="/" className="logo" onClick={closeMobileMenu}>
          <img src={logo} alt="Logo Mr. Chef" />
        </Link>

        <Link to="/cart" className="cart-icon" onClick={closeMobileMenu}>
          <FaShoppingBag />
          {cart.length > 0 && <span className="badge">{cart.length}</span>}
        </Link>
      </div>

      {/* MOBILE MENU DRAWER */}
      <nav className={`mobile-menu ${mobileMenuOpen ? "open" : ""}`}>
        <ul className="mobile-nav-links">
          <li><Link to="/" onClick={closeMobileMenu}>Accueil</Link></li>
          <li><Link to="/produits" onClick={closeMobileMenu}>Produits</Link></li>
          <li><Link to="/pages" onClick={closeMobileMenu}>Astuces & Dégustation</Link></li>
          <li><Link to="/contact" onClick={closeMobileMenu}>Contact</Link></li>
        </ul>

        <div className="mobile-user-section">
          {firstName ? (
            <div className="mobile-user-info">
              <FaUserCircle size={24} color="#00BCD4" />
              <span>Bienvenue {firstName}</span>
              <button
                onClick={() => { localStorage.clear(); window.location.reload(); }}
                className="mobile-logout-btn"
              >
                <FaSignOutAlt size={20} color="#00BCD4" />
              </button>
            </div>
          ) : (
            <Link to="/login" className="mobile-login-link" onClick={closeMobileMenu}>
              <FaUserCircle size={24} color="#00BCD4" />
              <span>Mon compte</span>
            </Link>
          )}
        </div>

        <div className="mobile-icons-section">
          <Link to="/wishlist" className="mobile-icon-link" onClick={closeMobileMenu}>
            <FaHeart size={24} color="#00BCD4" />
            <span>Wishlist</span>
            {wishlist.length > 0 && <span className="badge mobile-badge">{wishlist.length}</span>}
          </Link>

          <Link to="/cart" className="mobile-icon-link" onClick={closeMobileMenu}>
            <FaShoppingBag size={24} color="#00BCD4" />
            <span>Panier</span>
            {cart.length > 0 && <span className="badge mobile-badge">{cart.length}</span>}
          </Link>
        </div>

        <div className="mobile-categories-section">
          <button
            className="categories-toggle-btn"
            onClick={() => setShowCategories((prev) => !prev)}
            aria-expanded={showCategories}
          >
            <FaThLarge style={{ marginRight: "6px" }} />
            Toutes les catégories <FaChevronDown style={{ marginLeft: "6px" }} />
          </button>

          {showCategories && <Categories onClickCategory={closeMobileMenu} />}
        </div>
      </nav>

      {mobileMenuOpen && <div className="menu-overlay" onClick={closeMobileMenu} />}

      {/* DESKTOP NAVBAR */}
      <div className="top-bar">
        <div className="top-bar-container">
          <p className="top-bar-text">
            Livraison disponible tous les jours <span className="blue-time">de 7h00 à 23h00</span>.
          </p>
          <div className="top-links">
            <Link to="/checkout">Checkout</Link>
            <Link to="/cart">Cart</Link>
            <Link to="/faq">FAQ</Link>
            <Link to="/about">About Us</Link>
          </div>
        </div>
      </div>

      <hr className="navbar-separator" />

      <div className="main-nav container">
        <Link to="/" className="logo">
          <img src={logo} alt="Logo Mr. Chef" />
          <span>Lotfi</span>
        </Link>

        <div className="search-bar">
          <FaBars className="menu-icon" onClick={() => setShowCategories(!showCategories)} />
          <input
            type="text"
            placeholder="Rechercher un produit, catégories ..."
            className="search-input"
          />
          <button className="search-button"><FaSearch /></button>
        </div>

        <div className="nav-icons">
          {firstName ? (
            <div className="icon-item user-info">
              <FaUserCircle />
              <span>Bienvenue {firstName}</span>
              <button onClick={() => { localStorage.clear(); window.location.reload(); }} className="logout-btn">
                <FaSignOutAlt />
              </button>
            </div>
          ) : (
            <Link to="/login" className="icon-item">
              <FaUserCircle />
              <span>Mon compte</span>
            </Link>
          )}

          <Link to="/wishlist" className="icon-item">
            <FaHeart />
            <span>Wishlist</span>
            {wishlist.length > 0 && <span className="badge">{wishlist.length}</span>}
          </Link>

          <Link to="/cart" className="icon-item">
            <FaShoppingBag />
            <span>Cart</span>
            {cart.length > 0 && <span className="badge">{cart.length}</span>}
          </Link>
        </div>
      </div>

      <div className="info-bar">
        <nav className="info-menu-links">
          <button className="categories-toggle-btn" onClick={() => setShowCategories(!showCategories)}>
            <FaThLarge style={{ marginRight: "6px" }} />
            Tous Catégories <FaChevronDown style={{ marginLeft: "6px" }} />
          </button>

          <Link to="/produits">Produits</Link>
          <Link to="/pages">Astuces & Dégustation</Link>
          <Link to="/contact">Contact</Link>

          {showCategories && <Categories onClickCategory={() => setShowCategories(false)} />}
        </nav>

        <div className="info-right">
          <div className="info-item location">
            <FaMapMarkerAlt className="info-icon" />
            <div className="info-text">
              <span>Votre emplacement</span>
              <strong className="location-select" onClick={() => setShowLocationDropdown(!showLocationDropdown)}>
                Sélectionnez un emplacement <FaChevronDown />
              </strong>
            </div>

            {showLocationDropdown && (
              <div className="location-dropdown">
                <h4>Choisissez votre lieu de livraison</h4>
                <p>Entrez votre adresse et nous préciserons l’offre pour votre région.</p>
                <input
                  type="text"
                  placeholder="Rechercher votre région"
                  value={locationSearch}
                  onChange={(e) => setLocationSearch(e.target.value)}
                  autoFocus
                />
                <ul>
                  {filteredStates.length > 0 ? filteredStates.map((state) => (
                    <li key={state} onClick={() => { alert(`Vous avez choisi : ${state}`); setShowLocationDropdown(false); setLocationSearch(""); }}>
                      {state}
                    </li>
                  )) : <li>Aucun résultat</li>}
                </ul>
              </div>
            )}
          </div>

          <div className="info-item discount">
            <FaTag className="info-icon" />
            <div className="info-text">
              <span>Ce week-end uniquement</span>
              <Link to="/discount" className="discount-link">Super réduction</Link>
            </div>
          </div>

          <div className="info-item call">
            <FaPhoneAlt className="info-icon" />
            <div className="info-text">
              <span>Appelez à tout moment</span>
              <a href="tel:+21620828055" className="phone-number">+216 20 828 055</a>
            </div>
          </div>
        </div>
      </div>

      <hr className="navbar-separator" />
    </header>
  );
};

export default Navbar;
