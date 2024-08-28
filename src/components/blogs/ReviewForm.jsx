import React, { useEffect } from "react";
import { useState } from "react";
import BASE_URL from "@/utils/globalBaseUrl";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function ReviewForm({ productId, orderDetailId }) {
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");
  
  const [ reviewData, setReviewData ] = useState({
    contents:'',
    reviewImage:'',
    rating:0,
  });

  const [hoverRating, setHoverRating] = useState(null);
  const [productInfo, setProductInfo] = useState({ name:'', productImage:''});

  // 리뷰 작성할 상품 데이터 조회
  useEffect(() => {
    const fetchProductDetails = async () => {
    try{
      const response = await axios.get(`${BASE_URL}/bisang/review/productDetail/${productId}`);
      setProductInfo({
        name: response.data.productName,
        productImage: response.data.productImage
      });
    }catch (error) {
      console.error('Error fetching product details:', error);
    }
    };
    fetchProductDetails();
  
  },[productId]);

  // 리뷰 등록
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${BASE_URL}/bisang/review/${orderDetailId}/${productId}/${userId}`, reviewData);
      alert('리뷰가 등록되었습니다.')
      navigate('/account_reviews?tab=reviewList');
    }catch (error) {
      console.error('Error submitting review:', error);
    }


  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReviewData({
      ...reviewData,
      [name]: value
    });
  };

  const handleStarClick = (rating) => {
    setReviewData((prevData) => ({
      ...prevData,
      rating: rating
    }));
  };

  return (
    <div className="blog-single__review-form">
      <form onSubmit={handleSubmit} className="needs-validation">
        <div className="product-info">
          {productInfo.productImage && 
          <img src={productInfo.productImage} alt={productInfo.name}/>}
          <h5 style={{lineHeight:'1.8'}}>{productInfo.name}</h5>
        </div>
        <hr className="line"/>
        <label>상품에 만족하셨나요?</label>
        <div className="select-star-rating">
          <span className="star-rating">
          {[1, 2, 3, 4, 5].map((star) => (
              <svg
                key={star}
                className={`star-rating__star-icon ${hoverRating >= star || reviewData.rating >= star ? 'is-selected' : ''}`}
                fill={hoverRating >= star || reviewData.rating >= star ? "#f39c12" : "#ccc"}
                viewBox="0 0 12 12"
                xmlns="http://www.w3.org/2000/svg"
                onClick={() => handleStarClick(star)}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(null)}
              >
                <path d="M11.1429 5.04687C11.1429 4.84598 10.9286 4.76562 10.7679 4.73884L7.40625 4.25L5.89955 1.20312C5.83929 1.07589 5.72545 0.928571 5.57143 0.928571C5.41741 0.928571 5.30357 1.07589 5.2433 1.20312L3.73661 4.25L0.375 4.73884C0.207589 4.76562 0 4.84598 0 5.04687C0 5.16741 0.0870536 5.28125 0.167411 5.3683L2.60491 7.73884L2.02902 11.0871C2.02232 11.1339 2.01563 11.1741 2.01563 11.221C2.01563 11.3951 2.10268 11.5558 2.29688 11.5558C2.39063 11.5558 2.47768 11.5223 2.56473 11.4754L5.57143 9.89509L8.57813 11.4754C8.65848 11.5223 8.75223 11.5558 8.84598 11.5558C9.04018 11.5558 9.12054 11.3951 9.12054 11.221C9.12054 11.1741 9.12054 11.1339 9.11384 11.0871L8.53795 7.73884L10.9688 5.3683C11.0558 5.28125 11.1429 5.16741 11.1429 5.04687Z" />
              </svg>
            ))}
          </span>
          <input type="hidden" name="rating" value="{reviewData.rating}" />
        </div>
        <hr className="slem-line"/>
        <div className="mb-4">
          <textarea
            className="form-control form-control_gray"
            name="contents"
            placeholder="리뷰를 작성해주세요"
            cols="30"
            rows="8"
            required
            onChange={handleChange}
            value={reviewData.contents}
          ></textarea>
        </div>
        <div className="form-action">
          <button type="submit" className="btn btn-primary">
            등록하기
          </button>
        </div>
      </form>
    </div>
  );
}
