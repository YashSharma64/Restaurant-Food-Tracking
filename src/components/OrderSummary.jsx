
import React, { useState, useEffect } from 'react';
import '../styles/OrderSummary.css';

const OrderSummary = ({ itemCount, total, onGenerateBill, onClearOrder, disabled }) => {
  const [animateTotal, setAnimateTotal] = useState(false);
  const [prevTotal, setPrevTotal] = useState(total);
  
  useEffect(() => {
    if (total !== prevTotal) {
      setAnimateTotal(true);
      const timer = setTimeout(() => setAnimateTotal(false), 1000);
      setPrevTotal(total);
      return () => clearTimeout(timer);
    }
  }, [total, prevTotal]);

  return (
    <div className="order-summary">
      <div className="summary-details">
        <div className="summary-row">
          <span className="label">Items:</span>
          <span className="value">{itemCount}</span>
        </div>
        <div className={`summary-row total ${animateTotal ? 'flash' : ''}`}>
          <span className="label">Total:</span>
          <span className="value">${total}</span>
        </div>
      </div>
      
      <div className="action-buttons">
        <button 
          className="clear-button" 
          onClick={onClearOrder}
          disabled={disabled}
        >
          <span className="button-text">Clear Order</span>
          <span className="button-effect"></span>
        </button>
        <button 
          className="bill-button" 
          onClick={onGenerateBill}
          disabled={disabled}
        >
          <span className="button-text">Generate Bill</span>
          <span className="button-effect"></span>
        </button>
      </div>
    </div>
  );
};

export default OrderSummary;
