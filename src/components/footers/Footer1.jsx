import { Link } from "react-router-dom";
import React from 'react';
import { useTranslation } from 'react-i18next';

import {
  currencyOptions,
  // footerLinks1,
  // footerLinks2,
  // footerLinks3,
  languageOptions,
  // socialLinks,
} from "@/data/footer";

const Footer1 = () => {
  const handleClick = (event) => {
    event.preventDefault();

    const form = event.target.closest('form');
    const emailInput = form.querySelector('input[name="email"]');

    if (!emailInput.value.trim()) {
      alert(t('email_required'));
      return;
    }

    alert(t('subscription_thank_you'));

    if (form) {
      form.reset();
    }
  };

  const { i18n } = useTranslation();
  const { t } = useTranslation();

  const handleLanguageChange = (event) => {
    i18n.changeLanguage(event.target.value);
  };

  return (
    <footer className="footer footer_type_1">
      <div className="footer-middle container">
        <div className="row row-cols-lg-5 row-cols-2">
          <div className="footer-column footer-store-info col-12 mb-4 mb-lg-0">
            <div className="logo">
              <Link to="/">
                <img
                  src="/assets/images/logo.png"
                  width={112}
                  height={28}
                  alt="Uomo"
                  className="logo__image d-block"
                />
              </Link>
            </div>
            {/* <!-- /.logo --> */}
            <p className="footer-address">
              {t('address')}
            </p>

            <p className="m-0">
              <strong className="fw-medium">peter.pet.bisang@gmail.com
              </strong>
            </p>
            <p>
              <strong className="fw-medium">+82 010-2030-4050</strong>
            </p>

            {/* <ul className="social-links list-unstyled d-flex flex-wrap mb-0">
              {socialLinks.map((link, index) => (
                <li key={index}>
                  <a href={link.href} className="footer__social-link d-block">
                    <svg
                      className={link.className}
                      width={link.width}
                      height={link.height}
                      viewBox={link.viewBox}
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      {typeof link.icon === "string" ? (
                        <use href={link.icon} />
                      ) : (
                        link.icon
                      )}
                    </svg>
                  </a>
                </li>
              ))}
            </ul> */}
          </div>
          {/* <!-- /.footer-column --> */}

          {/* <div className="footer-column footer-menu mb-4 mb-lg-0">
            <h5 className="sub-menu__title text-uppercase">Company</h5>
            <ul className="sub-menu__list list-unstyled">
              {footerLinks1.map((elm, i) => (
                <li key={i} className="sub-menu__item">
                  <Link to={elm.href} className="menu-link menu-link_us-s">
                    {elm.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div> */}
          {/* <!-- /.footer-column --> */}
          {/* <div className="footer-column footer-menu mb-4 mb-lg-0">
            <h5 className="sub-menu__title text-uppercase">Shop</h5>
            <ul className="sub-menu__list list-unstyled">
              {footerLinks2.map((elm, i) => (
                <li key={i} className="sub-menu__item">
                  <Link to={elm.href} className="menu-link menu-link_us-s">
                    {elm.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div> */}
          {/* <!-- /.footer-column --> */}
          {/* <div className="footer-column footer-menu mb-4 mb-lg-0">
            <h5 className="sub-menu__title text-uppercase">Help</h5>
            <ul className="sub-menu__list list-unstyled">
              {footerLinks3.map((elm, i) => (
                <li key={i} className="sub-menu__item">
                  <Link to={elm.href} className="menu-link menu-link_us-s">
                    {elm.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div> */}
          {/* <!-- /.footer-column --> */}
          <div className="footer-column footer-newsletter col-12 mb-4 mb-lg-0">
            <h5 className="sub-menu__title text-uppercase">{t('subscribe')}</h5>
            <p>
              {t('newsPrompt')}
              {/* Be the first to get the latest news about trends, promotions, and
              much more! */}
            </p>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="footer-newsletter__form position-relative bg-body"
            >
              <input
                className="form-control border-white"
                type="email"
                name="email"
                placeholder={t('enterEmail')}
              />
              <input
                className="btn-link fw-medium bg-white position-absolute top-0 end-0 h-100"
                type="submit"
                value={t('send')}
                onClick={handleClick}
              />
            </form>

            <div className="mt-4">
              <p className="mt-2">
                <img
                  loading="lazy"
                  width={375}
                  height={57}
                  src="/assets/images/카카오페이온리.png"
                  alt="Acceptable payment gateways"
                  className="mw-100"
                />
              </p>
            </div>
          </div>
          {/* <!-- /.footer-column --> */}
        </div>
        {/* <!-- /.row-cols-5 --> */}
      </div>
      {/* <!-- /.footer-middle container --> */}

      <div className="footer-bottom container">
        <div className="d-block d-md-flex align-items-center">
          <span className="footer-copyright me-auto">
            ©{new Date().getFullYear()} Peter PET
          </span>
          <div className="footer-settings d-block d-md-flex align-items-center">
            <div className="d-flex align-items-center">
              <label
                htmlFor="footerSettingsLanguage"
                className="me-2 text-secondary"
              >
                {t('language')}
              </label>
              <select
                id="footerSettingsLanguage"
                className="form-select form-select-sm bg-transparent"
                aria-label="Default select example"
                name="store-language"
                onChange={handleLanguageChange}
                defaultValue={languageOptions.find(option => option.selected)?.value || ''}
              >
                {languageOptions.map((option) => (
                  <option
                    key={option.value}
                    className="footer-select__option"
                    value={option.value}
                  >
                    {option.text}
                  </option>
                ))}
              </select>
            </div>

            <div className="d-flex align-items-center">
              <label
                htmlFor="footerSettingsCurrency"
                className="ms-md-3 me-2 text-secondary"
              >
                Currency
              </label>
              <select
                id="footerSettingsCurrency"
                className="form-select form-select-sm bg-transparent"
                aria-label="Default select example"
                name="store-language"
              >
                {currencyOptions.map((option, index) => (
                  <option
                    key={index}
                    className="footer-select__option"
                    value={option.value}
                  >
                    {option.text}
                  </option>
                ))}
              </select>
            </div>
          </div>
          {/* <!-- /.footer-settings --> */}
        </div>
        {/* <!-- /.d-flex --> */}
      </div>
      {/* <!-- /.footer-bottom container --> */}
    </footer>
  );
}

export default Footer1;
