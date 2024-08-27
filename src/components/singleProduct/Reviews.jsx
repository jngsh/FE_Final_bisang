import React, { useEffect, useState } from "react";
import BASE_URL from "@/utils/globalBaseUrl";
import axios from "axios";


// 상세페이지에 보이는 리뷰 부분 !!

function maskName(name){
  if(name.length <= 4){
    return '****';
  }
  return name.slice(0, -4) + '****';
}

function sortReivewsByDate(reviews) {
  return reviews
    .map((review) => ({
      name: maskName(review.id),
      text:review.contents,
      rating:review.rating,
      reviewDate: new Date(review.reviewDate)
    }))
    .sort((a,b) => b.reviewDate - a.reviewDate);
}


export default function Reviews({productId, reviewCount}) {
  const [reviews, setReviews] = useState([]);

  useEffect (() =>{
    const fetchReviews = async () =>{
      try{
        const response = await axios.get(`${BASE_URL}/bisang/review/product-review/${productId}`);
        console.log("productReview:",response.data);
        const transformReviews = response.data.map((review) => ({
          name: maskName(review.id),
          text: review.contents,
          rating: review.rating,
          reviewDate: new Date(review.reviewDate)
        })).sort((a,b) => b.reviewDate - a.reviewDate);
        setReviews(transformReviews);
      }catch(error){
        console.error(`Error fetching reviews:`,error);
        throw error;
      }
    };

    if(productId){
      fetchReviews();
    }

  }, [productId]);
  return (
    <>
      <h2 className="product-single__reviews-title">리뷰 ({reviewCount})</h2>
      <div className="product-single__reviews-list">
        {reviews.map((elm, i) => (
          <div key={i} className="product-single__reviews-item">
            <div className="customer-review">
              <div className="customer-name">
                <h6>{elm.name}</h6>
                <div className="review-date">{elm.reviewDate.toLocaleDateString()}</div>
              </div>
              <div className="reviews-group d-flex">
                  {Array.from({ length: elm.rating }).map((_, index) => (
                    <svg
                      key={index}
                      className="review-star"
                      viewBox="0 0 9 9"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <use href="#icon_star" />
                    </svg>
                  ))}
                </div>
              <div className="review-text">
                <p>{elm.text}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
