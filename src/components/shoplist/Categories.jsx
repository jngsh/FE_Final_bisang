// import { useEffect, useState } from 'react';
// import axios from 'axios';
// import BASE_URL from '@/utils/globalBaseUrl';

// export default function Categories() {
//   const [categories, setCategories] = useState([]);
//   const [selectedPetType, setSelectedPetType] = useState('Z');
//   const [filteredCategories, setFilteredCategories] = useState([]);

//   useEffect(() => {
//     axios.get(`${BASE_URL}/bisang/category/type/${selectedPetType}`)
//          .then(response => {
//             setCategories(response.data);
//             console.log("check 1: ", response.data);
//           })
//           .catch(error => {
//             console.error("There was an error fetching the categories!", error);
//           });
//   }, [selectedPetType]);

//   useEffect(() => {
//     setFilteredCategories(categories);
//   }, [categories]);

//   const getCategoryText = (typeValue) => {
//     switch (typeValue) {
//       case 'j': return '주니어';
//       case 'a': return '어덜트';
//       case 's': return '시니어';
//       case 'z': return '전연령';
//       case '1': return '사료';
//       case '2': return '간식';
//       case '3': return '용품';
//       case '+': return '더보기';
//       default: return typeValue;
//     }
//   };

//   return (
//     <section
//       className="full-width_padding"
//       style={{ backgroundColor: "#faf9f8" }}
//     >
//       <div className="shop-categories position-relative">
//         <div className="mb-4 text-center">
//           <button
//             className={`btn btn-link ${selectedPetType === 'Z' ? 'active' : ''}`}
//             onClick={() => setSelectedPetType('Z')}
//           >
//             전체
//           </button>
//           <button
//             className={`btn btn-link ${selectedPetType === 'D' ? 'active' : ''}`}
//             onClick={() => setSelectedPetType('D')}
//           >
//             강아지
//           </button>
//           <button
//             className={`btn btn-link ${selectedPetType === 'C' ? 'active' : ''}`}
//             onClick={() => setSelectedPetType('C')}
//           >
//             고양이
//           </button>
//         </div>

//         <div className="shop-categories__list d-flex align-items-center flex-wrap justify-content-center">
//           {filteredCategories.map((elm, i) => (
//             <a key={i} href="#" className="shop-categories__item mb-3">
//               <img
//                 loading="lazy"
//                 src={`../src/components/shoplist/images/category-item${selectedPetType}-${elm.typeValue}.png`}
//                 width="120"
//                 height="120"
//                 alt={`Image of ${elm.typeValue}`}
//                 className="shop-categories__item-img rounded-circle"
//               />
//               <h6 className="pt-1 mt-3 mt-xl-4 mb-0 text-center">
//                 {getCategoryText(elm.typeValue)}
//               </h6>
//             </a>
//           ))}
//           <a href="#" className="shop-categories__item mb-3">
//               <img
//                 loading="lazy"
//                 src={`../src/components/shoplist/images/category-item${selectedPetType}-+.png`}
//                 width="120"
//                 height="120"
//                 alt={`Image of plus`}
//                 className="shop-categories__item-img rounded-circle"
//               />
//               <h6 className="pt-1 mt-3 mt-xl-4 mb-0 text-center">
//               {getCategoryText('+')}
//               </h6>
//             </a>
//         </div>
//       </div>
//     </section>
//   );
// }


// 됨
// import { useEffect, useState } from 'react';
// import axios from 'axios';
// import BASE_URL from '@/utils/globalBaseUrl';

// export default function Categories({ onSelectCategory }) {
//   const [categories, setCategories] = useState([]);
//   const [selectedPetType, setSelectedPetType] = useState('Z');
//   const [filteredCategories, setFilteredCategories] = useState([]);

//   useEffect(() => {
//     axios.get(`${BASE_URL}/bisang/category/type/${selectedPetType}`)
//       .then(response => {
//         setCategories(response.data);
//         setFilteredCategories(response.data);
//         console.log("Categories: ", response.data);
//       })
//       .catch(error => {
//         console.error("There was an error fetching the categories!", error);
//       });
//   }, [selectedPetType]);

//   useEffect(() => {
//     setFilteredCategories(categories);
//   }, [categories]);

//   const getCategoryText = (typeValue) => {
//     switch (typeValue) {
//       case 'j': return '주니어';
//       case 'a': return '어덜트';
//       case 's': return '시니어';
//       case 'z': return '전연령';
//       case '1': return '사료';
//       case '2': return '간식';
//       case '3': return '용품';
//       case '+': return '더보기';
//       default: return typeValue;
//     }
//   };

