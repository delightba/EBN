// src/pages/Orders/Orders.jsx
import React from 'react';
import './Orders.css';

const Orders = () => {
  // Mock orders data
  const orders = [
    { id: 1, date: '2023-05-15', status: 'Delivered', total: 129.99 },
    { id: 2, date: '2023-05-10', status: 'Shipped', total: 89.99 },
    { id: 3, date: '2023-05-05', status: 'Processing', total: 45.50 },
  ];

  return (
    <div className="orders-page">
      <div className="container">
        <h1>Your Orders</h1>
        {orders.length === 0 ? (
          <div className="empty-orders">
            <h2>You don't have any orders yet</h2>
            <p>Start shopping to see your orders here!</p>
          </div>
        ) : (
          <div className="orders-list">
            {orders.map(order => (
              <div key={order.id} className="order-item">
                <div className="order-header">
                  <div className="order-info">
                    <h3>Order # {order.id}</h3>
                    <p>Placed on {order.date}</p>
                  </div>
                  <div className="order-status">
                    <span className={`status-badge ${order.status.toLowerCase()}`}>
                      {order.status}
                    </span>
                  </div>
                </div>
                <div className="order-footer">
                  <div className="order-total">
                    Total: ${order.total.toFixed(2)}
                  </div>
                  <button className="btn-primary">View Order</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;