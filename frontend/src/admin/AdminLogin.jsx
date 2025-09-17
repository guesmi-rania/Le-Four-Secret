import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "../styles/AdminLoginPremium.css";
function AdminLogin() {
  const [email, setEmail] = useState("");
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
          username: email, // si ton backend attend "username", sinon change à "email"
          password,
        }
      );

      // Sauvegarde token dans localStorage
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
    <div className="admin-login-container" style={{ maxWidth: "400px", margin: "50px auto" }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Login to Dashboard</h2>
      <form onSubmit={handleLogin} className="admin-login-form" style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
        />
        <button
          type="submit"
          disabled={loading}
          style={{
            padding: "10px",
            backgroundColor: "#00b894",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: loading ? "not-allowed" : "pointer"
          }}
        >
          {loading ? "Connexion..." : "Login"}
        </button>
      </form>
    </div>
  );
}

export default AdminLogin;
