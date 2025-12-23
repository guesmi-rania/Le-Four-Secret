import React, { useState } from "react";
import "../styles/admin.css";

export default function AdminLogin({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const ADMIN_EMAIL = "rania.guesmi@esen.tn";
  const ADMIN_PASSWORD = "Rania@123";

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      onLogin(true);
    } else {
      setError("Email ou mot de passe incorrect");
    }
  };

  const handleForgotPassword = () => {
    alert(`Votre mot de passe est : ${ADMIN_PASSWORD}`);
  };

  return (
    <div className="login-page">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Connexion Admin</h2>
        {error && <p className="error">{error}</p>}
        <label>Email</label>
        <input
          type="email"
          placeholder="admin@gmail.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="current-password" // <- ajoute ceci

        />
        <label>Password</label>
        <input
       type="password"
       placeholder="••••••••"
       value={password}
       onChange={(e) => setPassword(e.target.value)}
       required
       autoComplete="current-password" // <- ajoute ceci
        />

        <button type="submit">Connecter</button>
        <p className="forgot" onClick={handleForgotPassword}>
          Mot de passe oublié
        </p>
      </form>
    </div>
  );
}
