import React, { useState, useEffect } from "react";
import axios from "axios";
import CategoryList from "../components/admin/CategoryList";
import ClientForm from "../components/admin/ClientForm";
import ClientsTable from "../components/admin/ClientsTable";

export default function AdminDashboard() {
  // États catégories
  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [errorCategories, setErrorCategories] = useState(null);

  // États clients
  const [clients, setClients] = useState([]);
  const [loadingClients, setLoadingClients] = useState(true);
  const [errorClients, setErrorClients] = useState(null);
  const [editingClient, setEditingClient] = useState(null);

  // Charger catégories au montage
  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/api/categories`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    })
      .then((res) => {
        setCategories(res.data);
        setLoadingCategories(false);
      })
      .catch((err) => {
        console.error("Erreur chargement catégories:", err);
        setErrorCategories("Erreur chargement catégories");
        setLoadingCategories(false);
      });
  }, []);

  // Charger clients au montage
  const fetchClients = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/admin/clients`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setClients(res.data);
      setLoadingClients(false);
    } catch (err) {
      console.error("Erreur chargement clients:", err);
      setErrorClients("Erreur chargement clients");
      setLoadingClients(false);
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  // Sauvegarder catégories
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

  // Sauvegarder client (création ou modification)
  const handleSaveClient = async (clientData) => {
    try {
      if (clientData._id) {
        await axios.put(
          `${import.meta.env.VITE_API_URL}/api/admin/clients/${clientData._id}`,
          clientData,
          { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
        );
      } else {
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

  // Supprimer client
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
        {loadingCategories && <p>Chargement des catégories...</p>}
        {errorCategories && <p className="text-red-600">{errorCategories}</p>}
        {!loadingCategories && !errorCategories && (
          <>
            <CategoryList data={categories} setData={setCategories} />
            <button
              onClick={handleSaveCategories}
              className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              💾 Enregistrer les catégories
            </button>
          </>
        )}
      </section>

      <section>
        <h2 className="text-3xl font-bold mb-6">Gestion des clients</h2>
        {loadingClients && <p>Chargement des clients...</p>}
        {errorClients && <p className="text-red-600">{errorClients}</p>}
        {!loadingClients && !errorClients && (
          <>
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
          </>
        )}
      </section>
    </div>
  );
}
