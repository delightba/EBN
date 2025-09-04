import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { useFavorites } from '../../context/FavoritesContext';
import { FaFacebookF, FaTwitter, FaInstagram, FaPinterestP, FaRedditAlien, FaYoutube, FaSearch, FaPhoneAlt } from 'react-icons/fa';
import './Navbar.css';

// SVG Icons
const HeartIcon = () => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
    className="nav-icon"
  >
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
  </svg>
);

const CartIcon = () => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
    className="nav-icon"
  >
    <circle cx="9" cy="21" r="1"></circle>
    <circle cx="20" cy="21" r="1"></circle>
    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
  </svg>
);

const UserIcon = () => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
    className="nav-icon"
  >
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
    <circle cx="12" cy="7" r="4"></circle>
  </svg>
);

const Navbar = () => {
  const { user, logout } = useAuth();
  const { getCartItemsCount } = useCart();
  const { getFavoritesCount } = useFavorites();
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const userDropdownRef = useRef(null);

  // Handle click outside to close dropdowns
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userDropdownRef.current && !userDropdownRef.current.contains(event.target)) {
        setShowUserDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

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
    return <UserIcon />;
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
              <img src="/images/logo.png" alt="logo" />
            </Link>
            
            <div className="search-bar">
              <input type="text" placeholder="Search for products..." />
              <button>
                <FaSearch />
              </button>
            </div>
            
            <div className="navbar-middle-actions">
              <Link to="/favorites" className="action-icon">
                <HeartIcon />
                <span className="count-badge">{getFavoritesCount()}</span>
              </Link>
              
              <Link to="/cart" className="action-icon">
                <CartIcon />
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
                  <UserIcon />
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

export default Navbar