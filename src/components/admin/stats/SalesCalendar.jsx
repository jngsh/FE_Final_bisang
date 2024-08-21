import React, { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import koLocale from '@fullcalendar/core/locales/ko';
import axios from 'axios';
import BASE_URL from '@/utils/globalBaseUrl';
import './SalesCalendar.css';

const SalesCalendar = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios.get(`${BASE_URL}/bisang/admin/stats/sales/daily-calendar`)
      .then(response => {
        const salesData = response.data;
        const fetchedEvents = salesData.map(sale => ({
          title: `${formatNumber(sale.totalSale)}원`,
          start: sale.saleDate,
          allDay: true
        }));
        setEvents(fetchedEvents);
      })
      .catch(error => {
        console.error('Error fetching sales data:', error);
      });
  }, []);

  const formatNumber = (number) => {
    return new Intl.NumberFormat().format(number);
  };

  return (
    <div className="SalesCalendarContainer">
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        events={events}
        locale={koLocale}
        contentHeight="auto"
        expandRows={true}
      />
    </div>
  );
};

export default SalesCalendar;
