import { useEffect, useState } from 'react';
import axios from 'axios';
import BASE_URL from '@/utils/globalBaseUrl';

export default function Categories({ onSelectCategory }) {
  const [categories, setCategories] = useState([]);
  const [selectedPetType, setSelectedPetType] = useState('D');
  const [selectedSecondType, setSelectedSecondType] = useState('all');
  const [filteredCategories, setFilteredCategories] = useState([]);

  useEffect(() => {
    axios.get(`${BASE_URL}/bisang/category/type/${selectedPetType}`)
      .then(response => {
        const updatedCategories = [
          { typeValue: 'all', typeName: '전체' },
          ...response.data
        ];
        setCategories(updatedCategories);
        setFilteredCategories(updatedCategories);
        console.log("Categories 받아오는 값: ", selectedPetType, updatedCategories);
      })
      .catch(error => {
        console.error("There was an error fetching the categories!", error);
      });
  }, [selectedPetType]);

  const handleCategoryClick = (elm) => {
    setSelectedSecondType(elm.typeValue);
    onSelectCategory({ petType: selectedPetType, typeValue: elm.typeValue });
  };

  useEffect(() => {
    setFilteredCategories(categories);
  }, [categories]);

  const getPetTypeText = (selectedPetType) => {
    switch (selectedPetType) {
      case 'Z': return '공용';
      case 'D': return '강아지';
      case 'C': return '고양이';
      default: return selectedPetType;
    }
  };

  const getCategoryText = (typeValue) => {
    switch (typeValue) {
      case 'j': return '주니어';
      case 'a': return '어덜트';
      case 's': return '시니어';
      case 'z': return '전연령';
      case '1': return '사료';
      case '2': return '간식';
      case '3': return '용품';
      case 'all': return '전체';
      default: return typeValue;
    }
  };

  return (
    <section className="full-width_padding" style={{ backgroundColor: "#faf9f8" }}>
      <div className="shop-categories position-relative">
        <div className="mb-4 text-center">
          <button
            className={`btn btn-link ${selectedPetType === 'D' ? 'active' : ''}`}
            onClick={() => setSelectedPetType('D')}
          >
            {getPetTypeText('D')}
          </button>
          <button
            className={`btn btn-link ${selectedPetType === 'C' ? 'active' : ''}`}
            onClick={() => setSelectedPetType('C')}
          >
            {getPetTypeText('C')}
          </button>
          <button
            className={`btn btn-link ${selectedPetType === 'Z' ? 'active' : ''}`}
            onClick={() => setSelectedPetType('Z')}
          >
            {getPetTypeText('Z')}
          </button>
        </div>

        <div className="shop-categories__list d-flex align-items-center flex-wrap justify-content-center">
        {Array.isArray(filteredCategories) && filteredCategories.map((elm, i)  => (
            <a
              key={i}
              href="#" // Todo: URL 개선
              className={`shop-categories__item mb-3 ${selectedSecondType === elm.typeValue ? 'active' : ''}`}
              onClick={() => handleCategoryClick(elm)}
            >
              <img
                loading="lazy"
                src={`/assets/images/categoryimages/category-item${selectedPetType}-${elm.typeValue}.png`}
                width="120"
                height="120"
                alt={`Image of ${elm.typeValue}`}
                className="shop-categories__item-img rounded-circle"
              />
              <h6 className={`pt-1 mt-3 mt-xl-4 mb-0 text-center shop-categories__item-text ${selectedSecondType === elm.typeValue ? 'active' : ''}`}>
                {getCategoryText(elm.typeValue)}
              </h6>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}