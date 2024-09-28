// src/components/Admin/AdminDashboard.js
import React, { useEffect, useState } from 'react';
import { API } from '../../api';
import Header from '../Header';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import { Button, TextField, Container, Typography, Paper, Grid } from '@mui/material';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState(''); // State for search term
  const navigate = useNavigate(); // Use navigate for routing

  useEffect(() => {
    const fetchUsers = async () => {
      const token = localStorage.getItem('authToken'); // Retrieve token from localStorage

      if (!token) {
        setError('No token found. Please login again.');
        return;
      }

      try {
        const response = await API.get('/user/users', {
          headers: { Authorization: `Bearer ${token}` }, // Include the token in request headers
        });
        setUsers(response.data);
      } catch (err) {
        setError('Failed to fetch users. Unauthorized access.');
      }
    };

    fetchUsers();
  }, []);

  // Handle view button click
  const handleViewUser = (userId) => {
    navigate(`/user/${userId}`); // Redirect to user details page with user ID
  };

  // Filter users based on search term
  const filteredUsers = users.filter((user) =>
    Object.values(user).some(
      (value) =>
        typeof value === 'string' &&
        value.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div>
      {/* Include the Header at the top of the Admin Dashboard */}
      <Header />

      <div className="admin-dashboard">
        <h2>Admin Dashboard</h2>
        {error && <p className="error-message">{error}</p>}

        {/* Search Box */}
        <input
          type="text"
          placeholder="Search by any field..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-box"
        />

        {/* User Table */}
        <table>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Phone Number</th>
              <th>Address</th>
              <th>Gender</th>
              <th>View</th> {/* New View Column added */}
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <tr key={user._id}>
                  <td>{user.firstName}</td>
                  <td>{user.lastName}</td>
                  <td>{user.email}</td>
                  <td>{user.phoneNumber}</td>
                  <td>{user.address}</td>
                  <td>{user.gender}</td>
                  <td>
                    <Button onClick={() => handleViewUser(user._id)}>
                      View
                    </Button> {/* View button to navigate to user detail page */}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="no-data">
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;
