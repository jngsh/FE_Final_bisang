import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement } from 'chart.js';
import axios from 'axios';
import BASE_URL from '@/utils/globalBaseUrl';

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
                pointRadius: 5, 
                pointBackgroundColor: 'rgba(75,192,192,1)',
            }
        ]
    });

    const [maxY, setMaxY] = useState(10000000);

    const options = {
        scales: {
            y: {
                beginAtZero: true,
                max: maxY,
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
        axios.get(`${BASE_URL}/bisang/admin/stats/sales/yearly`)
            .then(response => {
                const data = response.data;
                const labels = data.map(d => `${d.saleYear}년`);
                const salesData = data.map(d => d.totalSale);
                const maxSales = Math.max(...salesData);

                const newMaxY = Math.ceil(maxSales / 1000000) * 1000000;
                setMaxY(newMaxY);

                setData({
                    labels: labels,
                    datasets: [
                        {
                            label: 'Yearly Sales',
                            data: salesData,
                            fill: false,
                            borderColor: 'rgba(0, 128, 0, 1)',
                            backgroundColor: 'rgba(0, 128, 0, 0.2)',
                            pointRadius: 3,
                            pointBackgroundColor: 'rgba(0, 128, 0, 1)',
                        }
                    ]
                });
            })
            .catch(error => {
                console.error('axios request error:', error);
            });
    };

    return (
        <div>
            <Line data={data} options={options} />
        </div>
    );
};

export default YearlySalesLineChart;
