import { useContextElement } from "@/context/Context";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function MobileFooter1() {
  const BASE_URL = "http://localhost:8090";
  const [showFooter, setShowFooter] = useState(false);
  const { wishList } = useContextElement();
  useEffect(() => {
    setShowFooter(true);
  }, []);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  useEffect(() => {
    console.log("check login>>>>>>>>>>");

    const checkLoginStatus = async () => {
      const token = localStorage.getItem("token");
      console.log("token:",token);  

      if (token) {
        try {
          const response = await axios.get(`${BASE_URL}/bisang/auth/check-login`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });

          console.log("Response from server:", response.data);

          if (response.data.authenticated === true) {
            console.log("login");
            setIsLoggedIn(true);
          } else {
            console.log("login fail");
            setIsLoggedIn(false);
          }
        } catch (error) {
          console.error("Error checking login status:", error.response?.data || error.message);
          setIsLoggedIn(false);
        }
      } else {
        console("no token");
        setIsLoggedIn(false);
      }
    };

    checkLoginStatus();
  }, []);


  return (
    <footer
      className={`footer-mobile container w-100 px-5 d-md-none bg-body ${showFooter ? "position-fixed footer-mobile_initialized" : ""
        }`}
    >
      <div className="row text-center">
        {/* HOME 메뉴 */}
        <div className="col-4">
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
        <div className="col-4">
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
        <div className="col-4">
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
            <span>Shop</span>
          </Link>
        </div>
        {/* <!-- /.col-3 --> */}

        {/* login/mypage 메뉴 */}
        <div className="col-4">
          <Link
            to={isLoggedIn ? "/account_dashboard" : "/login_register"}
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
            <span>MyPage</span>
          </Link>
        </div>
        {/* <!-- /.col-3 --> */}

      </div>
    </footer>
  );
}
