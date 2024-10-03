// src/components/Auth/Register.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
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

  const [message, setMessage] = useState('');
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
      setMessage(`User ${data.firstName} ${data.lastName} registered successfully!`);
      alert('User registered successfully!');
      navigate('/login');
    } catch (err) {
      setMessage('Registration failed. Please try again.');
    }
  };

  return (
    <Container maxWidth="xs">
      <Box className="auth-box">
        <Typography variant="h4" component="h1" className="auth-title">
          Register
        </Typography>
        {message && <Typography color="success">{message}</Typography>}
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
          <Button type="submit" variant="contained" color="primary" fullWidth className="auth-button">
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
