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
  FaThLarge,
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
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  const [locationSearch, setLocationSearch] = useState("");
  const [firstName, setFirstName] = useState(null);

  useEffect(() => {
    const storedClient = JSON.parse(localStorage.getItem("client"));
    if (storedClient?.name) {
      setFirstName(storedClient.name.split(" ")[0]);
    }
  }, []);

  const filteredStates = statesList.filter(state =>
    state.toLowerCase().includes(locationSearch.toLowerCase())
  );

  return (
    <header className="navbar">
    {/* Top Bar */}
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

    {/* Main Nav */}
    <div className="main-nav container">
      <Link to="/" className="logo">
        <img src={logo} alt="Logo Mr. Chef" />
        <span>Lotfi</span>
      </Link>

      <div className="search-bar">
        <FaBars
          className="menu-icon"
          onClick={() => setShowCategories(prev => !prev)}
          aria-label="Afficher les catégories"
        />
        <input
          type="text"
          placeholder="Rechercher un produits , catégories ..."
          className="search-input"
        />
        <button className="search-button" aria-label="Rechercher">
          <FaSearch />
        </button>
      </div>

      <div className="nav-icons">
        {firstName ? (
          <div className="icon-item user-info">
            <FaUserCircle />
            <span>Bienvenue {firstName}</span>
            <button
              onClick={() => {
                localStorage.clear();
                window.location.reload();
              }}
              className="logout-btn"
              aria-label="Déconnexion"
            >
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
      {/* Info Bar */}
      <div className="info-bar">
        <nav className="info-menu-links">
          {/* Bouton Categories (toujours visible) */}
          <button
  className="categories-toggle-btn"
  onClick={() => setShowCategories(!showCategories)}
  aria-expanded={showCategories}
  aria-haspopup="true"
  aria-label="Afficher les catégories"
>
  <FaThLarge style={{ marginRight: "6px" }} />
  Tous Catégories <FaChevronDown style={{ marginLeft: "6px" }} />
</button>


          <Link to="/produits">Produits</Link>
          <Link to="/pages">Astuces & Dégustation</Link>
          <Link to="/contact">Contact</Link>

          {/* Liste déroulante catégories */}
          {showCategories && (
            <div
              className="categories-list"
              style={{
                position: "absolute",
                top: "40px",
                left: 0,
                backgroundColor: "white",
                boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                borderRadius: "8px",
                padding: "15px 20px",
                zIndex: 3000,
                width: "300px",
                color: "#222",
              }}
            >
              <Categories onClickCategory={() => setShowCategories(false)} />
            </div>
          )}
        </nav>

        <div className="info-right">
          <div className="info-item location">
            <FaMapMarkerAlt className="info-icon" />
            <div className="info-text">
              <span>Votre emplacement</span>
              <strong
                className="location-select"
                onClick={() => setShowLocationDropdown(!showLocationDropdown)}
                tabIndex={0}
                role="button"
                aria-expanded={showLocationDropdown}
              >
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
                  onChange={e => setLocationSearch(e.target.value)}
                  autoFocus
                />
                <ul>
                  {filteredStates.length > 0 ? (
                    filteredStates.map(state => (
                      <li
                        key={state}
                        tabIndex={0}
                        onClick={() => {
                          alert(`Vous avez choisi : ${state}`);
                          setShowLocationDropdown(false);
                          setLocationSearch("");
                        }}
                      >
                        {state}
                      </li>
                    ))
                  ) : (
                    <li>Aucun résultat</li>
                  )}
                </ul>
              </div>
            )}
          </div>

          <div className="info-item discount">
            <FaTag className="info-icon" />
            <div className="info-text">
              <span>Ce week-end uniquement</span>
              <Link to="/discount" className="discount-link">
                Super réduction
              </Link>
            </div>
          </div>

          <div className="info-item call">
            <FaPhoneAlt className="info-icon" />
            <div className="info-text">
              <span>Appelez à tout moment</span>
              <a href="tel:+21620828055" className="phone-number">
                +216 20 828 055
              </a>
            </div>
          </div>
        </div>
      </div>
      <hr className="navbar-separator" />

    </header>
  );
};

export default Navbar;
