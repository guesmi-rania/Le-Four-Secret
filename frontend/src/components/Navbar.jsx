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

const statesList = [
  "Alabama", "Alaska", "Arizona", "California", "Colorado",
  "New Jersey", "New York", "Texas", "Washington"
];

const Navbar = ({ cart = [], wishlist = [] }) => {
  const [showCategories, setShowCategories] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);
  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <header className="navbar">
      {/* Mobile View */}
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

      {/* Desktop View */}
      <div className="desktop-navbar">
        <div className="top-bar">
          <p>Livraison disponible tous les jours <span className="blue-time">de 7h00 à 23h00</span>.</p>
          <div className="top-links">
            <Link to="/checkout">Checkout</Link>
            <Link to="/cart">Cart</Link>
            <Link to="/faq">FAQ</Link>
            <Link to="/about">About Us</Link>
          </div>
        </div>

        <div className="main-nav container">
          <Link to="/" className="logo">
            <img src={logo} alt="Logo Mr. Chef" />
            <span>Lotfi</span>
          </Link>

          <div className="search-bar">
            <FaBars
              className="menu-icon"
              onClick={() => setShowCategories(prev => !prev)}
            />
            <input
              type="text"
              placeholder="Rechercher un produits , catégories ..."
              className="search-input"
            />
            <button className="search-button">
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

        <div className="info-bar">
          <nav className="info-menu-links">
            <button
              className="categories-toggle-btn"
              onClick={() => setShowCategories(!showCategories)}
            >
              <FaThLarge /> Tous Catégories <FaChevronDown />
            </button>
            <Link to="/produits">Produits</Link>
            <Link to="/pages">Astuces & Dégustation</Link>
            <Link to="/contact">Contact</Link>
            {showCategories && (
              <div className="categories-list">
                <Categories onClickCategory={() => setShowCategories(false)} />
              </div>
            )}
          </nav>

          <div className="info-right">
            <div className="info-item">
              <FaMapMarkerAlt />
              <span onClick={() => setShowLocationDropdown(!showLocationDropdown)}>
                Sélectionnez un emplacement <FaChevronDown />
              </span>
              {showLocationDropdown && (
                <div className="location-dropdown">
                  <input
                    type="text"
                    placeholder="Rechercher votre région"
                    value={locationSearch}
                    onChange={e => setLocationSearch(e.target.value)}
                    autoFocus
                  />
                  <ul>
                    {filteredStates.map(state => (
                      <li
                        key={state}
                        onClick={() => {
                          alert(`Vous avez choisi : ${state}`);
                          setShowLocationDropdown(false);
                          setLocationSearch("");
                        }}
                      >{state}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="info-item">
              <FaTag />
              <Link to="/discount">Super réduction</Link>
            </div>

            <div className="info-item">
              <FaPhoneAlt />
              <a href="tel:+21620828055">+216 20 828 055</a>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
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
          {showCategories && <Categories onClickCategory={closeMobileMenu} />}
        </ul>
      </div>

      {mobileMenuOpen && <div className="menu-overlay" onClick={closeMobileMenu}></div>}
    </header>
  );
};

export default Navbar;
