import { useParams } from "react-router-dom";
import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import DashboardSidebar from "@/components/otherPages/DashboardSidebar";
import EditAccount from "@/components/otherPages/EditAccount";

import MetaComponent from "@/components/common/MetaComponent";
const metadata = {
  title: "Dashboard Account Edit || :: PETER PET",
  description: ":: PETER PET",
};
export default function AccountEditPage() {
  const userId = localStorage.getItem("userId");
  return (
    <>
      <MetaComponent meta={metadata} />
      <Header1 />
      <main className="page-wrapper">
        <div className="mb-4 pb-4"></div>
        <section className="my-account container">
          <h2 className="page-title">Account Details</h2>
          <div className="row">
            <DashboardSidebar/>
            <EditAccount userId={userId}/>
          </div>
        </section>
      </main>

      <div className="mb-5 pb-xl-5"></div>
      < Footer1 />
    </>
  );
}
