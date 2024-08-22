import axiosInstance from "@/utils/globalAxios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import './OrderDetails.scss'



const OrderDetails = () => {
    const { orderId } = useParams();
    const [orderDetails, setOrderDetails] = useState([]);
    const [loading, setLoading] = useState([]);
    console.log(orderId);

    const fetchOrderDetails = async () => {
        try {
            const response = await axiosInstance.get(`/bisang/orders/details/${orderId}`);
            console.log("response뭐를?:", response.data);

            setOrderDetails(response.data);

            console.log("orderDetails는?:", orderDetails);

        } catch (error) {
            console.log('Error fetching orderDetails:', error);
        } finally {
            setLoading(false); // 로딩 종료
        }

    }

    useEffect(() => {
        fetchOrderDetails();
    }, [orderId]);

    // const formatDate = (value) => {
    //     return new Intl.DateTimeFormat('ko-KR', {
    //         dateStyle: 'medium',
    //         timeStyle: 'medium'
    //     }).format(new Date(value));
    // };
    const formatCurrency = (value) => {
        return new Intl.NumberFormat('ko-KR', {
            style: 'decimal',
            currency: 'KRW',
        }).format(value);
    };

    const totalAmount = orderDetails.reduce((acc, item) => acc + item.totalPrice, 0);


    const goToReview = () => {
        console.log("버튼 눌림 리뷰로 뿅");

    }

    return (

        <div className="all">
            <div className="page-content my-account__orders-list">
           
                <div className="aboveTable">
                    <table border={1}>
                        <tr><td className="aboveTableHead">&nbsp;✅ 주문 번호</td><td style={{textAlign:"right"}}> {orderId}&nbsp;</td></tr>
                        <tr><td className="aboveTableHead">&nbsp;✅ 주문 일자</td><td style={{textAlign:"right"}}> &nbsp;&nbsp;2024년 8월 20일 오후 3:19&nbsp;</td></tr>
                        <tr><td className="aboveTableHead">&nbsp;✅ 총 결제금액</td><td style={{textAlign:"right"}}> {formatCurrency(totalAmount)} 원&nbsp;</td></tr>
                    </table>
                    {/* <div> ✅ 주문 번호 : {orderId}</div>
                <div> ✅ 주문일자 : 2024년 8월 20일 오후 3:19</div>
                <div> ✅ 총 결제금액 : {formatCurrency(totalAmount)} 원</div> */}
                </div>
                <br />
                <table className="orders-table">
                    <thead className="orders-header">
                        <tr className="aboveTableHead">
                            <th>no.</th>
                            <th colSpan={2}>상품명</th>
                            <th>가격</th>
                            <th>수량</th>
                            <th>금액</th>
                            <th>리뷰</th>

                        </tr>
                    </thead>
                    <tbody>
                        {orderDetails.map((items, i) => (
                            <tr key={i}>
                                <td>{i + 1}</td>
                                <td><img className="productImage" src={items.productImage} /></td>
                                <td>{items.productName}</td>
                                <td>{formatCurrency(items.productPrice)}원</td>
                                <td>{items.amount}</td>
                                <td>{formatCurrency(items.totalPrice)}원</td>
                                <td><button className="button" onClick={goToReview}>리뷰작성</button></td>
                            </tr>
                        ))}
                        <td colSpan={5} style={{ textAlign: 'right' }}>총 결제금액 :</td>
                        <td className="totalAmount" >{formatCurrency(totalAmount)}원</td>
                    </tbody>
                </table>
            </div>
<br />
<br />
<br />
<br />
        </div>
    );
    
    
};


export default OrderDetails;