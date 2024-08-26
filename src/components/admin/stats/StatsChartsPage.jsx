import React from 'react';
import TopProductsList from './TopProductsList';
import PetTypeDoughnutChart from './PetTypeDoughnutChart';
import PetAgeTypeDoughnutChart from './PetAgeTypeDoughnutChart';
import './StatsPage.css';

const StatsChartsPage = () => {

    return (
        <div className="stats-container">
            <div className="chart-section">
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
