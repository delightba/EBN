// src/pages/Favorites/Favorites.jsx
import React from 'react';
import './Favorites.css';

const Favorites = () => {
  const { getFavorites, removeFromFavorites } = useFavorites();
  const favorites = getFavorites();

  const handleRemoveFavorite = (productId) => {
    removeFromFavorites(productId);
  };

  return (
    <div className="favorites-page">
      <div className="container">
        <h1>Your Favorites</h1>
        {favorites.length === 0 ? (
          <div className="empty-favorites">
            <h2>You don't have any favorites yet</h2>
            <p>Start adding products to your favorites list!</p>
          </div>
        ) : (
          <div className="favorites-grid">
            {favorites.map(product => (
              <div key={product.id} className="favorite-item">
                <div className="favorite-image">
                  <img src={product.image} alt={product.name} />
                </div>
                <div className="favorite-details">
                  <h3>{product.name}</h3>
                  <p className="price">${product.price}</p>
                  <div className="favorite-actions">
                    <button className="btn-primary">View Product</button>
                    <button 
                      className="btn-remove"
                      onClick={() => handleRemoveFavorite(product.id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Favorites;