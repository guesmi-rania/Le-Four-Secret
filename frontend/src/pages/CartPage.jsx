import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import "../styles/Cart.css"; // Assure-toi que le chemin correspond

export default function CartPage({ cart, setCart }) {
  const navigate = useNavigate();
  const [total, setTotal] = useState(0);

  // Calcul du total
  useEffect(() => {
    const subTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const shipping = cart.length > 0 ? 7 : 0;
    const tax = subTotal * 0.05;
    setTotal(subTotal + shipping + tax);
  }, [cart]);

  // Supprimer un produit
  const handleRemove = (id) => {
    const updated = cart.filter((item) => item._id !== id);
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  // Modifier quantité
  const handleQuantityChange = (id, delta) => {
    const updated = cart.map((item) =>
      item._id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
    );
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  // Aller au checkout
  const handleCheckout = () => {
    if (cart.length === 0) {
      alert("Votre panier est vide !");
      return;
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    navigate("/checkout");
  };

  return (
    <div className="cart-container">
      {/* ✅ SEO Helmet */}
      <Helmet>
        <title>Mon Panier | Douceurs du Chef</title>
        <meta
          name="description"
          content="Consultez les articles de votre panier sur Douceurs du Chef et passez votre commande rapidement."
        />
        <meta name="robots" content="noindex, nofollow" />
        <link rel="canonical" href={`${window.location.origin}/cart`} />
      </Helmet>

      <h2>🛒 Mon Panier</h2>

      {cart.length === 0 ? (
        <p className="empty">Votre panier est vide.</p>
      ) : (
        <>
          <table className="cart-table">
            <thead>
              <tr>
                <th>Produit</th>
                <th>Prix</th>
                <th>Quantité</th>
                <th>Total</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => (
                <tr key={item._id}>
                  <td className="product-info">
                    <img src={item.imageUrl} alt={item.name} />
                    <span>{item.name}</span>
                  </td>
                  <td>{item.price.toFixed(2)} DT</td>
                  <td>
                    <div className="qty-control">
                      <button onClick={() => handleQuantityChange(item._id, -1)}>-</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => handleQuantityChange(item._id, 1)}>+</button>
                    </div>
                  </td>
                  <td>{(item.price * item.quantity).toFixed(2)} DT</td>
                  <td>
                    <button className="remove-btn" onClick={() => handleRemove(item._id)}>
                      ❌
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="cart-summary">
            <h3>Résumé de la commande</h3>
            <p>Sous-total : {cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)} DT</p>
            <p>Frais de livraison : {cart.length > 0 ? "7.00" : "0.00"} DT</p>
            <p>Taxes (5%) : {(cart.reduce((sum, item) => sum + item.price * item.quantity, 0) * 0.05).toFixed(2)} DT</p>
            <h3>Total : {total.toFixed(2)} DT</h3>
            <button className="checkout-btn" onClick={handleCheckout}>
              Passer la commande
            </button>
          </div>
        </>
      )}
    </div>
  );
}
