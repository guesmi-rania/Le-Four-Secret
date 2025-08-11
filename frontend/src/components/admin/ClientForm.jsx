import React, { useState, useEffect } from "react";

export default function ClientForm({ onSave, clientToEdit, onCancel }) {
  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");
  const [telephone, setTelephone] = useState("");
  const [adresse, setAdresse] = useState("");

  useEffect(() => {
    if (clientToEdit) {
      setNom(clientToEdit.nom);
      setEmail(clientToEdit.email);
      setTelephone(clientToEdit.telephone || "");
      setAdresse(clientToEdit.adresse || "");
    } else {
      setNom("");
      setEmail("");
      setTelephone("");
      setAdresse("");
    }
  }, [clientToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!nom || !email) {
      alert("Nom et email sont obligatoires.");
      return;
    }
    onSave({ nom, email, telephone, adresse, _id: clientToEdit?._id });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 border p-4 rounded shadow bg-white">
      <h2 className="text-xl font-semibold">{clientToEdit ? "Modifier Client" : "Ajouter Client"}</h2>

      <input
        type="text"
        placeholder="Nom"
        value={nom}
        onChange={(e) => setNom(e.target.value)}
        className="w-full p-2 border rounded"
        required
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full p-2 border rounded"
        required
      />
      <input
        type="text"
        placeholder="Téléphone"
        value={telephone}
        onChange={(e) => setTelephone(e.target.value)}
        className="w-full p-2 border rounded"
      />
      <input
        type="text"
        placeholder="Adresse"
        value={adresse}
        onChange={(e) => setAdresse(e.target.value)}
        className="w-full p-2 border rounded"
      />

      <div className="flex space-x-4">
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
          {clientToEdit ? "Mettre à jour" : "Ajouter"}
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
          >
            Annuler
          </button>
        )}
      </div>
    </form>
  );
}
