// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import Star from "@/components/common/Star";
// import { useContextElement } from "@/context/Context";
// import { Link } from "react-router-dom";

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
//         const response = await axios.get("http://localhost:8090/bisang/home/featured");
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
//     let filteredProducts = [];

//     if (currentCategory === "All") {
//       filteredProducts = products;
//     } else {
//       filteredProducts = products.filter(product => product.productCode === currentCategory);
//     }

//     setFiltered(filteredProducts.slice(0, productsPerPage));
//   }, [currentCategory, products]);

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
//                         <span className="money price fs-5">{product.productPrice}원</span>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//             <button>show more</button> {/* 누르면 카테고리 페이지로 이동 */}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }


// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import Star from "@/components/common/Star";
// import { useContextElement } from "@/context/Context";
// import { Link } from "react-router-dom";

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
//   const [discounts, setDiscounts] = useState([]);

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const response = await axios.get("http://localhost:8090/bisang/home/featured");
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
//     const fetchDiscountInfo = async (discountId) => {
//       try {
//         const response = await axios.get(`http://localhost:8090/home/discount-info/${discountId}`);
//         return response.data;
//       } catch (err) {
//         console.error("Error fetching discount info:", err);
//         return null;
//       }
//     };

//     const updateDiscounts = async () => {
//       const newDiscounts = [];
//       for (let product of products) {
//         const discountInfo = await fetchDiscountInfo(product.discountId);
//         if (discountInfo) {
//           const today = new Date();
//           const startDate = new Date(discountInfo.startDate);
//           const endDate = new Date(discountInfo.endDate);

//           if (discountInfo.discountId >= 2 && today >= startDate && today <= endDate) {
//             newDiscounts.push({
//               ...product,
//               discountRate: discountInfo.discountRate
//             });
//           } else {
//             newDiscounts.push(product);
//           }
//         } else {
//           newDiscounts.push(product);
//         }
//       }
//       setDiscounts(newDiscounts);
//     };

//     updateDiscounts();
//   }, [products]);

//   useEffect(() => {
//     let filteredProducts = [];

//     if (currentCategory === "All") {
//       filteredProducts = discounts;
//     } else {
//       filteredProducts = discounts.filter(product => product.productCode === currentCategory);
//     }

//     setFiltered(filteredProducts.slice(0, productsPerPage));
//   }, [currentCategory, discounts]);

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
//               {filtered.map((product, i) => {
//                 const discountedPrice = product.discountRate
//                   ? (product.productPrice * (1 - product.discountRate)).toFixed(0)
//                   : null;
                
//                 return (
//                   <div key={i} className="product-card-wrapper mb-2">
//                     <div className="product-card product-card_style9 border rounded-3 mb-3 mb-md-4">
//                       <div className="position-relative pb-3">
//                         <div className="pc__img-wrapper pc__img-wrapper_wide3">
//                           <Link to={`/product1_simple/${product.productId}`}>
//                             <img
//                               loading="lazy"
//                               src={product.productImage}
//                               width="256"
//                               height="201"
//                               alt={product.productName}
//                               className="pc__img"
//                             />
//                           </Link>
//                         </div>
//                         <div className="anim_appear-bottom position-absolute w-100 text-center">
//                           <button
//                             className="btn btn-round btn-hover-red border-0 text-uppercase me-2 js-add-cart js-open-aside"
//                             onClick={() => addProductToCart(product.productId)}
//                             title={isAddedToCartProducts(product.productId) ? "Already Added" : "Add to Cart"}
//                           >
//                             <svg className="d-inline-block" width="14" height="14" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
//                               <use href={isAddedToCartProducts(product.productId) ? "#icon_cart_added" : "#icon_cart"} />
//                             </svg>
//                           </button>
//                           <button
//                             className="btn btn-round btn-hover-red border-0 text-uppercase me-2 js-quick-view"
//                             data-bs-toggle="modal"
//                             data-bs-target="#quickView"
//                             onClick={() => setQuickViewItem(product)}
//                             title="Quick view"
//                           >
//                             <svg className="d-inline-block" width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
//                               <use href="#icon_view" />
//                             </svg>
//                           </button>
//                           <button
//                             className={`btn btn-round btn-hover-red border-0 text-uppercase js-add-wishlist ${isAddedtoWishlist(product.productId) ? "active" : ""}`}
//                             onClick={() => toggleWishlist(product.productId)}
//                             title="Add To Wishlist"
//                           >
//                             <svg width="14" height="14" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
//                               <use href="#icon_heart" />
//                             </svg>
//                           </button>
//                         </div>
//                       </div>

