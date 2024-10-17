// src/components/Auth/ForgotPassword.js
import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import { API } from '../../api'; // Import your API instance

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState(false); // State to manage error color

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await API.post('/auth/forgot-password', { email });
      setMessage(data.message);
      setError(false); // Set error to false if successful
    } catch (err) {
      setMessage('Your email is not registered');
      setError(true); // Set error to true for red color
    }
  };

  return (
    <Container maxWidth="xs">
      <Typography variant="h4" gutterBottom>
        Forgot Password
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Email"
          fullWidth
          margin="normal"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Send Reset Link
        </Button>
        {/* Display message below the button in red color if it's an error */}
        {message && (
          <Box mt={2}>
            <Typography style={{ color: error ? 'red' : 'green' }}>
              {message}
            </Typography>
          </Box>
        )}
      </form>
    </Container>
  );
};

export default ForgotPassword;
