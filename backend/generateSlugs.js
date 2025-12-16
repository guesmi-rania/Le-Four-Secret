// generateSlugs.js
const mongoose = require("mongoose");
const Product = require("./models/Product");
const slugify = require("slugify");

// Remplace par ton URI MongoDB
mongoose.connect("mongodb://localhost:27017/tonDB", { useNewUrlParser: true, useUnifiedTopology: true });

async function generateSlugs() {
  const products = await Product.find();
  for (let p of products) {
    if (!p.slug) {
      p.slug = slugify(p.name, { lower: true, strict: true });
      await p.save();
      console.log(`Slug généré pour ${p.name}: ${p.slug}`);
    }
  }
  mongoose.disconnect();
  console.log("Tous les slugs ont été générés !");
}

generateSlugs().catch(err => console.error(err));
