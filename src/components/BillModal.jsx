
import React, { useRef, useEffect, useState } from 'react';
import '../styles/BillModal.css';

const BillModal = ({ items, total, orderNumber, onClose }) => {
  const billRef = useRef(null);
  const [animateIn, setAnimateIn] = useState(false);
  
  useEffect(() => {
    setAnimateIn(true);
    
  
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };
    
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);
  
  const currentDate = new Date().toLocaleString();
  
  const handlePrint = () => {
    const content = billRef.current;
    const printWindow = window.open('', '_blank');
    
    printWindow.document.write('<html><head><title>Food Order Bill</title>');
    printWindow.document.write('<style>');
    printWindow.document.write(`
      body { font-family: 'Courier New', monospace; margin: 20px; }
      .bill-header { text-align: center; margin-bottom: 20px; }
      .bill-title { font-size: 24px; margin-bottom: 5px; }
      .bill-details { margin-bottom: 15px; }
      table { width: 100%; border-collapse: collapse; }
      th, td { padding: 8px; text-align: left; }
      .divider { border-top: 1px dashed #000; margin: 10px 0; }
      .total { font-weight: bold; margin-top: 15px; text-align: right; }
      .thank-you { text-align: center; margin-top: 30px; font-style: italic; }
    `);
    printWindow.document.write('</style></head><body>');
    printWindow.document.write(content.innerHTML);
    printWindow.document.write('</body></html>');
    
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 300);
  };

  return (
    <div 
      className={`bill-modal-overlay ${animateIn ? 'active' : ''}`}
      onClick={(e) => e.target.className.includes('bill-modal-overlay') && onClose()}
    >
      <div className="bill-modal">
        <div className="bill-content" ref={billRef}>
          <div className="bill-header">
            <h2 className="bill-title">Tasty Bill</h2>
            <div className="bill-info">
              <p>Order #: <span className="highlight">{orderNumber}</span></p>
              <p>{currentDate}</p>
            </div>
          </div>
          
          <div className="bill-items">
            <table>
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, index) => (
                  <tr key={item.id} className="item-row" style={{animationDelay: `${index * 0.1}s`}}>
                    <td>{item.name}</td>
                    <td>${item.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="divider"></div>
          
          <div className="bill-total">
            <p><strong>Total: <span className="total-amount">${total}</span></strong></p>
          </div>
          
          <div className="thank-you">
            <p>Thank you for your order!</p>
          </div>
        </div>
        
        <div className="bill-actions">
          <button onClick={handlePrint} className="print-button">
            <span className="button-icon">🖨️</span>
            <span>Print Bill</span>
          </button>
          <button onClick={onClose} className="close-button">
            <span className="button-icon">✓</span>
            <span>Close</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default BillModal;
