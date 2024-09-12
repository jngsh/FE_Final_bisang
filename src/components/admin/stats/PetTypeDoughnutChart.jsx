import React, { useState, useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';
import 'chart.js/auto';
import BASE_URL from '@/utils/globalBaseUrl';
import './StatsPage.css';

const token = localStorage.getItem("token");

const PetTypeDoughnutChart = () => {
    const [data, setData] = useState({
        labels: [],
        datasets: [{
            data: [],
            backgroundColor: ['#FF6384', '#36A2EB', '#B0BEC5'],
        }]
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${BASE_URL}/bisang/admin/stats/sales/pet-type`, {
                    headers: {
                        Authorization: token ? `Bearer ${token}` : '',
                        'Access-Control-Allow-Origin': '*'
                    }
                }
                );
                const result = await response.json();

                if (Array.isArray(result)) {
                    setData({
                        labels: result.map(item => item.petType),
                        datasets: [{
                            data: result.map(item => item.petRatio),
                            backgroundColor: ['#FF6384', '#36A2EB', '#B0BEC5'],
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
            tooltip: {
                callbacks: {
                    label: function (tooltipItem) {
                        return `${tooltipItem.label}: ${tooltipItem.raw}`;
                    }
                }
            }
        }
    };

    return (
        <div className="chart-container">
            <h5>반려동물 종 비율</h5>
            <Doughnut data={data} options={options} />
        </div>
    );
};

export default PetTypeDoughnutChart;