import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement);

const YearlySalesLineChart = () => {
    const [data, setData] = useState({
        labels: [],
        datasets: [
            {
                label: 'Yearly Sales',
                data: [],
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
                max: 10000000,
                ticks: {
                    callback: function(value) {
                        return value.toLocaleString('ko-KR', { style: 'currency', currency: 'KRW' });
                    }
                }
            }
        }
    };

    useEffect(() => {
        fetchYearlySales();
    }, []);

    const fetchYearlySales = () => {
        fetch(`http://localhost:8090/bisang/admin/stats/sales/yearly`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                const labels = data.map(d => `${d.saleYear}년`);
                const salesData = data.map(d => d.totalSale);

                setData({
                    labels: labels,
                    datasets: [
                        {
                            label: 'Yearly Sales',
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
            <h2>연 매출</h2>
            <Line data={data} options={options} />
        </div>
    );
};

export default YearlySalesLineChart;
