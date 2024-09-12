import React, { useState, useEffect } from 'react';
import { Chart as ChartJS, registerables } from 'chart.js';
import { Line } from 'react-chartjs-2';
import axios from 'axios';
import BASE_URL from '@/utils/globalBaseUrl';

ChartJS.register(...registerables);

const token = localStorage.getItem("token");

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
                borderColor: 'rgba(0, 0, 128, 1)',
                backgroundColor: 'rgba(0, 0, 128, 0.2)',
                pointRadius: 3,
                pointBackgroundColor: 'rgba(0, 0, 128, 1)',
            }
        ]
    });

    const [maxY, setMaxY] = useState(100000);

    const options = {
        scales: {
            y: {
                beginAtZero: true,
                max: maxY,
                ticks: {
                    callback: function (value) {
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
        axios.get(`${BASE_URL}/bisang/admin/stats/sales/recent-week`, {
            headers: {
                Authorization: token ? `Bearer ${token}` : '',
                'Access-Control-Allow-Origin': '*'
            }
        }
        )
            .then(response => {
                const data = response.data;
                const labels = generateLast7DaysLabels();
                const salesData = Array(7).fill(0);

                data.forEach(d => {
                    const index = labels.indexOf(d.saleDate);
                    if (index !== -1) {
                        salesData[index] = d.totalSale;
                    }
                });

                const maxSales = Math.max(...salesData);
                const newMaxY = Math.ceil(maxSales / 100000) * 100000;
                setMaxY(newMaxY);

                setData({
                    labels: labels,
                    datasets: [
                        {
                            label: 'Weekly Sales',
                            data: salesData,
                            fill: false,
                            borderColor: 'rgba(0, 0, 128, 1)',
                            backgroundColor: 'rgba(0, 0, 128, 0.2)',
                            pointRadius: 3,
                            pointBackgroundColor: 'rgba(0, 0, 128, 1)',
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

export default WeeklySalesLineChart;
