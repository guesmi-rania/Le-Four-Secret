// backend/routes/newsletter.js
const express = require("express");
const router = express.Router();
const Newsletter = require("../models/Newsletter"); // Assure-toi que ce modèle existe

// Route POST pour s'inscrire à la newsletter
router.post("/", async (req, res) => {
  try {
    const { email } = req.body;

    // Vérifier si l'email est fourni
    if (!email) {
      return res.status(400).json({ message: "Email requis" });
    }

    // Vérifier si l'email existe déjà
    const exists = await Newsletter.findOne({ email });
    if (exists) {
      return res.status(400).json({ message: "Cet email est déjà inscrit" });
    }

    // Sauvegarder le nouvel email
    const newEmail = new Newsletter({ email });
    await newEmail.save();

    res.status(201).json({ message: "Inscription réussie" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

module.exports = router;
