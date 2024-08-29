import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement } from 'chart.js';
import axios from 'axios';
import BASE_URL from '@/utils/globalBaseUrl';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement);

const token = localStorage.getItem("token");

const MonthlySalesLineChart = () => {
    const currentYear = new Date().getFullYear();
    const [selectedYear, setSelectedYear] = useState(currentYear);
    const [years, setYears] = useState([]);
    const [data, setData] = useState({
        labels: Array.from({ length: 12 }, (_, i) => `${i + 1}월`),
        datasets: [
            {
                label: 'Monthly Sales',
                data: Array(12).fill(0),
                fill: false,
                borderColor: 'rgba(0, 0, 128, 1)',
                backgroundColor: 'rgba(0, 0, 128, 0.2)',
                pointRadius: 3,
                pointBackgroundColor: 'rgba(0, 0, 128, 1)',
            }
        ]
    });
    const [maxY, setMaxY] = useState(1000000);

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
        fetchYears();
        fetchMonthlySales(selectedYear);
    }, []);

    useEffect(() => {
        fetchMonthlySales(selectedYear);
    }, [selectedYear]);

    const fetchYears = () => {
        axios.get(`${BASE_URL}/bisang/admin/stats/sales/years`, {
            headers: {
              Authorization: token ? `Bearer ${token}` : ''
            }
          }
)
            .then(response => {
                setYears(response.data);
            })
            .catch(error => {
                console.error('axios request error:', error);
            });
    };

    const fetchMonthlySales = (year) => {
        axios.get(`${BASE_URL}/bisang/admin/stats/sales/monthly/${year}`, {
            headers: {
              Authorization: token ? `Bearer ${token}` : ''
            }
          }
)
            .then(response => {
                const data = response.data;
                const defaultLabels = Array.from({ length: 12 }, (_, i) => `${i + 1}월`);
                const defaultSalesData = Array(12).fill(0);

                data.forEach(d => {
                    const monthIndex = d.saleMonth - 1;
                    defaultSalesData[monthIndex] = d.totalSale;
                });

                const maxSales = Math.max(...defaultSalesData);
                const newMaxY = Math.ceil(maxSales / 500000) * 500000;
                setMaxY(newMaxY);

                setData({
                    labels: defaultLabels,
                    datasets: [
                        {
                            label: 'Monthly Sales',
                            data: defaultSalesData,
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

    const handleYearChange = (event) => {
        setSelectedYear(event.target.value);
    };

    return (
        <div>
            <select id="yearPicker" value={selectedYear} onChange={handleYearChange}>
                {years.map(year => (
                    <option key={year} value={year}>
                        {year}
                    </option>
                ))}
            </select>
            <label htmlFor="yearPicker">년</label>
            <Line data={data} options={options} />
        </div>
    );
};

export default MonthlySalesLineChart;
