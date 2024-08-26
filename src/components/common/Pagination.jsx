import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Pagination({ totalPages, currentPage, onPageChange }) {
  const [pageOffset, setPageOffset] = useState(0);

  useEffect(() => {
    if (currentPage === 1) {
      setPageOffset(0);
    } else {
      setPageOffset(Math.floor((currentPage - 1) / 4) * 4);
    }
  }, [currentPage, totalPages]);

  const handlePageClick = (pageNumber) => {
    onPageChange(pageNumber);
  };

  const handlePrevClick = () => {
    if (pageOffset > 0) {
      const newOffset = pageOffset - 4;
      setPageOffset(newOffset);
    }
    window.scrollTo(0, window.scrollY);
  };

  const handleNextClick = () => {
    if (pageOffset + 4 < totalPages) {
      const newOffset = pageOffset + 4;
      setPageOffset(newOffset);
    }
    window.scrollTo(0, window.scrollY);
  };

  const pageNumbers = [];
  for (let i = pageOffset + 1; i <= Math.min(pageOffset + 4, totalPages); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className="shop-pages d-flex justify-content-center mt-3" aria-label="Page navigation">
      {totalPages > 4 &&
        <Link
          to="/shoplist"
          className={`btn-link d-inline-flex align-items-center ${currentPage === 1 ? 'disabled' : ''}`}
          onClick={(e) => {
            e.preventDefault();
            handlePrevClick();
          }}
        >
          <svg className="me-1" width="7" height="11" viewBox="0 0 7 11" xmlns="http://www.w3.org/2000/svg">
            <use href="#icon_prev_sm" />
          </svg>
          <span className="fw-medium">이전</span>
        </Link>
      }
      <ul className="pagination mb-0">
        {pageNumbers.map((pageNumber) => (
          <li key={pageNumber} className="page-item">
            <Link
              className={`btn-link px-1 mx-2 ${currentPage === pageNumber ? 'btn-link_active' : ''}`}
              to="/shoplist"
              onClick={(e) => {
                e.preventDefault();
                handlePageClick(pageNumber);
              }}
            >
              {pageNumber}
            </Link>
          </li>
        ))}
      </ul>
      {totalPages > 4 &&
        <Link
          to="/shoplist"
          className={`btn-link d-inline-flex align-items-center ${currentPage === totalPages ? 'disabled' : ''}`}
          onClick={(e) => {
            e.preventDefault();
            handleNextClick();
          }}
        >
          <span className="fw-medium me-1">다음</span>
          <svg width="7" height="11" viewBox="0 0 7 11" xmlns="http://www.w3.org/2000/svg">
            <use href="#icon_next_sm" />
          </svg>
        </Link>
      }
    </nav>
  );
}