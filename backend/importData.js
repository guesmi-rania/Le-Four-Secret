const mongoose = require("mongoose");
const Product = require("./models/Product");
const Category = require("./models/Category");
const data = require("./data.json"); // ton fichier JSON

mongoose.connect("mongodb+srv://raniaguesmi:AhfnzsUoS3gnIfNe@cluster2.stjl3ql.mongodb.net/recettes?retryWrites=true&w=majority&appName=Cluster2", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const importData = async () => {
  try {
    await Product.deleteMany();
    await Category.deleteMany();

    for (const item of data) {
      // Créer la catégorie
      await Category.create({ name: item.category });

      // Créer les produits
      const productsToInsert = item.products.map((p) => ({
        name: p,
        category: item.category,
        price: Math.floor(Math.random() * 50) + 5, // exemple prix aléatoire
        weight: Math.floor(Math.random() * 5) + 1, // exemple poids aléatoire
        imageUrl: "", // tu peux ajouter tes URLs
        description: "",
      }));

      await Product.insertMany(productsToInsert);
    }

    console.log("Import terminé !");
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

importData();
