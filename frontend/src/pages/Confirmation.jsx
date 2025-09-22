import React from "react";
import { Link } from "react-router-dom";
import "../styles/Confirmation.css";

function Confirmation() {
  return (
    <div className="confirmation-container">
      <h2>✅ Votre commande a été validée !</h2>
      <p>Merci pour votre achat. Vous recevrez bientôt votre confirmation par email.</p>
      <Link to="/" className="back-btn">Retour au panier</Link>
    </div>
  );
}

export default Confirmation;
