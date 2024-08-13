import MetaComponent from "@/components/common/MetaComponent";
import PageNotFound from "./otherPages/page-not-found";
const metadata = {
  title: "피터펫 :: Page Not Found",
  description: "피터펫 :: Page Not Found",
};
export default function NotFound() {
  return (
    <>
      <MetaComponent meta={metadata} />
      <PageNotFound />
    </>
  );
}
