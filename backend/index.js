require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');

const app = express();

// =======================
// CONFIG
// =======================
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// =======================
// MIDDLEWARES
// =======================
app.use(cors());
app.use(express.json());

// =======================
// ROUTES API (⚠️ TOUJOURS AVANT LE FRONT)
// =======================
app.use('/api/auth', require('./routes/auth'));
app.use('/api/admin', require('./routes/adminRoutes'));
app.use('/api/products', require('./routes/products'));
app.use('/api/orders', require('./routes/orders'));
app.use('/api/categories', require('./routes/categories'));
app.use('/api/newsletter', require('./routes/newsletter'));

// 🔒 Sécurité : toute route /api inconnue
app.use('/api', (req, res) => {
  res.status(404).json({ message: 'API route not found' });
});

// =======================
// FRONTEND STATIQUE
// =======================
const clientPath = path.join(__dirname, 'public', 'client');
const adminPath = path.join(__dirname, 'public', 'admin');

// Admin dashboard
app.use('/admin', express.static(adminPath));

// Client
app.use(express.static(clientPath));

// =======================
// FALLBACKS REACT
// =======================

// Admin React Router
app.get('/admin/*', (req, res) => {
  res.sendFile(path.join(adminPath, 'index.html'));
});

// Client React Router
app.get('*', (req, res) => {
  res.sendFile(path.join(clientPath, 'index.html'));
});

// =======================
// MONGODB + SERVER
// =======================
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB connecté');
    app.listen(PORT, () => {
      console.log(`🚀 Serveur lancé sur le port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB error:', err.message);
    process.exit(1);
  });
