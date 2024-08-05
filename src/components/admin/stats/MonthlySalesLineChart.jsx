import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement } from 'chart.js';
import BASE_URL from '@/utils/globalBaseUrl';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement);

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
        fetchYears();
        fetchMonthlySales(selectedYear);
    }, []);

    useEffect(() => {
        fetchMonthlySales(selectedYear);
    }, [selectedYear]);

    const fetchYears = () => {
        fetch(`${BASE_URL}/bisang/admin/stats/sales/years`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setYears(data);
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });
    };

    const fetchMonthlySales = (year) => {
        fetch(`${BASE_URL}/bisang/admin/stats/sales/monthly/${year}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                const defaultLabels = Array.from({ length: 12 }, (_, i) => `${i + 1}월`);
                const defaultSalesData = Array(12).fill(0);

                data.forEach(d => {
                    const monthIndex = d.saleMonth - 1;
                    defaultSalesData[monthIndex] = d.totalSale;
                });

                setData({
                    labels: defaultLabels,
                    datasets: [
                        {
                            label: 'Monthly Sales',
                            data: defaultSalesData,
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

    const handleYearChange = (event) => {
        setSelectedYear(event.target.value);
    };

    return (
        <div>
            <h2>{selectedYear}년 월 매출</h2>
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
