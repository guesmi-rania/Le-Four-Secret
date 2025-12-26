// backend/middlewares/authAdmin.js
const jwt = require('jsonwebtoken');

const authAdmin = (req, res, next) => {
  try {
    // Vérifier le header Authorization : "Bearer TOKEN"
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ message: 'Accès refusé : token manquant' });
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Accès refusé : token invalide' });
    }

    // Vérifier le token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Vérifier si l'utilisateur est admin
    if (!decoded || !decoded.isAdmin) {
      return res.status(403).json({ message: 'Accès interdit : non admin' });
    }

    // Ajouter les infos admin à la requête pour les routes suivantes
    req.admin = {
      id: decoded.id,
      username: decoded.username,
    };

    next();
  } catch (err) {
    console.error('authAdmin error:', err.message);
    return res.status(401).json({ message: 'Token invalide ou expiré' });
  }
};

module.exports = authAdmin;
