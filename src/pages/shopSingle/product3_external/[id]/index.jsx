import Footer1 from "@/components/footers/Footer1.jsx" ;

import Header1 from "@/components/headers/Header1";
import RelatedSlider from "@/components/singleProduct/RelatedSlider";
// import SingleProduct13 from "@/components/singleProduct/SingleProduct13";

import { allProducts } from "@/data/products";

import MetaComponent from "@/components/common/MetaComponent";
import { useParams } from "react-router-dom";
const metadata = {
  title: "Shop Single 3 :: PETER PET",
  description: ":: PETER PET",
};
export default function ProductDetailsPage3() {
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
        {/* <SingleProduct13 product={product} /> */}
        <RelatedSlider />
      </main>
      < Footer1 />
    </>
  );
}
