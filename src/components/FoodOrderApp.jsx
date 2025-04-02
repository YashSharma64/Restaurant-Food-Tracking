
import React, { useState, useEffect } from 'react';
import AddFoodForm from './AddFoodForm';
import OrderList from './OrderList';
import OrderSummary from './OrderSummary';
import BillModal from './BillModal';
import { useToast } from "@/hooks/use-toast";
import '../styles/FoodOrderApp.css';

const FoodOrderApp = () => {
  const [orderItems, setOrderItems] = useState([]);
  const [showBill, setShowBill] = useState(false);
  const [orderNumber, setOrderNumber] = useState(1);
  const [animate, setAnimate] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    setAnimate(true);
  }, []);

  const addFoodItem = (item) => {
    setOrderItems([...orderItems, { ...item, id: Date.now() }]);
    toast({
      title: "Item Added",
      description: `${item.name} has been added to your order.`,
      duration: 2000,
    });
  };

  const removeItem = (id) => {
    const itemToRemove = orderItems.find(item => item.id === id);
    setOrderItems(orderItems.filter(item => item.id !== id));
    toast({
      title: "Item Removed",
      description: `${itemToRemove?.name || 'Item'} has been removed from your order.`,
      variant: "destructive",
      duration: 2000,
    });
  };

  const clearOrder = () => {
    if (orderItems.length > 0) {
      setOrderItems([]);
      toast({
        title: "Order Cleared",
        description: "All items have been removed from your order.",
        duration: 2000,
      });
    }
  };

  const generateBill = () => {
    setShowBill(true);
    toast({
      title: "Bill Generated",
      description: "Your bill has been generated successfully!",
      duration: 2000,
    });
  };

  const closeBill = () => {
    setShowBill(false);
    clearOrder();
    setOrderNumber(prev => prev + 1);
  };

  const calculateTotal = () => {
    return orderItems.reduce((sum, item) => sum + parseFloat(item.price), 0).toFixed(2);
  };

  return (
    <div className={`food-order-app ${animate ? 'animate-in' : ''}`}>
      <header className="app-header">
        <h1 className="title-bounce">Food Order Bill Generator</h1>
        <p>Add items to your order and generate a bill</p>
      </header>
      
      <div className="app-layout">
        <div className="form-section">
          <AddFoodForm onAddFood={addFoodItem} />
        </div>
        
        <div className="order-section">
          <OrderList items={orderItems} onRemoveItem={removeItem} />
          <OrderSummary 
            itemCount={orderItems.length} 
            total={calculateTotal()}
            onGenerateBill={generateBill}
            onClearOrder={clearOrder}
            disabled={orderItems.length === 0}
          />
        </div>
      </div>

      {showBill && (
        <BillModal 
          items={orderItems}
          total={calculateTotal()}
          orderNumber={orderNumber}
          onClose={closeBill}
        />
      )}
    </div>
  );
};

export default FoodOrderApp;
