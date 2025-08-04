import React, { useState } from "react";
import SubcategoryForm from "./SubcategoryForm";

export default function CategoryList({ data, setData }) {
  const [newCategory, setNewCategory] = useState("");

  const addCategory = () => {
    if (!newCategory.trim()) return;
    const newCat = { category: newCategory.trim(), subcategories: [] };
    setData([...data, newCat]);
    setNewCategory("");
  };

  const deleteCategory = (index) => {
    const newData = [...data];
    newData.splice(index, 1);
    setData(newData);
  };

  return (
    <div>
      {data.map((cat, index) => (
        <div key={index} className="mb-6 border rounded p-4 bg-white shadow">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-lg font-bold">{cat.category}</h2>
            <button
              className="text-red-500"
              onClick={() => deleteCategory(index)}
            >
              Supprimer
            </button>
          </div>
          {cat.subcategories.map((sub, j) => (
            <div key={j} className="ml-4 mb-2">
              <strong>{sub.name}</strong>
              <ul className="list-disc ml-6 text-sm text-gray-700">
                {sub.products.map((prod, k) => (
                  <li key={k}>{prod}</li>
                ))}
              </ul>
            </div>
          ))}
          <SubcategoryForm
            data={data}
            setData={setData}
            index={index}
          />
        </div>
      ))}

      <div className="mt-6">
        <input
          type="text"
          placeholder="Nouvelle catégorie"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          className="border px-2 py-1"
        />
        <button
          onClick={addCategory}
          className="ml-2 bg-green-500 text-white px-3 py-1 rounded"
        >
          Ajouter
        </button>
      </div>
    </div>
  );
}
