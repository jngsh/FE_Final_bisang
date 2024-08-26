import Footer1 from "@/components/footers/Footer1.jsx" ;
import Header1 from "@/components/headers/Header1";
import MetaComponent from "@/components/common/MetaComponent";
import ShopList from "@/components/shoplist/ShopList";

const metadata = {
  title: "피터펫 :: PETER PET",
};
export default function ShopPage() {
  return (
    <>
      <MetaComponent meta={metadata} />
      <Header1 />
      <main className="page-wrapper">
        <ShopList />
      </main>
      <div className="mb-5 pb-xl-5"></div>
      <Footer1 />
    </>
  );
}
