import { dashboardMenuItems } from "@/data/menu";
import { Link, useLocation, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useContextElement } from "@/context/Context";

export default function DashboardSidebar() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");
  const { setLogined, setCartId } = useContextElement();

  const handleLogout = (event) => {
    event.preventDefault();
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    setLogined(false);
    setCartId(null);
    localStorage.setItem("logined", JSON.stringify(false));
    localStorage.setItem("cartId", null);
    navigate("/login_register");
  }

  return (
    <div className="col-lg-3">
      <ul className="account-nav">
        {dashboardMenuItems.map((elm, i) => {
          // userId가 필요한 링크는 동적으로 생성합니다.
          const href = elm.href.includes(":userId") ? elm.href.replace(":userId", userId) : elm.href;

          return (
            <li key={i}>
              {elm.title === "Logout" ? (
                <Link
                  to={href}
                  onClick={handleLogout}
                  className={`menu-link menu-link_us-s ${
                    pathname === href ? "menu-link_active" : ""
                  }`}
                >
                  {elm.title}
                </Link>
              ) : (
                <Link
                  to={href}
                  className={`menu-link menu-link_us-s ${
                    pathname === href ? "menu-link_active" : ""
                  }`}
                >
                  {elm.title}
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}