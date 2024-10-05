// src/components/User/CostDetail.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { API } from '../../api';
import './CostDetail.css'; // Assuming a separate CSS file for styling
import Header from '../Header';

const CostDetail = () => {
    const { id } = useParams(); // Get cost ID from the URL
    const [cost, setCost] = useState({});
    const [isEditing, setIsEditing] = useState(false); // State to toggle editing mode
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCost = async () => {
            try {
                const token = localStorage.getItem('authToken'); // Retrieve token from localStorage

                if (!token) {
                    setError('No token found. Please login again.');
                    return;
                }

                const response = await API.get(`/costs/${id}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                const costData = response.data;

                // Validate if purchaseDate is valid before formatting it
                const purchaseDate = new Date(costData.purchaseDate);
                if (isNaN(purchaseDate)) {
                    setError('Invalid date format.');
                } else {
                    costData.purchaseDate = purchaseDate.toISOString().split('T')[0]; // Format date as yyyy-mm-dd
                }

                setCost(costData);
            } catch (err) {
                setError('Failed to fetch cost details.');
            }
        };

        fetchCost();
    }, [id]);

    const handleEditToggle = () => {
        setIsEditing((prevState) => !prevState);
    };

    const handleInputChange = (e) => {
        setCost({ ...cost, [e.target.name]: e.target.value });
    };

    const handleUpdate = async () => {
        try {
            const token = localStorage.getItem('authToken');
            if (!token) {
                setError('No token found. Please login again.');
                return;
            }

            await API.put(`/costs/${id}`, cost, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setIsEditing(false); // Disable editing mode after successful update
            alert('Cost details updated successfully.');
        } catch (err) {
            setError('Failed to update cost details.');
        }
    };

    const handleDelete = async () => {
        const confirmDelete = window.confirm('Are you sure you want to delete this cost?');
        if (!confirmDelete) return;

        try {
            const token = localStorage.getItem('authToken');
            if (!token) {
                setError('No token found. Please login again.');
                return;
            }

            await API.delete(`/costs/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            navigate('/user'); // Redirect back to user dashboard after deletion
        } catch (err) {
            setError('Failed to delete cost.');
        }
    };

    return (
        <div>
            <Header />

            <div className="cost-detail-container">
                <h2 className="cost-detail-title">Cost Details</h2>
                {error && <p className="error-message">{error}</p>}

                <form className="cost-detail-form">
                    <div className="form-group">
                        <label htmlFor="itemName">Item Name</label>
                        <input
                            type="text"
                            id="itemName"
                            name="itemName"
                            value={cost.itemName || ''}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="quantity">Quantity</label>
                        <div className="quantity-input">
                            <button type="button" onClick={() => setCost({ ...cost, quantity: Math.max(1, cost.quantity - 1) })} disabled={!isEditing}>-</button>
                            <input
                                type="number"
                                id="quantity"
                                name="quantity"
                                value={cost.quantity || 1}
                                onChange={handleInputChange}
                                disabled={!isEditing}
                            />
                            <button type="button" onClick={() => setCost({ ...cost, quantity: cost.quantity + 1 })} disabled={!isEditing}>+</button>
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="amount">Amount</label>
                        <input
                            type="number"
                            id="amount"
                            name="amount"
                            value={cost.amount || ''}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="purchaseDate">Purchase Date</label>
                        <input
                            type="date"
                            id="purchaseDate"
                            name="purchaseDate"
                            value={cost.purchaseDate || ''}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="month">Month</label>
                        <select
                            id="month"
                            name="month"
                            value={cost.month || ''}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                        >
                            <option value="January">January</option>
                            <option value="February">February</option>
                            <option value="March">March</option>
                            <option value="April">April</option>
                            <option value="May">May</option>
                            <option value="June">June</option>
                            <option value="July">July</option>
                            <option value="August">August</option>
                            <option value="September">September</option>
                            <option value="October">October</option>
                            <option value="November">November</option>
                            <option value="December">December</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="remarks">Remarks</label>
                        <textarea
                            id="remarks"
                            name="remarks"
                            value={cost.remarks || ''}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                        />
                    </div>

                    <div className="button-group">
                        <button
                            type="button"
                            className="back-button"
                            onClick={() => navigate('/user')}
                        >
                            Back
                        </button>
                        <button type="button" className="edit-button" onClick={isEditing ? handleUpdate : handleEditToggle}>
                            {isEditing ? 'Update' : 'Edit'}
                        </button>
                        <button type="button" className="delete-button" onClick={handleDelete}>
                            Delete
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CostDetail;
