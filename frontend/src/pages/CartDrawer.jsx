import React from "react";
import { useNavigate } from "react-router-dom"; // <- import
import "../styles/CartDrawer.css";

const CartDrawer = ({ isOpen, onClose, cartItems, onUpdateQuantity }) => {
  const navigate = useNavigate(); // <- hook

  // Regrouper produits identiques
  const groupedCartItems = cartItems.reduce((acc, item) => {
    const existing = acc.find((i) => i._id === item._id);
    if (existing) {
      existing.quantity += item.quantity || 1;
    } else {
      acc.push({ ...item, quantity: item.quantity || 1 });
    }
    return acc;
  }, []);

  const subtotal = groupedCartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const handleQuantityChange = (item, delta) => {
    if (onUpdateQuantity) {
      const newQuantity = Math.max(1, item.quantity + delta);
      onUpdateQuantity(item._id, newQuantity);
    }
  };

  // Nouvelle fonction pour rediriger vers checkout
  const handleCheckoutClick = () => {
    onClose(); // Ferme le drawer
    navigate("/checkout"); // Redirige vers la page checkout
  };

  return (
    <div className={`cart-overlay ${isOpen ? "open" : ""}`}>
      <div className="cart-drawer">
        <div className="cart-header">
          <h3>Shopping Cart</h3>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        <div className="cart-body">
          {groupedCartItems.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            groupedCartItems.map((item) => (
              <div key={item._id} className="cart-item">
                <div className="item-image">
                  <img src={item.image || item.imageUrl} alt={item.name} />
                </div>
                <div className="item-info">
                  <h4>{item.name}</h4>
                  <p>Price: DT{item.price.toFixed(2)}</p>
                  <span className="item-total">
                    DT{(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
                <div className="item-actions">
                  <button onClick={() => handleQuantityChange(item, -1)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => handleQuantityChange(item, 1)}>+</button>
                </div>
              </div>
            ))
          )}
        </div>

        {groupedCartItems.length > 0 && (
          <div className="cart-footer">
            <div className="subtotal">
              <span>Subtotal</span>
              <span>DT{subtotal.toFixed(2)}</span>
            </div>
            <button className="view-cart">View Cart</button>
            {/* bouton modifié */}
            <button className="checkout" onClick={handleCheckoutClick}>Checkout</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartDrawer;
