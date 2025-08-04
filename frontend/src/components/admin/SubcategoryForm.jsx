import React, { useState } from "react";
import ProductForm from "./ProductForm";

export default function SubcategoryForm({ data, setData, index }) {
  const [subName, setSubName] = useState("");

  const addSubcategory = () => {
    if (!subName.trim()) return;
    const newData = [...data];
    newData[index].subcategories.push({ name: subName.trim(), products: [] });
    setData(newData);
    setSubName("");
  };

  const deleteSubcategory = (subIndex) => {
    const newData = [...data];
    newData[index].subcategories.splice(subIndex, 1);
    setData(newData);
  };

  return (
    <div className="ml-4 mt-2">
      {data[index].subcategories.map((sub, subIndex) => (
        <div key={subIndex} className="mb-3">
          <div className="flex justify-between items-center">
            <strong>{sub.name}</strong>
            <button
              onClick={() => deleteSubcategory(subIndex)}
              className="text-red-500 text-sm"
            >
              Supprimer
            </button>
          </div>
          <ProductForm
            categoryIndex={index}
            subIndex={subIndex}
            data={data}
            setData={setData}
          />
        </div>
      ))}
      <div className="mt-2">
        <input
          type="text"
          placeholder="Nom de la sous-catégorie"
          value={subName}
          onChange={(e) => setSubName(e.target.value)}
          className="border px-2 py-1"
        />
        <button
          onClick={addSubcategory}
          className="ml-2 bg-blue-500 text-white px-3 py-1 rounded"
        >
          Ajouter
        </button>
      </div>
    </div>
  );
}
