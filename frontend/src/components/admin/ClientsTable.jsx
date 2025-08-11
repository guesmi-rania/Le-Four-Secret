import React from "react";

export default function ClientsTable({ clients, onEdit, onDelete }) {
  if (!clients.length) return <p>Aucun client trouvé.</p>;

  return (
    <table className="min-w-full bg-white border rounded shadow">
      <thead>
        <tr className="bg-green-600 text-white">
          <th className="py-2 px-4 text-left">Nom</th>
          <th className="py-2 px-4 text-left">Email</th>
          <th className="py-2 px-4 text-left">Téléphone</th>
          <th className="py-2 px-4 text-left">Adresse</th>
          <th className="py-2 px-4 text-center">Actions</th>
        </tr>
      </thead>
      <tbody>
        {clients.map((c) => (
          <tr key={c._id} className="border-t hover:bg-green-50">
            <td className="py-2 px-4">{c.nom}</td>
            <td className="py-2 px-4">{c.email}</td>
            <td className="py-2 px-4">{c.telephone || "-"}</td>
            <td className="py-2 px-4">{c.adresse || "-"}</td>
            <td className="py-2 px-4 text-center space-x-2">
              <button
                onClick={() => onEdit(c)}
                className="text-blue-600 hover:underline"
                aria-label="Modifier"
              >
                Modifier
              </button>
              <button
                onClick={() => {
                  if (window.confirm("Supprimer ce client ?")) onDelete(c._id);
                }}
                className="text-red-600 hover:underline"
                aria-label="Supprimer"
              >
                Supprimer
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
