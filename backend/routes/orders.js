const express = require("express");
const router = express.Router();
const Order = require("../models/Order");

// Créer une commande
router.post("/", async (req, res) => {
  try {
    const { clientInfo, cart, totalPrice } = req.body;
    const newOrder = new Order({ clientInfo, cart, totalPrice });
    await newOrder.save();
    res.status(201).json({ message: "Commande créée avec succès !" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Récupérer toutes les commandes (Admin)
router.get("/", async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
