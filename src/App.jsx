/* eslint-disable react/prop-types */
/* eslint-disable react/no-unknown-property */
import Svgs from "@/components/common/Svgs";
import "react-tooltip/dist/react-tooltip.css";
import "./styles/style.scss";

import "rc-slider/assets/index.css";
import "tippy.js/dist/tippy.css";
import LoginFormPopup from "@/components/common/LoginFormPopup";

import ScrollTop from "@/components/common/ScrollTop";
import Context from "@/context/Context";
import QuickView from "@/components/modals/QuickView";
import CartDrawer from "@/components/shopCartandCheckout/CartDrawer";
import SiteMap from "@/components/modals/SiteMap";

import MobileHeader from "@/components/headers/MobileHeader";
import Delivery from "@/components/modals/Delivery";
import CustomerLogin from "@/components/asides/CustomerLogin";
import ShopFilter from "@/components/asides/ShopFilter";
import ProductDescription from "@/components/asides/ProductDescription";
import ProductAdditionalInformation from "@/components/asides/ProductAdditionalInformation";
import ProductReviews from "@/components/asides/ProductReviews";
import MobileFooter1 from "@/components/footers/MobileFooter1";
import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";

import HomePage1 from "./pages/homes/home-1"; // 얘도 메인 홈페이지인데 혹시 몰라 살려놓음
import HomePage2 from "./pages/homes/home-2"; // 다른 QR Scanner인데 혹시 몰라 살려놓음
import HomePage3 from "./pages/homes/QrReader"; // QR 일단 여기에 넣어놓음 
import HomePage12 from "./pages/homes/home-12"; // !! 우리가 쓰는 메인 홈페이지 !!

import ShopPage5 from "./pages/shoplist/shop-5";


import ProductDetailsPage15 from "./pages/shopSingle/product15_v10/[id]";
import ProductDetailsPage1 from "./pages/shopSingle/product1_simple/[id]";
import ProductDetailsPage3 from "./pages/shopSingle/product3_external/[id]";
import ProductDetailsPage4 from "./pages/shopSingle/product4_grouped/[id]";
import ProductDetailsPage5 from "./pages/shopSingle/product5_onsale/[id]";
import ProductDetailsPage6 from "./pages/shopSingle/product6_outofstock/[id]";
import ShopCartPage from "./pages/shop-cart-checkout/shop_cart";
import ShopCheckoutPage from "./pages/shop-cart-checkout/shop_checkout";
import ShopOrderComplete from "./pages/shop-cart-checkout/shop_order_complete";
import ShopOrderTrackingPage from "./pages/shop-cart-checkout/shop_order_tracking";

import AccountPage from "./pages/dashboard/account_dashboard";
import LoginPage from "./pages/otherPages/login_register";
// import StoreLocationPage from "./pages/otherPages/store_location";
// import LookbookPage from "./pages/otherPages/lookbook";
// import FaqPage from "./pages/otherPages/faq";
// import TermsPage from "./pages/otherPages/terms";
import NotFound from "./pages/not-found";
import CommingSoonPage from "./pages/otherPages/coming_soon";
import AccountOrderPage from "./pages/dashboard/account_orders";
// import OrderDetails from "./components/otherPages/orderDetails.jsx";
import AccountEditAddressPage from "./pages/dashboard/account_edit_address";
import AccountEditPage from "./pages/dashboard/account_edit";
import AccountWishlistPage from "./pages/dashboard/account_wishlist";
import ResetPasswordPage from "./pages/otherPages/reset_password";
import AboutPage from "./pages/otherPages/about";
import ContactPage from "./pages/otherPages/contact";
import ScrollTopBehaviour from "./components/common/ScrollTopBehaviour";
import AdminPage from "./components/admin/AdminPage";
import QrHome from "./pages/homes/QrReader";
import QrReader from "./pages/homes/QrReader/QrReader";

import ReviewPage from "./pages/dashboard/reivew";

