import { useContextElement } from "@/context/Context";
import axiosInstance from "@/utils/globalAxios";
import BASE_URL from "@/utils/globalBaseUrl";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function OrderCompleted() {

  const {orderDetails, setOrderDetails, cartId} = useContextElement();

  // const [orderedProducts, setOrderedProducts] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [showDate, setShowDate] = useState(true);
  const [loading, setLoading] = useState(true); // 로딩 상태 관리
  const [orderNumber, setOrderNumber] = useState(0);




  useEffect(() => {
    //페이지가 로드되면 localStorage에서 cartId를 가져오기
    // const cartId = localStorage.getItem('cartId');
    console.log("카트아이디 cartId: ", cartId);
    // if (cartId) {
      const fetchOrderDetails = async () => {
        try {
          const response = await axiosInstance.get(`/bisang/pay/details/${cartId}`);
          // console.log("response:",response);
          // console.log("response.data:",response.data);
          
          setOrderDetails(response.data.orderDetails);
          localStorage.setItem("orderDetails", JSON.stringify(response.data.orderDetails));
          // setOrderId(response.data.orderId);
          
          console.log("orderDetails들어왔는지?:",response.data.orderDetails);
          setOrderNumber(response.data.orderDetails[0].orderId);
          console.log("orderNumber is?",orderNumber);

          // 총 가격 계산
          const calcultatedTotalPrice = (response.data.orderDetails || [])
            .reduce((total, items) => total + (items.totalPrice), 0);
          setTotalPrice(calcultatedTotalPrice);

          // localStorage.setItem("orderDetails", JSON.stringify(response.data.orderDetails));
        } catch (error) {
          console.log('Error fetching order details:', error);
        } finally {
          setLoading(false); // 로딩 종료
        }
      };


      if (cartId){
      fetchOrderDetails();
    } else {
      console.error('No cartId found in localStorage');
      setLoading(false); // 로딩 종료
    }
  }, [cartId, setOrderDetails]);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('ko-KR', {
      style: 'decimal',
      currency: 'KRW',
    }).format(value);
  };

  if (loading) return <div>Loading...</div>;

// orderedDetail이 null이거나 비어있을 경우 처리
if (!orderDetails || orderDetails.length === 0) {
  return <div>상세 주문 정보 없음</div>;
}



  return (
    <div className="order-complete">
      <div className="order-complete__message">
        <img
          src="/assets/images/danceYellow.png"
          width="80"
          height="80"
          viewBox="0 0 80 80"
          fill="none"
        />
        <h3>주문이 완료되었어요💚</h3>
        <p>빠르게 배송해드릴게요!</p>
      </div>
      <div className="order-info">
        <div className="order-info__item">

          <label>주문 번호</label>
          <span>{orderNumber}</span>
          
          {/* <span>{response.data.orderDetails.orderId}</span> */}
        </div>
        <div className="order-info__item">
          <label>주문 일자</label>
          {showDate && <span>{new Date().toLocaleDateString()}</span>}
        </div>
        <div className="order-info__item">
          <label>총 결제금액</label>
          <span>{formatCurrency(totalPrice)}원 </span>
        </div>
        <div className="order-info__item">
          <label>결제 수단</label>
          <span>kakaopay</span> 
        </div>
      </div>
      <div className="checkout__totals-wrapper">
        <div className="checkout__totals">
          <h3>주문 상세정보</h3>
          <table className="checkout-cart-items">
            <thead>
              <tr>
                <th></th>
                <th>상품명</th>
                <th>금액</th>
              </tr>
            </thead>
            <tbody>
              {orderDetails.map((items, i) => (
                <tr key={i}>
                  <td>
                    <img
                    src={items.productImage}
                    style={{ width: '50px', height: 'auto', border: '1px solid gray'}}/>
                  </td>
                  <td>
                    {items.productName} x {items.amount}
                  </td>
                  <td>{formatCurrency(items.productPrice * items.amount)}원</td>
                </tr>
               ))}
            </tbody>
          </table>
          <table className="checkout-totals">
            <tbody>
              <tr>
                <th>상품 전체 금액</th>
                <td>{formatCurrency(totalPrice)}원 </td>
              </tr>
              <tr>
                <th>배송비</th>
                <td>0원</td>
              </tr>
              <tr>
                <th>총 결제 금액</th>
                <td>{formatCurrency(totalPrice)}원</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
