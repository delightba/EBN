// src/pages/Home/Home.jsx
import React, { useState, useRef, useEffect } from 'react';
import './Home.css';

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedBrand, setSelectedBrand] = useState('All');
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const dropdownRef = useRef(null);

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowCategoryDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const categories = [
    {
      name: "Computer & Laptop",
      subcategories: ["Laptops", "Desktops", "Monitors", "Components"]
    },
    {
      name: "SmartPhone",
      subcategories: ["iPhone", "Samsung", "Xiaomi", "Oppo", "Vivo", "Realme", "OnePlus"]
    },
    "Computer Accessories",
    "Headset",
    "Mobile Accessories",
    "Gaming Console",
    "Camera & Photo",
    "TV & Home Appliances",
    "Watch & Accessories",
    "GPS & Navigation",
    "Wearable Technologies"
  ];

  const brands = [
    "All", "iPhone", "Samsung", "Realme", "Xiaomi", 
    "Oppo", "Vivo", "OnePlus", "Huawei", "Infinix"
  ];

  const featuredProducts = [
    {
      id: 1,
      name: "Samsung Galaxy S21 5G",
      brand: "Samsung Electronics",
      price: 160,
      image: "/images/samsung-s21.jpg"
    },
    {
      id: 2,
      name: "Simple Mobile 5G LTE Galaxy 12 Mini 512GB Gaming Phone",
      brand: "Samsung",
      price: 1500,
      image: "/images/galaxy-gaming.jpg"
    },
    {
      id: 3,
      name: "Sony DSCILYS High Zoom Camera",
      brand: "Sony",
      price: 899,
      image: "/images/sony-camera.jpg"
    }
  ];

  const toggleDropdown = () => {
    setShowCategoryDropdown(!showCategoryDropdown);
  };

  return (
    <div className="home-page">
      {/* Hero Section with Categories */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-content">
            {/* Category Sidebar */}
            <div className="category-sidebar" ref={dropdownRef}>
              <div className="category-toggle" onClick={toggleDropdown}>
                <span>All Categories</span>
                <span className="dropdown-arrow">{showCategoryDropdown ? '▲' : '▼'}</span>
              </div>
              
              {showCategoryDropdown && (
                <div className="category-dropdown">
                  <ul>
                    {categories.map((category, index) => (
                      <li key={index}>
                        {typeof category === 'object' ? (
                          <div className="has-subcategory">
                            <span>{category.name}</span>
                            <span className="subcategory-arrow">›</span>
                            <ul className="subcategory-list">
                              {category.subcategories.map((subcat, subIndex) => (
                                <li key={subIndex}>{subcat}</li>
                              ))}
                            </ul>
                          </div>
                        ) : (
                          <span>{category}</span>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Main Hero Content */}
            <section className="hero-section">
  <div className="container">
    <div className="hero-grid">
      {/* Left: Main Promo */}
      <div className="hero-main-banner">
        <div className="banner-content">
          <span className="tagline">THE BEST PLACE TO PLAY</span>
          <h2>Xbox Consoles</h2>
          <p>Save up to 50% on select Xbox games. Get 3 months of PC Game Pass for $2 USD.</p>
          <button className="shop-btn">SHOP NOW →</button>
        </div>
        <div className="banner-image">
          <img src="/images/xbox.jpg" alt="Xbox Console" />
          <div className="price-badge">$299</div>
        </div>
      </div>

      {/* Right: Side Promos */}
      <div className="hero-side-banners">
        <div className="side-banner dark">
          <span className="sale-badge">SUMMER SALES</span>
          <h3>New Google Pixel 6 Pro</h3>
          <button className="shop-btn small">SHOP NOW →</button>
          <img src="/images/pixel6.jpg" alt="Google Pixel 6 Pro" />
          <div className="discount-tag">29% OFF</div>
        </div>

        <div className="side-banner light">
          <h3>Xiaomi FlipBuds Pro</h3>
          <p>$299 USD</p>
          <button className="shop-btn small">SHOP NOW →</button>
          <img src="/images/flipbuds.jpg" alt="Xiaomi FlipBuds Pro" />
        </div>
      </div>
    </div>
  </div>
</section>


            {/* Login Panel */}
            {/* <div className="login-panel">
              <h3>Log in or create account</h3>
              <button className="google-login-btn">
                Continue with Google
              </button>
              <div className="phone-login">
                <span>+09-13</span>
              </div>
            </div> */}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="featured-section">
        <div className="container">
          <h2 className="section-title">FEATURED PHONES</h2>
          <div className="products-grid">
            {featuredProducts.map(product => (
              <div key={product.id} className="product-card">
                <div className="product-image">
                  <img src={product.image} alt={product.name} />
                </div>
                <div className="product-info">
                  <p className="product-brand">{product.brand}</p>
                  <h3 className="product-name">{product.name}</h3>
                  <p className="product-price">${product.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;