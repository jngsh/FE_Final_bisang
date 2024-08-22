import { useState, useEffect } from "react";
import axios from "axios";
import Star from "@/components/common/Star";
import { useContextElement } from "@/context/Context";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import BASE_URL from "@/utils/globalBaseUrl";
import { useTranslation } from 'react-i18next';

const generateBackgroundColor = (id) => {
  const hash = id * 31;
  const r = (hash & 0xFF0000) >> 16;
  const g = (hash & 0x00FF00) >> 8;
  const b = hash & 0x0000FF;
  return `rgb(${Math.min(r + 50, 255)}, ${Math.min(g + 50, 255)}, ${Math.min(b + 50, 255)})`;
};

const calculateUnitPrice = (product) => {
  const { unit, value, productPrice } = product;
  if (unit === 'g' || unit === 'ml') {
    return productPrice / value;
  }
  return null;
};

export default function DiscountSlider() {
  const [discounts, setDiscounts] = useState([]);
  const [products, setProducts] = useState([]);
  const { toggleWishlist, isAddedtoWishlist } = useContextElement();
  const { setQuickViewItem } = useContextElement();
  const { addProductToCart, isAddedToCartProducts } = useContextElement();
  const { t } = useTranslation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/bisang/home/discounts`);
        const data = response.data;

        const discountMap = {};
        const productList = [];

        data.forEach(item => {
          const { discountId, discountType, discountRate, startDate, endDate, ...product } = item;
          
          if (!discountMap[discountId] && discountRate > 0) {
            discountMap[discountId] = { discountId, discountType, discountRate, startDate, endDate };
          }
          
          if (discountRate > 0) {
            productList.push({ ...product, discountId });
          }
        });

        const discountArray = Object.values(discountMap);

        setDiscounts(discountArray);
        setProducts(productList);

      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchData();
  }, []);

  const formatPrice = (price) => {
    return new Intl.NumberFormat().format(price);
  };

  const swiperOptions = {
    autoplay: {
      delay: 5000,
    },
    modules: [Autoplay],
    slidesPerView: 4,
    slidesPerGroup: 1,
    effect: "none",
    loop: false,
    breakpoints: {
      320: {
        slidesPerView: 1,
        slidesPerGroup: 1,
        spaceBetween: 16,
      },
      768: {
        slidesPerView: 2,
        slidesPerGroup: 1,
        spaceBetween: 22,
      },
      992: {
        slidesPerView: 3,
        slidesPerGroup: 1,
        spaceBetween: 28,
      },
      1200: {
        slidesPerView: 4,
        slidesPerGroup: 1,
        spaceBetween: 34,
      },
    },
  };

  const productsByDiscount = discounts.reduce((acc, discount) => {
    acc[discount.discountId] = products.filter(product => product.discountId === discount.discountId);
    return acc;
  }, {});

  return (
    <section className="discount-carousel container">
      <div className="d-flex align-items-center justify-content-center justify-content-md-between flex-wrap mb-3 pb-xl-2 mb-xl-4 gap-4">
        { !discounts && <h2 className="section-title fw-normal">Discount</h2> }
      </div>
      <div className="row">
        {discounts.map(discount => (
          <div key={discount.discountId}>
            {discount.discountRate > 0 && (
              <>
                <div className="col-sm-6 col-md-4 col-lg-3 col-xl-20per">
                  <div className="position-relative w-100 h-sm-100 border-radius-4 overflow-hidden minh-240 mb-4 mb-sm-0">
                    <div
                      className="background-img"
                      style={{
                        backgroundColor: generateBackgroundColor(discount.discountId),
                      }}
                    ></div>
                    <div className="position-absolute position-center text-white text-center w-100">
                      <h2 className="section-title fw-bold text-white">{(discount.discountRate * 100).toFixed(0)}%</h2>
                      <h3 className="text-white fw-normal">{discount.discountType}</h3>
                      <p>{discount.startDate} - {discount.endDate}</p>
                    </div>
                  </div>
                </div>
                <div className="col-sm-6 col-md-8 col-lg-9 col-xl-80per">
                  <div id={`deals_carousel_${discount.discountId}`} className="position-relative">
                    <Swiper
                      {...swiperOptions}
                      className="swiper-container js-swiper-slider"
                    >
                      {productsByDiscount[discount.discountId] && productsByDiscount[discount.discountId].length > 0 ? (
                        productsByDiscount[discount.discountId].map((product) => {
                          const discountedPrice = (product.productPrice * (1 - discount.discountRate)).toFixed(0);
                          const unitPrice = calculateUnitPrice(product);
                          return (
                            <SwiperSlide
                              key={product.productId}
                              className="swiper-slide product-card product-card_style9 border rounded-3"
                            >
                              <div className="position-relative pb-3">
                                <div className="pc__img-wrapper pc__img-wrapper_wide3">
                                  <a href={`/bisang/products/${product.productId}`}>
                                    <img
                                      loading="lazy"
                                      src={product.productImage}
                                      width="253"
                                      height="198"
                                      alt={product.productName}
                                      className="pc__img"
                                    />
                                  </a>
                                </div>
                                <div className="anim_appear-bottom position-absolute w-100 text-center">
                                  <button
                                    className="btn btn-round btn-hover-red border-0 text-uppercase me-2 js-add-cart js-open-aside"
                                    onClick={() => addProductToCart(product.productId)}
                                    title={
                                      isAddedToCartProducts(product.productId)
                                        ? "Already Added"
                                        : "Add to Cart"
                                    }
                                  >
                                    <svg
                                      className="d-inline-block"
                                      width="14"
                                      height="14"
                                      viewBox="0 0 20 20"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <use
                                        href={`${
                                          isAddedToCartProducts(product.productId)
                                            ? "#icon_cart_added"
                                            : "#icon_cart"
                                        }`}
                                      />
                                    </svg>
                                  </button>
                                  <button
                                    className="btn btn-round btn-hover-red border-0 text-uppercase me-2 js-quick-view"
                                    data-bs-toggle="modal"
                                    data-bs-target="#quickView"
                                    onClick={() => setQuickViewItem(product)}
                                    title="Quick view"
                                  >
                                    <svg
                                      className="d-inline-block"
                                      width="18"
                                      height="18"
                                      viewBox="0 0 18 18"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <use href="#icon_view" />
                                    </svg>
                                  </button>
                                  <button
                                    className={`btn btn-round btn-hover-red border-0 text-uppercase js-add-wishlist ${
                                      isAddedtoWishlist(product.productId) ? "active" : ""
                                    }`}
                                    onClick={() => toggleWishlist(product.productId)}
                                    title="Add To Wishlist"
                                  >
                                    <svg
                                      width="14"
                                      height="14"
                                      viewBox="0 0 20 20"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <use href="#icon_heart" />
                                    </svg>
                                  </button>
                                </div>
                              </div>
                              <div className="pc__info position-relative">
                                <h6 className="pc__title">
                                  <a href={`/bisang/products/${product.productId}`}>{product.productName}</a>
                                </h6>
                                <div className="product-card__review d-sm-flex align-items-center">
                                  <div className="reviews-group d-flex">
                                    <Star stars={product.stars} />
                                  </div>
                                  <span className="reviews-note text-lowercase text-secondary ms-sm-1">
                                    {product.reviews || "No Reviews"}
                                  </span>
                                </div>
                                <div className="product-card__price d-flex flex-column">
                                  {unitPrice ? (
                                    <span className="unit-price text-muted fs-6">
                                      1{product.unit} {t('per')} {formatPrice(unitPrice.toFixed(0))}{t('currency_won')}
                                    </span>
                                  ) : (
                                  <br/>
                                  )}
                                  {discountedPrice ? (
                                    <span>
                                      <span className="money price fs-5 text-muted text-decoration-line-through">
                                        {formatPrice(product.productPrice)}{t('currency_won')}
                                      </span>
                                      <span className="money price fs-5 ms-2">
                                        {formatPrice(discountedPrice)}{t('currency_won')}
                                      </span>
                                    </span>
                                  ) : (
                                    <span className="money price fs-5">
                                      {formatPrice(product.productPrice)}{t('currency_won')}
                                    </span>
                                  )}
                                  {/* <span>
                                    <span className="money price fs-5 text-muted text-decoration-line-through">
                                      {formatPrice(product.productPrice)}원
                                    </span>
                                    <span className="money price fs-5 ms-2">
                                      {formatPrice(discountedPrice)}원
                                    </span>
                                  </span> */}
                                </div>
                              </div>
                            </SwiperSlide>
                          );
                        })
                      ) : (
                        <p>No discounts available.</p>
                      )}
                    </Swiper>
                  </div>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}








// DiscountSDTO 쓰는 방법
// import { useState, useEffect } from "react";
// import axios from "axios";
// import Star from "@/components/common/Star";
// import { useContextElement } from "@/context/Context";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Autoplay } from "swiper/modules";

// // backgroundImage random dark color
// const generateBackgroundColor = (id) => {
//   const hash = id * 31;
//   const r = (hash & 0xFF0000) >> 16;
//   const g = (hash & 0x00FF00) >> 8;
//   const b = hash & 0x0000FF;
//   return `rgb(${Math.min(r + 50, 255)}, ${Math.min(g + 50, 255)}, ${Math.min(b + 50, 255)})`;
// };

// export default function DiscountSlider() {
//   const [discounts, setDiscounts] = useState([]);
//   const { toggleWishlist, isAddedtoWishlist } = useContextElement();
//   const { setQuickViewItem } = useContextElement();
//   const { addProductToCart, isAddedToCartProducts } = useContextElement();

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get('http://localhost:8090/bisang/home/discounts');
//         setDiscounts(response.data);
//       } catch (error) {
//         console.error("Error fetching discounts:", error);
//       }
//     };

//     fetchData();
//   }, []);

//   const formatPrice = (price) => {
//     return new Intl.NumberFormat().format(price);
//   };

//   const swiperOptions = {
//     autoplay: {
//       delay: 5000,
//     },
//     modules: [Autoplay],
//     slidesPerView: 4,
//     slidesPerGroup: 1,
//     effect: "none",
//     loop: false,
//     breakpoints: {
//       320: {
//         slidesPerView: 1,
//         slidesPerGroup: 1,
//         spaceBetween: 16,
//       },
//       768: {
//         slidesPerView: 2,
//         slidesPerGroup: 1,
//         spaceBetween: 22,
//       },
//       992: {
//         slidesPerView: 3,
//         slidesPerGroup: 1,
//         spaceBetween: 28,
//       },
//       1200: {
//         slidesPerView: 4,
//         slidesPerGroup: 1,
//         spaceBetween: 34,
//       },
//     },
//   };

//   return (
//     <section className="discount-carousel container">
//       <div className="d-flex align-items-center justify-content-center justify-content-md-between flex-wrap mb-3 pb-xl-2 mb-xl-4 gap-4">
//         <h2 className="section-title fw-normal">Discount</h2>
//       </div>

//       <div className="row">
//         {discounts.map((discount) => (
//           <div key={discount.discountId}>
//             {discount.discountRate > 0 && (
//               <>
//                 <div className="col-sm-6 col-md-4 col-lg-3 col-xl-20per">
//                   <div className="position-relative w-100 h-sm-100 border-radius-4 overflow-hidden minh-240 mb-4 mb-sm-0">
//                     <div
//                       className="background-img"
//                       style={{
//                         backgroundColor: generateBackgroundColor(discount.discountId),
//                       }}
//                     ></div>
//                     <div className="position-absolute position-center text-white text-center w-100">
//                       <h2 className="section-title fw-bold text-white">{(discount.discountRate * 100).toFixed(0)}%</h2>
//                       <h3 className="text-white fw-normal">{discount.discountType}</h3>
//                       <p>{discount.startDate} - {discount.endDate}</p>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="col-sm-6 col-md-8 col-lg-9 col-xl-80per">
//                   <div id={`deals_carousel_${discount.discountId}`} className="position-relative">
//                     <Swiper
//                       {...swiperOptions}
//                       className="swiper-container js-swiper-slider"
//                     >
//                       {discount.productsList && discount.productsList.length > 0 ? (
//                         discount.productsList.map((product) => {
//                           const discountedPrice = (product.productPrice * (1 - discount.discountRate)).toFixed(0);
//                           return (
//                             <SwiperSlide
//                               key={product.productId}
//                               className="swiper-slide product-card product-card_style9 border rounded-3"
//                             >
//                               <div className="position-relative pb-3">
//                                 <div className="pc__img-wrapper pc__img-wrapper_wide3">
//                                   <a href={`/product1_simple/${product.productId}`}>
//                                     <img
//                                       loading="lazy"
//                                       src={product.productImage}
//                                       width="253"
//                                       height="198"
//                                       alt={product.productName}
//                                       className="pc__img"
//                                     />
//                                   </a>
//                                 </div>
//                                 <div className="anim_appear-bottom position-absolute w-100 text-center">
//                                   <button
//                                     className="btn btn-round btn-hover-red border-0 text-uppercase me-2 js-add-cart js-open-aside"
//                                     onClick={() => addProductToCart(product.productId)}
//                                     title={
//                                       isAddedToCartProducts(product.productId)
//                                         ? "Already Added"
//                                         : "Add to Cart"
//                                     }
//                                   >
//                                     <svg
//                                       className="d-inline-block"
//                                       width="14"
//                                       height="14"
//                                       viewBox="0 0 20 20"
//                                       fill="none"
//                                       xmlns="http://www.w3.org/2000/svg"
//                                     >
//                                       <use
//                                         href={`${
//                                           isAddedToCartProducts(product.productId)
//                                             ? "#icon_cart_added"
//                                             : "#icon_cart"
//                                         }`}
//                                       />
//                                     </svg>
//                                   </button>
//                                   <button
//                                     className="btn btn-round btn-hover-red border-0 text-uppercase me-2 js-quick-view"
//                                     data-bs-toggle="modal"
//                                     data-bs-target="#quickView"
//                                     onClick={() => setQuickViewItem(product)}
//                                     title="Quick view"
//                                   >
//                                     <svg
//                                       className="d-inline-block"
//                                       width="18"
//                                       height="18"
//                                       viewBox="0 0 18 18"
//                                       xmlns="http://www.w3.org/2000/svg"
//                                     >
//                                       <use href="#icon_view" />
//                                     </svg>
//                                   </button>
//                                   <button
//                                     className={`btn btn-round btn-hover-red border-0 text-uppercase js-add-wishlist ${
//                                       isAddedtoWishlist(product.productId) ? "active" : ""
//                                     }`}
//                                     onClick={() => toggleWishlist(product.productId)}
//                                     title="Add To Wishlist"
//                                   >
//                                     <svg
//                                       width="14"
//                                       height="14"
//                                       viewBox="0 0 20 20"
//                                       fill="none"
//                                       xmlns="http://www.w3.org/2000/svg"
//                                     >
//                                       <use href="#icon_heart" />
//                                     </svg>
//                                   </button>
//                                 </div>
//                               </div>
//                               <div className="pc__info position-relative">
//                                 <h6 className="pc__title">
//                                   <a href={`/product1_simple/${product.productId}`}>{product.productName}</a>
//                                 </h6>
//                                 <div className="product-card__review d-sm-flex align-items-center">
//                                   <div className="reviews-group d-flex">
//                                     <Star stars={product.stars} />
//                                   </div>
//                                   <span className="reviews-note text-lowercase text-secondary ms-sm-1">
//                                     {product.reviews || "No Reviews"}
//                                   </span>
//                                 </div>
//                                 <div className="product-card__price d-flex">
//                                   <span className="money price fs-5 text-muted text-decoration-line-through">
//                                     {formatPrice(product.productPrice)}원
//                                   </span>
//                                   <span className="money price fs-5 ms-2">
//                                     {formatPrice(discountedPrice)}원
//                                   </span>
//                                 </div>
//                               </div>
//                             </SwiperSlide>
//                           );
//                         })
//                       ) : (
//                         <p>No discounts available.</p>
//                       )}
//                     </Swiper>
//                   </div>
//                 </div>
//               </>
//             )}
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// }
