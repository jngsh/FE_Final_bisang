import React, { useState } from 'react';
import WeeklySalesLineChart from './WeeklySalesLineChart';
import HourlySalesLineChart from './HourlySalesLineChart';
import MonthlySalesLineChart from './MonthlySalesLineChart';
import YearlySalesLineChart from './YearlySalesLineChart';
import DailySalesLineChart from './DailySalesLineChart';
import TopProductsList from './TopProductsList';
import PetTypeDoughnutChart from './PetTypeDoughnutChart';
import PetAgeTypeDoughnutChart from './PetAgeTypeDoughnutChart';
import DailySalesCalendar from './DailySalesCalendar';

const StatsChartsPage = () => {
    const today = new Date().toISOString().split('T')[0];
    const [selectedDate, setSelectedDate] = useState(today);
    const [view, setView] = useState('weekly');

    const handleDateChange = (event) => {
        setSelectedDate(event.target.value);
        setView('hourly');
    };

    const handleViewDaily = () => {
        setView('daily');
    };

    const handleViewWeekly = () => {
        setSelectedDate(today);
        setView('weekly');
    };

    const handleViewMonthly = () => {
        setView('monthly');
    };

    const handleViewYearly = () => {
        setView('yearly');
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div>
                <div>
                    <h2>기간별 매출</h2>
                    <div>
                        <label htmlFor="datePicker">날짜 선택:</label>
                        <input type="date" id="datePicker" value={selectedDate} onChange={handleDateChange} />
                        <button onClick={handleViewWeekly}>최근 일주일 매출</button>
                        <button onClick={handleViewDaily}>일 매출</button>
                        <button onClick={handleViewMonthly}>월 매출</button>
                        <button onClick={handleViewYearly}>연 매출</button>
                    </div>
                    {view === 'weekly' && <WeeklySalesLineChart selectedDate={selectedDate} />}
                    {view === 'hourly' && <HourlySalesLineChart selectedDate={selectedDate} />}
                    {view === 'daily' && <DailySalesLineChart />}
                    {view === 'monthly' && <MonthlySalesLineChart />}
                    {view === 'yearly' && <YearlySalesLineChart />}
                </div>
                <br/><br/>
                <div>
                    <h2>제품 판매 순위</h2>
                    <TopProductsList />
                    <br/><br/>
                    <h2>반려동물 비율</h2>
                    {/* <div style={{ display: 'flex', justifyContent: 'space-around', width: '100%' }}>
                        <PetTypePieChart />
                        <PetAgeTypePieChart />
                    </div> */}
                    <div style={{ display: 'flex', justifyContent: 'space-around', width: '100%' }}>
                        <PetTypeDoughnutChart />
                        <PetAgeTypeDoughnutChart />
                    </div>
                </div>
                <div>
                    Calender
                    <DailySalesCalendar />
                </div>
            </div>
        </div>
    );
};

export default StatsChartsPage;