import Star from "@/components/common/Star";
import { Link } from "react-router-dom";
import { openModalShopFilter } from "@/utils/aside";
import { useEffect, useState } from 'react';
import Slider from 'rc-slider';
import { closeModalShopFilter } from "@/utils/aside";
import Pagination from "../common/Pagination";
import { useTranslation } from 'react-i18next';

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
  if (unit === 'g' || unit === 'ml' || (unit === '개' && value !== 1)) {
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
  const [priceRange, setPriceRange] = useState([0, 1000000]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [sortBy, setSortBy] = useState('newest');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 10;
  const { t } = useTranslation();

  const sortingOptions = [
    { label: t('sortByNew'), value: 'newest' },
    { label: t('sortByDiscount'), value: 'discount' },
    { label: t('sortByPriceAsc'), value: 'price-asc' },
    { label: t('sortByPriceDesc'), value: 'price-desc' }
  ];

  useEffect(() => {
    if (searchedProducts) {
      setProducts(searchedProducts);
      setLoading(false);
    } else {
      setLoading(true);
    }
  }, [searchedProducts], [t]);

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
  }, [priceRange, products, sortBy, currentPage], [t]);

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
            <h3 className="text-uppercase fs-6 mb-0">{t('priceFilter')}</h3>
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
                  {t('price')}
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
                  max={1000000}
                  min={0}
                  defaultValue={priceRange}
                  onChange={(value) => handlePriceChange(value)}
                  id="slider"
                />
                <div className="price-range__info d-flex align-items-center mt-2">
                  <div className="me-auto">
                    <span className="text-secondary">{t('minPrice')}: </span>
                    <span className="price-range__min">{priceRange[0]}{t('currencyWon')}</span>
                  </div>
                  <div>
                    <span className="text-secondary">{t('maxPrice')}: </span>
                    <span className="price-range__max">{priceRange[1]}{t('currencyWon')}</span>
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
                {t('priceFilter')}
              </span>
            </button>
          </div>
        </div>
        <div className="tab-content pt-2" id="collections-2-tab-content">
          <div className="tab-pane fade show active">
            <div className="row row-cols-2 row-cols-md-3 row-cols-lg-4 row-cols-xxl-5">
              {filteredProducts.slice(0, itemsPerPage).map((product, i) => {
                const { discountRate, productPrice } = product;
                const discountedPrice = discountRate
                  ? productPrice * (1 - discountRate)
                  : productPrice;
                const unitPrice = calculateUnitPrice(product);
                return (
                  <div key={i} className="product-card-wrapper mb-2">
                    <div className="product-card product-card_style9 border rounded-3 mb-3 mb-md-4 mb-xxl-5">
                      <div className="position-relative pb-3">
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
                        {new Date(product.createdDate) > new Date().setMonth(new Date().getMonth() - 1) && (
                          <div className="pc-labels position-absolute top-0 start-0 w-100 d-flex justify-content-between">
                            <div className="pc-labels__left">
                              <span className="pc-label pc-label_new d-block bg-white">
                                {t('newProduct')}
                              </span>
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="pc__info position-relative">
                        <h6 className="pc__title">
                          <Link to={`/bisang/products/${product.productId}`}>
                            {product.productName}
                          </Link>
                        </h6>
                        <div className="product-card__review d-flex align-items-center">
                          <div className="reviews-group d-flex">
                            <Star productId={product.productId} />
                          </div>
                        </div>

                        <div className="product-card__price d-flex flex-column">
                          {unitPrice ? (
                            <span className="unit-price text-muted fs-6">
                              1{product.unit} {t('per')} {formatPrice(unitPrice.toFixed(0))}{t('currencyWon')}
                            </span>
                          ) : (
                            <br />
                          )}
                          {discountRate > 0 ? (
                            <span>
                              <span className="money price fs-5 text-muted text-decoration-line-through">
                                {formatPrice(productPrice)}{t('currencyWon')}
                              </span>
                              <span className="money price fs-5 ms-2">
                                {formatPrice(discountedPrice)}{t('currencyWon')}
                              </span>
                            </span>
                          ) : (
                            <span className="money price fs-5">
                              {formatPrice(productPrice)}{t('currencyWon')}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            {totalPages > 1 && (
              <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={handlePageChange} />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}