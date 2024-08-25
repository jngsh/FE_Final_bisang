import Header1 from "@/components/headers/Header1";
//mypage-orders 이솔사용중
import MetaComponent from "@/components/common/MetaComponent";
import Footer1 from "@/components/footers/Footer1";
import OrderDetails from "@/components/otherPages/OrderDetails";
import './index.css'
const metadata = {
  title: "주문 상세 정보 :: PETER PET",
};
export default function OrderDetailsPage() {
  return (
    <>
      <MetaComponent meta={metadata} />
      <Header1 />
      <main className="page-wrapper">
        <div className="content-container">
          <div className="mb-4 pb-4"></div>
          <h2 className="page-title2" >주문 상세 정보</h2>
          <br />
          <OrderDetails />
        </div>
      </main>
      <div className="mb-5 pb-xl-5"></div>
      < Footer1 />
    </>
  );
}
