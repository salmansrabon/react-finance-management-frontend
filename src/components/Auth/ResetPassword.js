// src/components/Auth/ResetPassword.js
import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import { API } from '../../api'; // Import your API instance
import { useNavigate, useSearchParams } from 'react-router-dom';

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState(false); // State to manage error
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setMessage('Passwords do not match');
      setError(true);
      return;
    }

    const token = searchParams.get('token');

    try {
      const { data } = await API.post(`/auth/reset-password?token=${token}`, { newPassword });
      setMessage(data.message);
      setError(false); // No error if reset is successful
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    } catch (err) {
      setMessage('Error resetting password');
      setError(true); // Set error to true if there is an error
    }
  };

  return (
    <Container maxWidth="xs">
      <Typography variant="h4" gutterBottom>Reset Password</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="New Password"
          fullWidth
          margin="normal"
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
        <TextField
          label="Confirm Password"
          fullWidth
          margin="normal"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />

        <Box mt={2}>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Reset Password
          </Button>
        </Box>

        {/* Error message should be shown directly below the reset button */}
        {message && (
          <Box mt={2} display="flex" justifyContent="center">
            <Typography style={{ color: error ? 'red' : 'green' }}>
              {message}
            </Typography>
          </Box>
        )}
      </form>
    </Container>
  );
};

export default ResetPassword;
