// src/pages/Products/Products.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Products.css';

const Products = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Sample categories data
  const categories = [
    { id: 'all', name: 'All Categories' },
    { id: 'electronics', name: 'Electronics' },
    { id: 'phones', name: 'Smartphones & Tablets' },
    { id: 'laptops', name: 'Laptops & Computers' },
    { id: 'cameras', name: 'Cameras & Photography' },
    { id: 'audio', name: 'Audio & Headphones' },
    { id: 'wearables', name: 'Wearable Technology' },
    { id: 'gaming', name: 'Gaming Consoles' },
    { id: 'accessories', name: 'Accessories' },
    { id: 'home', name: 'Home Appliances' }
  ];

  // Sample products data
  const allProducts = [
    {
      id: 1,
      name: "Samsung Galaxy S23 Ultra",
      price: 1199.99,
      category: "phones",
      image: "/images/samsung-s23.jpg",
      rating: 4.8,
      reviews: 142
    },
    {
      id: 2,
      name: "iPhone 15 Pro Max",
      price: 1299.99,
      category: "phones",
      image: "/images/iphone-15.jpg",
      rating: 4.9,
      reviews: 205
    },
    {
      id: 3,
      name: "MacBook Pro 16-inch",
      price: 2499.99,
      category: "laptops",
      image: "/images/macbook-pro.jpg",
      rating: 4.7,
      reviews: 89
    },
    {
      id: 4,
      name: "Sony WH-1000XM5 Headphones",
      price: 349.99,
      category: "audio",
      image: "/images/sony-headphones.jpg",
      rating: 4.8,
      reviews: 167
    },
    {
      id: 5,
      name: "Canon EOS R5 Camera",
      price: 3899.99,
      category: "cameras",
      image: "/images/canon-eos.jpg",
      rating: 4.9,
      reviews: 74
    },
    {
      id: 6,
      name: "PlayStation 5",
      price: 499.99,
      category: "gaming",
      image: "/images/ps5.jpg",
      rating: 4.7,
      reviews: 231
    },
    {
      id: 7,
      name: "Apple Watch Series 8",
      price: 399.99,
      category: "wearables",
      image: "/images/apple-watch.jpg",
      rating: 4.6,
      reviews: 118
    },
    {
      id: 8,
      name: "Dell XPS 13 Laptop",
      price: 1299.99,
      category: "laptops",
      image: "/images/dell-xps.jpg",
      rating: 4.5,
      reviews: 96
    }
  ];

  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
      if (selectedCategory === 'all') {
        setProducts(allProducts);
      } else {
        setProducts(allProducts.filter(product => product.category === selectedCategory));
      }
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [selectedCategory]);

  const handleCategoryClick = (categoryId) => {
    setLoading(true);
    setSelectedCategory(categoryId);
  };

  if (loading) {
    return (
      <div className="products-page">
        <div className="container">
          <div className="loading-spinner">Loading products...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="products-page">
      <div className="container">
        <div className="products-header">
          <h1>Products</h1>
          <p>Browse our wide selection of products</p>
        </div>

        <div className="products-content">
          {/* Categories Sidebar */}
          <div className="categories-sidebar">
            <h3>Categories</h3>
            <ul className="categories-list">
              {categories.map(category => (
                <li key={category.id}>
                  <button
                    className={selectedCategory === category.id ? 'active' : ''}
                    onClick={() => handleCategoryClick(category.id)}
                  >
                    {category.name}
                  </button>
                </li>
              ))}
            </ul>

            {/* Filter Section */}
            <div className="filter-section">
              <h4>Price Range</h4>
              <div className="price-filter">
                <input type="range" min="0" max="5000" step="100" />
                <div className="price-values">
                  <span>$0</span>
                  <span>$5000</span>
                </div>
              </div>

              <h4>Brand</h4>
              <div className="brand-filter">
                <label>
                  <input type="checkbox" /> Samsung
                </label>
                <label>
                  <input type="checkbox" /> Apple
                </label>
                <label>
                  <input type="checkbox" /> Sony
                </label>
                <label>
                  <input type="checkbox" /> Dell
                </label>
                <label>
                  <input type="checkbox" /> Canon
                </label>
              </div>

              <button className="apply-filters-btn">Apply Filters</button>
            </div>
          </div>

          {/* Products Grid */}
          <div className="products-main">
            <div className="products-topbar">
              <div className="results-count">
                Showing {products.length} products
              </div>
              <div className="sort-options">
                <select>
                  <option>Sort by: Recommended</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Highest Rated</option>
                  <option>Newest First</option>
                </select>
              </div>
            </div>

            {products.length === 0 ? (
              <div className="no-products">
                <h3>No products found in this category</h3>
                <p>Try selecting a different category or adjusting your filters</p>
              </div>
            ) : (
              <div className="products-grid">
                {products.map(product => (
                  <div key={product.id} className="product-card">
                    <Link to={`/products/${product.id}`} className="product-link">
                      <div className="product-image">
                        <img src={product.image} alt={product.name} />
                        <button className="wishlist-btn">♥</button>
                      </div>
                      <div className="product-info">
                        <h3 className="product-name">{product.name}</h3>
                        <div className="product-rating">
                          <span className="stars">★★★★★</span>
                          <span className="rating-count">({product.reviews})</span>
                        </div>
                        <p className="product-price">${product.price.toFixed(2)}</p>
                      </div>
                    </Link>
                    <button className="add-to-cart-btn">Add to Cart</button>
                  </div>
                ))}
              </div>
            )}

            {/* Pagination */}
            {products.length > 0 && (
              <div className="pagination">
                <button className="prev-btn">Previous</button>
                <span className="page-numbers">
                  <button className="active">1</button>
                  <button>2</button>
                  <button>3</button>
                  <span>...</span>
                  <button>10</button>
                </span>
                <button className="next-btn">Next</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;