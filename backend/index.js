// backend/index.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');

// --- Routes API ---
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/adminRoutes');
const productRoutes = require('./routes/products');
const orderRoutes = require('./routes/orders');
const categoriesRoutes = require('./routes/categories');
const newsletterRoutes = require('./routes/newsletter');

const app = express();

// --- Variables d'environnement ---
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// --- CORS ---
const corsOptions = {
  origin: [
    'http://localhost:5173',
    'https://frontend-recettes-fxc8.onrender.com',
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};
app.use(cors(corsOptions));

// --- JSON Body Parser ---
app.use(express.json());

// --- Routes API ---
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/categories', categoriesRoutes);
app.use('/api/newsletter', newsletterRoutes);

// --- Fichiers statiques React ---
const clientDistPath = path.join(__dirname, 'public', 'client');
const adminDistPath = path.join(__dirname, 'public', 'admin');

app.use(express.static(clientDistPath));
app.use('/admin', express.static(adminDistPath));

// --- Fallback pour Admin ---
app.get('/admin/*', (req, res) => {
  res.sendFile(path.join(adminDistPath, 'index.html'));
});

// --- Fallback pour Client ---
app.get('/*', (req, res) => {
  res.sendFile(path.join(clientDistPath, 'index.html'));
});

// --- Connexion MongoDB ---
mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('✅ Connecté à MongoDB Atlas');
    app.listen(PORT, () => {
      console.log(`🚀 Serveur démarré sur le port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('❌ Erreur MongoDB :', err.message);
    process.exit(1);
  });
