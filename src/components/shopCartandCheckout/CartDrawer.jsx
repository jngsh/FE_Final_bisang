import { Link, useLocation } from "react-router-dom"
import { useContextElement } from "@/context/Context";
import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import BASE_URL from "@/utils/globalBaseUrl";

export default function CartDrawer() {
  const { cartProducts, setCartProducts, totalPrice, setTotalPrice, logined, token } = useContextElement();
  const { cartId } = useContextElement();
  const [loading, setLoading] = useState(true);
  const [localCart, setLocalCart] = useState([]);
  const [checkboxes, setCheckboxes] = useState({
    free_shipping: false,
    flat_rate: false,
    local_pickup: false
  });

  const { pathname } = useLocation();
  const closeCart = () => {
    document
      .getElementById("cartDrawerOverlay")
      .classList.remove("page-overlay_visible");
    document.getElementById("cartDrawer").classList.remove("aside_visible");
  };
  // const setQuantity = (id, quantity) => {
  //   if (quantity >= 1) {
  //     const item = cartProducts.filter((elm) => elm.id == id)[0];
  //     const items = [...cartProducts];
  //     const itemIndex = items.indexOf(item);
  //     item.quantity = quantity;
  //     items[itemIndex] = item;
  //     setCartProducts(items);
  //   }
  // };

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

  // const removeItem = (id) => {
  //   setCartProducts((pre) => [...pre.filter((elm) => elm.id != id)]);
  // };
  // useEffect(() => {
  //   closeCart();
  // }, [pathname]);

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

  useEffect(() => {
    // 로그인 상태가 true일 때만 카트 데이터를 가져옵니다.
    if (logined) {
      const fetchCartProducts = async () => {
        try {
          const response = await axios.get(`${BASE_URL}/bisang/carts/${cartId}/items`, {
            headers: {
              Authorization: token ? `Bearer ${token}` : ''
            }
          });
          console.log("response.data", response.data);
          if (response.data && response.data.length) {
            // 서버에서 가져온 카트 데이터를 상태에 저장합니다.
            setCartProducts(response.data);
          } else {
            // 카트 데이터가 없는 경우 처리
            setCartProducts([]);
          }
        } catch (error) {
          console.error('Error fetching cart products:', error);
          // 오류 처리 (예: 상태 초기화 등)
          setCartProducts([]);
        }
      };
  
      fetchCartProducts();
    }
  }, [logined, token]); // `logined`, `token`이 변경될 때마다 실행
  
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

  return (
    <>
      <div
        className="aside aside_right overflow-hidden cart-drawer "
        id="cartDrawer"
      >
        <div className="aside-header d-flex align-items-center">
          <h3 className="text-uppercase fs-6 mb-0">
            SHOPPING BAG (
            <span className="cart-amount js-cart-items-count">
              {cartProducts.length}
            </span>{" "}
            )
          </h3>
          <button
            onClick={closeCart}
            className="btn-close-lg js-close-aside btn-close-aside ms-auto"
          ></button>
        </div>
        {/* cartProducts에 담긴 게 있으면 보여주고 아니면 문구 띄움 */}
        {cartProducts.length ? (
          <div className="aside-content cart-drawer-items-list">
            {cartProducts.map((item, i) => (
              <React.Fragment key={i}>
                <div className="cart-drawer-item d-flex position-relative">
                  <div className="position-relative">
                    <img
                      loading="lazy"
                      className="cart-drawer-item__img"
                      width={330}
                      height={400}
                      style={{ height: "fit-content" }}
                      src={item.product.productImage}
                      alt={item.product.productName}
                    />
                  </div>
                  <div className="cart-drawer-item__info flex-grow-1">
                    <h6 className="cart-drawer-item__title fw-normal">
                    {item.product.productName}
                    </h6>
                    <p className="cart-drawer-item__option text-secondary">
                      Color: Yellow
                    </p>
                    <p className="cart-drawer-item__option text-secondary">
                      Size: L
                    </p>
                    <div className="d-flex align-items-center justify-content-between mt-1">
                      <div className="qty-control position-relative">
                        <input
                          type="number"
                          name="quantity"
                          onChange={(e) =>
                            setQuantity(item.cartItemId, parseInt(e.target.value, 10))
                          }
                          value={item.amount}
                          min={1}
                          className="qty-control__number border-0 text-center"
                        />
                        <div
                          onClick={() => setQuantity(item.cartItemId, item.amount - 1)}
                          className="qty-control__reduce text-start"
                        >
                          -
                        </div>
                        <div
                          onClick={() => setQuantity(item.cartItemId, item.amount + 1)}
                          className="qty-control__increase text-end"
                        >
                          +
                        </div>
                      </div>

                      <span className="cart-drawer-item__price money price">
                      {item.product.productPrice * item.amount}원
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => removeItem(item.cartItemId)}
                    className="btn-close-xs position-absolute top-0 end-0 js-cart-item-remove"
                  ></button>
                </div>
                {/* <!-- /.cart-drawer-item d-flex --> */}

                <hr className="cart-drawer-divider" />
              </React.Fragment>
            ))}

            {/* <!-- /.cart-drawer-item d-flex --> */}
          </div>
        ) : (
          <div className="fs-18 mt-5 px-5">
            Your cart is empty. Start shopping!
          </div>
        )}
        {/* <!-- /.aside-content --> */}

        <div className="cart-drawer-actions position-absolute start-0 bottom-0 w-100">
          <hr className="cart-drawer-divider" />
          <div className="d-flex justify-content-between">
            <h6 className="fs-base fw-medium">SUBTOTAL:</h6>
            <span className="cart-subtotal fw-medium">{totalPrice}원</span>
          </div>
          {/* <!-- /.d-flex justify-content-between --> */}
          {cartProducts.length ? (
            <>
              <Link to={`/shop_cart/${cartId}`} className="btn btn-light mt-3 d-block">
                View Cart
              </Link>
              <Link
                to="/shop_checkout"
                className="btn btn-primary mt-3 d-block"
              >
                Checkout
              </Link>
            </>
          ) : (
            <Link to="/shop-5" className="btn btn-light mt-3 d-block">
              Explore shop
            </Link>
          )}
        </div>
        {/* <!-- /.aside-content --> */}
      </div>
      <div
        id="cartDrawerOverlay"
        onClick={closeCart}
        className="page-overlay"
      ></div>
    </>
  );
}
