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
const Category = require('../models/Category');
const Newsletter = require('../models/Newsletter');

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
router.get('/clients', authAdmin, async (req, res) => {
  try {
    const clients = await Client.find().sort({ dateInscription: -1 });
    res.json(clients);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Commandes admin
router.get('/orders', authAdmin, async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("cart.product", "name price") // Populate seulement le produit
      .sort({ createdAt: -1 });

    const formattedOrders = orders.map(order => ({
      _id: order._id,
      clientInfo: order.clientInfo,
      cart: order.cart.map(item => ({
        name: item.name,
        quantity: item.quantity,
        price: item.price,
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

// Produits admin
router.get('/products', authAdmin, async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Catégories admin
router.get('/categories', authAdmin, async (req, res) => {
  try {
    const categories = await Category.find().sort({ createdAt: -1 });
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Newsletter admin
router.get('/newsletter', authAdmin, async (req, res) => {
  try {
    const subs = await Newsletter.find().sort({ createdAt: -1 });
    res.json(subs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
