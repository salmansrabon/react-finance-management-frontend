// src/components/User/UserDashboard.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { API } from '../../api'; // Make sure the path to API is correct
import './UserDashboard.css'; // Add necessary styling here

const UserDashboard = () => {
  const [costs, setCosts] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCosts = async () => {
      const token = localStorage.getItem('authToken');
      if (!token) {
        setError('No token found. Please login again.');
        return;
      }

      try {
        const response = await API.get('/costs', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCosts(response.data);
      } catch (err) {
        setError('Failed to fetch costs. Unauthorized access.');
      }
    };

    fetchCosts();
  }, []);

  return (
    <div className="user-dashboard">
      <h2>User Daily Costs</h2>
      {error && <p className="error-message">{error}</p>}
      <button className="add-cost-button" onClick={() => navigate('/add-cost')}>
        Add Cost
      </button>
      <table>
        <thead>
          <tr>
            <th>Item Name</th>
            <th>Quantity</th>
            <th>Amount</th>
            <th>Purchase Date</th>
            <th>Month</th>
            <th>Remarks</th>
          </tr>
        </thead>
        <tbody>
          {costs.length > 0 ? (
            costs.map((cost) => (
              <tr key={cost._id}>
                <td>{cost.itemName}</td>
                <td>{cost.quantity}</td>
                <td>{cost.amount}</td>
                <td>{new Date(cost.purchaseDate).toLocaleDateString()}</td>
                <td>{cost.month}</td>
                <td>{cost.remarks}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">No costs found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UserDashboard;
