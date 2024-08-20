import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import StatsChartsPage from "./stats/StatsChartsPage";
import StocksPage from "./stocks/StocksPage";
import ProductsPage from "./products/ProductsPage";
import "./AdminPage.css";
import SalesCalendar from "./stats/SalesCalendar";

const AdminPage = () => {
    const [isSidebarOpen, setSidebarOpen] = useState(true);

    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className="AdminPage">
            <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
            <div className={`MainContent ${isSidebarOpen ? 'open' : 'closed'}`}>
                <Routes>
                    <Route path="sales" element={<SalesCalendar />} />
                    <Route path="stats" element={<StatsChartsPage />} />
                    <Route path="stocks" element={<StocksPage />} />
                    <Route path="products" element={<ProductsPage />} />
                    <Route path="/" element={<Navigate to="sales" />} />
                </Routes>
            </div>
        </div>
    );
};

export default AdminPage;
