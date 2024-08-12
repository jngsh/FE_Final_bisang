import { useContextElement } from "@/context/Context";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import BASE_URL from "@/utils/globalBaseUrl";
import { MyPageBtn } from "./MyPageBtn";
import { LoginBtn } from "./LoginBtn";

export default function MobileFooter1() {
  const [showFooter, setShowFooter] = useState(false);
  const { wishList } = useContextElement();

  const { logined } = useContextElement();

  useEffect(() => {
    setShowFooter(true);
  },[]);



  return (
    <footer
      className={`footer-mobile container w-100 px-5 d-md-none bg-body ${showFooter ? "position-fixed footer-mobile_initialized" : ""
        }`}
    >
      <div className="row text-center">
        {/* HOME 메뉴 */}
        <div className="col-3">
          <Link
            to="/"
            className="footer-mobile__link d-flex flex-column align-items-center"
          >
            <svg
              className="d-block"
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <use href="#icon_home" />
            </svg>
            <span>Home</span>
          </Link>
        </div>
        {/* <!-- /.col-3 --> */}

        {/* QR Scan 메뉴 */}
        <div className="col-3">
          <Link
            to="/home-3"
            className="footer-mobile__link d-flex flex-column align-items-center"
          >
            <div className="position-relative">
              <svg
                className="d-block"
                width="18"
                height="18"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <use href="#icon_heart" />
              </svg>
              <span className="wishlist-amount d-block position-absolute js-wishlist-count">
                {wishList.length}
              </span>
            </div>
            <span>QR SCAN</span>
          </Link>
        </div>

        {/* SHOP 메뉴 */}
        <div className="col-3">
          <Link
            to="/shop-5"
            className="footer-mobile__link d-flex flex-column align-items-center"
          >
            <svg
              className="d-block"
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <use href="#icon_hanger" />
            </svg>
            <span>Categories</span>
          </Link>
        </div>
        {/* <!-- /.col-3 --> */}
        
        
        {logined ? <MyPageBtn/> : <LoginBtn/>}
        
        {/* <!-- /.col-3 --> */}

      </div>
    </footer>
  );
}
