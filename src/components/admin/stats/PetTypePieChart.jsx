import React, { useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto';
import BASE_URL from '@/utils/globalBaseUrl';

const PetTypePieChart = () => {
    const [data, setData] = useState({
        labels: [], 
        datasets: [{
            data: [], 
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'], 
        }]
    });
    const [loading, setLoading] = useState(true); 

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${BASE_URL}/admin/stats/sales/pet-type`);
                const result = await response.json();
                
                if (Array.isArray(result)) {
                    setData({
                        labels: result.map(item => item.petType),
                        datasets: [{
                            data: result.map(item => item.petRatio),
                            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
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
        return <p>Loading...</p>;
    }

    return (
        <div>
            <h3>반려동물 종 비율</h3>
            <Pie data={data} />
        </div>
    );
};

export default PetTypePieChart;
