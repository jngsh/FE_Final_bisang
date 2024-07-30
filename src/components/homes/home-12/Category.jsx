import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import itemType1 from './images/itemType1.jpeg';
import itemType2 from './images/itemType2.jpeg';
import itemType3 from './images/itemType3.jpeg';

export default function Category() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await axios.get('http://localhost:8090/bisang/home/item-category');
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    }

    fetchCategories();
  }, []);

  const swiperOptions = {
    autoplay: {
      delay: 5000,
    },
    modules: [Autoplay],
    slidesPerView: 2,
    slidesPerGroup: 1,
    effect: "none",
    loop: true,
    breakpoints: {
      320: {
        slidesPerView: 2,
        slidesPerGroup: 2,
        spaceBetween: 16,
      },
      768: {
        slidesPerView: 3,
        slidesPerGroup: 4,
        spaceBetween: 20,
      },
      992: {
        slidesPerView: 4,
        slidesPerGroup: 2,
        spaceBetween: 24,
      },
      1200: {
        slidesPerView: 5,
        slidesPerGroup: 2,
        spaceBetween: 28,
      },
    },
  };

  const getImageForItemType = (itemType) => {
    switch (itemType) {
      case "간식":
        return itemType2;
      case "사료":
        return itemType1;
      case "용품":
        return itemType3;
      default:
        return itemType1;
    }
  };

  return (
    <section className="category-carousel bg-grey-f7f5ee">
      <div className="container">
        <div className="mb-3 mb-xl-5 pb-3 pt-1 pb-xl-5"></div>

        <div className="d-flex align-items-center justify-content-center justify-content-md-between flex-wrap mb-3 pb-xl-2 mb-xl-4 gap-4">
          <h2 className="section-title fw-normal">Shop By Category</h2>
          <Link
            className="btn-link btn-link_md default-underline text-uppercase fw-medium"
            to="/shop-12"
          >
            Shop All Categories
          </Link>
        </div>

        <div id="category_carousel" className="position-relative">
          <Swiper
            {...swiperOptions}
            className="swiper-container js-swiper-slider"
          >
            {categories.map((elm, i) => (
              <SwiperSlide key={i} className="swiper-slide">
                <img
                  loading="lazy"
                  className="w-100 h-auto mb-3"
                  src={getImageForItemType(elm.itemType)} // 이미지 선택
                  width="260"
                  height="220"
                  alt={elm.itemType}
                />
                <div className="text-center">
                  <a href="#" className="menu-link fw-medium pb-0">
                    {elm.itemType}
                  </a>
                  {elm.itemCount > 0 && (
                    <p className="mb-0 text-secondary">
                      {elm.itemCount} 개
                    </p>
                  )}
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className="mt-3 mt-xl-5 pb-3 pt-1 pb-xl-5"></div>
      </div>
    </section>
  );
}
