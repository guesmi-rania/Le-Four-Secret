import React, { useState } from "react";
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn } from "react-icons/fa";
import "../styles/Footer.css";

const categories = [
  "Gâteaux Signature",
  "Mousses & Entremets",
  "Gâteaux Événementiels",
  "Viennoiseries",
  "Millefeuilles",
  "Feuilletés Salés",
  "Choux & Crèmes",
  "Cheesecakes",
  "Donuts",
];

function Footer() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  // Assure-toi que cette variable pointe vers ton backend
  const BASE_URL = import.meta.env.VITE_API_URL || "https://recettes-de-cuisine.onrender.com";

  const handleSubmit = async (e) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Merci d’entrer un email valide.");
      return;
    }
    setError("");
  
    try {
      const response = await fetch(`${BASE_URL}/api/newsletter`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
  
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Erreur lors de l'inscription.");
      }
  
      setSubmitted(true);
      setEmail("");
      setTimeout(() => setSubmitted(false), 3000);
    } catch (err) {
      setError(err.message || "Une erreur est survenue.");
    }
  };

  return (
    <footer className="centered-footer">
      {/* ===== NEWSLETTER ===== */}
      <div className="footer-newsletter">
        <h3>Recevez nos nouveautés & offres 🍰</h3>
        <p>Inscrivez-vous à notre newsletter pour recevoir les dernières promotions et nouveautés.</p>
        <form className="newsletter-form-footer" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Votre email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit">S'inscrire</button>
        </form>
        {error && <p className="error-msg">{error}</p>}
        {submitted && !error && <p className="success-msg">Merci pour votre inscription !</p>}
        <hr />
      </div>

      {/* ===== CATEGORIES ET LIENS ===== */}
      <div className="footer-top">
        <div className="footer-contact">
          <h4>Contactez-nous</h4>
          <p>📞 +216 20 828 055</p>
          <p>✉️ contact@chefLotfi.com</p>
          <p>📍 123 Rue des Gourmands, Tunis, Tunisie</p>
        </div>

        <div className="footer-links">
          <div className="link-column">
            <h4>Nos Catégories</h4>
            <ul>
              {categories.map((cat, index) => (
                <li key={index}>{cat}</li>
              ))}
            </ul>
          </div>

          <div className="link-column">
            <h4>À propos</h4>
            <ul>
              <li>Notre histoire</li>
              <li>Livraison & Retours</li>
              <li>Confidentialité</li>
              <li>Conditions d'utilisation</li>
            </ul>
          </div>

          <div className="link-column">
            <h4>Support</h4>
            <ul>
              <li>Aide & FAQ</li>
              <li>Suivi de commande</li>
              <li>Contactez-nous</li>
            </ul>
          </div>
        </div>
      </div>

      {/* ===== FOOTER BOTTOM ===== */}
      <div className="footer-bottom">
        <div className="social-icons">
          <a href="https://facebook.com" target="_blank" rel="noreferrer"><FaFacebookF /></a>
          <a href="https://instagram.com" target="_blank" rel="noreferrer"><FaInstagram /></a>
          <a href="https://twitter.com" target="_blank" rel="noreferrer"><FaTwitter /></a>
          <a href="https://linkedin.com" target="_blank" rel="noreferrer"><FaLinkedinIn /></a>
        </div>
        <p>© 2025 Douceurs du Chef. Tous droits réservés.</p>
      </div>
    </footer>
  );
}

export default Footer;
