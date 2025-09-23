import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Helmet } from "react-helmet-async";
import "../styles/Checkout.css";

function Checkout({ cart, setCart }) {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", address: "" });
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const subTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const shipping = cart.length > 0 ? 7 : 0;
    const tax = subTotal * 0.05;
    setTotal(subTotal + shipping + tax);
  }, [cart]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
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
        clientName: form.name,
        clientEmail: form.email,
        address: form.address,
        totalPrice: total,
      });

      setCart([]);
      localStorage.removeItem("cart");
      setForm({ name: "", email: "", address: "" });

      navigate("/confirmation");
    } catch (err) {
      console.error("Erreur lors du checkout :", err);
      alert("Une erreur est survenue, veuillez réessayer.");
    }
  };

  return (
    <>
      {/* ✅ SEO Helmet */}
      <Helmet>
        <title>Checkout | Douceurs du Chef</title>
        <meta
          name="description"
          content="Finalisez votre commande de pâtisseries artisanales sur Douceurs du Chef. Remplissez vos informations et passez votre commande en toute sécurité."
        />
        <meta name="robots" content="noindex, nofollow" />
        <link rel="canonical" href={`${window.location.origin}/checkout`} />
      </Helmet>

      <form className="checkout" onSubmit={handleSubmit}>
        <h2>Valider la commande</h2>
        <input
          name="name"
          placeholder="Nom"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          name="email"
          placeholder="Email"
          type="email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          name="address"
          placeholder="Adresse"
          value={form.address}
          onChange={handleChange}
          required
        />
        <button type="submit">Envoyer (Total : {total.toFixed(2)} DT)</button>
      </form>
    </>
  );
}

export default Checkout;
