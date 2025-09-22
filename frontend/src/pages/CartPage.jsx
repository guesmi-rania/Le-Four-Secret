import React from "react";
import "../styles/Cart.css";
import { FaTrashAlt } from "react-icons/fa";

export default function CartPage({ cart, setCart }) {
  const total = cart.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);

  const handleRemove = (id) => {
    const updated = cart.filter((item) => item._id !== id);
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated)); // synchro stockage
  };

  return (
    <div className="cart-page">
      <h2>🛒 Mon Panier</h2>

      {cart.length === 0 ? (
        <p className="empty">Votre panier est vide.</p>
      ) : (
        <>
          <div className="cart-grid">
            {cart.map((item) => (
              <div key={item._id} className="cart-item">
                <img src={item.image || item.imageUrl} alt={item.name} />
                <div className="info">
                  <h4>{item.name}</h4>
                  <p className="price">{item.price} Dt</p>
                  <p>Quantité : {item.quantity || 1}</p>
                </div>
                <button className="remove-btn" onClick={() => handleRemove(item._id)}>
                  <FaTrashAlt />
                </button>
              </div>
            ))}
          </div>

          <div className="cart-total">
            <h3>Total : {total.toFixed(2)} Dt</h3>
            <button className="checkout-btn">Passer la commande</button>
          </div>
        </>
      )}
    </div>
  );
}
