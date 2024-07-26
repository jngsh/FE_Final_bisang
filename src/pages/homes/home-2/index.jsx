import Footer2 from "@/components/footers/Footer2";

import Header2 from "@/components/headers/Header2";
import Banner from "@/components/homes/home-2/Banner";
import Blogs from "@/components/homes/home-2/Blogs";
import Brands from "@/components/homes/home-2/Brands";
import Categories from "@/components/homes/home-2/Categories";
import GridBanner from "@/components/homes/home-2/GridBanner";
import Hero from "@/components/homes/home-2/Hero";
import Products from "@/components/homes/home-2/Products";
import Products2 from "@/components/homes/home-2/Products2";

import MetaComponent from "@/components/common/MetaComponent";
import { BarcodeScanner } from "./BarcodeScanner";
import { useState } from "react";



export default function HomePage2() {

  const [showScanner, setShowScanner] = useState(false);
  const [showButton, setShowButton] = useState(true);

  const openBarcodeScanner = () => {
    setShowScanner(true);
    setShowButton(false);
  }


  return (
    <>
      <Header2 />
      <main style={{ paddingTop: "100px", height: "1000px"}}>
        {showButton && (
          <button style={{ width: "100px", height: "100px"}} onClick={openBarcodeScanner}>클릭해서 스캔하기 !!!</button>
        )}
        <div className="container mw-1620 bg-white border-radius-10">
          {showScanner && <BarcodeScanner />}
        </div>
      </main>
      <Footer2 />
    </>
  );
}
