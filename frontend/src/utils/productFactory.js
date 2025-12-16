// src/utils/productFactory.js

/**
 * Crée un produit avec un ID unique, prix fixe, et image
 * @param {string} category - Catégorie du produit
 * @param {string} name - Nom du produit
 * @param {number} price - Prix du produit (optionnel)
 * @returns {Object} Produit normalisé
 */
export function createProduct(category, name, price = null) {
    // Génère un ID unique basé sur le nom et la catégorie
    const id = `${category}-${name}`.toLowerCase().replace(/\s+/g, "-");
  
    // Prix aléatoire si non fourni, mais cohérent
    const finalPrice = price !== null ? price : Math.floor(Math.random() * 20 + 5);
  
    // URL image : /images/products/nom-du-produit.webp
    const imageUrl = `/images/products/${name.toLowerCase().replace(/[\s\(\)&]/g, "-")}.webp`;
  
    return {
      _id: id,
      name,
      category,
      price: finalPrice,
      imageUrl,
    };
  }
  
  /**
   * Normalise un produit pour s'assurer que toutes les propriétés existent
   * @param {Object} product
   * @returns {Object} Produit normalisé
   */
  export function normalizeProduct(product) {
    return {
      _id: product._id || `${product.category}-${product.name}`.toLowerCase().replace(/\s+/g, "-"),
      name: product.name || "Produit inconnu",
      category: product.category || "Non classé",
      price: product.price ?? 0,
      imageUrl: product.imageUrl || "/images/products/default.webp",
    };
  }
  