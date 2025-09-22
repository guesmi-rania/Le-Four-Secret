const express = require("express");
const Order = require("../models/Order");
const router = express.Router();

// Créer une commande
router.post("/", async (req, res) => {
  try {
    const order = new Order(req.body);
    await order.save();
    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Récupérer toutes les commandes (admin ou test)
router.get("/", async (req, res) => {
  try {
    const orders = await Order.find().populate("products.product");
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Récupérer les commandes d’un client par email
router.get("/client/:email", async (req, res) => {
  try {
    const orders = await Order.find({ clientEmail: req.params.email }).populate("products.product");
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
