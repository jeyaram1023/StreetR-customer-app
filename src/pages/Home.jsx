// src/pages/Home.jsx
import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import FoodCard from '../components/FoodCard';
import { FaFire, FaStar, FaHeart } from 'react-icons/fa';

const Home = ({ addToCart }) => {
  const [popularItems, setPopularItems] = useState([]);
  const [allItems, setAllItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulating API call to fetch food items
    setTimeout(() => {
      const mockPopularItems = [
        {
          id: 1,
          name: 'Masala Dosa',
          description: 'Crispy crepe with spiced potato filling',
          price: 65,
          likes: 128,
          image: 'dosa',
          isLiked: false
        },
        {
          id: 2,
          name: 'Vada Pav',
          description: 'Spicy potato fritter sandwiched in a bun',
          price: 30,
          likes: 95,
          image: 'vadapav',
          isLiked: true
        },
        {
          id: 3,
          name: 'Pani Puri',
          description: 'Crispy hollow puri filled with spicy water',
          price: 40,
          likes: 142,
          image: 'panipuri',
          isLiked: false
        }
      ];
      
      const mockAllItems = [
        ...mockPopularItems,
        {
          id: 4,
          name: 'Samosa',
          description: 'Fried pastry with spiced potato filling',
          price: 25,
          likes: 87,
          image: 'samosa',
          isLiked: false
        },
        {
          id: 5,
          name: 'Chole Bhature',
          description: 'Spicy chickpeas with fried bread',
          price: 80,
          likes: 76,
          image: 'chole',
          isLiked: true
        },
        {
          id: 6,
          name: 'Idli Sambar',
          description: 'Steamed rice cakes with lentil stew',
          price: 50,
          likes: 64,
          image: 'idli',
          isLiked: false
        },
        {
          id: 7,
          name: 'Biryani',
          description: 'Fragrant rice dish with vegetables',
          price: 120,
          likes: 112,
          image: 'biryani',
          isLiked: true
        },
        {
          id: 8,
          name: 'Jalebi',
          description: 'Crispy sweet pretzel soaked in syrup',
          price: 45,
          likes: 53,
          image: 'jalebi',
          isLiked: false
        }
      ];
      
      setPopularItems(mockPopularItems);
      setAllItems(mockAllItems);
      setLoading(false);
    }, 800);
  }, []);

  const toggleLike = (itemId) => {
    setPopularItems(prev => 
      prev.map(item => 
        item.id === itemId ? { ...item, isLiked: !item.isLiked, likes: item.isLiked ? item.likes - 1 : item.likes + 1 } : item
      )
    );
    
    setAllItems(prev => 
      prev.map(item => 
        item.id === itemId ? { ...item, isLiked: !item.isLiked, likes: item.isLiked ? item.likes - 1 : item.likes + 1 } : item
      )
    );
  };

  if (loading) {
    return (
      <div className="page">
        <Header />
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Loading delicious food...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <Header />
      <main className="home-content">
        <section className="popular-section">
          <div className="section-header">
            <FaFire className="section-icon" />
            <h3>Popular Items</h3>
          </div>
          <div className="popular-items">
            {popularItems.map(item => (
              <div key={item.id} className="popular-item">
                <div className="popular-image">
                  <div className={`food-img ${item.image}`}></div>
                  <button 
                    className={`like-btn ${item.isLiked ? 'liked' : ''}`}
                    onClick={() => toggleLike(item.id)}
                  >
                    <FaHeart />
                  </button>
                </div>
                <div className="popular-info">
                  <h4>{item.name}</h4>
                  <p>{item.description}</p>
                  <div className="price-like">
                    <span>₹{item.price}</span>
                    <div className="likes-count">
                      <FaHeart />
                      <span>{item.likes}</span>
                    </div>
                  </div>
                  <button 
                    className="add-to-cart-btn"
                    onClick={() => addToCart(item)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
        
        <section className="all-items-section">
          <div className="section-header">
            <FaStar className="section-icon" />
            <h3>All Available Items</h3>
          </div>
          <div className="all-items-grid">
            {allItems.map(item => (
              <FoodCard 
                key={item.id} 
                item={item} 
                onLike={() => toggleLike(item.id)}
                onAddToCart={() => addToCart(item)}
              />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;
