import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Nav from "./components/Nav";
import { openCart } from "@/utils/openCart";
import CartLength from "./components/CartLength";

import User from "./components/User";
import SearchPopup from "./components/SearchPopup";
import { useContextElement } from "@/context/Context";
import { MyPageBtn } from "../footers/MyPageBtn";
import { LoginBtn } from "../footers/LoginBtn";

export default function Header1() {
  const navigate = useNavigate();
  const [scrollDirection, setScrollDirection] = useState("down");
  const { cartId } = useContextElement();
  const logined= localStorage.getItem("logined");
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > 250) {
        if (currentScrollY > lastScrollY.current) {
          // Scrolling down
          setScrollDirection("down");
        } else {
          // Scrolling up
          setScrollDirection("up");
        }
      } else {
        // Below 250px
        setScrollDirection("down");
      }

      lastScrollY.current = currentScrollY;
    };

    const lastScrollY = { current: window.scrollY };

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Cleanup: remove event listener when component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <header
      id="header"
      className={`header header_sticky ${scrollDirection == "up" ? "header_sticky-active" : "position-absolute"
        } `}
    >
      <div className="container">
        <div className="header-desk header-desk_type_1">
          <div className="logo">
            <Link to="/">
              <img
                src="/assets/images/logo.png"
                width={112}
                height={28}
                alt="Peter Pet"
                className="logo__image d-block"
              />
            </Link>
          </div>

          <nav className="navigation">
            <ul className="navigation__list list-unstyled d-flex">
              {/* 컴퓨터화면 navbar */}
              <Nav />
            </ul>
          </nav>

          <div className="header-tools d-flex align-items-center">

              <a
                // href="/shop-5"
                onClick={() => navigate(`/shoplist`)}
                className="header-tools__item header-tools__cart js-open-aside"
              >
                <img
                  src="/assets/images/mobilefooter1/categories.png"
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                />
              </a>

            {/* 마이페이지 아이콘 */}
            <a
              onClick={() => {(logined === "true" && logined)? navigate(`/account_edit/${userId}`) : navigate(`/login_register`)}}
              className="header-tools__item header-tools__cart js-open-aside"
              style={{marginRight: '16px'}}
            >
              <svg
                className="d-block"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <use href="#icon_user" />
              </svg>
            </a>

            {/* 카트 아이콘 */}
            <a
              // onClick={() => openCart()}
              onClick={() => navigate(`/shop_cart`)}
              className="header-tools__item header-tools__cart js-open-aside"
            >
              <svg
                className="d-block"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <use href="#icon_cart" />
              </svg>
              <span className="cart-amount d-block position-absolute js-cart-items-count">
                <CartLength />
              </span>
            </a>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        

            {/* 메뉴 navbar 아이콘 */}
            {/* <a
              className="header-tools__item"
              href="#"
              data-bs-toggle="modal"
              data-bs-target="#siteMap"
            >
              <svg
                className="nav-icon"
                width="25"
                height="18"
                viewBox="0 0 25 18"
                xmlns="http://www.w3.org/2000/svg"
              >
                <use href="#icon_nav" />
              </svg>
            </a> */}
          </div>
        </div>
      </div>
    </header>
  );
}
