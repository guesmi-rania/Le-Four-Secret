import React from "react";
import { Link } from "react-router-dom";
import "../styles/NotFoundPage.css";

export default function NotFoundPage() {
  return (
    <div className="notfound-container">
      <h1>404</h1>
      <h2>Oups ! Page non trouvée</h2>
      <p>La page que vous cherchez n’existe pas ou a été déplacée.</p>
      <Link to="/shop" className="btn-home">Retour à la boutique</Link>
    </div>
  );
}
