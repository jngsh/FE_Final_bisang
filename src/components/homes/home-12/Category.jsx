import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import BASE_URL from "@/utils/globalBaseUrl";
import { useTranslation } from 'react-i18next';

export default function Category() {
  const [categories, setCategories] = useState([]);
  const { t } = useTranslation();

  const categoryMapping = {
    '1': {
      type: t("category_item_1"),
      image: "/assets/images/homeimages/category/itemType1.jpeg"
    },
    '2': {
      type: t("category_item_2"),
      image: "/assets/images/homeimages/category/itemType2.jpeg"
    },
    '3': {
      type: t("category_item_3"),
      image: "/assets/images/homeimages/category/itemType3.jpeg"
    }
  };

  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await axios.get(`${BASE_URL}/bisang/home/item-category`);
        const fetchedCategories = response.data;

        const totalItemCount = fetchedCategories.reduce((acc, category) => acc + category.itemCount, 0);

        const allCategories = fetchedCategories.map(category => {
          const itemTypeMapping = categoryMapping[category.itemType] || { type: category.itemType, image: "/assets/images/homeimages/category/itemTypeAll.jpg" };
          return {
            itemType: itemTypeMapping.type,
            itemCount: category.itemCount,
            image: itemTypeMapping.image
          };
        });

        const finalCategories = [
          { itemType: t("category_item_A"), itemCount: totalItemCount, image: "/assets/images/homeimages/category/itemTypeAll.jpg" },
          ...allCategories
        ];

        setCategories(finalCategories);

      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    }

    fetchCategories();
  }, [t]);

  const swiperOptions = {
    autoplay: {
      delay: 5000,
    },
    modules: [Autoplay],
    slidesPerView: 2,
    slidesPerGroup: 1,
    effect: "none",
    loop: false,
    breakpoints: {
      320: {
        slidesPerView: 2,
        slidesPerGroup: 1,
        spaceBetween: 16
      },
      768: {
        slidesPerView: 3,
        slidesPerGroup: 1,
        spaceBetween: 20
      },
      992: {
        slidesPerView: 4,
        slidesPerGroup: 1,
        spaceBetween: 24
      },
      1200: {
        slidesPerView: 4,
        slidesPerGroup: 1,
        spaceBetween: 28
      },
    },
  };

  return (
    <section className="category-carousel bg-grey-f7f5ee">
      <div className="container">
        <div className="mb-3 mb-xl-5 pb-3 pt-1 pb-xl-5"></div>

        <div className="category-header d-flex align-items-center justify-content-center justify-content-md-between flex-wrap mb-3 pb-xl-2 mb-xl-4 gap-4">
          <h2 className="section-title fw-normal">{t('shop_by_category')}</h2>
          <Link
            className="btn-link btn-link_md default-underline text-uppercase fw-medium"
            to="/shoplist"
          >
            {t('shop_all_categories')}
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
                  src={elm.image}
                  width="260"
                  height="220"
                  alt={elm.itemType}
                />
                <div className="text-center">
                  <Link
                    className="menu-link fw-medium pb-0"
                    to="/shoplist"
                  >
                    {elm.itemType}
                  </Link>
                  {elm.itemCount > 0 && (
                    <p className="mb-0 text-secondary">
                      {elm.itemCount} {t('category_item_count')}
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
