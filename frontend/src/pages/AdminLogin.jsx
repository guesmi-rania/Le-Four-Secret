import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminLogin() {
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (password === process.env.ADMIN_PASSWORD) { // ← remplace par env ou vérif backend si besoin
      localStorage.setItem("admin", "true");
      navigate("/admin");
    } else {
      alert("Mot de passe incorrect !");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded shadow w-80">
        <h2 className="text-xl font-bold mb-4">Connexion Admin</h2>
        <input
          type="password"
          placeholder="Mot de passe admin"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border p-2 mb-4"
        />
        <button
          onClick={handleLogin}
          className="w-full bg-blue-600 text-white py-2 rounded"
        >
          Connexion
        </button>
      </div>
    </div>
  );
}

export default AdminLogin;
