
import { useContextElement } from "@/context/Context";
import axiosInstance from "@/utils/globalAxios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./AccountOrders.css";

export default function MyOrders() {
  const { userId } = useContextElement();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState([]);

  useEffect(() => {
    const userId = localStorage.getItem("userId")|| contextUserId;
    console.log("user Id: ", userId);

    const fetchOrders = async () => {
      try {
        const response = await axiosInstance.get(`/bisang/orders/${userId}`);
        console.log("response?:",response.data);
        setOrders(response.data);
      } catch (error) {
        console.log('Error fetching orders:', error);
      } finally {
        setLoading(false); // 로딩 종료
      }
    };
    fetchOrders();
  }, [userId]);
  
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('ko-KR', {
      style: 'decimal',
      currency: 'KRW',
    }).format(value);
  };

  const formatDate = (value) => {
    return new Intl.DateTimeFormat('ko-KR', {
      // year: '2-digit',
      // month: 'short',
      // date: 'short',
      dateStyle:'medium',
      // weekday: 'narrow'
    }).format(new Date(value));
  }

  const formatTime = (value) => {
    return new Intl.DateTimeFormat('ko-KR', {
      // hour: 'numeric',
      // minute: 'numeric',
      // second: 'numeric'
      timeStyle:'short'
    }).format(new Date(value));
  }



  return (
    <div className="div1">
      <div className="div2">
      {orders.length===0?( <div className="empty">
            <div className="emptyOrder">주문 정보가 없습니다🥲</div>
            <button className="goCategory">
              <Link className="goCategory2" to={"/shoplist"}>상품 보러 가기🛍️</Link>
            </button>
          </div>):(
        <table className="orders-table">
          <thead className="orders-header">
            <tr>
            <th className="orderNo">no.</th>
        <th className="orderDate">주문일자</th>
        <th className="orderPrice">결제금액</th>
        <th className="orderDetails">🎁</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((items, i)=>(
              <tr key={i}>
              <td className="orderNo">{items.orderId}</td>
              <td className="orderDate">{formatDate(items.orderDate)}<br/>{formatTime(items.orderDate)}</td>
              <td className="orderPrice">{formatCurrency(items.totalPrice)}</td>
              <td className="orderDetails">
                <Link to={`/order-details/${items.orderId}`} className="order-details">상세보기</Link>
              </td>
            </tr>
            ))}
          </tbody>
        </table>)}
      </div>
    </div>
  );
}
