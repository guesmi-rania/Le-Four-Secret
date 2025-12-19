import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../styles/ProductDetail.css";
import { FaShoppingCart, FaHeart, FaRegHeart, FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";
import React360Viewer from "react-360-view";

export default function ProductDetail({ onAddToCart, onAddToWishlist, wishlist }) {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    import("../data/data.json").then((data) => {
      const allProducts = data.default.flatMap((cat) =>
        cat.products.map((name, index) => ({
          _id: `${cat.category}-${index}`,
          name,
          categories: [cat.category],
          price: Math.floor(Math.random() * 50) + 10,
          description: `Description détaillée pour ${name}. Ici vous pouvez ajouter toutes les informations du produit.`,
          imageUrl: `/images/products/${name.replace(/\s+/g, "-")}.jpg`,
          images360: Array.from({ length: 36 }, (_, i) =>
            `/images/products/360/${name.replace(/\s+/g, "-")}/${i}.jpg`
          ),
        }))
      );
      const prod = allProducts.find((p) => p._id === id);
      setProduct(prod);
    });
  }, [id]);

  if (!product) return <p>Chargement du produit...</p>;

  const isInWishlist = wishlist.some((item) => item._id === product._id);

  return (
    <div className="product-detail-page">
      <div className="product-detail-left">
        <img src={product.imageUrl} alt={product.name} className="main-image" />

        {product.images360 && product.images360.length > 0 && (
          <React360Viewer
            amount={product.images360.length}
            imagePath={`/images/products/360/${product.name.replace(/\s+/g, "-")}/`}
            fileName="{}.jpg"
            spinReverse={false}
          />
        )}

        {/* Ligne séparatrice */}
        <hr className="separator" />

        {/* Description en dessous de l'image */}
        <div className="product-description">
          <h2>Description du produit</h2>
          <p>{product.description}</p>
        </div>

        {/* Réseaux sociaux */}
        <div className="social-buttons">
          <button className="facebook"><FaFacebookF /> Partager</button>
          <button className="twitter"><FaTwitter /> Tweeter</button>
          <button className="instagram"><FaInstagram /> Instagram</button>
        </div>
      </div>

      <div className="product-detail-right">
        <h1>{product.name}</h1>
        <p className="price">{product.price.toFixed(2)} TND</p>

        <div className="product-buttons">
          <button className="add-to-cart" onClick={() => onAddToCart(product)}>
            <FaShoppingCart /> Ajouter au panier
          </button>

          <button className="wishlist" onClick={() => onAddToWishlist(product)}>
            {isInWishlist ? <FaHeart /> : <FaRegHeart />} Ajouter à la wishlist
          </button>
        </div>

        {/* Types de paiement sous le récap */}
        <div className="payment-methods-right">
          <h3>Méthodes de paiement acceptées :</h3>
          <span>💳 Visa</span>
          <span>💳 Mastercard</span>
          <span>💳 PayPal</span>
        </div>
      </div>
    </div>
  );
}
