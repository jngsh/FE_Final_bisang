import React, { useState } from 'react';
import WeeklySalesLineChart from './WeeklySalesLineChart';
import HourlySalesLineChart from './HourlySalesLineChart';
import MonthlySalesLineChart from './MonthlySalesLineChart';
import YearlySalesLineChart from './YearlySalesLineChart';
import DailySalesLineChart from './DailySalesLineChart';
import './StatsPage.css';

const StatsTrendPage = () => {
    const today = new Date().toISOString().split('T')[0];
    const [selectedDate, setSelectedDate] = useState(today);
    const [view, setView] = useState('weekly');

    const handleDateChange = (event) => {
        setSelectedDate(event.target.value);
        setView('hourly');
    };

    return (
        <div className="stats-container">
            <div className="sales-trends-section">
                <div className="stats-controls">
                    <h2>기간별 매출 추이</h2>
                    <label htmlFor="datePicker">날짜 선택:</label>
                    <input type="date" id="datePicker" value={selectedDate} onChange={handleDateChange} />
                    <button 
                        onClick={() => setView('weekly')} 
                        className={view === 'weekly' ? 'selected' : ''}
                    >
                        최근 일주일 매출
                    </button>
                    <button 
                        onClick={() => setView('daily')} 
                        className={view === 'daily' ? 'selected' : ''}
                    >
                        일 매출
                    </button>
                    <button 
                        onClick={() => setView('monthly')} 
                        className={view === 'monthly' ? 'selected' : ''}
                    >
                        월 매출
                    </button>
                    <button 
                        onClick={() => setView('yearly')} 
                        className={view === 'yearly' ? 'selected' : ''}
                    >
                        연 매출
                    </button>
                </div>
                
                {view === 'weekly' && <WeeklySalesLineChart selectedDate={selectedDate} />}
                {view === 'hourly' && <HourlySalesLineChart selectedDate={selectedDate} />}
                {view === 'daily' && <DailySalesLineChart />}
                {view === 'monthly' && <MonthlySalesLineChart />}
                {view === 'yearly' && <YearlySalesLineChart />}
            </div>
        </div>
    );
};

export default StatsTrendPage;
