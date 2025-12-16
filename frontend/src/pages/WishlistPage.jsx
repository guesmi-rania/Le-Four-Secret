import React from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import "../styles/Wishlist.css";

export default function WishlistPage({ wishlist, setWishlist }) {
  const handleRemove = (id) => {
    setWishlist((prev) => prev.filter((item) => item._id !== id));
  };

  return (
    <div className="wishlist-page">
      <Helmet>
        <title>Ma Wishlist | Douceurs du Chef</title>
        <meta
          name="description"
          content="Découvrez les produits que vous avez ajoutés à votre wishlist sur Douceurs du Chef."
        />
      </Helmet>

      <h2>Ma Wishlist</h2>

      {wishlist.length === 0 ? (
        <p className="empty-msg">Votre wishlist est vide.</p>
      ) : (
        <>
          <table className="wishlist-table">
            <thead>
              <tr>
                <th>Produit</th>
                <th>Nom</th>
                <th>Prix</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {wishlist.map((item) => (
                <tr key={item._id}>
                  <td>
                    <img src={item.imageUrl} alt={item.name} className="wishlist-img" />
                  </td>
                  <td>{item.name}</td>
                  <td>{item.price} Dt</td>
                  <td>
                    <button className="remove-btn" onClick={() => handleRemove(item._id)}>
                      Supprimer
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="shop-link-container">
  <Link to="/produits" className="shop-link-btn">
    Continuer vos achats
  </Link>
</div>
        </>
      )}
    </div>
  );
}
