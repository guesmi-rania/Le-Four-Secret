// backend/routes/orders.js
const express = require('express');
const router = express.Router();
const { getOrders, createOrder, updateOrderStatus } = require('../controllers/ordersController');
const authAdmin = require('../middlewares/authAdmin'); // middleware pour protéger les routes admin

// --- Routes ---
// Créer une commande (client)
router.post('/', createOrder);

// Récupérer toutes les commandes (admin)
router.get('/', authAdmin, getOrders);

// Mettre à jour le statut d’une commande (admin)
router.put('/:id/status', authAdmin, updateOrderStatus);

module.exports = router;
