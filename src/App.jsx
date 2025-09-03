// src/App.jsx
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { BiddingProvider } from './context/BiddingContext';
import { FavoritesProvider } from './context/FavoritesContext'; // Import the provider
import AppRoutes from './routes/AppRoutes';
// import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import '../src/assets/style/global.css';

function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <BiddingProvider>
            <FavoritesProvider> {/* Add FavoritesProvider here */}
              <div className="app">
                {/* <Navbar /> */}
                <main className="main-content">
                  <AppRoutes />
                </main>
                <Footer />
              </div>
            </FavoritesProvider>
          </BiddingProvider>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;