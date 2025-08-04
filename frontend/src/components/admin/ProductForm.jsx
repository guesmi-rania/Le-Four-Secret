import React, { useState } from "react";

export default function ProductForm({ categoryIndex, subIndex, data, setData }) {
  const [productName, setProductName] = useState("");

  const addProduct = () => {
    if (!productName.trim()) return;
    const newData = [...data];
    newData[categoryIndex].subcategories[subIndex].products.push(productName.trim());
    setData(newData);
    setProductName("");
  };

  const deleteProduct = (productIndex) => {
    const newData = [...data];
    newData[categoryIndex].subcategories[subIndex].products.splice(productIndex, 1);
    setData(newData);
  };

  return (
    <div className="ml-6 mt-1">
      <ul className="list-disc ml-4 text-sm text-gray-600">
        {data[categoryIndex].subcategories[subIndex].products.map((prod, i) => (
          <li key={i} className="flex justify-between items-center">
            {prod}
            <button
              onClick={() => deleteProduct(i)}
              className="text-xs text-red-500"
            >
              Supprimer
            </button>
          </li>
        ))}
      </ul>
      <input
        type="text"
        placeholder="Nouveau produit"
        value={productName}
        onChange={(e) => setProductName(e.target.value)}
        className="border px-2 py-1 mt-1"
      />
      <button
        onClick={addProduct}
        className="ml-2 bg-purple-500 text-white px-2 py-1 rounded"
      >
        Ajouter
      </button>
    </div>
  );
}
