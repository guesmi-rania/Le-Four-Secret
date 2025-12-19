import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../styles/ProductDetail.css";
import { FaShoppingCart, FaHeart, FaRegHeart } from "react-icons/fa";
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
          description: `Description détaillée pour ${name}`,
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

        {/* Visionneuse 360° si disponible */}
        {product.images360 && product.images360.length > 0 && (
          <React360Viewer
            amount={product.images360.length}
            imagePath={`/images/products/360/${product.name.replace(/\s+/g, "-")}/`}
            fileName="{}.jpg"
            spinReverse={false}
          />
        )}
      </div>

      <div className="product-detail-right">
        <h1>{product.name}</h1>
        <p className="price">{product.price.toFixed(2)} TND</p>
        <p className="description">{product.description}</p>

        <button onClick={() => onAddToCart(product)}>
          <FaShoppingCart /> Ajouter au panier
        </button>

        <button onClick={() => onAddToWishlist(product)}>
          {isInWishlist ? <FaHeart /> : <FaRegHeart />} Ajouter à la wishlist
        </button>
      </div>
    </div>
  );
}
