import BreadCumb from "./BreadCumb";
import ColorSelection from "../common/ColorSelection";
import Star from "@/components/common/Star";
import Pagination2 from "../common/Pagination2";
import { Link } from "react-router-dom";
import { useContextElement } from "@/context/Context";
import { openModalShopFilter } from "@/utils/aside";
import { sortingOptions } from "@/components/shoplist/data/sorting.js";
import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import Slider from 'rc-slider';
import { closeModalShopFilter } from "@/utils/aside";

const itemPerRow = [2, 3, 4];

const sortProducts = (products, sortBy) => {
  switch (sortBy) {
    case 'price-asc':
      return [...products].sort((a, b) => {
        const priceA = a.discountRate ? a.productPrice * (1 - a.discountRate) : a.productPrice;
        const priceB = b.discountRate ? b.productPrice * (1 - b.discountRate) : b.productPrice;
        return priceA - priceB;
      });
    case 'price-desc':
      return [...products].sort((a, b) => {
        const priceA = a.discountRate ? a.productPrice * (1 - a.discountRate) : a.productPrice;
        const priceB = b.discountRate ? b.productPrice * (1 - b.discountRate) : b.productPrice;
        return priceB - priceA;
      });
    case 'newest':
      return [...products].sort((a, b) => new Date(b.createdDate) - new Date(a.createdDate));
    case 'discount':
      return [...products].sort((a, b) => {
        const discountA = a.discountRate || 0;
        const discountB = b.discountRate || 0;
        return discountB - discountA;
      });
    default:
      return products;
  }
};

const formatPrice = (price) => {
  return new Intl.NumberFormat().format(price);
};

const calculateUnitPrice = (product) => {
  const { unit, value, productPrice, discountRate } = product;
  if (unit === 'g' || unit === 'ml' || unit === '개') {
    const discountedPrice = discountRate
              ? productPrice * (1 - discountRate)
              : productPrice;
    return discountedPrice / value;
  }
  return null;
};

