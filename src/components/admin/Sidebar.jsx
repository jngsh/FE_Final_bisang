import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(true);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className={`Sidebar ${isOpen ? "open" : "closed"}`}>
            <div className={`toggle-btn ${isOpen ? "open" : "closed"}`} onClick={toggleSidebar}>
                {isOpen ? "←" : "→"}
            </div>
            <ul>
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
        </div>
    );
};

export default Sidebar;
