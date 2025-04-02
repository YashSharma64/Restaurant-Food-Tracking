
import React, { useState, useEffect } from 'react';
import '../styles/AddFoodForm.css';

const AddFoodForm = ({ onAddFood }) => {
  const [foodName, setFoodName] = useState('');
  const [foodPrice, setFoodPrice] = useState('');
  const [error, setError] = useState('');
  const [isFormActive, setIsFormActive] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Reset form active state when form is empty
    setIsFormActive(foodName.trim() !== '' || foodPrice !== '');
  }, [foodName, foodPrice]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!foodName.trim()) {
      setError('Please enter a food name');
      animateError();
      return;
    }
    
    const price = parseFloat(foodPrice);
    if (isNaN(price) || price <= 0) {
      setError('Please enter a valid price');
      animateError();
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate a bit of processing time for visual feedback
    setTimeout(() => {
      onAddFood({
        name: foodName,
        price: price.toFixed(2)
      });
      
      // Reset form
      setFoodName('');
      setFoodPrice('');
      setError('');
      setIsSubmitting(false);
    }, 300);
  };

  const animateError = () => {
    // Add shake animation class
    const form = document.querySelector('.add-food-form');
    form.classList.add('shake');
    setTimeout(() => form.classList.remove('shake'), 500);
  };

  return (
    <div className={`add-food-form ${isFormActive ? 'active' : ''} ${isSubmitting ? 'submitting' : ''}`}>
      <h2>Add Food Item</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="foodName">Food Item</label>
          <input
            id="foodName"
            type="text"
            value={foodName}
            onChange={(e) => setFoodName(e.target.value)}
            placeholder="Enter food item name"
            className={foodName ? "has-value" : ""}
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="foodPrice">Price ($)</label>
          <input
            id="foodPrice"
            type="number"
            min="0.01"
            step="0.01"
            value={foodPrice}
            onChange={(e) => setFoodPrice(e.target.value)}
            placeholder="0.00"
            className={foodPrice ? "has-value" : ""}
          />
        </div>
        
        <button type="submit" className="add-button" disabled={isSubmitting}>
          {isSubmitting ? 'Adding...' : 'Add to Order'}
          <span className="button-shine"></span>
        </button>
      </form>
    </div>
  );
};

export default AddFoodForm;