export default function SearchedProductList({ searchedProducts }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedColView, setSelectedColView] = useState(2);
  const [priceRange, setPriceRange] = useState([0, 50000]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [sortBy, setSortBy] = useState('newest');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 10;

  const { addProductToCart, isAddedToCartProducts, toggleWishlist, isAddedtoWishlist } = useContextElement();

  useEffect(() => {
    if (searchedProducts) {
      setProducts(searchedProducts);
      setLoading(false);
    } else {
      setLoading(true);
    }
  }, [searchedProducts]);

  useEffect(() => {
    if (products.length === 0) return;

    const newFilteredProducts = products.filter(product => {
      const discountedPrice = product.discountRate
        ? product.productPrice * (1 - product.discountRate)
        : product.productPrice;
      return discountedPrice >= priceRange[0] && discountedPrice <= priceRange[1];
    });

    const sortedProducts = sortProducts(newFilteredProducts, sortBy);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setFilteredProducts(sortedProducts.slice(startIndex, endIndex));

    setTotalPages(Math.ceil(sortedProducts.length / itemsPerPage));
  }, [priceRange, products, sortBy, currentPage]);

  const handlePriceChange = (value) => {
    setPriceRange(value);
    setCurrentPage(1);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo(0, 0);
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
    setCurrentPage(1);
  };

  if (loading) {
    return <p>상품 목록을 불러오는 중입니다...</p>;
  }

  return (
    <section className="shop-main container d-flex pt-4 pt-xl-5">
      <div className="shop-sidebar side-sticky bg-body">
        <div className="aside-filters aside aside_right" id="shopFilterAside">
          <div className="aside-header d-flex align-items-center">
            <h3 className="text-uppercase fs-6 mb-0">Filter By</h3>
            <button
              onClick={() => closeModalShopFilter()}
              className="btn-close-lg js-close-aside btn-close-aside ms-auto"
            />
          </div>
          <div className="aside-content">
            <div className="accordion" id="price-filters">
              <div className="accordion-item mb-4">
                <h5 className="accordion-header mb-2" id="accordion-heading-price">
                  <button
                    className="accordion-button p-0 border-0 fs-5 text-uppercase"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#accordion-filter-price"
                    aria-expanded="true"
                    aria-controls="accordion-filter-price"
                  >
                    가격
                    <svg className="accordion-button__icon" viewBox="0 0 14 14">
                      <g aria-hidden="true" stroke="none" fillRule="evenodd">
                        <path className="svg-path-vertical" d="M14,6 L14,8 L0,8 L0,6 L14,6" />
                        <path className="svg-path-horizontal" d="M14,6 L14,8 L0,8 L0,6 L14,6" />
                      </g>
                    </svg>
                  </button>
                </h5>
                <div
                  id="accordion-filter-price"
                  className="accordion-collapse collapse show border-0"
                  aria-labelledby="accordion-heading-price"
                  data-bs-parent="#price-filters"
                >
                  <Slider
                    range
                    max={100000}
                    min={0}
                    defaultValue={priceRange}
                    onChange={handlePriceChange}
                    id="slider"
                  />
                  <div className="price-range__info d-flex align-items-center mt-2">
                    <div className="me-auto">
                      <span className="text-secondary">최소 금액: </span>
                      <span className="price-range__min">{priceRange[0]}원</span>
                    </div>
                    <div>
                      <span className="text-secondary">최대 금액: </span>
                      <span className="price-range__max">{priceRange[1]}원</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
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
              onChange={handleSortChange}
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
                  className={`btn-link fw-medium me-2 js-cols-size ${selectedColView === elm ? 'btn-link_active' : ''}`}
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
                  가격 필터
                </span>
              </button>
            </div>
          </div>
        </div>

        <div className={`products-grid row row-cols-2 row-cols-md-3  row-cols-lg-${selectedColView}`} id="products-grid">
          {filteredProducts.map((product, i) => {
            const { discountRate, productPrice } = product;
            const discountedPrice = discountRate
              ? productPrice * (1 - discountRate)
              : productPrice;
            const unitPrice = calculateUnitPrice(product);
            return (
              <div key={i} className="product-card-wrapper">
                <div className="product-card mb-3 mb-md-4 mb-xxl-5">
                  <div className="pc__img-wrapper">
                    <Swiper
                      className="shop-list-swiper swiper-container background-img js-swiper-slider"
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
                      <span className={`cursor-pointer pc__img-prev ${"prev3" + i} `}>
                        <svg width="7" height="11" viewBox="0 0 7 11" xmlns="http://www.w3.org/2000/svg">
                          <use href="#icon_prev_sm" />
                        </svg>
                      </span>
                      <span className={`cursor-pointer pc__img-next ${"next3" + i} `}>
                        <svg width="7" height="11" viewBox="0 0 7 11" xmlns="http://www.w3.org/2000/svg">
                          <use href="#icon_next_sm" />
                        </svg>
                      </span>
                    </Swiper>
                    <button
                      className="pc__atc btn anim_appear-bottom btn position-absolute border-0 text-uppercase fw-medium js-add-cart js-open-aside"
                      onClick={() => addProductToCart(product.productId)}
                      title={
                        isAddedToCartProducts(product.productId)
                          ? 'Already Added'
                          : 'Add to Cart'
                      }
                    >
                      {isAddedToCartProducts(product.productId)
                        ? 'Already Added'
                        : 'Add To Cart'}
                    </button>
                  </div>

                  <div className="pc__info position-relative">
                    <h6 className="pc__title">
                      <Link to={`/bisang/products/${product.productId}`}>
                        {product.productName}
                      </Link>
                    </h6>
                    <div className="product-card__review d-flex align-items-center">
                      <div className="reviews-group d-flex">
                        <Star stars={product.rating} />
                      </div>
                      <span className="reviews-note text-lowercase text-secondary ms-1">
                        {product.reviews || 'no reviews'}
                      </span>
                    </div>

                    <button
                      className={`pc__btn-wl position-absolute top-0 end-0 bg-transparent border-0 js-add-wishlist ${isAddedtoWishlist(product.productId) ? 'active' : ''}`}
                      onClick={() => toggleWishlist(product.productId)}
                      title="Add To Wishlist"
                    >
                      <svg width="16" height="16" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <use href="#icon_heart" />
                      </svg>
                    </button>
                  </div>
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

        {totalPages > 1 && (
          <Pagination2 totalPages={totalPages} currentPage={currentPage} onPageChange={handlePageChange} />
        )}
      </div>
    </section>
  );
}
