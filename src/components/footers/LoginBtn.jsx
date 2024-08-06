import { Link } from "react-router-dom";

export const LoginBtn = () =>{
    return (
        <div className="col-3">
          <Link
            to="/login_register"
            className="footer-mobile__link d-flex flex-column align-items-center"
          >
            <svg
              className="d-block"
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <use href="#icon_hanger" />
            </svg>
            <span>Login</span>
          </Link>
        </div>
    )
}