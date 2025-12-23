import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import AdminDashboard from "./AdminDashboard";
import AdminOrders from "./AdminOrders";
import AdminProducts from "./AdminProducts";
import AdminCategories from "./AdminCategories";
import AdminNewsletter from "./AdminNewsletter";
import AdminLogin from "./AdminLogin";

export default function App() {
  const [isLogged, setIsLogged] = useState(!!localStorage.getItem("adminToken"));
  const [activeSection, setActiveSection] = useState("dashboard"); // section par défaut

  if (!isLogged) {
    return <AdminLogin onLogin={() => setIsLogged(true)} />;
  }

  // Fonction pour déconnexion
  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    setIsLogged(false);
  };

  // Rendu des sections dynamiques
  const renderSection = () => {
    switch (activeSection) {
      case "dashboard":
        return <AdminDashboard />;
      case "orders":
        return <AdminOrders />;
      case "products":
        return <AdminProducts />;
      case "categories":
        return <AdminCategories />;
      case "newsletter":
        return <AdminNewsletter />;
      default:
        return <AdminDashboard />;
    }
  };

  return (
    <div className="admin-container" style={{ display: "flex", minHeight: "100vh", background: "#f5f6fa" }}>
      {/* Sidebar */}
      <Sidebar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        onLogout={handleLogout}
      />

      {/* Main Content */}
      <div className="admin-main" style={{ flex: 1, padding: "20px" }}>
        {renderSection()}
      </div>
    </div>
  );
}
