import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Products() {
  const [products, setProducts] = useState([]);
  const token = localStorage.getItem("adminToken");
  const PRODUCTS_URL = import.meta.env.VITE_PRODUCTS_URL;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`${PRODUCTS_URL}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProducts(res.data);
      } catch (err) {
        console.error(err);
        setProducts([]);
      }
    };
    if (token) fetchProducts();
  }, [token, PRODUCTS_URL]);

  return (
    <div>
      <h3>Produits</h3>
      <ul>
        {products.map((prod) => (
          <li key={prod._id}>{prod.name}</li>
        ))}
      </ul>
    </div>
  );
}
