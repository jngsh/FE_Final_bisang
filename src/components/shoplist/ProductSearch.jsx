import React, { useState } from 'react';
import axios from 'axios';
import BASE_URL from '@/utils/globalBaseUrl';

function ProductSearch({ setResults }) {
  const [query, setQuery] = useState('');

  const handleSearch = async () => {
    if (!query){
      setResults(null);
      return;
    } 

    try {
      const response = await axios.get(`${BASE_URL}/bisang/products/search`, {
        params: { query }
      });
      setResults(response.data);
      console.log("검색 데이터 확인: ", response.data);
    } catch (error) {
      console.error('axios error', error);
    }
  };

  return (
    <div className="container">
      <form
        onSubmit={(e) => e.preventDefault()}
        className="search-field position-relative mt-4 mb-3"
      >
        <input
          className="search-field__input w-100 border rounded-1"
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
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
      </form>
    </div>
  );
}

export default ProductSearch;
