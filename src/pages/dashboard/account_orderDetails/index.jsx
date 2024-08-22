import Header1 from "@/components/headers/Header1";
import AccountOrders from "@/components/otherPages/AccountOrders";
import DashboardSidebar from "@/components/otherPages/DashboardSidebar";
//mypage-orders 이솔사용중
import MetaComponent from "@/components/common/MetaComponent";
import Footer1 from "@/components/footers/Footer1";
import OrderDetails from "@/components/otherPages/OrderDetails";
const metadata = {
  title: "주문 상세 목록 :: PETER PET",
};
export default function OrderDetailsPage() {
  return (
    <>
      <MetaComponent meta={metadata} />
      <Header1 />
      <main className="page-wrapper">
        <div className="mb-4 pb-4"></div>
        <section className="my-account container">
          <h2 className="page-title">주문 상세 정보</h2>
          <div className="row">
            <OrderDetails />
          </div>
        </section>
      </main>

      <div className="mb-5 pb-xl-5"></div>
      < Footer1 />
    </>
  );
}
