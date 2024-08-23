import Star from "@/components/common/Star";
import Pagination2 from "../common/Pagination2";
import { Link } from "react-router-dom";
import { openModalShopFilter } from "@/utils/aside";
import { sortingOptions } from "@/components/shoplist/data/sorting.js";
import { useEffect, useState } from 'react';
import Slider from 'rc-slider';
import { closeModalShopFilter } from "@/utils/aside";

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
  const [priceRange, setPriceRange] = useState([0, 50000]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [sortBy, setSortBy] = useState('newest');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 10;

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
    return <p></p>;
  }

  return (
    <section className="shop-main container d-flex pt-4 pt-xl-5">
      <div className="shop-sidebar side-sticky bg-body">
        <div className="aside-filters aside aside_right" id="shopFilterAside">
          <div className="aside-header d-flex align-items-center">
            <h3 className="text-uppercase fs-6 mb-0">가격 필터</h3>
            <button
              onClick={() => closeModalShopFilter()}
              className="btn-close-lg js-close-aside btn-close-aside ms-auto"
            />
          </div>
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
                      <path
                        className="svg-path-vertical"
                        d="M14,6 L14,8 L0,8 L0,6 L14,6"
                      />
                      <path
                        className="svg-path-horizontal"
                        d="M14,6 L14,8 L0,8 L0,6 L14,6"
                      />
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
                  onChange={(value) => handlePriceChange(value)}
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
      <div className="shop-list flex-grow-1">
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
            <div className="shop-filter d-flex align-items-center order-0 order-md-3">
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
        <div className="products-grid row row-cols-2 row-cols-sm-3 row-cols-md-4 row-cols-lg-5">
          {filteredProducts.slice(0, itemsPerPage).map((product, i) => {
            const { discountRate, productPrice } = product;
            const discountedPrice = discountRate
              ? productPrice * (1 - discountRate)
              : productPrice;
            const unitPrice = calculateUnitPrice(product);
            return (
              <div key={i} className="product-card-wrapper">
                <div className="product-card mb-3 mb-md-4 mb-xxl-5">
                  <div className="pc__img-wrapper">
                    <Link to={`/bisang/products/${product.productId}`}>
                      <img
                        loading="lazy"
                        src={product.productImage}
                        width="330"
                        height="400"
                        alt={product.productName}
                        className="pc__img"
                      />
                    </Link>
                  </div>

                  <div className="pc__info position-relative">
                    <br />
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
                        {product.reviews || "no reviews"}
                      </span>
                    </div>
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