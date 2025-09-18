// backend/index.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');

// --- Routes ---
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
    'https://frontend-recettes-fxc8.onrender.com', // Client déployé
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

// --- Frontend React statique ---
const distPath = path.join(__dirname, 'public', 'dist');
app.use(express.static(distPath));

// --- Routes Fallback pour React ---
app.get(/^\/(?!api|admin).*/, (req, res) => {
  res.sendFile(path.join(distPath, 'admin', 'index.html'));
});

// Fallback pour Client
app.get(/(.*)/, (req, res) => {
  res.sendFile(path.join(distPath, 'client', 'index.html'));
});

// --- Connexion MongoDB et lancement serveur ---
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
