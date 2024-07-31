import Footer1 from "@/components/footers/Footer1";

import Header1 from "@/components/headers/Header1";
import RelatedSlider from "@/components/singleProduct/RelatedSlider";
import SingleProduct10 from "@/components/singleProduct/SingleProduct10";

import { allProducts } from "@/data/products";

import { useParams } from "react-router-dom";

// 우리가 쓰는 제품 디테일 페이지 !!!

export default function ProductDetailsPage15() {
  let params = useParams();
  console.log("params>>>",params);
  const productId = params.ProductId;
  console.log("productId>>>", productId);
  const product =
    allProducts.filter((elm) => elm.id == productId)[0] || allProducts[0];
  return (
    <>
      <Header1 />
      <main className="page-wrapper">
        <div className="mb-md-1 pb-md-3"></div>
        <SingleProduct10 product={product} productId={productId}/>
        <RelatedSlider />
      </main>
      <Footer1 />
    </>
  );
}
