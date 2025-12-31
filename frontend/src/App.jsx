// src/App.jsx
import React, { useEffect, useState } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Slider from "./components/Slider";
import ProtectedRoute from "./components/ProtectedRoute";
import CartDrawer from "./pages/CartDrawer";

import Home from "./pages/Home";
import ShopPage from "./pages/ShopPage";
import CartPage from "./pages/CartPage";
import Checkout from "./pages/Checkout";
import OrdersPage from "./pages/OrdersPage";
import ClientAuth from "./pages/ClientAuth";
import WishlistPage from "./pages/WishlistPage";
import ProductDetail from "./pages/ProductDetail";
import TastingList from "./pages/TastingList";
import ContactPage from "./pages/ContactPage";
import Confirmation from "./pages/Confirmation";
import ProductsByCategory from "./pages/ProductsByCategory";
import Welcome from "./pages/Welcome";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./styles/Cart.css";

function App() {
  const navigate = useNavigate();
  const location = useLocation();

  const [cart, setCart] = useState(() => JSON.parse(localStorage.getItem("cart")) || []);
  const [wishlist, setWishlist] = useState(() => JSON.parse(localStorage.getItem("wishlist")) || []);
  const [compareList, setCompareList] = useState(() => JSON.parse(localStorage.getItem("compareList")) || []);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => { localStorage.setItem("cart", JSON.stringify(cart)); }, [cart]);
  useEffect(() => { localStorage.setItem("wishlist", JSON.stringify(wishlist)); }, [wishlist]);
  useEffect(() => { localStorage.setItem("compareList", JSON.stringify(compareList)); }, [compareList]);

  const notifyAddCart = (name) => toast.success(`✅ ${name} ajouté au panier !`);
  const notifyAddWishlist = (name) => toast.info(`❤️ ${name} ajouté à la wishlist !`);
  const notifyRemoveWishlist = (name) => toast.info(`❌ ${name} retiré de la wishlist !`);
  const notifyAddCompare = (name) => toast.info(`⚖️ ${name} ajouté à la comparaison !`);

  const handleAddToCart = (product) => { setCart(prev => [...prev, product]); notifyAddCart(product.name); setIsCartOpen(true); };

  const handleToggleWishlist = (product) => {
    if (wishlist.find(item => item._id === product._id)) {
      setWishlist(prev => prev.filter(item => item._id !== product._id));
      notifyRemoveWishlist(product.name);
    } else {
      setWishlist(prev => [...prev, product]);
      notifyAddWishlist(product.name);
    }
  };

  const handleAddToCompare = (product) => {
    if (!compareList.find(item => item._id === product._id)) {
      setCompareList(prev => [...prev, product]);
      notifyAddCompare(product.name);
    }
  };

  const openQuickView = (product) => {
    alert(`Quick View: ${product.name}`); // ici tu peux mettre modal si tu veux
  };

  return (
    <>
      <Navbar cart={cart} wishlist={wishlist} onCartClick={() => setIsCartOpen(true)} />
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} cartItems={cart} />
      {location.pathname === "/" && <Slider />}

      <Routes>
        <Route path="/" element={
          <Home
            onAddToCart={handleAddToCart}
            wishlist={wishlist}
            compareList={compareList}
            onToggleWishlist={handleToggleWishlist}
            onAddToCompare={handleAddToCompare}
          />
        } />

        <Route path="/login" element={<ClientAuth />} />
        <Route path="/bienvenue" element={
       <ProtectedRoute>
         <Welcome />
        </ProtectedRoute>
        } />

        <Route path="/produits" element={
          <ShopPage
            onAddToCart={handleAddToCart}
            wishlist={wishlist}
            onToggleWishlist={handleToggleWishlist}
            onAddToCompare={handleAddToCompare}
            openQuickView={openQuickView}
          />
        } />

<Route path="/produits/:category" element={
  <ProductsByCategory
    onAddToCart={handleAddToCart}
    wishlist={wishlist}
    onToggleWishlist={handleToggleWishlist}
    onAddToCompare={handleAddToCompare}
    openQuickView={openQuickView} // <-- important
  />
} />


        <Route path="/produits/detail/:id" element={
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

        <Route path="/cart" element={<CartPage cart={cart} setCart={setCart} />} />
        <Route path="/checkout" element={<Checkout cart={cart} setCart={setCart} />} />
        <Route path="/confirmation" element={<Confirmation />} />
        <Route path="/wishlist" element={
        <WishlistPage wishlist={wishlist} setWishlist={setWishlist} />} />
        <Route path="/commandes" element={<ProtectedRoute><OrdersPage /></ProtectedRoute>} />
        <Route path="/dégustation" element={<TastingList />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>

      <ToastContainer position="bottom-right" autoClose={3000} />
    </>
  );
}

export default App;
