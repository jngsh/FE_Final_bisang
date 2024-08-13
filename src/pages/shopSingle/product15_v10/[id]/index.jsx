import Footer1 from "@/components/footers/Footer1.jsx";

import Header1 from "@/components/headers/Header1";
import Notfound from "@/components/otherPages/Notfound";
import RelatedSlider from "@/components/singleProduct/RelatedSlider";
import SingleProduct10 from "@/components/singleProduct/SingleProduct10";

import { allProducts } from "@/data/products";
import NotFound from "@/pages/not-found";

import { useParams } from "react-router-dom";

// 우리가 쓰는 제품 디테일 페이지 !!!

export default function ProductDetailsPage() {

  // 파라미터로 현재 productId 가져오기
  let params = useParams();
  console.log("params>>>", params);
  const productId = params.ProductId;
  console.log("productId>>>", productId);
  // 일단 하드코딩으로 productId 있는지 없는지 해놨는데 수정 필요 !
  const isProductExist = productId > 0 && productId < 419;
  console.log(">>>", isProductExist);

  // const product =
  //   allProducts.filter((elm) => elm.id == productId)[0] || allProducts[0];

  return (
    <>
      <Header1 />
      {isProductExist ?
        <main className="page-wrapper">
          <div className="mb-md-1 pb-md-3"></div>
          {/* <SingleProduct10 product={product} productId={productId} /> */}
          <SingleProduct10 productId={productId} />
          <RelatedSlider productId={productId} />
        </main>
        : <NotFound />
      }
      < Footer1 />
    </>
  );
}
