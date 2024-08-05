import React, { useState, useEffect } from 'react';
import { Chart as ChartJS, registerables } from 'chart.js';
import { Line } from 'react-chartjs-2';
import BASE_URL from '@/utils/globalBaseUrl';

ChartJS.register(...registerables);

const WeeklySalesLineChart = ({ selectedDate }) => {
    const generateLast7DaysLabels = () => {
        const labels = [];
        for (let i = 6; i >= 0; i--) {
            const date = new Date();
            date.setDate(date.getDate() - i);
            labels.push(date.toISOString().split('T')[0]);
        }
        return labels;
    };

    const [data, setData] = useState({
        labels: generateLast7DaysLabels(),
        datasets: [
            {
                label: 'Weekly Sales',
                data: Array(7).fill(0),
                fill: false,
                backgroundColor: 'rgba(75,192,192,0.4)',
                borderColor: 'rgba(75,192,192,1)',
            }
        ]
    });

    const options = {
        scales: {
            y: {
                beginAtZero: true,
                max: 1000000,
                ticks: {
                    callback: function(value) {
                        return value.toLocaleString('ko-KR', { style: 'currency', currency: 'KRW' });
                    }
                }
            }
        }
    };

    useEffect(() => {
        fetchWeeklySales(); 
    }, [selectedDate]); 

    const fetchWeeklySales = () => {
        fetch(`${BASE_URL}/bisang/admin/stats/sales/recent-week`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                const labels = generateLast7DaysLabels();
                const salesData = Array(7).fill(0);  

                data.forEach(d => {
                    const index = labels.indexOf(d.saleDate);
                    if (index !== -1) {
                        salesData[index] = d.totalSale;
                    }
                });

                setData({
                    labels: labels,
                    datasets: [
                        {
                            label: 'Weekly Sales',
                            data: salesData,
                            fill: false,
                            backgroundColor: 'rgba(75,192,192,0.4)',
                            borderColor: 'rgba(75,192,192,1)',
                        }
                    ]
                });
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });
    };

    return (
        <div>
            <h2>최근 일주일 매출</h2>
            <Line data={data} options={options} />
        </div>
    );
};

export default WeeklySalesLineChart;
