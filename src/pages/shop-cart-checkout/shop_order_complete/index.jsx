import MetaComponent from "@/components/common/MetaComponent";
import Footer1 from "@/components/footers/Footer1.jsx" ;
import Header1 from "@/components/headers/Header1";

// import CheckoutSteps from "@/components/shopCartandCheckout/CheckoutSteps";
import OrderCompleted from "@/components/shopCartandCheckout/OrderCompleted";
const metadata = {
  title: "결제 완료 :: Peter Pet",
  description: "Uomo eCommerce Reactjs Template",
};
export default function ShopOrderComplete() {
  return (
    <>
      <MetaComponent meta={metadata} />
      <Header1 />
      <main className="page-wrapper">
        <div className="mb-4 pb-4"></div>
        <section className="shop-checkout container">
          {/* <h2 className="page-title">ORDER RECEIVED</h2>
          <CheckoutSteps /> */}
          <OrderCompleted />
        </section>
      </main>
      <div className="mb-5 pb-xl-5"></div>
      < Footer1 />
    </>
  );
}
