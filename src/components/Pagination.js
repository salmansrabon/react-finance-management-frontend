import React from 'react';
import './Pagination.css';

const Pagination = ({ totalItems, itemsPerPage, currentPage, onPageChange, onItemsPerPageChange }) => {
  // Calculate total number of pages
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Helper function to generate page numbers with dots
  const getPaginationGroup = () => {
    const maxPageNumbersToShow = 3; // Number of page buttons to show around the current page
    const pageNumbers = [];
    const startPage = Math.max(1, currentPage - Math.floor(maxPageNumbersToShow / 2));
    const endPage = Math.min(totalPages, startPage + maxPageNumbersToShow - 1);

    // Always show the first two pages
    if (startPage > 1) {
      pageNumbers.push(1);
      if (startPage > 2) {
        pageNumbers.push(2);
      }
    }

    // Add dots if needed
    if (startPage > 3) {
      pageNumbers.push('...');
    }

    // Show pages around the current page
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    // Add dots after the last displayed page if there are hidden pages
    if (endPage < totalPages - 2) {
      pageNumbers.push('...');
    }

    // Always show the last two pages
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pageNumbers.push(totalPages - 1);
      }
      pageNumbers.push(totalPages);
    }

    return pageNumbers;
  };

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

      {/* Page numbers with dots */}
      {getPaginationGroup().map((number, index) => (
        <button
          key={index}
          className={`page-number ${number === currentPage ? 'active' : ''}`}
          onClick={() => number !== '...' && onPageChange(number)}
          disabled={number === '...'}
        >
          {number}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
