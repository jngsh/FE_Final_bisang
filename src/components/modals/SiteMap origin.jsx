import { Link } from "react-router-dom";

export default function SiteMap() {
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
                        <li
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
                        </li>
                        <li
                          className="nav-item position-relative"
                          role="presentation"
                        >
                          <a className="nav-link nav-link_rline" href="#">
                            <span className="rline-content">HOME</span>
                          </a>
                        </li>
                        <li
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
                            <span className="rline-content">ACCESSORIES</span>
                          </a>
                        </li>
                        <li
                          className="nav-item position-relative"
                          role="presentation"
                        >
                          <a className="nav-link nav-link_rline" href="#">
                            <span className="rline-content">JOIN LIFE</span>
                          </a>
                        </li>
                        <li
                          className="nav-item position-relative"
                          role="presentation"
                        >
                          <a className="nav-link nav-link_rline" href="#">
                            <span className="rline-content">#UOMOSTYLE</span>
                          </a>
                        </li>
                      </ul>

                      <div className="tab-content col-7" id="myTabContent">
                        <div
                          className="tab-pane fade show active"
                          id="tab-item-1"
                          role="tabpanel"
                          aria-labelledby="tab-item-1-tab"
                        >
                          <ul className="sub-menu list-unstyled">
                            <li className="sub-menu__item">
                              <a href="#" className="menu-link menu-link_us-s">
                                NEW  
                              </a>
                            </li>
                            <li className="sub-menu__item">
                              <a href="#" className="menu-link menu-link_us-s">
                                Best Sellers
                              </a>
                            </li>
                            <li className="sub-menu__item">
                              <a href="#" className="menu-link menu-link_us-s">
                                Collaborations®
                              </a>
                            </li>
                            <li className="sub-menu__item">
                              <a href="#" className="menu-link menu-link_us-s">
                                Sets
                              </a>
                            </li>
                            <li className="sub-menu__item">
                              <a href="#" className="menu-link menu-link_us-s">
                                Denim
                              </a>
                            </li>
                            <li className="sub-menu__item">
                              <a href="#" className="menu-link menu-link_us-s">
                                Jackets & Coats
                              </a>
                            </li>
                            <li className="sub-menu__item">
                              <a href="#" className="menu-link menu-link_us-s">
                                Overshirts
                              </a>
                            </li>
                            <li className="sub-menu__item">
                              <a href="#" className="menu-link menu-link_us-s">
                                Trousers
                              </a>
                            </li>
                            <li className="sub-menu__item">
                              <a href="#" className="menu-link menu-link_us-s">
                                Jeans
                              </a>
                            </li>
                            <li className="sub-menu__item">
                              <a href="#" className="menu-link menu-link_us-s">
                                Dresses
                              </a>
                            </li>
                            <li className="sub-menu__item">
                              <a href="#" className="menu-link menu-link_us-s">
                                Sweatshirts and Hoodies
                              </a>
                            </li>
                            <li className="sub-menu__item">
                              <a href="#" className="menu-link menu-link_us-s">
                                T-shirts & Tops
                              </a>
                            </li>
                            <li className="sub-menu__item">
                              <a href="#" className="menu-link menu-link_us-s">
                                Shirts & Blouses
                              </a>
                            </li>
                            <li className="sub-menu__item">
                              <a href="#" className="menu-link menu-link_us-s">
                                Shorts and Bermudas
                              </a>
                            </li>
                            <li className="sub-menu__item">
                              <a href="#" className="menu-link menu-link_us-s">
                                Shoes
                              </a>
                            </li>
                            <li className="sub-menu__item">
                              <Link
                                to="/shop3"
                                className="menu-link menu-link_us-s"
                              >
                                Accessories
                              </Link>
                            </li>
                            <li className="sub-menu__item">
                              <a href="#" className="menu-link menu-link_us-s">
                                Bags
                              </a>
                            </li>
                            <li className="sub-menu__item">
                              <Link
                                to="/about"
                                className="menu-link menu-link_us-s"
                              >
                                Gift Card
                              </Link>
                            </li>
                          </ul>
                          {/* <!-- /.sub-menu --> */}
                        </div>
                        <div
                          className="tab-pane fade"
                          id="tab-item-2"
                          role="tabpanel"
                          aria-labelledby="tab-item-2-tab"
                        >
                          <ul className="sub-menu list-unstyled">
                            <li className="sub-menu__item">
                              <a href="#" className="menu-link menu-link_us-s">
                                Best Sellers
                              </a>
                            </li>
                            <li className="sub-menu__item">
                              <a href="#" className="menu-link menu-link_us-s">
                                New
                              </a>
                            </li>
                            <li className="sub-menu__item">
                              <a href="#" className="menu-link menu-link_us-s">
                                Sets
                              </a>
                            </li>
                            <li className="sub-menu__item">
                              <a href="#" className="menu-link menu-link_us-s">
                                Denim
                              </a>
                            </li>
                            <li className="sub-menu__item">
                              <a href="#" className="menu-link menu-link_us-s">
                                Collaborations®
                              </a>
                            </li>
                            <li className="sub-menu__item">
                              <a href="#" className="menu-link menu-link_us-s">
                                Trousers
                              </a>
                            </li>
                            <li className="sub-menu__item">
                              <a href="#" className="menu-link menu-link_us-s">
                                Jackets & Coats
                              </a>
                            </li>
                            <li className="sub-menu__item">
                              <a href="#" className="menu-link menu-link_us-s">
                                Overshirts
                              </a>
                            </li>
                            <li className="sub-menu__item">
                              <a href="#" className="menu-link menu-link_us-s">
                                Dresses
                              </a>
                            </li>
                            <li className="sub-menu__item">
                              <a href="#" className="menu-link menu-link_us-s">
                                Jeans
                              </a>
                            </li>
                            <li className="sub-menu__item">
                              <a href="#" className="menu-link menu-link_us-s">
                                Sweatshirts and Hoodies
                              </a>
                            </li>
                            <li className="sub-menu__item">
                              <Link
                                to="/about"
                                className="menu-link menu-link_us-s"
                              >
                                Gift Card
                              </Link>
                            </li>
                            <li className="sub-menu__item">
                              <a href="#" className="menu-link menu-link_us-s">
                                Shirts & Blouses
                              </a>
                            </li>
                            <li className="sub-menu__item">
                              <a href="#" className="menu-link menu-link_us-s">
                                T-shirts & Tops
                              </a>
                            </li>
                            <li className="sub-menu__item">
                              <a href="#" className="menu-link menu-link_us-s">
                                Shorts and Bermudas
                              </a>
                            </li>
                            <li className="sub-menu__item">
                              <Link
                                to="/shop3"
                                className="menu-link menu-link_us-s"
                              >
                                Accessories
                              </Link>
                            </li>
                            <li className="sub-menu__item">
                              <a href="#" className="menu-link menu-link_us-s">
                                Shoes
                              </a>
                            </li>
                            <li className="sub-menu__item">
                              <a href="#" className="menu-link menu-link_us-s">
                                Bags
                              </a>
                            </li>
                          </ul>
                          {/* <!-- /.sub-menu --> */}
                        </div>
                        <div
                          className="tab-pane fade"
                          id="tab-item-3"
                          role="tabpanel"
                          aria-labelledby="tab-item-3-tab"
                        >
                          <ul className="sub-menu list-unstyled">
                            <li className="sub-menu__item">
                              <Link
                                to="/about"
                                className="menu-link menu-link_us-s"
                              >
                                Gift Card
                              </Link>
                            </li>
                            <li className="sub-menu__item">
                              <a href="#" className="menu-link menu-link_us-s">
                                Collaborations®
                              </a>
                            </li>
                            <li className="sub-menu__item">
                              <a href="#" className="menu-link menu-link_us-s">
                                Sets
                              </a>
                            </li>
                            <li className="sub-menu__item">
                              <a href="#" className="menu-link menu-link_us-s">
                                Denim
                              </a>
                            </li>
                            <li className="sub-menu__item">
                              <a href="#" className="menu-link menu-link_us-s">
                                New
                              </a>
                            </li>
                            <li className="sub-menu__item">
                              <a href="#" className="menu-link menu-link_us-s">
                                Best Sellers
                              </a>
                            </li>
                            <li className="sub-menu__item">
                              <a href="#" className="menu-link menu-link_us-s">
                                Overshirts
                              </a>
                            </li>
                            <li className="sub-menu__item">
                              <a href="#" className="menu-link menu-link_us-s">
                                Jackets & Coats
                              </a>
                            </li>
                            <li className="sub-menu__item">
                              <a href="#" className="menu-link menu-link_us-s">
                                Jeans
                              </a>
                            </li>
                            <li className="sub-menu__item">
                              <a href="#" className="menu-link menu-link_us-s">
                                Trousers
                              </a>
                            </li>
                            <li className="sub-menu__item">
                              <a href="#" className="menu-link menu-link_us-s">
                                Shorts and Bermudas
                              </a>
                            </li>
                            <li className="sub-menu__item">
                              <a href="#" className="menu-link menu-link_us-s">
                                Shoes
                              </a>
                            </li>
                            <li className="sub-menu__item">
                              <Link
                                to="/shop3"
                                className="menu-link menu-link_us-s"
                              >
                                Accessories
                              </Link>
                            </li>
                            <li className="sub-menu__item">
                              <a href="#" className="menu-link menu-link_us-s">
                                Dresses
                              </a>
                            </li>
                            <li className="sub-menu__item">
                              <a href="#" className="menu-link menu-link_us-s">
                                Bags
                              </a>
                            </li>
                          </ul>
                          {/* <!-- /.sub-menu --> */}
                        </div>
                      </div>
                    </div>
                    {/* <!-- /.row --> */}
                  </div>
                  <div
                    className="tab-pane fade"
                    id="pills-item-2"
                    role="tabpanel"
                    aria-labelledby="pills-item-2-tab"
                  >
                    <p>
             맨존
                    </p>
                    
                  </div>
                  <div
                    className="tab-pane fade"
                    id="pills-item-3"
                    role="tabpanel"
                    aria-labelledby="pills-item-3-tab"
                  >
                    <p>
                키즈존
                    </p>
                   
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
