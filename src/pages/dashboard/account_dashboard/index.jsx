import Footer1 from "@/components/footers/Footer1.jsx";

import Header1 from "@/components/headers/Header1";
import Dashboard from "@/components/otherPages/Dashboard";
import DashboardSidebar from "@/components/otherPages/DashboardSidebar";

import MetaComponent from "@/components/common/MetaComponent";
const metadata = {
  title: "Dashboard-account || :: PETER PET",
  description: ":: PETER PET",
};
export default function AccountPage() {
  const userId = localStorage.getItem("userId");
  return (
    <>
      <MetaComponent meta={metadata} />
      <Header1 />
      <main className="page-wrapper">
        <div className="mb-4 pb-4"></div>
        <section className="my-account container">
          <h2 className="page-title">마이펫</h2>
          <div className="row">
            {/* <DashboardSidebar /> */}
            <Dashboard />
          </div>
        </section>
      </main>

      <div className="mb-5 pb-xl-5"></div>
      < Footer1 />
    </>
  );
}
