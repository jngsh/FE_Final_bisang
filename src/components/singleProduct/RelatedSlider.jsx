import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import BASE_URL from "@/utils/globalBaseUrl";

// productId를 가져온다
export default function RelatedSlider({ productId }) {

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [currentCategoryId, setCurrentCategoryId] = useState();
  const [sliderProduct, setSliderProduct] = useState([]);
  const currentProductId = parseInt(productId, 10); // 파라미터일 수 있는 productId를 10진수 정수로 변환해서 저장한다

  // 컴포넌트가 마운트된 후 실행하기 (useEffect())
  useEffect(() => {
    // 전체 제품 정보 가져오기
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/bisang/products`,
          {
            headers: {
              'ngrok-skip-browser-warning': true, // ngrok 사용할 때 warning 페이지 무시하기
            }
          }
        );
        setSliderProduct(response.data); // sliderProduct에 axios로 가져온 data를 넣어줌

        // 현재 제품을 찾기 위해 데이터에서 해당 제품 찾기
        const currentProduct = response.data.find(
          (product) => product.productId === parseInt(productId, 10)
        );

        if (currentProduct) {
          setCurrentCategoryId(currentProduct.categoryId);
        }
      } catch (error) {
        setError('Failed to fetch product');
        console.error("error>>>", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [productId]);

  useEffect(() => {
    if (sliderProduct && sliderProduct.length > 0 && currentCategoryId) {
      // 카테고리 ID가 같은 제품 필터링
      const filtered = sliderProduct.filter(
        (product) => product.categoryId === currentCategoryId && product.productId !== currentProductId
      );
      setFilteredProducts(filtered);
    }
  }, [sliderProduct, currentCategoryId, currentProductId]);

  if (loading) return <p></p>;
  if (error) return <p></p>;

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
    // 화면크기별로 보여줄 슬라이드 개수 설정
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
        이 제품은 어떠신가요?
      </h2>

      <div id="related_products" className="position-relative">
        <Swiper
          {...swiperOptions}
          className="swiper-container js-swiper-slider"
          data-settings=""
        >
          {/* map으로 하나씩 뽑아서 뿌려주기 */}
          {filteredProducts.slice(0, 12).map((elm, i) => (
            <SwiperSlide key={i} className="swiper-slide product-card">
              <div className="pc__img-wrapper">
                {/* 누르면 제품 상세페이지로 이동 */}
                <Link to={`/bisang/products/${elm.productId}`}>
                  <img
                    loading="lazy"
                    src={elm.productImage}
                    width="330"
                    height="400"
                    alt="peter pet"
                    className="pc__img"
                  />
                </Link>
              </div>

              <div className="pc__info position-relative">
                <h6 className="pc__title">
                  <Link to={`/bisang/products/${elm.productId}`}>{elm.productName}</Link>
                </h6>
                <div className="product-card__price d-flex">
                  <span className="money price">₩{elm.productPrice}</span>
                </div>
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
