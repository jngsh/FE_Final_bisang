import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import Star from "../common/Star";
import AdditionalInfo from "./AdditionalInfo";
import Reviews from "./Reviews";
import axios from "axios";
import BASE_URL from "@/utils/globalBaseUrl";
import { useContextElement } from "@/context/Context";

export default function SingleProduct({ productId }) {

  const token = localStorage.getItem("token");
  const { cartProducts, setCartProducts } = useContextElement();
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();
  const [product1, setProduct1] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  // context에서 cartId 가져오기
  const { cartId } = useContextElement();

  const [reviewCount, setReviewCount] = useState(0);

  // 컴포넌트가 마운트된 후 실행하기 (useEffect())
  useEffect(() => {
    console.log("컴포넌트 마운트됨");
    console.log("cartId : ", cartId);

    // 제품 정보 가져오기
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/bisang/products/${productId}`,
          {
            headers: {
              'ngrok-skip-browser-warning': true,
            }
          }
        );
        setProduct1(response.data); // Product1에 axios로 가져온 data를 넣어줌
      } catch (error) {
        setError('Failed to fetch product');
        console.error("error>>", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchReviewCount = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/bisang/review/review-count/${productId}`);
        setReviewCount(response.data);
      } catch (error) {
        console.error('Error fetching review count:', error);
      }
    };

    if (productId) {
      fetchProduct();
      fetchReviewCount();
    } else {
      console.log("productId가 undefined임");
    }

  }, [productId]);

  if (loading) return <p></p>;
  if (error) return <p></p>;

  const isIncludeCard = () => {
    console.log("cartProducts>>>>>>>>", cartProducts);
    console.log("productId>>>>>>>>", productId);
    const item = cartProducts.filter((elm) => elm.id == productId)[0];
    console.log("item>>>>>>>>", item);
    return item;
  };
  // 카트에 담을 수량 설정
  const setQuantityCartItem = (id, quantity) => {
    if (isIncludeCard()) {
      if (quantity < 1) return;
        const item = cartProducts.filter((elm) => elm.id == id)[0];
        const items = [...cartProducts];
        const itemIndex = items.indexOf(item);
        item.quantity = quantity;
        items[itemIndex] = item;
        setCartProducts((pre) => [...pre, items]);
      }
      else {
        setQuantity(quantity < 1 ? 1 : quantity);
    }
  };

  const addToCart = async () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (cartId === "null") {
      navigate('/login_register');
      return; // 함수 종료
    }

    if (!isIncludeCard()) {
      const cartIdFromStorage = localStorage.getItem("cartId");
      const productIdAsNumber = Number(productId);
      const quantityAsNumber = Number(quantity);

      if (isNaN(productIdAsNumber) || isNaN(quantityAsNumber)) {
        console.error("Invalid productId or quantity: Not a number");
        return;
      }

      const cartData = JSON.parse(localStorage.getItem("cartProducts")) || [];

      const existingItemIndex = cartData.findIndex(
        (item) => item.productId === productIdAsNumber
      );

      if (existingItemIndex !== -1) {
        const existingItem = cartData[existingItemIndex];
        const updatedAmount = existingItem.amount + quantityAsNumber;

        try {
          const response = await axios.put(
            `${BASE_URL}/bisang/carts/items`,
            {
              cartId: cartIdFromStorage,
              productId: productIdAsNumber,
              amount: updatedAmount,
            },
            {
              headers: {
                "Content-Type": "application/json",
                "ngrok-skip-browser-warning": true,
              },
            }
          );

          existingItem.amount = updatedAmount;
          setCartProducts([...cartData]);

          localStorage.setItem("cartProducts", JSON.stringify(cartData));

          alert("장바구니에 담겼습니다!");
          // Reset quantity to 1
          setQuantity(1);
          // 장바구니에 담은 후 장바구니 화면으로 이동
          // navigate('/shop_cart');

        } catch (error) {
          console.error("Failed to update item in cart : ", error);
        }
      } else {
        const newItem = {
          productId: productIdAsNumber,
          amount: quantityAsNumber,
        };
        cartData.push(newItem);

        console.log("Updated cart after adding new item: ", cartData);

        try {
          const response = await axios.post(
            `${BASE_URL}/bisang/carts/items`,
            {
              cartId: cartIdFromStorage,
              productId: productIdAsNumber,
              amount: quantityAsNumber,
            },
            {
              headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
                "ngrok-skip-browser-warning": true,
              },
            }
          );

          setCartProducts([...cartData]);

          localStorage.setItem("cartProducts", JSON.stringify(cartData));

          alert("장바구니에 담겼습니다!");
          // Reset quantity to 1
          setQuantity(1);
          // 장바구니에 담은 후 장바구니 화면으로 이동
          // navigate('/shop_cart');

        } catch (error) {
          console.error("Failed to add item to cart : ", error);
        }
      }
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
        <div className="col-lg-7">

          <img
            className="h-auto w-100"
            src={product1.productImage}
            width="674"
            height="674"
            alt="image"
          />
        </div>
        <div className="col-lg-5" style={{paddingRight:'30px'}}>
          <div className="d-flex justify-content-between mb-4 pb-md-2"></div>

          <h1 className="product-single__name">{product1.productName}</h1>

          <div className="product-single__rating">
            <div className="reviews-group d-flex">
              <Star productId={product1.productId} />
            </div>
          </div>

          <div className="product-single__price">
            {/* <span className="current-price">${product.price}</span> */}
            <span className="current-price">₩{formatCurrency(product1.productPrice)}</span>
          </div>

          <div className="product-single__short-desc">
            <p>
              {product1.productDescription}
            </p>
          </div>

          <form onSubmit={(e) => e.preventDefault()}>
            <div className="product-single__addtocart">
              <div className="qty-control position-relative">
                <input
                  type="number"
                  name="quantity"
                  value={isIncludeCard() ? isIncludeCard().quantity : quantity}
                  min={1}
                  onChange={(e) =>
                    setQuantityCartItem(productId, parseInt(e.target.value, 10))
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
              <button
                type="button"
                className="btn btn-primary btn-addtocart js-open-aside"
                onClick={() => addToCart()}
              >
                {isIncludeCard() ? "장바구니에 담겼습니다!" : "장바구니에 담기"}
              </button>
            </div>
          </form>

          <div className="product-single__meta-info">
            <div className="meta-item">
              <label>제품코드 : </label>
              <span>{product1.productCode}</span>
            </div>
            <div className="meta-item">
              <label>카테고리 : </label>
              <span>{product1.categoryId} </span>
            </div>
          </div>

            <div
              id="product_single_details_accordion"
              className="product-single__details-accordion accordion"
            >
              <div className="accordion-item">
                <h5 className="accordion-header" id="accordion-heading-11">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#accordion-collapse-1"
                    aria-expanded="false"
                    aria-controls="accordion-collapse-1"
                  >
                    상품상세
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
                    {product1.productDescription} <br></br>
                    {product1.productDetailedDescription}
                  </div>
                </div>
              </div>

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
                    상품정보
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
                    <AdditionalInfo />
                    {product1.productAdditionalInfo}
                  </div>
                </div>
              </div>

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
                    리뷰 ({reviewCount})
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
                    <Reviews productId={productId} reviewCount={reviewCount} />
                  </div>
                </div>
              </div>
            </div>
        </div>
      </div>
    </section >
  );
}
