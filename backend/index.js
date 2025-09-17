// backend/index.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');

// Routes
const authRoutes = require('./routes/auth');           // Inscription / login client
const adminRoutes = require('./routes/adminRoutes');   // Login admin + routes protégées
const productRoutes = require('./routes/products');    
const orderRoutes = require('./routes/orders');       
const categoriesRoutes = require('./routes/categories');
const newsletterRoutes = require('./routes/newsletter');

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// === CORS ===
const corsOptions = {
  origin: [
    'http://localhost:5173',
    'https://frontend-recettes-fxc8.onrender.com',
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};
app.use(cors(corsOptions));

// === JSON Body Parser ===
app.use(express.json());

// === Routes API ===
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes); // login public à l'intérieur, autres protégées avec authAdmin
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/categories', categoriesRoutes);
app.use('/api/newsletter', newsletterRoutes);

// === Frontend React statique ===
app.use(express.static(path.join(__dirname, 'public', 'dist')));

// === Fallback React Router ===
// toutes les routes non-API renvoient index.html
app.get(/(.*)/, (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'dist', 'index.html'));
});

// === Connexion MongoDB ===
mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('✅ Connecté à MongoDB Atlas');
    app.listen(PORT, () => {
      console.log(`🚀 Serveur démarré sur le port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('❌ Erreur MongoDB :', err.message);
  });
