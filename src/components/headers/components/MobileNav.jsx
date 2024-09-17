import { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useContextElement } from "@/context/Context";
import { useTranslation } from 'react-i18next';

// 모바일 Nav
export default function MobileNav() {

  const userId = localStorage.getItem("userId");
  const { setLogined, setCartId, setCartProducts, setOrderDetails } = useContextElement();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { t } = useTranslation();

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
        document.body.style.paddingRight = "scrollWidth";
        mobileDropdown.style.paddingRight = "scrollWidth";
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

  const handleLogout = (event) => {
    event.preventDefault();
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    setLogined(false);
    setCartId(null);
    setCartProducts([]);
    setOrderDetails([]);
    localStorage.setItem("logined", JSON.stringify(false));
    localStorage.setItem("cartId", null);
    localStorage.setItem("cartProducts", JSON.stringify([]));
    localStorage.setItem("orderDetails", JSON.stringify([]));

    navigate("/login_register");
  }

  return (
    <>
      {/* 모바일 화면 메뉴 - Home 메뉴 */}
      <li className="navigation__item">
        <Link
          to="/"
          className={`navigation__link ${pathname == "/" ? "menu-active" : ""
            }`}
        >
          {t('home')}
        </Link>
      </li>

      {/* 모바일 화면 메뉴 - QR Scan 메뉴 */}
      <li className="navigation__item">
        <Link
          to="/QrReader"
          className={`navigation__link ${pathname == "/QrReader" ? "menu-active" : ""
            }`}
        >
          {t('qr')}
        </Link>
      </li>
      {/* 모바일 화면 메뉴 - Cart 메뉴 */}
      <li className="navigation__item">
        <Link
          to={`/shop_cart`}
          className={`navigation__link ${pathname == "/shop_cart/null" ? "menu-active" : ""
            }`}
        >
          {t('cart')}
        </Link>
      </li>

      {/* 모바일 화면 메뉴 - 카테고리 메뉴 */}
      <li className="navigation__item">
        <Link
          to="/shoplist"
          className={`navigation__link ${pathname == "/shoplist" ? "menu-active" : ""
            }`}
        >
          {t('categories')}
        </Link>
      </li>

      {/* 모바일 화면 메뉴 - about 메뉴 */}
      <li className="navigation__item">
        <Link
          to="/about"
          className={`navigation__link ${pathname == "/about" ? "menu-active" : ""
            }`}
        >
          {t('peterpet')}
        </Link>
      </li>

      {/* 모바일 화면 메뉴 - 회원가입 / 로그인 메뉴 */}
      <li className="navigation__item">
        {userId ? (
          <Link
            to="#"
            onClick={handleLogout}
            className={`navigation__link ${pathname === "#" ? "menu-active" : ""}`}>
            {t('logout')}
          </Link>
        ) : (<Link
          to="/login_register"
          className={`navigation__link ${pathname == "/login_register" ? "menu-active" : ""
            }`}
        >
          {t('signupLogin')}
        </Link>
        )}
      </li>
    </>
  );
}
