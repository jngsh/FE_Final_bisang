/* eslint-disable react/no-unescaped-entities */
import { Link } from "react-router-dom";

export default function Notfound() {
  return (
    <section className="page-not-found">
      <div className="content container">
        <h2 className="mb-3">😫🥲😥</h2>
        <h3 className="mb-3">페이지를 찾을 수 없습니다.</h3>
        <p className="mb-3">
         불편을 드려 죄송합니다. 페이지 요청을 다시 한번 확인해주세요.
        </p>
        <Link
          to={"/"}
          className="btn btn-primary d-flex align-items-center justify-content-center mx-auto"
        >
          홈으로 돌아가기
        </Link>
      </div>
    </section>
  );
}
