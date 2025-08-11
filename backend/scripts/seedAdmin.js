require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Admin = require('../models/AdminModel');

(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const existing = await Admin.findOne({ username: process.env.ADMIN_USERNAME });
    if (existing) return console.log('Admin déjà présent');

    const hashed = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);
    await Admin.create({ username: process.env.ADMIN_USERNAME, password: hashed });
    console.log('Admin seedé avec succès');
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();