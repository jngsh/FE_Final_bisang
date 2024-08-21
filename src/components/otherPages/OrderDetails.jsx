import axiosInstance from "@/utils/globalAxios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import './OrderDetails.scss';

const OrderDetails = () => {
    const { orderId } = useParams();
    const [orderDetails, setOrderDetails] = useState([]);
    const [loading, setLoading] = useState(true); // 초기 로딩 상태를 true로 설정
    console.log(orderId);

    const fetchOrderDetails = async () => {
        try {
            const response = await axiosInstance.get(`/bisang/orders/details/${orderId}`);
            console.log("response:", response.data);

            setOrderDetails(response.data);
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

    const goToReview = () => {
        console.log("리뷰 작성 버튼 클릭됨");
    }

    return (
        <div className="col-lg-9">
            <div className="page-content my-account__orders-list">
                <div className="table-wrapper">
                    <table className="aboveTable" border={1}>
                        <tbody>
                            <tr><td style={{ textAlign: "center", fontWeight:"bold" }}>✅ 주문 번호</td><td style={{ textAlign: "center", fontWeight:"bold" }}>✅ 주문 일자</td><td style={{ textAlign: "center", fontWeight:"bold" }}>&nbsp;✅ 총 결제금액</td></tr>
                            <tr><td style={{ textAlign: "center" }}> {orderId}&nbsp;</td>
                            <td style={{ textAlign: "center" }}>2024년 8월 20일<br/>오후 3:19</td>
                            <td style={{ textAlign: "center" }}> {formatCurrency(totalAmount)} 원</td></tr>
                        </tbody>
                    </table>
                    </div>
                <div className="page-content my-account__orders-list">
                    <table className="orders-table">
                        <thead>
                            <tr>
                                <th>no.</th>
                                <th colSpan={2}>상품명</th>
                                <th>단가<br/>수량</th>
                                <th>금액</th>
                                <th>리뷰</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orderDetails.map((items, i) => (
                                <tr key={i}>
                                    <td>{i + 1}</td>
                                    <td><img src={items.productImage} alt="Product" /></td>
                                    <td >{items.productName}</td>
                                    <td>
                                        <div>{formatCurrency(items.productPrice)}원</div> 
                                    <div>           {items.amount}개</div>

                                    </td>
                                   
                                    <td>{formatCurrency(items.totalPrice)}원</td>
                                    <td><button className="button" onClick={goToReview}>리뷰 작성</button></td>
                                </tr>
                            ))}
                            {/* <tr>
                                <td colSpan={5} style={{ textAlign: 'right' }}>총 결제금액 :</td>
                                <td colSpan={2} style={{ textAlign: 'left' }}>{formatCurrency(totalAmount)}원</td>
                            </tr> */}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default OrderDetails;
