require('dotenv').config(); // Charger les variables d'environnement en premier

const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');

const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/adminRoutes');
const productRoutes = require('./routes/products');
const orderRoutes = require('./routes/orders');
const categoriesRoutes = require("./routes/categories");

const app = express();

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;
const JWT_SECRET = process.env.JWT_SECRET; // à utiliser dans auth.js

// Configuration CORS : adapte les origines selon besoin
const corsOptions = {
  origin: [
    'http://localhost:5173', // frontend dev
    'https://frontend-recettes-fxc8.onrender.com', // frontend prod (exemple)
    // ajoute d'autres domaines autorisés ici
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));
app.use(express.json()); // middleware JSON

// Routes API
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use("/api/categories", categoriesRoutes);

// Servir le frontend React buildé (dist dans public)
app.use(express.static(path.join(__dirname, 'public', 'dist')));

// Fallback React Router (toutes les routes non-API)
app.get('/:id', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'dist', 'index.html'));
});

// Connexion MongoDB + démarrage serveur
mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('✅ Connecté à MongoDB Atlas');
    app.listen(PORT, () => {
      console.log(`🚀 Serveur démarré sur le port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ Erreur de connexion MongoDB :', err.message);
  });
