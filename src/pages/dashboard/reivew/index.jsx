import Footer1 from "@/components/footers/Footer1.jsx";

import Header1 from "@/components/headers/Header1";


import MetaComponent from "@/components/common/MetaComponent";
import ReviewForm from "@/components/blogs/ReviewForm";
import { useLocation } from "react-router-dom";
const metadata = {
  title: "Dashboard Account Reviewlist || :: PETER PET",
  description: ":: PETER PET",
};
export default function ReviewPage() {
  const location = useLocation();
  const productId = location.state?.productId;
  const orderDetailId = location.state?.orderDetailId;
  
  return (
    <>
      <MetaComponent meta={metadata} />
      <Header1 />
      <main className="page-wrapper">
        <div className="mb-4 pb-4"></div>
        <section className="my-account container">
          <h2 className="page-title">리뷰</h2>
          <div className="row">
            <ReviewForm productId={productId} orderDetailId={orderDetailId}/>
          </div>
        </section>
      </main>

      <div className="mb-5 pb-xl-5"></div>
      < Footer1 />
    </>
  );
}
