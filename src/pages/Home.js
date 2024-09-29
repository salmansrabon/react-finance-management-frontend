// src/pages/Home.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API } from '../api'; // Import your API instance (e.g., Axios)
import './Home.css';
import logo from '../assets/logo.png';

const Home = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate for navigation

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Make a login request to the API
      const response = await API.post('/auth/login', { email, password });

      // Assuming the response contains a token and user role
      const { token, role } = response.data;

      // Save token and role in localStorage or context (for future API requests)
      localStorage.setItem('authToken', token);
      localStorage.setItem('userRole', role);

      // Navigate to respective dashboard based on user role
      if (role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/user');
      }
    } catch (err) {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="home-container">
      {/* Logo Section */}
      <img src={logo} alt="App Logo" className="home-logo" />
      
      {/* Title */}
      <h1 className="home-title">Welcome to <br/>daily finance management system</h1>
      
      {/* Login Form */}
      <div className="home-content">
        <h2>Login</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
            />
          </div>
          <button type="submit">Login</button>
        </form>

        {/* Register Link */}
        <div className="auth-link">
          <span>Don't have an account? </span>
          <a href="/register">Register</a>
        </div>
      </div>
    </div>
  );
};

export default Home;
