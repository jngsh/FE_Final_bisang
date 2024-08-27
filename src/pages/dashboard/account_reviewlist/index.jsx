import Footer1 from "@/components/footers/Footer1.jsx";

import Header1 from "@/components/headers/Header1";
import AccountReviews from "@/components/otherPages/AccountReviews";

import MetaComponent from "@/components/common/MetaComponent";
const metadata = {
  title: "Dashboard Account Reviewlist || :: PETER PET",
  description: ":: PETER PET",
};
export default function AccountReviewlistPage() {
  return (
    <>
      <MetaComponent meta={metadata} />
      <Header1 />
      <main className="page-wrapper">
        <div className="mb-4 pb-4"></div>
        <section className="my-account container">
          <h2 className="page-title">리뷰</h2>
          <div className="row">
            <AccountReviews />
          </div>
        </section>
      </main>

      <div className="mb-5 pb-xl-5"></div>
      < Footer1 />
    </>
  );
}
