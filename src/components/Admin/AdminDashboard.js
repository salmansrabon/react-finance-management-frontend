import React, { useEffect, useState } from 'react';
import { API } from '../../api';
import Header from '../Header';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import Pagination from '../Pagination';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1); // Current active page
  const [itemsPerPage, setItemsPerPage] = useState(10); // Items per page
  const [loading, setLoading] = useState(true); // Added loading state
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      const token = localStorage.getItem('authToken');

      if (!token) {
        setError('No token found. Please login again.');
        return;
      }

      try {
        setLoading(true); // Start loading
        const response = await API.get('/user/users', {
          headers: { Authorization: `Bearer ${token}` },
        });
        // Sort users by createdAt field in descending order
        const sortedUsers = response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setUsers(sortedUsers);
        setLoading(false); // End loading after setting users
      } catch (err) {
        setError('Failed to fetch users. Unauthorized access.');
        setLoading(false); // End loading if there's an error
      }
    };

    fetchUsers();
  }, []);

  const handleViewUser = (userId) => {
    navigate(`/user/${userId}`);
  };

  // Calculate index of the first and last item of the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  // Filter users based on search term and paginate the results
  const filteredUsers = users.filter((user) => {
    const formattedDate = new Date(user.createdAt).toLocaleDateString();
    return Object.values(user).some(
      (value) =>
        typeof value === 'string' &&
        value.toLowerCase().includes(searchTerm.toLowerCase()) || // Standard string comparison
        formattedDate.includes(searchTerm) // Date comparison
    );
  });

  const currentUsers = filteredUsers.slice(indexOfFirstItem, indexOfLastItem); // Get users for the current page

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Handle items per page change
  const handleItemsPerPageChange = (items) => {
    setItemsPerPage(items);
    setCurrentPage(1); // Reset to the first page whenever items per page change
  };

  return (
    <div>
      <Header />
      <div className="admin-dashboard">
        <h2>Admin Dashboard</h2>
        {error && <p className="error-message">{error}</p>}

        {/* Show loading indicator */}
        {loading ? (
          <p>Loading users...</p>
        ) : (
          <>
            {/* Search Box with Total Count */}
            <div className="search-and-count">
              <input
                type="text"
                placeholder="Search by any field or date..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-box"
              />
              {/* Display total count of users */}
              <span className="total-count">
                Total Users: {filteredUsers.length > 0 ? filteredUsers.length : '0'}
              </span>
            </div>

            {/* User Table */}
            <table>
              <thead>
                <tr>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Email</th>
                  <th>Phone Number</th>
                  <th>Address</th>
                  <th>Gender</th>
                  <th>Registration Date</th> {/* Added new column */}
                  <th>View</th>
                </tr>
              </thead>
              <tbody>
                {currentUsers.length > 0 ? (
                  currentUsers.map((user) => (
                    <tr key={user._id}>
                      <td>{user.firstName}</td>
                      <td>{user.lastName}</td>
                      <td>{user.email}</td>
                      <td>{user.phoneNumber}</td>
                      <td>{user.address}</td>
                      <td>{user.gender}</td>
                      <td>{new Date(user.createdAt).toLocaleDateString()}</td> {/* Display registration date */}
                      <td>
                        <Button onClick={() => handleViewUser(user._id)}>
                          View
                        </Button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="no-data">
                      No users found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>

            {/* Pagination Component */}
            <Pagination
              totalItems={filteredUsers.length} // Total number of filtered users
              itemsPerPage={itemsPerPage} // Number of items to display per page
              currentPage={currentPage} // Current active page
              onPageChange={handlePageChange} // Handler for page change
              onItemsPerPageChange={handleItemsPerPageChange} // Handler for items per page change
            />
          </>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
