import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement } from 'chart.js';
import axios from 'axios';
import BASE_URL from '@/utils/globalBaseUrl';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement);

const token = localStorage.getItem("token");

const HourlySalesLineChart = ({ selectedDate }) => {
    const [data, setData] = useState({
        labels: Array.from({ length: 24 }, (_, i) => `${String(i).padStart(2, '0')}:00`),
        datasets: [
            {
                label: 'Hourly Sales',
                data: Array(24).fill(0),
                fill: false,
                borderColor: 'rgba(0, 0, 128, 1)',
                backgroundColor: 'rgba(0, 0, 128, 0.2)',
                pointRadius: 3,
                pointBackgroundColor: 'rgba(0, 0, 128, 1)',
            }
        ]
    });

    const [maxY, setMaxY] = useState(10000);

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
        fetchDateSales(selectedDate);
    }, [selectedDate]);

    const fetchDateSales = (date) => {
        axios.get(`${BASE_URL}/bisang/admin/stats/sales/hourly/${date}`, {
            headers: {
                "Authorization": `Bearer ${token}`,
                'Access-Control-Allow-Origin': '*'
            },
        })
            .then(response => {
                const data = response.data;
                const salesData = Array(24).fill(0);

                data.forEach(d => {
                    const hour = parseInt(d.saleHour, 10);
                    salesData[hour] = d.totalSale;
                });

                const maxSales = Math.max(...salesData);
                const newMaxY = Math.ceil(maxSales / 10000) * 10000;
                setMaxY(newMaxY);

                setData({
                    labels: Array.from({ length: 24 }, (_, i) => `${String(i).padStart(2, '0')}:00`),
                    datasets: [
                        {
                            label: 'Hourly Sales',
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

export default HourlySalesLineChart;
