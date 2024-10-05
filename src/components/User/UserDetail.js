import React, { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, TextField, Container, Typography, Paper, Grid } from '@mui/material';
import Header from '../Header';
import { API } from '../../api';
import './UserDetail.css'; // Import the CSS file

const UserDetail = () => {
  const { id } = useParams(); // Get user ID from URL params
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [profileImage, setProfileImage] = useState(''); // State to hold the profile image URL
  const [selectedFile, setSelectedFile] = useState(null); // State for the new image file
  const navigate = useNavigate();
  const [error, setError] = useState('');

  // Fetch user details by ID
  const fetchUserDetails = useCallback(async () => {
    const token = localStorage.getItem('authToken');

    if (!token) {
      setError('No token found. Please login again.');
      return;
    }

    try {
      const response = await API.get(`/user/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setFormData(response.data);
      setProfileImage(response.data.profileImage); // Set profile image URL
    } catch (err) {
      console.error('Error fetching user details:', err);
      setError('Failed to fetch user details. Unauthorized access.');
    }
  }, [id]);

  useEffect(() => {
    fetchUserDetails(); // Fetch user details when component mounts
  }, [fetchUserDetails]);

  // Handle form field changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle file input change
  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  // Handle profile image upload
  const handleImageUpload = async () => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append('profileImage', selectedFile); // Append the selected file

    try {
      const response = await API.put(`/user/${id}/upload`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      setProfileImage(response.data.profileImageUrl); // Update the profile image URL state
      setFormData((prevFormData) => ({
        ...prevFormData,
        profileImage: response.data.profileImageUrl, // Update profileImage in formData
      })); // Update the formData state with the new profile image URL
      alert('Image uploaded successfully!');
    } catch (error) {
      console.error('Error uploading image:', error);
      setError('Failed to upload image.');
    }
  };

  // Handle update user
  const handleUpdateUser = async () => {
    try {
      await API.put(`/user/${id}`, formData, {
        headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` },
      });
      setIsEditing(false);
      alert('User updated successfully!');
    } catch (error) {
      console.error('Error updating user:', error);
      setError('Failed to update user.');
    }
  };

  // Handle delete user
  const handleDeleteUser = async () => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await API.delete(`/user/${id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` },
        });
        alert('User deleted successfully!');
        navigate('/admin');
      } catch (error) {
        console.error('Error deleting user:', error);
        setError('Failed to delete user.');
      }
    }
  };

  return (
    <>
      <Header />

      <Container maxWidth="md">
        <Paper elevation={3} className="user-detail-paper">
          <Typography variant="h4" gutterBottom align="center">
            User Details
          </Typography>
          {error && (
            <Typography color="error" variant="body1" gutterBottom>
              {error}
            </Typography>
          )}

          <div className="image-container">
            {/* Display profile image */}
            {profileImage ? (
              <img
                className="profile-image"
                src={`${process.env.REACT_APP_BASE_API_URL.replace('/api', '')}${profileImage}`}
                alt="User"
              />
            ) : (
              <div className="no-image">N/A</div>
            )}
            {/* File input for updating image */}
            {isEditing && (
              <div className="upload-section">
                <input
                  type="file"
                  className="upload-input"
                  onChange={handleFileChange}
                  accept="image/*"
                />
                <Button variant="contained" onClick={handleImageUpload} className="upload-button">
                  Upload Image
                </Button>
              </div>
            )}
          </div>

          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="First Name"
                name="firstName"
                value={formData.firstName || ''}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Last Name"
                name="lastName"
                value={formData.lastName || ''}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={formData.email || ''}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Phone Number"
                name="phoneNumber"
                value={formData.phoneNumber || ''}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Address"
                name="address"
                value={formData.address || ''}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Gender"
                name="gender"
                value={formData.gender || ''}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              {/* Registration Date Field */}
              <TextField
                fullWidth
                label="Registration Date"
                name="registrationDate"
                value={new Date(formData.createdAt).toLocaleDateString() || ''} // Format the date
                disabled={true} // Keep it always disabled
              />
            </Grid>
          </Grid>

          <div className="button-section">
            {isEditing ? (
              <Button variant="contained" color="primary" onClick={handleUpdateUser}>
                Update
              </Button>
            ) : (
              <Button variant="outlined" onClick={() => setIsEditing(true)}>
                Edit
              </Button>
            )}
            <Button
              variant="contained"
              color="error"
              onClick={handleDeleteUser}
              className="delete-button"
            >
              Delete
            </Button>
          </div>
        </Paper>
      </Container>
    </>
  );
};

export default UserDetail;
