import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/Checkout.css";

export default function Checkout({ cart, setCart }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [clientInfo, setClientInfo] = useState({
    firstName: "",
    lastName: "",
    company: "",
    country: "Tunisie",
    street: "",
    apartment: "",
    city: "",
    state: "",
    zip: "",
    phone: "",
    email: "",
    notes: "",
  });

  const [shipDifferent, setShipDifferent] = useState(false);
  const [shippingInfo, setShippingInfo] = useState({ ...clientInfo });

  const BASE_URL = import.meta.env.VITE_API_URL;
  const totalPrice = cart.reduce((acc, item) => acc + item.price * (item.quantity || 1), 0);

  const handleChange = (e, shipping = false) => {
    const target = shipping ? setShippingInfo : setClientInfo;
    target(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!cart.length) return alert("Votre panier est vide !");
    setLoading(true);

    try {
      const orderData = {
        clientInfo,
        shippingInfo: shipDifferent ? shippingInfo : clientInfo,
        cart,
        totalPrice,
      };
      await axios.post(`${BASE_URL}/api/orders`, orderData);
      setCart([]);
      navigate("/confirmation");
    } catch (err) {
      console.error(err);
      alert("Erreur lors de la commande !");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="checkout-page">
      <h1>Finaliser votre commande</h1>

      <div className="checkout-wrapper">
        {/* Formulaire */}
        <div className="checkout-form-wrapper">
          <form className="checkout-form" onSubmit={handleSubmit}>
            <h2>Détails de facturation</h2>

            <input
              type="text"
              name="firstName"
              placeholder="Prénom *"
              value={clientInfo.firstName}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="lastName"
              placeholder="Nom *"
              value={clientInfo.lastName}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="company"
              placeholder="Société (optionnel)"
              value={clientInfo.company}
              onChange={handleChange}
            />
            <select name="country" value={clientInfo.country} onChange={handleChange} required>
              <option value="Tunisie">Tunisie</option>
            </select>
            <input
              type="text"
              name="street"
              placeholder="Adresse *"
              value={clientInfo.street}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="apartment"
              placeholder="Appartement, suite, unité (optionnel)"
              value={clientInfo.apartment}
              onChange={handleChange}
            />
            <input
              type="text"
              name="city"
              placeholder="Ville *"
              value={clientInfo.city}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="state"
              placeholder="Gouvernorat *"
              value={clientInfo.state}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="zip"
              placeholder="Code postal *"
              value={clientInfo.zip}
              onChange={handleChange}
              required
            />
            <input
              type="tel"
              name="phone"
              placeholder="Téléphone *"
              value={clientInfo.phone}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email *"
              value={clientInfo.email}
              onChange={handleChange}
              required
            />
            <textarea
              name="notes"
              placeholder="Notes (optionnel)"
              value={clientInfo.notes}
              onChange={handleChange}
            />

            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={shipDifferent}
                onChange={() => setShipDifferent(!shipDifferent)}
              />
              Expédier à une adresse différente ?
            </label>

            {shipDifferent && (
              <div className="shipping-address">
                <h2>Adresse de livraison</h2>
                {Object.keys(shippingInfo).map((key) => (
                  key !== "notes" && key !== "country" && (
                    <input
                      key={key}
                      type="text"
                      name={key}
                      placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
                      value={shippingInfo[key]}
                      onChange={(e) => handleChange(e, true)}
                      required
                    />
                  )
                ))}
              </div>
            )}

            <h2>Méthode de paiement</h2>
            <label className="checkbox-label">
              <input type="radio" name="payment" value="card" defaultChecked />
              Paiement par carte bancaire
            </label>
            <label className="checkbox-label">
              <input type="radio" name="payment" value="cash" />
              Paiement à la livraison
            </label>

            <button type="submit" disabled={loading}>
              {loading ? "En cours..." : "Passer la commande"}
            </button>
          </form>
        </div>

        {/* Résumé de commande */}
        <div className="checkout-summary">
          <h2>Votre commande</h2>
          <ul>
            {cart.map((item) => (
              <li key={item._id}>
                {item.imageUrl && <img src={item.imageUrl} alt={item.name} />}
                <span>{item.name} x {item.quantity || 1}</span>
                <span>{(item.price * (item.quantity || 1)).toFixed(2)} TND</span>
              </li>
            ))}
          </ul>
          <div className="total">
            <strong>Total :</strong> {totalPrice.toFixed(2)} TND
          </div>
        </div>
      </div>
    </div>
  );
}
