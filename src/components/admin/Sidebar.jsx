import React from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = () => {
    return (
        <div className="Sidebar">
            <ul>
                <li><Link to="stats">통계 차트</Link></li>
                <li><Link to="stocks">재고 관리</Link></li>
                <li><Link to="products">상품 관리</Link></li>
            </ul>
        </div>
    );
};

export default Sidebar;
