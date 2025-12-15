import React, { useState } from "react";
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn } from "react-icons/fa";
import "../styles/Footer.css";

function Footer() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Merci d’entrer un email valide.");
      return;
    }
    setError("");

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!response.ok) throw new Error("Erreur lors de l'inscription.");
      setSubmitted(true);
      setEmail("");
      setTimeout(() => setSubmitted(false), 2000);
    } catch (err) {
      setError(err.message || "Une erreur est survenue.");
    }
  };

  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="newsletter">
          <h3>Recevez nos nouveautés & offres 🍰</h3>
          <form className="newsletter-form" onSubmit={handleSubmit}>
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
        </div>
      </div>

      <div className="footer-middle">
        <div className="footer-column">
          <h4>À propos</h4>
          <p>Douceurs du Chef, pâtisserie artisanale, créations gourmandes et originales, faites maison avec passion.</p>
        </div>

        <div className="footer-column">
          <h4>Contact</h4>
          <p>📞 +216 20 828 055</p>
          <p>✉️ contact@chefLotfi.com</p>
          <p>📍 123 Rue des Gourmands, Tunis, Tunisie</p>
        </div>

        <div className="footer-column">
          <h4>Suivez-nous</h4>
          <div className="social-icons">
            <a href="https://facebook.com" target="_blank" rel="noreferrer"><FaFacebookF /></a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer"><FaInstagram /></a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer"><FaLinkedinIn /></a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        © 2025 Douceurs du Chef. Tous droits réservés.
      </div>
    </footer>
  );
}

export default Footer;
