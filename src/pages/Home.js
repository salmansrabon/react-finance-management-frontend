// src/pages/Home.js
import React from 'react';
import './Home.css';
import logo from '../assets/logo.png';
import Login from '../components/Auth/Login'; // Import the Login component

const Home = () => {

  return (
    <div className="home-container">
      {/* Logo Section */}
      <img src={logo} alt="App Logo" className="home-logo" />

      {/* Title */}
      <h1 className="home-title">Welcome to <br/>daily finance management system</h1>

      {/* Login Component */}
      <div className="home-content">
        {/* Render Login component inside Home */}
        <Login />
      </div>
    </div>
  );
};

export default Home;
