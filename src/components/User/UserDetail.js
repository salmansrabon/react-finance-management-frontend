// src/components/User/UserDetail.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, TextField, Container, Typography, Paper, Grid } from '@mui/material'; // Import Material UI components
import Header from '../Header'; // Import the existing Header component

const UserDetail = () => {
  const { id } = useParams(); // Get user ID from URL params
  const [user, setUser] = useState({});
  const [isEditing, setIsEditing] = useState(false); // Track edit mode
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();
  const [error, setError] = useState('');

  // Fetch user details by ID
  const fetchUserDetails = async () => {
    const token = localStorage.getItem('authToken'); // Retrieve token from localStorage

    if (!token) {
      setError('No token found. Please login again.');
      return;
    }

    try {
      const response = await axios.get(`http://localhost:5000/api/user/${id}`, {
        headers: { Authorization: `Bearer ${token}` }, // Include token in headers
      });
      setUser(response.data);
      setFormData(response.data); // Initialize form data with user details
    } catch (err) {
      console.error('Error fetching user details:', err); // Log error for debugging
      setError('Failed to fetch user details. Unauthorized access.');
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, [id]);

  // Handle form field changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle update user
  const handleUpdateUser = async () => {
    try {
      await axios.put(`http://localhost:5000/api/user/${id}`, formData, {
        headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` },
      });
      setIsEditing(false); // Switch back to view mode after update
      alert('User updated successfully!');
    } catch (error) {
      console.error('Error updating user:', error);
      setError('Failed to update user.');
    }
  };

  // Handle delete user
  const handleDeleteUser = async () => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await axios.delete(`http://localhost:5000/api/user/${id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` },
        });
        alert('User deleted successfully!');
        navigate('/admin'); // Redirect to admin dashboard after deletion
      } catch (error) {
        console.error('Error deleting user:', error);
        setError('Failed to delete user.');
      }
    }
  };

  return (
    <>
      {/* Include the Header at the top of the User Detail Page */}
      <Header />

      <Container maxWidth="md">
        <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
          <Typography variant="h4" gutterBottom align="center">
            User Details
          </Typography>
          {error && (
            <Typography color="error" variant="body1" gutterBottom>
              {error}
            </Typography>
          )}

          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="First Name"
                name="firstName"
                value={formData.firstName || ''}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Last Name"
                name="lastName"
                value={formData.lastName || ''}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={formData.email || ''}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Phone Number"
                name="phoneNumber"
                value={formData.phoneNumber || ''}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Address"
                name="address"
                value={formData.address || ''}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Gender"
                name="gender"
                value={formData.gender || ''}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </Grid>
          </Grid>

          <div style={{ marginTop: '20px', textAlign: 'center' }}>
            {isEditing ? (
              <Button variant="contained" color="primary" onClick={handleUpdateUser}>
                Update
              </Button>
            ) : (
              <Button variant="outlined" onClick={() => setIsEditing(true)}>
                Edit
              </Button>
            )}
            <Button
              variant="contained"
              color="error"
              onClick={handleDeleteUser}
              style={{ marginLeft: '10px' }}
            >
              Delete
            </Button>
          </div>
        </Paper>
      </Container>
    </>
  );
};

export default UserDetail;
