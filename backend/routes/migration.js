// migration.js - Exécuter une seule fois
const mongoose = require('mongoose');
const Client = require('./models/Client');

async function migrateClients() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    
    // Renommer le champ 'nom' en 'name'
    await Client.updateMany(
      { nom: { $exists: true } },
      { $rename: { "nom": "name" } }
    );
    
    console.log("Migration terminée !");
    process.exit(0);
  } catch (error) {
    console.error("Erreur migration:", error);
    process.exit(1);
  }
}

migrateClients();