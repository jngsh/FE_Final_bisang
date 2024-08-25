import { Link, useLocation } from "react-router-dom";

import { useEffect, useState } from "react";

const steps = [
  {
    id: 1,
    href: "/shop_cart",
    number: "01",
    title: "장바구니 & 배송지 입력",
    // description: "Manage Your Items List",
  },
  // {
  //   id: 2,
  //   href: "/shop_checkout",
  //   number: "02",
  //   title: "Shipping and Checkout",
  //   description: "Checkout Your Items List",
  // },
  {
    id: 3,
    // href: "/orderCompleted", //추후 링크 삭제할것
    number: "02",
    title: "주문 확인",
    // description: "Review And Submit Your Order",
  },
];
export default function CheckoutSteps() {
  const [activePathIndex, setactivePathIndex] = useState(0);
  const { pathname } = useLocation();
  useEffect(() => {
    const activeTab = steps.filter((elm) => elm.href == pathname)[0];
    const activeTabIndex = steps.indexOf(activeTab);
    setactivePathIndex(activeTabIndex);
  }, [pathname]);
  return (
    <div className="checkout-steps">
      {steps.map((elm, i) => (
        <Link
          key={i}
          to={elm.href}
          className={`checkout-steps__item  ${
            activePathIndex >= i ? "active" : ""
          }`}
        >
          <span className="checkout-steps__item-number">{elm.number}</span>
          <span className="checkout-steps__item-title">
            <span>{elm.title}</span>
            <em>{elm.description}</em>
          </span>
        </Link>
      ))}
    </div>
  );
}
