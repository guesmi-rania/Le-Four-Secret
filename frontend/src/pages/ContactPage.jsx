import React, { useRef, useState } from "react";
import emailjs from "emailjs-com";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Helmet } from "react-helmet-async";
import "../styles/ContactPage.css";
import { FaFacebookF, FaInstagram, FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";
import Footer from "../components/Footer";

export default function ContactPage() {
  const form = useRef();
  const [formData, setFormData] = useState({
    user_name: "",
    user_email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const sendEmail = (e) => {
    e.preventDefault();
    const { user_name, user_email, message } = formData;
    if (!user_name || !user_email || !message) {
      toast.error("❌ Veuillez remplir tous les champs.");
      return;
    }

    emailjs
      .sendForm(
        "YOUR_SERVICE_ID",
        "YOUR_TEMPLATE_ID",
        form.current,
        "YOUR_USER_ID"
      )
      .then(() => {
        toast.success("✅ Message envoyé avec succès !");
        form.current.reset();
        setFormData({ user_name: "", user_email: "", message: "" });
      })
      .catch((error) => {
        toast.error("❌ Une erreur est survenue. Veuillez réessayer.");
        console.error(error);
      });
  };

  return (
    <div className="contact-page">
      {/* ✅ SEO Helmet */}
      <Helmet>
        <title>Contact | Douceurs du Chef</title>
        <meta
          name="description"
          content="Contactez Douceurs du Chef pour toute question ou information."
        />
        <link rel="canonical" href={`${window.location.origin}/contact`} />
      </Helmet>

      {/* Contenu principal */}
      <main className="contact-container">
        <div className="contact-form">
          <h2>Contactez-nous</h2>
          <form ref={form} onSubmit={sendEmail}>
            <input
              type="text"
              name="user_name"
              placeholder="Nom"
              value={formData.user_name}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="user_email"
              placeholder="Email"
              value={formData.user_email}
              onChange={handleChange}
              required
            />
            <textarea
              name="message"
              placeholder="Votre message"
              value={formData.message}
              onChange={handleChange}
              required
            />
            <button type="submit">Envoyer un message</button>
          </form>
        </div>

        <div className="contact-info">
          <h2>Comment pouvons-nous vous aider ?</h2>
          <div className="contact-field">
            <FaPhoneAlt className="info-icon" />
            <div>
              <h4>Téléphone :</h4>
              <p>+216 20 828 055</p>
            </div>
          </div>

          <div className="contact-field">
            <FaEnvelope className="info-icon" />
            <div>
              <h4>Email :</h4>
              <p>lotfichef@gmail.com</p>
            </div>
          </div>

          <div className="contact-field">
            <MdLocationOn className="info-icon" />
            <div>
              <h4>Localisation :</h4>
              <p>N°11 rue Kawefel Borj Louzir Ariana</p>
            </div>
          </div>

          <h4>Suivez-nous :</h4>
          <ul className="social-links">
            <li>
              <a href="https://www.facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook">
                <FaFacebookF className="social-icon animated-icon" />
              </a>
            </li>
            <li>
              <a href="https://www.instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram">
                <FaInstagram className="social-icon animated-icon" />
              </a>
            </li>
          </ul>
        </div>

        {/* Carte Google Maps */}
        <div className="map-container">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6456956.935024549!2d7.204370499999999!3d33.886915!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1255f210b48d138d%3A0x7530c3ce67f77f35!2sTunisie!5e0!3m2!1sfr!2stn!4v1688532689513!5m2!1sfr!2stn"
            width="100%"
            height="300"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            title="Carte Tunisie"
          />
        </div>
      </main>

      {/* Séparateur avant le footer */}
      <div style={{ width: "100%", height: "2px", backgroundColor: "#eee", margin: "50px 0" }} />

      {/* Footer */}
      <Footer />
    </div>
  );
}
