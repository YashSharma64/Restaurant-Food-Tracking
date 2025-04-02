
import React from 'react';
import '../styles/OrderList.css';

const OrderList = ({ items, onRemoveItem }) => {
  if (items.length === 0) {
    return (
      <div className="order-list empty-list">
        <h2>Current Order</h2>
        <p className="empty-message">Your order is empty. Add some items!</p>
      </div>
    );
  }

  return (
    <div className="order-list">
      <h2>Current Order</h2>
      <ul className="items-container">
        {items.map((item, index) => (
          <li key={item.id} className="item-card" style={{animationDelay: `${index * 0.1}s`}}>
            <span className="food-name">{item.name}</span>
            <span className="food-price">${item.price}</span>
            <button 
              className="remove-button" 
              onClick={() => onRemoveItem(item.id)}
              aria-label="Remove item"
            >
              <span className="remove-icon">✕</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderList;
