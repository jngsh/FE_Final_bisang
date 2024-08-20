import {
  additionalShopPageitems,
  homePages,
  shopDetails,
  shopList,
  othersMenuItems,
} from "@/data/menu";
import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";

// 여기는 큰 화면일 때의 Nav 메뉴 !

export default function Nav() {
  const { pathname } = useLocation();

  const isMenuActive = (menu) => {
    return menu.split("/")[1] === pathname.split("/")[1];
  };

  const isActiveParentMenu = (menus) => {
    return menus.some(
      (menu) => menu.href.split("/")[1] === pathname.split("/")[1]
    );
  };

  useEffect(() => {
    function setBoxMenuPosition(menu) {
      const scrollBarWidth = 17; // You might need to calculate or define this value
      const limitR = window.innerWidth - menu.offsetWidth - scrollBarWidth;
      const limitL = 0;
      const menuPaddingLeft = parseInt(
        window.getComputedStyle(menu, null).getPropertyValue("padding-left")
      );
      const parentPaddingLeft = parseInt(
        window
          .getComputedStyle(menu.previousElementSibling, null)
          .getPropertyValue("padding-left")
      );
      const centerPos =
        menu.previousElementSibling.offsetLeft -
        menuPaddingLeft +
        parentPaddingLeft;

      let menuPos = centerPos;
      if (centerPos < limitL) {
        menuPos = limitL;
      } else if (centerPos > limitR) {
        menuPos = limitR;
      }

      menu.style.left = `${menuPos}px`;
    }
    document.querySelectorAll(".box-menu").forEach((el) => {
      setBoxMenuPosition(el);
    });
  }, []);

  return (
    <>
      <li className="navigation__item">
        <Link to="/" className={`navigation__link ${isActiveParentMenu(homePages) ? "menu-active" : ""}`}>
          Home
        </Link>
      </li>

      {/* 큰 Navbar에서 Shop 메뉴 부분 */}
      <li className="navigation__item">
        <a
          href="#"
          className={`navigation__link ${isActiveParentMenu(shopList) || isActiveParentMenu(shopDetails) || isActiveParentMenu(additionalShopPageitems) ? "menu-active" : ""}`}
        >
          Shop
        </a>
        <div className="mega-menu">
          <div className="container d-flex">
            <div className="col pe-4">
              <a href="#" className="sub-menu__title">Shop List</a>
              <ul className="sub-menu__list list-unstyled">
                {shopList.map((elm, i) => (
                  <li key={i} className="sub-menu__item">
                    <Link
                      to={elm.href}
                      className={`menu-link menu-link_us-s ${isMenuActive(elm.href) ? "menu-active" : ""}`}
                    >
                      {elm.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="col pe-4">
              <a href="#" className="sub-menu__title">Shop Detail</a>
              <ul className="sub-menu__list list-unstyled">
                {shopDetails.map((elm, i) => (
                  <li key={i} className="sub-menu__item">
                    <Link
                      to={elm.href}
                      className={`menu-link menu-link_us-s ${isMenuActive(elm.href) ? "menu-active" : ""}`}
                    >
                      {elm.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="col pe-4">
              <a href="#" className="sub-menu__title">Other Pages</a>
              <ul className="sub-menu__list list-unstyled">
                {additionalShopPageitems.map((elm, i) => (
                  <li key={i} className="sub-menu__item">
                    <Link
                      to={elm.href}
                      className={`menu-link menu-link_us-s ${isMenuActive(elm.href) ? "menu-active" : ""}`}
                    >
                      {elm.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          {/* <!-- /.container d-flex --> */}
        </div>
      </li>

      {/* 큰 화면에서 QR로 가는 메뉴를 만들었다 */}
      <li className="navigation__item">
        <Link
          to="/QrReader"
          className={`navigation__link ${pathname === "/contact" ? "menu-active" : ""}`}
        >
          QR Scan
        </Link>
      </li>

      <li className="navigation__item">
        <a
          href="#"
          className={`navigation__link ${isActiveParentMenu(othersMenuItems) ? "menu-active" : ""}`}
        >
          Pages
        </a>
        <ul className="default-menu list-unstyled">
          {othersMenuItems.map((elm, i) => (
            <li key={i} className="sub-menu__item">
              <Link
                to={elm.href}
                className={`menu-link menu-link_us-s ${isMenuActive(elm.href) ? "menu-active" : ""}`}
              >
                {elm.title}
              </Link>
            </li>
          ))}
        </ul>
      </li>

      <li className="navigation__item">
        <Link
          to="/about"
          className={`navigation__link ${pathname === "/about" ? "menu-active" : ""}`}
        >
          About
        </Link>
      </li>

      <li className="navigation__item">
        <Link
          to="/contact"
          className={`navigation__link ${pathname === "/contact" ? "menu-active" : ""}`}
        >
          Contact
        </Link>
      </li>
    </>
  );
}
