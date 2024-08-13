// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import Star from "@/components/common/Star";
// import { useContextElement } from "@/context/Context";
// import { Link } from "react-router-dom";
// import BASE_URL from "@/utils/globalBaseUrl";

// const filterCategories = ["All", "Dog", "Cat"];
// const productsPerPage = 10;

// export default function Featured() {
//   const { toggleWishlist, isAddedtoWishlist } = useContextElement();
//   const { setQuickViewItem } = useContextElement();
//   const { addProductToCart, isAddedToCartProducts } = useContextElement();

//   const [currentCategory, setCurrentCategory] = useState(filterCategories[0]);
//   const [products, setProducts] = useState([]);
//   const [filtered, setFiltered] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const response = await axios.get(`${BASE_URL}/bisang/home/featured`);
//         setProducts(response.data);
//         setLoading(false);
//       } catch (err) {
//         setError(err);
//         setLoading(false);
//       }
//     };

//     fetchProducts();
//   }, []);

//   useEffect(() => {
//     const today = new Date().toISOString().split('T')[0];
//     let filteredProducts = [];

//     if (currentCategory === "All") {
//       filteredProducts = products;
//     } else {
//       filteredProducts = products.filter(product => product.productCode === currentCategory);
//     }

//     filteredProducts = filteredProducts.map(product => {
//       const { discountId, discountRate, startDate, endDate } = product;
//       let discountedPrice = null;

//       if (discountId >= 2 && startDate <= today && endDate >= today) {
//         discountedPrice = product.productPrice * (1 - discountRate);
//       }

//       return {
//         ...product,
//         discountedPrice,
//       };
//     });

//     setFiltered(filteredProducts.slice(0, productsPerPage));
//   }, [currentCategory, products]);

//   const formatPrice = (price) => {
//     return new Intl.NumberFormat().format(price);
//   };

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>Error fetching data: {error.message}</p>;

//   return (
//     <section className="products-grid">
//       <div className="container">
//         <div className="d-flex align-items-center justify-content-center justify-content-md-between flex-wrap mb-3 pb-xl-2 mb-xl-4 gap-4">
//           <h2 className="section-title fw-normal">Featured Products</h2>

//           <ul className="nav nav-tabs justify-content-center" id="collections-1-tab" role="tablist">
//             {filterCategories.map((category, i) => (
//               <li
//                 onClick={() => setCurrentCategory(category)}
//                 key={i}
//                 className="nav-item"
//                 role="presentation"
//               >
//                 <a className={`nav-link nav-link_underscore ${currentCategory === category ? "active" : ""}`}>
//                   {category}
//                 </a>
//               </li>
//             ))}
//           </ul>
//         </div>

//         <div className="tab-content pt-2" id="collections-2-tab-content">
//           <div className="tab-pane fade show active">
//             <div className="row row-cols-2 row-cols-md-3 row-cols-lg-4 row-cols-xxl-5">
//               {filtered.map((product, i) => (
//                 <div key={i} className="product-card-wrapper mb-2">
//                   <div className="product-card product-card_style9 border rounded-3 mb-3 mb-md-4">
//                     <div className="position-relative pb-3">
//                       <div className="pc__img-wrapper pc__img-wrapper_wide3">
//                         <Link to={`/product1_simple/${product.productId}`}>
//                           <img
//                             loading="lazy"
//                             src={product.productImage}
//                             width="256"
//                             height="201"
//                             alt={product.productName}
//                             className="pc__img"
//                           />
//                         </Link>
//                       </div>
//                       <div className="anim_appear-bottom position-absolute w-100 text-center">
//                         <button
//                           className="btn btn-round btn-hover-red border-0 text-uppercase me-2 js-add-cart js-open-aside"
//                           onClick={() => addProductToCart(product.productId)}
//                           title={isAddedToCartProducts(product.productId) ? "Already Added" : "Add to Cart"}
//                         >
//                           <svg className="d-inline-block" width="14" height="14" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
//                             <use href={isAddedToCartProducts(product.productId) ? "#icon_cart_added" : "#icon_cart"} />
//                           </svg>
//                         </button>
//                         <button
//                           className="btn btn-round btn-hover-red border-0 text-uppercase me-2 js-quick-view"
//                           data-bs-toggle="modal"
//                           data-bs-target="#quickView"
//                           onClick={() => setQuickViewItem(product)}
//                           title="Quick view"
//                         >
//                           <svg className="d-inline-block" width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
//                             <use href="#icon_view" />
//                           </svg>
//                         </button>
//                         <button
//                           className={`btn btn-round btn-hover-red border-0 text-uppercase js-add-wishlist ${isAddedtoWishlist(product.productId) ? "active" : ""}`}
//                           onClick={() => toggleWishlist(product.productId)}
//                           title="Add To Wishlist"
//                         >
//                           <svg width="14" height="14" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
//                             <use href="#icon_heart" />
//                           </svg>
//                         </button>
//                       </div>
//                     </div>

