// src/components/Header.jsx
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaSearch, FaArrowLeft, FaQrcode } from 'react-icons/fa';

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const getTitle = () => {
    switch(location.pathname) {
      case '/': return 'StreetR';
      case '/orders': return 'My Orders';
      case '/cart': return 'My Cart';
      case '/more': return 'More Options';
      case '/profile': return 'My Profile';
      case '/search': return 'Search';
      default: 
        if (location.pathname.startsWith('/item/')) return 'Item Details';
        return 'StreetR';
    }
  };
  
  const isHome = location.pathname === '/';
  
  return (
    <header className="app-header">
      <div className="header-content">
        {!isHome ? (
          <button className="back-btn" onClick={() => navigate(-1)}>
            <FaArrowLeft />
          </button>
        ) : (
          <div className="header-logo">
            <div className="logo-circle">SR</div>
            <h1>StreetR</h1>
          </div>
        )}
        
        <h2 className="header-title">{getTitle()}</h2>
        
        <div className="header-actions">
          {location.pathname !== '/search' && (
            <button className="search-btn" onClick={() => navigate('/search')}>
              <FaSearch />
            </button>
          )}
          {isHome && (
            <button className="qr-btn" onClick={() => navigate('/search')}>
              <FaQrcode />
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
