/* eslint-disable react/no-unescaped-entities */
import { Link } from "react-router-dom";

export default function Notfound2() {
  return (
    <section className="page-not-found">
      <div className="content container">
        <h2 className="mb-3">😫🥲😥</h2>
        <h3 className="mb-3">결제에 실패했어요.</h3>
        <p className="mb-3">
         불편을 드려 죄송합니다. 다시 요청해주세요.
        </p>
        <Link
          to={"/shop_cart"}
          className="btn btn-primary d-flex align-items-center justify-content-center mx-auto"
        >
          카트로 돌아가기
        </Link>
      </div>
    </section>
  );
};



