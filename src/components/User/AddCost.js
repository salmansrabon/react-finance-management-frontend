// src/components/User/AddCost.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API } from '../../api';
import './AddCost.css';

const AddCost = () => {
  const [itemName, setItemName] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [amount, setAmount] = useState('');
  const [purchaseDate, setPurchaseDate] = useState(new Date().toISOString().split('T')[0]); // Default to today
  const [month, setMonth] = useState(new Date().toLocaleString('default', { month: 'long' })); // Current month
  const [remarks, setRemarks] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('authToken');

    if (!token) {
      alert('No token found. Please login again.');
      return;
    }

    try {
      await API.post(
        '/costs',
        { itemName, quantity, amount, purchaseDate, month, remarks },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      navigate('/user'); // Redirect to User Dashboard after submission
    } catch (error) {
      console.error('Error creating cost:', error);
    }
  };

  return (
    <div className="add-cost-container">
      <h2>Add New Cost</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Item Name</label>
          <input
            type="text"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Quantity</label>
          <button type="button" onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}>
            -
          </button>
          <span>{quantity}</span>
          <button type="button" onClick={() => setQuantity(quantity + 1)}>
            +
          </button>
        </div>
        <div className="form-group">
          <label>Amount</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Purchase Date</label>
          <input
            type="date"
            value={purchaseDate}
            onChange={(e) => setPurchaseDate(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Month</label>
          <select value={month} onChange={(e) => setMonth(e.target.value)}>
            {['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'].map(
              (m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              )
            )}
          </select>
        </div>
        <div className="form-group">
          <label>Remarks</label>
          <textarea value={remarks} onChange={(e) => setRemarks(e.target.value)} />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddCost;
