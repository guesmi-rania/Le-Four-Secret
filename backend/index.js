require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');

const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/adminRoutes');    // <-- routes admin
const productRoutes = require('./routes/products');
const orderRoutes = require('./routes/orders');
const categoriesRoutes = require("./routes/categories");

const app = express();

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;
const JWT_SECRET = process.env.JWT_SECRET; // à utiliser dans auth.js

// CORS
const corsOptions = {
  origin: [
    'http://localhost:5173',
    'https://frontend-recettes-fxc8.onrender.com',
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));
app.use(express.json());

// Routes API
app.use('/api/auth', authRoutes);

// ** Protéger les routes admin avec un middleware auth JWT **
// Si tu as un middleware authAdmin, l’appliquer dans adminRoutes (ex dans adminRoutes.js)
// Exemple : app.use('/api/admin', authAdmin, adminRoutes);
app.use('/api/admin', adminRoutes);

app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/categories', categoriesRoutes);

// Frontend React statique (build)
app.use(express.static(path.join(__dirname, 'public', 'dist')));

// Fallback React Router (routes non API)
app.get('/:id', (req, res)  => {
  res.sendFile(path.join(__dirname, 'public', 'dist', 'index.html'));
});

// Connexion MongoDB + serveur
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
