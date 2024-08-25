import { currencyOptions, languageOptions } from "@/data/footer";

import { socialLinks } from "@/data/socials";

import { useEffect, useState } from "react";
import CartLength from "./components/CartLength";
import { openCart } from "@/utils/openCart";
import MobileNav from "./components/MobileNav";
import { Link, useNavigate } from "react-router-dom";
import { useContextElement } from "@/context/Context";

// 모바일 사이즈일 때의 header 파일

export default function MobileHeader() {
  const { cartId } = useContextElement();
  const [scrollDirection, setScrollDirection] = useState("down");
  const navigate = useNavigate();

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
    <div
      className={`header-mobile header_sticky ${scrollDirection == "up" ? "header_sticky-active" : "position-absolute"
        } `}
    >
      {/* 메뉴 navbar 아이콘 */}
      <div className="container d-flex align-items-center h-100">
        <a className="mobile-nav-activator d-block position-relative" href="#">
        <img
              src="/assets/images/mobilefooter1/menu.png"
              width="25"
              height="25"
              viewBox="0 0 18 18"
              fill="none"
            />
            <use href="#icon_nav" />

            {/*mobileNav 닫기버튼 없애버림*/}
          {/* <span className="btn-close-lg position-absolute top-0 start-0 w-100"></span> */}
        </a>

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

        <a
          // onClick={() => openCart()}
          onClick={() => navigate(`/shop_cart`)}
          className="header-tools__item header-tools__cart js-open-aside"
        >
          <img
              src="/assets/images/mobilefooter1/cart.png"
              width="25"
              height="25"
              viewBox="0 0 18 18"
              fill="none"
            />
            <use href="#icon_cart" />
          <span className="cart-amount d-block position-absolute js-cart-items-count">
            <CartLength />
          </span>
        </a>
      </div>

      <nav className="header-mobile__navigation navigation d-flex flex-column w-100 position-absolute top-100 bg-body overflow-auto">
        <div className="container">
          <form
            onSubmit={(e) => e.preventDefault()}
            className="search-field position-relative mt-4 mb-3"
          >
            <div className="position-relative">
              <input
                className="search-field__input w-100 border rounded-1"
                type="text"
                name="search-keyword"
                placeholder="Search products"
              />
              <button
                className="btn-icon search-popup__submit pb-0 me-2"
                type="submit"
              >
                <svg
                  className="d-block"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <use href="#icon_search" />
                </svg>
              </button>
              <button
                className="btn-icon btn-close-lg search-popup__reset pb-0 me-2"
                type="reset"
              ></button>
            </div>

            <div className="position-absolute start-0 top-100 m-0 w-100">
              <div className="search-result"></div>
            </div>
          </form>
        </div>

        {/* 모바일 사이즈에서 Navbar 부분 */}
        <div className="container">
          <div className="overflow-hidden">
            <ul className="navigation__list list-unstyled position-relative">
              <MobileNav />
            </ul>
          </div>
        </div>

        <div className="border-top mt-auto pb-2">
          <div className="customer-links container mt-4 mb-2 pb-1">
            <svg
              className="d-inline-block align-middle"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <use href="#icon_user" />
            </svg>
            <Link
              to="/account_dashboard">
              <span className="d-inline-block ms-2 text-uppercase align-middle fw-medium">
                My Account
              </span>
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
}
