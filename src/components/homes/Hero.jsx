import { Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { HeroData } from "./data/heroData";

export default function Hero() {
  const heroData = HeroData();

  const swiperOptions = {
    autoplay: {
      delay: 5000,
    },
    modules: [Autoplay, Navigation, Pagination, EffectFade],
    navigation: {
      nextEl: ".slideshow__next",
      prevEl: ".slideshow__prev",
    },
    pagination: {
      el: ".slideshow-pagination",
      type: "bullets",
      clickable: true,
    },
    slidesPerView: 1,
    effect: "fade",
    loop: true,
  };

  return (
    <Swiper
      {...swiperOptions}
      className="swiper-container js-swiper-slider slideshow type3 slideshow-navigation-white-sm swiper-container-fade swiper-container-initialized swiper-container-horizontal swiper-container-pointer-events"
    >
      {heroData.map((elm) => (
        <SwiperSlide key={elm.id} className="swiper-slide">
          <div className="overflow-hidden position-relative h-100">
            <div
              className="slideshow-bg"
              style={{ backgroundColor: elm.backgroundColor }}
            >
              <img
                loading="lazy"
                src={elm.imageUrl}
                width="1903"
                height="560"
                alt={elm.alt}
                className="slideshow-bg__img object-fit-cover"
              />
            </div>
            <div className="position-absolute left-0 right-0 bottom-0 top-0 container">
              <div className="slideshow-character position-absolute position-right-center mx-xl-5">
                <img
                  loading="lazy"
                  src={elm.imgUrl2}
                  width="518"
                  height="329"
                  alt={elm.alt}
                  className="slideshow-character__img animate animate_fade animate_btt animate_delay-9 w-auto h-auto"
                />
              </div>
            </div>
            <div className="slideshow-text container position-absolute start-50 top-50 translate-middle">
              <h6 className="text_dash text-uppercase fs-base fw-medium animate animate_fade animate_btt animate_delay-3 theme-color">
                {elm.title}
              </h6>
              <h2 className="fs-50 fw-bold mb-2 mb-lg-3 animate animate_fade animate_btt animate_delay-5 lh-1 theme-color-secondary">
                {elm.subtitle1}
              </h2>
              <h2 className="fs-50 fw-bold mb-2 mb-lg-4 animate animate_fade animate_btt animate_delay-5 lh-1 theme-color">
                {elm.subtitle2}
              </h2>
            </div>
          </div>
        </SwiperSlide>
      ))}
      <div className="container">
        <div className="slideshow-pagination d-flex align-items-center position-absolute bottom-0 mb-5"></div>
      </div>
    </Swiper>
  );
}