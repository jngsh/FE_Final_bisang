import Footer1 from "@/components/footers/Footer1.jsx" ;

import Header1 from "@/components/headers/Header1";
import CommingSoon from "@/components/otherPages/CommingSoon";

import MetaComponent from "@/components/common/MetaComponent";
const metadata = {
  title: "Comming Soon || :: PETER PET",
  description: ":: PETER PET",
};
export default function CommingSoonPage() {
  return (
    <>
      <MetaComponent meta={metadata} />
      <Header1 />
      <main className="page-wrapper">
        <div className="mb-4 pb-4"></div>
        <CommingSoon />
      </main>

      <div className="mb-5 pb-xl-5"></div>
      < Footer1 />
    </>
  );
}
