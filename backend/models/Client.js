const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
  // ✅ Champs principaux (compatibles avec ton auth.js)
  name: { type: String, required: true },  // Changé de 'nom' vers 'name'
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // 🆕 Ajouté pour l'authentification
  
  // ✅ Champs pour la récupération de mot de passe
  resetPasswordToken: String,    // 🆕 Token de récupération
  resetPasswordExpires: Date,    // 🆕 Expiration du token
  
  // ✅ Champs optionnels (gardés de ton modèle original)
  telephone: { type: String },
  adresse: { type: String },
  
  // ✅ Métadonnées
  dateInscription: { type: Date, default: Date.now }
}, {
  // Options du schema
  timestamps: true // Ajoute automatiquement createdAt et updatedAt
});

// 🔒 Index pour optimiser les recherches
clientSchema.index({ email: 1 });
clientSchema.index({ resetPasswordToken: 1 });

// 🧹 Méthode pour nettoyer les tokens expirés
clientSchema.methods.clearExpiredResetToken = function() {
  if (this.resetPasswordExpires && this.resetPasswordExpires < Date.now()) {
    this.resetPasswordToken = undefined;
    this.resetPasswordExpires = undefined;
  }
};

// 🚫 Exclure le mot de passe des réponses par défaut
clientSchema.methods.toJSON = function() {
  const client = this.toObject();
  delete client.password;
  delete client.resetPasswordToken;
  delete client.resetPasswordExpires;
  return client;
};

module.exports = mongoose.model('Client', clientSchema);