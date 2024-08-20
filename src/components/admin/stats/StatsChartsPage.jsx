import React, { useState } from 'react';
import WeeklySalesLineChart from './WeeklySalesLineChart';
import HourlySalesLineChart from './HourlySalesLineChart';
import MonthlySalesLineChart from './MonthlySalesLineChart';
import YearlySalesLineChart from './YearlySalesLineChart';
import DailySalesLineChart from './DailySalesLineChart';
import TopProductsList from './TopProductsList';
import PetTypeDoughnutChart from './PetTypeDoughnutChart';
import PetAgeTypeDoughnutChart from './PetAgeTypeDoughnutChart';
import './StatsChartsPage.css';

const StatsChartsPage = () => {
    const today = new Date().toISOString().split('T')[0];
    const [selectedDate, setSelectedDate] = useState(today);
    const [view, setView] = useState('weekly');

    const handleDateChange = (event) => {
        setSelectedDate(event.target.value);
        setView('hourly');
    };

    return (
        <div className="stats-container">
            <div className="chart-section">
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
                <br/>
                <hr/>
                <br/><br/>
                <div className="chart-group">
                    <div className="chart-item">
                        <h4>제품 판매 순위</h4>
                        <TopProductsList />
                    </div>
                    <div className="chart-item">
                        <h4>반려동물 비율</h4>
                        <PetTypeDoughnutChart />
                        <PetAgeTypeDoughnutChart />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StatsChartsPage;
