import React, { useState, useEffect } from "react";
import axios from "axios";
import Star from "@/components/common/Star";
import { Link } from "react-router-dom";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import BASE_URL from "@/utils/globalBaseUrl";
import { useTranslation } from 'react-i18next';

export default function TopSelling() {
  const [products, setProducts] = useState([]);
  const { t } = useTranslation();

  const swiperOptions = {
    autoplay: {
      delay: 5000,
    },
    modules: [Autoplay, Pagination],
    slidesPerView: 8,
    slidesPerGroup: 1,
    effect: "none",
    loop: false,
    pagination: {
      el: "#top_selling_carousel .slideshow-pagination",
      type: "bullets",
      clickable: true,
    },
    breakpoints: {
      320: {
        slidesPerView: 2,
        slidesPerGroup: 2,
        spaceBetween: 16,
      },
      768: {
        slidesPerView: 3,
        slidesPerGroup: 1,
        spaceBetween: 22,
      },
      992: {
        slidesPerView: 4,
        slidesPerGroup: 1,
        spaceBetween: 28,
      },
      1200: {
        slidesPerView: 5,
        slidesPerGroup: 1,
        spaceBetween: 34,
      },
    },
  };

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/bisang/home/top-selling-products`);
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const formatPrice = (price) => {
    return new Intl.NumberFormat().format(price);
  };

  const getDiscountedPrice = (product) => {
    const today = new Date().toISOString().split('T')[0];
    const { discountId, discountRate, startDate, endDate, productPrice } = product;

    if (discountId >= 2 && startDate <= today && endDate >= today) {
      return productPrice * (1 - discountRate);
    }
    return null;
  };

  const calculateUnitPrice = (product) => {
    const { unit, value, productPrice } = product;
    if (unit === 'g' || unit === 'ml') {
      return productPrice / value;
    }
    return null;
  };

  return (
    <section className="product-carousel container">
      <div className="category-header d-flex align-items-center justify-content-center justify-content-md-between flex-wrap mb-3 pb-xl-2 mb-xl-4 gap-4">
        <h2 className="section-title fw-normal">{t('top_selling_products')}</h2>
        <Link
          className="btn-link btn-link_md default-underline text-uppercase fw-medium"
          to="/shop-5"
        >
          {t('see_all_products')}
        </Link>
      </div>

      <div id="top_selling_carousel" className="position-relative">
        <Swiper
          {...swiperOptions}
          className="swiper-container js-swiper-slider"
        >
          {products.slice(0, 10).map((product, i) => {
            const discountedPrice = getDiscountedPrice(product);
            const unitPrice = calculateUnitPrice(product);

            return (
              <SwiperSlide
                key={i}
                className="swiper-slide product-card product-card_style9 border rounded-3"
              >
                <div className="position-relative pb-3">
                  <div className="pc__img-wrapper pc__img-wrapper_wide3">
                    <Link to={`/bisang/products/${product.productId}`}>
                      <img
                        loading="lazy"
                        src={product.productImage || "No Image"}
                        width="253"
                        height="198"
                        alt={product.productName || "No Name"}
                        className="pc__img"
                      />
                    </Link>
                  </div>
                </div>

                <div className="pc__info position-relative">
                  <h6 className="pc__title">
                    <Link to={`/bisang/products/${product.productId}`}>{product.productName || "No Name"}</Link>
                  </h6>
                  <div className="product-card__review d-sm-flex align-items-center">
                    <div className="reviews-group d-flex">
                      <Star productId={product.productId} />
                    </div>
                    {/* <span className="reviews-note text-lowercase text-secondary ms-sm-1">
                      {product.reviews || "No Reviews"}
                    </span> */}
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
                          {formatPrice(discountedPrice.toFixed(0))}{t('currency_won')}
                        </span>
                      </span>
                    ) : (
                      <span className="money price fs-5">
                        {formatPrice(product.productPrice)}{t('currency_won')}
                      </span>
                    )}
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
        <div className="slideshow-pagination mt-4 d-flex align-items-center justify-content-center"></div>
      </div>
    </section>
  );
}
