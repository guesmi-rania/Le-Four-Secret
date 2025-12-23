// backend/routes/adminRoutes.js
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authAdmin = require('../middlewares/authAdmin');
const Admin = require('../models/AdminModel');
const Client = require('../models/Client');
const Order = require('../models/Order');
const Product = require('../models/Product');

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

// --- ROUTES ADMIN PROTÉGÉES ---
// Récupérer tous les clients
router.get('/clients', authAdmin, async (req, res) => {
  try {
    const clients = await Client.find().sort({ dateInscription: -1 });
    res.json(clients);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Récupérer toutes les commandes
router.get('/orders', authAdmin, async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("clientId", "name email address") // Remplace clientId si tu as un champ différent
      .populate("cart.productId", "name price")   // Pour les infos produit si besoin
      .sort({ createdAt: -1 });

    // Transforme les données pour correspondre au frontend
    const formattedOrders = orders.map(order => ({
      _id: order._id,
      clientInfo: {
        name: order.clientId?.name || "—",
        email: order.clientId?.email || "—",
        address: order.clientId?.address || "—",
      },
      cart: order.cart.map(item => ({
        name: item.productId?.name || item.name,
        quantity: item.quantity,
      })),
      totalPrice: order.totalPrice,
      status: order.status,
      createdAt: order.createdAt
    }));

    res.json(formattedOrders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

// Exemple route produits admin (lecture)
router.get('/products', authAdmin, async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
