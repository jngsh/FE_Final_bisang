import { useState, useEffect } from "react";
import axios from "axios";
import Star from "@/components/common/Star";
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
  if (unit === 'g' || unit === 'ml' || (unit === '개' && value !== 1)) {
    return productPrice / value;
  }
  return null;
};

export default function DiscountSlider() {
  const [discounts, setDiscounts] = useState([]);
  const [products, setProducts] = useState([]);
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

  const today = new Date();

  const activeDiscounts = discounts.filter(discount => {
    const discountStartDate = new Date(discount.startDate);
    const discountEndDate = new Date(discount.endDate);

    return (
      discount.discountRate > 0 &&
      discountStartDate <= today &&
      discountEndDate >= today
    );
  });

  return (
    <section className="discount-carousel container">
      <div className="d-flex align-items-center justify-content-center justify-content-md-between flex-wrap mb-3 pb-xl-2 mb-xl-4 gap-4">
        {activeDiscounts.length > 0 && (
          <h2 className="section-title fw-normal">{t('discountTitle')}</h2>
        )}
      </div>
      <div className="row">
        {activeDiscounts.map(discount => (
          <div key={discount.discountId}>
            <div className="row">
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
                    {productsByDiscount[discount.discountId] && productsByDiscount[discount.discountId].length > 0 && (
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
                            </div>
                            <div className="pc__info position-relative">
                              <h6 className="pc__title">
                                <a href={`/bisang/products/${product.productId}`}>{product.productName}</a>
                              </h6>
                              <div className="product-card__review d-sm-flex align-items-center">
                                <div className="reviews-group d-flex">
                                  <Star productId={product.productId} />
                                </div>
                                <span className="reviews-note text-lowercase text-secondary ms-sm-1">
                                  {product.reviews || "No Reviews"}
                                </span>
                              </div>
                              <div className="product-card__price d-flex flex-column">
                                {unitPrice ? (
                                  <span className="unit-price text-muted fs-6">
                                    1{product.unit} {t('per')} {formatPrice(unitPrice.toFixed(0))}{t('currencyWon')}
                                  </span>
                                ) : (
                                  <br />
                                )}
                                {discountedPrice ? (
                                  <span>
                                    <span className="money price fs-5 text-muted text-decoration-line-through">
                                      {formatPrice(product.productPrice)}{t('currencyWon')}
                                    </span>
                                    <span className="money price fs-5 ms-2">
                                      {formatPrice(discountedPrice)}{t('currencyWon')}
                                    </span>
                                  </span>
                                ) : (
                                  <span className="money price fs-5">
                                    {formatPrice(product.productPrice)}{t('currencyWon')}
                                  </span>
                                )}
                              </div>
                            </div>
                          </SwiperSlide>
                        );
                      })
                    )}
                  </Swiper>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}