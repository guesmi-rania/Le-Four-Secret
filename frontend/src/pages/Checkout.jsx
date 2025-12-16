import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Helmet } from "react-helmet-async";
import "../styles/Checkout.css";

function Checkout({ cart, setCart }) {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    company: "",
    address: "",
    apartment: "",
    city: "",
    state: "",
    zip: "",
    country: "Tunisie",
    phone: "",
    email: "",
    orderNotes: "",
    coupon: "",
    agreePrivacy: false,
    reviewInvite: false,
    paymentMethod: "bank",
  });

  const [total, setTotal] = useState(0);

  useEffect(() => {
    const subTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const shipping = cart.length > 0 ? 20 : 0; // livraison fixe en TND
    const tax = subTotal * 0.07; // TVA 7%
    setTotal(subTotal + shipping + tax);
  }, [cart]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (cart.length === 0) {
      alert("Votre panier est vide !");
      return;
    }
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/orders`, {
        products: cart.map((item) => ({ product: item._id, quantity: item.quantity })),
        clientDetails: form,
        totalPrice: total,
        paymentMethod: form.paymentMethod,
      });
      setCart([]);
      localStorage.removeItem("cart");
      navigate("/confirmation");
    } catch (err) {
      console.error("Erreur lors du paiement :", err);
      alert("Une erreur est survenue, veuillez réessayer.");
    }
  };

  return (
    <>
      <Helmet>
        <title>Paiement | Douceurs du Chef</title>
      </Helmet>

      <div className="checkout-container">
        <form className="checkout-form" onSubmit={handleSubmit}>
          <h2>Valider la commande</h2>

          <input
            name="coupon"
            placeholder="Avez-vous un code promo ?"
            value={form.coupon}
            onChange={handleChange}
          />

          <div className="billing-grid">
            <input
              name="firstName"
              placeholder="Prénom *"
              value={form.firstName}
              onChange={handleChange}
              required
            />
            <input
              name="lastName"
              placeholder="Nom *"
              value={form.lastName}
              onChange={handleChange}
              required
            />
            <input
              name="company"
              placeholder="Nom de l'entreprise (optionnel)"
              value={form.company}
              onChange={handleChange}
            />
            <select
              name="country"
              value={form.country}
              onChange={handleChange}
              required
            >
              <option>Tunisie</option>
              <option>Autre</option>
            </select>
            <input
              name="address"
              placeholder="Adresse complète *"
              value={form.address}
              onChange={handleChange}
              required
            />
            <input
              name="apartment"
              placeholder="Appartement, étage, etc. (optionnel)"
              value={form.apartment}
              onChange={handleChange}
            />
            <input
              name="city"
              placeholder="Ville *"
              value={form.city}
              onChange={handleChange}
              required
            />
            <input
              name="state"
              placeholder="Gouvernorat *"
              value={form.state}
              onChange={handleChange}
              required
            />
            <input
              name="zip"
              placeholder="Code postal *"
              value={form.zip}
              onChange={handleChange}
              required
            />
            <input
              name="phone"
              placeholder="Téléphone *"
              value={form.phone}
              onChange={handleChange}
              required
            />
            <input
              name="email"
              type="email"
              placeholder="Adresse e-mail *"
              value={form.email}
              onChange={handleChange}
              required
            />
            <textarea
              name="orderNotes"
              placeholder="Notes supplémentaires (optionnel)"
              value={form.orderNotes}
              onChange={handleChange}
            ></textarea>
          </div>

          <div className="checkout-order">
            <h3>Votre commande</h3>
            {cart.map((item) => (
              <div key={item._id} className="order-item">
                <span>{item.name} × {item.quantity}</span>
                <span>{item.price * item.quantity} TND</span>
              </div>
            ))}
            <div className="order-total">
              <span>Sous-total :</span> <span>{cart.reduce((sum, item) => sum + item.price * item.quantity, 0)} TND</span>
            </div>
            <div className="order-total">
              <span>Total :</span> <span>{total.toFixed(2)} TND</span>
            </div>
          </div>

          <div className="payment-methods">
            <h4>Méthode de paiement</h4>
            <label>
              <input
                type="radio"
                name="paymentMethod"
                value="bank"
                checked={form.paymentMethod === "bank"}
                onChange={handleChange}
              />
              Virement bancaire
            </label>
            <label>
              <input
                type="radio"
                name="paymentMethod"
                value="check"
                checked={form.paymentMethod === "check"}
                onChange={handleChange}
              />
              Chèque
            </label>
            <label>
              <input
                type="radio"
                name="paymentMethod"
                value="cod"
                checked={form.paymentMethod === "cod"}
                onChange={handleChange}
              />
              Paiement à la livraison
            </label>
          </div>

          <label className="privacy">
            <input
              type="checkbox"
              name="agreePrivacy"
              checked={form.agreePrivacy}
              onChange={handleChange}
              required
            />
            J'ai lu et j'accepte la <a href="/privacy">politique de confidentialité</a>.
          </label>

          <label className="review-invite">
            <input
              type="checkbox"
              name="reviewInvite"
              checked={form.reviewInvite}
              onChange={handleChange}
            />
            Je souhaite être invité à laisser un avis sur ma commande
          </label>

          <button type="submit">Envoyer (Total : {total.toFixed(2)} TND)</button>
        </form>
      </div>
    </>
  );
}

export default Checkout;
