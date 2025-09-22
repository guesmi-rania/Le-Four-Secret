import React from "react";
import "../styles/CartDrawer.css";

const CartDrawer = ({ isOpen, onClose, cartItems }) => {
  return (
    <div className={`cart-overlay ${isOpen ? "open" : ""}`}>
      <div className="cart-drawer">
        <div className="cart-header">
          <h3>Shopping Cart</h3>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        <div className="cart-body">
          {cartItems.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            cartItems.map((item, index) => (
              <div key={index} className="cart-item">
                <div className="item-image">
                  <img src={item.image || item.imageUrl} alt={item.name} />
                </div>
                <div className="item-info">
                  <h4>{item.name}</h4>
                  <p>Item Price DT{item.price}</p>
                  <span className="item-total">
                    DT{(item.price * (item.quantity || 1)).toFixed(2)}
                  </span>
                </div>
                <div className="item-actions">
                  <button>-</button>
                  <span>{item.quantity || 1}</span>
                  <button>+</button>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="cart-footer">
          <div className="subtotal">
            <span>Subtotal</span>
            <span>
              DT
              {cartItems
                .reduce((acc, item) => acc + item.price * (item.quantity || 1), 0)
                .toFixed(2)}
            </span>
          </div>
          <button className="view-cart">View Cart</button>
          <button className="checkout">Checkout</button>
        </div>
      </div>
    </div>
  );
};

export default CartDrawer;
