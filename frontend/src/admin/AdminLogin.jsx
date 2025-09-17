import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "../styles/AdminLoginPremium.css";

function AdminLogin() {
  const [username, setUsername] = useState(""); // renommer
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/admin/login`,
        {
          username, // correspond au backend
          password,
        }
      );

      localStorage.setItem("adminToken", res.data.token);

      toast.success("✅ Connexion réussie !");
      navigate("/admin/dashboard");
    } catch (err) {
      console.error(err.response?.data);
      toast.error(err.response?.data?.message || "Erreur serveur");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-wrapper">
      <div className="admin-login-container">
        <div className="admin-login-left">
          <h2>Login to Dashboard</h2>
          <form onSubmit={handleLogin} className="admin-login-form">
            <input
              type="text"
              placeholder="Email ou Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit" disabled={loading}>
              {loading ? "Connexion..." : "Login"}
            </button>
          </form>
        </div>
        <div className="admin-login-right"></div>
      </div>
    </div>
  );
}

export default AdminLogin;
