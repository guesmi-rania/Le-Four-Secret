import React, { useEffect, useState } from "react";
import AdminNavbar from "../components/Sidebar";
import axios from "axios";

export default function AdminProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("https://your-backend-url.com/api/products") // Remplace par ton backend
      .then((res) => setProducts(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <AdminNavbar />
      <main className="dashboard-main">
        <h2>Produits</h2>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nom</th>
              <th>Prix</th>
              <th>Stock</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p._id}>
                <td>{p._id}</td>
                <td>{p.name}</td>
                <td>{p.price} TND</td>
                <td>{p.stock}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
}
