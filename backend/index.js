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
const allowedOrigins = [
  "http://localhost:5173", // client local
  "http://localhost:5174", // admin local
  "https://recettes-de-cuisine.onrender.com" // client prod
];

app.use(cors({
  origin: function(origin, callback) {
    if (!origin) return callback(null, true); // Postman, serveur
    if (allowedOrigins.includes(origin)) return callback(null, true);
    callback(new Error('Not allowed by CORS'));
  },
  methods: ["GET","POST","PUT","DELETE","OPTIONS"],
  allowedHeaders: ["Content-Type","Authorization"],
  credentials: true
}));

app.options("*", cors());

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
const clientPath = path.join(__dirname, 'public', 'client');
const adminPath = path.join(__dirname, 'public', 'admin');

app.use('/admin', express.static(adminPath));
app.use('/', express.static(clientPath));

// --- Fallback React SPA ---
app.get('/admin/*', (req, res) => {
  res.sendFile(path.join(adminPath, 'index.html'));
});

app.get('/*', (req, res) => {
  res.sendFile(path.join(clientPath, 'index.html'));
});

// --- Connexion MongoDB et lancement serveur ---
mongoose.set('strictQuery', true); // éviter warnings mongoose
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
