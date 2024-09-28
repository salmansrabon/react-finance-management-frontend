// src/api.js
import axios from 'axios';

// Create an axios instance with the base URL of your backend
export const API = axios.create({
  baseURL: 'http://localhost:5000/api',
});

// Helper function to set the Authorization header
export const setAuthToken = (token) => {
  if (token) {
    API.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete API.defaults.headers.common['Authorization'];
  }
};

// Set the token from localStorage if it exists when the app loads
const token = localStorage.getItem('authToken');
if (token) {
  setAuthToken(token);
}
