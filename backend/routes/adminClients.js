const express = require('express');
const Client = require('../models/Client');
const authAdmin = require('../middlewares/authAdmin');
const router = express.Router();

// Create
router.post('/', authAdmin, async (req, res) => {
  try {
    const c = new Client(req.body);
    await c.save();
    res.status(201).json(c);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Read all
router.get('/', authAdmin, async (req, res) => {
  try {
    const clients = await Client.find().sort({ dateInscription: -1 });
    res.json(clients);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Read one
router.get('/:id', authAdmin, async (req, res) => {
  try {
    const client = await Client.findById(req.params.id);
    if (!client) return res.status(404).json({ message: 'Client non trouvé' });
    res.json(client);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update
router.put('/:id', authAdmin, async (req, res) => {
  try {
    const updated = await Client.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updated) return res.status(404).json({ message: 'Client non trouvé' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete
router.delete('/:id', authAdmin, async (req, res) => {
  try {
    await Client.findByIdAndDelete(req.params.id);
    res.json({ message: 'Client supprimé' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;