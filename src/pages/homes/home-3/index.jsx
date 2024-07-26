import Footer3 from "@/components/footers/Footer3";

import Header3 from "@/components/headers/Header3";
import Categories from "@/components/homes/home-3/Categories";
import CategoryBanner from "@/components/homes/home-3/CategoryBanner";
import FeaturesProducts from "@/components/homes/home-3/FeaturesProducts";
import Hero from "@/components/homes/home-3/Hero";
import HotDeals from "@/components/homes/home-3/HotDeals";
import Instagram from "@/components/homes/home-3/Instagram";
import QrReader from "./QrReader";
import { useState } from "react";


export default function HomePage3() {

  const [openQr, setOpenQr] = useState(false);

  return (
    <>
      <div>
        <Header3 />
        <main style={{ paddingTop: "100px", height: "1000px"}}>
         
          <div>
            <button onClick={() => setOpenQr(!openQr)}>
              {openQr ? "닫기" : "클릭해서 스캔하기!!"}
            </button>
            {openQr && <QrReader />}
          </div>
        </main>
      </div>
    </>
  );
}
