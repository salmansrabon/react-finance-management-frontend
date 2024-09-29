// src/components/Layout/DashboardLayout.js
import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import './DashboardLayout.css'; // Create this file if needed for custom styles

const DashboardLayout = ({ children }) => {
  return (
    <div className="dashboard-layout">
      {/* Header */}
      <header className="dashboard-header">
        <h1>Dashboard</h1>
        <div className="header-links">
          <Link to="/admin">Admin Dashboard</Link>
          <Link to="/user">User Dashboard</Link>
          <Link to="/">Logout</Link>
        </div>
      </header>
      
      {/* Sidebar (Optional) */}
      <aside className="sidebar">
        <ul>
          <li>
            <Link to="/admin">Admin Dashboard</Link>
          </li>
          <li>
            <Link to="/user">User Dashboard</Link>
          </li>
          <li>
            <Link to="/add-cost">Add Cost</Link>
          </li>
        </ul>
      </aside>

      {/* Main Content Area */}
      <main className="dashboard-content">
        {children}
        {/* Render nested routes/components */}
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