//                       <div className="pc__info position-relative">
//                         <h6 className="pc__title">
//                           <Link to={`/product1_simple/${product.productId}`}>
//                             {product.productName}
//                           </Link>
//                         </h6>
//                         <div className="product-card__review d-sm-flex align-items-center">
//                           <div className="reviews-group d-flex">
//                             <Star stars={product.rating || 0} />
//                           </div>
//                           <span className="reviews-note text-lowercase text-secondary ms-sm-1">
//                             {product.reviews || "no reviews"}
//                           </span>
//                         </div>
//                         <div className="product-card__price d-flex">
//                           {discountedPrice ? (
//                             <>
//                               <span className="old-price me-2 text-decoration-line-through">{product.productPrice}원</span>
//                               <span className="new-price fs-5">{discountedPrice}원</span>
//                             </>
//                           ) : (
//                             <span className="money price fs-5">{product.productPrice}원</span>
//                           )}
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//             <button>show more</button> {/* 누르면 카테고리 페이지로 이동 */}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import Star from "@/components/common/Star";
// import { useContextElement } from "@/context/Context";
// import { Link } from "react-router-dom";

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
//   const [discounts, setDiscounts] = useState([]);

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const response = await axios.get("http://localhost:8090/bisang/home/featured");
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
//     const fetchDiscountInfo = async (discountId) => {
//       try {
//         const response = await axios.get(`http://localhost:8090/home/discount-info/${discountId}`);
//         return response.data;
//       } catch (err) {
//         console.error("Error fetching discount info:", err);
//         return null;
//       }
//     };

//     const updateDiscounts = async () => {
//       const newDiscounts = [];
//       for (let product of products) {
//         const discountInfo = await fetchDiscountInfo(product.discountId);
//         if (discountInfo) {
//           const today = new Date();
//           const startDate = new Date(discountInfo.startDate);
//           const endDate = new Date(discountInfo.endDate);

//           if (discountInfo.discountId >= 2 && today >= startDate && today <= endDate) {
//             newDiscounts.push({
//               ...product,
//               discountRate: discountInfo.discountRate
//             });
//           } else {
//             newDiscounts.push(product);
//           }
//         } else {
//           newDiscounts.push(product);
//         }
//       }
//       setDiscounts(newDiscounts);
//     };

//     updateDiscounts();
//   }, [products]);

//   useEffect(() => {
//     let filteredProducts = [];

//     if (currentCategory === "All") {
//       filteredProducts = discounts;
//     } else {
//       filteredProducts = discounts.filter(product => product.productCode === currentCategory);
//     }

//     setFiltered(filteredProducts.slice(0, productsPerPage));
//   }, [currentCategory, discounts]);

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
//               {filtered.map((product, i) => {
//                 const discountedPrice = product.discountRate
//                   ? (product.productPrice * (1 - product.discountRate)).toFixed(0)
//                   : null;

//                 return (
//                   <div key={i} className="product-card-wrapper mb-2">
//                     <div className="product-card product-card_style9 border rounded-3 mb-3 mb-md-4">
//                       <div className="position-relative pb-3">
//                         <div className="pc__img-wrapper pc__img-wrapper_wide3">
//                           <Link to={`/product1_simple/${product.productId}`}>
//                             <img
//                               loading="lazy"
//                               src={product.productImage}
//                               width="256"
//                               height="201"
//                               alt={product.productName}
//                               className="pc__img"
//                             />
//                           </Link>
//                         </div>
//                         <div className="anim_appear-bottom position-absolute w-100 text-center">
//                           <button
//                             className="btn btn-round btn-hover-red border-0 text-uppercase me-2 js-add-cart js-open-aside"
//                             onClick={() => addProductToCart(product.productId)}
//                             title={isAddedToCartProducts(product.productId) ? "Already Added" : "Add to Cart"}
//                           >
//                             <svg className="d-inline-block" width="14" height="14" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
//                               <use href={isAddedToCartProducts(product.productId) ? "#icon_cart_added" : "#icon_cart"} />
//                             </svg>
//                           </button>
//                           <button
//                             className="btn btn-round btn-hover-red border-0 text-uppercase me-2 js-quick-view"
//                             data-bs-toggle="modal"
//                             data-bs-target="#quickView"
//                             onClick={() => setQuickViewItem(product)}
//                             title="Quick view"
//                           >
//                             <svg className="d-inline-block" width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
//                               <use href="#icon_view" />
//                             </svg>
//                           </button>
//                           <button
//                             className={`btn btn-round btn-hover-red border-0 text-uppercase js-add-wishlist ${isAddedtoWishlist(product.productId) ? "active" : ""}`}
//                             onClick={() => toggleWishlist(product.productId)}
//                             title="Add To Wishlist"
//                           >
//                             <svg width="14" height="14" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
//                               <use href="#icon_heart" />
//                             </svg>
//                           </button>
//                         </div>
//                       </div>

