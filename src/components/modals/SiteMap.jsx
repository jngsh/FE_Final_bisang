import { Link, useLocation } from "react-router-dom";

export default function SiteMap() {
  const { pathname } = useLocation();




  return (
    <div className="modal fade" id="siteMap" tabIndex="-1">
      <div className="modal-dialog modal-fullscreen">
        <div className="sitemap d-flex">
          <div className="w-50 d-none d-lg-block">
            <img
              width={960}
              height={950}
              style={{ height: "fit-content" }}
              loading="lazy"
              src="/assets/images/nav-bg.jpg"
              alt="Site map"
              className="sitemap__bg"
            />
          </div>
          {/* <!-- /.sitemap__bg w-50 d-none d-lg-block --> */}
          <div className="sitemap__links w-50 flex-grow-1">
            <div className="modal-content">
              <div className="modal-header">
                <button
                  type="button"
                  className="btn-close-lg"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>

              <div className="modal-body">
                <div className="tab-content col-12" id="pills-tabContent">
                  <div
                    className="tab-pane fade show active"
                    id="pills-item-1"
                    role="tabpanel"
                    aria-labelledby="pills-item-1-tab"
                  >
                    <div className="row">
                      <ul
                        className="nav nav-tabs list-unstyled col-5 d-block"
                        id="myTab"
                        role="tablist"
                      >
                        {/* <li
                          className="nav-item position-relative"
                          role="presentation"
                        >
                          <a
                            className="nav-link nav-link_rline active"
                            id="tab-item-1-tab"
                            data-bs-toggle="tab"
                            href="#tab-item-1"
                            role="tab"
                            aria-controls="tab-item-1"
                            aria-selected="true"
                          >
                            <span className="rline-content">WOMEN</span>
                          </a>
                        </li>
                        <li
                          className="nav-item position-relative"
                          role="presentation"
                        >
                          <a
                            className="nav-link nav-link_rline"
                            id="tab-item-2-tab"
                            data-bs-toggle="tab"
                            href="#tab-item-2"
                            role="tab"
                            aria-controls="tab-item-2"
                            aria-selected="false"
                          >
                            <span className="rline-content">MAN</span>
                          </a>
                        </li>
                        <li
                          className="nav-item position-relative"
                          role="presentation"
                        >
                          <a
                            className="nav-link nav-link_rline"
                            id="tab-item-3-tab"
                            data-bs-toggle="tab"
                            href="#tab-item-3"
                            role="tab"
                            aria-controls="tab-item-3"
                            aria-selected="false"
                          >
                            <span className="rline-content">KIDS</span>
                          </a>
                        </li> */}
                        <li
                          className="nav-item position-relative"
                          role="presentation"
                        >
                          <Link
                            to="/"
                            className={`nav-link nav-link_rline ${pathname === "/" ? "menu-active" : ""}`}
                          >
                            <span className="rline-content">HOME</span>
                          </Link>
                        </li>

                        <li
                          className="nav-item position-relative"
                          role="presentation"
                        >
                          <Link
                            to="/QrReader"
                            className={`nav-link nav-link_rline ${pathname == "/QrReader" ? "menu-active" : ""}`}
                          >
                            <span className="rline-content">QR Scan</span>
                          </Link>
                        </li><li
                          className="nav-item position-relative"
                          role="presentation"
                        >
                          <Link
                            to="/shop_cart"
                            className={`nav-link nav-link_rline ${pathname == "/shop_cart/null" ? "menu-active" : ""}`}
                          >
                            <span className="rline-content">Cart</span>
                          </Link>
                        </li><li
                          className="nav-item position-relative"
                          role="presentation"
                        >
                          <Link
                            to="/shop-5"
                            className={`nav-link nav-link_rline ${pathname == "/shop-5" ? "menu-active" : ""}`}
                          >
                            <span className="rline-content">Category</span>
                          </Link>
                        </li><li
                          className="nav-item position-relative"
                          role="presentation"
                        >
                          <Link
                            to="/bisang/products/95"
                            className={`nav-link nav-link_rline ${pathname == "/bisang/products/95" ? "menu-active" : ""}`}
                          >
                            <span className="rline-content">Product detail</span>
                          </Link>
                        </li><li
                          className="nav-item position-relative"
                          role="presentation"
                        >
                          <Link
                            to="/login_register"
                            className={`nav-link nav-link_rline ${pathname == "/login_register" ? "menu-active" : ""}`}
                          >
                            <span className="rline-content">Register & Login</span>
                          </Link>
                        </li><li
                          className="nav-item position-relative"
                          role="presentation"
                        >
                          <Link
                            to="/about"
                            className={`nav-link nav-link_rline ${pathname == "/about" ? "menu-active" : ""}`}
                          >
                            <span className="rline-content">About</span>
                          </Link>
                        </li><li
                          className="nav-item position-relative"
                          role="presentation"
                        >
                          <Link
                            to="/contact"
                            className={`nav-link nav-link_rline ${pathname == "/contact" ? "menu-active" : ""}`}
                          >
                            <span className="rline-content">Contact</span>
                          </Link>
                        </li>

                        {/* <li
                          className="nav-item position-relative"
                          role="presentation"
                        >
                          <a className="nav-link nav-link_rline" href="#">
                            <span className="rline-content">COLLECTION</span>
                          </a>
                        </li>
                        <li
                          className="nav-item position-relative"
                          role="presentation"
                        >
                          <a
                            className="nav-link nav-link_rline text-red"
                            href="#"
                          >
                            SALE UP TO 50% OFF
                          </a>
                        </li>
                        <li
                          className="nav-item position-relative"
                          role="presentation"
                        >
                          <a className="nav-link nav-link_rline" href="#">
                            <span className="rline-content">sb누ㅜ뉴</span>
                          </a>
                        </li>
                        <li
                          className="nav-item position-relative"
                          role="presentation"
                        >
                          <a className="nav-link nav-link_rline" href="#">
                            <span className="rline-content">SHOES</span>
                          </a>
                        </li>

                        <li
                          className="nav-item position-relative"
                          role="presentation"
                        >
                          <a className="nav-link nav-link_rline" href="#">
                            <span className="rline-content">SHOES</span>
                          </a>
                        </li>

                        <li
                          className="nav-item position-relative"
                          role="presentation"
                        >
                          <a className="nav-link nav-link_rline" href="#">
                            <span className="rline-content">SHOES</span>
                          </a>
                        </li>

                        <li
                          className="nav-item position-relative"
                          role="presentation"
                        >
                          <a className="nav-link nav-link_rline" href="#">
                            <span className="rline-content">SHOES</span>
                          </a>
                        </li> */}

                      </ul>

                    </div>
                    {/* <!-- /.row --> */}
                  </div>

                </div>
              </div>
              {/* <!-- /.modal-body --> */}
            </div>
            {/* <!-- /.modal-content --> */}
          </div>
          {/* <!-- /.sitemap__links w-50 flex-grow-1 --> */}
        </div>
      </div>
      {/* <!-- /.modal-dialog modal-fullscreen --> */}
    </div>
  );
}
