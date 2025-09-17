// backend/routes/adminRoutes.js
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authAdmin = require('../middlewares/authAdmin');
const Admin = require('../models/AdminModel');
const Client = require('../models/Client'); // Pour exemple route clients

// --- LOGIN ADMIN (PUBLIC)
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const admin = await Admin.findOne({ username });
    if (!admin) return res.status(401).json({ message: 'Utilisateur introuvable' });

    const valid = await bcrypt.compare(password, admin.password);
    if (!valid) return res.status(401).json({ message: 'Mot de passe incorrect' });

    const token = jwt.sign(
      { id: admin._id, username: admin.username, isAdmin: true },
      process.env.JWT_SECRET,
      { expiresIn: '8h' }
    );

    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// --- ROUTES PROTÉGÉES
// Exemple : récupérer tous les clients
router.get('/clients', authAdmin, async (req, res) => {
  try {
    const clients = await Client.find().sort({ dateInscription: -1 });
    res.json(clients);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Autres routes admin protégées peuvent suivre le même modèle
// router.get('/orders', authAdmin, ...)
// router.post('/products', authAdmin, ...)

module.exports = router;
