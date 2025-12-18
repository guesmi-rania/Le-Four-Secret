import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import "../styles/TastingList.css";

export default function TastingPage() {
  const [form, setForm] = useState({ name: "", email: "", date: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.date || !form.message) {
      alert("Veuillez remplir tous les champs.");
      return;
    }

    try {
      // Ici tu peux remplacer l’URL par ton backend
      const response = await fetch("/api/tasting", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!response.ok) throw new Error("Erreur lors de l'envoi");

      setSubmitted(true);
      setForm({ name: "", email: "", date: "", message: "" });
      setTimeout(() => setSubmitted(false), 3000);

    } catch (err) {
      console.error(err);
      alert("Une erreur est survenue. Veuillez réessayer.");
    }
  };

  return (
    <div className="tasting-page">
      {/* SEO */}
      <Helmet>
        <title>Réservez votre dégustation | Douceurs du Chef</title>
        <meta name="description" content="Réservez une dégustation de nos pâtisseries artisanales et découvrez nos créations." />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={`${window.location.origin}/tasting`} />
      </Helmet>

      {/* HEADER */}
      <div className="tasting-header">
        <h1>Réservez votre Dégustation</h1>
        <p>Découvrez nos créations pâtissières et choisissez la date qui vous convient. Nous vous accueillerons avec plaisir !</p>
      </div>

      {/* CONTENU */}
      <div className="tasting-content">
        {/* INFO */}
        <div className="tasting-info">
          <h3>Informations</h3>
          <p>Nos dégustations sont organisées sur rendez-vous. Chaque session dure environ 30 minutes et vous permet de goûter une sélection de nos pâtisseries artisanales.</p>
          <ul>
            <li>Adresse : 123 Rue des Gourmands, Tunis</li>
            <li>Horaires : Tous les jours de 10h à 18h</li>
            <li>Contact : <a href="tel:+21620828055">+216 20 828 055</a> | <a href="mailto:contact@chefLotfi.com">contact@chefLotfi.com</a></li>
          </ul>
        </div>

        {/* FORMULAIRE */}
        <form className="tasting-form" onSubmit={handleSubmit}>
          <h3>Formulaire de réservation</h3>

          <input type="text" name="name" placeholder="Votre nom" value={form.name} onChange={handleChange} required />
          <input type="email" name="email" placeholder="Votre email" value={form.email} onChange={handleChange} required />
          <input type="date" name="date" value={form.date} onChange={handleChange} required />
          <textarea name="message" placeholder="Votre message ou demandes spéciales" value={form.message} onChange={handleChange} required></textarea>

          <button type="submit">Envoyer la réservation</button>
          {submitted && <p className="success-msg">✅ Votre demande a été envoyée !</p>}
        </form>
      </div>

    
    </div>
  );
}
