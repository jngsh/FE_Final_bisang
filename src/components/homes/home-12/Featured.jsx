import React, { useState, useEffect } from "react";
import axios from "axios";
import Star from "@/components/common/Star";
import { Link } from "react-router-dom";
import BASE_URL from "@/utils/globalBaseUrl";
import { useTranslation } from 'react-i18next';

export default function Featured() {
  const { t } = useTranslation();
  const filterCategories = [t("category_pet_A"), t("category_pet_D"), t("category_pet_C"), t("category_pet_Z")];
  const [currentCategory, setCurrentCategory] = useState(filterCategories[0]);
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [productsPerPage, setProductsPerPage] = useState(12);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;

      if (width >= 1200) {
        setProductsPerPage(15);
      } else {
        setProductsPerPage(12);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    setCurrentCategory(filterCategories[0]);
  }, [t]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/bisang/home/featured`);
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    let filteredProducts = [];

    const categoryMap = {
      "D": t("category_pet_D"),
      "C": t("category_pet_C"),
      "Z": t("category_pet_Z")
    };

    if (currentCategory === t("category_pet_A")) {
      filteredProducts = products;

    } else {
      filteredProducts = products.filter(product => {
        const productFirstChar = product.productCode.charAt(0);

        const selectedCategoryKey = Object.keys(categoryMap).find(
          key => categoryMap[key] === currentCategory
        );

        return productFirstChar === selectedCategoryKey;
      });

    }

    filteredProducts = filteredProducts.map(product => {
      const { discountId, discountRate, startDate, endDate } = product;
      let discountedPrice = null;

      if (discountId >= 2 && startDate <= today && endDate >= today) {
        discountedPrice = product.productPrice * (1 - discountRate);
      }

      const unitPrice = calculateUnitPrice(product);

      return {
        ...product,
        discountedPrice,
        unitPrice
      };
    });

    setFiltered(filteredProducts.slice(0, productsPerPage));
  }, [currentCategory, products]);

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

  if (loading) return <p></p>;

  return (
    <section className="products-grid">
      <div className="container">
        <div className="category-header d-flex align-items-center justify-content-center justify-content-md-between flex-wrap mb-3 pb-xl-2 mb-xl-4 gap-4">
          <h2 className="section-title fw-normal">{t('featured_products')}</h2>
          <ul className="nav nav-tabs justify-content-center" id="collections-1-tab" role="tablist">
            {filterCategories.map((category, i) => (
              <li
                onClick={() => setCurrentCategory(category)}
                key={i}
                className="nav-item"
                role="presentation"
              >
                <a className={`nav-link nav-link_underscore ${currentCategory === category ? "active" : ""}`}
                  style={{ padding: '5px 20px' }}>
                  {category}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="tab-content pt-2" id="collections-2-tab-content">
          <div className="tab-pane fade show active">
            <div className="row row-cols-2 row-cols-md-3 row-cols-lg-4 row-cols-xxl-5">
              {filtered.map((product, i) => (
                <div key={i} className="product-card-wrapper mb-2">
                  <div className="product-card product-card_style9 border rounded-3 mb-3 mb-md-4">
                    <div className="position-relative pb-3">
                      <div className="pc__img-wrapper pc__img-wrapper_wide3">
                        <Link to={`/bisang/products/${product.productId}`}>
                          <img
                            loading="lazy"
                            src={product.productImage}
                            width="256"
                            height="201"
                            alt={product.productName}
                            className="pc__img"
                          />
                        </Link>
                      </div>
                    </div>

                    <div className="pc__info position-relative">
                      <h6 className="pc__title">
                        <Link to={`/bisang/products/${product.productId}`}>
                          {product.productName}
                        </Link>
                      </h6>
                      <div className="product-card__review d-sm-flex align-items-center">
                        <div className="reviews-group d-flex">
                          <Star productId={product.productId} />
                        </div>
                        {/* <span className="reviews-note text-lowercase text-secondary ms-sm-1">
                          {product.reviews || "no reviews"}
                        </span> */}
                      </div>
                      <div className="product-card__price d-flex flex-column">
                        {product.unitPrice ? (
                          <span className="unit-price text-muted fs-6">
                            1{product.unit} {t('per')} {formatPrice(product.unitPrice.toFixed(0))}{t('currency_won')}
                          </span>
                        ) : (
                          <br />
                        )}
                        {product.discountedPrice ? (
                          <span>
                            <span className="money price fs-5 text-muted text-decoration-line-through">
                              {formatPrice(product.productPrice)}{t('currency_won')}
                            </span>
                            <span className="money price fs-5 ms-2">
                              {formatPrice(product.discountedPrice.toFixed(0))}{t('currency_won')}
                            </span>
                          </span>
                        ) : (
                          <span className="money price fs-5">
                            {formatPrice(product.productPrice)}{t('currency_won')}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
