import React, { useState } from 'react';
import Categories from './Categories';
import ProductList from './ProductList';
import ProductSearch from './ProductSearch';
import SearchedProductList from './SearchedProductList';

export default function Shop5() {
  const [selectedPetType, setSelectedPetType] = useState('Z');
  const [selectedTypeValue, setSelectedTypeValue] = useState('j');
  const [searchResults, setSearchResults] = useState([]);

  const handleSelectCategory = (categoryInfo) => {
    setSelectedPetType(categoryInfo.petType);
    setSelectedTypeValue(categoryInfo.typeValue);
  };

  const handleSearchResults = (results) => {
    setSearchResults(results);
  };

  return (
    <div>
      <ProductSearch setResults={handleSearchResults} />
      {((searchResults === null) || (searchResults.length === 0)) ?
        <>
          <Categories onSelectCategory={handleSelectCategory} />
          <ProductList petType={selectedPetType} typeValue={selectedTypeValue} />
        </>
      : <SearchedProductList searchedProducts={searchResults} />}
    </div>
  );
}