//                     <div className="pc__info position-relative">
//                       <h6 className="pc__title">
//                         <Link to={`/product1_simple/${product.productId}`}>
//                           {product.productName}
//                         </Link>
//                       </h6>
//                       <div className="product-card__review d-sm-flex align-items-center">
//                         <div className="reviews-group d-flex">
//                           <Star stars={product.rating || 0} />
//                         </div>
//                         <span className="reviews-note text-lowercase text-secondary ms-sm-1">
//                           {product.reviews || "no reviews"}
//                         </span>
//                       </div>
//                       <div className="product-card__price d-flex">
//                         {product.discountedPrice ? (
//                           <>
//                             <span className="money price fs-5 text-muted text-decoration-line-through">
//                               {formatPrice(product.productPrice)}원
//                             </span>
//                             <span className="money price fs-5 ms-2">
//                               {formatPrice(product.discountedPrice.toFixed(0))}원
//                             </span>
//                           </>
//                         ) : (
//                           <span className="money price fs-5">
//                             {formatPrice(product.productPrice)}원
//                           </span>
//                         )}
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//             <button>show more</button>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }


import React, { useState, useEffect } from "react";
import axios from "axios";
import Star from "@/components/common/Star";
import { useContextElement } from "@/context/Context";
import { Link } from "react-router-dom";
import BASE_URL from "@/utils/globalBaseUrl";

const filterCategories = ["All", "Dog", "Cat"];
const productsPerPage = 10;

export default function Featured() {
  const { toggleWishlist, isAddedtoWishlist } = useContextElement();
  const { setQuickViewItem } = useContextElement();
  const { addProductToCart, isAddedToCartProducts } = useContextElement();

  const [currentCategory, setCurrentCategory] = useState(filterCategories[0]);
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/bisang/home/featured`);
        setProducts(response.data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    let filteredProducts = [];

    if (currentCategory === "All") {
      filteredProducts = products;
    } else {
      filteredProducts = products.filter(product => product.productCode === currentCategory);
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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error fetching data: {error.message}</p>;

  return (
    <section className="products-grid">
      <div className="container">
        <div className="d-flex align-items-center justify-content-center justify-content-md-between flex-wrap mb-3 pb-xl-2 mb-xl-4 gap-4">
          <h2 className="section-title fw-normal">Featured Products</h2>

          <ul className="nav nav-tabs justify-content-center" id="collections-1-tab" role="tablist">
            {filterCategories.map((category, i) => (
              <li
                onClick={() => setCurrentCategory(category)}
                key={i}
                className="nav-item"
                role="presentation"
              >
                <a className={`nav-link nav-link_underscore ${currentCategory === category ? "active" : ""}`}>
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
                      <div className="anim_appear-bottom position-absolute w-100 text-center">
                        <button
                          className="btn btn-round btn-hover-red border-0 text-uppercase me-2 js-add-cart js-open-aside"
                          onClick={() => addProductToCart(product.productId)}
                          title={isAddedToCartProducts(product.productId) ? "Already Added" : "Add to Cart"}
                        >
                          <svg className="d-inline-block" width="14" height="14" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <use href={isAddedToCartProducts(product.productId) ? "#icon_cart_added" : "#icon_cart"} />
                          </svg>
                        </button>
                        <button
                          className="btn btn-round btn-hover-red border-0 text-uppercase me-2 js-quick-view"
                          data-bs-toggle="modal"
                          data-bs-target="#quickView"
                          onClick={() => setQuickViewItem(product)}
                          title="Quick view"
                        >
                          <svg className="d-inline-block" width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
                            <use href="#icon_view" />
                          </svg>
                        </button>
                        <button
                          className={`btn btn-round btn-hover-red border-0 text-uppercase js-add-wishlist ${isAddedtoWishlist(product.productId) ? "active" : ""}`}
                          onClick={() => toggleWishlist(product.productId)}
                          title="Add To Wishlist"
                        >
                          <svg width="14" height="14" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <use href="#icon_heart" />
                          </svg>
                        </button>
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
                          <Star stars={product.rating || 0} />
                        </div>
                        <span className="reviews-note text-lowercase text-secondary ms-sm-1">
                          {product.reviews || "no reviews"}
                        </span>
                      </div>
                      <div className="product-card__price d-flex flex-column">
                        {product.unitPrice ? (
                          <span className="unit-price text-muted fs-6">
                            1{product.unit}당 {formatPrice(product.unitPrice.toFixed(0))}원
                          </span>
                        ) : (
                          <br />
                        )}
                        {product.discountedPrice ? (
                          <span>
                            <span className="money price fs-5 text-muted text-decoration-line-through">
                              {formatPrice(product.productPrice)}원
                            </span>
                            <span className="money price fs-5 ms-2">
                              {formatPrice(product.discountedPrice.toFixed(0))}원
                            </span>
                          </span>
                        ) : (
                          <span className="money price fs-5">
                            {formatPrice(product.productPrice)}원
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <a href="/shop-5">show more</a>
          </div>
        </div>
      </div>
    </section>
  );
}
