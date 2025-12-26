// backend/controllers/ordersController.js
const Order = require('../models/Order');

// Récupérer toutes les commandes (admin)
const getOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 }).populate('cart.product');
    res.json(orders);
  } catch (err) {
    console.error('getOrders error:', err.message);
    res.status(500).json({ message: 'Erreur serveur lors de la récupération des commandes' });
  }
};

// Créer une commande (client)
const createOrder = async (req, res) => {
  try {
    const { clientName, clientEmail, address, cart, totalPrice } = req.body;

    if (!clientName || !clientEmail || !address || !cart || !totalPrice) {
      return res.status(400).json({ message: 'Données de commande incomplètes' });
    }

    const newOrder = new Order({
      clientInfo: { name: clientName, email: clientEmail, address },
      cart,
      totalPrice,
      status: 'En attente',
    });

    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (err) {
    console.error('createOrder error:', err.message);
    res.status(500).json({ message: 'Erreur serveur lors de la création de la commande' });
  }
};

// Mettre à jour le statut d’une commande (admin)
const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const order = await Order.findById(id);
    if (!order) return res.status(404).json({ message: 'Commande non trouvée' });

    order.status = status || order.status;
    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } catch (err) {
    console.error('updateOrderStatus error:', err.message);
    res.status(500).json({ message: 'Erreur serveur lors de la mise à jour du statut' });
  }
};

module.exports = {
  getOrders,
  createOrder,
  updateOrderStatus,
};
