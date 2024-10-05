// src/components/Auth/Login.js
import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { API } from '../../api';
import './Auth.css';
import Loader from '../Loader'; // Import the Loader component

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // State to manage loader visibility
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Show loader
    try {
      // Send login request to API
      const { data } = await API.post('/auth/login', { email, password });

      // Save token and user data in localStorage
      localStorage.setItem('authToken', data.token); // Store only the token separately
      localStorage.setItem('authTokenData', JSON.stringify(data)); // Store complete user data including ID and role

      // Redirect based on the user's role
      if (data.role === 'admin') {
        navigate('/admin'); // Redirect to admin dashboard
      } else {
        navigate('/user'); // Redirect to user dashboard
      }
    } catch (err) {
      setError('Invalid email or password'); // Show error if login fails
    } finally {
      setLoading(false); // Hide loader after login attempt
    }
  };

  return (
    <div className="login-container">
      {/* Show the Loader when loading is true */}
      {loading && <Loader />}

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
          <Button name="login" type="submit" variant="contained" color="primary" fullWidth className="login-button">
            Login
          </Button>
        </Box>

        {/* Register Link */}
        <div className="auth-link">
          <span>Don't have an account? </span>
          <a href="/register">Register</a>
        </div>
      </Container>
    </div>
  );
};

export default Login;
