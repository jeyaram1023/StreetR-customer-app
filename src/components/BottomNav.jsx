// src/components/BottomNav.jsx
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { FaHome, FaClipboardList, FaShoppingCart, FaEllipsisH, FaUser } from 'react-icons/fa';

const BottomNav = () => {
  const location = useLocation();
  
  // Don't show bottom nav on these routes
  if (['/login', '/otp', '/mobile-verification', '/profile-setup'].includes(location.pathname)) {
    return null;
  }
  
  return (
    <nav className="bottom-nav">
      <NavLink to="/" className="nav-item" activeClassName="active">
        <FaHome className="nav-icon" />
        <span>Home</span>
      </NavLink>
      <NavLink to="/orders" className="nav-item" activeClassName="active">
        <FaClipboardList className="nav-icon" />
        <span>Orders</span>
      </NavLink>
      <NavLink to="/cart" className="nav-item" activeClassName="active">
        <div className="cart-indicator">
          <FaShoppingCart className="nav-icon" />
        </div>
        <span>Cart</span>
      </NavLink>
      <NavLink to="/more" className="nav-item" activeClassName="active">
        <FaEllipsisH className="nav-icon" />
        <span>More</span>
      </NavLink>
      <NavLink to="/profile" className="nav-item" activeClassName="active">
        <FaUser className="nav-icon" />
        <span>Profile</span>
      </NavLink>
    </nav>
  );
};

export default BottomNav;
