import MetaComponent from "@/components/common/MetaComponent";
import Footer1 from "@/components/footers/Footer1.jsx" ;
import Header1 from "@/components/headers/Header1";
import OrderTrack from "@/components/shopCartandCheckout/OrderTrack";
const metadata = {
  title: "Shop Order Tracking :: PETER PET",
  description: ":: PETER PET",
};
export default function ShopOrderTrackingPage() {
  return (
    <>
      <MetaComponent meta={metadata} />
      <Header1 />
      <main className="page-wrapper">
        <div className="mb-4 pb-4"></div>
        <OrderTrack />
      </main>
      <div className="mb-5 pb-xl-5"></div>
      < Footer1 />
    </>
  );
}
