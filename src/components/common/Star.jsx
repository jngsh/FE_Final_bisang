import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BASE_URL from '@/utils/globalBaseUrl';

export default function Star({productId}) {
  console.log("starPI:",productId);
  const [reviewStats, setReviewStats] = useState({reviewsCount:0, avgRating:0});
  const {reviewsCount, avgRating} = reviewStats;
  const stars = 1;

  useEffect (() => {
    if(!productId){
      console.log("no productId");
      return;
    }
    const fetchReviewStats = async () => {
      try{
        const response = await axios.get(`${BASE_URL}/bisang/review/main-product-review/${productId}`);
        console.log("ReviewStats : ",response.data);
        setReviewStats(response.data);
      } catch (error) {
        console.error('Error fetching review stats:', error);
      }
    };

    fetchReviewStats();
  },[productId]);

  return (
    <div className="star-container">
            <div className="reviews-group d-flex">
                {/* {[...Array(5)].map((_, i) => ( */}
                    <svg
                        // key={i}
                        className={`review-star ${avgRating > 0 ? 'review-star' : 'review-star-empty'}`}
                        viewBox="0 0 9 9"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path d="M4.0172 0.313075L2.91869 2.64013L0.460942 3.0145C0.0201949 3.08129 -0.15644 3.64899 0.163185 3.97415L1.94131 5.78447L1.52075 8.34177C1.44505 8.80402 1.91103 9.15026 2.30131 8.93408L4.5 7.72661L6.69869 8.93408C7.08897 9.14851 7.55495 8.80402 7.47925 8.34177L7.05869 5.78447L8.83682 3.97415C9.15644 3.64899 8.97981 3.08129 8.53906 3.0145L6.08131 2.64013L4.9828 0.313075C4.78598 -0.101718 4.2157 -0.10699 4.0172 0.313075Z"></path>
                    </svg>
                {/* ))} */}
            </div>
            <span className="reviews-note text-lowercase text-secondary">
                {avgRating} ({reviewsCount})
            </span>
        </div>
    // <>
    //   {[...Array(stars), 1, 1, 1, 1].map((elm2, i2) => (
    //     <svg
    //       key={i2}
    //       // className="review-star"
    //       className="review-star-empty"
    //       viewBox="0 0 9 9"
    //       xmlns="http://www.w3.org/2000/svg"
    //     >
    //       <path d="M4.0172 0.313075L2.91869 2.64013L0.460942 3.0145C0.0201949 3.08129 -0.15644 3.64899 0.163185 3.97415L1.94131 5.78447L1.52075 8.34177C1.44505 8.80402 1.91103 9.15026 2.30131 8.93408L4.5 7.72661L6.69869 8.93408C7.08897 9.14851 7.55495 8.80402 7.47925 8.34177L7.05869 5.78447L8.83682 3.97415C9.15644 3.64899 8.97981 3.08129 8.53906 3.0145L6.08131 2.64013L4.9828 0.313075C4.78598 -0.101718 4.2157 -0.10699 4.0172 0.313075Z"></path>
    //     </svg>
    //   ))}
    // </>
  );
}
