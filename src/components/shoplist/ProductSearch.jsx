import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import BASE_URL from '@/utils/globalBaseUrl';
import './ProductSearch.css';

function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

function ProductSearch({ setResults }) {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const debouncedQuery = useDebounce(query, 500);
  const resultsRef = useRef(null);

  useEffect(() => {
    if (debouncedQuery) {
      axios.get(`${BASE_URL}/bisang/products/search/suggestions`, { params: { query: debouncedQuery } })
        .then(response => {
          setSuggestions(response.data);
        })
        .catch(error => {
          console.error('axios error', error);
        });
    } else {
      setSuggestions([]);
    }
  }, [debouncedQuery]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (resultsRef.current && !resultsRef.current.contains(event.target)) {
        setShowResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleInputChange = (e) => {
    setQuery(e.target.value);
    setShowResults(true);
  };

  const handleSearch = async () => {
    if (!query) {
      setResults([]);
      return;
    }

    try {
      const response = await axios.get(`${BASE_URL}/bisang/products/search`, { params: { query } });
      setResults(response.data);
      console.log("검색 데이터 확인: ", response.data);
    } catch (error) {
      console.error('axios error', error);
    }
  };

  const handleResultClick = (productName) => {
    setQuery(productName);
    setShowResults(false);
  };

  return (
    <div className="container position-relative">
      <form
        onSubmit={(e) => { e.preventDefault(); }}
        className="search-field position-relative mt-4 mb-3"
      >
        <input
          className="search-field__input w-100 border rounded-1"
          type="text"
          value={query}
          onChange={handleInputChange}
          name="search-keyword"
          placeholder="검색어를 입력하세요"
          style={{ height: '40px', borderRadius: '4px', padding: '0 10px' }}
        />
        <button
          className="btn-icon search-popup__submit pb-0"
          type="button"
          onClick={handleSearch}
          style={{ padding: '0 10px', margin: '0' }}
        >
          <svg
            className="d-block"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <use href="#icon_search" />
          </svg>
        </button>
        {showResults && suggestions.length > 0 && (
          <div className="search-results-container" ref={resultsRef}>
            <ul className="search-results-list">
              {suggestions.slice(0, 5).map((suggestion) => (
                <li
                  key={suggestion}
                  className="search-result-item"
                  onClick={() => handleResultClick(suggestion)}
                >
                  {suggestion}
                </li>
              ))}
            </ul>
          </div>
        )}
      </form>
    </div>
  );
}

export default ProductSearch;