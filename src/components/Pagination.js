// src/components/Pagination.js
import React from 'react';
import './Pagination.css';

const Pagination = ({ totalItems, itemsPerPage, currentPage, onPageChange, onItemsPerPageChange }) => {
  // Calculate total number of pages
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Create an array of pages [1, 2, 3, ..., totalPages]
  const pageNumbers = [...Array(totalPages).keys()].map(num => num + 1);

  return (
    <div className="pagination-container">
      {/* Dropdown to select items per page */}
      <select
        value={itemsPerPage}
        onChange={(e) => onItemsPerPageChange(parseInt(e.target.value))}
        className="items-per-page-select"
      >
        <option value={10}>10</option>
        <option value={25}>25</option>
        <option value={50}>50</option>
      </select>

      {/* Page numbers */}
      {pageNumbers.map(number => (
        <button
          key={number}
          className={`page-number ${number === currentPage ? 'active' : ''}`}
          onClick={() => onPageChange(number)}
        >
          {number}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
