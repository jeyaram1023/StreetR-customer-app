// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import './App.css';

// Components
import Login from './pages/Login';
import OTP from './pages/OTP';
import MobileVerification from './pages/MobileVerification';
import ProfileSetup from './pages/ProfileSetup';
import Home from './pages/Home';
import ItemDetail from './pages/ItemDetail';
import Search from './pages/Search';
import Cart from './pages/Cart';
import Orders from './pages/Orders';
import More from './pages/More';
import Profile from './pages/Profile';
import BottomNav from './components/BottomNav';

function App() {
  const [user, setUser] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    // Check if user is already authenticated
    const storedUser = localStorage.getItem('streetr_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    
    // Load cart from localStorage
    const storedCart = localStorage.getItem('streetr_cart');
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
    
    // Load profile from localStorage
    const storedProfile = localStorage.getItem('streetr_profile');
    if (storedProfile) {
      setProfile(JSON.parse(storedProfile));
    }
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem('streetr_user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('streetr_user');
  };

  const updateProfile = (profileData) => {
    setProfile(profileData);
    localStorage.setItem('streetr_profile', JSON.stringify(profileData));
  };

  const addToCart = (item) => {
    const existingItem = cartItems.find(cartItem => cartItem.id === item.id);
    
    if (existingItem) {
      const updatedCart = cartItems.map(cartItem => 
        cartItem.id === item.id 
          ? { ...cartItem, quantity: cartItem.quantity + 1 } 
          : cartItem
      );
      setCartItems(updatedCart);
      localStorage.setItem('streetr_cart', JSON.stringify(updatedCart));
    } else {
      const updatedCart = [...cartItems, { ...item, quantity: 1 }];
      setCartItems(updatedCart);
      localStorage.setItem('streetr_cart', JSON.stringify(updatedCart));
    }
  };

  const removeFromCart = (itemId) => {
    const updatedCart = cartItems.filter(item => item.id !== itemId);
    setCartItems(updatedCart);
    localStorage.setItem('streetr_cart', JSON.stringify(updatedCart));
  };

  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity < 1) return;
    
    const updatedCart = cartItems.map(item => 
      item.id === itemId ? { ...item, quantity: newQuantity } : item
    );
    
    setCartItems(updatedCart);
    localStorage.setItem('streetr_cart', JSON.stringify(updatedCart));
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem('streetr_cart');
  };

  // Wrapper component to conditionally show BottomNav
  const Layout = () => {
    const location = useLocation();
    const hideNavOn = ['/login', '/otp', '/mobile-verification', '/profile-setup'];
    const showBottomNav = !hideNavOn.includes(location.pathname);
    
    return (
      <div className="app-container">
        <Routes>
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/otp" element={<OTP onVerify={handleLogin} />} />
          <Route path="/mobile-verification" element={<MobileVerification />} />
          <Route path="/profile-setup" element={<ProfileSetup onComplete={updateProfile} />} />
          <Route path="/" element={<Home addToCart={addToCart} />} />
          <Route path="/item/:id" element={<ItemDetail addToCart={addToCart} />} />
          <Route path="/search" element={<Search addToCart={addToCart} />} />
          <Route path="/cart" element={<Cart 
            cartItems={cartItems} 
            removeFromCart={removeFromCart} 
            updateQuantity={updateQuantity}
            clearCart={clearCart}
          />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/more" element={<More />} />
          <Route path="/profile" element={<Profile 
            profile={profile} 
            updateProfile={updateProfile}
            onLogout={handleLogout} 
          />} />
        </Routes>
        {showBottomNav && <BottomNav />}
      </div>
    );
  };

  return (
    <Router>
      <Layout />
    </Router>
  );
}

export default App;
