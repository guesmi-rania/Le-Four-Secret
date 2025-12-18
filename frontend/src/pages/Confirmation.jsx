import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import "../styles/Confirmation.css";
import Footer from "../components/Footer"; // ✅ importer le Footer

function Confirmation() {
  return (
    <div className="confirmation-page">
      {/* ✅ SEO Helmet */}
      <Helmet>
        <title>Confirmation de commande | Douceurs du Chef</title>
        <meta
          name="description"
          content="Votre commande a été validée avec succès sur Douceurs du Chef. Merci pour votre achat !"
        />
        <meta name="robots" content="noindex, nofollow" />
        <link rel="canonical" href={`${window.location.origin}/confirmation`} />
      </Helmet>

      <div className="confirmation-container">
        <h2>✅ Votre commande a été validée !</h2>
        <p>Merci pour votre achat. Vous recevrez bientôt votre confirmation par email.</p>
        <Link to="/" className="back-btn">Retour à l'accueil</Link>
      </div>

      {/* ✅ Footer placé en bas */}
      <Footer />
    </div>
  );
}

export default Confirmation;
