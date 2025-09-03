// src/pages/VendorProfile/VendorProfile.jsx
import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import './VendorProfile.css';

const VendorProfile = () => {
  const { user, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || '',
    storeName: user?.storeName || '',
    storeDescription: user?.storeDescription || ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProfile(formData);
    setIsEditing(false);
  };

  return (
    <div className="vendor-profile-page">
      <div className="container">
        <h1>Vendor Profile</h1>
        <div className="profile-card">
          <div className="profile-header">
            <div className="avatar">
              {user?.name ? user.name.charAt(0).toUpperCase() : 'V'}
            </div>
            <h2>{user?.storeName || user?.name}</h2>
            <p>{user?.email}</p>
          </div>
          
          {isEditing ? (
            <form onSubmit={handleSubmit} className="profile-form">
              <div className="form-group">
                <label>Store Name</label>
                <input
                  type="text"
                  name="storeName"
                  value={formData.storeName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label>Store Description</label>
                <textarea
                  name="storeDescription"
                  value={formData.storeDescription}
                  onChange={handleInputChange}
                  rows="3"
                />
              </div>
              
              <div className="form-group">
                <label>Contact Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label>Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                />
              </div>
              
              <div className="form-group">
                <label>Address</label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  rows="3"
                />
              </div>
              
              <div className="form-actions">
                <button type="submit" className="btn-primary">Save Changes</button>
                <button 
                  type="button" 
                  className="btn-secondary"
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <div className="profile-details">
              <div className="detail-item">
                <span className="label">Store Name:</span>
                <span className="value">{user?.storeName || 'Not provided'}</span>
              </div>
              <div className="detail-item">
                <span className="label">Store Description:</span>
                <span className="value">{user?.storeDescription || 'Not provided'}</span>
              </div>
              <div className="detail-item">
                <span className="label">Contact Name:</span>
                <span className="value">{user?.name}</span>
              </div>
              <div className="detail-item">
                <span className="label">Email:</span>
                <span className="value">{user?.email}</span>
              </div>
              <div className="detail-item">
                <span className="label">Phone:</span>
                <span className="value">{user?.phone || 'Not provided'}</span>
              </div>
              <div className="detail-item">
                <span className="label">Address:</span>
                <span className="value">{user?.address || 'Not provided'}</span>
              </div>
              <button 
                className="btn-primary"
                onClick={() => setIsEditing(true)}
              >
                Edit Profile
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VendorProfile;