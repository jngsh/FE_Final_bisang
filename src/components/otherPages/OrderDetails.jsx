import axiosInstance from "@/utils/globalAxios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import './OrderDetails.scss';
import axios from "axios";
import BASE_URL from "@/utils/globalBaseUrl";

const OrderDetails = () => {
    const { orderId } = useParams();
    const [orderDetails, setOrderDetails] = useState([]);
    const [loading, setLoading] = useState(true); // 초기 로딩 상태를 true로 설정
    console.log(orderId);
    const navigate = useNavigate();
    const [reviewExistence, setReviewExistence] = useState({});

    const fetchOrderDetails = async () => {
        try {
            const response = await axiosInstance.get(`/bisang/orders/details/${orderId}`);
            console.log("response:", response.data);
            const orderDetailsData = response.data;
            setOrderDetails(response.data);

            const existenceMap = await checkReivewExistence(orderDetailsData);
            setReviewExistence(existenceMap);
        } catch (error) {
            console.log('Error fetching orderDetails:', error);
        } finally {
            setLoading(false); // 로딩 종료
        }
    }

    useEffect(() => {
        fetchOrderDetails();
    }, [orderId]);

    const formatCurrency = (value) => {
        return new Intl.NumberFormat('ko-KR', {
            style: 'decimal',
            currency: 'KRW',
        }).format(value);
    };

    const totalAmount = orderDetails.reduce((acc, item) => acc + item.totalPrice, 0);

    const goToReview = (orderDetailId, productId) => {
        navigate('/review-form', { state: { productId, orderDetailId } });

        console.log("리뷰 작성 버튼 클릭됨");
    };

    const checkReivewExistence = async (orderDetails) => {
        try{
            const existencePromies = orderDetails.map(item =>
                axios.get(`${BASE_URL}/bisang/review/exist/${item.orderDetailId}`)
            );
            const existenceResults = await Promise.all(existencePromies);

            const existenceMap = {};
            existenceResults.forEach((result, index) => {
                existenceMap[orderDetails[index].orderDetailId] = result.data;
            });

            return existenceMap;
        } catch (error) {
            console.error('Error checking review existence:', error);
            return {};
        }
    }

    return (
        <div className="div1">
            <div className="div2">
                <div className="div3">
                    <table className="aboveTable" border={1}>
                        <thead>
                            <tr><td style={{ textAlign: "center", fontWeight: "bold" }}>✅ 주문 번호</td><td style={{ textAlign: "center", fontWeight: "bold" }}>✅ 주문 일자</td><td style={{ textAlign: "center", fontWeight: "bold" }}>&nbsp;✅ 총 결제금액</td></tr>
                        </thead>
                        <tbody>
                            <tr><td style={{ textAlign: "center" }}> {orderId}</td>
                                <td style={{ textAlign: "center" }}>2024년 8월 20일<br />오후 3:19</td>
                                <td style={{ textAlign: "center" }}> {formatCurrency(totalAmount)} 원</td></tr>
                        </tbody>
                    </table>
                </div>
                <div className="div4">
                    <table className="orders-table">
                        <thead>
                            <tr>
                                {/* <th>no.</th> */}
                                <th colSpan={2}>상품명</th>
                                <th>단가<br />수량</th>
                                <th>금액</th>
                                <th>리뷰</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orderDetails.map((items, i) => (
                                <tr key={i}>
                                    <td><img src={items.productImage} alt="Product" /></td>
                                    <td >{items.productName}</td>
                                    <td>
                                        <div>{formatCurrency(items.productPrice)}원</div>
                                        <div>{items.amount}개</div>
                                    </td>
                                    <td>{formatCurrency(items.totalPrice)}원</td>
                                    <td>
                                        {!reviewExistence[items.orderDetailId] ? (
                                        <button className="button" onClick={()=>goToReview(items.orderDetailId, items.productId)}>리뷰 작성</button>
                                        ) : ('')}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default OrderDetails;
