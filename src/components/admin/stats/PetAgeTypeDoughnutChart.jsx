import React, { useState, useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';
import 'chart.js/auto';
import BASE_URL from '@/utils/globalBaseUrl';
import './StatsPage.css';

const token = localStorage.getItem("token");

const PetAgeTypeDoughnutChart = () => {
    const [data, setData] = useState({
        labels: [], 
        datasets: [{
            data: [],
            backgroundColor: ['#0033A0', '#4CAF50', '#FF6F00'], 
        }]
    });
    const [loading, setLoading] = useState(true); 

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${BASE_URL}/bisang/admin/stats/sales/pet-age-type`,{
                    headers: {
                      Authorization: token ? `Bearer ${token}` : ''
                    }
                  }
                );
                const result = await response.json();
                
                if (Array.isArray(result)) {
                    setData({
                        labels: result.map(item => item.ageType),
                        datasets: [{
                            data: result.map(item => item.petRatio),
                            backgroundColor: ['#0033A0', '#4CAF50', '#FF6F00'],
                        }]
                    });
                } else {
                    console.error('Unexpected data format:', result);
                }
            } catch (error) {
                console.error('Failed to fetch data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <p></p>;
    }

    const options = {
        plugins: {
            legend: {
                position: 'right',
                labels: {
                    boxWidth: 20,
                },
            },
        },
    };

    return (
        <div className="chart-container">
            <h5>반려동물 나이 비율</h5>
            <Doughnut data={data} options={options} />
        </div>
    );
};

export default PetAgeTypeDoughnutChart;
