// App.jsx
import React, { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Slider from "./components/Slider";
import Home from "./pages/Home";
import CartPage from "./pages/CartPage";
import ProductsPage from "./pages/ProductsPage";
import OrdersPage from "./pages/OrdersPage";
import ClientAuth from "./pages/ClientAuth";
import WishlistPage from "./pages/WishlistPage";
import ProductDetail from "./pages/ProductDetail";
import TastingList from "./pages/TastingList";
import ContactPage from "./pages/ContactPage";
import Welcome from "./pages/Welcome";
import ProtectedRoute from "./components/ProtectedRoute";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [cart, setCart] = useState(() => JSON.parse(localStorage.getItem("cart")) || []);
  const [wishlist, setWishlist] = useState(() => JSON.parse(localStorage.getItem("wishlist")) || []);
  const location = useLocation();

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  const notifyAddCart = (name) => toast.success(`✅ ${name} ajouté au panier !`);
  const notifyAddWishlist = (name) => toast.info(`❤️ ${name} ajouté à la wishlist !`);
  const notifyAlreadyWishlist = (name) => toast.warning(`⚠️ ${name} est déjà dans la wishlist !`);

  const handleAddToCart = (product) => {
    setCart((prev) => [...prev, product]);
    notifyAddCart(product.name);
  };

  const handleAddToWishlist = (product) => {
    if (!wishlist.find((item) => item._id === product._id)) {
      setWishlist((prev) => [...prev, product]);
      notifyAddWishlist(product.name);
    } else {
      notifyAlreadyWishlist(product.name);
    }
  };

  return (
    <>
      <Navbar cart={cart} wishlist={wishlist} />
      {location.pathname === "/" && <Slider />}

      <Routes>
        <Route path="/" element={<Home />} />

        {/* Authentification */}
        <Route path="/login" element={<ClientAuth />} />

        {/* Route protégée pour la page bienvenue */}
        <Route
          path="/bienvenue"
          element={
            <ProtectedRoute>
              <Welcome />
            </ProtectedRoute>
          }
        />

        {/* Pages protégées */}
        <Route
  path="/produits"
  element={
    <ProductsPage
      cart={cart}
      wishlist={wishlist}
      onAddToCart={handleAddToCart}
      onAddToWishlist={handleAddToWishlist}
    />
  }
/>


        <Route
          path="/produits/:id"
          element={
            <ProtectedRoute>
              <ProductDetail
                onAddToCart={handleAddToCart}
                onAddToWishlist={handleAddToWishlist}
                wishlist={wishlist}
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

      <ToastContainer position="bottom-right" autoClose={3000} />
    </>
  );
}

export default App;
