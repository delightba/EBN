import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { useFavorites } from '../../context/FavoritesContext';
import { FaFacebookF, FaTwitter, FaInstagram, FaPinterestP, FaRedditAlien, FaYoutube, FaGlobe, FaMoneyBillWave, FaSearch, FaHeart, FaShoppingCart, FaUser, FaPhoneAlt } from 'react-icons/fa';
import './Navbar.css';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { getCartItemsCount } = useCart();
  const { getFavoritesCount } = useFavorites();
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const categoryDropdownRef = useRef(null);
  const userDropdownRef = useRef(null);

  // Handle click outside to close dropdowns
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (categoryDropdownRef.current && !categoryDropdownRef.current.contains(event.target)) {
        setShowCategoryDropdown(false);
      }
      if (userDropdownRef.current && !userDropdownRef.current.contains(event.target)) {
        setShowUserDropdown(false);
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

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'fr', name: 'French' },
    { code: 'es', name: 'Spanish' },
    { code: 'de', name: 'German' },
    { code: 'pt', name: 'Portuguese' },
    { code: 'zh', name: 'Chinese' },
    { code: 'ar', name: 'Arabic' }
  ];

  const handleLogout = () => {
    logout();
    setShowUserDropdown(false);
  };

  const toggleCategoryDropdown = () => {
    setShowCategoryDropdown(!showCategoryDropdown);
  };

  const toggleUserDropdown = () => {
    setShowUserDropdown(!showUserDropdown);
  };

  // Get user avatar or generate one from initials
  const getUserAvatar = () => {
    if (user && user.avatar) {
      return <img src={user.avatar} alt="Profile" className="user-avatar" />;
    } else if (user && user.name) {
      const initials = user.name.split(' ').map(n => n[0]).join('').toUpperCase();
      return <div className="avatar-initials">{initials}</div>;
    }
    return <div className="avatar-initials">?</div>;
  };

  return (
    <>
      {/* First Layer */}
      <div className="navbar-top">
        <div className="container">
          <div className="navbar-top-content">
            <div className="welcome-text">
              Welcome to Electronic Bidding Nigeria eCommerce Store.
            </div>
            <div className="navbar-top-right">
              <div className="follow-us">
                <span>Follow us:</span>
                <div className="social-icons">
                  <a href="#" title="Facebook"><FaFacebookF /></a>
                  <a href="#" title="Twitter"><FaTwitter /></a>
                  <a href="#" title="Instagram"><FaInstagram /></a>
                  <a href="#" title="Pinterest"><FaPinterestP /></a>
                  <a href="#" title="Reddit"><FaRedditAlien /></a>
                  <a href="#" title="YouTube"><FaYoutube /></a>
                </div>
              </div>
              
              <div className="language-flag-container">
                <div className="nigeria-flag">
                  <img src="/images/nigeria-flag.png" alt="Nigeria Flag" />
                </div>
                
                <div className="language-selector-wrapper">
                  <select className="language-selector">
                    {languages.map(lang => (
                      <option key={lang.code} value={lang.code}>{lang.name}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Separator line */}
        <div className="layer-separator"></div>
      </div>

      {/* Second Layer */}
      <div className="navbar-middle">
        <div className="container">
          <div className="navbar-middle-content">
            <Link to="/" className="navbar-brand">
              EBN
            </Link>
            
            <div className="search-bar">
              <input type="text" placeholder="Search for products..." />
              <button>
                <FaSearch />
              </button>
            </div>
            
            <div className="navbar-middle-actions">
              <Link to="/favorites" className="action-icon">
                <FaHeart />
                <span className="count-badge">{getFavoritesCount()}</span>
              </Link>
              
              <Link to="/cart" className="action-icon">
                <FaShoppingCart />
                <span className="count-badge">{getCartItemsCount()}</span>
              </Link>
              
              {user ? (
                <div className="user-menu" ref={userDropdownRef}>
                  <div className="user-profile" onClick={toggleUserDropdown}>
                    {getUserAvatar()}
                    <span className="user-name">Welcome, {user.name}</span>
                    <span className="dropdown-arrow">
                      {showUserDropdown ? '▲' : '▼'}
                    </span>
                  </div>
                </div>
              ) : (
                <Link to="/login" className="action-icon">
                  <FaUser />
                </Link>
              )}
            </div>
          </div>
        </div>
        {/* Separator line */}
        <div className="layer-separator"></div>
      </div>

      {/* Third Layer */}
      <nav className="navbar-bottom">
        <div className="container">
          <div className="navbar-bottom-content">
            <div className="navbar-nav">
              {/* All Categories Dropdown */}
              <div 
                className="category-nav-item" 
                ref={categoryDropdownRef}
                onClick={toggleCategoryDropdown}
              >
                <span>All Categories</span>
                <span className="dropdown-arrow">
                  {showCategoryDropdown ? '▲' : '▼'}
                </span>
                
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
              <Link to="/">Home</Link>
              <Link to="/products">Products</Link>
              <Link to="/bidding">Bidding</Link>
              <Link to="/vendors">Vendors</Link>
            </div>
            
            <div className="navbar-contact">
              <FaPhoneAlt className="phone-icon" />
              <span>+234 123 456 7890</span>
            </div>
          </div>
        </div>
      </nav>

      {/* User Dropdown (if open) */}
      {showUserDropdown && (
        <div className="user-dropdown-overlay" onClick={() => setShowUserDropdown(false)}>
          <div className="user-dropdown-container" ref={userDropdownRef} onClick={e => e.stopPropagation()}>
            <div className="user-dropdown">
              <Link to="/profile" onClick={() => setShowUserDropdown(false)}>
                View Profile
              </Link>
              {user.role === 'vendor' ? (
                <Link to="/vendor-dashboard" onClick={() => setShowUserDropdown(false)}>
                  Vendor Dashboard
                </Link>
              ) : (
                <Link to="/user-dashboard" onClick={() => setShowUserDropdown(false)}>
                  User Dashboard
                </Link>
              )}
              <Link to="/orders" onClick={() => setShowUserDropdown(false)}>
                My Orders
              </Link>
              <Link to="/settings" onClick={() => setShowUserDropdown(false)}>
                Settings
              </Link>
              <button onClick={handleLogout}>Logout</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;