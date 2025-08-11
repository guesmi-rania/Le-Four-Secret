import React, { useState, useEffect } from "react";
import axios from "axios";
import CategoryList from "../components/admin/CategoryList";
import ClientForm from "../components/admin/ClientForm";
import ClientsTable from "../components/admin/ClientsTable";
import dataJson from "../data.json"; // JSON local pour catégories

export default function AdminDashboard() {
  // --- Gestion catégories ---
  const [categories, setCategories] = useState(dataJson);

  const handleSaveCategories = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/categories`,
        categories,
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      alert("✅ Catégories enregistrées avec succès !");
    } catch (error) {
      console.error("Erreur sauvegarde catégories :", error);
      alert("❌ Erreur lors de la sauvegarde des catégories");
    }
  };

  // --- Gestion clients ---
  const [clients, setClients] = useState([]);
  const [editingClient, setEditingClient] = useState(null);

  const fetchClients = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/admin/clients`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setClients(res.data);
    } catch (err) {
      alert("Erreur chargement clients");
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  const handleSaveClient = async (clientData) => {
    try {
      if (clientData._id) {
        // update
        await axios.put(
          `${import.meta.env.VITE_API_URL}/api/admin/clients/${clientData._id}`,
          clientData,
          { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
        );
      } else {
        // create
        await axios.post(`${import.meta.env.VITE_API_URL}/api/admin/clients`, clientData, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
      }
      setEditingClient(null);
      fetchClients();
    } catch (err) {
      alert("Erreur sauvegarde client");
    }
  };

  const handleDeleteClient = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/admin/clients/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      fetchClients();
    } catch (err) {
      alert("Erreur suppression client");
    }
  };

  return (
    <div className="p-6 space-y-12">
      <section>
        <h2 className="text-2xl font-bold mb-4">🛠️ Gestion des catégories</h2>
        <CategoryList data={categories} setData={setCategories} />
        <button
          onClick={handleSaveCategories}
          className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          💾 Enregistrer les catégories
        </button>
      </section>

      <section>
        <h2 className="text-3xl font-bold mb-6">Gestion des clients</h2>

        <ClientForm
          onSave={handleSaveClient}
          clientToEdit={editingClient}
          onCancel={() => setEditingClient(null)}
        />

        <div className="mt-8">
          <ClientsTable
            clients={clients}
            onEdit={setEditingClient}
            onDelete={handleDeleteClient}
          />
        </div>
      </section>
    </div>
  );
}
