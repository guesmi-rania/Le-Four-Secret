const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

// ✅ Liste de tous les produits
// IMPORTANT : cette route doit être AVANT /:id
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products); // retourne un tableau
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ✅ Produits populaires (optionnel)
router.get("/popular", async (req, res) => {
  try {
    const products = await Product.find().limit(6);
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ✅ Détail produit par slug
router.get("/slug/:slug", async (req, res) => {
  try {
    const product = await Product.findOne({ slug: req.params.slug });
    if (!product) {
      return res.status(404).json({ message: "Produit non trouvé" });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ✅ Détail produit par id
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Produit non trouvé" });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;