// src/pages/ClientAuth.jsx
import React, { useState } from "react";
import "../styles/ClientAuth.css";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const BASE_URL = import.meta.env.VITE_API_URL || "https://recettes-de-cuisine.onrender.com";

// Sous-composant pour le formulaire de récupération de mot de passe
function ForgotPasswordForm({ onBack }) {
  const [resetEmail, setResetEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!resetEmail) return alert("Veuillez saisir votre adresse email.");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(resetEmail)) return alert("Veuillez saisir une adresse email valide.");

    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/api/auth/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: resetEmail }),
      });

      const contentType = res.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("Réponse non-JSON reçue du serveur.");
      }

      const data = await res.json();

      if (res.ok) {
        alert("Un email de récupération a été envoyé. Vérifiez vos spams également.");
        setResetEmail("");
        onBack();
      } else {
        alert(data.message || "Erreur lors de l'envoi du lien de récupération.");
      }
    } catch (error) {
      console.error("Erreur récupération mot de passe:", error);
      alert("Erreur serveur, réessayez plus tard.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="client-auth-container">
      <h2>Récupération du mot de passe</h2>
      <form onSubmit={handleSubmit} className="auth-form" noValidate>
        <label htmlFor="resetEmail">Email</label>
        <input
          id="resetEmail"
          type="email"
          name="resetEmail"
          placeholder="Entrez votre email"
          value={resetEmail}
          onChange={(e) => setResetEmail(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "Envoi en cours..." : "Envoyer le lien de récupération"}
        </button>
        <p>
          <span className="link" onClick={onBack}>
            Retour à la connexion
          </span>
        </p>
      </form>
    </div>
  );
}

export default function ClientAuth() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const toggleShowPassword = () => setShowPassword((prev) => !prev);
  const handleChange = (e) => setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`${BASE_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email, password: formData.password }),
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
      console.error("Erreur serveur:", error);
      alert("Erreur serveur, réessayez plus tard.");
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) return alert("Les mots de passe ne correspondent pas !");

    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: formData.name, email: formData.email, password: formData.password }),
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
      console.error("Erreur serveur:", error);
      alert("Erreur serveur, réessayez plus tard.");
    } finally {
      setLoading(false);
    }
  };

  if (showForgotPassword) {
    return <ForgotPasswordForm onBack={() => setShowForgotPassword(false)} />;
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

      <form onSubmit={isLogin ? handleLogin : handleRegister} className="auth-form" noValidate>
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
          />
          <button type="button" className="toggle-password" onClick={toggleShowPassword}>
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
            />
          </>
        )}

        <button type="submit" disabled={loading}>
          {loading ? "Chargement..." : isLogin ? "Se connecter" : "S'inscrire"}
        </button>

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
