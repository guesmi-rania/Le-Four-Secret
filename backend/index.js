require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const fs = require('fs');

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

// --- Sécurité et optimisation ---
app.use(helmet());         // headers sécurisés
app.use(compression());     // gzip compression

// --- Limitation de requêtes ---
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(limiter);

// --- Logging HTTP ---
if (process.env.NODE_ENV === 'production') {
  const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });
  app.use(morgan('combined', { stream: accessLogStream }));
} else {
  app.use(morgan('dev'));
}

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
const clientPath = path.join(__dirname, 'public', 'client'); // React Frontend
const adminPath = path.join(__dirname, 'public', 'admin');   // React Admin

app.use('/admin', express.static(adminPath));
app.use('/', express.static(clientPath));

// --- React SPA Fallback ---
app.get('/admin/*', (req, res) => {
  res.sendFile(path.join(adminPath, 'index.html'));
});
app.get('/*', (req, res) => {
  res.sendFile(path.join(clientPath, 'index.html'));
});

// --- Gestion globale des erreurs ---
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({ message: err.message || 'Erreur serveur' });
});

// --- Connexion MongoDB et lancement serveur ---
mongoose.set('strictQuery', true);
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
