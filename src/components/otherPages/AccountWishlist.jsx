import { useContextElement } from "@/context/Context";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link, useNavigate } from "react-router-dom";
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
},[]);

// useEffect(() => {
//   const fetchReviewed = async () => {
//     try{
//       const response = await axios.get(`${BASE_URL}/bisang/review/reviewed/${userId}/${orderId}`)
//     }
//   }
// });

const handleReview = (productId, orderDetailId) => {
  navigate('/review-form',{state:{productId, orderDetailId}});
};

const toggleWishlist = (productId) => {
  // Wishlist 토글 로직 구현
  console.log("Toggling wishlist for product:", productId);
};

  return (
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
                  {/* <div className="pc__img-wrapper"> */}
                    {/* <Swiper
                      resizeObserver
                      className="swiper-container background-img js-swiper-slider"
                      slidesPerView={1}
                      modules={[Navigation]}
                      navigation={{
                        prevEl: ".prev" + i,
                        nextEl: ".next" + i,
                      }}
                    >
                      {[detailDTO.productImage, detailDTO.productImage].map((imgSrc, idx) => (
                        <SwiperSlide key={idx} className="swiper-slide"> */}
                          <Link to={`/product1_simple/${detailDTO.productId}`}>
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
                    {/* <div className="product-card__price d-flex">
                      <span className="money price">${detailDTO.productPrice}</span>
                    </div> */}
                    </div>
                  </div>
                  
                  <button 
                    className="btn-review"
                    onClick={()=>handleReview(detailDTO.productId, detailDTO.orderDetailId)}
                  >
                    리뷰쓰기
                  </button>
                    {/* <button
                      className="pc__btn-wl position-absolute top-0 end-0 bg-transparent border-0 js-add-wishlist active"
                      title="Remove From Wishlist"
                      onClick={() => toggleWishlist(detailDTO.productId)}
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <use href="#icon_heart" />
                      </svg>
                    </button> */}
                  
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
  );
}
