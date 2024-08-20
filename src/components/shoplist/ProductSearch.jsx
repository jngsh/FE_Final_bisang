// import React, { useState } from 'react';
// import axios from 'axios';
// import BASE_URL from '@/utils/globalBaseUrl';

// function ProductSearch({ setResults }) {
//   const [query, setQuery] = useState('');

//   const handleSearch = async () => {
//     if (!query){
//       setResults(null);
//       return;
//     } 

//     try {
//       const response = await axios.get(`${BASE_URL}/bisang/products/search`, {
//         params: { query }
//       });
//       setResults(response.data);
//       console.log("검색 데이터 확인: ", response.data);
//     } catch (error) {
//       console.error('axios error', error);
//     }
//   };

//   return (
//     <div className="container">
//       <form
//         onSubmit={(e) => e.preventDefault()}
//         className="search-field position-relative mt-4 mb-3"
//       >
//         <input
//           className="search-field__input w-100 border rounded-1"
//           type="text"
//           value={query}
//           onChange={(e) => setQuery(e.target.value)}
//           name="search-keyword"
//           placeholder="검색어를 입력하세요"
//           style={{ height: '40px', borderRadius: '4px', padding: '0 10px' }}
//         />
//         <button
//           className="btn-icon search-popup__submit pb-0"
//           type="button"
//           onClick={handleSearch}
//           style={{ padding: '0 10px', margin: '0' }}
//         >
//           <svg
//             className="d-block"
//             width="20"
//             height="20"
//             viewBox="0 0 20 20"
//             fill="none"
//             xmlns="http://www.w3.org/2000/svg"
//           >
//             <use href="#icon_search" />
//           </svg>
//         </button>
//       </form>
//     </div>
//   );
// }

// export default ProductSearch;

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

