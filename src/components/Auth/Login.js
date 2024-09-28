// src/components/Auth/Login.js
import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { API } from '../../api';
import './Auth.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Initialize the navigate hook

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await API.post('/auth/login', { email, password });
      localStorage.setItem('authToken', data.token); // Save token in localStorage
      if (data.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/user');
      }
    } catch (err) {
      setError('Invalid email or password');
    }
  };

  // Function to handle registration button click
  const handleRegister = () => {
    navigate('/register'); // Navigate to the registration page
  };

  return (
    <div className="login-container">
      <Container maxWidth="xs" className="login-box">
        <Typography variant="h4" component="h1" align="center" className="login-title">
          Login
        </Typography>
        <Box component="form" onSubmit={handleSubmit} className="login-form">
          {error && <Typography color="error">{error}</Typography>}
          <TextField
            id="email"
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="login-input"
          />
          <TextField
            id="password"
            label="Password"
            variant="outlined"
            fullWidth
            margin="normal"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="login-input"
          />
          <Button id="submit" type="submit" variant="contained" color="primary" fullWidth className="login-button">
            Login
          </Button>
        </Box>

        {/* Register Button */}
        <Typography align="center" className="register-text">
          Don’t have an account?
        </Typography>
        <Button
          variant="text"
          color="secondary"
          onClick={handleRegister}
          className="register-button"
          fullWidth
        >
          Register
        </Button>
      </Container>
    </div>
  );
};

export default Login;
