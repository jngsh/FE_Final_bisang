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
          홈
        </Link>
      </li>

       {/* QR */}
       <li className="navigation__item">
        <Link
          to="/QrReader"
          className={`navigation__link ${pathname === "/contact" ? "menu-active" : ""}`}
        >
          QR
        </Link>
      </li>

      {/* 카테고리 */}
      <li className="navigation__item">
        <Link
          to="/shop-5"
          className={`navigation__link ${pathname === "/contact" ? "menu-active" : ""}`}
        >
          카테고리
        </Link>
      </li>

      <li className="navigation__item">
        <Link
          to="/about"
          className={`navigation__link ${pathname === "/about" ? "menu-active" : ""}`}
        >
          피터펫이란
        </Link>
      </li>
    </>
  );
}
