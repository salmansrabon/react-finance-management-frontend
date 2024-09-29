// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import AdminDashboard from './components/Admin/AdminDashboard';
import UserDashboard from './components/User/UserDashboard';
import UserDetail from './components/User/UserDetail';
import AddCost from './components/User/AddCost';
import CostDetail from './components/User/CostDetail';
import PrivateRoute from './components/PrivateRoute';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route 
          path="/admin" element={
            <PrivateRoute>
            <AdminDashboard />
            </PrivateRoute>
          } 
        />
        {/* Protected Routes (Wrapped with PrivateRoute) */}
        <Route
          path="/user"
          element={
            <PrivateRoute>
              <UserDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/user/:id"
          element={
            <PrivateRoute>
              <UserDetail />
            </PrivateRoute>
          }
        />
        <Route
          path="/cost/:id"
          element={
            <PrivateRoute>
              <CostDetail />
            </PrivateRoute>
          }
        />
        <Route
          path="/add-cost"
          element={
            <PrivateRoute>
              <AddCost />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <PrivateRoute>
              <AdminDashboard />
            </PrivateRoute>
          }
        />
        
      </Routes>
    </Router>
  );
}

export default App;
