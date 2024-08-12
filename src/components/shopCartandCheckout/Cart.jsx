import { useParams, Link } from "react-router-dom";
import { useContextElement } from "@/context/Context";
import { useState, useEffect } from "react";
import axios from "axios";
import BASE_URL from "@/utils/globalBaseUrl";
// import styled from 'styled-components';

export default function Cart() {
  const context = useContextElement();
  if (!context) {
    console.error('Context가 올바르게 제공되지 않았습니다.');
    return <div>오류: Context가 올바르게 제공되지 않았습니다.</div>;
  }

  const { cartProducts, setCartProducts, totalPrice, setTotalPrice } = context;
  const [loading, setLoading] = useState(true);
  const [localCart, setLocalCart] = useState([]);
  const cartId = useParams().cartId;

  useEffect(() => {
    const fetchCartItems = async () => {
      if (!cartId) {
        console.warn("No cartId found.");
        setLoading(false);
        return;
      }

      try {
        const [cartResponse, itemsResponse] = await Promise.all([
          axios.get(`${BASE_URL}/bisang/carts/${cartId}`),
          axios.get(`${BASE_URL}/bisang/carts/${cartId}/items`)
        ]);
        
        const items = itemsResponse.data || [];
        setLocalCart(items);
        setCartProducts(items);

        const calculatedTotalPrice = items.reduce(
          (total, item) => total + (item.amount * item.product.productPrice), 0
        );
        setTotalPrice(calculatedTotalPrice);

        localStorage.setItem('cartProducts', JSON.stringify(items));
      } catch (error) {
        console.error("카트 데이터를 가져오는 중 오류 발생:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCartItems();
  }, [totalPrice]);

  const setQuantity = async (cartItemId, quantity) => {
    if (quantity >= 1) {
      try {
        const response = await axios.put(`${BASE_URL}/bisang/carts/items`, { cartItemId, amount: quantity });       
        const updatedCart = response.data || [];
        setCartProducts(updatedCart);
        setLocalCart(updatedCart);
        localStorage.setItem('cartProducts', JSON.stringify(updatedCart));

        const newTotalPrice = updatedCart.reduce(
          (total, item) => total + (item.amount * item.product.productPrice), 0
        );
        setTotalPrice(newTotalPrice);
      } catch (error) {
        console.error("수량 업데이트 중 오류 발생:", error);
      }
    }
  };

  const removeItem = async (cartItemId) => {
    try {
      const response = await axios.delete(`${BASE_URL}/bisang/carts/items/${cartItemId}`);
      const updatedCart = response.data || [];
      setCartProducts(updatedCart);
      setLocalCart(updatedCart);
      localStorage.setItem('cartProducts', JSON.stringify(updatedCart));

      const newTotalPrice = updatedCart.reduce(
        (total, item) => total + (item.amount * item.product.productPrice), 
        0
      );
      setTotalPrice(newTotalPrice);
    } catch (error) {
      console.error("아이템 삭제 중 오류 발생:", error);
    }
  };

  const updateShippingStatus = async (cartItemId, shipping) => {
    try {
      const response = await axios.put(`${BASE_URL}/bisang/carts/items/shipping`, { cartItemId, shipping });
      const updatedCart = response.data || [];
      setCartProducts(updatedCart);
      setLocalCart(updatedCart);
      localStorage.setItem('cartProducts', JSON.stringify(updatedCart));
    } catch (error) {
      console.error("배송 상태 업데이트 중 오류 발생:", error);
    }
  };

  const handleShippingToggle = (cartItemId, currentStatus) => {
    updateShippingStatus(cartItemId, !currentStatus);
  };

  const [checkboxes, setCheckboxes] = useState({
    free_shipping: false,
    flat_rate: false,
    local_pickup: false,
  });

  const handleCheckboxChange = (event) => {
    const { id, checked } = event.target;
    setCheckboxes((prevCheckboxes) => ({
      ...prevCheckboxes,
      [id]: checked,
    }));
  };

  if (loading) return <div>로딩 중...</div>;

  return (
    <div className="shopping-cart" style={{ minHeight: "calc(100vh - 300px)" }}>
      <div className="cart-table__wrapper">
        {cartProducts.length > 0 ? (
          <>
            <table className="cart-table">
              <thead>
                <tr>
                  <th>상품</th>
                  <th></th>
                  <th>가격</th>
                  <th>수량</th>
                  <th>소계</th>
                  <th>배송 선택</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {cartProducts.map((item, i) => (
                  <tr key={i}>
                    <td>
                      <div className="shopping-cart__product-item">
                        <img
                          loading="lazy"
                          src={item.product.productImage}
                          width="120"
                          height="120"
                          alt={item.product.productName}
                        />
                      </div>
                    </td>
                    <td>
                      <div className="shopping-cart__product-item__detail">
                        <h4>{item.product.productName}</h4>
                      </div>
                    </td>
                    <td>
                      <span className="shopping-cart__product-price">
                        {item.product.productPrice}원
                      </span>
                    </td>
                    <td>
                      <div className="qty-control position-relative">
                        <input
                          type="number"
                          name="quantity"
                          value={item.amount}
                          min={1}
                          onChange={(e) =>
                            setQuantity(item.cartItemId, parseInt(e.target.value, 10))
                          }
                          className="qty-control__number text-center"
                        />
                        <div
                          onClick={() => setQuantity(item.cartItemId, item.amount - 1)}
                          className="qty-control__reduce"
                        >
                          -
                        </div>
                        <div
                          onClick={() => setQuantity(item.cartItemId, item.amount + 1)}
                          className="qty-control__increase"
                        >
                          +
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className="shopping-cart__subtotal">
                        {item.product.productPrice * item.amount}원
                      </span>
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        checked={item.isShipping}
                        onChange={() => handleShippingToggle(item.cartItemId, item.isShipping)}
                      />
                    </td>
                    <td>
                      <a
                        onClick={() => removeItem(item.cartItemId)}
                        className="remove-cart"
                      >
                        <svg
                          width="10"
                          height="10"
                          viewBox="0 0 10 10"
                          fill="#767676"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M0.259435 8.85506L9.11449 0L10 0.885506L1.14494 9.74056L0.259435 8.85506Z" />
                          <path d="M0.885506 0.0889838L9.74057 8.94404L8.85506 9.82955L0 0.97449L0.885506 0.0889838Z" />
                        </svg>
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        ) : (
          <>
            <div className="fs-20">장바구니가 비어 있습니다</div>
            <button className="btn mt-3 btn-light">
              <Link to={"/shop-5"}>상품 보러 가기</Link>
            </button>
          </>
        )}
      </div>
      {cartProducts.length > 0 && (
        <div className="shopping-cart__totals-wrapper">
          <div className="sticky-content">
            <div className="shopping-cart__totals">
              <h3>장바구니 총계</h3>
              <table className="cart-totals">
                <tbody>
                  <tr>
                    <th>소계</th>
                    <td>{totalPrice}원</td>
                  </tr>
                  <tr>
                    <th>배송비</th>
                    <td>
                      <div className="form-check">
                        <input
                          className="form-check-input form-check-input_fill"
                          type="checkbox"
                          id="free_shipping"
                          checked={checkboxes.free_shipping}
                          onChange={handleCheckboxChange}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="free_shipping"
                        >
                          무료 배송
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          className="form-check-input form-check-input_fill"
                          type="checkbox"
                          id="flat_rate"
                          checked={checkboxes.flat_rate}
                          onChange={handleCheckboxChange}
                        />
                        <label className="form-check-label" htmlFor="flat_rate">
                          고정 요금: $49
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          className="form-check-input form-check-input_fill"
                          type="checkbox"
                          id="local_pickup"
                          checked={checkboxes.local_pickup}
                          onChange={handleCheckboxChange}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="local_pickup"
                        >
                          직접 수령: $8
                        </label>
                      </div>
                      <div>배송지: AL.</div>
                      <div>
                        <a href="#" className="menu-link menu-link_us-s">
                          주소 변경
                        </a>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th>총계</th>
                    <td>
                      
                      {49 * (checkboxes.flat_rate ? 1 : 0) +
                        8 * (checkboxes.local_pickup ? 1 : 0) +
                        totalPrice}원
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="mobile_fixed-btn_wrapper">
              <div className="button-wrapper container">
                <button className="btn btn-primary btn-checkout">
                  체크아웃 진행
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
