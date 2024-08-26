import React from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import "./Sidebar.css";
import { useContextElement } from "@/context/Context";

const Sidebar = ({ isOpen, toggleSidebar }) => {
    const { setLogined } = useContextElement();
    const { pathname } = useLocation();
    const navigate = useNavigate();

    const handleLogout = (event) => {
        event.preventDefault();
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        setLogined(false);
        localStorage.setItem("logined", JSON.stringify(false));

        navigate("/login_register");
    }

    return (

        <div className={`Sidebar ${isOpen ? "open" : "closed"}`}>
            <div className={`toggle-btn ${isOpen ? "open" : "closed"}`} onClick={toggleSidebar}>
                {isOpen ? "←" : "→"}
            </div>
            <ul>
                <li>
                    <NavLink
                        to="sales"
                        className={({ isActive }) => (isActive ? "active" : undefined)}
                    >
                        매출 달력
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="stats"
                        className={({ isActive }) => (isActive ? "active" : undefined)}
                    >
                        통계 차트
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="stocks"
                        className={({ isActive }) => (isActive ? "active" : undefined)}
                    >
                        재고 관리
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="products"
                        className={({ isActive }) => (isActive ? "active" : undefined)}
                    >
                        상품 관리
                    </NavLink>
                </li>
            </ul>
            <div className="logout-container">
                <Link
                    to="#"
                    onClick={handleLogout}
                    className={`navigation__link ${pathname === "#" ? "menu-active" : ""}`}>
                    로그아웃
                </Link>
            </div>
        </div>
    );
};

export default Sidebar;
