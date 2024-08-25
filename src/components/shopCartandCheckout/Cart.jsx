import { useParams, Link, useNavigate  } from "react-router-dom";
import { useContextElement } from "@/context/Context";
import { useState, useEffect, useCallback, useMemo, useLayoutEffect } from "react";
import axios from "axios";
import BASE_URL from "@/utils/globalBaseUrl";
import ToggleButton from "@/utils/toggleButton";

//카카오페이
import axiosInstance from '../../utils/globalAxios.js';

export default function Cart() {
  const context = useContextElement();
  if (!context) {
    console.error('Context가 올바르게 제공되지 않았습니다.');
    return <div>오류: Context가 올바르게 제공되지 않았습니다.</div>;
  }

  // context에서 필요한 값을 추출합니다.
  const { cartProducts, setCartProducts, totalPrice, setTotalPrice, logined, token } = context;
  const [loading, setLoading] = useState(true);
  const [localCart, setLocalCart] = useState([]);
  const { cartId } = useContextElement();
  const [checkboxes, setCheckboxes] = useState({
    free_shipping: false,
    flat_rate: false,
    local_pickup: false,
    shipping: false
  });
  const [isUpdating, setIsUpdating] = useState(false);
  

  //배송지
  const userId = localStorage.getItem("userId");
  const [savedData, setSavedData] = useState({
    deliveryName:'',
    address1:'',
    address2: '',
    post: '',
    email1: '',
    email2: '',
    phone1: '',
    phone2: '',
    phone3: ''
  });
  const [formData, setFormData] = useState({
    deliveryName:'',
    address1:'',
    address2: '',
    post: '',
    email1: '',
    email2: '',
    phone1: '',
    phone2: '',
    phone3: ''
  });
  const [shippingStatus, setShippingStatus] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  // useEffect(() => {
  //   const savedCheckboxes = JSON.parse(localStorage.getItem('shippingCheckboxes')) || {};
  //   setCheckboxes(savedCheckboxes);
  // }, []);

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
      if (cartId == "null") {
        setLoading(false);
        navigate(`/login_register`);
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

        // 서버에서 가져온 데이터로 초기화
      const initialCheckboxes = items.reduce((acc, item) => {
        acc[item.cartItemId] = item.shipping || false; // `item.isShipping`을 `item.shipping`으로 변경
        return acc;
      }, {});
      setCheckboxes(initialCheckboxes);
      // console.log("initialCheckboxes", initialCheckboxes);
      // console.log("item", items);
// updateLocalCart(items);      
      localStorage.setItem('cartProducts', JSON.stringify(items));     
      
      } catch (error) {
        console.error("카트 데이터를 가져오는 중 오류 발생:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCartItems();
  }, [totalPrice]);

// 수량 변경 함수
const setQuantity = async (cartId, productId, quantity) => {
  if (quantity < 1) return;

  // UI에 즉시 반영
  const updatedProducts = cartProducts.map((product) =>
    product.productId === productId ? { ...product, amount: quantity } : product
  );

  
  setIsUpdating(true);
  try {
    await axios.put(`${BASE_URL}/bisang/carts/items`, { cartId, productId, amount: quantity });
    console.log("Updating UI with new quantity:", updatedProducts);
    setCartProducts(updatedProducts); // UI 업데이트
    updateLocalCart(updatedProducts); // 로컬스토리지 업데이트
    console.log("서버에서 수량 변경 성공:", quantity);

  } catch (error) {
    console.error("수량 업데이트 중 오류 발생:", error);
    alert("수량 업데이트에 실패했습니다. 다시 시도해주세요.");

    // 서버 오류 시 상태 롤백
    setCartProducts(cartProducts); // 원래 상태로 복구
    updateLocalCart(cartProducts); // 원래 상태로 복구
  } finally {
    setIsUpdating(false);
  }
};

const removeItem = async (cartItemId) => {
  if (isUpdating) return;

  // 삭제 확인 대화 상자
  const userConfirmed = window.confirm("정말 삭제하시겠습니까?");
  if (!userConfirmed) {
    return; // 사용자가 취소를 클릭하면 함수 종료
  }

  // 로컬 상태에서 아이템 제거 (최초 업데이트)
  const updatedProducts = cartProducts.filter((product) => product.cartItemId !== cartItemId);
  
  setIsUpdating(true);
  
  try {
    // 서버 요청
    await axios.delete(`${BASE_URL}/bisang/carts/items/${cartItemId}`);
    console.log("아이템 삭제 성공:", cartItemId);
    
    // 서버 요청이 성공하면 UI와 로컬스토리지 업데이트
    setCartProducts(updatedProducts); // UI 업데이트
    updateLocalCart(updatedProducts); // 로컬스토리지 업데이트

  } catch (error) {
    console.error("아이템 삭제 중 오류 발생:", error);
    
    // 서버 오류 시 상태 롤백
    setCartProducts(cartProducts); // 원래 상태로 복구
    updateLocalCart(cartProducts); // 원래 상태로 복구
  } finally {
    setIsUpdating(false);
  }
};

// 업데이트 로컬 상태 및 로컬스토리지
const updateLocalCart = (updatedProducts) => {
  console.log("Updated local cart products: ", updatedProducts);
  const newTotalPrice = updatedProducts.reduce(
    (total, item) => total + (item.amount * item.product.productPrice), 0
  );
  setTotalPrice(newTotalPrice);
  localStorage.setItem('cartProducts', JSON.stringify(updatedProducts));
  console.log("updated total price: ", newTotalPrice);
};

// cartProducts 상태 변경 감지
useEffect(() => {
  console.log("cartProducts가 변경되었습니다: ", cartProducts);
}, [cartProducts]);

  const updateShippingStatus = useCallback(async (cartItemId, shipping) => {
    try {
      const response = await axios.put(`${BASE_URL}/bisang/carts/items/shipping`, { cartItemId, shipping });
  
      // 서버 응답이 비어 있더라도, 로컬에서 상태를 관리
      const updatedCart = response.data || cartProducts.map(item => 
        item.cartItemId === cartItemId ? { ...item, isShipping: shipping } : item
      );
  
      setCartProducts(updatedCart);
      setLocalCart(updatedCart);
      localStorage.setItem('cartProducts', JSON.stringify(updatedCart));
  
      const newTotalPrice = updatedCart.reduce(
        (total, item) => total + (item.amount * item.product.productPrice),
        0
      );
      setTotalPrice(newTotalPrice);
  
      // 배송 상태를 로컬 스토리지에 저장합니다.
      const newCheckboxes = { ...checkboxes, [cartItemId]: shipping };
      setCheckboxes(newCheckboxes);
      localStorage.setItem('shippingCheckboxes', JSON.stringify(newCheckboxes));
      console.log("newCheckboxes", newCheckboxes);
  
    } catch (error) {
      console.error("배송 상태 업데이트 중 오류 발생:", error.response ? error.response.data : error.message);
    }
  }, [cartProducts, checkboxes, setCartProducts, setTotalPrice]);

  // const handleShippingToggle = async (cartItemId, newStatus) => {
  //   try {
  //     // 서버에 상태 업데이트 요청
  //     await axios.put(`${BASE_URL}/bisang/carts/items/shipping`, {
  //       cartItemId,
  //       shipping: newStatus,
  //     });

  //     // // 체크박스 상태 업데이트
  //     setCheckboxes(prevCheckboxes => ({
  //       ...prevCheckboxes,
  //       [cartItemId]: newStatus,
  //     }));

  //     // 카트 제품 상태 업데이트
  //     const updatedCart = cartProducts.map(item =>
  //       // item.cartItemId === cartItemId ? { ...item, isShipping: newStatus } : item
  //       item.cartItemId === cartItemId ? { ...item, shipping: newStatus } : item
  //     );
  //     setCartProducts(updatedCart);
  //     console.log("updatedCart", updatedCart);
  //   } catch (error) {
  //     console.error("배송 상태 업데이트 중 오류 발생:", error);
  //   }
  // };

  const handleShippingToggle = async (cartItemId, newStatus) => {
    try {
      // 서버에 상태 업데이트 요청
      const response = await axios.put(`${BASE_URL}/bisang/carts/items/shipping`, {
        cartItemId,
        shipping: newStatus,
      });
  
      // 서버에서 응답한 데이터로 로컬 상태 업데이트
      const updatedCart = response.data || cartProducts.map(item =>
        item.cartItemId === cartItemId ? { ...item, shipping: newStatus } : item
      );
  
      setCartProducts(updatedCart);
  
      // 체크박스 상태 업데이트
      setCheckboxes(prevCheckboxes => ({
        ...prevCheckboxes,
        [cartItemId]: newStatus,
      }));
  
      // 총 가격 재계산
      const newTotalPrice = updatedCart.reduce(
        (total, item) => total + (item.amount * item.product.productPrice), 
        0
      );
      setTotalPrice(newTotalPrice);
  
    } catch (error) {
      console.error("배송 상태 업데이트 중 오류 발생:", error);
    }
  };
  
  // 주소
  const Checkout = () =>{
    console.log("cartCheckout:",cartProducts);
    const hasShippedItems = cartProducts.some(item => item.shipping === true);
    console.log("shipping?",hasShippedItems);
    
    if (hasShippedItems){
      setShippingStatus(true);
    } else {
      handleButtonClick();
    }
  };

  //솔님 주소 띄우실 때 사용하세요!!
  useLayoutEffect(()=>{
  
    if (!userId) {
      console.error("userId is not defined");
      console.log('userIderror:', userId);
      return;
    }
    
    else{
    const fetchUserData = async () => {
      try{
        console.log('Fetching user data...'); // 데이터 로드 시작 시 로그
        const response = await axios.get(`${BASE_URL}/bisang/deliveryAddr/${userId}`, {
          headers: {
            Authorization: token ? `Bearer ${token}` : ''
          } 
        });
        if (response.data) {
          console.log('User data fetched:', response.data[0]); // 데이터 로드 성공 시 로그
          setFormData(response.data[0]);
          setSavedData(response.data[0]);
          console.log("formdata:",formData);
        } else {
          console.log('No data found'); // 데이터가 없을 경우 로그
        }
      }catch(error){
        console.error('Error fetching user data:', error);
      }
    };
      fetchUserData();
  }
  }, [userId]);
  
  useLayoutEffect(() => {
    const script = document.createElement("script");
    script.src = "https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
    script.async = true;
    script.onload = () => {
      console.log("Daum Postcode script loaded");
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handlePostcodeSearch = () => {
    if (!window.daum) {
      console.error("Daum Postcode script is not loaded yet");
      return;
    }

    new window.daum.Postcode({
      oncomplete: function (data) {
        let fullAddress = data.roadAddress;
        let extraAddress = "";

        if (data.bname !== "" && /[동|로|가]$/g.test(data.bname)) {
          extraAddress += data.bname;
        }
        if (data.buildingName !== "" && data.apartment === "Y") {
          extraAddress += extraAddress !== "" ? ", " + data.buildingName : data.buildingName;
        }
        if (extraAddress !== "") {
          extraAddress = " (" + extraAddress + ")";
        }
        fullAddress += extraAddress;

        setFormData((prevData) => ({
          ...prevData,
          post: data.zonecode,
          address1: fullAddress,
          address2: ''
        }));
      },
    }).open();
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [id]: value
    }));
  };

  const handleSubmit = (e) =>{
    e.preventDefault();

  };

  const updateDelivery = async() => {

    const updateDeliveryAddr = {...formData};

    try {
      const response = await axios.put(`${BASE_URL}/bisang/deliveryAddr/${userId}`, updateDeliveryAddr, {
        headers: {
          Authorization: token ? `Bearer ${token}` : ''
        }
      });

      if (response.status == 200){
        console.log("주소변경성공",formData);
        setSavedData(formData);
      }else{
        console.log("주소변경실패");
      }
    } catch (error) {
      console.error('Error:',error);
    }
  };

  const handlePageChange = ()=>{
    const  {deliveryName, address1, address2, post, phone1, phone2, phone3} = formData;
    if (!deliveryName || !address1 || !post || !phone1 || !phone2 || !phone3){
      setErrorMessage("정보를 입력해주세요.");
      return ;
    }
    if (
      deliveryName === savedData.deliveryName
      && address1 === savedData.address1
      && address2 === savedData.address2
      && post === savedData.post
      && phone1 === savedData.phone1
      && phone2 === savedData.phone2
      && phone3 === savedData.phone3
    ){
      handleButtonClick();
    } else {
      setErrorMessage("변경하기 버튼을 누른 후 주문해주세요.");
    }
  }
  


  const handleCheckboxChange = (event) => {
    const { id, checked } = event.target;
    setCheckboxes((prevCheckboxes) => ({
      ...prevCheckboxes,
      [id]: checked,
    }));
  };


  //카카오페이버튼
  const handleButtonClick = async () => {
    console.log("버튼눌림");
    let xxx = {'cartId': cartId};
    console.log(xxx);
    try {
      const response = await axiosInstance.post(`/bisang/pay/ready`, JSON.stringify(xxx),
        {
          headers: { //body에 뭐넣을지 미리 알려주는 역할
            "Content-Type": "application/json",
            'Access-Control-Allow-Credentials': true,
            'ngrok-skip-browser-warning': true,

          }
        }
  
      );

      console.log("PaymentResponse:", response.data);
      console.log("그렇다면 이거는? PaymentResponse:", JSON.stringify(response.data, null, 2));

      //모바일/데스크탑 웹 여부에 따라 연결되는 url 선택
      const pcUrl = response.data.next_redirect_pc_url;
      const mobileUrl = response.data.next_redirect_mobile_url;

      const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

      const redirectUrl = isMobile ? mobileUrl : pcUrl;
      // const redirectUrl =pcUrl;
      console.log(">>>>>>>>>>:" + redirectUrl);

      window.location.href = redirectUrl;
    } catch (error) {
      console.error("Error:", error.message);
      if (error.response) {
        console.error('Error data:', error.response.data);
        console.error('Error status:', error.response.status);
      } else if (error.request) {
        console.error('Error request:', error.request);
      }
    }
  };




  const formatCurrency = (value) => {
    return new Intl.NumberFormat('ko-KR', {
      style: 'decimal',
      currency: 'KRW',
    }).format(value);
  };

  // const formatNumberWithCommas = (value) => {
  //   return new Intl.NumberFormat('ko-KR').format(value);
  // };

  const isOverZero = useMemo(()=> {
    return cartProducts.length > 0
  }, [cartProducts])

  const handleNavigation = (productId) => {
    navigate(`/bisang/products/${productId}`);
  };
  
  if (loading) return <div></div>;

  return (
    <div className="shopping-cart" style={{ minHeight: "calc(100vh - 300px)" }}>
      <div className="cart-table__wrapper">
        {isOverZero ? (
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
                    <div
                      className="shopping-cart__product-item"
                      onClick={() => handleNavigation(item.product.productId)}
                      role="button"
                      tabIndex={0}
                    >
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
                    <div
                      className="shopping-cart__product-item__detail"
                      onClick={() => handleNavigation(item.product.productId)}
                      role="button"
                      tabIndex={0}
                    >
                        <h4>{item.product.productName}</h4>
                      </div>
                    </td>
                    <td>
                      <span className="shopping-cart__product-price">
                        {formatCurrency(item.product.productPrice)}원
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
                                      setQuantity(item.cartId, item.productId, parseInt(e.target.value, 10))}
                                    className="qty-control__number text-center"
                                />
                                <div
                                    onClick={() => setQuantity(item.cartId, item.productId, item.amount - 1)}
                                    className="qty-control__reduce"
                                >
                                    -
                                </div>
                                <div
                                    onClick={() => setQuantity(item.cartId, item.productId, item.amount + 1)}
                                    className="qty-control__increase"
                                >
                                    +
                                </div>
                            </div>
                        </td>
                    <td>
                      <span className="shopping-cart__subtotal">
                        {formatCurrency(item.product.productPrice * item.amount)}원
                      </span>
                      

                    </td>
                    
                    <td>
                      <div className="form-check form-switch">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id={`shipping-${item.cartItemId}`}
                          checked={checkboxes[item.cartItemId] || false}
                          // checked={item.shipping}
                          onChange={() => handleShippingToggle(item.cartItemId, !checkboxes[item.cartItemId])}
                        />
                      </div>        
                    </td>
   
{/* <td>
<div class="btn-group btn-group-sm" role="group" aria-label="Basic radio toggle button group">
  <input type="radio" class="btn-check" name="btnradio" id="btnradio1" autocomplete="off" checked/>
  <label class="btn btn-outline-primary" for="btnradio1">배송받기</label>

  <input type="radio" class="btn-check" name="btnradio" id="btnradio2" autocomplete="off"/>
  <label class="btn btn-outline-primary" for="btnradio2">가져가기</label>
</div>
</td> */}
                    {/* <td>
                    <ToggleButton
                      latestSort={item.isShipping}
                      onToggle={() => handleShippingToggle(item.cartItemId, !item.isShipping)}
                    />
                  </td> */}
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
                    <th>총계</th>
                    <td>
                      {formatCurrency(totalPrice)}원
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

                  {/* 배송주소 */}
                  {/* <td> */}
                  {shippingStatus && (
                    <div className="delivery-Address">
                    <form
                        onSubmit={handleSubmit}
                        className="needs-validation"
                      >
                      {/* <div className="delivery-form"> */}
                      <div className="col-md-6">
                        <div className="form-floating my-3">
                          <input
                            type="text"
                            className="form-control"
                            id="deliveryName"
                            placeholder="이름"
                            value={formData.deliveryName}
                            onChange={handleChange}
                          />
                          <label htmlFor="deliveryName">이름</label>
                        </div>
                      </div>
                      <div className="address-form">
                        <div className="address-row">
                        <div className="col-md-6">
                          <div className="form-floating my-3">
                            <input
                              type="text"
                              className="form-control"
                              id="post"
                              value={formData.post}
                              onChange={handleChange}
                              readOnly
                            />
                            <label htmlFor="post">우편주소</label>
                          </div>
                        </div>
                        <button type="button" onClick={handlePostcodeSearch} className="address-btn">주소 찾기</button>
                        </div>

                        <div className="col-md-6">
                          <div className="form-floating my-3">
                            <input
                              type="text"
                              className="form-control"
                              id="address1"
                              value={formData.address1}
                              onChange={handleChange}
                            />
                            <label htmlFor="address1">주소</label>
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="form-floating my-3">
                            <input
                              type="text"
                              className="form-control"
                              id="address2"
                              value={formData.address2}
                              onChange={handleChange}
                            />
                            <label htmlFor="address2">상세주소</label>
                          </div>
                        </div>
                        </div>

                        {/* <div className="email-form">
                          <div className="form-floating my-3">
                            <input
                              type="text"
                              className="form-control"
                              id="email1"
                              value={formData.email1}
                              onChange={handleChange}
                            />
                            <label htmlFor="email1">이메일 1</label>
                          </div>

                          <span className="email-separator">@</span>
                        
                          <div className="form-floating my-3">
                            <input
                              type="text"
                              className="form-control"
                              id="email2"
                              value={formData.email2}
                              onChange={handleChange}
                            />
                          </div>
                        </div> */}

                        <div className="phone-form">
                          <div className="form-floating my-3">
                            <select
                              type="number"
                              className="form-control"
                              id="phone1"
                              value={formData.phone1}
                              onChange={handleChange}
                            >
                            <option value="010">010</option>
                            <option value="011">011</option>
                            </select>
                            <label htmlFor="phone1">전화번호</label>
                          </div>

                          <span className="phone-seperator">-</span>

                          <div className="form-floating my-3">
                            <input
                              type="number"
                              className="form-control"
                              id="phone2"
                              value={formData.phone2}
                              onChange={handleChange}
                              pattern="[0-9]*"
                            />
                          </div>

                          <span className="phone-seperator">-</span>

                          <div className="form-floating my-3">
                            <input
                              type="number"
                              className="form-control"
                              id="phone3"
                              value={formData.phone3}
                              onChange={handleChange}
                              pattern="[0-9]*"
                            />
                          </div>
                        </div>
                        <button
                          className="btn btn-primary btn-checkout"
                          onClick={updateDelivery}>
                          변경하기
                        </button>
                        <button
                          className="btn btn-checkout"
                          onClick={handlePageChange}>
                          <img
                            style={{ height: "fit-content" }}
                            className="h-auto"
                            loading="lazy"
                            src="/assets/images/카카오페이로결제하기버튼.png"
                            width="375"
                            height="80"
                            alt="image"
                          />
                        </button>
                        <div className="errorMessage">
                        {errorMessage && <p className="error-message">{errorMessage}</p>}
                        </div>
                        </form>
                      </div>
                    )}  
                    {/* </td> */}

            {!shippingStatus && (
            <div className="mobile_fixed-btn_wrapper">
              <div className="button-wrapper container">
            
            
            
              <button className="btn btn-checkout" onClick={Checkout}>
            <img
              style={{ height: "fit-content" }}
              className="h-auto"
              loading="lazy"
              src="/assets/images/카카오페이로결제하기버튼.png"
              width="375"
              height="80"
              alt="image"
            />
            </button>
               
               
               
          
                {/* <button
                  className="btn btn-primary btn-checkout"
                  // onClick={() => navigate("/shop_checkout")}
                  onClick={Checkout}>
                  주문하기
                </button> */}
              </div>
            </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
