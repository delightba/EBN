// src/pages/Home/Home.jsx
import React, { useState, useRef, useEffect } from "react";
import {
  FaTruck,
  FaTrophy,
  FaCreditCard,
  FaHeadphones,
  FaStar,
  FaHeart,
  FaShoppingCart,
  FaEye,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import "./Home.css";

const Home = () => {
  // State for API data
  const [carouselData, setCarouselData] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [bestDeals, setBestDeals] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [timeLeft, setTimeLeft] = useState({
    days: 16,
    hours: 21,
    minutes: 57,
    seconds: 23,
  });

  // UI state
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedBrand, setSelectedBrand] = useState("All");
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [wishlist, setWishlist] = useState([]);
  const [cart, setCart] = useState([]);
  const dropdownRef = useRef(null);

  // Carousel refs
  const categoriesCarouselRef = useRef(null);
  const [categoriesPosition, setCategoriesPosition] = useState(0);

  // Mock data (to be replaced with API calls)
  const mockCarouselData = [
    {
      id: 1,
      image: "/images/banner.png",
      tagline: "- THE BEST PLACE TO PLAY",
      title: "Xbox Consoles",
      description:
        "Save up to 50% on select Xbox games. Get 3 months of PC Game Pass for $2 USD.",
      price: "$299",
      buttonText: "SHOP NOW →",
      link: "/products/xbox",
    },
    {
      id: 2,
      image: "/images/headset.png",
      tagline: "- PREMIUM AUDIO EXPERIENCE",
      title: "Sony Headphones",
      description:
        "Experience crystal clear sound with noise cancellation technology.",
      price: "$199",
      buttonText: "BUY NOW →",
      link: "/products/headphones",
    },
    {
      id: 3,
      image: "/images/ps5.png",
      tagline: "- NEXT GENERATION GAMING",
      title: "PlayStation 5",
      description:
        "Immerse yourself in stunning graphics and lightning-fast loading.",
      price: "$499",
      buttonText: "SHOP NOW →",
      link: "/products/ps5",
    },
  ];

  const mockFeaturedProducts = [
    {
      id: 1,
      name: "Samsung Galaxy S21 5G",
      brand: "Samsung Electronics",
      price: 160,
      originalPrice: 200,
      discount: 20,
      image: "/images/samsung-s21.jpg",
      rating: 4.5,
      reviews: 128,
      category: "SmartPhone",
      isHot: true,
    },
    {
      id: 2,
      name: "Simple Mobile 5G LTE Galaxy 12 Mini 512GB Gaming Phone",
      brand: "Samsung",
      price: 1500,
      originalPrice: 1800,
      discount: 17,
      image: "/images/galaxy-gaming.jpg",
      rating: 4.8,
      reviews: 64,
      category: "SmartPhone",
      isNew: true,
    },
    {
      id: 3,
      name: "Sony DSCILYS High Zoom Camera",
      brand: "Sony",
      price: 899,
      originalPrice: 1200,
      discount: 25,
      image: "/images/sony-camera.jpg",
      rating: 4.3,
      reviews: 89,
      category: "Camera",
      isTrending: true,
    },
  ];

  const mockBestDeals = [
    {
      id: 1,
      name: "Bose Sport Earbuds - Wireless Earphones",
      brand: "Bose",
      price: 2300,
      originalPrice: 3200,
      discount: 32,
      image: "/images/bose-earbuds.jpg",
      rating: 4.7,
      reviews: 215,
      category: "Audio",
      isHot: true,
      stock: 15,
    },
    {
      id: 2,
      name: "Simple Mobile 4G LTE Prepaid Smartphone",
      brand: "Simple Mobile",
      price: 220,
      originalPrice: 300,
      discount: 27,
      image: "/images/simple-mobile.jpg",
      rating: 4.2,
      reviews: 89,
      category: "SmartPhone",
      isNew: true,
    },
    {
      id: 3,
      name: "Portable Washing Machine, 1lbs capacity",
      brand: "Model 1BNMFIAM",
      price: 70,
      originalPrice: 865.99,
      discount: 92,
      image: "/images/washing-machine.jpg",
      rating: 4.0,
      reviews: 156,
      category: "Appliances",
      isTrending: true,
    },
    {
      id: 4,
      name: "Xbox Series S - 512GB SSD Console",
      brand: "Microsoft",
      price: 442.12,
      originalPrice: 865.99,
      discount: 49,
      image: "/images/xbox-series-s.jpg",
      rating: 4.8,
      reviews: 342,
      category: "Gaming",
      description:
        "Games built using the Xbox Series X|S development kit showcase unparalleled load times, visuals.",
    },
    {
      id: 5,
      name: "4K UHD LED Smart TV with Chromecast Built-in",
      brand: "Samsung",
      price: 150,
      originalPrice: 865,
      discount: 83,
      image: "/images/smart-tv.jpg",
      rating: 4.6,
      reviews: 189,
      category: "TV",
      isHot: true,
    },
    {
      id: 6,
      name: "Sony DSCHX8 High Zoom Point & Shoot Camera",
      brand: "Sony",
      price: 1200,
      originalPrice: 1500,
      discount: 20,
      image: "/images/sony-camera-hx8.jpg",
      rating: 4.4,
      reviews: 76,
      category: "Camera",
    },
    {
      id: 7,
      name: "2-Barrel Carburetor Carb 2100 Engine",
      brand: "Performance Parts",
      price: 160,
      originalPrice: 200,
      discount: 20,
      image: "/images/carburetor.jpg",
      rating: 4.1,
      reviews: 43,
      category: "Auto Parts",
      isNew: true,
    },
    {
      id: 8,
      name: "JBL FLIP 4 - Waterproof Portable Bluetooth Speaker",
      brand: "JBL",
      price: 250,
      originalPrice: 360,
      discount: 31,
      image: "/images/jbl-flip4.jpg",
      rating: 4.7,
      reviews: 267,
      category: "Audio",
      isTrending: true,
    },
  ];

  const mockCategories = [
    {
      id: 1,
      name: "Computer & Laptop",
      image: "/images/computers.jpg",
    },
    {
      id: 2,
      name: "SmartPhone",
      image: "/images/smartphones.jpg",
    },
    {
      id: 3,
      name: "Headphones",
      image: "/images/headphones.jpg",
    },
    {
      id: 4,
      name: "Accessories",
      image: "/images/accessories.jpg",
    },
    {
      id: 5,
      name: "Camera & Photo",
      image: "/images/cameras.jpg",
    },
    {
      id: 6,
      name: "TV & Homes",
      image: "/images/tv.jpg",
    },
    {
      id: 7,
      name: "Gaming",
      image: "/images/gaming.jpg",
    },
    {
      id: 8,
      name: "Wearables",
      image: "/images/wearables.jpg",
    },
  ];

  const mockBrands = [
    { id: 1, name: "All" },
    { id: 2, name: "iPhone" },
    { id: 3, name: "Samsung" },
  ];

  // Features data for the new table section
  const featuresData = [
    {
      id: 1,
      icon: <FaTruck />,
      title: "FASTED DELIVERY",
      subtitle: "Delivery in 24/H",
    },
    {
      id: 2,
      icon: <FaTrophy />,
      title: "24H EASY RETURN",
      subtitle: "100% money-back guarantee",
    },
    {
      id: 3,
      icon: <FaCreditCard />,
      title: "SECURE PAYMENT",
      subtitle: "Your money is safe",
    },
    {
      id: 4,
      icon: <FaHeadphones />,
      title: "SUPPORT 24/7",
      subtitle: "24/7 customer service",
    },
  ];

  // New product introduction data
  const newProductsIntro = [
    {
      id: 1,
      brand: "New Apple",
      name: "Homepod Mini",
      description: "HomePod mini delivers unexpectedly.",
      // price: "$99",
      buttonText: "SHOP NOW →",
      backgroundClass: "apple-bg",
      theme: "dark",
    },
    {
      id: 2,
      brand: "Xiaomi",
      name: "Mi 11 Ultra 12GB+256GB",
      description:
        "Data provided by internal laboratories.",
      // price: "$590",
      buttonText: "SHOP NOW →",
      backgroundClass: "xiaomi-bg",
      theme: "light",
    },
  ];

  // Countdown timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        const seconds = prev.seconds - 1;
        if (seconds >= 0) return { ...prev, seconds };

        const minutes = prev.minutes - 1;
        if (minutes >= 0) return { ...prev, minutes, seconds: 59 };

        const hours = prev.hours - 1;
        if (hours >= 0) return { ...prev, hours, minutes: 59, seconds: 59 };

        const days = prev.days - 1;
        if (days >= 0)
          return { ...prev, days, hours: 23, minutes: 59, seconds: 59 };

        clearInterval(timer);
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // API simulation (replace with actual API calls)
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        setTimeout(() => {
          setCarouselData(mockCarouselData);
          setFeaturedProducts(mockFeaturedProducts);
          setBestDeals(mockBestDeals);
          setCategories(mockCategories);
          setBrands(mockBrands);
          setLoading(false);
        }, 1000);
      } catch (err) {
        setError("Failed to load data. Please try again later.");
        setLoading(false);
        console.error("API Error:", err);
      }
    };

    fetchData();
  }, []);

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowCategoryDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Auto-advance carousel
  useEffect(() => {
    if (carouselData.length === 0) return;

    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % carouselData.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [carouselData.length]);

  // Handle wishlist toggle
  const toggleWishlist = (productId, e) => {
    e.stopPropagation();
    setWishlist((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  // Handle add to cart
  const addToCart = (productId, e) => {
    e.stopPropagation();
    setCart((prev) => {
      const existingItem = prev.find((item) => item.id === productId);
      if (existingItem) {
        return prev.map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { id: productId, quantity: 1 }];
    });
  };

  // Handle quick view
  const handleQuickView = (productId, e) => {
    e.stopPropagation();
    console.log("Quick view:", productId);
    // Will be replaced with modal opening logic
  };

  // Handle product click
  const handleProductClick = (productId) => {
    console.log("Product clicked:", productId);
    // Will be replaced with: navigate(`/product/${productId}`);
  };

  // Handle shop now click
  const handleShopNow = (link) => {
    console.log("Navigate to:", link);
    // Will be replaced with: navigate(link);
  };

  // Handle browse all products
  const handleBrowseAll = () => {
    console.log("Browse all products");
    // Will be replaced with: navigate('/products');
  };

  // Handle category click
  const handleCategoryClick = (categoryName) => {
    console.log("Category selected:", categoryName);
    // Will be replaced with: navigate(`/products?category=${categoryName}`);
  };

  // Go to specific slide
  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  // Categories carousel navigation functions
  const handleCategoriesNext = () => {
    if (categoriesCarouselRef.current) {
      const track = categoriesCarouselRef.current;
      const cardWidth = track.children[0].offsetWidth + 20; // width + gap
      const maxScroll = track.scrollWidth - track.offsetWidth;

      if (categoriesPosition > -maxScroll) {
        const newPosition = categoriesPosition - cardWidth * 2;
        setCategoriesPosition(Math.max(newPosition, -maxScroll));
        track.style.transform = `translateX(${Math.max(
          newPosition,
          -maxScroll
        )}px)`;
      }
    }
  };

  const handleCategoriesPrev = () => {
    if (categoriesCarouselRef.current) {
      const track = categoriesCarouselRef.current;
      const cardWidth = track.children[0].offsetWidth + 20; // width + gap

      if (categoriesPosition < 0) {
        const newPosition = categoriesPosition + cardWidth * 2;
        setCategoriesPosition(Math.min(newPosition, 0));
        track.style.transform = `translateX(${Math.min(newPosition, 0)}px)`;
      }
    }
  };

  if (loading) {
    return (
      <div className="home-page">
        <div className="loading-spinner">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="home-page">
        <div className="error-message">{error}</div>
      </div>
    );
  }

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-grid">
            {/* Left: Main Promo Carousel */}
            {carouselData.length > 0 && (
              <div
                className="hero-main-banner"
                style={{
                  backgroundImage: `url(${carouselData[currentSlide].image})`,
                }}
              >
                <div className="banner-content">
                  <span className="tagline">
                    <h3>{carouselData[currentSlide].tagline}</h3>
                  </span>
                  <h1>{carouselData[currentSlide].title}</h1>
                  <p>{carouselData[currentSlide].description}</p>
                  <button
                    className="shop-btn"
                    onClick={() =>
                      handleShopNow(carouselData[currentSlide].link)
                    }
                  >
                    {carouselData[currentSlide].buttonText}
                  </button>
                </div>
                <div className="banner-image">
                  <div className="price-badge">
                    {carouselData[currentSlide].price}
                  </div>
                </div>

                {/* Carousel Navigation Dots */}
                <div className="carousel-dots">
                  {carouselData.map((_, index) => (
                    <button
                      key={index}
                      className={`dot ${
                        index === currentSlide ? "active" : ""
                      }`}
                      onClick={() => goToSlide(index)}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Right: Side Promos */}
            <div className="hero-side-banners">
              <div className="side-banner dark">
                <span className="sale-badge">SUMMER SALES</span>
                <h3>New Google Pixel 6 Pro</h3>
                <button className="shop-btn small">SHOP NOW →</button>
                <div className="discount-tag">29% OFF</div>
              </div>

              <div className="side-banner light">
                <h3>
                  Xiaomi <br /> FlipBuds Pro
                </h3>
                <p>$299 USD</p>
                <button className="shop-btn small1">SHOP NOW →</button>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Features Table Section */}
      <section className="features-section">
        <div className="container">
          <div className="features-grid">
            {featuresData.map((feature) => (
              <div key={feature.id} className="feature-card">
                <div className="feature-icon">{feature.icon}</div>
                <div className="feature-content">
                  <h3 className="feature-title">{feature.title}</h3>
                  <p className="feature-subtitle">{feature.subtitle}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Best Deals Section */}
      <section className="best-deals-section">
        <div className="container">
          <div className="section-header">
            <div className="title-with-timer">
              <h2 className="section-title">Best Deals</h2>
              <div className="countdown-timer">
                <span className="timer-label">Deals ends in</span>
                <div className="timer">
                  <div className="time-unit">
                    <span className="time-value">{timeLeft.days}</span>
                    <span className="time-label">D</span>
                  </div>
                  <span className="time-separator">:</span>
                  <div className="time-unit">
                    <span className="time-value">{timeLeft.hours}</span>
                    <span className="time-label">H</span>
                  </div>
                  <span className="time-separator">:</span>
                  <div className="time-unit">
                    <span className="time-value">{timeLeft.minutes}</span>
                    <span className="time-label">M</span>
                  </div>
                  <span className="time-separator">:</span>
                  <div className="time-unit">
                    <span className="time-value">{timeLeft.seconds}</span>
                    <span className="time-label">S</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="browse-all-container">
              <button className="browse-all-btn" onClick={handleBrowseAll}>
                Browse All Products →
              </button>
            </div>
          </div>

          <div className="deals-grid">
            {bestDeals.map((product) => (
              <div
                key={product.id}
                className="deal-card"
                onClick={() => handleProductClick(product.id)}
              >
                <div className="deal-image">
                  <img src={product.image} alt={product.name} />

                  {/* Product badges */}
                  <div className="product-badges">
                    {product.isHot && <span className="badge hot">HOT</span>}
                    {product.isNew && <span className="badge new">NEW</span>}
                    {product.isTrending && (
                      <span className="badge trending">TRENDING</span>
                    )}
                    {product.stock && product.stock < 20 && (
                      <span className="badge stock">
                        Only {product.stock} left
                      </span>
                    )}
                  </div>

                  {/* Product actions */}
                  <div className="product-actions">
                    <button
                      className={`action-btn wishlist ${
                        wishlist.includes(product.id) ? "active" : ""
                      }`}
                      onClick={(e) => toggleWishlist(product.id, e)}
                    >
                      <FaHeart />
                    </button>
                    <button
                      className="action-btn cart"
                      onClick={(e) => addToCart(product.id, e)}
                    >
                      <FaShoppingCart />
                    </button>
                    <button
                      className="action-btn view"
                      onClick={(e) => handleQuickView(product.id, e)}
                    >
                      <FaEye />
                    </button>
                  </div>

                  {/* Discount badge */}
                  <div className="discount-badge">{product.discount}% OFF</div>
                </div>

                <div className="deal-info">
                  <p className="product-brand">{product.brand}</p>
                  <h3 className="product-name">{product.name}</h3>

                  <div className="price-container">
                    <span className="current-price">${product.price}</span>
                    {product.originalPrice && (
                      <span className="original-price">
                        ${product.originalPrice}
                      </span>
                    )}
                  </div>

                  {product.rating && (
                    <div className="product-rating">
                      <FaStar /> {product.rating} ({product.reviews} reviews)
                    </div>
                  )}

                  {product.description && (
                    <p className="product-description">{product.description}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Shopping Categories Section */}
      <section className="shop-categories-section">
        <div className="container">
          <h2 className="section-title">Shop with Categories</h2>

          <div className="categories-carousel">
            <button
              className="carousel-control prev"
              onClick={handleCategoriesPrev}
            >
              <FaChevronLeft />
            </button>

            <div className="carousel-container">
              <div className="carousel-track" ref={categoriesCarouselRef}>
                {categories.map((category) => (
                  <div
                    key={category.id}
                    className="category-card"
                    onClick={() => handleCategoryClick(category.name)}
                  >
                    <div className="category-image">
                      <img
                        src={category.image}
                        alt={category.name}
                        onError={(e) => {
                          e.target.src = "/images/placeholder-category.jpg";
                        }}
                      />
                    </div>
                    <div className="category-info">
                      <h3 className="category-name">{category.name}</h3>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button
              className="carousel-control next"
              onClick={handleCategoriesNext}
            >
              <FaChevronRight />
            </button>
          </div>
        </div>
      </section>
      {/* Featured Products Section */}
      <section className="featured-products-section">
        <div className="container">
          <div className="featured-header">
            <h2 className="section-title">Featured Products</h2>
            <div className="categories-filter">
              <span
                className={`filter-link ${
                  selectedCategory === "All" ? "active" : ""
                }`}
                onClick={() => setSelectedCategory("All")}
              >
                All Product
              </span>
              <span
                className={`filter-link ${
                  selectedCategory === "SmartPhone" ? "active" : ""
                }`}
                onClick={() => setSelectedCategory("SmartPhone")}
              >
                Smart Phone
              </span>
              <span
                className={`filter-link ${
                  selectedCategory === "Laptop" ? "active" : ""
                }`}
                onClick={() => setSelectedCategory("Laptop")}
              >
                Laptop
              </span>
              <span
                className={`filter-link ${
                  selectedCategory === "Headphone" ? "active" : ""
                }`}
                onClick={() => setSelectedCategory("Headphone")}
              >
                Headphone
              </span>
              <span
                className={`filter-link ${
                  selectedCategory === "TV" ? "active" : ""
                }`}
                onClick={() => setSelectedCategory("TV")}
              >
                TV
              </span>
              <span className="browse-all-link" onClick={handleBrowseAll}>
                Browse All Product →
              </span>
            </div>
          </div>

          <div className="featured-content">
            <div className="featured-ad">
              <div className="ad-content">
                <h3>COMPUTER & ACCESSORIES</h3>
                <h2>32% Discount</h2>
                <p>For all electronics products</p>
                <div className="offer-timer">
                  <span>
                    Offers ends in:{" "}
                    <div className="timer-text">ENDS OF CHRISTMAS</div>
                  </span>
                </div>
                <button className="shop-now-btn">SHOP NOW</button>
              </div>
            </div>

            <div className="deals-grid">
              {bestDeals.map((product) => (
                <div
                  key={product.id}
                  className="deal-card"
                  onClick={() => handleProductClick(product.id)}
                >
                  <div className="deal-image">
                    <img src={product.image} alt={product.name} />

                    {/* Product badges */}
                    <div className="product-badges">
                      {product.isHot && <span className="badge hot">HOT</span>}
                      {product.isNew && <span className="badge new">NEW</span>}
                      {product.isTrending && (
                        <span className="badge trending">TRENDING</span>
                      )}
                      {product.stock && product.stock < 20 && (
                        <span className="badge stock">
                          Only {product.stock} left
                        </span>
                      )}
                    </div>

                    {/* Product actions */}
                    <div className="product-actions">
                      <button
                        className={`action-btn wishlist ${
                          wishlist.includes(product.id) ? "active" : ""
                        }`}
                        onClick={(e) => toggleWishlist(product.id, e)}
                      >
                        <FaHeart />
                      </button>
                      <button
                        className="action-btn cart"
                        onClick={(e) => addToCart(product.id, e)}
                      >
                        <FaShoppingCart />
                      </button>
                      <button
                        className="action-btn view"
                        onClick={(e) => handleQuickView(product.id, e)}
                      >
                        <FaEye />
                      </button>
                    </div>

                    {/* Discount badge */}
                    <div className="discount-badge">
                      {product.discount}% OFF
                    </div>
                  </div>

                  <div className="deal-info">
                    <div className="product-rating">
                      <div className="stars">
                        {[...Array(5)].map((_, i) => (
                          <FaStar
                            key={i}
                            className={
                              i < Math.floor(product.rating) ? "filled" : ""
                            }
                          />
                        ))}
                      </div>
                      <span className="review-count">({product.reviews})</span>
                    </div>
                    <h3 className="product-name">{product.name}</h3>

                    <div className="price-container">
                      <span className="current-price">${product.price}</span>
                      {product.originalPrice && (
                        <span className="original-price">
                          ${product.originalPrice}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      {/* New Product Introduction Section */}
      <section className="new-product-intro">
        <div className="container">
          <div className="intro-grid">
            {newProductsIntro.map((product) => (
              <div
                key={product.id}
                className={`intro-card ${product.backgroundClass} ${product.theme}-theme`}
              >
                <div className="intro-content">
                  <span className="intro-tag">INTRODUCING</span>
                  {product.brand === "Apple" && (
                    <span className="intro-new">New</span>
                  )}
                  <h2 className="intro-brand">{product.brand}</h2>
                  <h3 className="intro-name">{product.name}</h3>
                  <p className="intro-description">{product.description}</p>
                  {product.price && (
                    <div className="intro-price">{product.price}</div>
                  )}
                  <button className={`intro-shop-btn ${product.theme}-btn`}>
                    {product.buttonText}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="computer-accessories">

      </section>
    </div>
  );
};

export default Home;
