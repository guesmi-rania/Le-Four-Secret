const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const crypto = require("crypto");
const Client = require("../models/Client");

// 🔐 Clé secrète (définie dans .env et récupérée ici)
const JWT_SECRET = process.env.JWT_SECRET || "dev_secret_key";

// 📧 Configuration email (ajouter ces variables dans ton .env sur Render)
const EMAIL_HOST = process.env.EMAIL_HOST || "smtp.gmail.com";
const EMAIL_PORT = process.env.EMAIL_PORT || 587;
const EMAIL_USER = process.env.EMAIL_USER; // ton-email@gmail.com
const EMAIL_PASS = process.env.EMAIL_PASS; // mot-de-passe-app-gmail
const FRONTEND_URL = process.env.FRONTEND_URL || "https://frontend-recettes-fxc8.onrender.com";

// ✅ Inscription
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Tous les champs sont requis." });
    }

    const existing = await Client.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "Email déjà utilisé." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newClient = new Client({
      name,
      email,
      password: hashedPassword,
    });

    await newClient.save();
    res.status(201).json({ message: "Inscription réussie !" });
  } catch (err) {
    console.error("Erreur inscription:", err);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

// ✅ Connexion
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const client = await Client.findOne({ email });
    if (!client) {
      return res.status(401).json({ message: "Email ou mot de passe incorrect." });
    }

    const isValid = await bcrypt.compare(password, client.password);
    if (!isValid) {
      return res.status(401).json({ message: "Email ou mot de passe incorrect." });
    }

    const token = jwt.sign(
      { id: client._id, email: client.email },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({
      message: "Connexion réussie",
      token,
      client: {
        id: client._id,
        name: client.name,
        email: client.email,
      },
    });
  } catch (err) {
    console.error("Erreur login:", err);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

// 🆕 ✅ Mot de passe oublié
router.post('/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "L'email est requis." });
    }

    // Vérifier si l'utilisateur existe
    const client = await Client.findOne({ email });
    if (!client) {
      // Par sécurité, on renvoie un message générique
      return res.status(200).json({ 
        message: "Si cet email existe, vous recevrez un lien de récupération." 
      });
    }

    // Générer un token de récupération
    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetTokenExpiry = Date.now() + 3600000; // 1 heure

    // Sauvegarder le token dans la base de données
    client.resetPasswordToken = resetToken;
    client.resetPasswordExpires = resetTokenExpiry;
    await client.save();

    // Configuration du transporter email
    if (!EMAIL_USER || !EMAIL_PASS) {
      console.error("Variables d'environnement email manquantes");
      return res.status(500).json({ 
        message: "Service email non configuré. Contactez l'administrateur." 
      });
    }

    const transporter = nodemailer.createTransporter({
      host: EMAIL_HOST,
      port: EMAIL_PORT,
      secure: false,
      auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS,
      },
    });

    // Créer le lien de récupération
    const resetURL = `${FRONTEND_URL}/reset-password?token=${resetToken}`;

    // Contenu de l'email
    const mailOptions = {
      from: `"Recettes de Cuisine" <${EMAIL_USER}>`,
      to: email,
      subject: "Récupération de mot de passe",
      html: `
        <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif;">
          <h2 style="color: #333;">Récupération de mot de passe</h2>
          <p>Bonjour ${client.name},</p>
          <p>Vous avez demandé à réinitialiser votre mot de passe.</p>
          <p>Cliquez sur le lien ci-dessous pour créer un nouveau mot de passe :</p>
          <a href="${resetURL}" 
             style="display: inline-block; padding: 12px 24px; background-color: #007bff; color: white; text-decoration: none; border-radius: 4px; margin: 16px 0;">
            Réinitialiser mon mot de passe
          </a>
          <p>Ce lien expire dans 1 heure.</p>
          <p>Si vous n'avez pas demandé cette réinitialisation, ignorez cet email.</p>
          <hr style="margin: 32px 0; border: none; border-top: 1px solid #eee;">
          <p style="color: #666; font-size: 12px;">Équipe Recettes de Cuisine</p>
        </div>
      `,
    };

    // Envoyer l'email
    await transporter.sendMail(mailOptions);

    res.status(200).json({ 
      message: "Un email de récupération a été envoyé à votre adresse email." 
    });

  } catch (err) {
    console.error("Erreur forgot-password:", err);
    res.status(500).json({ message: "Erreur serveur lors de l'envoi de l'email." });
  }
});

// 🆕 ✅ Réinitialisation du mot de passe
router.post('/reset-password', async (req, res) => {
  try {
    const { token, newPassword } = req.body;

    if (!token || !newPassword) {
      return res.status(400).json({ message: "Token et nouveau mot de passe requis." });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({ message: "Le mot de passe doit contenir au moins 6 caractères." });
    }

    // Trouver l'utilisateur avec ce token valide
    const client = await Client.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() }
    });

    if (!client) {
      return res.status(400).json({ message: "Token invalide ou expiré." });
    }

    // Hacher le nouveau mot de passe
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Mettre à jour le mot de passe et supprimer le token
    client.password = hashedPassword;
    client.resetPasswordToken = undefined;
    client.resetPasswordExpires = undefined;
    await client.save();

    res.status(200).json({ message: "Mot de passe réinitialisé avec succès !" });

  } catch (err) {
    console.error("Erreur reset-password:", err);
    res.status(500).json({ message: "Erreur serveur lors de la réinitialisation." });
  }
});

module.exports = router;