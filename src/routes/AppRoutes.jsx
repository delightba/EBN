// src/routes/AppRoutes.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home/Home';
import Products from '../pages/Products/Products';
import ProductDetail from '../pages/Products/ProductDetail';
import Bidding from '../pages/Bidding/Bidding';
import AuctionDetail from '../pages/Bidding/AuctionDetail';
import Cart from '../pages/Cart/Cart';
import Checkout from '../pages/Checkout/Checkout';
import Login from '../pages/Auth/Login';
import Register from '../pages/Auth/Register';
import VendorDashboard from '../pages/VendorDashboard/VendorDashboard';
import UserDashboard from '../pages/UserDashboard/UserDashboard';
import ProtectedRoute from './ProtectedRoute';
import Layout from '../components/common/Layout';
import Favorites from '../pages/Favorites/Favorites'; // Import Favorites page
import UserProfile from '../pages/UserProfile/UserProfile'; // Import UserProfile page
import VendorProfile from '../pages/VendorProfile/VendorProfile'; // Import VendorProfile page
import Orders from '../pages/Orders/Orders'; // Import Orders page

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes with Layout (includes navbar) */}
      <Route path="/" element={<Layout><Home /></Layout>} />
      <Route path="/products" element={<Layout><Products /></Layout>} />
      <Route path="/products/:id" element={<Layout><ProductDetail /></Layout>} />
      <Route path="/bidding" element={<Layout><Bidding /></Layout>} />
      <Route path="/auctions/:id" element={<Layout><AuctionDetail /></Layout>} />
      <Route path="/cart" element={<Layout><Cart /></Layout>} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      
      {/* Protected Routes - Authentication Required */}
      <Route path="/checkout" element={
        <ProtectedRoute>
          <Layout><Checkout /></Layout>
        </ProtectedRoute>
      } />
      
      <Route path="/user-dashboard" element={
        <ProtectedRoute>
          <Layout><UserDashboard /></Layout>
        </ProtectedRoute>
      } />
      
      <Route path="/vendor-dashboard" element={
        <ProtectedRoute>
          <Layout><VendorDashboard /></Layout>
        </ProtectedRoute>
      } />
      
      {/* New Protected Routes for Favorites and Profiles */}
      <Route path="/favorites" element={
        <ProtectedRoute>
          <Layout><Favorites /></Layout>
        </ProtectedRoute>
      } />
      
      <Route path="/profile" element={
        <ProtectedRoute>
          <Layout><UserProfile /></Layout>
        </ProtectedRoute>
      } />
      
      <Route path="/vendor-profile" element={
        <ProtectedRoute>
          <Layout><VendorProfile /></Layout>
        </ProtectedRoute>
      } />
      
      <Route path="/orders" element={
        <ProtectedRoute>
          <Layout><Orders /></Layout>
        </ProtectedRoute>
      } />
      
      {/* 404 Page */}
      <Route path="*" element={<Layout><div>Page Not Found</div></Layout>} />
    </Routes>
  );
};

export default AppRoutes;