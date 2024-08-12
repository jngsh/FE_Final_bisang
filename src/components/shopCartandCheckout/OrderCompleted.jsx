import { useContextElement } from "@/context/Context";
import axiosInstance from "@/utils/globalAxios";
import BASE_URL from "@/utils/globalBaseUrl";
import axios from "axios";
import { useEffect, useState } from "react";

export default function OrderCompleted() {

  const {orderedDetail, setOrderedDetail} = useContextElement();

  const [orderedProducts, setOrderedProducts] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [showDate, setShowDate] = useState(true);


useEffect(()=>{
  if(orderedDetail){
    const calcultatedTotalPrice = (orderedDetail || [])
    .reduce((total, product) => total + (product.productPrice * product.amount), 0);
    setTotalPrice(calcultatedTotalPrice);
  }
}, [orderedDetail]); //세부정보 변경될 때 실행


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
          <span>{orderedDetail?.orderNumber || '정보없음'}</span> {/*optionalChaining이라고 함*/}
        </div>
        <div className="order-info__item">
          <label>주문 일자</label>
          {showDate && <span>{new Date().toLocaleDateString()}</span>}
        </div>
        <div className="order-info__item">
          <label>총 결제금액</label>

          <span>{totalPrice + 19}원 </span>{/*19는배송비임*/}
        </div>
        <div className="order-info__item">
          <label>결제 수단</label>
          <span>{orderedDetail?.paymentMethod ||'kakaopay아니얌??'}</span> {/*결제수단 입력되게하기*/}
        </div>
      </div>
      <div className="checkout__totals-wrapper">
        <div className="checkout__totals">
          <h3>주문 상세정보</h3>
          <table className="checkout-cart-items">
            <thead>
              <tr>
                <th>상품명</th>
                <th>금액</th>
              </tr>
            </thead>
            <tbody>
              {orderedProducts.map((product, i) => (
                <tr key={i}>
                  <td>
                    {product.productName} x {product.amount}
                  </td>
                  <td>${product.productPrice * product.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <table className="checkout-totals">
            <tbody>
              <tr>
                <th>상품들 더한 금액</th>
                <td>{totalPrice}원 </td>
              </tr>
              <tr>
                <th>배송비</th>
                <td>Free shipping</td>
              </tr>
              <tr>
                <th>배송비까지 다 합친 금액</th>
                <td>{totalPrice + 19}원</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
