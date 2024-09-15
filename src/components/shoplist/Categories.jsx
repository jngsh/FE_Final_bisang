import { useEffect, useState } from 'react';
import axios from 'axios';
import BASE_URL from '@/utils/globalBaseUrl';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function Categories({ onSelectCategory }) {
  const [categories, setCategories] = useState([]);
  const [selectedPetType, setSelectedPetType] = useState('D');
  const [selectedSecondType, setSelectedSecondType] = useState('all');
  const [filteredCategories, setFilteredCategories] = useState([]);
  const { t } = useTranslation();

  useEffect(() => {
    axios.get(`${BASE_URL}/bisang/category/type/${selectedPetType}`)
      .then(response => {
        const updatedCategories = [
          { typeValue: 'all', typeName: t("categoryPetA") },
          ...response.data
        ];
        setCategories(updatedCategories);
        setFilteredCategories(updatedCategories);
        setSelectedSecondType('');
        console.log("Categories 받아오는 값: ", selectedPetType, updatedCategories);
      })
      .catch(error => {
        console.error("There was an error fetching the categories!", error);
      });
  }, [selectedPetType], [t]);

  const handleCategoryClick = (elm) => {
    setSelectedSecondType(elm.typeValue);
    onSelectCategory({ petType: selectedPetType, typeValue: elm.typeValue });
  };

  useEffect(() => {
    setFilteredCategories(categories);
  }, [categories]);

  const getPetTypeText = (selectedPetType) => {
    switch (selectedPetType) {
      case 'Z': return t("categoryPetZ");
      case 'D': return t("categoryPetD");
      case 'C': return t("categoryPetC");
      default: return selectedPetType;
    }
  };

  const getCategoryText = (typeValue) => {
    switch (typeValue) {
      case 'j': return t("categoryAgej");
      case 'a': return t("categoryAgea");
      case 's': return t("categoryAges");
      case 'z': return t("categoryAgez");
      case '1': return t("categoryItem1");
      case '2': return t("categoryItem2");
      case '3': return t("categoryItem3");
      case 'all': return t("categoryItemA");
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
          {Array.isArray(filteredCategories) && filteredCategories.map((elm, i) => (
            <Link
              key={i}
              to="/shoplist"
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
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}