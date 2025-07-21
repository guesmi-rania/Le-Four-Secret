import React, { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

// $📦 Composants
import Navbar from "./components/Navbar";
import Slider from "./components/Slider";
import ProtectedRoute from "./components/ProtectedRoute";

// $📄 Pages
import Home from "./pages/Home";
import ShopPage from "./pages/ShopPage"; 
import CartPage from "./pages/CartPage";
import OrdersPage from "./pages/OrdersPage";
import ClientAuth from "./pages/ClientAuth";
import WishlistPage from "./pages/WishlistPage";
import ProductDetail from "./pages/ProductDetail";
import TastingList from "./pages/TastingList";
import ContactPage from "./pages/ContactPage";
import Welcome from "./pages/Welcome";

// $🔔 Notifications
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// $🎨 CSS
import "./styles/Cart.css";

function App() {
  // $ State local storage pour cart, wishlist, compareList
  const [cart, setCart] = useState(() => JSON.parse(localStorage.getItem("cart")) || []);
  const [wishlist, setWishlist] = useState(() => JSON.parse(localStorage.getItem("wishlist")) || []);
  const [compareList, setCompareList] = useState(() => JSON.parse(localStorage.getItem("compareList")) || []);
  const location = useLocation();

  // $ Sync avec localStorage
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem("compareList", JSON.stringify(compareList));
  }, [compareList]);

  // $ Fonctions notifications
  const notifyAddCart = (name) => toast.success(`✅ ${name} ajouté au panier !`);
  const notifyAddWishlist = (name) => toast.info(`❤️ ${name} ajouté à la wishlist !`);
  const notifyRemoveWishlist = (name) => toast.info(`❌ ${name} retiré de la wishlist !`);
  const notifyAlreadyWishlist = (name) => toast.warning(`⚠️ ${name} est déjà dans la wishlist !`);
  const notifyAddCompare = (name) => toast.info(`⚖️ ${name} ajouté à la comparaison !`);

  // $ Gestion panier
  const handleAddToCart = (product) => {
    setCart(prev => [...prev, product]);
    notifyAddCart(product.name);
  };

  // $ Toggle wishlist (ajout / suppression)
  const handleToggleWishlist = (product) => {
    if (wishlist.find(item => item._id === product._id)) {
      setWishlist(prev => prev.filter(item => item._id !== product._id));
      notifyRemoveWishlist(product.name);
    } else {
      setWishlist(prev => [...prev, product]);
      notifyAddWishlist(product.name);
    }
  };

  // $ Ajouter à la comparaison (sans suppression)
  const handleAddToCompare = (product) => {
    if (!compareList.find(item => item._id === product._id)) {
      setCompareList(prev => [...prev, product]);
      notifyAddCompare(product.name);
    }
  };

  // $ Render JSX principal
  return (
    <>
      {/* $ Navbar affichée sur toutes les pages */}
      <Navbar cart={cart} wishlist={wishlist} />

      {/* $ Slider uniquement sur la page d'accueil */}
      {location.pathname === "/" && <Slider />}

      {/* $ Routes principales */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<ClientAuth />} />

        <Route path="/bienvenue" element={
          <ProtectedRoute>
            <Welcome />
          </ProtectedRoute>
        } />

<Route path="/produits" element={
  <ShopPage
    cart={cart}
    wishlist={wishlist}
    compareList={compareList}
    onAddToCart={handleAddToCart}
    onToggleWishlist={handleToggleWishlist}
    onAddToCompare={handleAddToCompare}
  />
} />

        <Route path="/produits/:id" element={
          <ProtectedRoute>
            <ProductDetail
              onAddToCart={handleAddToCart}
              onAddToWishlist={handleToggleWishlist}
              wishlist={wishlist}
              compareList={compareList}
              onAddToCompare={handleAddToCompare}
            />
          </ProtectedRoute>
        } />

        <Route path="/panier" element={<CartPage cart={cart} setCart={setCart} />} />
        <Route path="/wishlist" element={<WishlistPage wishlist={wishlist} setWishlist={setWishlist} />} />

        <Route path="/commandes" element={
          <ProtectedRoute>
            <OrdersPage />
          </ProtectedRoute>
        } />

        <Route path="/dégustation" element={<TastingList />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>

      {/* $ Container pour les notifications toast */}
      <ToastContainer position="bottom-right" autoClose={3000} />
    </>
  );
}

export default App;
