import { useEffect, useState } from "react";
import ProductSlider1 from "./sliders/ProductSlider1";
import BreadCumb from "./BreadCumb";
import Star from "../common/Star";
import Size from "./Size";
import Colors from "./Colors";
import Description from "./Description";
import AdditionalInfo from "./AdditionalInfo";
import Reviews from "./Reviews";
import { Link } from "react-router-dom";
import ShareComponent from "../common/ShareComponent";
import axios from "axios";
import BASE_URL from "@/utils/globalBaseUrl";
import { useContextElement } from "@/context/Context";

// 우리가 쓰는 제품 상세 페이지 !!
// 현아가 페이지 !!!!!!!

export default function SingleProduct10({ productId }) {

  const { cartProducts, setCartProducts } = useContextElement();
  const [quantity, setQuantity] = useState(1);

  // 현아 부분
  const [product1, setProduct1] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  // context에서 cartId 가져오기
  const { cartId } = useContextElement();
  // localStorage에서 가져오기
  // const cartId = localStorage.getItem("cartId");

  // 컴포넌트가 마운트된 후 실행하기 (useEffect())
  useEffect(() => {
    console.log("컴포넌트 마운트됨");
    console.log("cartId : ", cartId);

    // 제품 정보 가져오기
    const fetchProduct = async () => {
      try {
        console.log("productId를 사용하여 데이터 가져오기 시작 >>>", productId);
        const response = await axios.get(`${BASE_URL}/bisang/products/${productId}`,
          {
            headers: {
              'ngrok-skip-browser-warning': true,
            }
          }
        );
        setProduct1(response.data); // Product1에 axios로 가져온 data를 넣어줌
        console.log("fetchProduct: Response >>>", response);
        // console.log(`${BASE_URL}/bisang/products/${productId}`);  
      } catch (error) {
        setError('Failed to fetch product');
        console.error("error>>>", error);
      } finally {
        setLoading(false);
      }
    };

    if (productId) {
      fetchProduct();
    } else {
      console.log("productId가 undefined임");
    }

  }, [productId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;


  // 여기는 메서드들
  const isIncludeCard = () => {
    console.log("cartProducts>>>>>>>>",cartProducts);
    console.log("productId>>>>>>>>",productId);
    const item = cartProducts.filter((elm) => elm.id == productId)[0];
    console.log("item>>>>>>>>", item);
    return item;
  };
  // 카트에 담을 수량 설정
  const setQuantityCartItem = (id, quantity) => {
    if (isIncludeCard()) {
      if (quantity >= 1) {
        const item = cartProducts.filter((elm) => elm.id == id)[0];
        const items = [...cartProducts];
        const itemIndex = items.indexOf(item);
        item.quantity = quantity;
        items[itemIndex] = item;
        // setCartProducts(items);
        setCartProducts((pre) => [...pre, items]);
      }
    } else {
      setQuantity(quantity - 1 ? quantity : 1);
    }
  };

  const addToCart = async () => {
    console.log(">>>>>>> cartId: ", cartId);

    if (cartId !== null) {
        if (!isIncludeCard()) {
            const productIdAsNumber = Number(productId);
            const quantityAsNumber = Number(quantity); // Ensure quantity is a number

            // Log productId and quantity to verify their values
            console.log("ProductId as number: ", productIdAsNumber);
            console.log("Quantity as number: ", quantityAsNumber);

            if (isNaN(productIdAsNumber)) {
                console.error("Invalid productId: Not a number");
                return;
            }

            if (isNaN(quantityAsNumber)) {
                console.error("Invalid quantity: Not a number");
                return;
            }

            setCartProducts((prev) => {
                console.log("Prev cart products before update: ", prev);

                const prevProducts = prev.map(item => ({
                    ...item,
                    productId: Number(item.productId)
                }));

                console.log("Previous cart products after map: ", prevProducts);

                const existingItemIndex = prevProducts.findIndex(
                    (item) => item.productId === productIdAsNumber
                );

                // Additional logs
                console.log("Calculated existingItemIndex: ", existingItemIndex);
                if (existingItemIndex !== -1) {
                    console.log("Matching item found: ", prevProducts[existingItemIndex]);
                } else {
                    console.log("No matching item found.");
                }

                let updatedCart;
                if (existingItemIndex !== -1) {
                  //update
                    updatedCart = prevProducts.map((item, index) =>
                        index === existingItemIndex
                            ? { ...item, quantity: item.quantity + quantityAsNumber } // Use quantityAsNumber
                            : item
                    );
                    console.log("Updated cart after modifying existing item: ", updatedCart);
                    setCartProducts((updatedCart) => {
                      console.log("Cart products after state update: ", updatedCart);
      
                      axios.put(
                          `${BASE_URL}/bisang/carts/items`,
                          {
                              // cartId: cartId,
                              productId: productIdAsNumber,
                              amount: quantityAsNumber, // Use quantityAsNumber
                          },
                          {
                              headers: {
                                  "Content-Type": "application/json",
                                  "ngrok-skip-browser-warning": true,
                              },
                          }
                      )
                      .then(response => {
                          console.log("addToCart: Response >>>>>>> ", response);
                      })
                      .catch(error => {
                          console.error("Failed to add item to cart : ", error);
                      });
      
                      return updatedCart;
                  });
                } else {
                  //insert
                    const newItem = { ...product1, productId: productIdAsNumber, quantity: quantityAsNumber };
                    updatedCart = [...prevProducts, newItem];
                    console.log("Updated cart after adding new item: ", updatedCart);
                    setCartProducts((updatedCart) => {
                      console.log("Cart products after state update: ", updatedCart);
      
                      axios.post(
                          `${BASE_URL}/bisang/carts/items`,
                          {
                              cartId: cartId,
                              productId: productIdAsNumber,
                              amount: quantityAsNumber, // Use quantityAsNumber
                          },
                          {
                              headers: {
                                  "Content-Type": "application/json",
                                  "ngrok-skip-browser-warning": true,
                              },
                          }
                      )
                      .then(response => {
                          console.log("addToCart: Response >>>>>>> ", response);
                      })
                      .catch(error => {
                          console.error("Failed to add item to cart : ", error);
                      });
      
                      return updatedCart;
                  });
                }

                return updatedCart;
            });

          
        }
    } else {
        console.error("cartId is null, cannot add to cart.");
    }
};
  
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('ko-KR', {
      style: 'decimal',
      currency: 'KRW',
    }).format(value);
  };

  return (
    <section className="product-single container product-single__type-9">
      <div className="row">
        {/* 제품 사진 슬라이더 부분 */}
        <div className="col-lg-7">
          {/* <ProductSlider1 /> */}
          <img
            className="h-auto w-100"
            src={product1.productImage}
            width="674"
            height="674"
            alt="image"
          />
        </div>
        <div className="col-lg-5">
          {/* 이 부분은 왜 필요한지 모르겠넴ㅋ */}
          <div className="d-flex justify-content-between mb-4 pb-md-2">
            <div className="breadcrumb mb-0 d-none d-md-block flex-grow-1">
              <BreadCumb />
            </div>

            <div className="product-single__prev-next d-flex align-items-center justify-content-between justify-content-md-end flex-grow-1">
              <a className="text-uppercase fw-medium">
                {/* 이 svg 부분은 < 이 화살표 아이콘 */}
                <svg
                  className="mb-1px"
                  width="10"
                  height="10"
                  viewBox="0 0 25 25"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <use href="#icon_prev_md" />
                </svg>
                <span className="menu-link menu-link_us-s">Prev</span>
              </a>
              <a className="text-uppercase fw-medium">
                <span className="menu-link menu-link_us-s">Next</span>
                {/* 이 svg 부분은 > 이 화살표 아이콘 */}
                <svg
                  className="mb-1px"
                  width="10"
                  height="10"
                  viewBox="0 0 25 25"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <use href="#icon_next_md" />
                </svg>
              </a>
            </div>
          </div>

          {/* 제품명 부분 */}
          {/* <h1 className="product-single__name">{product.title}</h1> */}
          <h1 className="product-single__name">{product1.productName}</h1>

          {/* 별점 부분 */}
          <div className="product-single__rating">
            <div className="reviews-group d-flex">
              <Star stars={5} />
            </div>
            <span className="reviews-note text-lowercase text-secondary ms-1">
              {/* 8k+ reviews */}
            </span>
          </div>

          {/* 제품 가격 부분 */}
          <div className="product-single__price">
            {/* <span className="current-price">${product.price}</span> */}
            <span className="current-price">₩{formatCurrency(product1.productPrice)}</span>
          </div>

          {/* 짧은 제품 상세 설명란 */}
          <div className="product-single__short-desc">
            <p>
              {product1.productDescription}
            </p>
          </div>

          {/* form 태그로 주문 정보들 다 넘기는군 */}
          <form onSubmit={(e) => e.preventDefault()}>
            {/* 여기는 사이즈 선택칸 */}
            <div className="product-single__swatches">
              {/* <div className="product-swatch text-swatches">
                <label>Sizes</label>
                <div className="swatch-list">
                  <Size />
                </div>
                <a
                  href="#"
                  className="sizeguide-link"
                  data-bs-toggle="modal"
                  data-bs-target="#sizeGuide"
                >
                  Size Guide
                </a>
              </div> */}

              {/* 여기는 색상 선택칸 */}
              {/* <div className="product-swatch color-swatches">
                <label>Color</label>
                <div className="swatch-list">
                  <Colors />
                </div>
              </div> */}
            </div>
            <div className="product-single__addtocart">
              <div className="qty-control position-relative">
                <input
                  type="number"
                  name="quantity"
                  value={isIncludeCard() ? isIncludeCard().quantity : quantity}
                  min="1"
                  onChange={(e) =>
                    setQuantityCartItem(productId, e.target.value)
                  }
                  className="qty-control__number text-center"
                />
                <div
                  onClick={() =>
                    setQuantityCartItem(
                      productId,
                      isIncludeCard()?.quantity - 1 || quantity - 1
                    )
                  }
                  className="qty-control__reduce"
                >
                  -
                </div>
                <div
                  onClick={() =>
                    setQuantityCartItem(
                      productId,
                      isIncludeCard()?.quantity + 1 || quantity + 1
                    )
                  }
                  className="qty-control__increase"
                >
                  +
                </div>
              </div>
              {/* 여기는 ADD TO CART 버튼 */}
              <button
                type="button"
                className="btn btn-primary btn-addtocart js-open-aside"
                onClick={() => addToCart()}
              >
                {isIncludeCard() ? "장바구니에 담겼습니다!" : "장바구니에 담기 Add to Cart"}
              </button>
            </div>
          </form>
          {/* 여기에서 form 태그 끝!! */}

          {/* 여기는 ADD TO WISHLIST 부분 */}
          <div className="product-single__addtolinks">
            <a href="#" className="menu-link menu-link_us-s add-to-wishlist">
              <svg
                width="16"
                height="16"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <use href="#icon_heart" />
              </svg>
              <span>좋아요 Add to Wishlist</span>
            </a>
            {/* <ShareComponent title={product.title} /> */}
          </div>
          {/* 밑에 작게 있는 제품 정보칸 */}
          <div className="product-single__meta-info">
            <div className="meta-item">
              <label>제품코드 : </label>
              <span>{product1.productCode}</span>
            </div>
            <div className="meta-item">
              <label>카테고리 :</label>
              <span>{product1.categoryId} </span>
            </div>
            <div className="meta-item">
              <label>Tags:</label>
              {/* <span>biker, black, bomber, leather</span> */}
            </div>
          </div>
          {/* 아코디언란 */}
          <div
            id="product_single_details_accordion"
            className="product-single__details-accordion accordion"
          >
            {/* DESCRIPTION 부분 */}
            <div className="accordion-item">
              <h5 className="accordion-header" id="accordion-heading-11">
                {/* DESCRIPTION 디폴트 닫아져있게 하는 법
                    1. className="accordion-button !!collapsed!!" 로 변경
                    2. aria-expanded="!!false!!" 로 변경
                    3. 밑에 className="accordion-collapse !!collapse!!" 로 변경
                */}
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#accordion-collapse-1"
                  aria-expanded="false"
                  aria-controls="accordion-collapse-1"
                >
                  Description
                  {/* 여기 svg는 +,- 아이콘 */}
                  <svg className="accordion-button__icon" viewBox="0 0 14 14">
                    <g aria-hidden="true" stroke="none" fillRule="evenodd">
                      <path
                        className="svg-path-vertical"
                        d="M14,6 L14,8 L0,8 L0,6 L14,6"
                      ></path>
                      <path
                        className="svg-path-horizontal"
                        d="M14,6 L14,8 L0,8 L0,6 L14,6"
                      ></path>
                    </g>
                  </svg>
                </button>
              </h5>
              <div
                id="accordion-collapse-1"
                className="accordion-collapse collapse"
                aria-labelledby="accordion-heading-11"
                data-bs-parent="#product_single_details_accordion"
              >
                <div className="accordion-body">
                  {/* 이 부분 어떻게 할 지 고민 중 ~.~ */}
                  {/* {product1 && <Description product1={product1} />} */}
                  {product1.productDescription} <br></br>
                  {product1.productDetailedDescription}
                </div>
              </div>
            </div>

            {/* ADDITIONAL INFORMATION 부분 */}
            <div className="accordion-item">
              <h5 className="accordion-header" id="accordion-heading-2">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#accordion-collapse-2"
                  aria-expanded="false"
                  aria-controls="accordion-collapse-2"
                >
                  Additional Information
                  <svg className="accordion-button__icon" viewBox="0 0 14 14">
                    <g aria-hidden="true" stroke="none" fillRule="evenodd">
                      <path
                        className="svg-path-vertical"
                        d="M14,6 L14,8 L0,8 L0,6 L14,6"
                      ></path>
                      <path
                        className="svg-path-horizontal"
                        d="M14,6 L14,8 L0,8 L0,6 L14,6"
                      ></path>
                    </g>
                  </svg>
                </button>
              </h5>
              <div
                id="accordion-collapse-2"
                className="accordion-collapse collapse"
                aria-labelledby="accordion-heading-2"
                data-bs-parent="#product_single_details_accordion"
              >
                <div className="accordion-body">
                  {/* 이 부분 어떻게 할 지 고민 중 ~.~ */}
                  <AdditionalInfo />
                  {product1.productAdditionalInfo}
                </div>
              </div>
            </div>

            {/* REVIEWS 부분 */}
            <div className="accordion-item">
              <h5 className="accordion-header" id="accordion-heading-3">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#accordion-collapse-3"
                  aria-expanded="false"
                  aria-controls="accordion-collapse-3"
                >
                  Reviews (3)
                  <svg className="accordion-button__icon" viewBox="0 0 14 14">
                    <g aria-hidden="true" stroke="none" fillRule="evenodd">
                      <path
                        className="svg-path-vertical"
                        d="M14,6 L14,8 L0,8 L0,6 L14,6"
                      ></path>
                      <path
                        className="svg-path-horizontal"
                        d="M14,6 L14,8 L0,8 L0,6 L14,6"
                      ></path>
                    </g>
                  </svg>
                </button>
              </h5>
              <div
                id="accordion-collapse-3"
                className="accordion-collapse collapse"
                aria-labelledby="accordion-heading-3"
                data-bs-parent="#product_single_details_accordion"
              >
                <div className="accordion-body">
                  <Reviews />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <RelatedSlider productId={productId} product1={product1}/> */}
    </section>
  );
}
