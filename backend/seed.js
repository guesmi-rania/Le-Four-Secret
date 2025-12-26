require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/Product');
const data = require('./data.json'); // ton JSON avec toutes les catégories et produits

const MONGODB_URI = process.env.MONGO_URI;

mongoose.connect(MONGODB_URI)
  .then(async () => {
    console.log("Connecté à MongoDB");

    await Product.deleteMany(); // Vide l'ancienne collection
    console.log("Ancien produits supprimés");

    const allProducts = [];
    data.forEach(categoryItem => {
      categoryItem.products.forEach(name => {
        allProducts.push({
          name,
          category: categoryItem.category,
          description: `Délicieux ${name} de la catégorie ${categoryItem.category}`,
          price: Math.floor(Math.random() * 50) + 5,
          imageUrl: `/images/${name.replace(/ /g, "_")}.jpg`,
          weight: parseFloat((Math.random() * 2 + 0.2).toFixed(2)) // poids aléatoire entre 0.2kg et 2.2kg
        });
      });
    });

    await Product.insertMany(allProducts);
    console.log("✅ Produits insérés avec succès !");
    mongoose.disconnect();
  })
  .catch(err => {
    console.error("❌ Erreur :", err);
    process.exit(1);
  });
