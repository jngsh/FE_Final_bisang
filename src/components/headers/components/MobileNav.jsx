import { useEffect } from "react";
import {
  additionalShopPageitems,
  blogmenuItems,
  homePages,
  othersMenuItems,
  shopDetails,
  shopList,
} from "@/data/menu";
import { Link, useLocation } from "react-router-dom";
import { useContextElement } from "@/context/Context";

// 모바일 사이즈에서 Navbar!
export default function MobileNav() {

  const { cartId } = useContextElement();
  const { pathname } = useLocation();
  const isMenuActive = (menu) => {
    return menu.split("/")[1] == pathname.split("/")[1];
  };
  const isActiveParentMenu = (menus) => {
    return menus.some(
      (menu) => menu.href.split("/")[1] == pathname.split("/")[1]
    );
  };

  useEffect(() => {
    const selectors = {
      mobileMenuActivator: ".mobile-nav-activator",
      mobileMenu: ".navigation",
      mobileMenuActiveClass: "mobile-menu-opened",
      mobileSubNavOpen: ".js-nav-right",
      mobileSubNavClose: ".js-nav-left",
      mobileSubNavHiddenClass: "d-none",
    };

    const mobileMenuActivator = document.querySelector(
      selectors.mobileMenuActivator
    );
    const mobileDropdown = document.querySelector(selectors.mobileMenu);
    let transformLeft = 0;

    const toggleMobileMenu = (event) => {
      if (event) {
        event.preventDefault();
      }

      if (document.body.classList.contains(selectors.mobileMenuActiveClass)) {
        document.body.classList.remove(selectors.mobileMenuActiveClass);
        document.body.style.paddingRight = "";
        mobileDropdown.style.paddingRight = "";
      } else {
        document.body.classList.add(selectors.mobileMenuActiveClass);
        document.body.style.paddingRight = "scrollWidth"; // Replace with appropriate value
        mobileDropdown.style.paddingRight = "scrollWidth"; // Replace with appropriate value
      }
    };

    if (mobileDropdown) {
      mobileMenuActivator &&
        mobileMenuActivator.addEventListener("click", toggleMobileMenu);

      const mobileMenu = mobileDropdown.querySelector(".navigation__list");
      let menuMaxHeight = mobileMenu.offsetHeight;

      const openSubNav = (event, btn) => {
        event.preventDefault();
        btn.nextElementSibling.classList.remove(
          selectors.mobileSubNavHiddenClass
        );

        transformLeft -= 100;
        if (menuMaxHeight < btn.nextElementSibling.offsetHeight) {
          mobileMenu.style.transform = `translateX(${transformLeft}%)`;
          mobileMenu.style.minHeight = `${btn.nextElementSibling.offsetHeight}px`;
        } else {
          mobileMenu.style.transform = `translateX(${transformLeft}%)`;
          mobileMenu.style.minHeight = `${menuMaxHeight}px`;
        }
      };

      const closeSubNav = (event, btn) => {
        event.preventDefault();
        transformLeft += 100;
        mobileMenu.style.transform = `translateX(${transformLeft}%)`;
        btn.parentElement.classList.add(selectors.mobileSubNavHiddenClass);
        const wrapper = btn.closest(".sub-menu");
        if (wrapper) {
          const minHeight =
            menuMaxHeight < wrapper.offsetHeight
              ? wrapper.offsetHeight
              : menuMaxHeight;
          mobileMenu.style.minHeight = `${minHeight}px`;
        }
      };

      mobileMenu &&
        Array.from(
          mobileMenu.querySelectorAll(selectors.mobileSubNavOpen)
        ).forEach((btn) => {
          btn.addEventListener("click", (event) => openSubNav(event, btn));
        });

      mobileMenu &&
        Array.from(
          mobileMenu.querySelectorAll(selectors.mobileSubNavClose)
        ).forEach((btn) => {
          btn.addEventListener("click", (event) => closeSubNav(event, btn));
        });

      return () => {
        mobileMenuActivator &&
          mobileMenuActivator.removeEventListener("click", toggleMobileMenu);
        mobileMenu &&
          Array.from(
            mobileMenu.querySelectorAll(selectors.mobileSubNavOpen)
          ).forEach((btn) => {
            btn.removeEventListener("click", (event) => openSubNav(event, btn));
          });
        mobileMenu &&
          Array.from(
            mobileMenu.querySelectorAll(selectors.mobileSubNavClose)
          ).forEach((btn) => {
            btn.removeEventListener("click", (event) =>
              closeSubNav(event, btn)
            );
          });
      };
    }
  }, []);
  
  useEffect(() => {
    const selectors = {
      mobileMenuActivator: ".mobile-nav-activator",
      mobileMenu: ".navigation",
      mobileMenuActiveClass: "mobile-menu-opened",
      mobileSubNavOpen: ".js-nav-right",
      mobileSubNavClose: ".js-nav-left",
      mobileSubNavHiddenClass: "d-none",
    };

    const mobileDropdown = document.querySelector(selectors.mobileMenu);

    const removeMenu = (event) => {
      if (event) {
        event.preventDefault();
      }

      if (document.body.classList.contains(selectors.mobileMenuActiveClass)) {
        document.body.classList.remove(selectors.mobileMenuActiveClass);
        document.body.style.paddingRight = "";
        mobileDropdown.style.paddingRight = "";
      }
    };
    removeMenu();
  }, [pathname]);

  return (
    <>
      {/* <li className="navigation__item">
        <a
          href="#"
          className={`navigation__link js-nav-right d-flex align-items-center ${isActiveParentMenu(othersMenuItems) ? "menu-active" : ""
            }`}
        >
          Pages
          <svg
            className="ms-auto"
            width="7"
            height="11"
            viewBox="0 0 7 11"
            xmlns="http://www.w3.org/2000/svg"
          >
            <use href="#icon_next_sm" />
          </svg>
        </a>
        <div className="sub-menu position-absolute top-0 start-100 w-100 d-none">
          <a
            href="#"
            className="navigation__link js-nav-left d-flex align-items-center border-bottom mb-2"
          >
            <svg
              className="me-2"
              width="7"
              height="11"
              viewBox="0 0 7 11"
              xmlns="http://www.w3.org/2000/svg"
            >
              <use href="#icon_prev_sm" />
            </svg>
            Pages
          </a>
          <ul className="list-unstyled">
            {othersMenuItems.map((elm, i) => (
              <li key={i} className="sub-menu__item">
                <Link
                  to={elm.href}
                  className={`menu-link menu-link_us-s ${isMenuActive(elm.href) ? "menu-active" : ""
                    }`}
                >
                  {elm.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </li> */}

      {/* 모바일 화면 메뉴 - Home 메뉴 */}
      <li className="navigation__item">
        <Link
          to="/"
          className={`navigation__link ${pathname == "/" ? "menu-active" : ""
            }`}
        >
          HOME
        </Link>
      </li>

      {/* 모바일 화면 메뉴 - QR Scan 메뉴 */}
      <li className="navigation__item">
        <Link
          to="/QrReader"
          className={`navigation__link ${pathname == "/QrReader" ? "menu-active" : ""
            }`}
        >
          QR Scan
        </Link>
      </li>
      {/* 모바일 화면 메뉴 - Cart 메뉴 */}
      <li className="navigation__item">
        <Link
          to={`/shop_cart/${cartId}`}
          className={`navigation__link ${pathname == "/shop_cart/null" ? "menu-active" : ""
            }`}
        >
          Cart
        </Link>
      </li>

      {/* 모바일 화면 메뉴 - 카테고리 메뉴 */}
      <li className="navigation__item">
        <Link
          to="/shop-5"
          className={`navigation__link ${pathname == "/shop-5" ? "menu-active" : ""
            }`}
        >
          Category
        </Link>
      </li>

      {/* 모바일 화면 메뉴 - 제품 상세페이지 메뉴 */}
      <li className="navigation__item">
        <Link
          to="/bisang/products/95"
          className={`navigation__link ${pathname == "/bisang/products/95" ? "menu-active" : ""
            }`}
        >
          Product detail
        </Link>
      </li>

      {/* 모바일 화면 메뉴 - 카카오페이 메뉴 */}
      <li className="navigation__item">
        <Link
          to="/about"
          className={`navigation__link ${pathname == "/about" ? "menu-active" : ""
            }`}
        >
          KakaoPay
        </Link>
      </li>

      {/* 모바일 화면 메뉴 - 회원가입 / 로그인 메뉴 */}
      <li className="navigation__item">
        <Link
          to="/login_register"
          className={`navigation__link ${pathname == "/login_register" ? "menu-active" : ""
            }`}
        >
          Register & Login
        </Link>
      </li>

      {/* 모바일 화면 메뉴 - 마이페이지 메뉴 */}
      <li className="navigation__item">
        <Link
          to="/account_dashboard"
          className={`navigation__link ${pathname == "/account_dashboard" ? "menu-active" : ""
            }`}
        >
          My account
        </Link>
      </li>

      {/* 모바일 화면 메뉴 - CONTACT 메뉴 */}
      <li className="navigation__item">
        <Link
          to="/contact"
          className={`navigation__link ${pathname == "/contact" ? "menu-active" : ""
            }`}
        >
          Contact
        </Link>
      </li>
    </>
  );
}
