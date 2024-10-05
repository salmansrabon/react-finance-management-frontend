// src/components/User/UserDashboard.js
import React, { useEffect, useState, useCallback } from 'react';
import { API } from '../../api';
import './UserDashboard.css';
import { useNavigate } from 'react-router-dom';
import Header from '../Header';
import Pagination from '../Pagination'; // Import the Pagination component

const UserDashboard = () => {
  const [costs, setCosts] = useState([]); // Holds all costs
  const [filteredCosts, setFilteredCosts] = useState([]); // Holds filtered costs
  const [searchTerm, setSearchTerm] = useState(''); // Holds search input value
  const [loading, setLoading] = useState(true); // Track loading state
  const [currentPage, setCurrentPage] = useState(1); // Current active page
  const [itemsPerPage, setItemsPerPage] = useState(10); // Items per page
  const navigate = useNavigate();

  // Fetch all costs on component mount
  const fetchCosts = useCallback(async () => {
    const token = localStorage.getItem('authToken'); // Retrieve token from localStorage

    if (!token) {
      console.error('No token found. Please login again.');
      navigate('/login'); // Redirect to login if no token found
      return;
    }

    try {
      setLoading(true); // Set loading to true before fetching
      const response = await API.get('/costs', {
        headers: { Authorization: `Bearer ${token}` }, // Include token in headers
      });
      // Sort costs in descending order by purchaseDate (or any date field)
      const sortedCosts = response.data.sort((a, b) => new Date(b.purchaseDate) - new Date(a.purchaseDate));
      setCosts(sortedCosts);
      setFilteredCosts(sortedCosts); // Initially set filteredCosts to all costs
    } catch (error) {
      console.error('Error fetching costs:', error);
    } finally {
      setLoading(false); // Set loading to false after fetching
    }
  }, [navigate]);

  useEffect(() => {
    fetchCosts(); // Fetch costs when component mounts
  }, [fetchCosts]);

  // Calculate total amount based on filtered costs
  const calculateTotalAmount = (costsArray) => {
    return costsArray.reduce((total, cost) => total + cost.amount, 0);
  };

  // Handle search term change
  useEffect(() => {
    const filtered = costs.filter((cost) =>
      cost.itemName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cost.remarks.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cost.month.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCosts(filtered); // Update filtered costs
  }, [searchTerm, costs]); // Re-run filtering when searchTerm or costs change

  // Get current items for the active page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredCosts.slice(indexOfFirstItem, indexOfLastItem);

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Handle items per page change
  const handleItemsPerPageChange = (newItemsPerPage) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1); // Reset to page 1 whenever items per page change
  };

  // Calculate total rows and total amount
  const totalRows = filteredCosts.length;
  const totalAmount = calculateTotalAmount(filteredCosts); // Calculate total amount from filtered costs

  return (
    <div>
      <Header />

      <div className="user-dashboard">
        <h2>User Daily Costs</h2>
        <div className="header-section">
          <button className="add-cost-button" onClick={() => navigate('/add-cost')}>Add Cost</button>
          <div className="summary">
            <span>Total Rows: {totalRows}</span>
            <span>Total Cost: {totalAmount} TK</span>
          </div>
          {/* Search Input */}
          <input
            type="text"
            placeholder="Search items..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        {/* Show a loading spinner or text while loading */}
        {loading ? (
          <p>Loading costs...</p>
        ) : (
          <>
            {/* Cost Table */}
            <table>
              <thead>
                <tr>
                  <th>Item Name</th>
                  <th>Quantity</th>
                  <th>Amount</th>
                  <th>Purchase Date</th>
                  <th>Month</th>
                  <th>Remarks</th>
                  <th>View</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.length > 0 ? (
                  currentItems.map((cost) => (
                    <tr key={cost._id}>
                      <td>{cost.itemName}</td>
                      <td>{cost.quantity}</td>
                      <td>{cost.amount}</td>
                      <td>{new Date(cost.purchaseDate).toLocaleDateString()}</td>
                      <td>{cost.month}</td>
                      <td>{cost.remarks}</td>
                      <td>
                        <button onClick={() => navigate(`/cost/${cost._id}`)} className="view-button">
                          View
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="no-data">
                      No costs found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>

            {/* Pagination Component */}
            <Pagination
              totalItems={filteredCosts.length}
              itemsPerPage={itemsPerPage}
              currentPage={currentPage}
              onPageChange={handlePageChange}
              onItemsPerPageChange={handleItemsPerPageChange}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;
