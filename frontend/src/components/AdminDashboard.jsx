import React, { useState, useEffect } from "react";
import CategoryList from "./admin/CategoryList";
import dataJson from "../data.json"; // JSON local
import axios from "axios";

function AdminDashboard() {
  const [data, setData] = useState(dataJson);

  // Fonction pour sauvegarder dans MongoDB
  const handleSave = async () => {
    try {
      await axios.post("http://localhost:5000/api/categories", data);
      alert("✅ Données enregistrées avec succès !");
    } catch (error) {
      console.error("Erreur sauvegarde :", error);
      alert("❌ Erreur lors de la sauvegarde");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">🛠️ Tableau de bord Admin</h2>
      <CategoryList data={data} setData={setData} />
      <button
        onClick={handleSave}
        className="mt-4 bg-green-600 text-white px-4 py-2 rounded"
      >
        💾 Enregistrer dans la base de données
      </button>
    </div>
  );
}

export default AdminDashboard;
