import { useContextElement } from "@/context/Context";
import axiosInstance from "@/utils/globalAxios";
import { useEffect, useState } from "react";

export default function AccountOrders() {
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
        // const orders = localStorage.setItem("orders", ordersData);
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
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
    }).format(new Date(value));
  }



  return (
    <div className="col-lg-9">
      <div className="page-content my-account__orders-list">
        <table className="orders-table">
          <thead>
            <tr>
              <th>no.</th>
              <th>주문일자</th>
              <th>결제금액</th>
              <th>내역보기</th>
            </tr>
          </thead>
          <tbody>

            {orders.map((items, i)=>(
            <tr key={i}>
              <td>{items.orderId}</td>
              <td>{formatDate(items.orderDate)}</td>
              <td>{formatCurrency(items.totalPrice)}</td>
              <td>
                <button className="btn btn-primary">VIEW</button>
              </td>
            </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
