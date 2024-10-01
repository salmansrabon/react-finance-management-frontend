// src/components/User/AddCost.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API } from '../../api';
import './AddCost.css';
import Header from '../Header';

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
  const handleReset = () => {
    setItemName('');
    setQuantity(1);
    setAmount('');
    setPurchaseDate(new Date().toISOString().substring(0, 10));
    setMonth(new Date().toLocaleString('default', { month: 'long' }));
    setRemarks('');
  };
  return (
    <div>
      <Header />

      <div className="add-cost-container">
        <form className="add-cost-form" onSubmit={handleSubmit}>
          <h2>Add New Cost</h2>
          <div className="form-group">
            <label htmlFor="itemName">Item Name</label>
            <input
              type="text"
              id="itemName"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Quantity</label>
            <div className="quantity-container">
              <button type="button" onClick={() => setQuantity(quantity - 1)} disabled={quantity <= 1}>
                -
              </button>
              <input type="number" value={quantity} readOnly />
              <button type="button" onClick={() => setQuantity(quantity + 1)}>
                +
              </button>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="amount">Amount</label>
            <input
              type="number"
              id="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="purchaseDate">Purchase Date</label>
            <input
              type="date"
              id="purchaseDate"
              value={purchaseDate}
              onChange={(e) => setPurchaseDate(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="month">Month</label>
            <select id="month" value={month} onChange={(e) => setMonth(e.target.value)} required>
              {/* Populate the dropdown with month options */}
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
            <label htmlFor="remarks">Remarks</label>
            <textarea
              id="remarks"
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              rows="3"
            />
          </div>

          <div className="button-group">
            <button type="submit" className="submit-button">
              Submit
            </button>
            <button type="button" className="reset-button" onClick={handleReset}>
              Reset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCost;
