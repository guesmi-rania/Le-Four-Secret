const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  clientInfo: {
    name: String,
    email: String,
    address: String,
  },
  cart: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
      name: String,
      quantity: Number,
      price: Number,
    },
  ],
  totalPrice: Number,
  status: { type: String, default: 'En attente' },
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
