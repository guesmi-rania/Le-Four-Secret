const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true }, // Index unique déjà suffisant
  password: { type: String, required: true },
  
  resetPasswordToken: String,
  resetPasswordExpires: Date,
  
  telephone: { type: String },
  adresse: { type: String },
  
  dateInscription: { type: Date, default: Date.now }
}, {
  timestamps: true
});

// 🔒 Supprimé le duplicate index
// clientSchema.index({ email: 1 }); // <-- supprimé
clientSchema.index({ resetPasswordToken: 1 });

clientSchema.methods.clearExpiredResetToken = function() {
  if (this.resetPasswordExpires && this.resetPasswordExpires < Date.now()) {
    this.resetPasswordToken = undefined;
    this.resetPasswordExpires = undefined;
  }
};

clientSchema.methods.toJSON = function() {
  const client = this.toObject();
  delete client.password;
  delete client.resetPasswordToken;
  delete client.resetPasswordExpires;
  return client;
};

module.exports = mongoose.model('Client', clientSchema);
