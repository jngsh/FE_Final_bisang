import { useState } from 'react';
import Categories from './Categories';
import ProductList from './ProductList';
import Search from './Search';

export default function Shop5() {
  const [selectedPetType, setSelectedPetType] = useState('Z');
  const [selectedTypeValue, setSelectedTypeValue] = useState('j');

  const handleSelectCategory = (categoryInfo) => {
    setSelectedPetType(categoryInfo.petType);
    setSelectedTypeValue(categoryInfo.typeValue);
  };

  return (
    <div>
      <Search />
      <Categories onSelectCategory={handleSelectCategory} />
      <ProductList petType={selectedPetType} typeValue={selectedTypeValue} />
    </div>
  );
}