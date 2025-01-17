import Footer1 from "@/components/footers/Footer1.jsx" ;

import Header1 from "@/components/headers/Header1";
import RelatedSlider from "@/components/singleProduct/RelatedSlider";
// import SingleProduct16 from "@/components/singleProduct/SingleProduct16";

import { allProducts } from "@/data/products";

import MetaComponent from "@/components/common/MetaComponent";
import { useParams } from "react-router-dom";
const metadata = {
  title: "Shop Single Out Of Stack :: PETER PET",
  description: ":: PETER PET",
};
export default function ProductDetailsPage6() {
  let params = useParams();
  const productId = params.id;
  const product =
    allProducts.filter((elm) => elm.id == productId)[0] || allProducts[0];
  return (
    <>
      <MetaComponent meta={metadata} />
      <Header1 />
      <main className="page-wrapper">
        <div className="mb-md-1 pb-md-3"></div>
        {/* <SingleProduct16 product={product} /> */}
        <RelatedSlider />
      </main>
      < Footer1 />
    </>
  );
}
