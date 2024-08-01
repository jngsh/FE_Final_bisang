import { useContextElement } from "@/context/Context";
import { products51 } from "@/data/products/fashion";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

// productId를 가져온다
export default function RelatedSlider({ productId }) {
  const { toggleWishlist, isAddedtoWishlist } = useContextElement();
  const { setQuickViewItem } = useContextElement();
  const { addProductToCart, isAddedToCartProducts } = useContextElement();

  // BASE_URL은 .env 파일에서 가져다가 쓴다
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  console.log("BASE_URL : ", {BASE_URL});

  // produtct 정보 가져와서 뿌려주기
  const [product1, setProduct1] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // 컴포넌트가 마운트된 후 실행하기 (useEffect())
  useEffect(() => {
    console.log("컴포넌트 마운트됨");

    // 제품 정보 가져오기
    const fetchProduct = async () => {
      try {
        console.log("productId를 사용하여 데이터 가져오기 시작 >>>", productId);
        const response = await axios.get(`${BASE_URL}/bisang/products/${productId}`,
          {
            headers: {
              'ngrok-skip-browser-warning' : true,
            }
          }
        );
        setProduct1(response.data); // Product1에 axios로 가져온 data를 넣어줌
        console.log("fetchProduct: Response >>>", response);
        // console.log(`${BASE_URL}/${productId}`);
        console.log(`${BASE_URL}/bisang/products/${productId}`);
      } catch (error) {
        setError('Failed to fetch product');
        console.error("error>>>", error);
      } finally {
        setLoading(false);
      }
    };

    if(productId) {
      fetchProduct();
    } else {
      console.log("productId가 undefined임");
    }

  }, [productId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;


  // swiper 상세 설정
  const swiperOptions = {
    autoplay: false,
    slidesPerView: 4,
    slidesPerGroup: 4,
    effect: "none",
    loop: true,
    modules: [Pagination, Navigation],
    pagination: {
      el: "#related_products .products-pagination",
      type: "bullets",
      clickable: true,
    },
    navigation: {
      nextEl: ".ssn11",
      prevEl: ".ssp11",
    },
    breakpoints: {
      320: {
        slidesPerView: 2,
        slidesPerGroup: 2,
        spaceBetween: 14,
      },
      768: {
        slidesPerView: 3,
        slidesPerGroup: 3,
        spaceBetween: 24,
      },
      992: {
        slidesPerView: 4,
        slidesPerGroup: 4,
        spaceBetween: 30,
      },
    },
  };

  return (
    <section className="products-carousel container">
      <h2 className="h3 text-uppercase mb-4 pb-xl-2 mb-xl-4">
        Related <strong>Products</strong> 이 제품은 어떠세요?
      </h2>

      <div id="related_products" className="position-relative">
        <Swiper
          {...swiperOptions}
          className="swiper-container js-swiper-slider"
          data-settings=""
        >
          {products51.map((elm, i) => (
            <SwiperSlide key={i} className="swiper-slide product-card">
              <div className="pc__img-wrapper">
                <Link to={`/product1_simple/${elm.id}`}>
                  <img
                    loading="lazy"
                    src={product1.productImage}
                    width="330"
                    height="400"
                    alt="Cropped Faux leather Jacket"
                    className="pc__img"
                  />
                  <img
                    loading="lazy"
                    src={elm.imgSrc2}
                    width="330"
                    height="400"
                    alt="Cropped Faux leather Jacket"
                    className="pc__img pc__img-second"
                  />
                </Link>
                <button
                  className="pc__atc btn anim_appear-bottom btn position-absolute border-0 text-uppercase fw-medium js-add-cart js-open-aside"
                  onClick={() => addProductToCart(elm.id)}
                  title={
                    isAddedToCartProducts(elm.id)
                      ? "Already Added"
                      : "Add to Cart"
                  }
                >
                  {isAddedToCartProducts(elm.id)
                    ? "Already Added"
                    : "Add To Cart"}
                </button>
              </div>

              {/* 좋아요 하트 부분 */}
              <div className="pc__info position-relative">
                <p className="pc__category">{elm.category}</p>
                <h6 className="pc__title">
                  <Link to={`/product1_simple/${elm.id}`}>{elm.title}</Link>
                </h6>
                <div className="product-card__price d-flex">
                  <span className="money price">${elm.price}</span>
                </div>

                <button
                  className={`pc__btn-wl position-absolute top-0 end-0 bg-transparent border-0 js-add-wishlist ${
                    isAddedtoWishlist(elm.id) ? "active" : ""
                  }`}
                  title="Add To Wishlist"
                  onClick={() => toggleWishlist(elm.id)}
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
            </SwiperSlide>
          ))}

        </Swiper>

        <div className="cursor-pointer products-carousel__prev ssp11 position-absolute top-50 d-flex align-items-center justify-content-center">
          <svg
            width="25"
            height="25"
            viewBox="0 0 25 25"
            xmlns="http://www.w3.org/2000/svg"
          >
            <use href="#icon_prev_md" />
          </svg>
        </div>
        <div className="cursor-pointer products-carousel__next ssn11 position-absolute top-50 d-flex align-items-center justify-content-center">
          <svg
            width="25"
            height="25"
            viewBox="0 0 25 25"
            xmlns="http://www.w3.org/2000/svg"
          >
            <use href="#icon_next_md" />
          </svg>
        </div>

        <div className="products-pagination mt-4 mb-5 d-flex align-items-center justify-content-center"></div>
      </div>
    </section>
  );
}
