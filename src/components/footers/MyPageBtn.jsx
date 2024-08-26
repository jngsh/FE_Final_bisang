import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';

export const MyPageBtn = () => {
  const { t } = useTranslation();
  return (
    <>
      <Link
        to="/account_dashboard"
        className="mobile-nav-activator d-block position-relative"
      >
        <img
          src="/assets/images/mobilefooter1/mypage.png"
          width="25"
          height="25"
          viewBox="0 0 18 18"
          fill="none"
        />
        <use href="#icon_hanger" />
        <span className="btn-close-lg position-absolute top-0 start-0 w-100">
          {t('my')}
        </span>
      </Link>
    </>
  )
}