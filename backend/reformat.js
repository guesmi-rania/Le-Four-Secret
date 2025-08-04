// reformat.js
const fs = require('fs');

const rawData = require('./data.json');

// On transforme tous les produits de string ➜ object { name: "..." }
const formattedData = rawData.map(category => {
  return {
    ...category,
    subcategories: category.subcategories.map(sub => ({
      ...sub,
      products: sub.products.map(p => ({ name: p }))
    }))
  };
});

// Sauvegarde dans un nouveau fichier
fs.writeFileSync('./formattedData.json', JSON.stringify(formattedData, null, 2), 'utf-8');
console.log('✅ formattedData.json créé avec succès.');
