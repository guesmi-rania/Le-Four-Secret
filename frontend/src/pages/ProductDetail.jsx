import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Helmet } from "react-helmet-async";
import "../styles/ProductDetail.css";
import { FaShoppingCart, FaHeart, FaRegHeart, FaBalanceScale } from "react-icons/fa";

const BASE_URL = import.meta.env.VITE_API_URL;

export default function ProductDetail({
  onAddToCart,
  onAddToWishlist,
  onAddToCompare,
  wishlist = [],
  compareList = [],
}) {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const res = await axios.get(`${BASE_URL}/api/products/${id}`);
        if (!res.data || !res.data._id) {
          setNotFound(true);
          return;
        }
    
        // Ajouter imageUrl si inexistant
        const productData = {
          ...res.data,
          imageUrl: res.data.imageUrl || `/images/products/${res.data.name.toLowerCase().replace(/[\s\(\)&]/g, "-")}.webp`
        };
    
        setProduct(productData);
      } catch (err) {
        console.error("Produit non trouvé", err);
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    }    
    fetchProduct();
  }, [id]);

  const isInWishlist = wishlist.some((item) => item._id === id);
  const isInCompare = compareList.some((item) => item._id === id);

  if (loading) return <div className="product-detail">Chargement...</div>;
  if (notFound || !product) return <div className="product-detail">❌ Produit non trouvé</div>;

  // SEO: données structurées JSON-LD
  const structuredData = {
    "@context": "https://schema.org/",
    "@type": "Product",
    name: product.name,
    image: product.imageUrl,
    description: product.description || "Produit artisanal Douceurs du Chef",
    brand: "Douceurs du Chef",
    offers: {
      "@type": "Offer",
      price: product.price,
      priceCurrency: "TND",
      availability: "https://schema.org/InStock",
      url: `${window.location.origin}/product/${id}`,
    },
  };

  return (
    <div className="product-detail">
      {/* SEO Helmet */}
      <Helmet>
        <title>{product.name} | Douceurs du Chef</title>
        <meta
          name="description"
          content={product.description?.slice(0, 150) || "Découvrez nos pâtisseries artisanales."}
        />
        <meta name="keywords" content={`patisserie, ${product.category}, douceurs, gateaux`} />

        {/* Open Graph (Facebook / WhatsApp) */}
        <meta property="og:title" content={product.name} />
        <meta property="og:description" content={product.description} />
        <meta property="og:image" content={product.imageUrl} />
        <meta property="og:type" content="product" />
        <meta property="og:url" content={`${window.location.origin}/product/${id}`} />

        {/* Twitter Cards */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={product.name} />
        <meta name="twitter:description" content={product.description} />
        <meta name="twitter:image" content={product.imageUrl} />

        {/* Canonical URL */}
        <link rel="canonical" href={`${window.location.origin}/product/${id}`} />

        {/* JSON-LD */}
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      </Helmet>

      <div className="detail-card">
        <img src={product.imageUrl} alt={product.name} className="detail-image" />
        <div className="detail-info">
          <h2>{product.name}</h2>
          <p className="category">{product.category}</p>
          <p className="by">Par Douceurs du Chef</p>

          <div className="price-box">
            <span className="price">{product.price} Dt</span>
            <span className="old-price">{(product.price * 1.2).toFixed(2)} Dt</span>
          </div>

          <div className="detail-actions">
            <button
              className="wishlist-btn"
              onClick={() => onAddToWishlist(product)}
              aria-label="Ajouter aux favoris"
            >
              {isInWishlist ? <FaHeart color="red" /> : <FaRegHeart />}
            </button>

            <button
              className="compare-btn"
              onClick={() => onAddToCompare(product)}
              disabled={isInCompare}
              aria-label="Ajouter à la comparaison"
            >
              <FaBalanceScale />
            </button>

            <button className="add-btn" onClick={() => onAddToCart(product)}>
              <FaShoppingCart /> Ajouter au panier
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
