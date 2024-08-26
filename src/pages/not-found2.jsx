import MetaComponent from "@/components/common/MetaComponent";
import PageNotFound2 from "./otherPages/page-not-found2";
const metadata = {
  title: "피터펫 :: Page Not Found",
  description: "피터펫 :: Page Not Found",
};
export default function PayNotFound() {
  return (
    <>
      <MetaComponent meta={metadata} />
      <PageNotFound2 />
    </>
  );
}
