// src/pages/ClientAuth.jsx
import React, { useState } from "react";
import "../styles/ClientAuth.css";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const BASE_URL = import.meta.env.VITE_API_URL || "https://recettes-de-cuisine.onrender.com";

function ClientAuth() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [resetLoading, setResetLoading] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const toggleShowPassword = () => setShowPassword((prev) => !prev);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${BASE_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("client", JSON.stringify(data.client));
        navigate("/bienvenue");
      } else {
        alert(data.message || "Erreur lors de la connexion.");
      }
    } catch (error) {
      console.error("Erreur serveur : ", error);
      alert("Erreur serveur, réessayez plus tard.");
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      return alert("Les mots de passe ne correspondent pas !");
    }

    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await res.json();

      if (res.ok || res.status === 201) {
        alert("Inscription réussie, connectez-vous !");
        setIsLogin(true);
        setFormData({ name: "", email: "", password: "", confirmPassword: "" });
        navigate("/login");
      } else {
        alert(data.message || "Erreur lors de l'inscription.");
      }
    } catch (error) {
      console.error("Erreur serveur : ", error);
      alert("Erreur serveur, réessayez plus tard.");
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    
    if (!resetEmail) {
      return alert("Veuillez saisir votre adresse email.");
    }

    setResetLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/api/auth/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: resetEmail }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Un email de récupération a été envoyé à votre adresse email.");
        setShowForgotPassword(false);
        setResetEmail("");
      } else {
        alert(data.message || "Erreur lors de l'envoi de l'email de récupération.");
      }
    } catch (error) {
      console.error("Erreur serveur : ", error);
      alert("Erreur serveur, réessayez plus tard.");
    } finally {
      setResetLoading(false);
    }
  };

  const handleBackToLogin = () => {
    setShowForgotPassword(false);
    setResetEmail("");
  };

  // Affichage du formulaire de récupération de mot de passe
  if (showForgotPassword) {
    return (
      <div className="client-auth-container">
        <h2>Récupération du mot de passe</h2>
        
        <form onSubmit={handleForgotPassword} className="auth-form" noValidate>
          <p className="forgot-password-description">
            Entrez votre adresse email et nous vous enverrons un lien pour réinitialiser votre mot de passe.
          </p>
          
          <label htmlFor="resetEmail">Email</label>
          <input
            id="resetEmail"
            type="email"
            name="resetEmail"
            placeholder="Entrez votre adresse email"
            value={resetEmail}
            onChange={(e) => setResetEmail(e.target.value)}
            required
            autoComplete="email"
          />

          <button type="submit" disabled={resetLoading}>
            {resetLoading ? "Envoi en cours..." : "Envoyer le lien de récupération"}
          </button>

          <p>
            <span className="link" onClick={handleBackToLogin}>
              Retour à la connexion
            </span>
          </p>
        </form>
      </div>
    );
  }

  return (
    <div className="client-auth-container">
      <h2>{isLogin ? "Connexion" : "Créer un compte"}</h2>

      <div className="tabs">
        <div onClick={() => setIsLogin(true)} className={`tab ${isLogin ? "active" : ""}`}>
          Se connecter
        </div>
        <div onClick={() => setIsLogin(false)} className={`tab ${!isLogin ? "active" : ""}`}>
          S'inscrire
        </div>
      </div>

      <form
        onSubmit={isLogin ? handleLogin : handleRegister}
        className="auth-form"
        noValidate
      >
        {!isLogin && (
          <>
            <label htmlFor="name">Nom</label>
            <input
              id="name"
              type="text"
              name="name"
              placeholder="Entrez votre nom"
              value={formData.name}
              onChange={handleChange}
              required
              autoComplete="name"
            />
          </>
        )}

        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          name="email"
          placeholder="Entrez votre email"
          value={formData.email}
          onChange={handleChange}
          required
          autoComplete="email"
        />

        <label htmlFor="password">Mot de passe</label>
        <div className="password-field">
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Entrez votre mot de passe"
            value={formData.password}
            onChange={handleChange}
            required
            minLength={6}
            autoComplete={isLogin ? "current-password" : "new-password"}
          />
          <button
            type="button"
            className="toggle-password"
            onClick={toggleShowPassword}
            aria-label={showPassword ? "Cacher le mot de passe" : "Afficher le mot de passe"}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>

        {!isLogin && (
          <>
            <label htmlFor="confirmPassword">Confirmer le mot de passe</label>
            <input
              id="confirmPassword"
              type={showPassword ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirmez votre mot de passe"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              minLength={6}
              autoComplete="new-password"
            />
          </>
        )}

        <button type="submit" disabled={loading}>
          {loading ? "Chargement..." : isLogin ? "Se connecter" : "S'inscrire"}
        </button>

        {/* Lien "Mot de passe oublié" affiché uniquement en mode connexion */}
        {isLogin && (
          <p className="forgot-password-link">
            <span className="link" onClick={() => setShowForgotPassword(true)}>
              Mot de passe oublié ?
            </span>
          </p>
        )}

        <p>
          {isLogin ? (
            <>Pas de compte ? <span className="link" onClick={() => setIsLogin(false)}>Inscrivez-vous</span></>
          ) : (
            <>Déjà inscrit ? <span className="link" onClick={() => setIsLogin(true)}>Se connecter</span></>
          )}
        </p>
      </form>
    </div>
  );
}

export default ClientAuth;