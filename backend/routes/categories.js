// backend/routes/categories.js
const express = require("express");
const router = express.Router();
const Category = require("../models/Category");

// 🔁 GET toutes les catégories
router.get("/", async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur" });
  }
});

module.exports = router;
