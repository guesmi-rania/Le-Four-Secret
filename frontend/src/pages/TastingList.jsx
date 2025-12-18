// src/pages/TastingPage.jsx
import React, { useState } from "react";
import "../styles/TastingList.css";

export default function TastingPage() {
  const [form, setForm] = useState({ name: "", email: "", date: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.date || !form.message) {
      alert("Veuillez remplir tous les champs.");
      return;
    }
    console.log("Formulaire envoyé:", form);
    setSubmitted(true);
    setForm({ name: "", email: "", date: "", message: "" });
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="tasting-page">
      <div className="tasting-header">
        <h1>Réservez votre Dégustation</h1>
        <p>
          Découvrez nos créations pâtissières et choisissez la date qui vous convient.
        </p>
      </div>

      <div className="tasting-content">
        {/* INFO DÉGUSTATION */}
        <div className="tasting-info">
          <h3>Informations</h3>
          <p>Nos dégustations sont organisées sur rendez-vous...</p>
          <ul>
            <li>Adresse : 123 Rue des Gourmands, Tunis</li>
            <li>Horaires : 10h - 18h</li>
            <li>Contact : <a href="tel:+21620828055">+216 20 828 055</a> | 
                          <a href="mailto:contact@chefLotfi.com"> contact@chefLotfi.com</a></li>
          </ul>
        </div>

        {/* FORMULAIRE */}
        <form className="tasting-form" onSubmit={handleSubmit}>
          <h3>Formulaire de réservation</h3>
          <input type="text" name="name" placeholder="Votre nom" value={form.name} onChange={handleChange} required />
          <input type="email" name="email" placeholder="Votre email" value={form.email} onChange={handleChange} required />
          <input type="date" name="date" value={form.date} onChange={handleChange} required />
          <textarea name="message" placeholder="Votre message" value={form.message} onChange={handleChange} required></textarea>
          <button type="submit">Envoyer la réservation</button>
          {submitted && <p className="success-msg">✅ Votre demande a été envoyée !</p>}
        </form>
      </div>

    
    </div>
  );
}
