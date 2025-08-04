const mongoose = require('mongoose');
const Category = require('./models/Category'); // ou le nom de ton modèle
const data = require('data.json');
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://raniaguesmi:AhfnzsUoS3gnIfNe@cluster2.stjl3ql.mongodb.net/recettes?retryWrites=true&w=majority&appName=Cluster2';

mongoose.connect(MONGODB_URI)
  .then(async () => {
    console.log("Connecté à MongoDB");

    await Category.deleteMany(); // Vide l'ancienne collection (optionnel)
    await Category.insertMany(data); // Insère les nouvelles données

    console.log("✅ Données insérées avec succès !");
    process.exit();
  })
  .catch((err) => {
    console.error("❌ Erreur :", err);
    process.exit(1);
  });
