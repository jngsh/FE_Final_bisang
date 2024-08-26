import { useContextElement } from "@/context/Context";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import BASE_URL from "@/utils/globalBaseUrl";
import { MyPageBtn } from "./MyPageBtn";
import { LoginBtn } from "./LoginBtn";
import { useTranslation } from 'react-i18next';

export default function MobileFooter1() {
  const [showFooter, setShowFooter] = useState(false);
  const { wishList } = useContextElement();
  const { t } = useTranslation();
  const { logined } = useContextElement();

  useEffect(() => {
    setShowFooter(true);
  }, []);



  return (
    <footer
      className={`footer-mobile container w-100 px-5 d-md-none bg-body ${showFooter ? "position-fixed footer-mobile_initialized" : ""
        }`}
    >
      <div className="row text-center">
        {/* HOME 메뉴 */}
        <div className="col-3">
          <Link
            to="/"
            className="footer-mobile__link d-flex flex-column align-items-center"
          >
            <img
              src="/assets/images/mobilefooter1/home.png"
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
            />
            <use href="#icon_home" />
            <span>{t('home')}</span>
          </Link>
        </div>

        {/* QR Scan 메뉴 */}
        <div className="col-3">
          <Link
            to="/QrReader"
            className="footer-mobile__link d-flex flex-column align-items-center"
          >
            <img
              src="/assets/images/mobilefooter1/qrscan.png"
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
            />
                <use href="#icon_heart" />
            <span>{t('QR')}</span>
          </Link>
        </div>

        {/* SHOP 메뉴 */}
        <div className="col-3">
          <a
            href="/shoplist"
            className="footer-mobile__link d-flex flex-column align-items-center"
          >
          <img
              src="/assets/images/mobilefooter1/categories.png"
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
            />
              <use href="#icon_hanger" />
            <span>{t('Categories')}</span>
          </a>
        </div>
        {/* <!-- /.col-3 --> */}


        {logined ? <MyPageBtn /> : <LoginBtn />}

        {/* <!-- /.col-3 --> */}

      </div>
    </footer>
  );
}