// import OrderDetails from "./components/otherPages/OrderDetails.jsx";
import OrderDetailsPage from "./pages/dashboard/account_orderDetails";


function App() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      // Import the script only on the client side
      import("bootstrap/dist/js/bootstrap.esm").then(() => {
        // Module is imported, you can access any exported functionality if
      });
    }
  }, []);
  return (
    <>
      <Svgs />
      <Context>
        <MobileHeader />
        <Routes>
          <Route path="/">
            {/* 홈페이지 루트들 */}
            <Route index element={<HomePage12 />} />
            <Route path="home-1" element={<HomePage1 />} />
            <Route path="home-2" element={<HomePage2 />} />
            <Route path="QrReader" element={<QrReader />} />
            {/* 우리 쓰는 메인 페이지 !!! */}
            <Route path="home-12" element={<HomePage12 />} />

            {/* 제품 리스트 화면 루트 */}
            <Route path="shop-5" element={<ShopPage5 />} />


            {/* 우리가 쓰는 제품 디테일 페이지 !!  */}
            {/* <Route path="product15_v10/:id" element={<ProductDetailsPage15 />} /> */}
            <Route path="bisang/products/:ProductId" element={<ProductDetailsPage15 />} />
            {/* <Route path="product16_v11/:id" element={<ProductDetailsPage16 />} /> */}

            <Route path="product1_simple/:id" element={<ProductDetailsPage1 />} />
            <Route path="product3_external/:id" element={<ProductDetailsPage3 />} />
            <Route path="product4_grouped/:id" element={<ProductDetailsPage4 />} />
            <Route path="product5_onsale/:id" element={<ProductDetailsPage5 />} />
            <Route path="product6_outofstock/:id" element={<ProductDetailsPage6 />} />

            <Route path="shop_cart" element={<ShopCartPage />} />
            <Route path="shop_checkout" element={<ShopCheckoutPage />} />
            <Route path="OrderCompleted" element={<ShopOrderComplete />} />
            <Route
              path="shop_order_tracking"
              element={<ShopOrderTrackingPage />}
            />
            {/* <Route path="blog_list1" element={<BlogPage1 />} />
            <Route path="blog_list2" element={<BlogPage2 />} />
            <Route path="blog_list3" element={<BlogPage3 />} />
            <Route path="blog_single/:id" element={<BlogDetailsPage />} /> */}

            <Route path="account_dashboard" element={<AccountPage />} />
            <Route path="login_register" element={<LoginPage />} />
            {/* <Route path="store_location" element={<StoreLocationPage />} /> */}
            {/* <Route path="lookbook" element={<LookbookPage />} /> */}
            {/* <Route path="faq" element={<FaqPage />} /> */}
            {/* <Route path="terms" element={<TermsPage />} /> */}
            <Route path="page-not-found" element={<NotFound />} />
            <Route path="coming_soon" element={<CommingSoonPage />} />
            <Route path="my-orders" element={<AccountOrderPage />} />
            <Route path="order-details/:orderId" element={<OrderDetailsPage />} />

            <Route
              path="account_edit_address"
              element={<AccountEditAddressPage />}
            />
            <Route path="account_edit/:userId" element={<AccountEditPage />} />
            <Route path="account_wishlist" element={<AccountWishlistPage />} />
            <Route path="reset_password" element={<ResetPasswordPage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="contact" element={<ContactPage />} />

            <Route path="8" element={<NotFound />} />
            <Route path="bisang/admin/*" element={<AdminPage />} />

            <Route path="review-form" element={<ReviewPage/>}/>
          </Route>
        </Routes>

        <MobileFooter1 />
        <LoginFormPopup />
        <QuickView />
        <Delivery />
        <CartDrawer />
        <SiteMap />
        <CustomerLogin />
        <ShopFilter />
        <ProductDescription />
        <ProductAdditionalInformation />
        <ProductReviews />
      </Context>
      <div className="page-overlay" id="pageOverlay"></div>
      <ScrollTop />
      <ScrollTopBehaviour />
    </>
  );
}

export default App;
