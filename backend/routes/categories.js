const express = require('express');
const router = express.Router();
const Category = require('../models/Category'); // modèle mongoose

router.get('/', async (req, res) => {
  try {
    const categories = await Category.find(); // récupère toutes catégories
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

module.exports = router;
