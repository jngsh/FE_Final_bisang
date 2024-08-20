// import React, { useEffect, useState } from 'react';
// import EChartsReact from 'echarts-for-react';
// import axios from 'axios';
// import BASE_URL from '@/utils/globalBaseUrl';

// const DailySalesCalendar = () => {
//   const [option, setOption] = useState({});

//   useEffect(() => {
//     axios.get(`${BASE_URL}/bisang/admin/stats/sales/daily-calendar`)
//       .then(response => {
//         const data = response.data;
//         const transformedData = transformData(data);
//         const year = new Date().getFullYear();
//         setOption(generateCalendarOptions(transformedData, year));
//       })
//       .catch(error => {
//         console.error('Error fetching data:', error);
//       });
//   }, []);

//   const transformData = (data) => {
//     return data.map(item => [
//       item.saleDate,
//       item.totalSale
//     ]);
//   };

//   // ECharts 옵션 생성 함수
//   const generateCalendarOptions = (data, year) => ({
//     backgroundColor: '#404a59',
//     title: {
//       top: 30,
//       text: `Daily Sales for ${year}`,
//       subtext: 'Sales Data',
//       left: 'center',
//       textStyle: {
//         color: '#fff'
//       }
//     },
//     tooltip: {
//       trigger: 'item'
//     },
//     legend: {
//       top: '30',
//       left: '100',
//       data: ['Sales'],
//       textStyle: {
//         color: '#fff'
//       }
//     },
//     calendar: {
//       top: 100,
//       left: 'center',
//       range: [`${year}-01-01`, `${year}-12-31`],
//       splitLine: {
//         show: true,
//         lineStyle: {
//           color: '#000',
//           width: 4,
//           type: 'solid'
//         }
//       },
//       yearLabel: {
//         formatter: '{start}',
//         color: '#fff'
//       },
//       itemStyle: {
//         color: '#323c48',
//         borderWidth: 1,
//         borderColor: '#111'
//       }
//     },
//     series: [
//       {
//         name: 'Sales',
//         type: 'scatter',
//         coordinateSystem: 'calendar',
//         data: data,
//         symbolSize: function (val) {
//           return Math.max(val[1] / 1000, 5);
//         },
//         itemStyle: {
//           color: '#ddb926'
//         }
//       }
//     ]
//   });

//   return (
//     <div style={{ width: '100%', height: '800px' }}>
//       <EChartsReact option={option} />
//     </div>
//   );
// };

// export default DailySalesCalendar;
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
        setOption(generateCalendarOptions(transformedData));
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const transformData = (data) => {
    // 데이터를 날짜와 판매 데이터로 변환
    return data.map(item => [
      item.saleDate,
      item.totalSale
    ]);
  };

  // ECharts 옵션 생성 함수
  const generateCalendarOptions = (data) => {
    const years = Array.from(new Set(data.map(item => item[0].split('-')[0]))); // 데이터에서 년도 추출

    return {
      backgroundColor: '#404a59',
      title: {
        top: 30,
        text: `Daily Sales`,
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
        left: 'center',
        data: ['Sales'],
        textStyle: {
          color: '#fff'
        }
      },
      calendar: years.map((year, index) => ({
        top: 100 + index * 220, // 캘린더 간 간격 조정
        left: 50, // 왼쪽 여백 추가
        right: 50, // 오른쪽 여백 추가
        cellSize: ['auto', 20], // 셀 크기 조정
        range: `${year}`,
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
      })),
      series: years.map(year => ({
        name: 'Sales',
        type: 'scatter',
        coordinateSystem: 'calendar',
        calendarIndex: years.indexOf(year),
        data: data.filter(item => item[0].startsWith(year)),
        symbolSize: function (val) {
          return Math.max(val[1] / 1000, 5);
        },
        itemStyle: {
          color: '#ddb926'
        }
      }))
    };
  };

  return (
    <div style={{ width: '100%', height: '1000px', overflow: 'auto' }}>
      <EChartsReact option={option} style={{ height: '100%', width: '100%' }} />
    </div>
  );
};

export default DailySalesCalendar;
