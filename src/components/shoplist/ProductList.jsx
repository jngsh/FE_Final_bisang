// Todo: 아이템 우선 다 불러오고 code 조건부로 출력하는 게 더 나을 듯

import BreadCumb from "./BreadCumb";
import ColorSelection from "../common/ColorSelection";
import Star from "@/components/common/Star";
import Pagination2 from "../common/Pagination2";
import { Link } from "react-router-dom";
import { useContextElement } from "@/context/Context";
import { openModalShopFilter } from "@/utils/aside";
import { sortingOptions } from "@/data/products/productCategories";
import FilterAll from "./filter/FilterAll";
import { useEffect, useState } from 'react';
import axios from 'axios';
import BASE_URL from '@/utils/globalBaseUrl';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';

const itemPerRow = [2, 3, 4];

const formatPrice = (price) => {
  return new Intl.NumberFormat().format(price);
};
  
const calculateUnitPrice = (product) => {
  const { unit, value, productPrice } = product;
  if (unit === 'g' || unit === 'ml') {
    return productPrice / value;
  }
  return null;
};

export default function ProductList({ petType, typeValue }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedColView, setSelectedColView] = useState(2);

  const { addProductToCart, isAddedToCartProducts, toggleWishlist, isAddedtoWishlist } = useContextElement();

  useEffect(() => {
    if (petType && typeValue) {
      axios.get(`${BASE_URL}/bisang/category/products-list/${petType}/${typeValue}`)
        .then(response => {
          setProducts(response.data);
          setLoading(false);
          console.log(">>>>>>>확인", response.data, petType, typeValue);
        })
        .catch(error => {
          console.error("There was an error fetching the products!", error);
          setLoading(false);
        });
    }
  }, [petType, typeValue]);

  if (loading) {
    return <p>상품 목록을 불러오는 중입니다...</p>;
  }

  return (
    <section className="shop-main container d-flex pt-4 pt-xl-5">
      <div className="shop-sidebar side-sticky bg-body">
        <div
          onClick={openModalShopFilter}
          className="aside-header d-flex d-lg-none align-items-center"
        >
          <h3 className="text-uppercase fs-6 mb-0">Filter By</h3>
          <button className="btn-close-lg js-close-aside btn-close-aside ms-auto"></button>
        </div>

        <div className="pt-4 pt-lg-0"></div>

        <FilterAll />
      </div>

      <div className="shop-list flex-grow-1">
        <div className="d-flex justify-content-between mb-4 pb-md-2">
          <div className="breadcrumb mb-0 d-none d-md-block flex-grow-1">
            <BreadCumb />
          </div>

          <div className="shop-acs d-flex align-items-center justify-content-between justify-content-md-end flex-grow-1">
            <select
              className="shop-acs__select form-select w-auto border-0 py-0 order-1 order-md-0"
              aria-label="Sort Items"
              name="total-number"
            >
              {sortingOptions.map((option, index) => (
                <option key={index} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>

            <div className="shop-asc__seprator mx-3 bg-light d-none d-md-block order-md-0"></div>

            <div className="col-size align-items-center order-1 d-none d-lg-flex">
              <span className="text-uppercase fw-medium me-2">View</span>
              {itemPerRow.map((elm, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedColView(elm)}
                  className={`btn-link fw-medium me-2 js-cols-size ${selectedColView === elm ? "btn-link_active" : ""
                    } `}
                >
                  {elm}
                </button>
              ))}
            </div>

            <div className="shop-filter d-flex align-items-center order-0 order-md-3 d-lg-none">
              <button
                className="btn-link btn-link_f d-flex align-items-center ps-0 js-open-aside"
                onClick={openModalShopFilter}
              >
                <svg
                  className="d-inline-block align-middle me-2"
                  width="14"
                  height="10"
                  viewBox="0 0 14 10"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <use href="#icon_filter" />
                </svg>
                <span className="text-uppercase fw-medium d-inline-block align-middle">
                  Filter
                </span>
              </button>
            </div>
          </div>
        </div>

        <div
          className={`products-grid row row-cols-2 row-cols-md-3  row-cols-lg-${selectedColView}`}
          id="products-grid"
        >
          {products.slice(0, 9).map((product, i) => {
            const { discountRate, productPrice } = product;
            const discountedPrice = discountRate
              ? productPrice * (1 - discountRate) // Apply discount
              : productPrice;
            const unitPrice = calculateUnitPrice(product);
            return (
              <div key={i} className="product-card-wrapper">
                <div className="product-card mb-3 mb-md-4 mb-xxl-5">
                  <div className="pc__img-wrapper">
                    <Swiper
                      className="shop-list-swiper  swiper-container background-img js-swiper-slider"
                      slidesPerView={1}
                      modules={[Navigation]}
                      navigation={{
                        prevEl: `.prev3${i}`,
                        nextEl: `.next3${i}`,
                      }}
                    >
                      {[product.productImage, product.productImage].map((img, index) => (
                        <SwiperSlide key={index} className="swiper-slide">
                          <Link to={`/bisang/products/${product.productId}`}>
                            <img
                              loading="lazy"
                              src={img}
                              width="330"
                              height="400"
                              alt={product.productName}
                              className="pc__img"
                            />
                          </Link>
                        </SwiperSlide>
                      ))}

                      <span
                        className={`cursor-pointer pc__img-prev ${"prev3" + i} `}
                      >
                        <svg
                          width="7"
                          height="11"
                          viewBox="0 0 7 11"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <use href="#icon_prev_sm" />
                        </svg>
                      </span>
                      <span
                        className={`cursor-pointer pc__img-next ${"next3" + i} `}
                      >
                        <svg
                          width="7"
                          height="11"
                          viewBox="0 0 7 11"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <use href="#icon_next_sm" />
                        </svg>
                      </span>
                    </Swiper>
                    <button
                      className="pc__atc btn anim_appear-bottom btn position-absolute border-0 text-uppercase fw-medium js-add-cart js-open-aside"
                      onClick={() => addProductToCart(product.productId)}
                      title={
                        isAddedToCartProducts(product.productId)
                          ? "Already Added"
                          : "Add to Cart"
                      }
                    >
                      {isAddedToCartProducts(product.productId)
                        ? "Already Added"
                        : "Add To Cart"}
                    </button>
                  </div>

                  <div className="pc__info position-relative">
                    <p className="pc__category">{product.categoryId}</p>
                    <h6 className="pc__title">
                      <Link to={`/bisang/products/${product.productId}`}>
                        {product.productName}
                      </Link>
                    </h6>
                    <div className="product-card__price d-flex">
                      {discountRate ? (
                        <>
                          <span className="money price fs-5 text-muted text-decoration-line-through">
                            {productPrice.toFixed(0)}원
                          </span>
                          <span className="money price fs-5 ms-2">
                            {discountedPrice.toFixed(0)}원
                          </span>
                        </>
                      ) : (
                        <span className="money price fs-5">
                          {productPrice.toFixed(0)}원
                        </span>
                      )}
                    </div>
                    {product.colors && (
                      <div className="d-flex align-items-center mt-1">
                        <ColorSelection />
                      </div>
                    )}
                    {product.reviews && (
                      <div className="product-card__review d-flex align-items-center">
                        <div className="reviews-group d-flex">
                          <Star stars={product.rating} />
                        </div>
                        <span className="reviews-note text-lowercase text-secondary ms-1">
                          {product.reviews || "no reviews"}
                        </span>
                      </div>
                    )}

                    <button
                      className={`pc__btn-wl position-absolute top-0 end-0 bg-transparent border-0 js-add-wishlist ${isAddedtoWishlist(product.productId) ? "active" : ""
                        }`}
                      onClick={() => toggleWishlist(product.productId)}
                      title="Add To Wishlist"
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <use href="#icon_heart" />
                      </svg>
                    </button>
                  </div>
                  {/* {product.discountId} 확인용 */}
                  <div className="product-card__price d-flex flex-column">
                    {unitPrice ? (
                      <span className="unit-price text-muted fs-6">
                        1{product.unit}당 {formatPrice(unitPrice.toFixed(0))}원
                      </span>
                    ) : (
                    <br />
                    )}
                    {discountRate > 0 ? (
                      <span>
                        <span className="money price fs-5 text-muted text-decoration-line-through">
                          {formatPrice(productPrice)}원
                        </span>
                        <span className="money price fs-5 ms-2">
                          {formatPrice(discountedPrice)}원
                        </span>
                      </span>
                    ) : (
                      <span className="money price fs-5">
                        {formatPrice(productPrice)}원
                      </span>
                    )}
                    </div>
                  {product.createdDate > '2024-08-01' && (
                    <div className="pc-labels position-absolute top-0 start-0 w-100 d-flex justify-content-between">
                      <div className="pc-labels__left">
                        <span className="pc-label pc-label_new d-block bg-white">
                          NEW
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <Pagination2 />
      </div>
    </section>
  );
}


// 포맷 및 단위가격
// import BreadCumb from "./BreadCumb";
// import ColorSelection from "../common/ColorSelection";
// import Star from "@/components/common/Star";
// import Pagination2 from "../common/Pagination2";
// import { Link } from "react-router-dom";
// import { useContextElement } from "@/context/Context";
// import { openModalShopFilter } from "@/utils/aside";
// import { sortingOptions } from "@/data/products/productCategories";
// import FilterAll from "./filter/FilterAll";
// import { useEffect, useState } from 'react';
// import axios from 'axios';
// import BASE_URL from '@/utils/globalBaseUrl';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Navigation } from 'swiper/modules';

// const itemPerRow = [2, 3, 4];

// const formatPrice = (price) => {
//   return new Intl.NumberFormat().format(price);
// };

// const calculateUnitPrice = (product) => {
//   const { unit, value, productPrice } = product;
//   if (unit === 'g' || unit === 'ml') {
//     return productPrice / value;
//   }
//   return null;
// };

// export default function ProductList({ petType, typeValue }) {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [selectedColView, setSelectedColView] = useState(2);

//   const { addProductToCart, isAddedToCartProducts, toggleWishlist, isAddedtoWishlist } = useContextElement();

//   useEffect(() => {
//     if (petType && typeValue) {
//       axios.get(`${BASE_URL}/bisang/category/products-list/${petType}/${typeValue}`)
//         .then(response => {
//           setProducts(response.data);
//           setLoading(false);
//           console.log(">>>>>>>확인", response.data, petType, typeValue);
//         })
//         .catch(error => {
//           console.error("There was an error fetching the products!", error);
//           setLoading(false);
//         });
//     }
//   }, [petType, typeValue]);

//   if (loading) {
//     return <p>상품 목록을 불러오는 중입니다...</p>;
//   }

//   return (
//     <section className="shop-main container d-flex pt-4 pt-xl-5">
//       <div className="shop-sidebar side-sticky bg-body">
//         <div
//           onClick={openModalShopFilter}
//           className="aside-header d-flex d-lg-none align-items-center"
//         >
//           <h3 className="text-uppercase fs-6 mb-0">Filter By</h3>
//           <button className="btn-close-lg js-close-aside btn-close-aside ms-auto"></button>
//         </div>

//         <div className="pt-4 pt-lg-0"></div>

//         <FilterAll />
//       </div>

//       <div className="shop-list flex-grow-1">
//         <div className="d-flex justify-content-between mb-4 pb-md-2">
//           <div className="breadcrumb mb-0 d-none d-md-block flex-grow-1">
//             <BreadCumb />
//           </div>

//           <div className="shop-acs d-flex align-items-center justify-content-between justify-content-md-end flex-grow-1">
//             <select
//               className="shop-acs__select form-select w-auto border-0 py-0 order-1 order-md-0"
//               aria-label="Sort Items"
//               name="total-number"
//             >
//               {sortingOptions.map((option, index) => (
//                 <option key={index} value={option.value}>
//                   {option.label}
//                 </option>
//               ))}
//             </select>

//             <div className="shop-asc__seprator mx-3 bg-light d-none d-md-block order-md-0"></div>

//             <div className="col-size align-items-center order-1 d-none d-lg-flex">
//               <span className="text-uppercase fw-medium me-2">View</span>
//               {itemPerRow.map((elm, i) => (
//                 <button
//                   key={i}
//                   onClick={() => setSelectedColView(elm)}
//                   className={`btn-link fw-medium me-2 js-cols-size ${selectedColView === elm ? "btn-link_active" : ""
//                     } `}
//                 >
//                   {elm}
//                 </button>
//               ))}
//             </div>

//             <div className="shop-filter d-flex align-items-center order-0 order-md-3 d-lg-none">
//               <button
//                 className="btn-link btn-link_f d-flex align-items-center ps-0 js-open-aside"
//                 onClick={openModalShopFilter}
//               >
//                 <svg
//                   className="d-inline-block align-middle me-2"
//                   width="14"
//                   height="10"
//                   viewBox="0 0 14 10"
//                   fill="none"
//                   xmlns="http://www.w3.org/2000/svg"
//                 >
//                   <use href="#icon_filter" />
//                 </svg>
//                 <span className="text-uppercase fw-medium d-inline-block align-middle">
//                   Filter
//                 </span>
//               </button>
//             </div>
//           </div>
//         </div>

//         <div
//           className={`products-grid row row-cols-2 row-cols-md-3  row-cols-lg-${selectedColView}`}
//           id="products-grid"
//         >
//           {products.slice(0, 9).map((product, i) => {
//             const { discountRate, productPrice } = product;
//             const discountedPrice = discountRate
//               ? (productPrice * (1 - discountRate)).toFixed(0) // Apply discount
//               : productPrice.toFixed(0);
//             const unitPrice = calculateUnitPrice(product);

//             return (
//               <div key={i} className="product-card-wrapper">
//                 <div className="product-card mb-3 mb-md-4 mb-xxl-5">
//                   <div className="pc__img-wrapper">
//                     <Swiper
//                       className="shop-list-swiper  swiper-container background-img js-swiper-slider"
//                       slidesPerView={1}
//                       modules={[Navigation]}
//                       navigation={{
//                         prevEl: `.prev3${i}`,
//                         nextEl: `.next3${i}`,
//                       }}
//                     >
//                       {[product.productImage, product.productImage].map((img, index) => (
//                         <SwiperSlide key={index} className="swiper-slide">
//                           <Link to={`/bisang/products/${product.productId}`}>
//                             <img
//                               loading="lazy"
//                               src={img}
//                               width="330"
//                               height="400"
//                               alt={product.productName}
//                               className="pc__img"
//                             />
//                           </Link>
//                         </SwiperSlide>
//                       ))}

//                       <span
//                         className={`cursor-pointer pc__img-prev ${"prev3" + i} `}
//                       >
//                         <svg
//                           width="7"
//                           height="11"
//                           viewBox="0 0 7 11"
//                           xmlns="http://www.w3.org/2000/svg"
//                         >
//                           <use href="#icon_prev_sm" />
//                         </svg>
//                       </span>
//                       <span
//                         className={`cursor-pointer pc__img-next ${"next3" + i} `}
//                       >
//                         <svg
//                           width="7"
//                           height="11"
//                           viewBox="0 0 7 11"
//                           xmlns="http://www.w3.org/2000/svg"
//                         >
//                           <use href="#icon_next_sm" />
//                         </svg>
//                       </span>
//                     </Swiper>
//                     <button
//                       className="pc__atc btn anim_appear-bottom btn position-absolute border-0 text-uppercase fw-medium js-add-cart js-open-aside"
//                       onClick={() => addProductToCart(product.productId)}
//                       title={
//                         isAddedToCartProducts(product.productId)
//                           ? "Already Added"
//                           : "Add to Cart"
//                       }
//                     >
//                       {isAddedToCartProducts(product.productId)
//                         ? "Already Added"
//                         : "Add To Cart"}
//                     </button>
//                   </div>

//                   <div className="pc__info position-relative">
//                     <p className="pc__category">{product.categoryId}</p>
//                     <h6 className="pc__title">
//                       <Link to={`/bisang/products/${product.productId}`}>
//                         {product.productName}
//                       </Link>
//                     </h6>

//                     <div className="pc__rating mb-2">
//                       <Star />
//                       <span className="pc__rating-count ms-2">({product.productReviewsCount})</span>
//                     </div>
//                     <div className="product-card__price d-flex flex-column">
//                       {unitPrice ? (
//                         <span className="unit-price text-muted fs-6">
//                           1{product.unit}당 {formatPrice(unitPrice.toFixed(0))}원
//                         </span>
//                       ) : (
//                         <br />
//                       )}
//                       {discountRate > 0 ? (
//                         <span>
//                           <span className="money price fs-5 text-muted text-decoration-line-through">
//                             {formatPrice(productPrice)}원
//                           </span>
//                           <span className="money price fs-5 ms-2">
//                             {formatPrice(discountedPrice)}원
//                           </span>
//                         </span>
//                       ) : (
//                         <span className="money price fs-5">
//                           {formatPrice(productPrice)}원
//                         </span>
//                       )}
//                     </div>
                    

//                   <button
//                     className="pc__wishlist btn btn-icon btn-ico-sm ms-auto position-relative border-0"
//                     onClick={() => toggleWishlist(product.productId)}
//                     title={
//                       isAddedtoWishlist(product.productId)
//                         ? "Already Added"
//                         : "Add to Wishlist"
//                     }
//                   >
//                     <svg
//                       className={`d-inline-block ${isAddedtoWishlist(product.productId) ? "text-danger" : ""
//                         }`}
//                       width="16"
//                       height="16"
//                       viewBox="0 0 16 16"
//                       fill="none"
//                       xmlns="http://www.w3.org/2000/svg"
//                     >
//                       <use href="#icon_heart" />
//                     </svg>
//                   </button>
//                 </div>
//               </div>
//               </div>
//         );
//           })}
//       </div>

//       <Pagination2 />
//     </div>
//     </section >
//   );
// }




// 원본
// import BreadCumb from "./BreadCumb";
// // import { products52 } from "@/data/products/fashion";
// import { Navigation } from "swiper/modules";
// // import { SwiperSlide } from "swiper/react";
// import ColorSelection from "../common/ColorSelection";
// import Star from "../common/Star";
// import Pagination2 from "../common/Pagination2";
// // import { Swiper } from "swiper/react";

// // import { useState } from "react";
// import { Link } from "react-router-dom";
// import { useContextElement } from "@/context/Context";

// const itemPerRow = [2, 3, 4];

// import { openModalShopFilter } from "@/utils/aside";
// import { sortingOptions } from "@/data/products/productCategories";
// import FilterAll from "./filter/FilterAll";
// import { useEffect, useState } from 'react';
// import axios from 'axios';
// import BASE_URL from '@/utils/globalBaseUrl';
// import { Swiper, SwiperSlide } from 'swiper/react';
// // import { Navigation } from 'swiper/modules';

// // import BreadCumb from "./BreadCumb";
// // import ColorSelection from "../common/ColorSelection";
// // import Star from "../common/Star";
// // import Pagination2 from "../common/Pagination2";
// // import FilterAll from "./filter/FilterAll";
// // import { useContextElement } from "@/context/Context";
// // import { sortingOptions } from "@/data/products/productCategories";
// // import { Link } from "react-router-dom";

// export default function ProductList({ petType, typeValue }) {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [selectedColView, setSelectedColView] = useState(2);

//   const { addProductToCart, isAddedToCartProducts, toggleWishlist, isAddedtoWishlist } = useContextElement();

//   // const { toggleWishlist, isAddedtoWishlist } = useContextElement();

//   // const { addProductToCart, isAddedToCartProducts } = useContextElement();
//   // const [selectedColView, setSelectedColView] = useState(2);

//   useEffect(() => {
//     if (petType && typeValue) {
//       axios.get(`${BASE_URL}/bisang/category/products-list/${petType}/${typeValue}`)
//         .then(response => {
//           setProducts(response.data);
//           setLoading(false);
//           console.log(">>>>>>>확인", response.data);
//         })
//         .catch(error => {
//           console.error("There was an error fetching the products!", error);
//           setLoading(false);
//         });
//     }
//   }, [petType, typeValue]);

//   if (loading) {
//     return <p>Loading...</p>;
//   }

//   return (
//     <section className="shop-main container d-flex pt-4 pt-xl-5">
//       <div className="shop-sidebar side-sticky bg-body">
//         <div
//           onClick={openModalShopFilter}
//           className="aside-header d-flex d-lg-none align-items-center"
//         >
//           <h3 className="text-uppercase fs-6 mb-0">Filter By</h3>
//           <button className="btn-close-lg js-close-aside btn-close-aside ms-auto"></button>
//         </div>

//         <div className="pt-4 pt-lg-0"></div>

//         <FilterAll />
//       </div>

//       <div className="shop-list flex-grow-1">
//         {/* <!-- /.slideshow --> */}

//         <div className="d-flex justify-content-between mb-4 pb-md-2">
//           <div className="breadcrumb mb-0 d-none d-md-block flex-grow-1">
//             <BreadCumb />
//           </div>
//           {/* <!-- /.breadcrumb --> */}

//           <div className="shop-acs d-flex align-items-center justify-content-between justify-content-md-end flex-grow-1">
//             <select
//               className="shop-acs__select form-select w-auto border-0 py-0 order-1 order-md-0"
//               aria-label="Sort Items"
//               name="total-number"
//             >
//               {sortingOptions.map((option, index) => (
//                 <option key={index} value={option.value}>
//                   {option.label}
//                 </option>
//               ))}
//             </select>

//             <div className="shop-asc__seprator mx-3 bg-light d-none d-md-block order-md-0"></div>

//             <div className="col-size align-items-center order-1 d-none d-lg-flex">
//               <span className="text-uppercase fw-medium me-2">View</span>
//               {itemPerRow.map((elm, i) => (
//                 <button
//                   key={i}
//                   onClick={() => setSelectedColView(elm)}
//                   className={`btn-link fw-medium me-2 js-cols-size ${selectedColView == elm ? "btn-link_active" : ""
//                     } `}
//                 >
//                   {elm}
//                 </button>
//               ))}
//             </div>
//             {/* <!-- /.col-size --> */}

//             <div className="shop-filter d-flex align-items-center order-0 order-md-3 d-lg-none">
//               <button
//                 className="btn-link btn-link_f d-flex align-items-center ps-0 js-open-aside"
//                 onClick={openModalShopFilter}
//               >
//                 <svg
//                   className="d-inline-block align-middle me-2"
//                   width="14"
//                   height="10"
//                   viewBox="0 0 14 10"
//                   fill="none"
//                   xmlns="http://www.w3.org/2000/svg"
//                 >
//                   <use href="#icon_filter" />
//                 </svg>
//                 <span className="text-uppercase fw-medium d-inline-block align-middle">
//                   Filter
//                 </span>
//               </button>
//             </div>
//             {/* <!-- /.col-size d-flex align-items-center ms-auto ms-md-3 --> */}
//           </div>
//           {/* <!-- /.shop-acs --> */}
//         </div>
//         {/* <!-- /.d-flex justify-content-between --> */}

//         <div
//           className={`products-grid row row-cols-2 row-cols-md-3  row-cols-lg-${selectedColView}`}
//           id="products-grid"
//         >
//           {products.slice(0, 9).map((elm, i) => (
//             <div key={i} className="product-card-wrapper">
//               <div className="product-card mb-3 mb-md-4 mb-xxl-5">
//                 <div className="pc__img-wrapper">
//                   <Swiper
//                     className="shop-list-swiper  swiper-container background-img js-swiper-slider"
//                     slidesPerView={1}
//                     modules={[Navigation]}
//                     navigation={{
//                       prevEl: ".prev3" + i,
//                       nextEl: ".next3" + i,
//                     }}
//                   >
//                     {[elm.productImage, elm.productImage].map((elm2, i) => (
//                       <SwiperSlide key={i} className="swiper-slide">
//                         <Link to={`/bisang/products/${elm.productId}`}>
//                           <img
//                             loading="lazy"
//                             src={elm2}
//                             width="330"
//                             height="400"
//                             alt="Cropped Faux leather Jacket"
//                             className="pc__img"
//                           />
//                         </Link>
//                       </SwiperSlide>
//                     ))}

//                     <span
//                       className={`cursor-pointer pc__img-prev ${"prev3" + i} `}
//                     >
//                       <svg
//                         width="7"
//                         height="11"
//                         viewBox="0 0 7 11"
//                         xmlns="http://www.w3.org/2000/svg"
//                       >
//                         <use href="#icon_prev_sm" />
//                       </svg>
//                     </span>
//                     <span
//                       className={`cursor-pointer pc__img-next ${"next3" + i} `}
//                     >
//                       <svg
//                         width="7"
//                         height="11"
//                         viewBox="0 0 7 11"
//                         xmlns="http://www.w3.org/2000/svg"
//                       >
//                         <use href="#icon_next_sm" />
//                       </svg>
//                     </span>
//                   </Swiper>
//                   <button
//                     className="pc__atc btn anim_appear-bottom btn position-absolute border-0 text-uppercase fw-medium js-add-cart js-open-aside"
//                     onClick={() => addProductToCart(elm.productId)}
//                     title={
//                       isAddedToCartProducts(elm.productId)
//                         ? "Already Added"
//                         : "Add to Cart"
//                     }
//                   >
//                     {isAddedToCartProducts(elm.productId)
//                       ? "Already Added"
//                       : "Add To Cart"}
//                   </button>
//                 </div>

//                 <div className="pc__info position-relative">
//                   <p className="pc__category">{elm.categoryId}</p>
//                   <h6 className="pc__title">
//                     <Link to={`/bisang/products/${elm.productId}`}>{elm.productName}</Link>
//                   </h6>
//                   <div className="product-card__price d-flex">
//                     {elm.productPrice ? (
//                       <>
//                         {" "}
//                         <span className="money price price-old">
//                           ${elm.productPrice}
//                         </span>
//                         <span className="money price price-sale">
//                           ${elm.productPrice}
//                         </span>
//                       </>
//                     ) : (
//                       <span className="money price">${elm.productPrice}</span>
//                     )}
//                   </div>
//                   {elm.colors && (
//                     <div className="d-flex align-items-center mt-1">
//                       {" "}
//                       <ColorSelection />{" "}
//                     </div>
//                   )}
//                   {elm.reviews && (
//                     <div className="product-card__review d-flex align-items-center">
//                       <div className="reviews-group d-flex">
//                         <Star stars={elm.rating} />
//                       </div>
//                       <span className="reviews-note text-lowercase text-secondary ms-1">
//                         {elm.reviews || "no reviews"}
//                       </span>
//                     </div>
//                   )}

//                   <button
//                     className={`pc__btn-wl position-absolute top-0 end-0 bg-transparent border-0 js-add-wishlist ${isAddedtoWishlist(elm.id) ? "active" : ""
//                       }`}
//                     onClick={() => toggleWishlist(elm.productId)}
//                     title="Add To Wishlist"
//                   >
//                     <svg
//                       width="16"
//                       height="16"
//                       viewBox="0 0 20 20"
//                       fill="none"
//                       xmlns="http://www.w3.org/2000/svg"
//                     >
//                       <use href="#icon_heart" />
//                     </svg>
//                   </button>
//                 </div>
//                 {elm.discountId && (
//                   <div className="pc-labels position-absolute top-0 start-0 w-100 d-flex justify-content-between">
//                     <div className="pc-labels__right ms-auto">
//                       <span className="pc-label pc-label_sale d-block text-white">
//                         -{elm.discountRate}%
//                       </span>
//                     </div>
//                   </div>
//                 )}
//                 {elm.isNew && (
//                   <div className="pc-labels position-absolute top-0 start-0 w-100 d-flex justify-content-between">
//                     <div className="pc-labels__left">
//                       <span className="pc-label pc-label_new d-block bg-white">
//                         NEW
//                       </span>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </div>
//           ))}
//         </div>
//         {/* <!-- /.products-grid row --> */}

//         <Pagination2 />
//       </div>
//     </section>
//   );
// }