//   return (
//     <section className="full-width_padding" style={{ backgroundColor: "#faf9f8" }}>
//       <div className="shop-categories position-relative">
//         <div className="mb-4 text-center">
//           <button
//             className={`btn btn-link ${selectedPetType === 'Z' ? 'active' : ''}`}
//             onClick={() => setSelectedPetType('Z')}
//           >
//             전체
//           </button>
//           <button
//             className={`btn btn-link ${selectedPetType === 'D' ? 'active' : ''}`}
//             onClick={() => setSelectedPetType('D')}
//           >
//             강아지
//           </button>
//           <button
//             className={`btn btn-link ${selectedPetType === 'C' ? 'active' : ''}`}
//             onClick={() => setSelectedPetType('C')}
//           >
//             고양이
//           </button>
//         </div>

//         <div className="shop-categories__list d-flex align-items-center flex-wrap justify-content-center">
//           {filteredCategories.map((elm, i) => (
//             <a
//               key={i}
//               href="#"
//               className="shop-categories__item mb-3"
//               onClick={() => onSelectCategory(elm.typeValue)}
//             >
//               <img
//                 loading="lazy"
//                 src={`../src/components/shoplist/images/category-item${selectedPetType}-${elm.typeValue}.png`}
//                 width="120"
//                 height="120"
//                 alt={`Image of ${elm.typeValue}`}
//                 className="shop-categories__item-img rounded-circle"
//               />
//               <h6 className="pt-1 mt-3 mt-xl-4 mb-0 text-center">
//                 {getCategoryText(elm.typeValue)}
//               </h6>
//             </a>
//           ))}
//           <a href="#" className="shop-categories__item mb-3">
//             <img
//               loading="lazy"
//               src={`../src/components/shoplist/images/category-item${selectedPetType}-+.png`}
//               width="120"
//               height="120"
//               alt="Image of plus"
//               className="shop-categories__item-img rounded-circle"
//             />
//             <h6 className="pt-1 mt-3 mt-xl-4 mb-0 text-center">
//               {getCategoryText('+')}
//             </h6>
//           </a>
//         </div>
//       </div>
//     </section>
//   );
// }



import { useEffect, useState } from 'react';
import axios from 'axios';
import BASE_URL from '@/utils/globalBaseUrl';

export default function Categories({ onSelectCategory }) {
  const [categories, setCategories] = useState([]);
  const [selectedPetType, setSelectedPetType] = useState('Z');
  const [filteredCategories, setFilteredCategories] = useState([]);

  useEffect(() => {
    axios.get(`${BASE_URL}/bisang/category/type/${selectedPetType}`)
      .then(response => {
        setCategories(response.data);
        setFilteredCategories(response.data);
        console.log("Categories 받아오는 값: ", selectedPetType, response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the categories!", error);
      });
  }, [selectedPetType]);

  useEffect(() => {
    setFilteredCategories(categories);
  }, [categories]);

  const getCategoryText = (typeValue) => {
    switch (typeValue) {
      case 'j': return '주니어';
      case 'a': return '어덜트';
      case 's': return '시니어';
      case 'z': return '전연령';
      case '1': return '사료';
      case '2': return '간식';
      case '3': return '용품';
      case '+': return '더보기';
      default: return typeValue;
    }
  };

  return (
    <section className="full-width_padding" style={{ backgroundColor: "#faf9f8" }}>
      <div className="shop-categories position-relative">
        <div className="mb-4 text-center">
          <button
            className={`btn btn-link ${selectedPetType === 'Z' ? 'active' : ''}`}
            onClick={() => setSelectedPetType('Z')}
          >
            전체
          </button>
          <button
            className={`btn btn-link ${selectedPetType === 'D' ? 'active' : ''}`}
            onClick={() => setSelectedPetType('D')}
          >
            강아지
          </button>
          <button
            className={`btn btn-link ${selectedPetType === 'C' ? 'active' : ''}`}
            onClick={() => setSelectedPetType('C')}
          >
            고양이
          </button>
        </div>

        <div className="shop-categories__list d-flex align-items-center flex-wrap justify-content-center">
          {filteredCategories.map((elm, i) => (
            <a
              key={i}
              href="#"
              className="shop-categories__item mb-3"
              onClick={() => onSelectCategory({ petType: selectedPetType, typeValue: elm.typeValue })}
            >
              <img
                loading="lazy"
                src={`../src/components/shoplist/images/category-item${selectedPetType}-${elm.typeValue}.png`}
                width="120"
                height="120"
                alt={`Image of ${elm.typeValue}`}
                className="shop-categories__item-img rounded-circle"
              />
              <h6 className="pt-1 mt-3 mt-xl-4 mb-0 text-center">
                {getCategoryText(elm.typeValue)}
              </h6>
            </a>
          ))}
          <a href="#" className="shop-categories__item mb-3">
            <img
              loading="lazy"
              src={`../src/components/shoplist/images/category-item${selectedPetType}-+.png`}
              width="120"
              height="120"
              alt="Image of plus"
              className="shop-categories__item-img rounded-circle"
            />
            <h6 className="pt-1 mt-3 mt-xl-4 mb-0 text-center">
              {getCategoryText('+')}
            </h6>
          </a>
        </div>
      </div>
    </section>
  );
}