function ProductSearch() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const debouncedQuery = useDebounce(query, 500);
  const resultsRef = useRef(null);

  // Todo: 제품명 전체를 불러오지 않고 고양이, 강아지 등 단어를 추천하면 좋을 것 같음
  // Todo: 제품명 전체를 불러오고 누르면 상세페이지로 바로 연결?
  useEffect(() => {
    if (debouncedQuery) {
      axios.get(`${BASE_URL}/bisang/products/search`, { params: { query: debouncedQuery } })
        .then(response => {
          setResults(response.data);
        })
        .catch(error => {
          console.error('axios error', error);
        });
    } else {
      setResults([]);
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

  const handleResultClick = (productName) => {
    setQuery(productName);
    setShowResults(false);
    // handleSearch();
  };

  return (
    <div className="container position-relative">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          // handleSearch();
        }}
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
        {showResults && results.length > 0 && (
          <div className="search-results-container" ref={resultsRef}>
            <ul className="search-results-list">
              {results.slice(0, 5).map((result) => (
                <li
                  key={result.productId}
                  className="search-result-item"
                  onClick={() => handleResultClick(result.productName)}
                >
                  <div className="search-result-info">
                    <div className="search-result-name">{result.productName}</div>
                  </div>
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


// 추천 검색어
// import React, { useState, useEffect, useRef } from 'react';
// import axios from 'axios';
// import BASE_URL from '@/utils/globalBaseUrl';
// import './ProductSearch.css';

// function useDebounce(value, delay) {
//   const [debouncedValue, setDebouncedValue] = useState(value);

//   useEffect(() => {
//     const handler = setTimeout(() => {
//       setDebouncedValue(value);
//     }, delay);

//     return () => {
//       clearTimeout(handler);
//     };
//   }, [value, delay]);

//   return debouncedValue;
// }

// function ProductSearch() {
//   const [query, setQuery] = useState('');
//   const [results, setResults] = useState([]);
//   const [showResults, setShowResults] = useState(false);
//   const debouncedQuery = useDebounce(query, 500);
//   const resultsRef = useRef(null);

//   useEffect(() => {
//     if (debouncedQuery) {
//       axios.get(`${BASE_URL}/bisang/products/search`, { params: { query: debouncedQuery } })
//         .then(response => {
//           setResults(response.data);
//         })
//         .catch(error => {
//           console.error('axios error', error);
//         });
//     } else {
//       setResults([]);
//     }
//   }, [debouncedQuery]);

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (resultsRef.current && !resultsRef.current.contains(event.target)) {
//         setShowResults(false);
//       }
//     };

//     document.addEventListener('mousedown', handleClickOutside);
//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//     };
//   }, []);

//   const handleInputChange = (e) => {
//     setQuery(e.target.value);
//     setShowResults(true);
//   };

//   return (
//     <div className="container position-relative">
//       <form
//         onSubmit={(e) => e.preventDefault()}
//         className="search-field position-relative mt-4 mb-3"
//       >
//         <input
//           className="search-field__input w-100 border rounded-1"
//           type="text"
//           value={query}
//           onChange={handleInputChange}
//           name="search-keyword"
//           placeholder="검색어를 입력하세요"
//           style={{ height: '40px', borderRadius: '4px', padding: '0 10px' }}
//         />
//         <button
//           className="btn-icon search-popup__submit pb-0"
//           type="button"
//           onClick={() => {}}
//           style={{ padding: '0 10px', margin: '0' }}
//         >
//           <svg
//             className="d-block"
//             width="20"
//             height="20"
//             viewBox="0 0 20 20"
//             fill="none"
//             xmlns="http://www.w3.org/2000/svg"
//           >
//             <use href="#icon_search" />
//           </svg>
//         </button>
//       {showResults && results.length > 0 && (
//         <div className="search-results-container" ref={resultsRef}>
//           <ul className="search-results-list">
//             {results.slice(0, 5).map((result) => (
//               <li key={result.productId} className="search-result-item">
//                 {/* <img
//                   src={result.productImage}
//                   alt={result.productName}
//                   style={{ width: '60px', height: '60px', objectFit: 'cover' }}
//                 /> */}
//                 <div className="search-result-info">
//                   <div className="search-result-name">{result.productName}</div>
//                 </div>
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}
//       </form>
//     </div>
//   );
// }

// export default ProductSearch;


// 디바운스 추가
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import BASE_URL from '@/utils/globalBaseUrl';

// function useDebounce(value, delay) {
//   const [debouncedValue, setDebouncedValue] = useState(value);

//   useEffect(() => {
//     const handler = setTimeout(() => {
//       setDebouncedValue(value);
//     }, delay);

//     return () => {
//       clearTimeout(handler);
//     };
//   }, [value, delay]);

//   return debouncedValue;
// }

// function ProductSearch({ setResults }) {
//   const [query, setQuery] = useState('');
//   const [results, setResultsState] = useState([]);
//   // const [loading, setLoading] = useState(false);
//   const debouncedQuery = useDebounce(query, 500);

//   useEffect(() => {
//     if (debouncedQuery) {
//       // setLoading(true);
//       axios.get(`${BASE_URL}/bisang/products/search`, { params: { query: debouncedQuery } })
//         .then(response => {
//           setResults(response.data);
//           setResultsState(response.data);
//           // setLoading(false);
//         })
//         .catch(error => {
//           console.error('axios error', error);
//           // setLoading(false);
//         });
//     } else {
//       setResults(null);
//     }
//   }, [debouncedQuery, setResults]);

//   return (
//     <div className="container">
//       <form
//         onSubmit={(e) => e.preventDefault()}
//         className="search-field position-relative mt-4 mb-3"
//       >
//         <input
//           className="search-field__input w-100 border rounded-1"
//           type="text"
//           value={query}
//           onChange={(e) => setQuery(e.target.value)}
//           name="search-keyword"
//           placeholder="검색어를 입력하세요"
//           style={{ height: '40px', borderRadius: '4px', padding: '0 10px' }}
//         />
//         <button
//           className="btn-icon search-popup__submit pb-0"
//           type="button"
//           onClick={() => {}}
//           style={{ padding: '0 10px', margin: '0' }}
//         >
//           <svg
//             className="d-block"
//             width="20"
//             height="20"
//             viewBox="0 0 20 20"
//             fill="none"
//             xmlns="http://www.w3.org/2000/svg"
//           >
//             <use href="#icon_search" />
//           </svg>
//         </button>
//       </form>
//       {/* {loading && <p>Loading...</p>} */}
//       {results && (
//          <table className="search-results-table">
//          {/* <thead>
//            <tr>
//              <th>이미지</th>
//              <th>제품명</th>
//              <th>가격</th>
//            </tr>
//          </thead> */}
//          <tbody>
//            {results.slice(0, 5).map((result) => (
//              <tr key={result.productId}>
//                <td>
//                  <img
//                    src={result.productImage}
//                    alt={result.productName}
//                    style={{ width: '60px', height: '60px', objectFit: 'cover' }}
//                  />
//                </td>
//                <td>{result.productName}</td>
//                <td>{result.productPrice}원</td>
//              </tr>
//            ))}
//          </tbody>
//        </table>
//       )}
//     </div>
//   );
// }

// export default ProductSearch;
