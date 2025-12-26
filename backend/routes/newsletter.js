// backend/routes/newsletter.js
const express = require("express");
const router = express.Router();
const Newsletter = require("../models/Newsletter"); // Assure-toi que ce modèle existe

// Route POST pour s'inscrire à la newsletter
router.post("/", async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: "Email requis." });

  try {
    const exists = await Newsletter.findOne({ email });
    if (exists) return res.status(400).json({ message: "Cet email est déjà inscrit." });

    const subscriber = new Newsletter({ email });
    await subscriber.save();

    res.status(201).json({ message: "Inscription réussie !" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur serveur." });
  }
});

module.exports = router;
