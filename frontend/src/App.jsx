import React, { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

// Composants & Pages
import Navbar from "./components/Navbar";
import Slider from "./components/Slider";
import ProtectedRoute from "./components/ProtectedRoute";

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

import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import ProtectedAdminRoute from "./pages/ProtectedAdminRoute";

// Notifications
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Styles globaux
import "./styles/Cart.css";

function App() {
  // States synchronisés avec localStorage
  const [cart, setCart] = useState(() => JSON.parse(localStorage.getItem("cart")) || []);
  const [wishlist, setWishlist] = useState(() => JSON.parse(localStorage.getItem("wishlist")) || []);
  const [compareList, setCompareList] = useState(() => JSON.parse(localStorage.getItem("compareList")) || []);

  const location = useLocation();

  // Synchroniser localStorage à chaque mise à jour
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem("compareList", JSON.stringify(compareList));
  }, [compareList]);

  // Notifications
  const notifyAddCart = (name) => toast.success(`✅ ${name} ajouté au panier !`);
  const notifyAddWishlist = (name) => toast.info(`❤️ ${name} ajouté à la wishlist !`);
  const notifyRemoveWishlist = (name) => toast.info(`❌ ${name} retiré de la wishlist !`);
  const notifyAddCompare = (name) => toast.info(`⚖️ ${name} ajouté à la comparaison !`);

  // Gestion du panier
  const handleAddToCart = (product) => {
    setCart((prev) => [...prev, product]);
    notifyAddCart(product.name);
  };

  // Toggle wishlist
  const handleToggleWishlist = (product) => {
    if (wishlist.find((item) => item._id === product._id)) {
      setWishlist((prev) => prev.filter((item) => item._id !== product._id));
      notifyRemoveWishlist(product.name);
    } else {
      setWishlist((prev) => [...prev, product]);
      notifyAddWishlist(product.name);
    }
  };

  // Ajouter à la comparaison
  const handleAddToCompare = (product) => {
    if (!compareList.find((item) => item._id === product._id)) {
      setCompareList((prev) => [...prev, product]);
      notifyAddCompare(product.name);
    }
  };

  return (
    <>
      {/* Navbar sur toutes les pages */}
      <Navbar cart={cart} wishlist={wishlist} />

      {/* Slider uniquement sur la page d'accueil */}
      {location.pathname === "/" && <Slider />}

      {/* Routes principales */}
      <Routes>
        {/* Routes Admin */}
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route
          path="/admin"
          element={
            <ProtectedAdminRoute>
              <AdminDashboard />
            </ProtectedAdminRoute>
          }
        />

        {/* Routes Client */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<ClientAuth />} />
        <Route
          path="/bienvenue"
          element={
            <ProtectedRoute>
              <Welcome />
            </ProtectedRoute>
          }
        />
        <Route
          path="/produits"
          element={
            <ShopPage
              onAddToCart={handleAddToCart}
              wishlist={wishlist}
              compareList={compareList}
              onToggleWishlist={handleToggleWishlist}
              onAddToCompare={handleAddToCompare}
            />
          }
        />
        <Route
          path="/produits/:id"
          element={
            <ProtectedRoute>
              <ProductDetail
                onAddToCart={handleAddToCart}
                onAddToWishlist={handleToggleWishlist}
                wishlist={wishlist}
                compareList={compareList}
                onAddToCompare={handleAddToCompare}
              />
            </ProtectedRoute>
          }
        />
        <Route path="/panier" element={<CartPage cart={cart} setCart={setCart} />} />
        <Route path="/wishlist" element={<WishlistPage wishlist={wishlist} setWishlist={setWishlist} />} />
        <Route
          path="/commandes"
          element={
            <ProtectedRoute>
              <OrdersPage />
            </ProtectedRoute>
          }
        />
        <Route path="/dégustation" element={<TastingList />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>

      {/* Container pour notifications */}
      <ToastContainer position="bottom-right" autoClose={3000} />
    </>
  );
}

export default App;
