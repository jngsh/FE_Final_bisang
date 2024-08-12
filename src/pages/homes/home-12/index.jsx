import Footer1 from "@/components/footers/Footer1.jsx" ;

import Header12 from "@/components/headers/Header12";
import Blogs from "@/components/homes/home-12/Blogs";
import Category from "@/components/homes/home-12/Category";
import Cta from "@/components/homes/home-12/Cta";
import DiscountSlider from "@/components/homes/home-12/DiscountSlider";
import Featured from "@/components/homes/home-12/Featured";
import Features from "@/components/homes/home-12/Features";
import Hero from "@/components/homes/home-12/Hero";
import TopSelling from "@/components/homes/home-12/TopSelling";

import MetaComponent from "@/components/common/MetaComponent";
import Header1 from "@/components/headers/Header1";

import Cart from "@/components/shopCartandCheckout/Cart";

const metadata = {
  title: "피터펫 :: PETER PET",
  // description: "Uomo eCommerce Reactjs Template",
};
export default function HomePage12() {

  return (
    <>
      <MetaComponent meta={metadata} />
      <div className="theme-12">
        {/* 여기 헤더 디자인 1로 바꿔줬음  */}
        <Header1 /> 
        <main>
          {/* Hero 컴포넌트가 맨 위에 슬라이더 부분임 */}
          <Hero />
          <Features />
          <div className="mb-3 mb-xl-5 pb-3 pt-1 pb-xl-5"></div>
          <Featured />
          <div className="mb-3 mb-xl-4 pb-3 pt-1 pb-xl-5"></div>
          <Category />
          <div className="mb-3 mb-xl-5 pb-3 pt-1 pb-xl-5"></div>
          <TopSelling />
          <div className="mb-3 mb-xl-5 pb-3 pt-1 pb-xl-5"></div>
          <DiscountSlider />
          <div className="mb-3 mb-xl-5 pb-3 pt-1 pb-xl-5"></div>
          {/* <Blogs /> */}
          <Cta />
        </main>{" "}
        <Footer1 />
      </div>
    </>
  );
}
