import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Welcome.css";
import Footer from "../components/Footer"; // ✅ import Footer

function Welcome() {
  const [firstName, setFirstName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const storedClient = JSON.parse(localStorage.getItem("client"));

    if (!storedClient) {
      navigate("/login");
    } else {
      const prenom = storedClient.name?.split(" ")[0] || "";
      setFirstName(prenom);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("client");
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="welcome-page">
      {/* ===== CONTENU ===== */}
      <div className="welcome-container">
        <div className="welcome-box">
          <h1>Bienvenue {firstName} !</h1>
          <p>Nous sommes ravis de vous retrouver. Que souhaitez-vous faire ?</p>

          <img
            src="/images/welcome-dessert.jpg"
            alt="Douceurs du chef"
            className="welcome-image"
          />

          <div className="welcome-buttons">
            <Link to="/produits" className="btn-primary">
              Découvrir nos produits
            </Link>
            <Link to="/commandes" className="btn-secondary">
              Voir mes commandes
            </Link>
          </div>

          <button className="logout-btn" onClick={handleLogout}>
            Se déconnecter
          </button>
        </div>
      </div>

      {/* ===== FOOTER ===== */}
      <Footer />
    </div>
  );
}

export default Welcome;
