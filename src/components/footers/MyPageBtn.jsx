import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';

export const MyPageBtn = () =>{
  const { t } = useTranslation();
    return (
        <div className="col-3">
          <Link
            to="/account_edit/:userId"
            className="footer-mobile__link d-flex flex-column align-items-center"
          >
            <img
              src="/assets/images/mobilefooter1/mypage.png"
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
            />
              <use href="#icon_hanger" />
            <span>{t('my')}</span>
          </Link>
        </div>
    )
}