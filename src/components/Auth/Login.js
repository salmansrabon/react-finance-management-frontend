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
      const { data } = await API.post('/auth/login', { email, password });
      localStorage.setItem('authToken', data.token);
      localStorage.setItem('authTokenData', JSON.stringify(data));
      if (data.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/user');
      }
    } catch (err) {
      setError('Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      {loading && <Loader />}
      <Container maxWidth="xs" className="login-box">
        <Typography variant="h4" component="h1" align="center" className="login-title">Login</Typography>
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
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>Login</Button>
        </Box>

        {/* Forgot Password Link */}
        <div className="auth-link">
          <span>Forgot your password? </span>
          <a href="/forgot-password">Reset it here</a>
        </div>

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
