import Header1 from "@/components/headers/Header1";
import AccountOrders from "@/components/otherPages/AccountOrders";
import DashboardSidebar from "@/components/otherPages/DashboardSidebar";

import MetaComponent from "@/components/common/MetaComponent";
import Footer1 from "@/components/footers/Footer1";
const metadata = {
  title: "Dashboard Account Orders || :: PETER PET",
  description: ":: PETER PET",
};
export default function AccountOrderPage() {
  return (
    <>
      <MetaComponent meta={metadata} />
      <Header1 />
      <main className="page-wrapper">
        <div className="mb-4 pb-4"></div>
        <section className="my-account container">
          <h2 className="page-title">Orders</h2>
          <div className="row">
            <DashboardSidebar />
            <AccountOrders />
          </div>
        </section>
      </main>

      <div className="mb-5 pb-xl-5"></div>
      < Footer1 />
    </>
  );
}
