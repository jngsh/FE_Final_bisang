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

// 모바일 사이즈에서 Navbar!!
export default function MobileNav() {
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
      {/* 모바일 화면 메뉴 - HOME 메뉴 */}
      <li className="navigation__item">
        <a
          href="/"
          className={`navigation__link js-nav-right d-flex align-items-center ${isActiveParentMenu(homePages) ? "menu-active" : ""
            }`}
        >
          Home {/*네비들어가면 바로 있는 홈*/}
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
            href="/"
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
            Home{/*네비home눌렀을때또나오는home*/}
          </a>
          <ul className="list-unstyled">
            {homePages.map((elm, i) => (
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
          {/* <!-- /.box-menu --> */}
        </div>
      </li>

      {/* shop 메뉴 */}
      <li className="navigation__item">
        <a
          href="#"
          className={`navigation__link js-nav-right d-flex align-items-center ${isActiveParentMenu([
            ...shopList,
            ...shopDetails,
            ...additionalShopPageitems,
          ])
            ? "menu-active"
            : ""
            }`}
        >
          Shop
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
            className="navigation__link js-nav-left d-flex align-items-center border-bottom mb-3"
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
            Shop
          </a>

          <div className="sub-menu__wrapper">
            {/* shop list 메뉴 */}
            <a
              href="#"
              className={`navigation__link js-nav-right d-flex align-items-center ${isActiveParentMenu(shopList) ? "menu-active" : ""
                }`}
            >
              Shop List
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
            <div className="sub-menu__wrapper position-absolute top-0 start-100 w-100 d-none">
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
                Shop List
              </a>
              <ul className="sub-menu__list list-unstyled">
                {shopList.map((elm, i) => (
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

            {/* shop detail 메뉴 */}
            <a
              href="#"
              className={`navigation__link js-nav-right d-flex align-items-center ${isActiveParentMenu(shopDetails) ? "menu-active" : ""
                }`}
            >
              Shop Detail
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
            <div className="sub-menu__wrapper position-absolute top-0 start-100 w-100 d-none">
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
                Shop Detail
              </a>
              <ul className="sub-menu__list list-unstyled">
                {shopDetails.map((elm, i) => (
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

            {/* other pages 메뉴 */}
            <a
              href="#"
              className={`navigation__link js-nav-right d-flex align-items-center ${isActiveParentMenu(additionalShopPageitems) ? "menu-active" : ""
                }`}
            >
              Other Pages
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
            <div className="sub-menu__wrapper position-absolute top-0 start-100 w-100 d-none">
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
                Other Pages
              </a>
              <ul className="sub-menu__list list-unstyled">
                {additionalShopPageitems.map((elm, i) => (
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
            {/* <!-- /.sub-menu__wrapper --> */}
          </div>
          {/* <!-- /.sub-menu__wrapper --> */}
        </div>
        {/* <!-- /.sub-menu --> */}
      </li>

      <li className="navigation__item">
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
      </li>

      {/* 모바일 화면 메뉴 - QR Scan 메뉴 */}
      <li className="navigation__item">
        <Link
          to="/home-3"
          className={`navigation__link ${pathname == "/contact" ? "menu-active" : ""
            }`}
        >
          QR Scan
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
      
      {/* 모바일 화면 메뉴 - ABOUT 메뉴 */}
      <li className="navigation__item">
        <Link
          to="/about"
          className={`navigation__link ${pathname == "/about" ? "menu-active" : ""
            }`}
        >
                  카카오페이결제

        </Link>
      </li>

    </>
  );
}
