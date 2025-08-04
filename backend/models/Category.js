// backend/models/Category.js
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: String,
});

const subcategorySchema = new mongoose.Schema({
  name: String,
  products: [productSchema],
});

const categorySchema = new mongoose.Schema({
  category: String,
  subcategories: [subcategorySchema],
});

module.exports = mongoose.model("Category", categorySchema);