//                       <div className="pc__info position-relative">
//                         <h6 className="pc__title">
//                           <Link to={`/product1_simple/${product.productId}`}>
//                             {product.productName}
//                           </Link>
//                         </h6>
//                         <div className="product-card__review d-sm-flex align-items-center">
//                           <div className="reviews-group d-flex">
//                             <Star stars={product.rating || 0} />
//                           </div>
//                           <span className="reviews-note text-lowercase text-secondary ms-sm-1">
//                             {product.reviews || "no reviews"}
//                           </span>
//                         </div>
//                         <div className="product-card__price d-flex">
//                           {discountedPrice ? (
//                             <>
//                               <span className="old-price me-2 text-decoration-line-through">{product.productPrice}원</span>
//                               <span className="new-price fs-5">{discountedPrice}원</span>
//                             </>
//                           ) : (
//                             <span className="money price fs-5">{product.productPrice}원</span>
//                           )}
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//             <button>show more</button> {/* 누르면 카테고리 페이지로 이동 */}
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
  const [discounts, setDiscounts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:8090/bisang/home/featured");
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
    const fetchDiscountInfo = async (discountId) => {
      console.log("Fetching discount info for discountId:", discountId);
      try {
        const response = await axios.get(`http://localhost:8090/home/discount-info`, discountId);
        return response.data;
      } catch (err) {
        console.error("Error fetching discount info:", err);
        return null;
      }
    };

    const updateDiscounts = async () => {
      const newDiscounts = await Promise.all(products.map(async (product) => {
        const discountInfo = await fetchDiscountInfo(product.discountId);
        if (discountInfo) {
          const today = new Date();
          const startDate = new Date(discountInfo.startDate);
          const endDate = new Date(discountInfo.endDate);

          if (discountInfo.discountId >= 2 && today >= startDate && today <= endDate) {
            return { ...product, discountRate: discountInfo.discountRate };
          }
        }
        return product;
      }));

      setDiscounts(newDiscounts);
    };

    updateDiscounts();
  }, [products]);

  useEffect(() => {
    let filteredProducts = [];

    if (currentCategory === "All") {
      filteredProducts = discounts;
    } else {
      filteredProducts = discounts.filter(product => product.productCode === currentCategory);
    }

    setFiltered(filteredProducts.slice(0, productsPerPage));
  }, [currentCategory, discounts]);

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
                key={category}
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
              {filtered.map((product) => {
                const discountedPrice = product.discountRate
                  ? (product.productPrice * (1 - product.discountRate)).toFixed(0)
                  : null;

                return (
                  <div key={product.productId} className="product-card-wrapper mb-2">
                    <div className="product-card product-card_style9 border rounded-3 mb-3 mb-md-4">
                      <div className="position-relative pb-3">
                        <div className="pc__img-wrapper pc__img-wrapper_wide3">
                          <Link to={`/product1_simple/${product.productId}`}>
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
                          <Link to={`/product1_simple/${product.productId}`}>
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
                        <div className="product-card__price d-flex">
                          {discountedPrice ? (
                            <>
                              <span className="old-price me-2 text-decoration-line-through">{product.productPrice}원</span>
                              <span className="new-price fs-5">{discountedPrice}원</span>
                            </>
                          ) : (
                            <span className="money price fs-5">{product.productPrice}원</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <button onClick={() => {/* Add your functionality here */}}>Show More</button>
          </div>
        </div>
      </div>
    </section>
  );
}
