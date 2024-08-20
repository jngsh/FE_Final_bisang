import { useContextElement } from "@/context/Context";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";
import { Navigation } from "swiper/modules";
import { useContext, useEffect, useState } from "react";
import { allProducts } from "@/data/products";
import axios from "axios";
import BASE_URL from "@/utils/globalBaseUrl";

export default function AccountWishlist() {
  const token = localStorage.getItem("token");
  // const {userId} = useContextElement();
  const userId = localStorage.getItem("userId");
  const [reviewList, setReviewList] = useState([]);
  
  useEffect(()=>{
    const fetchReviewList = async () => {
      console.log('token??',token);
      try {
      const response = await axios.get(`${BASE_URL}/bisang/review/${userId}`, {
          headers: {
            Authorization: token ? `Bearer ${token}` : ''
          } 
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

const toggleWishlist = (productId) => {
  // Wishlist 토글 로직 구현
  console.log("Toggling wishlist for product:", productId);
};

  return (
    <div className="col-lg-9">
      <div className="page-content my-account__wishlist">
        {reviewList.length ? (
          <div
            className="products-grid row row-cols-2 row-cols-lg-3"
            id="products-grid"
          >
            {" "}
            {reviewList.flatMap(orderDTO =>
              orderDTO.orderDetails.map((detailDTO, i) => (
              <div className="product-card-wrapper" key={i}>
                <div className="product-card mb-3 mb-md-4 mb-xxl-5">
                  <div className="pc__img-wrapper">
                    <Swiper
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
                        <SwiperSlide key={idx} className="swiper-slide">
                          <Link to={`/product1_simple/${detailDTO.productId}`}>
                            <img
                              loading="lazy"
                              src={imgSrc}
                              width="330"
                              height="400"
                              alt={detailDTO.productName}
                              className="pc__img"
                            />
                          </Link>
                        </SwiperSlide>
                      ))}

                      <span
                        className={`cursor-pointer pc__img-prev ${"prev" + i} `}
                      >
                        <svg
                          width="7"
                          height="11"
                          viewBox="0 0 7 11"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <use href="#icon_prev_sm" />
                        </svg>
                      </span>
                      <span
                        className={`cursor-pointer pc__img-next ${"next" + i} `}
                      >
                        <svg
                          width="7"
                          height="11"
                          viewBox="0 0 7 11"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <use href="#icon_next_sm" />
                        </svg>
                      </span>
                    </Swiper>
                    <button
                      className="btn-remove-from-wishlist"
                      onClick={() => toggleWishlist(detailDTO.productId)}
                    >
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <use href="#icon_close" />
                      </svg>
                    </button>
                  </div>

                  <div className="pc__info position-relative">
                    <p className="pc__category">{detailDTO.productId}</p>
                    <h6 className="pc__title">{detailDTO.productName}</h6>
                    <div className="product-card__price d-flex">
                      <span className="money price">${detailDTO.productPrice}</span>
                    </div>

                    <button
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
  );
}
