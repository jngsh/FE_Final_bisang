import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement } from 'chart.js';
import 'chart.js/auto';
import BASE_URL from "@/utils/globalBaseUrl";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement);

const DailySalesLineChart = () => {
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    const [selectedMonth, setSelectedMonth] = useState(currentMonth);
    const [selectedYear, setSelectedYear] = useState(currentYear);
    const [salesData, setSalesData] = useState([]);
    const [years, setYears] = useState([]);

    useEffect(() => {
        fetchYears();
    }, []);

    useEffect(() => {
        fetchMonthlySales(selectedYear, selectedMonth + 1);
    }, [selectedYear, selectedMonth]);

    const fetchYears = () => {
        fetch(`${BASE_URL}/bisang/admin/stats/sales/years`)
            .then(response => response.json())
            .then(data => setYears(data))
            .catch(error => console.error('Error fetching years:', error));
    };

    const fetchMonthlySales = (year, month) => {
        fetch(`${BASE_URL}/bisang/admin/stats/sales/daily/${year}/${month}`)
            .then(response => response.json())
            .then(data => {
                const daysInMonth = new Date(year, month, 0).getDate();
                const dailySales = Array.from({ length: daysInMonth }, (_, i) => ({
                    date: i + 1,
                    totalSale: 0
                }));

                data.forEach(d => {
                    const saleDate = new Date(d.saleDate).getDate();
                    const saleAmount = d.totalSale || 0;
                    dailySales[saleDate - 1] = { date: saleDate, totalSale: saleAmount };
                });

                setSalesData(dailySales);
            })
            .catch(error => console.error('Error fetching sales data:', error));
    };

    const handleYearChange = (event) => {
        setSelectedYear(parseInt(event.target.value, 10));
    };

    const handleMonthChange = (event) => {
        setSelectedMonth(parseInt(event.target.value, 10) - 1);
    };

    const chartData = {
        labels: salesData.map(d => `${d.date}일`),
        datasets: [
            {
                label: 'Daily Sales',
                data: salesData.map(d => d.totalSale),
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                pointRadius: salesData.map(d => Math.min(d.totalSale / 50000, 10)),
                fill: false,
                tension: 0.1
            }
        ]
    };

    const chartOptions = {
        scales: {
            x: {
                beginAtZero: true,
                // title: {
                //     display: true,
                //     text: '일'
                // }
            },
            y: {
                beginAtZero: true,
                // title: {
                //     display: true,
                //     text: '매출액'
                // },
                ticks: {
                    callback: function(value) {
                        return value.toLocaleString('ko-KR', { style: 'currency', currency: 'KRW' });
                    }
                }
            }
        }
    };

    return (
        <div>
            <h2>{selectedYear}년 {selectedMonth + 1}월 일 매출</h2>
            <div>
                <select id="yearPicker" value={selectedYear} onChange={handleYearChange}>
                    {years.map(year => (
                        <option key={year} value={year}>{year}</option>
                    ))}
                </select>
                <label htmlFor="yearPicker">년</label>
                <select id="monthPicker" value={selectedMonth + 1} onChange={handleMonthChange}>
                    {Array.from({ length: 12 }, (_, i) => (
                        <option key={i} value={i + 1}>{i + 1}월</option>
                    ))}
                </select>
                <label htmlFor="monthPicker">월</label>
            </div>
            <Line data={chartData} options={chartOptions} />
        </div>
    );
};

export default DailySalesLineChart;
