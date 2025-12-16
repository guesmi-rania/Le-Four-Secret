// models/Product.js
const mongoose = require('mongoose');
const slugify = require('slugify');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, unique: true },
  description: String,
  price: Number,
  imageUrl: String,
  category: String,
});

// Middleware pour générer automatiquement le slug avant sauvegarde
productSchema.pre('save', function(next) {
  if (this.name && !this.slug) {
    this.slug = slugify(this.name, { lower: true, strict: true });
  }
  next();
});

module.exports = mongoose.model('Product', productSchema);
