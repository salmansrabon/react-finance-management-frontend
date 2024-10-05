// src/components/Auth/Register.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import { toast, ToastContainer } from 'react-toastify'; // Import Toast and ToastContainer
import 'react-toastify/dist/ReactToastify.css'; // Import react-toastify CSS
import { API } from '../../api';
import './Auth.css';

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phoneNumber: '',
    address: '',
    gender: '',
    termsAccepted: false,
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCheckbox = (e) => {
    setFormData({ ...formData, termsAccepted: e.target.checked });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await API.post('/auth/register', formData);
      
      // Show success toast message
      toast.success(`User ${data.firstName} ${data.lastName} registered successfully!`,
        {toastId: 'notifyme'});
      
      // After showing the toast, navigate to login page
      setTimeout(() => {
        navigate('/login');
      }, 3000); // Redirect after 2 seconds to give time for the toast to display
    } catch (err) {
      // Show error toast message
      toast.error('Registration failed. Please try again.');
    }
  };

  return (
    <Container maxWidth="xs">
      <ToastContainer position="bottom-center" autoClose={3000} pauseOnHover /> {/* Add ToastContainer for toast messages */}
      <Box className="auth-box">
        <Typography variant="h4" component="h1" className="auth-title">
          Register
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            id="firstName"
            label="First Name"
            name="firstName"
            variant="outlined"
            fullWidth
            margin="normal"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
          <TextField
            id="lastName"
            label="Last Name"
            name="lastName"
            variant="outlined"
            fullWidth
            margin="normal"
            value={formData.lastName}
            onChange={handleChange}
          />
          <TextField
            id="email"
            label="Email"
            name="email"
            variant="outlined"
            fullWidth
            margin="normal"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <TextField
            id='password'
            label="Password"
            name="password"
            variant="outlined"
            fullWidth
            margin="normal"
            type="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <TextField
            id="phoneNumber"
            label="Phone Number"
            name="phoneNumber"
            variant="outlined"
            fullWidth
            margin="normal"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
          />
          <TextField
            id="address"
            label="Address"
            name="address"
            variant="outlined"
            fullWidth
            margin="normal"
            value={formData.address}
            onChange={handleChange}
          />
          <div className="auth-gender-group">
            <label>Gender:</label>
            <input
              type="radio"
              name="gender"
              value="Male"
              onChange={handleChange}
              required
            /> Male
            <input
              type="radio"
              name="gender"
              value="Female"
              onChange={handleChange}
              required
            /> Female
          </div>
          <div className="auth-checkbox">
            <input
              type="checkbox"
              checked={formData.termsAccepted}
              onChange={handleCheckbox}
              required
            />{' '}
            I accept the terms and conditions
          </div>
          <Button type="submit" id="register" variant="contained" color="primary" fullWidth className="auth-button">
            Register
          </Button>
        </form>
        <Typography className="auth-link">
          Already have an account? <Link to="/login">Login here</Link>
        </Typography>
      </Box>
    </Container>
  );
};

export default Register;
