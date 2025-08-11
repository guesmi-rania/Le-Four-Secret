const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
  nom: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  telephone: { type: String },
  adresse: { type: String },
  dateInscription: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Client', clientSchema);