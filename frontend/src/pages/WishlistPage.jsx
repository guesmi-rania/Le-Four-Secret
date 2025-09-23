import React from "react";
import { Helmet } from "react-helmet-async";
import "../styles/Wishlist.css"; // Assure-toi de créer ce fichier CSS

export default function WishlistPage({ wishlist, setWishlist }) {
  const handleRemove = (id) => {
    setWishlist((prev) => prev.filter((item) => item._id !== id));
  };

  return (
    <div className="wishlist-page">
      {/* SEO */}
      <Helmet>
        <title>Ma Wishlist | Douceurs du Chef</title>
        <meta name="description" content="Découvrez les produits que vous avez ajoutés à votre wishlist sur Douceurs du Chef." />
        <meta name="robots" content="index, follow" />
      </Helmet>

      <h2>Ma Wishlist</h2>

      {wishlist.length === 0 ? (
        <p className="empty-msg">Votre wishlist est vide.</p>
      ) : (
        <div className="wishlist-items">
          {wishlist.map((item) => (
            <div key={item._id} className="wishlist-item">
              <img src={item.imageUrl} alt={item.name} />
              <div className="wishlist-details">
                <h3>{item.name}</h3>
                <p className="price">{item.price} Dt</p>
                <button className="remove-btn" onClick={() => handleRemove(item._id)}>Supprimer</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
