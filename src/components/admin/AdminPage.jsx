import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import StatsChartsPage from "./stats/StatsChartsPage";
import StocksPage from "./stocks/StocksPage";
import "./AdminPage.css";

const AdminPage = () => {
    return (
        <div className="AdminPage">
            <Sidebar />
            <div className="MainContent">
                <Routes>
                    <Route path="stats" element={<StatsChartsPage />} />
                    <Route path="stocks" element={<StocksPage />} />
                    <Route path="/" element={<Navigate to="stats" />} />
                </Routes>
            </div>
        </div>
    );
};

export default AdminPage;
