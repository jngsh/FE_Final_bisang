import MetaComponent from "@/components/common/MetaComponent";
import Footer1 from "@/components/footers/Footer1.jsx" ;
import Header1 from "@/components/headers/Header1";
import Cart from "@/components/shopCartandCheckout/Cart";
import CheckoutSteps from "@/components/shopCartandCheckout/CheckoutSteps";
// import CheckoutSteps from "@/components/shopCartandCheckout/CheckoutSteps";
const metadata = {
  title: "Shop Cart | peterPet",
  // description: ":: PETER PET",
};
export default function ShopCartPage() {
  return (
    <>
      <MetaComponent meta={metadata} />
      <Header1 />
      <main className="page-wrapper">
        <div className="mb-4 pb-4"></div>
        <section className="shop-checkout container">
          <h2 className="page-title">쏙바구니</h2>
          <CheckoutSteps />
          <Cart />
        </section>
      </main>
      <div className="mb-5 pb-xl-5"></div>
      < Footer1 />
    </>
  );
}
