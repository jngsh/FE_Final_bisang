import { useState } from 'react';

export default function Pagination2({ totalPages, currentPage, onPageChange }) {
  const [pageOffset, setPageOffset] = useState(0);

  const handlePageClick = (pageNumber) => {
    onPageChange(pageNumber);
  };

  const handlePrevClick = () => {
    if (pageOffset > 0) {
      setPageOffset(pageOffset - 1);
    }
  };

  const handleNextClick = () => {
    if (pageOffset + 4 < totalPages) {
      setPageOffset(pageOffset + 1);
    }
  };

  const pageNumbers = [];
  for (let i = pageOffset + 1; i <= Math.min(pageOffset + 4, totalPages); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className="shop-pages d-flex justify-content-center mt-3" aria-label="Page navigation">
      {totalPages > 4 &&
        <a
          href="#"
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
        </a>
      }
      <ul className="pagination mb-0">
        {pageNumbers.map((pageNumber) => (
          <li key={pageNumber} className="page-item">
            <a
              className={`btn-link px-1 mx-2 ${currentPage === pageNumber ? 'btn-link_active' : ''}`}
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handlePageClick(pageNumber);
              }}
            >
              {pageNumber}
            </a>
          </li>
        ))}
      </ul>
      {totalPages > 4 &&
        <a
          href="#"
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
        </a>
      }
    </nav>
  );
}
