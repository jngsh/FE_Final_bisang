import Footer1 from "@/components/footers/Footer1.jsx";
import Header1 from "@/components/headers/Header1";
import RelatedSlider from "@/components/singleProduct/RelatedSlider";
import SingleProduct from "@/components/singleProduct/SingleProduct";
import NotFound from "@/pages/not-found";
import { useParams } from "react-router-dom";

export default function ProductDetailsPage() {
  // 파라미터로 현재 productId 가져오기
  let params = useParams();
  const productId = params.ProductId;
  const isProductExist = productId > 0 && productId < 366;

  return (
    <>
      <Header1 />
      {isProductExist ?
        <main className="page-wrapper">
          <div className="mb-md-1 pb-md-3"></div>
          {/* 제품 상세 페이지 */}
          <SingleProduct productId={productId} />
          {/* 연관 상품 슬라이더 */}
          <RelatedSlider productId={productId} />
        </main>
        : <NotFound />
      }
      < Footer1 />
    </>
  );
}
