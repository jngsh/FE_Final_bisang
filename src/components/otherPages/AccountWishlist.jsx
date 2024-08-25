import { useContextElement } from "@/context/Context";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Navigation } from "swiper/modules";
import { useContext, useEffect, useState } from "react";
import { allProducts } from "@/data/products";
import axios from "axios";
import BASE_URL from "@/utils/globalBaseUrl";

export default function AccountWishlist() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  // const {userId} = useContextElement();
  const userId = localStorage.getItem("userId");
  const [reviewList, setReviewList] = useState([]);
  const { orderDetails } = useContextElement();
  const [reviewedOrderDetailIds, setReviewedOrderDetailIds] = useState([]);
  const [myReview, setMyReview] = useState([]);
  const [activeTab, setActiveTab] = useState(new URLSearchParams(location.search).get('tab') || 'review');

  function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 +1 필요
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
  
  
  useEffect(()=>{
    const fetchReviewList = async () => {
      console.log('token??',token);
      try {
      const response = await axios.get(`${BASE_URL}/bisang/review/${userId}`, {
          // headers: {
          //   Authorization: token ? `Bearer ${token}` : ''
          // } 
      });

      if(response.data){
        console.log('Orders data:',response.data);
        const processedData = response.data.map(orderDTO => ({
          orderId:orderDTO.orderId,
          orderDate: orderDTO.orderDate,
          orderDetails: orderDTO.orderDetails.map(detailDTO => ({
            orderDetailId: detailDTO.orderDetailId,
            productId: detailDTO.productId,
            productName: detailDTO.productName,
            productPrice: detailDTO.productPrice,
            productImage: detailDTO.productImage
          }))
        }));
        setReviewList(processedData);
      }
    } catch(error) {
        console.error("Error fetching reviewlist:", error);
    }
  };
  fetchReviewList();
  fetchMyReviewList();
},[]);


const handleReview = (productId, orderDetailId) => {
  navigate('/review-form',{state:{productId, orderDetailId}});
};

const handleTabClick = (tabName) =>{
  setActiveTab(tabName);
  navigate(`?tab=${tabName}`);
};

const fetchMyReviewList = async () => {
  try{
  const response = await axios.get(`${BASE_URL}/bisang/review/reviewed/${userId}`);
  console.log("MyReview:",response.data);
  setMyReview(response.data.reverse());
  }catch (error) {
    console.error('Error get myreview:', error);
  }
};

const toggleWishlist = (productId) => {
  // Wishlist 토글 로직 구현
  console.log("Toggling wishlist for product:", productId);
};

  return (
    <section className="review container">
    <ul className="nav nav-tabs mb-5" id="reviews" role="tablist">
      <li className="nav item" role="presentation">
        <a
          className={`nav-link nav-link_underscore ${activeTab === "review" ? "active" : ""}`}
          id="review-tab"
          data-bs-toggle="tab"
          href="#tab-item-review"
          role="tab"
          aria-controls="tab-item-review"
          aria-selected={activeTab === "review"}
          onClick={() => handleTabClick("review")}
          >
          작성 가능 리뷰
          </a>
      </li>
      <li className="nav item" role="presentation">
        <a
          className={`nav-link nav-link_underscore ${activeTab === "reviewList" ? "active" : ""}`}
          id="reviewList-tab"
          data-bs-toggle="tab"
          href="#tab-item-reviewList"
          role="tab"
          aria-controls="tab-item-reviewList"
          aria-selected={activeTab === "reviewList"}
          onClick={() => handleTabClick("reviewList")}
          >
          내가 쓴 리뷰
          </a>
      </li>
    </ul>

    <div className="tab-content pt-2" id="review_reviewList_tab_content">
      <div 
        className={`tab-pane fade ${activeTab === "review" ? "show active" : ""}`}
        id="tab-item-review"
        role="tabpanel"
        aria-labelledby="review-tab"
      >
        {/* 리뷰작성폼 */}
        <div className="col-lg-9">
          <div className="page-content my-account__wishlist">
            {reviewList.length ? (
              <div
                className="products-grid"
                id="products-grid"
              >
                {/* {" "} */}
                {reviewList.flatMap(orderDTO =>
                  orderDTO.orderDetails.map((detailDTO, i) => (
                  <div className="product-card-wrapper" key={i}>
                    <div className="product-card">
                      <p className="pc__date">{formatDate(orderDTO.orderDate)}</p>
                      <div className="pc__content">
                        <div className="pc__img-wrapper">
                              <Link to={`/bisang/products/${detailDTO.productId}`}>
                                <img
                                  loading="lazy"
                                  src={detailDTO.productImage}
                                  // width="330"
                                  // height="400"
                                  alt={detailDTO.productName}
                                  className="pc__img"
                                />
                              </Link>
                              </div>
                      <div className="pc__info">
                        <h6 className="pc__title">{detailDTO.productName}</h6>
                        </div>
                      </div>
                      <div className="btn-container">
                      <button 
                        className="btn-review"
                        onClick={()=>handleReview(detailDTO.productId, detailDTO.orderDetailId)}
                      >
                        리뷰쓰기
                      </button>
                      </div>
                    </div>
                  </div>
                )))}
              </div>
            ) : (
              <div className="fs-18">리뷰를 남길 상품이 없습니다.</div>
            )}
            {/* <!-- /.products-grid row --> */}
          </div>
        </div>
      </div>
      
      <div 
        className={`tab-pane fade ${activeTab === "reviewList" ? "show active" : ""}`}
        id="tab-item-reviewList"
        role="tabpanel"
        aria-labelledby="reviewList-tab"
      >
        {/* 작성된 리뷰폼 */}
        <div className="col-lg-9">
          <div className="page-content my-account__review">
            {myReview.length ? (
              <div className="products-grid" id="products-grid">
                {myReview.map((review, i) => (
                  <div className="product-card-wrapper" key={i}>
                    <div className="product-card">
                    <p className="pc__date">{review.reviewDate}</p>
                      <div className="pc__content">
                        <div className="pc__image-wrapper">
                          <img
                            loading="lazy"
                            src={review.productImage}
                            alt={review.productName}
                            className="pc__img"
                          />
                        </div>
                        <div className="pc__info">
                          <h6 className="pc__title">{review.productName}</h6>
                        </div>
                      </div>
                      <hr className="line"/>
                      <div className="reviews">
                      <div className="pc__rating">
                      {Array.from({ length: review.rating }).map((_, index) => (
                        <svg
                          key={index}
                          className="review-star"
                          viewBox="0 0 9 9"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <use href="#icon_star" />
                        </svg>
                      ))}
                      {Array.from({ length: 5 - review.rating }).map((_, index) => (
                        <svg
                          key={index + review.rating}
                          className="review-star-empty"
                          viewBox="0 0 9 9"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <use href="#icon_star" />
                        </svg>
                      ))}
                          </div>
                          <p className="pc__review">{review.contents}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="fs-18">작성한 리뷰가 없습니다.</div>
            )}
          </div>
        </div>
      </div>
    </div>
    </section>

  );
}
