import Footer1 from "@/components/footers/Footer1";

import Header1 from "@/components/headers/Header1";

import Shop5 from "@/components/shoplist/Shop5";

import MetaComponent from "@/components/common/MetaComponent";
import Categories from "@/components/shoplist/Categories";
const metadata = {
  title: "Shop 5 || Uomo eCommerce Reactjs Template",
  description: "Uomo eCommerce Reactjs Template",
};
export default function ShopPage5() {
  return (
    <>
      <MetaComponent meta={metadata} />
      <Header1 />
      <main className="page-wrapper">
        <Categories />
        <div className="mb-4 pb-lg-3"></div>
        <Shop5 />
      </main>
      <div className="mb-5 pb-xl-5"></div>
      <Footer1 />
    </>
  );
}
