import React, { useEffect, useState } from 'react';
import EChartsReact from 'echarts-for-react';
import axios from 'axios';
import BASE_URL from '@/utils/globalBaseUrl';

const DailySalesCalendar = () => {
  const [option, setOption] = useState({});

  useEffect(() => {
    axios.get(`${BASE_URL}/bisang/admin/stats/sales/daily-calendar`)
      .then(response => {
        const data = response.data;
        const transformedData = transformData(data);
        const year = new Date().getFullYear();
        setOption(generateCalendarOptions(transformedData, year));
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const transformData = (data) => {
    return data.map(item => [
      item.saleDate,
      item.totalSale
    ]);
  };

  // ECharts 옵션 생성 함수
  const generateCalendarOptions = (data, year) => ({
    backgroundColor: '#404a59',
    title: {
      top: 30,
      text: `Daily Sales for ${year}`,
      subtext: 'Sales Data',
      left: 'center',
      textStyle: {
        color: '#fff'
      }
    },
    tooltip: {
      trigger: 'item'
    },
    legend: {
      top: '30',
      left: '100',
      data: ['Sales'],
      textStyle: {
        color: '#fff'
      }
    },
    calendar: {
      top: 100,
      left: 'center',
      range: [`${year}-01-01`, `${year}-12-31`],
      splitLine: {
        show: true,
        lineStyle: {
          color: '#000',
          width: 4,
          type: 'solid'
        }
      },
      yearLabel: {
        formatter: '{start}',
        color: '#fff'
      },
      itemStyle: {
        color: '#323c48',
        borderWidth: 1,
        borderColor: '#111'
      }
    },
    series: [
      {
        name: 'Sales',
        type: 'scatter',
        coordinateSystem: 'calendar',
        data: data,
        symbolSize: function (val) {
          return Math.max(val[1] / 1000, 5);
        },
        itemStyle: {
          color: '#ddb926'
        }
      }
    ]
  });

  return (
    <div style={{ width: '100%', height: '800px' }}>
      <EChartsReact option={option} />
    </div>
  );
};

export default DailySalesCalendar;
